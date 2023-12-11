import { Alert, Button, Grid, Paper, Snackbar, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddLoginMutation, useGetProfileQuery } from "../../redux/apiSlice";
import { addToken, addUser } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import FieldController from "../common/FieldController";
import useFormStyle from "../hooks/useFormStyle";

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
    const [snackOpen, setSnackOpen] = useState(false);
    const loginPaperStyle = useFormStyle();

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(addToken(result.data));
        }
    }, [result.isSuccess, result.data, dispatch]);

    useEffect(() => {
        if (profileResult.isSuccess) {
            dispatch(addUser(profileResult.data));
            navigate("/home");
        }
    }, [profileResult.isSuccess, profileResult.data, dispatch, navigate]);

    const onSubmit = async (d: any) => {
        try {
            await login(d).unwrap();
        } catch {
            setSnackOpen(true);
            console.error("error in login ");
        }
    };

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackOpen(false);
    };

    const onSignUp = () => {
        navigate("/signup");
    };

    return (
        <>
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
            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="error" sx={{ width: "100%" }}>
                    Login failed
                </Alert>
            </Snackbar>
        </>
    );
};
export default Login;
