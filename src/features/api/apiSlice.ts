import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Category, Product } from "../../types/productType"
import { User } from '../../types/userType'

// actions
// login
// logout

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/' }),
    //tagTypes: ['User', 'Product', 'Cart'],
    endpoints: (builder) => {
        return {
            addLogin: builder.mutation({
                query: initialUser => ({
                    url: '/auth/login',
                    method: 'POST',
                    body: initialUser
                }),
                //invalidatesTags: ['User']
            }),
            getUsers: builder.query<User[], void>({
                query: () => '/users',
                //providesTags: ['User']
            }),
            getUser: builder.query({
                query: userId => `/users/${userId}`
            }),
            addNewUser: builder.mutation({
                query: initialUser => ({
                    url: '/users',
                    method: 'POST',
                    body: initialUser
                }),
                //invalidatesTags: ['User']
            }),
            editUser: builder.mutation({
                query: user => ({
                    url: `/users/${user.id}`,
                    method: 'PUT',
                    body: user
                })
            }),
            getProducts: builder.query<Product[], void>({
                query: () => '/products',
                //providesTags: ['Product']
            }),
            getProduct: builder.query({
                query: productId => `/products/${productId}`
            }),
            addNewProduct: builder.mutation({
                query: initialProduct => ({
                    url: '/products',
                    method: 'POST',
                    body: initialProduct
                }),
                //invalidatesTags: ['Product']
            }),
            editProduct: builder.mutation({
                query: product => ({
                    url: `/products/${product.id}`,
                    method: 'PUT',
                    body: product
                }
                )
            }),
            getCategories: builder.query<Category[], void>({
                query: () => '/categories',
                //providesTags: ['Category']
            }),
            getCategory: builder.query({
                query: categoryId => `/categories/${categoryId}`
            }),
            addNewCategory: builder.mutation({
                query: initialCategory => ({
                    url: '/categories',
                    method: 'POST',
                    body: initialCategory
                }),
                //invalidatesTags: ['Category']
            }),
            editCategory: builder.mutation({
                query: category => ({
                    url: `/users/${category.id}`,
                    method: 'PUT',
                    body: category
                }
                )
            }),
        }
    }
})

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
} = apiSlice

