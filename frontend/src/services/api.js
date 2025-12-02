import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Seller', 'Admin'],
    endpoints: (builder) => ({
        // Seller Endpoints
        registerSeller: builder.mutation({
            query: (credentials) => ({
                url: '/sellers/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        loginSeller: builder.mutation({
            query: (credentials) => ({
                url: '/sellers/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Admin Endpoints
        loginAdmin: builder.mutation({
            query: (credentials) => ({
                url: '/admin/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getPendingSellers: builder.query({
            query: () => '/admin/pending',
            providesTags: ['Seller'],
        }),
        getAllSellers: builder.query({
            query: () => '/admin/sellers',
            providesTags: ['Seller'],
        }),
        updateSellerStatus: builder.mutation({
            query: ({ sellerId, newStatus, rejectionReason }) => ({
                url: '/admin/update-status',
                method: 'PUT',
                body: { sellerId, newStatus, rejectionReason },
            }),
            invalidatesTags: ['Seller'],
        }),
    }),
});

export const {
    useRegisterSellerMutation,
    useLoginSellerMutation,
    useLoginAdminMutation,
    useGetPendingSellersQuery,
    useGetAllSellersQuery,
    useUpdateSellerStatusMutation,
} = api;
