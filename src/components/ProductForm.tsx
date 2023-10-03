
import { useForm } from "react-hook-form";
import { useAddNewProductMutation, useAddNewUserMutation } from "../features/api/apiSlice";

const ProductForm = () => {
    const { register, handleSubmit } = useForm();
    const [updateProduct, result] = useAddNewProductMutation()

    const onSubmit = (d: any) =>
        alert(JSON.stringify(d))

    //updateProduct(d);

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
                <input {...register("categoryname")} />
            </label>


            <label>
                Images:
                <input {...register("images")} type="image" />
            </label>

            <input type="submit" value="submit" />
        </form>
    )
};
export default ProductForm;