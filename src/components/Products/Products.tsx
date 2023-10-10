import { useGetProductsQuery } from "../../features/api/apiSlice";
import { ProductType } from "../../types/productType";
import Suspense from "../Suspense";
import { CartProduct } from "../Product/Product";
import {
    Badge,
    Box,
    Divider,
    Drawer,
    Grid,
    Pagination,
    Stack,
} from "@mui/material";
import { Wrapper, StyledButton } from "./Products.styles";
import { useEffect, useState } from "react";
import { AddShoppingCart } from "@mui/icons-material";
import Cart from "../Cart/Cart";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addProducts, setPage } from "../../features/product/productSlice";
import Options from "./Options";

interface Props {
    data: ProductType[];
}

const InnerProductList = ({ data }: Props) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);
    const { productsSlice, page, pageCount } = useAppSelector(
        (state) => state.product,
    );
    const [cartOpen, setCartOpen] = useState(false);

    // onMount adding Products to the productSlice
    useEffect(() => {
        dispatch(addProducts(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (
        _event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        dispatch(setPage(value));
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
    const { data, isLoading, isSuccess, isError, error } =
        useGetProductsQuery();

    let content = (
        <Suspense
            data={data}
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
