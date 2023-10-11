import { Controller, useForm } from "react-hook-form";
import { useAddNewUserMutation } from "../redux/api/apiSlice";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
const paperStyle = {
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
};

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
            <Paper elevation={20} style={paperStyle}>
                <Grid
                    alignItems="center"
                    justifyContent="center"
                    style={{ textAlign: "center" }}
                >
                    <h2>Sign Up</h2>
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
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Name"
                                type="name"
                            />
                        )}
                    />

                    <FormLabel id="demo-controlled-radio-buttons-group">
                        Gender
                    </FormLabel>
                    <Controller
                        name={"role"}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                            formState,
                        }) => (
                            <RadioGroup value={value} onChange={onChange}>
                                {generateRadioOptions()}
                            </RadioGroup>
                        )}
                    />
                    <Controller
                        name="avatar"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Avatar"
                                type="url"
                            />
                        )}
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
