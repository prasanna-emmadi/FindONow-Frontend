import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userSlice from '../features/user/userSlice'
import { apiSlice } from '../features/api/apiSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)


export default store;