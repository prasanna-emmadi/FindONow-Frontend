import { Button } from "@mui/material";
import { AppStyles } from "../../App.styles";
import { resetCart } from "../../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CartItemType } from "../../types/cartType";
import { ProductType } from "../../types/productType";
import CartItem from "./cartItem/Cartitem";

type Props = {
    addToCart: (clickedItem: ProductType) => void;
    removeFromCart: (id: number) => void;
};

const Cart = ({ addToCart, removeFromCart }: Props) => {
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const dispatch = useAppDispatch();

    const calculateTotal = (items: CartItemType[]) =>
        items.reduce(
            (ack: number, item) => ack + item.amount * item.product.price,
            0,
        );
    const onBuy = () => {
        dispatch(resetCart());
    };
    return (
        <AppStyles>
            <h2> Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p> No items in Cart.</p> : null}
            {cartItems.map((item) => (
                <CartItem
                    key={item.product.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2> Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
            <Button variant="contained" onClick={onBuy}>
                Buy
            </Button>
        </AppStyles>
    );
};

export default Cart;
