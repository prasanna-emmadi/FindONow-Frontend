import { createBrowserRouter } from "react-router-dom";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import AdminRoute from "./components/AdminRoute";
import CreateUpdateProduct from "./components/CreateUpdateProduct";
import CreateUpdateUser from "./components/CreateUpdateUser";
import EditUser from "./components/EditUser";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import EditProduct from "./components/Product/EditProduct";
import Product from "./components/Product/Product";
import Products from "./components/Products/Products";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import RootPage from "./components/RootPage";
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
                        <CreateUpdateProduct />
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
                element: <CreateUpdateUser />,
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
