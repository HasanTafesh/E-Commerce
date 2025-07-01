const { Order, OrderItem, Cart, CartItem, Product } = require('../models');
const { sequelize } = require('../models');

exports.placeOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id, status: 'active' },
      include: { model: Product },
    });
    if (!cart || !cart.Products.length) return res.status(400).json({ message: 'Cart is empty' });
    let total = 0;
    for (const product of cart.Products) {
      const item = await CartItem.findOne({ where: { cartId: cart.id, productId: product.id } });
      total += parseFloat(product.price) * item.quantity;
    }
    const order = await Order.create({ userId: req.user.id, total, status: 'pending' }, { transaction: t });
    for (const product of cart.Products) {
      const item = await CartItem.findOne({ where: { cartId: cart.id, productId: product.id } });
      await OrderItem.create({ orderId: order.id, productId: product.id, quantity: item.quantity, price: product.price }, { transaction: t });
    }
    cart.status = 'ordered';
    await cart.save({ transaction: t });
    await t.commit();
    res.status(201).json(order);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: { model: Product, through: { attributes: ['quantity', 'price'] } },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: { model: Product, through: { attributes: ['quantity', 'price'] } },
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
}; 