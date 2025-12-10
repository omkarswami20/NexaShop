import { api } from './baseApi';

export const customerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => '/customer/profile',
            providesTags: ['Profile'],
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/customer/profile',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Profile'],
        }),
        getAddresses: builder.query({
            query: () => '/customer/addresses',
            providesTags: ['Address'],
        }),
        addAddress: builder.mutation({
            query: (data) => ({
                url: '/customer/addresses',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Address'],
        }),
        updateAddress: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/customer/addresses/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Address'],
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/customer/addresses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Address'],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetAddressesQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
} = customerApi;
