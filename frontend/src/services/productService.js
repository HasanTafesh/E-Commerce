import api from './api';

const productService = {
  getProducts: async () => {
    const res = await api.get('/products');
    return res.data;
  },

  getProductById: async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
};

export default productService; 