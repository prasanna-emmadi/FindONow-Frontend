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

interface Props {
    data: ProductType[]
}

const InnerProductList = ({ data }: Props) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);
    const getTotalItems = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: ProductType) => {
        setCartItems(prev => {
            const isItemInCart = prev.find(item => item.product.id === clickedItem.id)

            if (isItemInCart) {
                return prev.map(item => (
                    item.product.id === clickedItem.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                ))
            }
            return [...prev, { product: { ...clickedItem }, amount: 1 }];

        })
    };

    const handleRemoveFromCart = (id: string) => {
        setCartItems(prev => (
            prev.reduce((ack, item) => {
                if (item.product.id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        ));
    };

    return (
        <Wrapper>
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
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