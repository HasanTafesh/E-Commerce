import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    dispatch(addToCart({ productId: product.id, quantity }));
    setQuantity(1);
  };

  return (
    <div className="card" style={styles.card}>
      <img 
        src={product.imageUrl || 'https://via.placeholder.com/300x200?text=Product'} 
        alt={product.name}
        style={styles.image}
      />
      <div style={styles.content}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.price}>${product.price}</p>
        <p style={styles.stock}>Stock: {product.stock}</p>
        
        <div style={styles.actions}>
          <Link to={`/products/${product.id}`} className="btn btn-secondary" style={styles.viewBtn}>
            View Details
          </Link>
          
          {isAuthenticated && (
            <div style={styles.cartActions}>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={styles.quantityInput}
              />
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={styles.addBtn}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  content: {
    padding: '1rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  description: {
    color: '#666',
    marginBottom: '1rem',
    flex: 1,
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '0.5rem',
  },
  stock: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  viewBtn: {
    textAlign: 'center',
  },
  cartActions: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  quantityInput: {
    width: '60px',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  addBtn: {
    flex: 1,
  },
};

export default ProductCard; 