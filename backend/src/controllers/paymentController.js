const { Order } = require('../models');

exports.simulatePayment = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ where: { id: orderId, userId: req.user.id } });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status !== 'pending') return res.status(400).json({ message: 'Order is not pending' });
    order.status = 'paid';
    await order.save();
    res.json({ message: 'Payment successful (simulated)', orderId: order.id, status: order.status });
  } catch (err) {
    next(err);
  }
}; 