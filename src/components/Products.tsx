import { useGetProductsQuery } from "../features/api/apiSlice"
import { Product as ProductType } from "../types/productType"
import Suspense from "./Suspense"
import { CartProduct } from "./Product"
import { Grid } from "@mui/material"
import { Wrapper } from "./Products.styles"
interface Props {
    data: ProductType[]
}

const InnerProductList = ({ data }: Props) => {
    const handleAddToCart = (clickedItem: ProductType) => null;
    return (
        <Wrapper>
            <Grid container spacing={3}>
                {data?.map((product => (
                    <Grid item key={product.id} xs={12} sm={4}>
                        <CartProduct data={product} handleAddToCart={handleAddToCart} />
                    </Grid>
                )))}
            </Grid>
        </Wrapper>
    );

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