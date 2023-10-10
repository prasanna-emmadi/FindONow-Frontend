import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;
const RootPage = () => {
    const navigate = useNavigate()
    
    const onLoginClick = () => {
        navigate("/login")
    }
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Amazing Products
                    </Typography>
                    <Button color="inherit" onClick={onLoginClick}>Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        {["Inbox", "Starred", "Send email", "Drafts"].map(
                            (text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? (
                                                <InboxIcon />
                                            ) : (
                                                <MailIcon />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ),
                        )}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default RootPage;
