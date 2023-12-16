import { Box, CssBaseline } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../redux/apiSlice";
import FieldController from "../common/FieldController";
import useFormStyle from "../hooks/useFormStyle";
import CenterDiv from "../common/CenterDiv";
import BoldH4Text from "../common/BoldH4Text";
import CenterColumnDiv from "../common/CenterColumnDiv";
import InfoContainer from "./InfoContainer";

interface DefaultValues {
    email?: string;
    password?: string;
    name?: string;
    role?: "ADMIN" | "USER";
    avatar?: string;
}

interface Props {
    defaultValues?: DefaultValues;
}

const newUserDefaultValues: DefaultValues = {
    email: "",
    password: "",
    name: "",
    role: "USER",
    avatar: "",
};

const LoginInfo = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/login");
    };
    return (
        <CenterColumnDiv backgroundColor="text.secondary">
            <BoldH4Text text="Already have an account?" />
            <CssBaseline />
            <Button variant="contained" color="primary" onClick={onClick}>
                Login
            </Button>
        </CenterColumnDiv>
    );
};

const SignUp = (props: Props) => {
    const defaultValues = props.defaultValues
        ? props.defaultValues
        : newUserDefaultValues;

    const { handleSubmit, control } = useForm({
        defaultValues: defaultValues,
    });
    const [signup] = useSignUpMutation();
    const signupPaperStyle = useFormStyle();
    const navigate = useNavigate();

    const onSubmit = async (d: any) => {
        try {
            await signup(d).unwrap();
            navigate("/login");
        } catch {
            console.error("error in signup");
        }
    };

    const form = (
        <Box>
            <Grid
                alignItems="center"
                justifyContent="center"
                style={{ textAlign: "center" }}
            >
                <BoldH4Text text="Sign Up" />
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
                <FieldController
                    name="name"
                    label="Name"
                    type="text"
                    control={control}
                />

                <FieldController
                    name="avatar"
                    label="Avatar"
                    type="url"
                    control={control}
                    required={false}
                />
                <CenterDiv>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </CenterDiv>
            </form>
        </Box>
    );

    return (
        <Grid style={{ paddingTop: "15px" }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper
                        elevation={2}
                        style={signupPaperStyle}
                        square={false}
                    >
                        {form}
                    </Paper>
                </Grid>
                <InfoContainer>
                    <LoginInfo />
                </InfoContainer>
                <Grid item xs={3} />
            </Grid>
        </Grid>
    );
};
export default SignUp;
