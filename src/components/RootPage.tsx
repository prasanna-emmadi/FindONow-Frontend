import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import Person2Icon from "@mui/icons-material/Person2";
import ApiIcon from "@mui/icons-material/Api";
import LockIcon from "@mui/icons-material/Lock";
import {
    Drawer,
    Grid,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeToken } from "../redux/authSlice";
import { useAppDispatch } from "../redux/store/hooks";
import { searchBy } from "../redux/productSlice";
import { useDebounce } from "./hooks/useDebounce";

const API_DOCUMENTATION_URL = process.env.REACT_APP_SERVER_URL + "/docs";

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
                {
                    path: "/users/orders",
                    name: "Orders",
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
                    {
                        path: API_DOCUMENTATION_URL,
                        name: "Swagger API Documentation",
                        icon: <ApiIcon />,
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

interface SearchBarProps {
    showLabel: boolean;
}
const SearchBar = ({ showLabel }: SearchBarProps) => {
    const [query, setQuery] = useState("");
    const searchQuery = useDebounce(query, 2000);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(searchBy(searchQuery));
    }, [dispatch, searchQuery]);

    return (
        <TextField
            id="search-bar"
            className="text"
            onInput={(e: any) => {
                const { target } = e;
                if (target) {
                    setQuery(e.target.value);
                }
            }}
            label={showLabel ? "Search a product name" : ""}
            variant="outlined"
            placeholder="Search..."
            size="small"
            style={{ width: "100%" }}
        />
    );
};

const drawerWidth = 200;
const RootPage = () => {
    const { token } = useAuthContext();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(true);

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
                //color="secondary"
                style={{
                    background: "#ffffff",
                    height: "100px",
                    justifyContent: "center",
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2, color: "black" }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Button
                                color="inherit"
                                onClick={onHomeClick}
                                style={{
                                    justifyContent: "flex-start",
                                    color: "black",
                                }}
                            >
                                Find'O Now
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            style={{ flexGrow: 1, justifyContent: "center" }}
                        >
                            <SearchBar showLabel={true} />
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            style={{ display: "flex" }}
                        >
                            <Button
                                color="inherit"
                                onClick={onLoginClick}
                                style={{ color: "black", fontWeight: "500" }}
                            >
                                {loginButtonText}
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <NavOptions />
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
