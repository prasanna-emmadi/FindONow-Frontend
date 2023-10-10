import { TextField, Grid, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useAppDispatch } from "../../app/hooks";
import { sortByTitle, SortOrder, sortByPrice, searchBy } from "../../features/product/productSlice";
import { useDebounce } from "../hooks/useDebounce";

const options: any = [
    { value: "title_increasing", label: "Title Increasing" },
    { value: "title_decreasing", label: "Title Decreasing" },
    { value: "price_increasing", label: "Price Increasing" },
    { value: "price_decreasing", label: "Price Decreasing" },
];

const SortOptions = () => {
    const dispatch = useAppDispatch();
    return (
        <Select
            options={options}
            onChange={(newValue: any) => {
                console.log("newValue", newValue);

                switch (newValue.value) {
                    case "title_increasing": {
                        dispatch(sortByTitle(SortOrder.Increasing));
                        break;
                    }
                    case "title_decreasing": {
                        dispatch(sortByTitle(SortOrder.Decreasing));
                        break;
                    }
                    case "price_increasing": {
                        dispatch(sortByPrice(SortOrder.Increasing));
                        break;
                    }
                    case "price_decreasing": {
                        dispatch(sortByPrice(SortOrder.Decreasing));
                        break;
                    }

                    default: {
                        break;
                    }
                }
            }}
        />
    );
};
const SearchBar = () => {
    const [query, setQuery] = useState("");
    const searchQuery = useDebounce(query, 2000);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(searchBy(searchQuery));
    }, [dispatch, searchQuery]);

    return (
        <form>
            <TextField
                id="search-bar"
                className="text"
                onInput={(e: any) => {
                    const { target } = e;
                    if (target) {
                        setQuery(e.target.value);
                    }
                }}
                label="Enter a product name"
                variant="outlined"
                placeholder="Search..."
                size="small"
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
        </form>
    );
};

const Options = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SearchBar />
            </Grid>
            <Grid item xs={6}>
                <SortOptions />
            </Grid>
        </Grid>
    );
};

export default Options;
