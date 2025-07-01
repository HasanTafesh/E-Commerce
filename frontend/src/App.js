import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './redux/userSlice';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import AppRoutes from './routes';

const App = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // Check if user has a token but is not authenticated (e.g., page refresh)
    if (token && !isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, token, isAuthenticated]);

  return (
    <Router>
      <Navbar />
      {/* Global notification placeholder */}
      <div id="notification-root" style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}></div>
      <main style={{ minHeight: 'calc(100vh - 120px)', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <AppRoutes />
      </main>
    </Router>
  );
};

export default App; 