import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/productType";

export enum SortOrder {
    Increasing,
    Decreasing,
    NoOrder,
}

export interface ProductsState {
    products: ProductType[];
    productsSlice: ProductType[];
    sortOrder: SortOrder;
    originalProducts: ProductType[];
}

const initialState: ProductsState = {
    products: [],
    productsSlice: [],
    sortOrder: SortOrder.NoOrder,
    originalProducts: [],
};

const sortProductsByTitle = (p1: ProductType, p2: ProductType) => {
    const p1Title = p1.title.toLocaleLowerCase();
    const p2Title = p2.title.toLocaleLowerCase();
    return p1Title.localeCompare(p2Title);
};

const sortProductsByPrice = (p1: ProductType, p2: ProductType) => {
    if (p1.price < p2.price) {
        return -1;
    } else if (p1.price > p2.price) {
        return 1;
    } else {
        return 0;
    }
};

// sort by categories
// how to structure the state
// key, products

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
            state.originalProducts = action.payload.map((product) => product);
            //
        },
        sortByTitle: (state, action: PayloadAction<SortOrder>) => {
            switch (action.payload) {
                case SortOrder.Increasing: {
                    state.products.sort(sortProductsByTitle);

                    break;
                }
                case SortOrder.Decreasing: {
                    state.products.sort(sortProductsByTitle).reverse();
                    break;
                }
                default:
                    break;
            }
        },
        sortByPrice: (state, action: PayloadAction<SortOrder>) => {
            switch (action.payload) {
                case SortOrder.Increasing: {
                    state.products.sort(sortProductsByPrice);
                    break;
                }
                case SortOrder.Decreasing: {
                    state.products.sort(sortProductsByPrice).reverse();
                    break;
                }
                default:
                    break;
            }
        },

        searchBy: (state, action: PayloadAction<string>) => {
            const search = action.payload.toLocaleLowerCase();
            state.products = state.originalProducts.filter((product) => {
                return (
                    product.description.toLocaleLowerCase().includes(search) ||
                    product.title.toLocaleLowerCase().includes(search)
                );
            });
        },
        reset: (state) => {
            state.products = state.originalProducts.map((product) => product);
        },
        productsOfCategory: (state, action: PayloadAction<number>) => {
            const categoryId = action.payload;
            state.products = state.originalProducts.filter(
                (product) => product.category.id === categoryId,
            );
        },
        allCategoryProducts: (state) => {
            state.products = state.originalProducts.map((product) => product);
        },
    },
});

export const {
    addProducts,
    sortByTitle,
    sortByPrice,
    searchBy,
    productsOfCategory,
    allCategoryProducts,
} = productSlice.actions;

export default productSlice;
