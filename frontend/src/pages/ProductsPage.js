import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredAndSortedProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>All Products</h1>
        
        <div style={styles.controls}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          
          <div style={styles.sortContainer}>
            <label htmlFor="sort" style={styles.sortLabel}>Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.sortSelect}
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={styles.loading}>Loading products...</div>
      ) : (
        <>
          <div style={styles.results}>
            <p>Showing {filteredAndSortedProducts.length} of {products.length} products</p>
          </div>
          
          {filteredAndSortedProducts.length === 0 ? (
            <div style={styles.noResults}>
              <h3>No products found</h3>
              <p>Try adjusting your search terms or browse all products.</p>
            </div>
          ) : (
            <div style={styles.productsGrid}>
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem 0',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchContainer: {
    flex: 1,
    minWidth: '250px',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  sortLabel: {
    fontWeight: '500',
    color: '#666',
  },
  sortSelect: {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  results: {
    marginBottom: '1rem',
    color: '#666',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    padding: '3rem',
  },
  noResults: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
};

export default ProductsPage; 