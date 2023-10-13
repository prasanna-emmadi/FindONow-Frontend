import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import { useGetProductQuery, useGetProductsQuery } from "../../redux/apiSlice";
import { addToCart } from "../../redux/cartSlice";
import { useAppDispatch } from "../../redux/store/hooks";
import { ProductType } from "../../types/productType";
import Suspense from "../Suspense";
import { ProductStyles } from "./Product.styles";
import ProductCarousel from "./ProductCarousel";

interface Props {
    data: ProductType;
}

const Content = ({ data }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAddToCart = async () => {
        dispatch(addToCart(data));
        navigate("/products");
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <ProductCarousel images={data.images} />
            </Grid>
            <Grid item xs={6}>
                <div>
                    <Typography variant="h3" color="text.primary">
                        {data.title}
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        {data.description}
                    </Typography>

                    <Typography variant="h5" color="text.primary" pt={2}>
                        ${data.price}
                    </Typography>
                </div>
                <Stack direction="row" spacing={2} pt={2}>
                    <Button
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={handleAddToCart}
                    >
                        Add To Cart
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

const InnerProduct = ({ data }: Props) => {
    return (
        <>
            <Content data={data} />
        </>
    );
};
interface CartProductProps {
    data: ProductType;
    handleAddToCart: (clickedItem: ProductType) => void;
}

export const CartProduct = ({ data, handleAddToCart }: CartProductProps) => {
    return (
        <ProductStyles>
            <Content data={data} />
            <Button onClick={() => handleAddToCart(data)}>add to cart</Button>
        </ProductStyles>
    );
};
const Product = () => {
    const { id } = useParams();
    // getting the product from api cache query
    const { product } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            product: data?.find((product) =>
                id ? product.id === parseInt(id) : undefined,
            ),
        }),
    });
    const { data, isLoading, isSuccess, isError, error } = useGetProductQuery(
        id,
        {
            skip: product === undefined,
        },
    );

    let content = (
        <Suspense
            data={product || data}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            Component={InnerProduct}
        />
    );

    return (
        <section className="products-list">
            <h2>product</h2>
            {content}
        </section>
    );
};
export default Product;
