import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types/productType';
export interface ProductState {
    product?: Product
}

// Define the initial state using that type
const initialState: ProductState = {
    product: undefined
}

export const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        createProduct: (state, action: PayloadAction<Product>) => {
            //state.product += 1
            state.product = action.payload;
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            //state.product -= 1
            state.product = action.payload;
        },
    }
})
export const { createProduct, updateProduct } = productsSlice.actions

export default productsSlice