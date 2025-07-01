const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/',
  auth, role('admin'),
  validate([
    body('name').isLength({ min: 2 }),
    body('price').isFloat({ min: 0 }),
    body('stock').isInt({ min: 0 })
  ]),
  productController.create
);
router.put('/:id',
  auth, role('admin'),
  validate([
    body('name').optional().isLength({ min: 2 }),
    body('price').optional().isFloat({ min: 0 }),
    body('stock').optional().isInt({ min: 0 })
  ]),
  productController.update
);
router.delete('/:id', auth, role('admin'), productController.delete);

module.exports = router; 