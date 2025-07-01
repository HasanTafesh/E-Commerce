const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./index');

class OrderItem extends Model {}

OrderItem.init({
  orderId: {
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
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'OrderItem',
  tableName: 'order_items',
  timestamps: false,
});

module.exports = OrderItem; 