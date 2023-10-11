import { Button, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddLoginMutation } from "../redux/api/apiSlice";
import { addToken } from "../redux/auth/authSlice";
import { useAppDispatch } from "../redux/store/hooks";
import FieldController from "./custom/FieldController";
import { paperStyle } from "./styles";

const Login = () => {
    const { handleSubmit, control } = useForm({
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
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid
                    alignItems="center"
                    justifyContent="center"
                    style={{ textAlign: "center" }}
                >
                    <h2>Login </h2>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldController
                        name="email"
                        label="Email"
                        type="email"
                        control={control}
                    />
                    <FieldController
                        name="password"
                        label="Password"
                        type="password"
                        control={control}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};
export default Login;
