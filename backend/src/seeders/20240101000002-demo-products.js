'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced camera system and A17 Pro chip',
        price: 999.99,
        imageUrl: 'https://example.com/iphone15pro.jpg',
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'MacBook Air M2',
        description: 'Lightweight laptop with M2 chip and all-day battery life',
        price: 1199.99,
        imageUrl: 'https://example.com/macbook-air-m2.jpg',
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'AirPods Pro',
        description: 'Wireless earbuds with active noise cancellation',
        price: 249.99,
        imageUrl: 'https://example.com/airpods-pro.jpg',
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        name: 'iPad Air',
        description: 'Versatile tablet with M1 chip and 10.9-inch display',
        price: 599.99,
        imageUrl: 'https://example.com/ipad-air.jpg',
        stock: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        name: 'Apple Watch Series 9',
        description: 'Smartwatch with health monitoring and fitness tracking',
        price: 399.99,
        imageUrl: 'https://example.com/apple-watch-series9.jpg',
        stock: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
}; 