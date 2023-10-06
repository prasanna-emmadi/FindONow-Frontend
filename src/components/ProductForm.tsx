
import { Controller, useForm } from "react-hook-form";
import { useAddNewProductMutation, useGetCategoriesQuery } from "../features/api/apiSlice";
import { Category } from "../types/productType";
import Suspense from "./Suspense";
import Select from "react-select";
import { redirect } from "react-router-dom";

interface Props {
    data: Category[]
}


const defaultOption = { value: "", label: "" }

const InnerProductForm = ({ data }: Props) => {
    //react-select expects the options to be in the form of {value:string, label:string} 
    // hence converting category options to the above form
    let categoryOptions = data.map(({ name, id }) => ({ value: id.toString(), label: name }))
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
    const [addProduct, result] = useAddNewProductMutation()


    const onSubmit = async (d: any) => {
        try {
            // the shape of  option is {value, label} where value is assigned category.id 
            // and it is converted to string
            // API expects category id to be number hence the conversion to number
            d.categoryId = Number(d.categoryId.value)
            d.images = [d.images]
            // async
            await addProduct(d).unwrap();
            redirect("/products")
        } catch {
            console.error("error in add product");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Title:
                <input {...register("title")} type="text" />
            </label>
            <label>
                Price:
                <input {...register("price")} type="number" />
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