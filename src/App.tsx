import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import router from "./Router";
import AuthContextProvider from "./context/AuthContext";

const theme = createTheme({
    palette: {
        primary: {
            main: "#5F7FB8",
        },
        secondary: {
            main: "#D8774C",
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthContextProvider>
                <RouterProvider router={router} />
            </AuthContextProvider>
        </ThemeProvider>
    );
};

export default App;
