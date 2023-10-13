import { Grid, TextField } from "@mui/material";

import { useEffect, useState } from "react";
import Select from "react-select";
import {
    SortOrder,
    searchBy,
    sortByPrice,
    sortByTitle,
} from "../../redux/productSlice";
import { useAppDispatch } from "../../redux/store/hooks";
import { useDebounce } from "../hooks/useDebounce";

const options: any = [
    { value: "title_increasing", label: "Title ↑" },
    { value: "title_decreasing", label: "Title ↓" },
    { value: "price_increasing", label: "Price ↑" },
    { value: "price_decreasing", label: "Price ↓" },
];

const SortOptions = () => {
    const dispatch = useAppDispatch();
    return (
        <Select
            options={options}
            onChange={(newValue: any) => {
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
                label="Search a product name"
                variant="outlined"
                placeholder="Search..."
                size="small"
            />
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
