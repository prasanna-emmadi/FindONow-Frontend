import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../apiSlice";
import authSlice from "../authSlice";
import cartSlice from "../cartSlice";
import productSlice from "../productSlice";

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
