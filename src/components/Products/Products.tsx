import { useGetProductsQuery } from "../../features/api/apiSlice";
import { ProductType } from "../../types/productType";
import Suspense from "../Suspense";
import { CartProduct } from "../Product/Product";
import { Badge, Drawer, Grid, IconButton, TextField } from "@mui/material";
import { Wrapper, StyledButton } from "./Products.styles";
import { useEffect, useState } from "react";
import { AddShoppingCart } from "@mui/icons-material";
import Cart from "../Cart/Cart";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SearchIcon from "@mui/icons-material/Search";
import { addProducts, searchBy } from "../../features/product/productSlice";

interface Props {
    data: ProductType[];
}
const SearchBar = () => {
    const dispatch = useAppDispatch();

    return (
        <form>
            <TextField
                id="search-bar"
                className="text"
                onInput={(e: any) => {
                    const { target } = e;
                    if (target) {
                        dispatch(searchBy(e.target.value));
                    }
                }}
                label="Enter a city name"
                variant="outlined"
                placeholder="Search..."
                size="small"
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
        </form>
    );
};

const InnerProductList = ({ data }: Props) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);
    const products = useAppSelector((state) => state.product.products);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        dispatch(addProducts(data))
    }, [])

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
            <SearchBar />
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={4}>
                        <CartProduct
                            data={product}
                            handleAddToCart={handleAddToCart}
                        />
                    </Grid>
                ))}
            </Grid>
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
