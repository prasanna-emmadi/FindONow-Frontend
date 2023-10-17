import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useDeleteProductMutation,
    useGetProductQuery,
} from "../../redux/apiSlice";
import { ProductType } from "../../types/productType";
import Suspense from "../common/Suspense";
import ProductCarousel from "./ProductCarousel";

interface Props {
    data: ProductType;
}

const Content = ({ data }: Props) => {
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
        navigate("/products/update/" + data.id);
    };

    useEffect(() => {
        if (deleteResult.isSuccess) {
            navigate("/products");
        }
    }, [deleteResult.isSuccess, navigate]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <ProductCarousel images={data.images} />
            </Grid>
            <Grid item xs={6} sm container pt={2}>
                <Grid item xs={8} container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography variant="h3" color="text.primary">
                            {data.title}
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            {data.description}
                        </Typography>

                        <Typography variant="h5" color="text.primary" pt={2}>
                            ${data.price}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Stack direction="row" spacing={2} pt={2}>
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
            </Grid>
        </Grid>
    );
};

const EditProduct = () => {
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
            Component={Content}
        />
    );

    return (
        <section className="products-list">
            <h2>Edit product</h2>
            {content}
        </section>
    );
};
export default EditProduct;
