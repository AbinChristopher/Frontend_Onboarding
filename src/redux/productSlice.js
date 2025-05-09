import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://localhost:7113/api/products');
    return response.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (newProduct) => {
    const response = await axios.post('https://localhost:7113/api/products', newProduct);
    return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (updatedProduct) => {
    const response = await axios.put(`https://localhost:7113/api/products/${updatedProduct.id}`, updatedProduct);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    await axios.delete(`https://localhost:7113/api/products/${productId}`);
    return productId;
});

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((p) => p.id !== action.payload);
            });
    },
});

export default productsSlice.reducer;
