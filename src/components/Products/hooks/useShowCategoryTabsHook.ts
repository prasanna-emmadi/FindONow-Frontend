import { useMediaQuery } from "@mui/material";

export const useShowCategoryTabsHooks = () => {
    const matches = useMediaQuery("(min-width:993px)");
    return matches;
};
