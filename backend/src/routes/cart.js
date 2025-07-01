const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');

router.get('/', auth, cartController.getCart);
router.post('/add', auth, cartController.addProduct);
router.put('/update', auth, cartController.updateProduct);
router.delete('/remove', auth, cartController.removeProduct);

module.exports = router; 