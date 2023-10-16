import { useMediaQuery } from "@mui/material";

export const useIsMobile = () => {
    const matches = useMediaQuery("(max-width:600px)");
    return matches;
};
