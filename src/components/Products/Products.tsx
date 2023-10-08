import { useGetProductsQuery } from "../../features/api/apiSlice"
import { Product as ProductType } from "../../types/productType"
import Suspense from "../Suspense"
import { CartProduct } from "../Product/Product"
import { Badge, Drawer, Grid } from "@mui/material"
import { Wrapper, StyledButton } from "./Products.styles"
import { useState } from "react"
import { AddShoppingCart } from "@mui/icons-material"
import Cart from "../Cart/Cart"
import { CartItemType } from "../../types/cartType"
import { addToCart, removeFromCart } from "../../features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

interface Props {
    data: ProductType[]
}

const InnerProductList = ({ data }: Props) => {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state => state.cart)
    const [cartOpen, setCartOpen] = useState(false);

    const handleAddToCart = (clickedItem: ProductType) => {
        dispatch(addToCart(clickedItem))
    };

    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id))
    };

    return (
        <Wrapper>
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cart.cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={cart.totalItems} color="error">
                    <AddShoppingCart />
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {data.map((product => (
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