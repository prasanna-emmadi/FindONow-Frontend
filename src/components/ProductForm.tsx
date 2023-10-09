import { Controller, useForm } from "react-hook-form";
import {
    useAddNewProductMutation,
    useGetCategoriesQuery,
} from "../features/api/apiSlice";
import { CategoryType } from "../types/productType";
import Suspense from "./Suspense";
import Select from "react-select";
import { redirect } from "react-router-dom";
import { Button, Grid, Paper, TextField } from "@mui/material";

interface Props {
    data: CategoryType[];
}

const defaultOption = { value: "", label: "" };

const paperStyle = {
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
};

const InnerProductForm = ({ data }: Props) => {
    //react-select expects the options to be in the form of {value:string, label:string}
    // hence converting category options to the above form
    let categoryOptions = data.map(({ name, id }) => ({
        value: id.toString(),
        label: name,
    }));
    const { handleSubmit, control } = useForm({
        defaultValues: {
            title: "",
            price: undefined,
            description: "",
            images: "",
            categoryId:
                categoryOptions.length > 0 ? categoryOptions[0] : defaultOption,
        },
    });
    const [addProduct] = useAddNewProductMutation();

    const onSubmit = async (d: any) => {
        try {
            // the shape of  option is {value, label} where value is assigned category.id
            // and it is converted to string
            // API expects category id to be number hence the conversion to number
            d.categoryId = Number(d.categoryId.value);
            d.images = [d.images];
            // async
            await addProduct(d).unwrap();
            redirect("/products");
        } catch {
            console.error("error in add product");
        }
    };

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid
                    alignItems="center"
                    justifyContent="center"
                    style={{ textAlign: "center" }}
                >
                    <h2>New Product </h2>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="Title" />
                        )}
                    />
                    <Controller
                        name="price"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="Price" type="number" />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Description"
                            />
                        )}
                    />
                    <Controller
                        name="images"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="Images" />
                        )}
                    />
                    <p>Category:</p>
                    <Controller
                        name="categoryId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select {...field} options={categoryOptions} />
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

const ProductForm = () => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetCategoriesQuery();

    return (
        <Suspense
            data={data}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            Component={InnerProductForm}
        />
    );
};

export default ProductForm;
