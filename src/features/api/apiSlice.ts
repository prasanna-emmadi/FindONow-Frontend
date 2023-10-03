import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from "../../types/productType"
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
            getCarts: builder.query({
                query: () => '/carts',
                //providesTags: ['Cart']
            }),
            getCart: builder.query({
                query: cartId => `/carts/${cartId}`
            }),
            addNewCart: builder.mutation({
                query: initialCart => ({
                    url: '/carts',
                    method: 'POST',
                    body: initialCart
                }),
                //invalidatesTags: ['Cart']
            }),
            editCart: builder.mutation({
                query: cart => ({
                    url: `/users/${cart.id}`,
                    method: 'PUT',
                    body: cart
                }
                )
            }),
        }
    }
})

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useAddNewUserMutation,
    useEditUserMutation,
    useGetProductsQuery,
    useGetProductQuery,
    useAddNewProductMutation,
    useEditProductMutation,
    useGetCartsQuery,
    useGetCartQuery,
    useAddNewCartMutation,
    useEditCartMutation,
} = apiSlice

