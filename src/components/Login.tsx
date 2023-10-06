

import { useForm } from "react-hook-form";
import { useAddLoginMutation } from "../features/api/apiSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks"
import { addToken } from "../features/user/userSlice";


const Login = () => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const [login, result] = useAddLoginMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (result.isSuccess) {
            console.log("success data", result.data)
            // send action to userSlice 
            dispatch(addToken(result.data))
        }

    }, [result.isSuccess, result.data, dispatch])

    const onSubmit = async (d: any) => {
        try {
            await login(d).unwrap();
        } catch {
            console.error("error in login ")
        }
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