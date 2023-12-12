import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryType, ProductType } from "../types/productType";
import { OrderType, OrderItemType } from "../types/orderType";
import { UserType } from "../types/userType";
import { RootState } from "./store/configureStore";

//export const API_URL = "https://api.escuelajs.co/api/v1/";
export const API_URL = "http://localhost:8080/api/v1/";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const auth = (getState() as RootState)?.auth;
            if (auth) {
                const token = auth.token.access_token;
                //const isAdmin = auth.user?.role === "ADMIN";
                // If we have a token set in state, let's assume that we should be passing it.
                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
            }
            return headers;
        },
    }),
    tagTypes: ["User", "Product", "Category", "Auth", "Order", "OrderItem"],
    endpoints: (builder) => {
        return {
            signUp: builder.mutation({
                query: (initialUser) => ({
                    url: "/auth/signup",
                    method: "POST",
                    body: initialUser,
                }),
                invalidatesTags: ["Auth"],
            }),

            addLogin: builder.mutation({
                query: (initialUser) => ({
                    url: "/auth/login",
                    method: "POST",
                    body: initialUser,
                }),
                invalidatesTags: ["Auth"],
            }),
            addLogout: builder.mutation({
                query: () => ({
                    url: "/auth/logout",
                    method: "POST",
                }),
                invalidatesTags: ["Auth"],
            }),

            getProfile: builder.query<UserType, string>({
                query: (token) => {
                    return {
                        url: "/auth/profile",
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                },
                providesTags: ["Auth"],
            }),
            getUsers: builder.query<UserType[], void>({
                query: () => "/users",
                providesTags: ["User"],
            }),
            getUser: builder.query({
                query: (userId) => `/users/${userId}`,
            }),
            addNewUser: builder.mutation({
                query: (initialUser) => ({
                    url: "/users",
                    method: "POST",
                    body: initialUser,
                }),
                invalidatesTags: ["User"],
            }),
            editUser: builder.mutation({
                query: (user) => ({
                    url: `/users/${user.id}`,
                    method: "PUT",
                    body: user,
                }),
            }),
            getProducts: builder.query<ProductType[], void>({
                query: () => "/products",
                providesTags: ["Product"],
            }),
            getProduct: builder.query({
                query: (productId) => `/products/${productId}`,
            }),
            addNewProduct: builder.mutation({
                query: (initialProduct) => ({
                    url: "/products",
                    method: "POST",
                    body: initialProduct,
                }),
                invalidatesTags: ["Product"],
            }),
            updateProduct: builder.mutation({
                query: (product) => ({
                    url: `/products/${product.id}`,
                    method: "PUT",
                    body: product,
                }),
                invalidatesTags: ["Product"],
            }),
            deleteProduct: builder.mutation({
                query: (productId) => ({
                    url: `/products/${productId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Product"],
            }),

            getCategories: builder.query<CategoryType[], void>({
                query: () => "/categories",
                providesTags: ["Category"],
            }),
            getCategory: builder.query({
                query: (categoryId) => `/categories/${categoryId}`,
            }),
            addNewCategory: builder.mutation({
                query: (initialCategory) => ({
                    url: "/categories",
                    method: "POST",
                    body: initialCategory,
                }),
                invalidatesTags: ["Category"],
            }),
            editCategory: builder.mutation({
                query: (category) => ({
                    url: `/categories/${category.id}`,
                    method: "PUT",
                    body: category,
                }),
                invalidatesTags: ["Category"],
            }),
            getOrders: builder.query<OrderType[], void>({
                query: () => "/orders",
                providesTags: ["Order"],
            }),

            getOrder: builder.query({
                query: (orderId) => `/orders/${orderId}`,
            }),

            addNewOrder: builder.mutation({
                query: (initialOrder) => ({
                    url: "/orders",
                    method: "POST",
                    body: initialOrder,
                }),
                invalidatesTags: ["Order"],
            }),
            editOrder: builder.mutation({
                query: (order) => ({
                    url: `/orders/${order.id}`,
                    method: "PUT",
                    body: order,
                }),
                invalidatesTags: ["Order"],
            }),
            deleteOrder: builder.mutation({
                query: (orderId) => ({
                    url: `/orders/${orderId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Order"],
            }),
            getOrderItems: builder.query<OrderItemType[], void>({
                query: () => "/orderItems",
                providesTags: ["OrderItem"],
            }),

            getOrderItem: builder.query({
                query: (orderItemId) => `/orderItems/${orderItemId}`,
            }),
            addNewOrderItem: builder.mutation({
                query: (initialOrderItem) => ({
                    url: "/orderItems",
                    method: "POST",
                    body: initialOrderItem,
                }),
                invalidatesTags: ["OrderItem"],
            }),
            editOrderItem: builder.mutation({
                query: (orderItem) => ({
                    url: `/orderItems/${orderItem.id}`,
                    method: "PUT",
                    body: orderItem,
                }),
                invalidatesTags: ["OrderItem"],
            }),
            deleteOrderItem: builder.mutation({
                query: (orderItemId) => ({
                    url: `/orderItems/${orderItemId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["OrderItem"],
            }),
            refereshToken: builder.mutation({
                query: (body) => ({
                    url: "/auth/refresh-token",
                    method: "POST",
                    body: body,
                }),
            }),
            uploadFile: builder.mutation({
                query: (imageFile) => {
                    const bodyFormData = new FormData();
                    bodyFormData.append("file", imageFile);
                    return {
                        url: "/file/upload",
                        method: "POST",
                        body: bodyFormData,
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                        formData: true,
                    };
                },
            }),
        };
    },
});

export const {
    useSignUpMutation,
    useAddLoginMutation,
    useAddLogoutMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useAddNewUserMutation,
    useEditUserMutation,
    useGetProductsQuery,
    useGetProductQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useAddNewCategoryMutation,
    useEditCategoryMutation,
    useGetProfileQuery,
    useGetOrderQuery,
    useGetOrdersQuery,
    useAddNewOrderMutation,
    useEditOrderMutation,
    useDeleteOrderMutation,
    useGetOrderItemQuery,
    useGetOrderItemsQuery,
    useAddNewOrderItemMutation,
    useEditOrderItemMutation,
    useDeleteOrderItemMutation,
    useRefereshTokenMutation,
    useUploadFileMutation,
} = apiSlice;
