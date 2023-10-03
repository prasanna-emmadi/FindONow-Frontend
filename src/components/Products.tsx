import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../features/api/apiSlice"
import { Product } from "../types/productType"
import { List } from "@mui/material"

const ProductList = () => {
    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductsQuery()

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content =
            <List>{products.map((product: Product) => {
                const to = "/products/" + product.id
                return (<Link to={to} key={product.id}>
                    <div >{product.title} </div>
                </Link>)
            })}
            </List>

    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    

    // withHOC

    return (
        <section className="products-list">
            <h2>products</h2>
            {content}
        </section>
    )
}



export default ProductList