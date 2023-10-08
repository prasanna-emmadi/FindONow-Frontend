import { useForm } from "react-hook-form";
import { useAddLoginMutation } from "../features/api/apiSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { addToken } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [login, result] = useAddLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(addToken(result.data));
        }
    }, [result.isSuccess, result.data, dispatch]);

    const onSubmit = async (d: any) => {
        try {
            await login(d).unwrap();
            navigate("/home");
        } catch {
            console.error("error in login ");
        }
    };

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
    );
};
export default Login;
