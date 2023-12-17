import { ReactNode } from "react";
import { Grid } from "@mui/material";
import useColors from "../hooks/useColors";

interface Props {
    children: ReactNode;
}

const InfoContainer = ({ children }: Props) => {
    const { secondaryColor } = useColors();
    return (
        <Grid
            item
            style={{
                backgroundColor: secondaryColor,
                margin: "19px 20px 20px 0",
                padding: "30px 20px",
            }}
        >
            {children}
        </Grid>
    );
};

export default InfoContainer;
