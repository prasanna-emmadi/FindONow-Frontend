import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/apiSlice";
import { OrderType } from "../../types/orderType";
import Suspense from "../common/Suspense";

interface Props {
    data: OrderType[];
}

const Content = ({ data }: Props) => {
    const orders = data;
    //const navigate = useNavigate();
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">TotalAmount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order, index) => {
                        const id = index + 1;
                        return (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                                onClick={() => {
                                    //navigate("/users/" + user.id);
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {id}
                                </TableCell>
                                <TableCell align="right">{order._id}</TableCell>
                                <TableCell align="right">
                                    {order.date}
                                </TableCell>
                                <TableCell align="right">
                                    {order.totalAmount}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const Orders = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetOrdersQuery();

    let content = (
        <Suspense
            data={data}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            Component={Content}
        />
    );

    return <section className="users-list">{content}</section>;
};
export default Orders;
