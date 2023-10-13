import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Controller, useForm } from "react-hook-form";
import { useAddNewUserMutation } from "../redux/apiSlice";
import FieldController from "./custom/FieldController";
import { paperStyle } from "./styles";

const options = [
    {
        label: "Admin",
        value: "admin",
    },
    {
        label: "Customer",
        value: "customer",
    },
];

const signupPaperStyle = {
    ...paperStyle,
    width: 600,
};

const SignUp = () => {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            role: "admin",
            avatar: "",
        },
    });
    const [updateUser] = useAddNewUserMutation();

    const onSubmit = (d: any) => {
        updateUser(d);
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

    return (
        <Grid>
            <Paper elevation={2} style={signupPaperStyle}>
                <Grid
                    alignItems="center"
                    justifyContent="center"
                    style={{ textAlign: "center" }}
                >
                    <h2>Sign Up</h2>
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
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};
export default SignUp;
