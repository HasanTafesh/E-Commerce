// Integration test utility to verify backend-frontend connectivity
import api from '../services/api';

export const testIntegration = async () => {
  const results = {
    auth: {},
    products: {},
    cart: {},
    orders: {},
    users: {}
  };

  try {
    // Test public endpoints
    console.log('Testing public endpoints...');
    
    // Test products endpoint
    try {
      const productsResponse = await api.get('/products');
      results.products.getAll = {
        success: true,
        data: productsResponse.data,
        message: 'Products fetched successfully'
      };
    } catch (error) {
      results.products.getAll = {
        success: false,
        error: error.response?.data?.message || error.message,
        message: 'Failed to fetch products'
      };
    }

    // Test single product endpoint
    try {
      const productResponse = await api.get('/products/1');
      results.products.getById = {
        success: true,
        data: productResponse.data,
        message: 'Product fetched successfully'
      };
    } catch (error) {
      results.products.getById = {
        success: false,
        error: error.response?.data?.message || error.message,
        message: 'Failed to fetch product'
      };
    }

    // Test auth endpoints
    console.log('Testing auth endpoints...');
    
    // Test registration
    try {
      const registerResponse = await api.post('/auth/register', {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      results.auth.register = {
        success: true,
        data: registerResponse.data,
        message: 'Registration successful'
      };
    } catch (error) {
      results.auth.register = {
        success: false,
        error: error.response?.data?.message || error.message,
        message: 'Registration failed'
      };
    }

    // Test login
    try {
      const loginResponse = await api.post('/auth/login', {
        email: 'test@example.com',
        password: 'password123'
      });
      results.auth.login = {
        success: true,
        data: loginResponse.data,
        message: 'Login successful'
      };
      
      // Store token for authenticated requests
      const token = loginResponse.data.token;
      localStorage.setItem('token', token);
      
      // Test authenticated endpoints
      console.log('Testing authenticated endpoints...');
      
      // Test user profile
      try {
        const profileResponse = await api.get('/users/me');
        results.users.getProfile = {
          success: true,
          data: profileResponse.data,
          message: 'Profile fetched successfully'
        };
      } catch (error) {
        results.users.getProfile = {
          success: false,
          error: error.response?.data?.message || error.message,
          message: 'Failed to fetch profile'
        };
      }

      // Test cart endpoints
      try {
        const cartResponse = await api.get('/cart');
        results.cart.getCart = {
          success: true,
          data: cartResponse.data,
          message: 'Cart fetched successfully'
        };
      } catch (error) {
        results.cart.getCart = {
          success: false,
          error: error.response?.data?.message || error.message,
          message: 'Failed to fetch cart'
        };
      }

      // Test add to cart
      try {
        const addToCartResponse = await api.post('/cart/add', {
          productId: 1,
          quantity: 1
        });
        results.cart.addToCart = {
          success: true,
          data: addToCartResponse.data,
          message: 'Added to cart successfully'
        };
      } catch (error) {
        results.cart.addToCart = {
          success: false,
          error: error.response?.data?.message || error.message,
          message: 'Failed to add to cart'
        };
      }

      // Test orders
      try {
        const ordersResponse = await api.get('/orders');
        results.orders.getOrders = {
          success: true,
          data: ordersResponse.data,
          message: 'Orders fetched successfully'
        };
      } catch (error) {
        results.orders.getOrders = {
          success: false,
          error: error.response?.data?.message || error.message,
          message: 'Failed to fetch orders'
        };
      }

    } catch (error) {
      results.auth.login = {
        success: false,
        error: error.response?.data?.message || error.message,
        message: 'Login failed'
      };
    }

  } catch (error) {
    console.error('Integration test failed:', error);
  }

  // Clean up test token
  localStorage.removeItem('token');
  
  console.log('Integration test results:', results);
  return results;
};

export default testIntegration; 