import { ReactNode } from "react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ApiIcon from "@mui/icons-material/Api";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import Person2Icon from "@mui/icons-material/Person2";
import {
    Avatar,
    Divider,
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
import Toolbar from "@mui/material/Toolbar";
import { useMemo, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeToken } from "../redux/authSlice";
import { useAppDispatch } from "../redux/store/hooks";
import { useIsDesktop } from "./hooks/useIsDesktop";
import Footer from "./Footer/Footer";
import CenterDiv from "./common/CenterDiv";

const API_DOCUMENTATION_URL = process.env.REACT_APP_SERVER_URL + "/docs";

interface OptionType {
    path: string;
    name: string;
    icon: ReactNode;
    action?: (arg0: any) => void;
    link?: boolean;
}

const getAllOptions = (isAdmin: boolean, isLoggedIn: boolean): OptionType[] => {
    const options: OptionType[] = [
        {
            path: "/home",
            name: "Home",
            icon: <HomeIcon />,
        },
    ];

    let allOptions = options;

    if (isLoggedIn) {
        const loggedInOptions = [
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
                    path: "/users",
                    name: "Users",
                    icon: <GroupIcon />,
                },
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
                    link: true,
                },
            ];
        }
        allOptions = [
            ...allOptions,
            {
                path: "/home",
                name: "Logout",
                icon: <ApiIcon />,
                action: (dispatch: any) => {
                    dispatch(removeToken());
                },
            },
        ];
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
};

const NavOptions = () => {
    const { token, isAdmin } = useAuthContext();

    const allOptions = useMemo(() => {
        return getAllOptions(isAdmin, token !== undefined);
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

const Profile = () => {
    const { token, isAdmin } = useAuthContext();
    const settings = getAllOptions(isAdmin, token !== undefined);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = (setting: any) => {
        // if link don't navigate
        if (!setting?.link) {
            navigate(setting.path);
        }
        // execute action if one exists
        if (setting.action) {
            setting.action(dispatch);
        }
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
                {settings.map((setting) => {
                    const content = (
                        <Typography textAlign="center">
                            {setting.name}
                        </Typography>
                    );

                    return (
                        <MenuItem
                            key={setting.name}
                            onClick={() => handleCloseUserMenu(setting)}
                        >
                            {setting?.link ? (
                                <a
                                    href={setting.path}
                                    target="_blank"
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    {content}
                                </a>
                            ) : (
                                content
                            )}
                        </MenuItem>
                    );
                })}
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

    const onSignupClick = () => {
        navigate("/signup");
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
            onClick={onSignupClick}
            variant="contained"
            style={{
                fontWeight: "500",
                borderRadius: 16,
            }}
        >
            Sign Up
        </Button>
    );

    const loggedInContent = (
        <CenterDiv>
            <Profile />
        </CenterDiv>
    );
    const notLoggedInContent = (
        <CenterDiv>
            {loginButton}
            {signupButton}
        </CenterDiv>
    );

    const authContent = isLoggedIn ? loggedInContent : notLoggedInContent;

    return (
        <>
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
                            style={{
                                justifyContent: "center",
                                paddingTop: "8px",
                            }}
                        >
                            <Grid item xs={3}>
                                <Button
                                    color="inherit"
                                    onClick={onHomeClick}
                                    style={{
                                        justifyContent: "flex-start",
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: "24px",
                                    }}
                                >
                                    Find
                                    <Typography
                                        variant={"h3"}
                                        style={{ marginBottom: "13px" }}
                                    >
                                        {"'O "}
                                    </Typography>
                                    Now
                                </Button>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                style={{ flexGrow: 1, paddingTop: "-2px" }}
                            >
                                <div />
                            </Grid>
                            <Grid
                                item
                                xs={3}
                                style={{
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                {authContent}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {!isDesktop && drawer}
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}
                >
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
            <Divider />
            <Footer />
        </>
    );
};

export default RootPage;
