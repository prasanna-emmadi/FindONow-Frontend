import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "../../types/cartType";
import { ProductType } from "../../types/productType";

export interface CartState {
    cartItems: CartItemType[];
    totalItems: number;
}
const initialState: CartState = {
    cartItems: [],
    totalItems: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductType>) => {
            const clickedItem = action.payload;
            const cartItems = state.cartItems;
            const index = cartItems.findIndex(
                (item) => item.product.id === clickedItem.id,
            );

            if (index !== -1) {
                cartItems[index].amount += 1;
            } else {
                cartItems.push({ product: { ...clickedItem }, amount: 1 });
            }
            state.totalItems = cartItems.reduce(
                (ack: number, item) => ack + item.amount,
                0,
            );
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            let cartItems = state.cartItems;
            const index = cartItems.findIndex((item) => item.product.id === id);
            if (index !== -1) {
                if (cartItems[index].amount === 1) {
                    cartItems.splice(index, 1);
                } else {
                    cartItems[index].amount -= 1;
                }
            }
            state.totalItems = cartItems.reduce(
                (ack: number, item) => ack + item.amount,
                0,
            );
        },
    },
});
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice;
