import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store/hooks";
import { ProductType } from "../../types/productType";

interface Props {
    data: ProductType[];
}

const InnerAdminProducts = ({ data }: Props) => {
    const products = data;
    const navigate = useNavigate();
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                            onClick={() => {
                                navigate("/products/edit/" + product.id);
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {product.title}
                            </TableCell>
                            <TableCell align="right">
                                {product.category.name}
                            </TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const AdminProducts = () => {
    const { originalProducts } = useAppSelector((state) => state.product);
    console.log({ originalProducts });
    return <InnerAdminProducts data={originalProducts} />;
};

export default AdminProducts;
