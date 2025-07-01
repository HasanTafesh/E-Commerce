import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../redux/cartSlice';
import { createOrder } from '../redux/orderSlice';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading: cartLoading } = useSelector((state) => state.cart);
  const { loading: orderLoading, error } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchCart());
  }, [dispatch, isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zipCode) errors.zipCode = 'ZIP code is required';
    if (!formData.country) errors.country = 'Country is required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const orderData = {
        shippingAddress: formData,
        items: cart.items,
        total: calculateTotal(),
      };
      dispatch(createOrder(orderData));
    }
  };

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1;
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 10; // Free shipping over $100
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  if (!isAuthenticated) {
    return null;
  }

  if (cartLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading checkout...</div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyCart}>
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checkout.</p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>

      <div style={styles.checkoutContainer}>
        <div style={styles.formContainer}>
          <div className="card" style={styles.formCard}>
            <h2 style={styles.formTitle}>Shipping Information</h2>
            
            {error && <div className="error" style={styles.error}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                  {validationErrors.firstName && (
                    <div className="error">{validationErrors.firstName}</div>
                  )}
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                  {validationErrors.lastName && (
                    <div className="error">{validationErrors.lastName}</div>
                  )}
                </div>
              </div>

              <div style={styles.formRow}>
                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                  {validationErrors.email && (
                    <div className="error">{validationErrors.email}</div>
                  )}
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                  {validationErrors.phone && (
                    <div className="error">{validationErrors.phone}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter street address"
                />
                {validationErrors.address && (
                  <div className="error">{validationErrors.address}</div>
                )}
              </div>

              <div style={styles.formRow}>
                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />
                  {validationErrors.city && (
                    <div className="error">{validationErrors.city}</div>
                  )}
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />
                  {validationErrors.state && (
                    <div className="error">{validationErrors.state}</div>
                  )}
                </div>
              </div>

              <div style={styles.formRow}>
                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter ZIP code"
                  />
                  {validationErrors.zipCode && (
                    <div className="error">{validationErrors.zipCode}</div>
                  )}
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                  />
                  {validationErrors.country && (
                    <div className="error">{validationErrors.country}</div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={styles.submitBtn}
                disabled={orderLoading}
              >
                {orderLoading ? 'Processing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>

        <div style={styles.summaryContainer}>
          <div className="card" style={styles.summaryCard}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
            
            <div style={styles.itemsList}>
              {cart.items.map((item) => (
                <div key={item.id} style={styles.summaryItem}>
                  <div style={styles.itemInfo}>
                    <span style={styles.itemName}>{item.name}</span>
                    <span style={styles.itemQuantity}>x{item.quantity}</span>
                  </div>
                  <span style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={styles.summaryDivider}></div>

            <div style={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            
            <div style={styles.summaryRow}>
              <span>Tax (10%):</span>
              <span>${calculateTax().toFixed(2)}</span>
            </div>
            
            <div style={styles.summaryRow}>
              <span>Shipping:</span>
              <span>{calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}</span>
            </div>
            
            <div style={styles.summaryRow}>
              <span style={styles.totalLabel}>Total:</span>
              <span style={styles.totalPrice}>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
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
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#666',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  checkoutContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
  },
  formContainer: {
    order: 1,
  },
  formCard: {
    padding: '2rem',
  },
  formTitle: {
    marginBottom: '2rem',
    fontSize: '1.8rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  formGroup: {
    margin: 0,
  },
  submitBtn: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  summaryContainer: {
    order: 2,
    alignSelf: 'start',
  },
  summaryCard: {
    padding: '1.5rem',
  },
  summaryTitle: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    color: '#333',
  },
  itemsList: {
    marginBottom: '1.5rem',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    padding: '0.5rem 0',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  itemName: {
    fontWeight: '500',
  },
  itemQuantity: {
    fontSize: '0.9rem',
    color: '#666',
  },
  itemPrice: {
    fontWeight: '500',
  },
  summaryDivider: {
    height: '1px',
    backgroundColor: '#dee2e6',
    margin: '1rem 0',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  totalPrice: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#007bff',
  },
  error: {
    marginBottom: '1rem',
  },
};

export default CheckoutPage; 