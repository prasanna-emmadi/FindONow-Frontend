
import { Controller, useForm } from "react-hook-form";
import { useAddNewProductMutation, useGetCategoriesQuery, useGetCategoryQuery } from "../features/api/apiSlice";
import { Category } from "../types/productType";
import Suspense from "./Suspense";
import Select from "react-select";
import { OptionsOrGroups } from "react-select/dist/declarations/src";

interface Props {
    data: Category[] | undefined
}


const defaultOption = { value: "", label: "" }

const InnerProductForm = ({ data }: Props) => {
    let categoryOptions: OptionsOrGroups<any, any> | undefined = []
    if (data) {
        categoryOptions = data.map(({ name, id }) => ({ value: id.toString(), label: name }))
    }
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            title: "",
            price: 0,
            description: "",
            images: "",
            categoryId:
                categoryOptions.length > 0 ? categoryOptions[0] : defaultOption
        }
    });
    const [updateProduct, result] = useAddNewProductMutation()

    if (data === undefined) return <div />
    const onSubmit = (d: any) => {
        d.price = Number(d.price)
        d.categoryId = Number(d.categoryId.value)
        d.images = [d.images]
        updateProduct(d);
    }
    
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

            <label>
                Images:
                <input {...register("images")} type="url" />
            </label>

            <p>Category:</p>

            <Controller
                name="categoryId"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <Select {...field} options={categoryOptions} />
                )}
            />


            <input type="submit" value="submit" />
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