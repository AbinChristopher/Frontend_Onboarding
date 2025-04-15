import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './customersSlice';  // Reducer for customers
import productsReducer from './productSlice';    // Reducer for products
import salesReducer from './salesSlice';          // Reducer for sales
import storesReducer from './storeSlice';         // Reducer for stores

const store = configureStore({
    reducer: {
        customers: customersReducer,  // This will map the customersSlice reducer to the customers state
        products: productsReducer,    // This will map the productsSlice reducer to the products state
        sales: salesReducer,          // This will map the salesSlice reducer to the sales state
        stores: storesReducer,        // This will map the storesSlice reducer to the stores state
    },
});

export default store;
