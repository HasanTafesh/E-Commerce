import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>E-Commerce</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        {isAuthenticated && (
          <Link to="/orders" style={styles.link}>Orders</Link>
        )}
        {isAuthenticated && (
          <Link to="/profile" style={styles.link}>Profile</Link>
        )}
        {isAuthenticated && user?.role === 'admin' && (
          <Link to="/admin" style={styles.link}>Admin</Link>
        )}
      </div>
      <div style={styles.right}>
        <Link to="/cart" style={styles.cartLink}>
          Cart
          {cart.items.length > 0 && (
            <span style={styles.cartCount}>{cart.items.length}</span>
          )}
        </Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#fff',
    borderBottom: '1px solid #eee',
    marginBottom: '2rem',
    minHeight: '60px',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#007bff',
    textDecoration: 'none',
    marginRight: '2rem',
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
  },
  cartLink: {
    position: 'relative',
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    marginRight: '1rem',
  },
  cartCount: {
    position: 'absolute',
    top: '-8px',
    right: '-16px',
    background: '#007bff',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 8px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Navbar; 