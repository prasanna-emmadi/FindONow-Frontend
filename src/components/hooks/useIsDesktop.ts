import { useMediaQuery } from "@mui/material";

export const useIsDesktop = () => {
    const matches = useMediaQuery("(min-width:993px)");
    return matches;
};
