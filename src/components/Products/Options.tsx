import TuneIcon from "@mui/icons-material/Tune";
import {
    Box,
    Button,
    Grid,
    List,
    ListItem,
    Stack,
    SwipeableDrawer,
    useTheme,
} from "@mui/material";

import { useMemo, useState } from "react";
import Select, { ActionMeta } from "react-select";
import {
    SortOrder,
    allCategoryProducts,
    productsOfCategory,
    sortByPrice,
    sortByTitle,
} from "../../redux/productSlice";
import { useAppDispatch } from "../../redux/store/hooks";
import { CategoryType } from "../../types/productType";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { useIsMobile } from "../hooks/useIsMobile";
import CategoryTabs from "./CategoryTabs";

const options: any = [
    { value: "title_increasing", label: "A-Z" },
    { value: "title_decreasing", label: "Z-A" },
    { value: "price_increasing", label: "Low-Priced" },
    { value: "price_decreasing", label: "High-Priced" },
];

const SortOptions = () => {
    const dispatch = useAppDispatch();
    const muitheme = useTheme();
    return (
        <Select
            styles={{
                control: (baseStyles: any, _state) => ({
                    ...baseStyles,
                    maxWidth: "300px",
                    fontWeight: "600",
                }),
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary: muitheme.palette.primary.main,
                },
            })}
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

interface OptionProps {
    categories: CategoryType[];
}

interface FilterDrawerProps {
    children: React.ReactNode;
}

const drawerWidth = 240;
const FilterDrawer = ({ children }: FilterDrawerProps) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <>
            <Box sx={{ textAlign: "center", pt: 1 }}>
                <Button
                    startIcon={<TuneIcon />}
                    onClick={() => toggleDrawer(true)}
                >
                    Filters
                </Button>
            </Box>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
                swipeAreaWidth={340}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Box sx={{ pt: 10, pr: 1, pl: 1 }}>{children}</Box>
            </SwipeableDrawer>
        </>
    );
};

const Options = ({ categories }: OptionProps) => {
    const dispatch = useAppDispatch();
    const isDesktop = useIsDesktop();
    const isMobile = useIsMobile();

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
        if (option.value === "0") {
            dispatch(allCategoryProducts());
        } else {
            const categoryId = parseInt(option.value);
            dispatch(productsOfCategory(categoryId));
        }
    };

    if (isDesktop) {
        return (
            <Grid container spacing={2} style={{ paddingTop: "20px" }}>
                <Grid item xs={8}>
                    <CategoryTabs categories={categories} />
                </Grid>
                <Grid item xs={4}>
                    <SortOptions />
                </Grid>
            </Grid>
        );
    } else if (isMobile) {
        const items = [
            <Select options={categoryOptions} onChange={onChange} />,
            <SortOptions />,
        ];

        return (
            <FilterDrawer>
                <Stack direction="column">
                    <List>
                        {items.map((item, index) => {
                            return <ListItem key={index}>{item}</ListItem>;
                        })}
                    </List>
                </Stack>
            </FilterDrawer>
        );
    } else {
        return (
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Select options={categoryOptions} onChange={onChange} />
                </Grid>

                <Grid item xs={4}>
                    <SortOptions />
                </Grid>
            </Grid>
        );
    }
};

export default Options;
