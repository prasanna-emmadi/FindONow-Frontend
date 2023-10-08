import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "../features/user/userSlice";
import { apiSlice } from "../features/api/apiSlice";
import { cartSlice } from "../features/cart/cartSlice";

const createStore = () => {
    const store = configureStore({
        reducer: {
            user: userSlice.reducer,
            cart: cartSlice.reducer,
            [apiSlice.reducerPath]: apiSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    });
    setupListeners(store.dispatch);
    return store;
};

export default createStore;
