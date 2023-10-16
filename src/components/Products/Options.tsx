import { Grid, TextField } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import Select, { ActionMeta } from "react-select";
import {
    SortOrder,
    allCategoryProducts,
    productsOfCategory,
    searchBy,
    sortByPrice,
    sortByTitle,
} from "../../redux/productSlice";
import { useAppDispatch } from "../../redux/store/hooks";
import { CategoryType } from "../../types/productType";
import { useDebounce } from "../hooks/useDebounce";
import { useShowCategoryTabsHooks } from "./hooks/useShowCategoryTabsHook";

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
    );
};

interface OptionProps {
    categories: CategoryType[];
}

const Options = ({ categories }: OptionProps) => {
    const dispatch = useAppDispatch();
    const show = useShowCategoryTabsHooks();

    const categoryOptions = useMemo(() => {
        let allCategoryOption = { value: "0", label: "All" };
        let categoryOptions = categories.map(({ name, id }) => {
            const index = id;
            return {
                value: index.toString(),
                label: name,
            };
        });

        return [allCategoryOption, ...categoryOptions];
    }, [categories]);

    const onChange = (option: any, actionMeta: ActionMeta<any>) => {
        console.log("option ", option);
        if (option.value === "0") {
            dispatch(allCategoryProducts());
        } else {
            const categoryId = parseInt(option.value);
            dispatch(productsOfCategory(categoryId));
        }
    };

    if (show) {
        return (
            <Grid container spacing={2}>
                <Grid item xs={6} className="center-div">
                    <SearchBar />
                </Grid>
                <Grid item xs={6}>
                    <SortOptions />
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Select options={categoryOptions} onChange={onChange} />
                </Grid>

                <Grid item xs={4} className="center-div">
                    <SearchBar />
                </Grid>
                <Grid item xs={4}>
                    <SortOptions />
                </Grid>
            </Grid>
        );
    }
};

export default Options;
