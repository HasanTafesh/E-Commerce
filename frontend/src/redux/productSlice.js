import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../services/productService';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchProductById = createAsyncThunk('product/fetchProductById', async (id, thunkAPI) => {
  try {
    return await productService.getProductById(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer; 