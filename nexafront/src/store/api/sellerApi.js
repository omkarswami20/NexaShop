import { api } from './baseApi';

export const sellerApi = api.injectEndpoints({
    endpoints: (builder) => ({
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
                body: { sellerId, status: newStatus, rejectionReason },
            }),
            invalidatesTags: ['Seller'],
        }),
    }),
});

export const {
    useGetPendingSellersQuery,
    useGetAllSellersQuery,
    useUpdateSellerStatusMutation,
} = sellerApi;
