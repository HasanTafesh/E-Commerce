import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import ProfilePage from '../pages/ProfilePage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return isAuthenticated && user.role === 'admin' ? children : <Navigate to="/" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/products/:id" element={<ProductDetailPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/orders" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
    <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes; 