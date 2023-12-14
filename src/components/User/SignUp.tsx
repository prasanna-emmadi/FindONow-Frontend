import {
    Box,
    CssBaseline,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../redux/apiSlice";
import FieldController from "../common/FieldController";
import useFormStyle from "../hooks/useFormStyle";
import CenterDiv from "../common/CenterDiv";
import BoldH4Text from "../common/BoldH4Text";
import CenterColumnDiv from "../common/CenterColumnDiv";

const options = [
    {
        label: "Admin",
        value: "ADMIN",
    },
    {
        label: "User",
        value: "USER",
    },
];

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
    role: "ADMIN",
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
            navigate("/home");
        } catch {
            console.error("error in signup");
        }
    };

    const generateRadioOptions = () => {
        return options.map((singleOption, index) => (
            <FormControlLabel
                key={index}
                value={singleOption.value}
                label={singleOption.label}
                control={<Radio />}
            />
        ));
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
                <FormLabel id="gender_label">Gender</FormLabel>
                <Controller
                    name={"role"}
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                        formState,
                    }) => (
                        <RadioGroup row value={value} onChange={onChange}>
                            {generateRadioOptions()}
                        </RadioGroup>
                    )}
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
        <Grid>
            <Paper elevation={2} style={signupPaperStyle}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {form}
                    </Grid>
                    <Grid item xs={4}>
                        <LoginInfo />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};
export default SignUp;
