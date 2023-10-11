import { Box, Button, FormLabel, Grid, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import Select from "react-select";
import {
    useAddNewProductMutation,
    useGetCategoriesQuery,
} from "../redux/api/apiSlice";
import { CategoryType } from "../types/productType";
import Suspense from "./Suspense";
import FieldController from "./custom/FieldController";
import { paperStyle } from "./styles";

interface Props {
    data: CategoryType[];
}

const defaultOption = { value: "", label: "" };

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
                    <FieldController
                        name="title"
                        label="Title"
                        type="text"
                        control={control}
                    />
                    <FieldController
                        name="price"
                        label="Price"
                        type="number"
                        control={control}
                    />
                    <FieldController
                        name="description"
                        label="Description"
                        type="number"
                        control={control}
                    />
                    <FieldController
                        name="images"
                        label="Images"
                        type="url"
                        control={control}
                    />

                    <FormLabel id="gender_label">Category</FormLabel>

                    <Controller
                        name="categoryId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <>
                                <Select {...field} options={categoryOptions} />
                                <Box pb={2} />
                            </>
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
