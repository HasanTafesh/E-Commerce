import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../services/cartService';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
  try {
    return await cartService.getCart();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, thunkAPI) => {
  try {
    return await cartService.addToCart(productId, quantity);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, quantity }, thunkAPI) => {
  try {
    return await cartService.updateCartItem(itemId, quantity);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId, thunkAPI) => {
  try {
    return await cartService.removeFromCart(itemId);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  try {
    return await cartService.clearCart();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: { items: [] },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = { items: [] };
      });
  },
});

export default cartSlice.reducer; 