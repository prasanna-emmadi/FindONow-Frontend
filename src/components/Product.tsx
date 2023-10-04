import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../features/api/apiSlice";
import { Product as ProductType } from "../types/productType"
import Suspense from "./Suspense";

interface Props {
    data: ProductType
}

const InnerProduct = ({ data }: Props) => {
    if (!data) return <div />
    return <div>{data.title}</div>
}

const Product = () => {
    const { id } = useParams();
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductQuery(id);

    let content = <Suspense
        data={data}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        Component={InnerProduct} />

    return (
        <section className="products-list">
            <h2>product</h2>
            {content}
        </section>
    )
}
export default Product;