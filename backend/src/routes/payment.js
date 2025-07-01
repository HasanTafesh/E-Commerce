const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middlewares/auth');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

router.post('/pay',
  auth,
  validate([
    body('orderId').isUUID()
  ]),
  paymentController.simulatePayment
);

module.exports = router; 