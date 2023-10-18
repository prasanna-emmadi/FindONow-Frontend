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
    const totalItems = useAppSelector((state) => state.cart.totalItems);
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
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={totalItems} color="error">
                    <AddShoppingCart />
                </Badge>
            </StyledButton>
        </>
    );
};

export default CartDrawer;
