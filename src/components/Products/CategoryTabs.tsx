import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import {
    allCategoryProducts,
    productsOfCategory,
} from "../../redux/productSlice";
import { useAppDispatch } from "../../redux/store/hooks";
import { CategoryType } from "../../types/productType";
import { useIsDesktop } from "../hooks/useIsDesktop";

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
};

interface Props {
    categories: CategoryType[];
}

const CategoryTabs = ({ categories }: Props) => {
    const show = useIsDesktop();
    const [value, setValue] = useState(0);
    const dispatch = useAppDispatch();
    // prune the categories to limited
    const filteredCategories = categories.filter((category) => {
        const categoryName = category.name.toLocaleLowerCase();
        return (
            categoryName === "clothes" ||
            categoryName === "electronics" ||
            categoryName === "furniture" ||
            categoryName === "shoes"
        );
    });

    if (!show) {
        return null;
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        if (newValue === 0) {
            dispatch(allCategoryProducts());
        } else {
            dispatch(productsOfCategory(newValue));
        }
        setValue(newValue);
    };

    // all - 0
    // specific category
    // pass the products down the line
    let allCategoriesTab = <Tab label={"all"} {...a11yProps(0)} key={0} />;
    let categoryTabs = filteredCategories.map((category, index) => {
        return <Tab label={category.name} {...a11yProps(0)} key={index + 1} />;
    });
    categoryTabs = [allCategoriesTab, ...categoryTabs];
    return (
        <Box className="center-div">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Category tabs"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >
                {categoryTabs}
            </Tabs>
        </Box>
    );
};

export default CategoryTabs;
