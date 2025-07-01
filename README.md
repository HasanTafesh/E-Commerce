# E-Commerce Full-Stack Application

A complete, production-ready e-commerce platform built with Node.js, React, PostgreSQL, and Redis. This project demonstrates modern full-stack development practices with a focus on scalability, security, and user experience.

## 🚀 Features

### User Features
- **Authentication & Authorization**: Secure JWT-based login/register system
- **Product Catalog**: Browse, search, and filter products
- **Shopping Cart**: Add, update, and remove items with real-time updates
- **Order Management**: Complete checkout process with order history
- **User Profile**: View and update personal information
- **Responsive Design**: Mobile-first approach with modern UI/UX

### Admin Features
- **Admin Dashboard**: Overview of sales, users, and products
- **Product Management**: CRUD operations for products
- **Order Management**: View and manage customer orders
- **User Management**: Monitor and manage user accounts

### Technical Features
- **Real-time Updates**: Redis caching for performance
- **Database Migrations**: Version-controlled database schema
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Graceful error handling and user feedback
- **Security**: JWT authentication, role-based access control
- **API Documentation**: RESTful API with proper status codes

## 🏗️ Architecture

```
e-commerce_project/
├── backend-pro/           # Node.js/Express API Server
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API route definitions
│   │   ├── middlewares/   # Custom middleware
│   │   ├── migrations/    # Database migrations
│   │   ├── seeders/       # Database seeders
│   │   └── services/      # Business logic services
│   ├── Dockerfile         # Container configuration
│   └── docker-compose.yml # Multi-service setup
└── frontend-pro/          # React Frontend Application
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Page components
    │   ├── redux/         # State management
    │   ├── services/      # API service layer
    │   └── routes/        # React Router configuration
    └── public/            # Static assets
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Cache**: Redis for session management
- **Authentication**: JWT tokens
- **Validation**: express-validator
- **Documentation**: JSDoc
- **Containerization**: Docker & Docker Compose

### Frontend
- **Framework**: React 18 with Hooks
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Styling**: CSS-in-JS with inline styles
- **Build Tool**: Create React App

### DevOps
- **Containerization**: Docker
- **Environment**: Environment variables
- **Version Control**: Git
- **Package Management**: npm/yarn

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Redis** (v6 or higher)
- **Docker** and **Docker Compose** (optional, for containerized deployment)

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd e-commerce_project
   ```

2. **Start all services**:
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations and seeders**:
   ```bash
   docker-compose exec backend npm run migrate
   docker-compose exec backend npm run seed
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432
   - Redis: localhost:6379

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend-pro
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the `backend-pro` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=ecommerce_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   
   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   
   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Database Setup**:
   ```bash
   # Create database
   createdb ecommerce_db
   
   # Run migrations
   npm run migrate
   
   # Seed data
   npm run seed
   ```

5. **Start the server**:
   ```bash
   npm start
   ```

#### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend-pro
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the `frontend-pro` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "stock": 100,
  "imageUrl": "https://example.com/image.jpg"
}
```

### Cart Endpoints

#### Get User Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add Item to Cart
```http
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /api/cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": 1,
  "quantity": 3
}
```

#### Remove Item from Cart
```http
DELETE /api/cart/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": 1
}
```

### Order Endpoints

#### Get User Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 29.99
    }
  ],
  "total": 59.98
}
```

### User Endpoints

#### Get User Profile
```http
GET /api/users/me
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "new_username",
  "email": "newemail@example.com"
}
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Carts Table
```sql
CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES carts(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Development

### Available Scripts

#### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run migrate    # Run database migrations
npm run seed       # Seed database with sample data
npm test           # Run tests
npm run lint       # Run ESLint
```

#### Frontend Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Code Style Guidelines

- **Backend**: Use ES6+ features, async/await, proper error handling
- **Frontend**: Functional components with hooks, Redux Toolkit patterns
- **Database**: Use migrations for schema changes, seeders for test data
- **API**: RESTful conventions, proper HTTP status codes, validation

### Testing

#### Backend Testing
```bash
cd backend-pro
npm test
```

#### Frontend Testing
```bash
cd frontend-pro
npm test
```

#### Integration Testing
```javascript
// In frontend-pro/src/utils/integrationTest.js
import testIntegration from './utils/integrationTest';
testIntegration().then(results => console.log(results));
```

## 🚀 Deployment

### Production Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=ecommerce_prod
DB_USER=your_db_user
DB_PASSWORD=your_db_password
REDIS_HOST=your_redis_host
REDIS_PORT=6379
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=1d
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-api.com/api
```

### Docker Deployment

1. **Build and push images**:
   ```bash
   docker build -t your-registry/ecommerce-backend ./backend-pro
   docker build -t your-registry/ecommerce-frontend ./frontend-pro
   docker push your-registry/ecommerce-backend
   docker push your-registry/ecommerce-frontend
   ```

2. **Deploy with Docker Compose**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Cloud Deployment

#### AWS Deployment
- **Backend**: Deploy to EC2 or ECS
- **Frontend**: Deploy to S3 + CloudFront
- **Database**: Use RDS for PostgreSQL
- **Cache**: Use ElastiCache for Redis

#### Heroku Deployment
- **Backend**: Deploy as Node.js app
- **Frontend**: Deploy as static site
- **Database**: Use Heroku Postgres addon
- **Cache**: Use Heroku Redis addon

## 🔒 Security Considerations

- **JWT Tokens**: Secure token storage and rotation
- **Input Validation**: Comprehensive validation on all inputs
- **SQL Injection**: Use parameterized queries with Sequelize
- **XSS Protection**: Sanitize user inputs
- **CORS**: Configure proper CORS policies
- **Rate Limiting**: Implement API rate limiting
- **HTTPS**: Use HTTPS in production
- **Environment Variables**: Secure storage of sensitive data

## 📊 Performance Optimization

- **Redis Caching**: Cache frequently accessed data
- **Database Indexing**: Proper indexes on frequently queried columns
- **Image Optimization**: Compress and optimize product images
- **Code Splitting**: Lazy load components in React
- **CDN**: Use CDN for static assets
- **Database Connection Pooling**: Optimize database connections

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists

2. **Redis Connection Errors**:
   - Verify Redis server is running
   - Check Redis configuration

3. **CORS Errors**:
   - Verify CORS_ORIGIN in backend .env
   - Check frontend API_URL configuration

4. **Authentication Issues**:
   - Clear localStorage and re-login
   - Check JWT token expiration
   - Verify JWT_SECRET configuration

5. **Port Conflicts**:
   - Change PORT in .env files
   - Kill processes using required ports

### Debug Mode

Enable debug logging:
```bash
# Backend
DEBUG=* npm run dev

# Frontend
REACT_APP_DEBUG=true npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

1. **Create Issue**: Describe the feature or bug
2. **Create Branch**: Use descriptive branch names
3. **Write Code**: Follow coding standards
4. **Write Tests**: Ensure good test coverage
5. **Submit PR**: Include description and tests
6. **Code Review**: Address feedback
7. **Merge**: Squash and merge to main

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Express.js** for the robust backend framework
- **React** for the powerful frontend library
- **Sequelize** for the excellent ORM
- **Redux Toolkit** for state management
- **PostgreSQL** for the reliable database
- **Redis** for fast caching

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the troubleshooting section

---

**Happy Coding! 🚀** 