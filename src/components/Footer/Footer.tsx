import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
    // change to items
    // usage the grid template columns to do the auto thing
    return (
        <Box className="footer-grid-container">
            <Box>
                <Typography variant={"h4"}>Find'O Now</Typography>
                <Box component="p">
                    This Ecommerce store is used for searching, sorting
                    categories products and placing orders
                </Box>
            </Box>
            <Box>
                <Typography variant={"h4"}>Useful links</Typography>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>All Products</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Box>
            <Box>
                <Typography variant={"h4"}>Contact</Typography>
                <List>
                    <ListItem>
                        <HomeWorkIcon style={{ marginRight: "8px" }} />
                        Kartoittajantie
                    </ListItem>
                    <ListItem>
                        <EmailIcon style={{ marginRight: "8px" }} />
                        contact@findonow.com
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default Footer;
