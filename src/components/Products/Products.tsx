import { Alert, Box, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import {
    useGetCategoriesQuery,
    useGetProductsQuery,
} from "../../redux/apiSlice";
import { addToCart } from "../../redux/cartSlice";
import { addProducts } from "../../redux/productSlice";
import { AppDispatch } from "../../redux/store/configureStore";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CategoryType, ProductType } from "../../types/productType";
import ProductCard from "../Product/ProductCard";
import Suspense from "../common/Suspense";
import CartDrawer from "./CartDrawer";
import Options from "./Options";
import { ProductsStyles } from "./Products.styles";
import ProductsPagination from "./ProductsPagination";
import logo from "./logo.png";
//import logo from "./shopping_bags_image.jpeg";

import CenterDiv from "../common/CenterDiv";

interface ActualProductListProps {
    products: ProductType[];
    categories: CategoryType[];
    dispatch: AppDispatch;
}

const ProductCountPerPage = 20;
const getPageCount = (productsLength: number) => {
    return Math.ceil(productsLength / ProductCountPerPage);
};

const getSlice = (page: number, products: ProductType[]): ProductType[] => {
    const adjust = (page - 1) * ProductCountPerPage;
    return products.slice(adjust, page * ProductCountPerPage);
};

const checkNotAnyUrl = (images: string[]) => {
    const index = images.findIndex((image) => image.includes("/any"));
    return index === -1;
};

const ActualProductList = ({ products, dispatch }: ActualProductListProps) => {
    const [snackOpen, setSnackOpen] = useState(false);
    const [page, setPage] = useState(1);
    const pageCount = getPageCount(products.length);
    let productsSlice = getSlice(page, products).filter(
        (product) => product.images?.length !== 0,
    );

    const handleChange = (
        _event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
    };

    const handleAddToCart = (clickedItem: ProductType) => {
        setSnackOpen(true);
        dispatch(addToCart(clickedItem));
    };

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackOpen(false);
    };

    return (
        <ProductsStyles data-testid="products">
            <CartDrawer setSnackOpen={setSnackOpen} dispatch={dispatch} />
            <Box pt={1} />
            <Box className="products-grid-container-wrapper">
                <Box className="products-grid-container l m">
                    {productsSlice.map((product, index) => (
                        <Box className="products-grid-item" key={index}>
                            <ProductCard
                                product={product}
                                handleAddToCart={handleAddToCart}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
            <CenterDiv>
                <ProductsPagination
                    pageCount={pageCount}
                    page={page}
                    handleChange={handleChange}
                />
            </CenterDiv>

            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Item added to cart
                </Alert>
            </Snackbar>
        </ProductsStyles>
    );
};

interface CategoryProductsProps {
    data: {
        products: ProductType[];
        categories: CategoryType[];
    };
}

const CategoryProducts = (props: CategoryProductsProps) => {
    // create tab for each product categories
    // filter categories with text or other
    const dispatch = useAppDispatch();
    const categoryProducts = useAppSelector((state) => state.product.products);
    const { categories, products } = props.data;
    // limited categories
    const categoriesSlice = categories.slice(0, 6);

    // onMount adding Products to the productSlice
    useEffect(() => {
        dispatch(addProducts(products));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{ paddingTop: "10px" }}>
            <Options categories={categoriesSlice} />
            <ActualProductList
                products={categoryProducts}
                dispatch={dispatch}
                categories={categoriesSlice}
            />
        </Box>
    );
};

const ProductList = () => {
    const productsResult = useGetProductsQuery();
    const categoriesResult = useGetCategoriesQuery();

    const isSuccess = productsResult.isSuccess && categoriesResult.isSuccess;
    const isLoading = productsResult.isLoading || categoriesResult.isLoading;
    const isError = productsResult.isError || categoriesResult.isError;
    const error = productsResult.error || categoriesResult.error;
    let wrappedData;
    if (isSuccess) {
        wrappedData = {
            products: productsResult.data,
            categories: categoriesResult.data,
        };
    }

    let content = (
        <Suspense
            data={wrappedData}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            Component={CategoryProducts}
        />
    );

    return (
        <section className="products-list" style={{ paddingTop: "50px" }}>
            <Box className="root-banner-container l">
                <img src={logo} alt="Logo" height={400} width={1100} />
            </Box>
            {content}
        </section>
    );
};

export default ProductList;
