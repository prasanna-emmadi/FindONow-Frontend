import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/api/apiSlice";
import { ProductType } from "../../types/productType";
import Suspense from "../Suspense";
import { Wrapper } from "./Product.styles";
import Button from "@mui/material/Button";

interface Props {
    data: ProductType;
}

const InnerProductContent = ({ data }: Props) => {
    return (
        <>
            <img src={data.images[0]} alt={data.title} />
            <div>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                <h3>${data.price}</h3>
            </div>
        </>
    );
};

const InnerProduct = ({ data }: Props) => {
    return (
        <Wrapper>
            <InnerProductContent data={data} />
        </Wrapper>
    );
};
interface CartProductProps {
    data: ProductType;
    handleAddToCart: (clickedItem: ProductType) => void;
}

export const CartProduct = ({ data, handleAddToCart }: CartProductProps) => {
    return (
        <Wrapper>
            <InnerProductContent data={data} />
            <Button onClick={() => handleAddToCart(data)}>add to cart</Button>
        </Wrapper>
    );
};
const Product = () => {
    const { id } = useParams();
    const { data, isLoading, isSuccess, isError, error } =
        useGetProductQuery(id);

    let content = (
        <Suspense
            data={data}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            Component={InnerProduct}
        />
    );

    return (
        <section className="products-list">
            <h2>product</h2>
            {content}
        </section>
    );
};
export default Product;
