import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store/hooks";
import { ProductType } from "../../types/productType";
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemButton,
    Typography,
    Divider,
    Box,
    Alert,
    Snackbar,
    useTheme,
    useMediaQuery,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useColors from "../hooks/useColors";
import UpdateProductForm from "../Product/UpdateProductForm";
import { useDeleteProductMutation } from "../../redux/apiSlice";

interface Props {
    data: ProductType[];
}

interface UpdateProductProps {
    id: string;
    onClose: () => void;
}

const UpdateProduct = ({ id, onClose }: UpdateProductProps) => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const handleUpdate = () => {
        setOpen(false);
        onClose();
        navigate("/products/" + id);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
            <DialogTitle>Update Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Here product details such as title, image, price and
                    category can be updated.
                </DialogContentText>
                <UpdateProductForm
                    id={id}
                    onCancelClick={handleClose}
                    onUpdateClick={handleUpdate}
                />
            </DialogContent>
        </Dialog>
    );
};

const Content = ({ data }: Props) => {
    const products = data;
    const { secondaryColor } = useColors();
    const [updateId, setUpdateId] = useState<string | null>(null);
    const [deleteProduct, deleteResult] = useDeleteProductMutation();
    const [snackOpen, setSnackOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (deleteResult.isSuccess) {
            navigate("/products");
        } else {
        }
    }, [deleteResult.isSuccess, navigate]);

    const onUpdateClick = (id: string) => {
        setUpdateId(id);
    };

    const onUpdateClose = () => {
        setUpdateId(null);
    };

    const onDeleteClick = async (id: string) => {
        try {
            await deleteProduct(id).unwrap();
        } catch {
            setSnackOpen(true);
            console.error("error in delete product");
        }
    };

    const handleSnackClose = (
        _event: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackOpen(false);
    };

    const list = (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {products.map((product) => {
                return (
                    <Box key={product._id}>
                        <ListItem key={product._id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.title}
                                secondary={product.description}
                                secondaryTypographyProps={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                                style={{
                                    maxWidth: "400px",
                                    wordBreak: "break-all",
                                }}
                            />
                            <ListItemButton
                                component="button"
                                style={{
                                    maxWidth: "fit-content",
                                    color: secondaryColor,
                                    fontSize: "20px",
                                    marginLeft: "200px",
                                    border: "1px solid",
                                    borderRadius: "10px",
                                }}
                                onClick={() => onUpdateClick(product._id)}
                            >
                                Update
                            </ListItemButton>
                            <ListItemButton
                                style={{
                                    maxWidth: "fit-content",
                                    color: "#f44336",
                                    fontSize: "20px",
                                    marginLeft: "30px",
                                    border: "1px solid",
                                    borderRadius: "10px",
                                }}
                                onClick={() => onDeleteClick(product._id)}
                            >
                                Delete
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </Box>
                );
            })}
        </List>
    );

    return (
        <>
            {list}
            {updateId !== null ? (
                <UpdateProduct id={updateId} onClose={onUpdateClose} />
            ) : null}
            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleSnackClose}
            >
                <Alert severity="error" sx={{ width: "100%" }}>
                    Delete failed
                </Alert>
            </Snackbar>
        </>
    );
};

const AdminProducts = () => {
    const { originalProducts } = useAppSelector((state) => state.product);
    //return <InnerAdminProducts data={originalProducts} />;
    return (
        <section className="products-list">
            <Typography
                variant="h3"
                color="text.primary"
                style={{ textAlign: "center" }}
                pb={2}
            >
                Admin Dashboard
            </Typography>
            <Divider />
            <Content data={originalProducts} />
        </section>
    );
};

export default AdminProducts;
