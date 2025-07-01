import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store; 