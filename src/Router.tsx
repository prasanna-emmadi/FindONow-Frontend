import { createBrowserRouter } from "react-router-dom";
import AdminProducts from "./components/AdminComponents/AdminProducts";
import Login from "./components/Auth/Login";
import ErrorPage from "./components/Common/ErrorPage";
import CreateProduct from "./components/Product/CreateProduct";
import EditProduct from "./components/Product/EditProduct";
import Product from "./components/Product/Product";
import UpdateProduct from "./components/Product/UpdateProduct";
import Products from "./components/Products/Products";
import RootPage from "./components/RootPage";
import AdminRoute from "./components/Routes/AdminRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import EditUser from "./components/User/EditUser";
import Profile from "./components/User/Profile";
import SignUp from "./components/User/SignUp";
import User from "./components/User/User";
import Users from "./components/User/Users";

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
