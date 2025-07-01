import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const res = await api.get('/users/me');
    return res.data;
  },

  updateProfile: async (profileData) => {
    const res = await api.put('/users/me', profileData);
    return res.data;
  },
};

export default authService; 