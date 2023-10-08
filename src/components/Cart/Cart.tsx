import { Wrapper } from "../../App.styles";
import CartItem from "../CartItem/Cartitem";
import { CartItemType } from "../../types/cartType";
import { ProductType } from "../../types/productType";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: ProductType) => void;
    removeFromCart: (id: string) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce(
            (ack: number, item) => ack + item.amount * item.product.price,
            0,
        );
    return (
        <Wrapper>
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
        </Wrapper>
    );
};

export default Cart;
