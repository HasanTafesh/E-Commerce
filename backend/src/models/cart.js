const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./index');

class Cart extends Model {}

Cart.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'ordered'),
    defaultValue: 'active',
  },
}, {
  sequelize,
  modelName: 'Cart',
  tableName: 'carts',
});

module.exports = Cart; 