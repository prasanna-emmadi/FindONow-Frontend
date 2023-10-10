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
    page: number;
}

const initialState: ProductsState = {
    products: [],
    productsSlice: [],
    sortOrder: SortOrder.NoOrder,
    originalProducts: [],
    page: 1,
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

const ProductCountPerPage = 20;

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
            state.originalProducts = action.payload.map((product) => product);
            const adjust = (state.page - 1) * ProductCountPerPage;
            state.productsSlice = state.products.slice(
                adjust,
                state.page * ProductCountPerPage,
            );
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
            const adjust = (state.page - 1) * ProductCountPerPage;
            state.productsSlice = state.products.slice(
                adjust,
                state.page * ProductCountPerPage,
            );
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
            const adjust = (state.page - 1) * ProductCountPerPage;
            state.productsSlice = state.products.slice(
                adjust,
                state.page * ProductCountPerPage,
            );
        },

        searchBy: (state, action: PayloadAction<string>) => {
            const search = action.payload.toLocaleLowerCase();
            state.products = state.originalProducts.filter((product) => {
                return (
                    product.description.toLocaleLowerCase().includes(search) ||
                    product.title.toLocaleLowerCase().includes(search)
                );
            });
            const adjust = (state.page - 1) * ProductCountPerPage;
            state.productsSlice = state.products.slice(
                adjust,
                state.page * ProductCountPerPage,
            );
        },
        reset: (state) => {
            state.products = state.originalProducts.map((product) => product);
            state.page = 1;
            const adjust = (state.page - 1) * ProductCountPerPage;
            state.productsSlice = state.products.slice(
                adjust,
                state.page * ProductCountPerPage,
            );
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
            const adjust = (state.page - 1) * ProductCountPerPage;
            state.productsSlice = state.products.slice(
                adjust,
                state.page * ProductCountPerPage,
            );
        },
    },
});

export const { addProducts, sortByTitle, sortByPrice, searchBy, setPage } =
    productSlice.actions;

export default productSlice;
