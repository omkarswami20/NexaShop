import { api } from './baseApi';
import { transformLogoutResponse } from '../parsers/auth.parser';

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        registerSeller: builder.mutation({
            query: (credentials) => ({
                url: '/auth/seller/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        loginSeller: builder.mutation({
            query: (credentials) => ({
                url: '/auth/seller/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data,
            }),
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-email',
                method: 'POST',
                body: data,
            }),
        }),
        loginAdmin: builder.mutation({
            query: (credentials) => ({
                url: '/auth/admin/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: transformLogoutResponse,
        }),
    }),
});

export const {
    useRegisterSellerMutation,
    useLoginSellerMutation,
    useVerifyOtpMutation,
    useVerifyEmailMutation,
    useLoginAdminMutation,
    useLogoutUserMutation,
} = authApi;
