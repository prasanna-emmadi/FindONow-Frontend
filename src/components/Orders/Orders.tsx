import { useGetOrdersQuery } from "../../redux/apiSlice";
import { OrderType } from "../../types/orderType";
import Suspense from "../common/Suspense";

interface Props {
    data: OrderType[];
}

const Content = ({ data }: Props) => {
    console.log(data);
    if (data.length === 0) {
        return <p>No orders found</p>;
    } else {
        const orders = data.map((order) => {
            return <li>{order._id}</li>;
        });
        return <ul>{orders}</ul>;
    }
};

const Orders = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetOrdersQuery();

    return (
        <Suspense
            data={data}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            Component={Content}
        />
    );
};

export default Orders;
