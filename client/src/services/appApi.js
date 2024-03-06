import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// define a service user a base url

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://pwa-chat-api.onrender.com"
    }),
    endpoints: (builder) => ({
        // user create
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,

            }),
        }),

        // login
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user,
            }),
        }),

        // logout
        logoutUser: builder.mutation({
            query: (payload) => ({
                url: '/logout',
                method: 'DELETE',
                body: payload,
            }),
        }),
    })
})

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi

export default appApi;