import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { searchBy } from "../../redux/productSlice";
import { useAppDispatch } from "../../redux/store/hooks";
import { useDebounce } from "../hooks/useDebounce";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
    className: string;
}

const SearchBar = ({ className }: Props) => {
    const [query, setQuery] = useState("");
    const searchQuery = useDebounce(query, 2000);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(searchBy(searchQuery));
    }, [dispatch, searchQuery]);

    return (
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                //width: "100%",
                borderRadius: "12px",
            }}
            className={className}
        >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
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
