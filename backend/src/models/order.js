const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./index');

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
});

module.exports = Order; 