# E-commerce Backend API

A professional Node.js backend for e-commerce applications using Express, Sequelize (PostgreSQL), Redis, and JWT authentication.

## Features

- **Authentication**: JWT-based user registration and login
- **Products**: CRUD operations with admin-only protection
- **Cart Management**: Add, update, remove products from cart
- **Orders**: Place orders from cart, view order history
- **User Profiles**: Get and update user information
- **Payment Simulation**: Simulate payment processing
- **Input Validation**: Request validation using express-validator
- **Security**: Role-based access control, password hashing
- **Database Migrations**: Version-controlled database schema
- **Seed Data**: Demo users and products

## Tech Stack

- Node.js & Express
- PostgreSQL with Sequelize ORM
- Redis for caching/sessions
- JWT for authentication
- bcrypt for password hashing
- express-validator for input validation

## Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Redis

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend-pro
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=ecommerce
   DB_USER=postgres
   DB_PASS=password
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   ```

4. Set up the database:
   ```bash
   # Run migrations to create tables
   npm run db:migrate
   
   # Seed the database with demo data
   npm run db:seed
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

## Database Management

### Migrations
- `npm run db:migrate` - Run all pending migrations
- `npm run db:migrate:undo` - Undo the last migration

### Seeders
- `npm run db:seed` - Run all seeders
- `npm run db:seed:undo` - Undo all seeders

### Demo Data
The seeders create:
- **Admin user**: `admin@example.com` / `password123`
- **Regular user**: `user@example.com` / `password123`
- **5 demo products**: iPhone, MacBook, AirPods, iPad, Apple Watch

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/update` - Update product quantity
- `DELETE /api/cart/remove` - Remove product from cart

### Orders
- `POST /api/orders` - Place order from cart
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get specific order

### User Profile
- `GET /api/users/me` - Get user profile
- `PUT /api/users/me` - Update user profile

### Payment
- `POST /api/payment/pay` - Simulate payment

## Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Add product to cart (with auth token)
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"productId":"product-uuid","quantity":2}'
```

## Database Schema

### Users
- id (UUID, primary key)
- username (string, unique)
- email (string, unique)
- password (string, hashed)
- role (enum: 'user', 'admin')

### Products
- id (UUID, primary key)
- name (string)
- description (text)
- price (decimal)
- imageUrl (string)
- stock (integer)

### Carts
- id (UUID, primary key)
- userId (UUID, foreign key)
- status (enum: 'active', 'ordered')

### Cart Items
- cartId (UUID, composite primary key)
- productId (UUID, composite primary key)
- quantity (integer)

### Orders
- id (UUID, primary key)
- userId (UUID, foreign key)
- total (decimal)
- status (enum: 'pending', 'paid', 'shipped', 'completed', 'cancelled')

### Order Items
- orderId (UUID, composite primary key)
- productId (UUID, composite primary key)
- quantity (integer)
- price (decimal)

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:migrate:undo` - Undo last migration
- `npm run db:seed` - Seed database with demo data
- `npm run db:seed:undo` - Undo all seeders

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- CORS enabled
- Helmet for security headers 