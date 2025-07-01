const { Sequelize } = require('sequelize');
const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const CartItem = require('./cartItem');
const Order = require('./order');
const OrderItem = require('./orderItem');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

// Associations
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Cart.belongsToMany(Product, { through: CartItem, foreignKey: 'cartId', otherKey: 'productId' });
Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'productId', otherKey: 'cartId' });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId', otherKey: 'productId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId', otherKey: 'orderId' });

module.exports = { sequelize, User, Product, Cart, CartItem, Order, OrderItem }; 