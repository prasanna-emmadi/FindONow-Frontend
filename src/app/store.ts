import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../features/auth/authSlice";
import { apiSlice } from "../features/api/apiSlice";
import cartSlice from "../features/cart/cartSlice";
import productSlice from "../features/product/productSlice";

const createStore = () => {
    const store = configureStore({
        reducer: {
            auth: authSlice.reducer,
            cart: cartSlice.reducer,
            product: productSlice.reducer,
            [apiSlice.reducerPath]: apiSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    });
    setupListeners(store.dispatch);
    return store;
};

export default createStore;
