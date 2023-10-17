import { useGetCategoriesQuery } from "../../redux/apiSlice";
import Suspense from "../Common/Suspense";
import ProductForm from "./ProductForm";

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
            Component={ProductForm}
        />
    );
};

export default CreateProduct;
