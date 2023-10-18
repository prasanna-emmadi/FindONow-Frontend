import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export interface FieldControllerProps {
    name: string;
    label: string;
    type: string;
    control: any;
    required?: boolean;
}

const FieldController = ({
    control,
    name,
    label,
    type,
    required,
}: FieldControllerProps) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: required === undefined ? true : required }}
            render={({ field }) => (
                <>
                    <TextField
                        {...field}
                        fullWidth
                        label={label}
                        type={type}
                        size="small"
                    />
                    <Box pb={2} />
                </>
            )}
        />
    );
};

export default FieldController;
