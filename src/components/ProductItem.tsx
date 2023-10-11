import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { ProductType } from "../types/productType";

interface Props {
    product: ProductType;
    handleAddToCart: (clickedItem: ProductType) => void;
}

const ProductCard = ({ product, handleAddToCart }: Props) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {product.category.name[0].toLocaleUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={product.title}
                subheader={product.category.name}
            />
            <CardMedia
                component="img"
                height="194"
                image={product.images[0]}
                alt={product.title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton
                    aria-label="share"
                    onClick={() => handleAddToCart(product)}
                >
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ProductCard;