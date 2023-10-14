import { Box, Button, FormLabel, Grid } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAddNewProductMutation } from "../redux/apiSlice";
import { CategoryType, ProductType } from "../types/productType";
import FieldController from "./custom/FieldController";

type optionType = { value: string; label: string };
const defaultOption = { value: "", label: "" };

interface DefaultValues {
    title: string;
    price?: number;
    description: string;
    images: string;
    categoryId: optionType;
}

interface Props {
    data: CategoryType[];
    defaultValues?: DefaultValues;
}

export const toDefaultValues = (product: ProductType) => {
    return {
        ...product,
        images: product.images[0],
        categoryId: defaultOption,
    };
};

const newProductDefaultValues: DefaultValues = {
    title: "",
    price: undefined,
    description: "",
    images: "",
    categoryId: defaultOption,
};

const ProductForm = (props: Props) => {
    //react-select expects the options to be in the form of {value:string, label:string}
    // hence converting category options to the above form
    const data = props.data;
    let categoryOptions = data.map(({ name, id }) => ({
        value: id.toString(),
        label: name,
    }));

    let defaultValues = props.defaultValues
        ? props.defaultValues
        : newProductDefaultValues;

    defaultValues = {
        ...defaultValues,
        categoryId:
            categoryOptions.length > 0 ? categoryOptions[0] : defaultOption,
    };

    const { handleSubmit, control } = useForm({
        defaultValues: defaultValues,
    });
    const [addProduct, result] = useAddNewProductMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (result.isSuccess) {
            const id = result.data.id;
            navigate("/products/" + id);
        }
    }, [result.isSuccess, result.data, navigate]);

    const onSubmit = async (d: any) => {
        try {
            // the shape of  option is {value, label} where value is assigned category.id
            // and it is converted to string
            // API expects category id to be number hence the conversion to number
            d.categoryId = Number(d.categoryId.value);
            d.images = [d.images];
            // async
            await addProduct(d).unwrap();
        } catch {
            console.error("error in add product");
        }
    };

    return (
        <Grid width={"80%"}>
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
                    type="text"
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
        </Grid>
    );
};

export default ProductForm;
