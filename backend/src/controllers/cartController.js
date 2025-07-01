const { Cart, CartItem, Product } = require('../models');

exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: { userId: req.user.id, status: 'active' },
      include: { model: Product, through: { attributes: ['quantity'] } },
    });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id });
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ where: { userId: req.user.id, status: 'active' } });
    if (!cart) cart = await Cart.create({ userId: req.user.id });
    let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({ cartId: cart.id, productId, quantity });
    }
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ where: { userId: req.user.id, status: 'active' } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (!item) return res.status(404).json({ message: 'Product not in cart' });
    item.quantity = quantity;
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.removeProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    let cart = await Cart.findOne({ where: { userId: req.user.id, status: 'active' } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (!item) return res.status(404).json({ message: 'Product not in cart' });
    await item.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}; 