import api from './api';

const cartService = {
  getCart: async () => {
    const res = await api.get('/cart');
    return res.data;
  },

  addToCart: async (productId, quantity) => {
    const res = await api.post('/cart/add', { productId, quantity });
    return res.data;
  },

  updateCartItem: async (itemId, quantity) => {
    const res = await api.put('/cart/update', { itemId, quantity });
    return res.data;
  },

  removeFromCart: async (itemId) => {
    const res = await api.delete('/cart/remove', { data: { itemId } });
    return res.data;
  },

  clearCart: async () => {
    const res = await api.delete('/cart');
    return res.data;
  },
};

export default cartService; 