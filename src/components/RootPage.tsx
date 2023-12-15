import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ApiIcon from "@mui/icons-material/Api";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import Person2Icon from "@mui/icons-material/Person2";
import SearchIcon from "@mui/icons-material/Search";
import {
    Avatar,
    Drawer,
    Grid,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeToken } from "../redux/authSlice";
import { searchBy } from "../redux/productSlice";
import { useAppDispatch } from "../redux/store/hooks";
import { useDebounce } from "./hooks/useDebounce";
import { useIsDesktop } from "./hooks/useIsDesktop";

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

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const searchQuery = useDebounce(query, 2000);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(searchBy(searchQuery));
    }, [dispatch, searchQuery]);

    return (
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
            }}
        >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Products"
                inputProps={{ "aria-label": "search products" }}
                onInput={(e: any) => {
                    const { target } = e;
                    if (target) {
                        setQuery(e.target.value);
                    }
                }}
            />
        </Paper>
    );
};

const Profile = () => {
    const settings = ["Profile", "Account", "Dashboard", "Logout"];
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const profile = (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );

    return profile;
};

const drawerWidth = 200;
const RootPage = () => {
    const { token } = useAuthContext();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const isDesktop = useIsDesktop();

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

    const drawer = (
        <Drawer
            open={open}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    top: "40px",
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
    );

    const menuButton = (
        <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "black" }}
            onClick={handleDrawerToggle}
        >
            <MenuIcon />
        </IconButton>
    );

    const loginButton = (
        <Button
            color="inherit"
            onClick={onLoginClick}
            style={{ color: "black", fontWeight: "500" }}
        >
            {loginButtonText}
        </Button>
    );

    const signupButton = (
        <Button
            onClick={onLoginClick}
            variant="contained"
            style={{
                color: "white",
                fontWeight: "500",
                borderRadius: 16,
                backgroundColor: "#00BDC8",
            }}
        >
            Sign Up
        </Button>
    );

    const loginOrProfile = isLoggedIn ? <Profile /> : loginButton;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                enableColorOnDark
                style={{
                    background: "#ffffff",
                    height: "100px",
                    justifyContent: "center",
                }}
            >
                <Toolbar>
                    {!isDesktop && menuButton}
                    <Grid
                        container
                        spacing={2}
                        style={{ justifyContent: "center", paddingTop: "8px" }}
                    >
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
                            style={{ flexGrow: 1, paddingTop: "-2px" }}
                        >
                            <SearchBar />
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            style={{
                                display: "flex",
                                justifyContent: "end",
                            }}
                        >
                            {loginOrProfile}
                            {signupButton}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {!isDesktop && drawer}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default RootPage;
