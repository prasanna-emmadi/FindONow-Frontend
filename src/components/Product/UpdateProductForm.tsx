import { Box, Button, FormLabel, Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
    useGetCategoriesQuery,
    useGetProductsQuery,
    useUpdateProductMutation,
} from "../../redux/apiSlice";
import { CategoryType, ProductType } from "../../types/productType";
import FieldController from "../common/FieldController";
import CenterDiv from "../common/CenterDiv";
import Suspense from "../common/Suspense";

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
    categories: CategoryType[];
    defaultValues: DefaultValues;
    showSubmit: boolean;
    onCancelClick: () => void;
    onUpdateClick: () => void;
}

export const toDefaultValues = (product: ProductType) => {
    return {
        ...product,
        images: product.images[0],
        categoryId: defaultOption,
    };
};

const Content1 = (props: Props) => {
    //react-select expects the options to be in the form of {value:string, label:string}
    // hence converting category options to the above form
    const categories = props.categories;
    let categoryOptions = categories.map(({ name, _id }) => ({
        value: _id,
        label: name,
    }));

    let defaultValues = props.defaultValues;

    defaultValues = {
        ...defaultValues,
        categoryId:
            categoryOptions.length > 0 ? categoryOptions[0] : defaultOption,
    };

    const { handleSubmit, control } = useForm({
        defaultValues: defaultValues,
    });
    const [updateProduct, updateProductResult] = useUpdateProductMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (updateProductResult.isSuccess) {
            props.onUpdateClick();
        }
    }, [
        updateProductResult.isSuccess,
        updateProductResult.data,
        navigate,
        props,
    ]);

    const onSubmit = async (d: any) => {
        try {
            // the shape of  option is {value, label} where value is assigned category.id
            // and it is converted to string
            // API expects category id to be number hence the conversion to number
            console.log({ d });
            d.category = d.categoryId.value;
            d.images = [d.images];
            d.price = Number(d.price);
            // async
            await updateProduct(d).unwrap();
        } catch {
            console.error("error in add/update product");
        }
    };

    return (
        <Grid width={"100%"} style={{ paddingTop: "25px" }}>
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
                <CenterDiv>
                    <Stack direction="row" spacing={2} pt={2}>
                        <Button
                            variant="outlined"
                            onClick={props.onCancelClick}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Stack>
                </CenterDiv>
            </form>
        </Grid>
    );
};

interface DataType {
    id: string;
    categories: CategoryType[];
    onCancelClick: () => void;
    onUpdateClick: () => void;
}

interface ContentProps {
    data: DataType;
}

const Content = ({ data }: ContentProps) => {
    const { categories, id, onCancelClick, onUpdateClick } = data;
    const { product } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            product: data?.find((product) =>
                id ? product._id === id : undefined,
            ),
        }),
    });

    if (product) {
        const defaultValues = toDefaultValues(product);
        return (
            <Content1
                categories={categories}
                defaultValues={defaultValues}
                showSubmit={false}
                onCancelClick={onCancelClick}
                onUpdateClick={onUpdateClick}
            />
        );
    }
    return <div />;
};

interface UpdateProductFormProps {
    id: string;
    onCancelClick: () => void;
    onUpdateClick: () => void;
}

const UpdateProductForm = ({
    id,
    onCancelClick,
    onUpdateClick,
}: UpdateProductFormProps) => {
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetCategoriesQuery();

    const data =
        isSuccess && id
            ? {
                  categories,
                  id,
                  onCancelClick,
                  onUpdateClick,
              }
            : undefined;

    return (
        <Suspense
            data={data}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            Component={Content}
        />
    );
};

export default UpdateProductForm;
