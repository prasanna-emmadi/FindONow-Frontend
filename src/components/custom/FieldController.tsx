import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export interface FieldControllerProps {
    name: string;
    label: string;
    type: string;
    control: any;
}

const FieldController = ({
    control,
    name,
    label,
    type,
}: FieldControllerProps) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
                <>
                    <TextField {...field} fullWidth label={label} type={type} />
                    <Box pb={2} />
                </>
            )}
        />
    );
};

export default FieldController;
