

import { useForm } from "react-hook-form";
import { useAddLoginMutation } from "../features/api/apiSlice";

const Login = () => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const [updateLogin, result] = useAddLoginMutation()

    const onSubmit = (d: any) => {
        updateLogin(d);
    }

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

            <input type="submit" value="submit" />
        </form>
    )
};
export default Login;