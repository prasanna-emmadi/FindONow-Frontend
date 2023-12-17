import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { searchBy } from "../../redux/productSlice";
import { useAppDispatch } from "../../redux/store/hooks";
import { useDebounce } from "../hooks/useDebounce";
import { IconButton, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
    className: string;
}

const SearchBar = ({ className }: Props) => {
    const [query, setQuery] = useState("");
    const searchQuery = useDebounce(query, 2000);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    useEffect(() => {
        dispatch(searchBy(searchQuery));
    }, [dispatch, searchQuery]);

    const mainColor = theme.palette.primary.main;

    return (
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                borderRadius: "12px",
                boxShadow: 3,
            }}
            className={className}
        >
            <IconButton
                type="button"
                sx={{ p: "10px", color: mainColor }}
                aria-label="search"
                size="large"
            >
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1, color: mainColor }}
                placeholder="Search Products"
                inputProps={{ "aria-label": "search products" }}
                onInput={(e: any) => {
                    const { target } = e;
                    if (target) {
                        setQuery(e.target.value);
                    }
                }}
            />
        </Paper>
    );
};

export default SearchBar;
