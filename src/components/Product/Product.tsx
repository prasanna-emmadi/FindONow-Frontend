import DeleteIcon from "@mui/icons-material/Delete";

import UpdateIcon from "@mui/icons-material/Update";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import { useEffect } from "react";
import {
    useDeleteProductMutation,
    useEditProductMutation,
    useGetProductQuery,
} from "../../redux/api/apiSlice";
import { ProductType } from "../../types/productType";
import Suspense from "../Suspense";
import { Wrapper } from "./Product.styles";
import ProductCarousel from "./ProductCarousel";

interface Props {
    data: ProductType;
}

// carousel left, right content paper
// grid
const InnerProductContent = ({ data }: Props) => {
    return (
        <>
            <img src={data.images[0]} alt={data.title} />
            <div>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                <h3>${data.price}</h3>
            </div>
        </>
    );
};

const InnerProductContent1 = ({ data }: Props) => {
    const [editProduct, editResult] = useEditProductMutation();
    const [deleteProduct, deleteResult] = useDeleteProductMutation();
    const navigate = useNavigate();

    const onDeleteClick = async () => {
        try {
            await deleteProduct(data.id);
        } catch {
            console.error("error in delete product");
        }
    };

    const onUpdateClick = async () => {
        try {
            await editProduct(data.id);
        } catch {
            console.error("error in Update product");
        }
    };

    useEffect(() => {
        if (deleteResult.isSuccess) {
            navigate("/products");
        }
    }, [deleteResult.isSuccess, navigate]);

    useEffect(() => {
        if (editResult.isSuccess) {
            navigate("/products");
        }
    }, [editResult.isSuccess, navigate]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <ProductCarousel images={data.images} />
            </Grid>
            <Grid item xs={6}>
                <div>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                    <h3>${data.price}</h3>
                </div>
                <Stack direction="row" spacing={2}>
                    <Button
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={onDeleteClick}
                    >
                        Delete
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        endIcon={<UpdateIcon />}
                        onClick={onUpdateClick}
                    >
                        Update
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

const InnerProduct = ({ data }: Props) => {
    return (
        <>
            <InnerProductContent1 data={data} />
        </>
    );
};
interface CartProductProps {
    data: ProductType;
    handleAddToCart: (clickedItem: ProductType) => void;
}

export const CartProduct = ({ data, handleAddToCart }: CartProductProps) => {
    return (
        <Wrapper>
            <InnerProductContent data={data} />
            <Button onClick={() => handleAddToCart(data)}>add to cart</Button>
        </Wrapper>
    );
};
const Product = () => {
    const { id } = useParams();
    const { data, isLoading, isSuccess, isError, error } =
        useGetProductQuery(id);

    let content = (
        <Suspense
            data={data}
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
