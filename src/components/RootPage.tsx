import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import Person2Icon from "@mui/icons-material/Person2";
import {
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useMemo, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeToken } from "../redux/authSlice";
import { useAppDispatch } from "../redux/store/hooks";

const NavOptions = () => {
    const { token, isAdmin } = useAuthContext();

    const allOptions = useMemo(() => {
        const options = [
            {
                path: "/home",
                name: "Home",
                icon: <HomeIcon />,
            },
        ];

        let allOptions = options;

        if (token !== undefined) {
            const loggedInOptions = [
                {
                    path: "/users",
                    name: "Users",
                    icon: <GroupIcon />,
                },
                {
                    path: "/profile",
                    name: "Profile",
                    icon: <Person2Icon />,
                },
            ];

            allOptions = allOptions.concat(loggedInOptions);
            if (isAdmin) {
                allOptions = [
                    ...allOptions,
                    {
                        path: "/admin",
                        name: "Admin Dashboard",
                        icon: <InventoryIcon />,
                    },
                    {
                        path: "/products/create",
                        name: "Create Product",
                        icon: <AddToPhotosIcon />,
                    },
                ];
            }
        } else {
            allOptions = [
                ...allOptions,
                {
                    path: "/signup",
                    name: "SignUp",
                    icon: <HowToRegIcon />,
                },
            ];
        }
        return allOptions;
    }, [token, isAdmin]);

    const optionComponents = allOptions.map((option, index) => {
        const { path, name, icon } = option;

        return (
            <Link
                to={path}
                style={{ textDecoration: "none", color: "inherit" }}
                key={index}
            >
                <ListItem key={name} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItemButton>
                </ListItem>
            </Link>
        );
    });
    return <>{optionComponents}</>;
};

const drawerWidth = 200;
const RootPage = () => {
    const { token } = useAuthContext();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const isLoggedIn = token !== undefined;
    const loginButtonText = isLoggedIn ? "Logout" : "Login";

    const onLoginClick = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            dispatch(removeToken());
            navigate("/");
        }
    };

    const onHomeClick = () => {
        navigate("/");
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                enableColorOnDark
                color="secondary"
                style={{ background: "#2E3B55" }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button
                        color="inherit"
                        onClick={onHomeClick}
                        style={{ justifyContent: "flex-start", flexGrow: 1 }}
                    >
                        Find'O Now
                    </Button>
                    <Button color="inherit" onClick={onLoginClick}>
                        {loginButtonText}
                    </Button>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
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
                    <NavOptions />
                </Box>
            </SwipeableDrawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default RootPage;
