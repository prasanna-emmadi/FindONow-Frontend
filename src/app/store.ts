import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../redux/auth/authSlice";
import { apiSlice } from "../redux/api/apiSlice";
import cartSlice from "../redux/cart/cartSlice";
import productSlice from "../redux/product/productSlice";

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
