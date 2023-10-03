
import { useForm } from "react-hook-form";
import { useAddNewUserMutation } from "../features/api/apiSlice";

const UserForm = () => {
    const { register, handleSubmit } = useForm();
    const [updateUser, result] = useAddNewUserMutation()

    const onSubmit = (d: any) =>
        alert(JSON.stringify(d))

    //updateUser(d);

    console.log(result);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Email:
                <input {...register("email")} type="email" />
            </label>
            <label>
                Password:
                <input {...register("password")} type="password" />
            </label>
            <label>
                Name:
                <input {...register("name")} />
            </label>

            <p>Role:</p>
            <label>
                Admin
                <input {...register("admin")} type="radio" name="role" />
            </label>
            
            <label>
                Costumer
                <input {...register("costumer")} type="radio" name="role" />
            </label>

            <label>
                Avatar:
                <input {...register("avatar")} type="url" />
            </label>

            <input type="submit" value="submit" />
        </form>
    )
};
export default UserForm;