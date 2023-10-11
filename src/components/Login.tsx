import { Controller, useForm } from "react-hook-form";
import { useAddLoginMutation } from "../redux/api/apiSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { addToken } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, TextField } from "@mui/material";

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
    const paperStyle = {
        padding: "30px 20px",
        width: 300,
        margin: "20px auto",
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
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Email"
                                placeholder="Enter your Email"
                                type="email"
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Password"
                                type="password"
                            />
                        )}
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
