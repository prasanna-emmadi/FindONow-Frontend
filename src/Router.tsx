import { createBrowserRouter } from "react-router-dom";
import RootPage from "./components/RootPage";
import AdminProducts from "./components/adminComponents/AdminProducts";
import Login from "./components/auth/Login";
import ErrorPage from "./components/common/ErrorPage";
import CreateProduct from "./components/product/CreateProduct";
import EditProduct from "./components/product/EditProduct";
import Product from "./components/product/Product";
import UpdateProduct from "./components/product/UpdateProduct";
import Products from "./components/products/Products";
import AdminRoute from "./components/routes/AdminRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import EditUser from "./components/user/EditUser";
import Profile from "./components/user/Profile";
import SignUp from "./components/user/SignUp";
import User from "./components/user/User";
import Users from "./components/user/Users";

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
                        <CreateProduct />
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
                path: "products/update/:id",
                element: (
                    <AdminRoute>
                        <UpdateProduct />
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
                    <AdminRoute>
                        <Users />/
                    </AdminRoute>
                ),
            },
            {
                path: "users/:id",
                element: <User />,
            },
            {
                path: "users/edit",
                element: (
                    <ProtectedRoute>
                        <EditUser />
                    </ProtectedRoute>
                ),
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
