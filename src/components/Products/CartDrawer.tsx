import { Drawer } from "@mui/material";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { AppDispatch } from "../../redux/store/configureStore";
import { CartItemType } from "../../types/cartType";
import { ProductType } from "../../types/productType";
import Cart from "../Cart/Cart";

interface Props {
    dispatch: AppDispatch;
    setSnackOpen: (arg0: boolean) => void;
    cartItems: CartItemType[];
    setCartOpen: (arg0: boolean) => void;
    cartOpen: boolean;
}

const CartDrawer = ({
    setSnackOpen,
    dispatch,
    cartItems,
    cartOpen,
    setCartOpen,
}: Props) => {
    const handleAddToCart = (clickedItem: ProductType) => {
        setSnackOpen(true);
        dispatch(addToCart(clickedItem));
    };

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id));
    };

    return (
        <Drawer
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
        >
            <Cart
                cartItems={cartItems}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
            />
        </Drawer>
    );
};

export default CartDrawer;
