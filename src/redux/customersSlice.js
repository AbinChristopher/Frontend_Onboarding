import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for asynchronous actions

// Fetch customers
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    const response = await axios.get('https://localhost:7113/api/customers');
    return response.data;
});

// Create customer
export const createCustomer = createAsyncThunk('customers/createCustomer', async (newCustomer) => {
    const response = await axios.post('https://localhost:7113/api/customers', newCustomer);
    return response.data;
});

// Edit customer
export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (updatedCustomer) => {
    const response = await axios.put(`https://localhost:7113/api/customers/${updatedCustomer.id}`, updatedCustomer);
    return response.data;
});

// Delete customer
export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (customerId) => {
    await axios.delete(`https://localhost:7113/api/customers/${customerId}`);
    return customerId;
});

// Initial state
const initialState = {
    customers: [],
    loading: false,
    error: null,
};

// Slice
const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload);
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.customers.findIndex((cust) => cust.id === action.payload.id);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter((cust) => cust.id !== action.payload);
            });
    },
});

export default customersSlice.reducer;
