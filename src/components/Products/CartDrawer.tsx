import { AddShoppingCart } from "@mui/icons-material";
import { Badge, Drawer } from "@mui/material";
import { useState } from "react";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { AppDispatch } from "../../redux/store/configureStore";
import { useAppSelector } from "../../redux/store/hooks";
import { ProductType } from "../../types/productType";
import Cart from "../Cart/Cart";
import { StyledButton } from "./Products.styles";

interface Props {
    dispatch: AppDispatch;
    setSnackOpen: (arg0: boolean) => void;
}

const CartDrawer = ({ setSnackOpen, dispatch }: Props) => {
    const cart = useAppSelector((state) => state.cart);
    const [cartOpen, setCartOpen] = useState(false);

    const handleAddToCart = (clickedItem: ProductType) => {
        setSnackOpen(true);
        dispatch(addToCart(clickedItem));
    };

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id));
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            >
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
        </>
    );
};

export default CartDrawer;
