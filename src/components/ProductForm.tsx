
import { useForm } from "react-hook-form";
import { useAddNewProductMutation, useGetCategoriesQuery } from "../features/api/apiSlice";
import { Category } from "../types/productType";
import Suspense from "./Suspense";

interface Props {
    data: Category[] | undefined
}
const InnerProductForm = ({ data }: Props) => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: "",
            price: 0,
            description: "",
            categoryId: 0,
            images: ""
        }
    });
    const [updateProduct, result] = useAddNewProductMutation()

    const onSubmit = (d: any) => {
        alert(JSON.stringify(d))
        updateProduct(d);
    }

    console.log(result);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Title:
                <input {...register("title")} type="title" />
            </label>
            <label>
                Price:
                <input {...register("price")} type="price" />
            </label>
            <label>
                Description:
                <input {...register("description")} />
            </label>

            <p>Category:</p>
            <label>
                Category:
                <input {...register("categoryId")} />
            </label>


            <label>
                Images:
                <input {...register("images")} type="image" />
            </label>

            <button type="submit" value="submit" />
        </form>
    )
};

const ProductForm = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery()

    return (<Suspense
        data={data}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        Component={InnerProductForm} />
    )

}

export default ProductForm;