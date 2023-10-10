import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryType, ProductType } from "../../types/productType";
import { UserType } from "../../types/userType";
import { RootState } from "../../app/configureStore";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.escuelajs.co/api/v1/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.access_token;
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["User", "Product", "Category"],
    endpoints: (builder) => {
        return {
            addLogin: builder.mutation({
                query: (initialUser) => ({
                    url: "/auth/login",
                    method: "POST",
                    body: initialUser,
                }),
                invalidatesTags: ["User"],
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
            editProduct: builder.mutation({
                query: (product) => ({
                    url: `/products/${product.id}`,
                    method: "PUT",
                    body: product,
                }),
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
                    url: `/users/${category.id}`,
                    method: "PUT",
                    body: category,
                }),
            }),
            getProfile: builder.query({
                query: () => ({
                    url: "/auth/login",
                    method: "GET",
                }),
            }),
            refereshToken: builder.mutation({
                query: (body) => ({
                    url: "/auth/refresh-token",
                    method: "POST",
                    body: body,
                }),
            }),
            uploadFile: builder.mutation({
                query: (imageBody) => ({
                    url: "/file/upload",
                    method: "POST",
                    body: imageBody,
                    headers: {
                        "content-type": "image/png",
                    },
                }),
            }),
        };
    },
});

export const {
    useAddLoginMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useAddNewUserMutation,
    useEditUserMutation,
    useGetProductsQuery,
    useGetProductQuery,
    useAddNewProductMutation,
    useEditProductMutation,
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useAddNewCategoryMutation,
    useEditCategoryMutation,
    useGetProfileQuery,
    useRefereshTokenMutation,
    useUploadFileMutation
} = apiSlice;
