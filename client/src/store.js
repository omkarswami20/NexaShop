import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import authReducer from './features/authSlice';
import productReducer from './features/productSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
