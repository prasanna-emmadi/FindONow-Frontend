import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
    return (
        <Grid container spacing={2} style={{ margin: "0% 10%" }}>
            <Grid item xs={4}>
                <Typography variant={"h4"}>Find'O Now</Typography>
                <Box component="p">
                    This Ecommerce store is used for searching, sorting
                    categories products and placing orders
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Typography variant={"h4"}>Useful links</Typography>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>All Products</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Grid>
            <Grid item xs={4}>
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
            </Grid>
        </Grid>
    );
};

export default Footer;
