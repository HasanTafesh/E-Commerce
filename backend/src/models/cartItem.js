const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./index');

class CartItem extends Model {}

CartItem.init({
  cartId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  sequelize,
  modelName: 'CartItem',
  tableName: 'cart_items',
  timestamps: false,
});

module.exports = CartItem; 