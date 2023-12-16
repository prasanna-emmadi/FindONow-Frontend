import { useTheme } from "@mui/material";

const useColors = () => {
    const theme = useTheme();
    const mainColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.secondary.main;

    return {
        mainColor,
        secondaryColor,
    };
};

export default useColors;
