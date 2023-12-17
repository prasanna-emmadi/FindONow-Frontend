import { useParams } from "react-router-dom";
import {
    useGetCategoriesQuery,
    useGetProductsQuery,
} from "../../redux/apiSlice";
import { CategoryType } from "../../types/productType";
import Suspense from "../common/Suspense";
import ProductForm, { toDefaultValues } from "./ProductForm";

interface DataType {
    categories: CategoryType[];
    id: string;
}

interface ContentProps {
    data: DataType;
}

const Content = ({ data }: ContentProps) => {
    const { categories, id } = data;
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
            <ProductForm
                categories={categories}
                defaultValues={defaultValues}
                newProduct={false}
            />
        );
    }
    return <div />;
};

interface Props {
    id: string;
}

const LoadProduct = ({ id }: Props) => {
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

const UpdateProduct = () => {
    const { id } = useParams();
    if (id) {
        return <LoadProduct id={id} />;
    } else {
        return <div>No Product found</div>;
    }
};

export const UpdateProductWithId = ({ id }: Props) => {
    return <LoadProduct id={id} />;
};

export default UpdateProduct;
