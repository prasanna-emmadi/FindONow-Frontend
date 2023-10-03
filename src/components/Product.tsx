import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../features/api/apiSlice";

const Product = () => {
    const { id } = useParams();
    const {
        data: product,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductQuery(id);

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = <div>{product.title}</div>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    return (
        <section className="products-list">
            <h2>product</h2>
            {content}
        </section>
    )
}
export default Product;