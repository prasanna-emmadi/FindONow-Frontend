import { useGetCategoriesQuery } from "../../redux/apiSlice";
import { CategoryType } from "../../types/productType";
import Suspense from "../common/Suspense";
import ProductForm from "./ProductForm";

interface Props {
    data: CategoryType[];
}

const NewProduct = ({ data }: Props) => {
    return <ProductForm data={data} newProduct={true} />;
};

const CreateProduct = () => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetCategoriesQuery();

    return (
        <Suspense
            data={data}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            Component={NewProduct}
        />
    );
};

export default CreateProduct;
