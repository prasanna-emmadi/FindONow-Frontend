import { AddShoppingCart } from "@mui/icons-material";
import {
    Badge,
    Box,
    Divider,
    Drawer,
    Grid,
    Pagination,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    useGetCategoriesQuery,
    useGetProductsQuery,
} from "../../redux/api/apiSlice";
import { addToCart, removeFromCart } from "../../redux/cart/cartSlice";
import { addProducts } from "../../redux/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CategoryType, ProductType } from "../../types/productType";
import Cart from "../Cart/Cart";
import { CartProduct } from "../Product/Product";
import Suspense from "../Suspense";
import Options from "./Options";
import { StyledButton, Wrapper } from "./Products.styles";

interface Props {
    data: {
        products: ProductType[];
        categories: CategoryType[];
    };
}

const ProductCountPerPage = 20;
const getPageCount = (productsLength: number) => {
    return Math.ceil(productsLength / ProductCountPerPage);
};

const getSlice = (page: number, products: ProductType[]) => {
    const adjust = (page - 1) * ProductCountPerPage;
    return products.slice(adjust, page * ProductCountPerPage);
};

const InnerProductList = (props: Props) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);
    const { products } = useAppSelector((state) => state.product);
    const [cartOpen, setCartOpen] = useState(false);
    const [page, setPage] = useState(1);
    const pageCount = getPageCount(products.length);
    const productsSlice = getSlice(page, products);

    // onMount adding Products to the productSlice
    useEffect(() => {
        dispatch(addProducts(props.data.products));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (
        _event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
    };

    const handleAddToCart = (clickedItem: ProductType) => {
        dispatch(addToCart(clickedItem));
    };

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id));
    };

    return (
        <Wrapper data-testid="products">
            <Drawer
                anchor="right"
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            >
                <Cart
                    cartItems={cart.cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={cart.totalItems} color="error">
                    <AddShoppingCart />
                </Badge>
            </StyledButton>
            <Options />
            <Box pt={5} />
            <Divider />
            <Box pb={5} />
            <Grid container spacing={3}>
                {productsSlice.map((product) => (
                    <Grid item key={product.id} xs={12} sm={4}>
                        <CartProduct
                            data={product}
                            handleAddToCart={handleAddToCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <Stack spacing={2}>
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handleChange}
                />
            </Stack>
        </Wrapper>
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
            Component={InnerProductList}
        />
    );

    return (
        <section className="products-list">
            <h2>products</h2>
            {content}
        </section>
    );
};

export default ProductList;
