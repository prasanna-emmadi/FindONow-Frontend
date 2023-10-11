import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import authSlice from "../auth/authSlice";
import cartSlice from "../cart/cartSlice";
import productSlice from "../product/productSlice";

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
