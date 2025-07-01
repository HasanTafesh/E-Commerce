import api from './api';

const orderService = {
  placeOrder: async () => {
    const response = await api.post('/orders');
    return response.data;
  },

  getOrders: async () => {
    const res = await api.get('/orders');
    return res.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  createOrder: async (orderData) => {
    const res = await api.post('/orders', orderData);
    return res.data;
  },
};

export default orderService; 