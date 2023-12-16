import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../types/productType";
import useColors from "../hooks/useColors";

interface Props {
    product: ProductType;
    handleAddToCart: (clickedItem: ProductType) => void;
}

const ProductCard = ({ product, handleAddToCart }: Props) => {
    const { mainColor, secondaryColor } = useColors();

    const navigate = useNavigate();
    const onClick = () => {
        navigate("/products/" + product._id);
    };
    return (
        <Card sx={{ maxWidth: 390 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: mainColor }} aria-label="recipe">
                        {product.category.name[0].toLocaleUpperCase()}
                    </Avatar>
                }
                title={product.title}
                onClick={onClick}
            />
            <CardMedia
                component="img"
                height="400"
                image={product.images[0]}
                alt={product.title}
                onClick={onClick}
                className="products-grid-item-image"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Stack
                    direction="row"
                    spacing={4}
                    className="products-grid-item-price-cart"
                >
                    <Typography variant="h5" color="text.primary" pt={2}>
                        ${product.price}
                    </Typography>
                    <IconButton
                        aria-label="share"
                        onClick={() => handleAddToCart(product)}
                        style={{
                            marginTop: "12px",
                            color: secondaryColor,
                            fontSize: "24px",
                        }}
                        className="products-grid-item-price-cart-icon"
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
