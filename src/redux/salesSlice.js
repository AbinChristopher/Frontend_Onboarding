import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
    const response = await axios.get('https://localhost:7113/api/sales');
    return response.data;
});

export const createSale = createAsyncThunk('sales/createSale', async (newSale) => {
    const response = await axios.post('https://localhost:7113/api/sales', newSale);
    return response.data;
});

export const updateSale = createAsyncThunk('sales/updateSale', async (updatedSale) => {
    const response = await axios.put(`https://localhost:7113/api/sales/${updatedSale.id}`, updatedSale);
    return response.data;
});

export const deleteSale = createAsyncThunk('sales/deleteSale', async (saleId) => {
    await axios.delete(`https://localhost:7113/api/sales/${saleId}`);
    return saleId;
});

const initialState = {
    sales: [],
    loading: false,
    error: null,
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.loading = false;
                state.sales = action.payload;
            })
            .addCase(fetchSales.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createSale.fulfilled, (state, action) => {
                // Immediately add the new sale to the state
                state.sales.push(action.payload);
            })
            .addCase(updateSale.fulfilled, (state, action) => {
                // Update the sale in the state immediately after the update
                const index = state.sales.findIndex((s) => s.id === action.payload.id);
                if (index !== -1) {
                    state.sales[index] = action.payload;
                }
            })
            .addCase(deleteSale.fulfilled, (state, action) => {
                // Remove the deleted sale from the state
                state.sales = state.sales.filter((s) => s.id !== action.payload);
            });
    },
});

export default salesSlice.reducer;
