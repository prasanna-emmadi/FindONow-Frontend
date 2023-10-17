import { useParams } from "react-router-dom";
import {
    useGetCategoriesQuery,
    useGetProductsQuery,
} from "../../redux/apiSlice";
import { CategoryType } from "../../types/productType";
import Suspense from "../Common/Suspense";
import ProductForm, { toDefaultValues } from "./ProductForm";

interface DataType {
    categories: CategoryType[];
    id: string;
}

interface Props {
    data: DataType;
}

const Content = ({ data }: Props) => {
    const { categories, id } = data;
    const { product } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            product: data?.find((product) =>
                id ? product.id === parseInt(id) : undefined,
            ),
        }),
    });

    if (product) {
        const defaultValues = toDefaultValues(product);
        return <ProductForm data={categories} defaultValues={defaultValues} />;
    }
    return <div />;
};

const UpdateProduct = () => {
    const { id } = useParams();
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

export default UpdateProduct;
