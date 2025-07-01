const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

router.post('/register',
  validate([
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ]),
  authController.register
);

router.post('/login',
  validate([
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ]),
  authController.login
);

module.exports = router; 