import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container">
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Welcome to Our E-Commerce Store</h1>
            <p style={styles.heroSubtitle}>
              Discover amazing products at great prices. Shop with confidence!
            </p>
            <div style={styles.heroButtons}>
              <Link to="/products" className="btn btn-primary" style={styles.heroBtn}>
                Shop Now
              </Link>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-secondary" style={styles.heroBtn}>
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={styles.featured}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Featured Products</h2>
          {loading ? (
            <div style={styles.loading}>Loading products...</div>
          ) : (
            <div style={styles.productsGrid}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div style={styles.viewAll}>
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '4rem 0',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  heroBtn: {
    fontSize: '1.1rem',
    padding: '0.75rem 2rem',
  },
  featured: {
    padding: '4rem 0',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '3rem',
    color: '#333',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    padding: '2rem',
  },
  viewAll: {
    textAlign: 'center',
  },
};

export default HomePage; 