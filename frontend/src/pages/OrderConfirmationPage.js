import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div style={styles.container}>
        <h2>No order found.</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">Shop Now</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Thank You for Your Order!</h1>
      <div className="card" style={styles.card}>
        <h2>Order #{order.id}</h2>
        <p>Status: <b>{order.status}</b></p>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <div style={styles.itemsList}>
          {order.items.map((item) => (
            <div key={item.id} style={styles.itemRow}>
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div style={styles.summaryRow}>
          <span>Total:</span>
          <span style={styles.totalPrice}>${order.total.toFixed(2)}</span>
        </div>
      </div>
      <button onClick={() => navigate('/orders')} className="btn btn-primary" style={styles.ordersBtn}>View My Orders</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem 0',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
  },
  card: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
  },
  itemsList: {
    margin: '1.5rem 0',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginTop: '1.5rem',
  },
  totalPrice: {
    color: '#007bff',
  },
  ordersBtn: {
    marginTop: '2rem',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
};

export default OrderConfirmationPage; 