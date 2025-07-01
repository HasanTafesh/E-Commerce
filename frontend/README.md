# E-Commerce Frontend

A modern React-based e-commerce frontend application with full backend integration.

## Features

- **User Authentication**: Login, register, and profile management
- **Product Management**: Browse products, view details, search and filter
- **Shopping Cart**: Add, update, and remove items
- **Order Management**: Checkout, order history, and order confirmation
- **Admin Dashboard**: Admin-only features (placeholder)
- **Responsive Design**: Mobile-friendly interface
- **State Management**: Redux Toolkit for global state
- **API Integration**: Full backend connectivity

## Tech Stack

- **Frontend**: React 18, Redux Toolkit, React Router
- **Styling**: CSS-in-JS with inline styles
- **HTTP Client**: Axios with interceptors
- **Authentication**: JWT tokens with localStorage
- **Backend Integration**: RESTful API with Node.js/Express

## API Integration

The frontend is fully integrated with the backend API. All endpoints are configured and tested:

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/me` - Get user profile
- `PUT /api/users/me` - Update user profile

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart

### Order Endpoints
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation component
│   └── ProductCard.js  # Product display component
├── pages/              # Page components
│   ├── HomePage.js     # Landing page
│   ├── LoginPage.js    # User login
│   ├── RegisterPage.js # User registration
│   ├── ProductsPage.js # Product listing
│   ├── ProductDetailPage.js # Product details
│   ├── CartPage.js     # Shopping cart
│   ├── CheckoutPage.js # Checkout process
│   ├── OrderHistoryPage.js # Order history
│   ├── ProfilePage.js  # User profile
│   ├── OrderConfirmationPage.js # Order confirmation
│   └── AdminDashboardPage.js # Admin dashboard
├── redux/              # Redux store and slices
│   ├── store.js        # Redux store configuration
│   ├── userSlice.js    # User authentication state
│   ├── productSlice.js # Product state management
│   ├── cartSlice.js    # Cart state management
│   └── orderSlice.js   # Order state management
├── services/           # API service layer
│   ├── api.js          # Axios configuration
│   ├── authService.js  # Authentication API calls
│   ├── productService.js # Product API calls
│   ├── cartService.js  # Cart API calls
│   └── orderService.js # Order API calls
├── routes/             # React Router configuration
│   └── index.js        # Route definitions
└── utils/              # Utility functions
    └── integrationTest.js # API integration testing
```

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

## Backend Integration

### Prerequisites
- Backend server running on `http://localhost:5000`
- Database migrations and seeders executed
- Redis server running (for session management)

### API Configuration
The frontend automatically:
- Adds JWT tokens to authenticated requests
- Handles 401 errors by redirecting to login
- Manages authentication state across page refreshes

### Testing Integration
Run the integration test to verify backend connectivity:
```javascript
import testIntegration from './utils/integrationTest';
testIntegration().then(results => console.log(results));
```

## Authentication Flow

1. **Login/Register**: User credentials sent to backend
2. **Token Storage**: JWT token stored in localStorage
3. **Auto-Auth**: Token automatically added to API requests
4. **State Persistence**: User state maintained across refreshes
5. **Logout**: Token removed, user redirected to home

## Protected Routes

- `/cart` - Requires authentication
- `/checkout` - Requires authentication
- `/orders` - Requires authentication
- `/profile` - Requires authentication
- `/admin` - Requires admin role

## State Management

### Redux Store Structure
```javascript
{
  user: {
    user: null,
    token: string,
    isAuthenticated: boolean,
    loading: boolean,
    error: string
  },
  product: {
    products: [],
    product: null,
    loading: boolean,
    error: string
  },
  cart: {
    cart: { items: [] },
    loading: boolean,
    error: string
  },
  order: {
    orders: [],
    order: null,
    loading: boolean,
    error: string
  }
}
```

## Error Handling

- **API Errors**: Handled by Redux slices with error states
- **Network Errors**: Displayed to users with retry options
- **Auth Errors**: Automatic redirect to login page
- **Validation Errors**: Form-level error display

## Development

### Available Scripts
- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

### Code Style
- Functional components with hooks
- Inline styles for component styling
- Redux Toolkit for state management
- Async/await for API calls

## Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Configure environment variables**:
   ```env
   REACT_APP_API_URL=https://your-backend-api.com/api
   ```

3. **Deploy to your hosting service**:
   - Netlify, Vercel, AWS S3, etc.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for frontend domain
2. **Authentication Issues**: Check JWT token format and expiration
3. **API Connection**: Verify backend server is running and accessible
4. **State Persistence**: Clear localStorage if authentication state is corrupted

### Debug Mode
Enable debug logging by setting:
```javascript
localStorage.setItem('debug', 'true');
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 