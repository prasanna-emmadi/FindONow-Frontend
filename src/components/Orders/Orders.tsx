import {
    Box,
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useGetOrdersQuery } from "../../redux/apiSlice";
import { GetOrderType } from "../../types/orderType";
import Suspense from "../common/Suspense";
import React, { useState } from "react";

const toReadableDateString = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    let month: any = (date.getMonth() + 1);
    let dt:any = date.getDate();

    if (dt < 10) {
        dt = "0" + dt;
    }
    if (month < 10) {
        month = "0" + month;
    }

    return `${dt}-${month}-${year}`;
};

interface RowProps {
    row: GetOrderType;
}

function Row({ row }: RowProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" }, width: "60%" }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row._id}
                </TableCell>
                <TableCell align="right">
                    {toReadableDateString(row.date)}
                </TableCell>
                <TableCell align="right">{row.totalAmount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                OrderItems
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell align="right">
                                            Total price ($)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row?.orderItems?.map((historyRow) => (
                                        <TableRow key={historyRow._id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                <img
                                                    src={
                                                        historyRow.product
                                                            .images[0]
                                                    }
                                                    alt={
                                                        historyRow.product.title
                                                    }
                                                    width={60}
                                                    height={60}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {historyRow.quantity}
                                            </TableCell>
                                            <TableCell align="right">
                                                {Math.round(
                                                    historyRow.quantity *
                                                        historyRow.product
                                                            .price *
                                                        100,
                                                ) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

interface Props {
    data: GetOrderType[];
}

const Content = ({ data }: Props) => {
    const orders = data;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">TotalAmount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order, index) => {
                        return <Row key={order._id} row={order} />;
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
