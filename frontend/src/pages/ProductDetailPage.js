import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearProduct } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: product.id, quantity }));
    setQuantity(1);
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={styles.error}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.breadcrumb}>
        <button onClick={() => navigate('/products')} style={styles.backBtn}>
          ← Back to Products
        </button>
      </div>

      <div style={styles.productContainer}>
        <div style={styles.imageContainer}>
          <img
            src={product.imageUrl || 'https://via.placeholder.com/500x400?text=Product'}
            alt={product.name}
            style={styles.image}
          />
        </div>

        <div style={styles.detailsContainer}>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.description}>{product.description}</p>
          
          <div style={styles.priceContainer}>
            <span style={styles.price}>${product.price}</span>
            <span style={styles.stock}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          {isAuthenticated && product.stock > 0 && (
            <div style={styles.cartSection}>
              <div style={styles.quantityContainer}>
                <label htmlFor="quantity" style={styles.quantityLabel}>
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={styles.quantityInput}
                />
              </div>
              
              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={styles.addToCartBtn}
              >
                Add to Cart
              </button>
            </div>
          )}

          {!isAuthenticated && (
            <div style={styles.loginPrompt}>
              <p>Please login to add this item to your cart.</p>
              <button
                onClick={() => navigate('/login')}
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem 0',
  },
  breadcrumb: {
    marginBottom: '2rem',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '0',
  },
  productContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    alignItems: 'start',
  },
  imageContainer: {
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#666',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  price: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#007bff',
  },
  stock: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e9ecef',
    borderRadius: '20px',
    fontSize: '0.9rem',
    color: '#666',
  },
  cartSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  quantityLabel: {
    fontWeight: '500',
    color: '#333',
  },
  quantityInput: {
    width: '80px',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  addToCartBtn: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  loginPrompt: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #dee2e6',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
};

export default ProductDetailPage; 