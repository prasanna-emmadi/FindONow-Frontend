import { Button } from "@mui/material";
import { CartItemType } from "../../../types/cartType";
import { ProductType } from "../../../types/productType";
import { CartStyles } from "./Cartitem.styles";

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: ProductType) => void;
    removeFromCart: (id: string) => void;
};

const CartItem = ({ item, addToCart, removeFromCart }: Props) => (
    <CartStyles>
        <div>
            <h3>{item.product.title}</h3>
            <div className="information">
                <p>Price: ${item.product.price}</p>
                <p>Total: ${(item.amount * item.product.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => removeFromCart(item.product._id)}
                >
                    -
                </Button>

                <p>{item.amount}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => addToCart(item.product)}
                >
                    +
                </Button>
            </div>
        </div>
        <img src={item.product.images[0]} alt={item.product.title} />
    </CartStyles>
);

export default CartItem;
