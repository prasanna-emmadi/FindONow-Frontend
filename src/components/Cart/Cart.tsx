import { Button } from "@mui/material";
import { AppStyles } from "../../App.styles";
import { resetCart } from "../../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { CartItemType } from "../../types/cartType";
import { ProductType } from "../../types/productType";
import CartItem from "./CartItem/Cartitem";
import { useAddNewOrderMutation } from "../../redux/apiSlice";
import { OrderType } from "../../types/orderType";

type Props = {
    addToCart: (clickedItem: ProductType) => void;
    removeFromCart: (id: string) => void;
};

const Cart = ({ addToCart, removeFromCart }: Props) => {
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const dispatch = useAppDispatch();
    const [addOrder] = useAddNewOrderMutation();

    const calculateTotal = (items: CartItemType[]): number =>
        items.reduce(
            (ack: number, item) => ack + item.amount * item.product.price,
            0,
        );
    const onBuy = async () => {
        // add order to the backend
        // cartItem -> orderItem
        const orderItems = cartItems.map((cartItem) => {
            const { product, amount } = cartItem;
            return {
                product: product._id,
                quantity: amount,
                priceAtPurchase: product.price,
            };
        });
        const date = new Date();
        const order: OrderType = {
            date: date.toISOString(),
            totalAmount: parseFloat(calculateTotal(cartItems).toFixed(2)),
            orderItems: orderItems,
        };
        await addOrder(order);
        // show snack

        dispatch(resetCart());
    };
    return (
        <AppStyles>
            <h2> Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p> No items in Cart.</p> : null}
            {cartItems.map((item) => (
                <CartItem
                    key={item.product._id}
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
