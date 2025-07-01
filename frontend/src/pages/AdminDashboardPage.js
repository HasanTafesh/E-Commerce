import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!isAuthenticated || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <div style={styles.sections}>
        <div className="card" style={styles.card}>
          <h2>Summary Stats</h2>
          <ul>
            <li>Total Users: (placeholder)</li>
            <li>Total Products: (placeholder)</li>
            <li>Total Orders: (placeholder)</li>
            <li>Revenue: (placeholder)</li>
          </ul>
        </div>
        <div className="card" style={styles.card}>
          <h2>Manage Products</h2>
          <button className="btn btn-primary">Go to Product Management</button>
        </div>
        <div className="card" style={styles.card}>
          <h2>Manage Orders</h2>
          <button className="btn btn-primary">Go to Order Management</button>
        </div>
        <div className="card" style={styles.card}>
          <h2>Manage Users</h2>
          <button className="btn btn-primary">Go to User Management</button>
        </div>
      </div>
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
  sections: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    padding: '2rem',
  },
};

export default AdminDashboardPage; 