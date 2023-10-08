import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Root from "./components/Root";
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "logout",
                element: <Logout />,
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
        ],
    },
]);
export default router;
