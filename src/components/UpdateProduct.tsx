import { useParams } from "react-router-dom";
import {
    useGetCategoriesQuery,
    useGetProductQuery,
    useGetProductsQuery,
} from "../redux/apiSlice";
import { CategoryType } from "../types/productType";
import ProductForm, { toDefaultValues } from "./ProductForm";
import Suspense from "./Suspense";

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

    const { data: fetchedProduct, isSuccess } = useGetProductQuery(id, {
        skip: product === undefined,
    });

    const productSucess = product ? true : isSuccess;

    if (productSucess) {
        const defaultValues = toDefaultValues(fetchedProduct);
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

    console.log("UpdateProduct", data);

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
