import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Divider, Grid, Typography } from "@mui/material";
import { useGetProductsQuery } from "../../redux/apiSlice";
import { addToCart } from "../../redux/cartSlice";
import { useAppDispatch } from "../../redux/store/hooks";
import { ProductType } from "../../types/productType";
import ProductCarousel from "./ProductCarousel";
import useGoToTop from "../hooks/useGoToTop";

interface Props {
    data: ProductType;
}

const Content = ({ data }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useGoToTop();

    const handleAddToCart = async () => {
        dispatch(addToCart(data));
        navigate("/products");
    };

    return (
        <Box>
            <Grid container spacing={4} pt={2}>
                <Grid item xs={6}>
                    <ProductCarousel images={data.images} />
                </Grid>
                <Grid item xs={6} sm container pt={2}>
                    <Grid item xs={8} container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography variant="h4" color="text.primary">
                                {data.title}
                            </Typography>

                            <Typography variant="body1" color="text.secondary">
                                {data.description}
                            </Typography>

                            <Typography
                                variant="h5"
                                color="text.primary"
                                pt={2}
                            >
                                ${data.price}
                            </Typography>
                        </Grid>

                        <Grid item xs>
                            <Button
                                color="error"
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

const Product = () => {
    const { id } = useParams();

    // getting the product from api cache query
    const { product } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            product: data?.find((product) =>
                id ? product._id === id : undefined,
            ),
        }),
    });

    let content = <div />;

    if (product) {
        content = <Content data={product} />;
    }

    return (
        <section className="products-list">
            <Typography
                variant="h3"
                color="text.primary"
                style={{ textAlign: "center" }}
                pb={2}
            >
                Product Details
            </Typography>
            <Divider />
            {content}
        </section>
    );
};
export default Product;
