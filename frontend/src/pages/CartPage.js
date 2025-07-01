import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../redux/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(updateCartItem({ itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.authPrompt}>
          <h2>Please login to view your cart</h2>
          <p>You need to be logged in to access your shopping cart.</p>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading cart...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div style={styles.emptyCart}>
          <h3>Your cart is empty</h3>
          <p>Start shopping to add items to your cart.</p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div style={styles.cartContainer}>
          <div style={styles.itemsContainer}>
            {cart.items.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <div style={styles.itemImage}>
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/100x100?text=Product'}
                    alt={item.name}
                    style={styles.image}
                  />
                </div>

                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>${item.price}</p>
                </div>

                <div style={styles.quantityControls}>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="btn btn-outline-secondary"
                    style={styles.quantityBtn}
                  >
                    -
                  </button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="btn btn-outline-secondary"
                    style={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>

                <div style={styles.itemTotal}>
                  <span style={styles.totalAmount}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="btn btn-outline-danger"
                  style={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={styles.summaryContainer}>
            <div className="card" style={styles.summaryCard}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>
              
              <div style={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span>Tax (10%):</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span>Total:</span>
                <span style={styles.totalPrice}>${calculateTotal().toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn btn-primary"
                style={styles.checkoutBtn}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
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
  authPrompt: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
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
  cartContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto auto auto',
    gap: '1rem',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  itemImage: {
    width: '80px',
    height: '80px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  itemName: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  itemPrice: {
    margin: 0,
    color: '#666',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityBtn: {
    width: '32px',
    height: '32px',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    minWidth: '40px',
    textAlign: 'center',
    fontWeight: '500',
  },
  itemTotal: {
    textAlign: 'right',
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  removeBtn: {
    padding: '0.5rem 1rem',
  },
  summaryContainer: {
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
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  totalPrice: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#007bff',
  },
  checkoutBtn: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
};

export default CartPage; 