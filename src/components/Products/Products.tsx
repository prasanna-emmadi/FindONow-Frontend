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
    IconButton,
    Pagination,
    Stack,
    TextField,
} from "@mui/material";
import { Wrapper, StyledButton } from "./Products.styles";
import { useEffect, useState } from "react";
import { AddShoppingCart } from "@mui/icons-material";
import Cart from "../Cart/Cart";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SearchIcon from "@mui/icons-material/Search";
import {
    SortOrder,
    addProducts,
    searchBy,
    sortByPrice,
    sortByTitle,
} from "../../features/product/productSlice";
import Select from "react-select";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
    data: ProductType[];
}

const options: any = [
    { value: "title_increasing", label: "Title Increasing" },
    { value: "title_decreasing", label: "Title Decreasing" },
    { value: "price_increasing", label: "Price Increasing" },
    { value: "price_decreasing", label: "Price Decreasing" },
];

const SortOptions = () => {
    const dispatch = useAppDispatch();
    return (
        <Select
            options={options}
            onChange={(newValue: any) => {
                console.log("newValue", newValue);

                switch (newValue.value) {
                    case "title_increasing": {
                        dispatch(sortByTitle(SortOrder.Increasing));
                        break;
                    }
                    case "title_decreasing": {
                        dispatch(sortByTitle(SortOrder.Decreasing));
                        break;
                    }
                    case "price_increasing": {
                        dispatch(sortByPrice(SortOrder.Increasing));
                        break;
                    }
                    case "price_decreasing": {
                        dispatch(sortByPrice(SortOrder.Decreasing));
                        break;
                    }

                    default: {
                        break;
                    }
                }
            }}
        />
    );
};
const SearchBar = () => {
    const [query, setQuery] = useState("");
    const searchQuery = useDebounce(query, 2000);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(searchBy(searchQuery));
    }, [dispatch, searchQuery]);

    return (
        <form>
            <TextField
                id="search-bar"
                className="text"
                onInput={(e: any) => {
                    const { target } = e;
                    if (target) {
                        setQuery(e.target.value);
                    }
                }}
                label="Enter a product name"
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

const ProductCountPerPage = 20;
const InnerProductList = ({ data }: Props) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);
    const products = useAppSelector((state) => state.product.products);
    const [cartOpen, setCartOpen] = useState(false);
    const [page, setPage] = useState(1);

    const pageCount = Math.ceil(products.length / ProductCountPerPage);
    const [productsSlice, setProductsSlice] = useState(
        data.slice(0, ProductCountPerPage),
    );

    // onMount adding Products to the productSlice
    useEffect(() => {
        dispatch(addProducts(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (
        _event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
        // show the next slice
        // 0 - 20
        // 21 - 40
        const adjust = (value - 1) * ProductCountPerPage;
        setProductsSlice(products.slice(adjust, value * ProductCountPerPage));
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
            <Stack direction="row" spacing={5}>
                <SearchBar />
                <SortOptions />
            </Stack>
            <Box pt={5}/>
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
