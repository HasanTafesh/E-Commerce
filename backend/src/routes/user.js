const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

router.get('/me', auth, userController.getProfile);
router.put('/me',
  auth,
  validate([
    body('username').optional().isLength({ min: 3 }),
    body('email').optional().isEmail()
  ]),
  userController.updateProfile
);

module.exports = router; 