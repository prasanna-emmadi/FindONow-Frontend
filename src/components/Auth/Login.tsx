import {
    Alert,
    Box,
    Button,
    CssBaseline,
    Grid,
    Paper,
    Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddLoginMutation, useGetProfileQuery } from "../../redux/apiSlice";
import { addToken, addUser } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import FieldController from "../common/FieldController";
import useFormStyle from "../hooks/useFormStyle";
import BoldH4Text from "../common/BoldH4Text";
import CenterColumnDiv from "../common/CenterColumnDiv";
import CenterDiv from "../common/CenterDiv";

const SignupInfo = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/signup");
    };
    return (
        <CenterColumnDiv backgroundColor="text.secondary">
            <BoldH4Text text="Don't have an account?" />
            <CssBaseline />
            <Button variant="contained" color="primary" onClick={onClick}>
                SignUp
            </Button>
        </CenterColumnDiv>
    );
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


    const form = (
        <Box>
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
                <CenterDiv>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </CenterDiv>
            </form>
        </Box>
    );

    return (
        <>
            <Grid
                container
                style={{ paddingTop: "100px", justifyItems: "start" }}
            >
                <Paper elevation={2} style={loginPaperStyle}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            {form}
                        </Grid>
                        <Grid item xs={4}>
                            <SignupInfo />
                        </Grid>
                    </Grid>
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
