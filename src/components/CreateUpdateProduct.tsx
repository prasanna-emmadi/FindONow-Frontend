import { useGetCategoriesQuery } from "../redux/apiSlice";
import ProductForm from "./ProductForm";
import Suspense from "./Suspense";

const CreateUpdateProduct = () => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetCategoriesQuery();

    return (
        <Suspense
            data={data}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            Component={ProductForm}
        />
    );
};

export default CreateUpdateProduct;
