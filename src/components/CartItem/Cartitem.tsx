import { Button } from "@mui/material";
import { CartItemType } from "../../types/cartType";
import { Wrapper } from "./Cartitem.styles";
import { Product } from "../../types/productType";

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: Product) => void;
    removeFromCart: (id: string) => void;
}

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) =>
    <Wrapper>
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
                    onClick={() => removeFromCart(item.product.id)}>
                    -
                </Button>

                <p>{item.amount}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => addToCart(item.product)} >
                    +
                </Button>
            </div>
        </div>
        <img src={item.product.images[0]} alt={item.product.title} />
    </Wrapper>

export default CartItem;