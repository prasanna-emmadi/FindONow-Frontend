import { Box, Pagination, useMediaQuery } from "@mui/material";

interface Props {
    pageCount: number;
    page: number;
    handleChange: (arg0: React.ChangeEvent<unknown>, arg1: number) => void;
}

const ProductsPagination = ({ pageCount, page, handleChange }: Props) => {
    const matches = useMediaQuery("(min-width:993px)");

    let siblingCount: number | undefined = 0;
    if (!matches) {
        siblingCount = undefined;
    }

    return (
        <Box pt={3} pb={5} className="products-pagination l">
            <Pagination
                count={pageCount}
                page={page}
                onChange={handleChange}
                color="secondary"
                siblingCount={siblingCount}
            />
        </Box>
    );
};

export default ProductsPagination;
