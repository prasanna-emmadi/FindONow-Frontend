import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Person2Icon from "@mui/icons-material/Person2";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeToken } from "../redux/auth/authSlice";
import { useAppDispatch } from "../redux/store/hooks";

const NavOptions = () => {
    const { token } = useAuthContext();

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

    const optionsComponent = allOptions.map((option) => {
        const { path, name, icon } = option;
        return (
            <Link
                to={path}
                style={{ textDecoration: "none", color: "inherit" }}
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

    return <List>{optionsComponent}</List>;
};

const drawerWidth = 240;
const RootPage = () => {
    const { token } = useAuthContext();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
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
                    <Button color="inherit" onClick={onLoginClick}>
                        {loginButtonText}
                    </Button>
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
