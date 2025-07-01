const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const productRouter = require('./product');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const userRouter = require('./user');
const paymentRouter = require('./payment');

// TODO: Add feature routers here (e.g., userRouter, productRouter)

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/orders', orderRouter);
router.use('/users', userRouter);
router.use('/payment', paymentRouter);

module.exports = router; 