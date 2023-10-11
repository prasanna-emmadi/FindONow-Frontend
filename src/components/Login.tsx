import { Button, Grid, Paper, Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddLoginMutation, useGetProfileQuery } from "../redux/api/apiSlice";
import { addToken, addUser } from "../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import FieldController from "./custom/FieldController";
import { paperStyle } from "./styles";

const loginPaperStyle = {
    ...paperStyle,
    width: 600,
};

const Login = () => {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { access_token } = useAppSelector((state) => state.auth.token);
    const [login, result] = useAddLoginMutation();
    const profileResult = useGetProfileQuery(result.data, {
        skip: access_token === undefined,
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(addToken(result.data));
        }
    }, [result.isSuccess, result.data, dispatch]);

    console.log("profileResult", profileResult);
    useEffect(() => {
        if (profileResult.isSuccess) {
            console.log("profileResult.isSuccess - navigating home");
            dispatch(addUser(profileResult.data));
            navigate("/home");
        }
    }, [profileResult.isSuccess, profileResult.data, dispatch, navigate]);

    const onSubmit = async (d: any) => {
        try {
            await login(d).unwrap();
        } catch {
            console.error("error in login ");
        }
    };

    const onSignUp = () => {
        navigate("/signup");
    };

    return (
        <Grid>
            <Paper elevation={2} style={loginPaperStyle}>
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
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={"center"}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSignUp}
                        >
                            SignUp
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Grid>
    );
};
export default Login;
