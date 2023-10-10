import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Users from "./components/Users";
import User from "./components/User";
import Product from "./components/Product/Product";
import Products from "./components/Products/Products";
import SignUp from "./components/SignUp";
import ProductForm from "./components/ProductForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile/Profile";
import RootPage from "./components/RootPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Products /> },
            {
                path: "home",
                element: <Products />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "logout",
                element: (
                    <ProtectedRoute>
                        <Logout />
                    </ProtectedRoute>
                ),
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "products/:id",
                element: <Product />,
            },
            {
                path: "products/create",
                element: <ProductForm />,
            },
            {
                path: "users",
                element: <Users />,
            },
            {
                path: "users/:id",
                element: <User />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
]);
export default router;
