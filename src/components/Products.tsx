import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../features/api/apiSlice"
import { Product } from "../types/productType"
import { List } from "@mui/material"
import Suspense from "./Suspense"

interface Props {
    data: Product[] | undefined
}

const InnerProductList = ({ data }: Props) => {
    if (data === undefined) return <List />;
    return (<List>{data.map((product: Product) => {
        const to = "/products/" + product.id
        return (<Link to={to} key={product.id}>
            <div >{product.title} </div>
        </Link>)
    })}
    </List>);

}

const ProductList = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductsQuery()

    let content = <Suspense
        data={data}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        Component={InnerProductList} />

    return (
        <section className="products-list">
            <h2>products</h2>
            {content}
        </section>
    )
}

export default ProductList