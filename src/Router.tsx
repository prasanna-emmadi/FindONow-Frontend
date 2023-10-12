import { createBrowserRouter } from "react-router-dom";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import AdminRoute from "./components/AdminRoute";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import EditProduct from "./components/Product/EditProduct";
import Product from "./components/Product/Product";
import ProductForm from "./components/ProductForm";
import Products from "./components/Products/Products";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import RootPage from "./components/RootPage";
import SignUp from "./components/SignUp";
import User from "./components/User";
import Users from "./components/Users";

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
                path: "products",
                element: <Products />,
            },
            {
                path: "products/:id",
                element: <Product />,
            },
            {
                path: "products/create",
                element: (
                    <AdminRoute>
                        <ProductForm />
                    </AdminRoute>
                ),
            },
            {
                path: "products/edit/:id",
                element: (
                    <AdminRoute>
                        <EditProduct />
                    </AdminRoute>
                ),
            },
            {
                path: "admin",
                element: (
                    <AdminRoute>
                        <AdminProducts />
                    </AdminRoute>
                ),
            },

            {
                path: "users",
                element: (
                    //<ProtectedRoute>
                    <Users />
                    //</ProtectedRoute>
                ),
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
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
export default router;
