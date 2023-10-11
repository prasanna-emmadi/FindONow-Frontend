import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InventoryIcon from "@mui/icons-material/Inventory";
import Person2Icon from "@mui/icons-material/Person2";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeToken } from "../redux/auth/authSlice";
import { useAppDispatch } from "../redux/store/hooks";

const NavOptions = () => {
    const { token, isAdmin } = useAuthContext();
    const navigate = useNavigate();

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
                console.log("populating admin options");
                allOptions = [
                    ...allOptions,
                    {
                        path: "/admin",
                        name: "Admin Dashboard",
                        icon: <InventoryIcon />,
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
            <Button
                key={index}
                color="inherit"
                onClick={() => {
                    navigate(path);
                }}
            >
                {name}
            </Button>
        );
    });
    return <>{optionComponents}</>;
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
                enableColorOnDark
                color="secondary"
                style={{ background: "#2E3B55" }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Find'O Now
                    </Typography>
                    <NavOptions />
                    <Button color="inherit" onClick={onLoginClick}>
                        {loginButtonText}
                    </Button>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default RootPage;
