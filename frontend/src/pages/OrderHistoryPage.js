import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../redux/orderSlice';

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchOrders());
  }, [dispatch, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div style={styles.loading}>Loading your orders...</div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Order History</h1>
      {orders.length === 0 ? (
        <div style={styles.empty}>
          <h3>You have no orders yet.</h3>
          <button onClick={() => navigate('/products')} className="btn btn-primary">Shop Now</button>
        </div>
      ) : (
        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className="card" style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <span>Order #{order.id}</span>
                <span>Status: <b>{order.status}</b></span>
                <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div style={styles.itemsList}>
                {order.items.map((item) => (
                  <div key={item.id} style={styles.itemRow}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={styles.orderFooter}>
                <span>Total: <b>${order.total.toFixed(2)}</b></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem 0',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  orderCard: {
    padding: '1.5rem',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontWeight: '500',
    color: '#555',
  },
  itemsList: {
    marginBottom: '1rem',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  orderFooter: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#007bff',
  },
};

export default OrderHistoryPage; 