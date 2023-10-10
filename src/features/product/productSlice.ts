import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/productType";

export enum SortOrder {
    Increasing,
    Decreasing,
    NoOrder,
}

export interface ProductsState {
    products: ProductType[];
    sortOrder: SortOrder;
    originalProducts: ProductType[];
}

const initialState: ProductsState = {
    products: [],
    sortOrder: SortOrder.NoOrder,
    originalProducts: [],
};

const sortProducts = (p1: ProductType, p2: ProductType) => {
    const p1Title = p1.title.toLocaleLowerCase();
    const p2Title = p2.title.toLocaleLowerCase();
    return p1Title.localeCompare(p2Title);
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
        },
        sortBy: (state, action: PayloadAction<SortOrder>) => {
            switch (action.payload) {
                case SortOrder.Increasing: {
                    state.products.sort(sortProducts);
                    break;
                }
                case SortOrder.Decreasing: {
                    state.products.sort(sortProducts).reverse();
                    break;
                }
                default:
                    break;
            }
        },
        searchBy: (state, action: PayloadAction<string>) => {
            const search = action.payload;
            state.products = state.originalProducts.filter((product) => {
                return (
                    product.description.includes(search) ||
                    product.title.includes(search)
                );
            });
        },
    },
});

export const { addProducts, sortBy, searchBy } = productSlice.actions;

export default productSlice;
