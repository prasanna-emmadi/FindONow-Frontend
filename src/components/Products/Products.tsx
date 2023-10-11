import { AddShoppingCart } from "@mui/icons-material";
import {
    Alert,
    Badge,
    Box,
    Drawer,
    Grid,
    Pagination,
    Snackbar,
    Tab,
    Tabs,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    useGetCategoriesQuery,
    useGetProductsQuery,
} from "../../redux/api/apiSlice";
import { addToCart, removeFromCart } from "../../redux/cart/cartSlice";
import {
    addProducts,
    allCategoryProducts,
    productsOfCategory,
} from "../../redux/product/productSlice";
import { AppDispatch } from "../../redux/store/configureStore";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CategoryType, ProductType } from "../../types/productType";
import Cart from "../Cart/Cart";
import ProductCard from "../ProductCard";
import Suspense from "../Suspense";
import Options from "./Options";
import { StyledButton, Wrapper } from "./Products.styles";
import logo from "./logo.jpg";

interface ActualProductListProps {
    products: ProductType[];
    dispatch: AppDispatch;
}

const ProductCountPerPage = 20;
const getPageCount = (productsLength: number) => {
    return Math.ceil(productsLength / ProductCountPerPage);
};

const getSlice = (page: number, products: ProductType[]) => {
    const adjust = (page - 1) * ProductCountPerPage;
    return products.slice(adjust, page * ProductCountPerPage);
};

const ActualProductList = ({ products, dispatch }: ActualProductListProps) => {
    const [snackOpen, setSnackOpen] = useState(false);
    const cart = useAppSelector((state) => state.cart);
    const [cartOpen, setCartOpen] = useState(false);
    const [page, setPage] = useState(1);
    const pageCount = getPageCount(products.length);
    const productsSlice = getSlice(page, products);

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

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen(false);
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
            <Box pt={1} />
            <Options />
            <Box pt={3} flex="end" justifyContent={"right"}>
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handleChange}
                    color="secondary"
                />
            </Box>
            <Box pb={5} />
            <Grid container spacing={3}>
                {productsSlice.map((product) => (
                    <Grid item key={product.id} xs={12} sm={4}>
                        <ProductCard
                            product={product}
                            handleAddToCart={handleAddToCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Item added to cart
                </Alert>
            </Snackbar>
        </Wrapper>
    );
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface CategoryProductsProps {
    data: {
        products: ProductType[];
        categories: CategoryType[];
    };
}

const CategoryProducts = (props: CategoryProductsProps) => {
    // create tab for each product categories
    // filter categories with text or other
    const [value, setValue] = useState(0);
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

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        console.log("newValue", newValue);
        if (newValue === 0) {
            dispatch(allCategoryProducts());
        } else {
            const indexOfCategory = newValue + 1;
            if (categoriesSlice.length > indexOfCategory) {
                const category = categoriesSlice[indexOfCategory];
                dispatch(productsOfCategory(category.id));
            }
        }
        setValue(newValue);
    };

    // all - 0
    // specific category
    // pass the products down the line
    let allCategoriesTab = <Tab label={"all"} {...a11yProps(0)} key={0} />;
    let categoryTabs = categoriesSlice.map((category, index) => {
        return <Tab label={category.name} {...a11yProps(0)} key={index + 1} />;
    });
    categoryTabs = [allCategoriesTab, ...categoryTabs];

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderTop: 1,
                        borderColor: "divider",
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                    >
                        {categoryTabs}
                    </Tabs>
                </Box>
            </Box>
            <ActualProductList
                products={categoryProducts}
                dispatch={dispatch}
            />
        </>
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
        <section className="products-list">
            <img src={logo} alt="Logo" height={1000} width={1200} />
            {content}
        </section>
    );
};

export default ProductList;
