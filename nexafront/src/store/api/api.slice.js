import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../slices/auth.slice';
import { transformLogoutResponse } from '../parsers/auth.parser';
import { transformPaginatedProductResponse, transformProductListResponse, transformProductResponse } from '../parsers/product.parser';
import { transformCategoryListResponse, transformCategoryResponse } from '../parsers/category.parser';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshToken = api.getState().auth.refreshToken;
        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: '/auth/refresh-token',
                    method: 'POST',
                    body: { refreshToken },
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                const user = api.getState().auth.user;
                const role = api.getState().auth.role;

                api.dispatch(setCredentials({
                    user,
                    token: refreshResult.data.accessToken,
                    refreshToken: refreshResult.data.refreshToken,
                    role
                }));

                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
            }
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Seller', 'Admin', 'Product', 'Categories'],
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
        logoutUser: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            transformResponse: transformLogoutResponse,
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

        // Product Endpoints
        getSellerProducts: builder.query({
            query: ({ status, category, search, limit = 5, offset = 0 } = {}) => {
                const params = new URLSearchParams();
                if (status) params.append('status', status);
                if (category) params.append('category', category);
                if (search) params.append('search', search);
                params.append('limit', limit.toString());
                params.append('offset', offset.toString());
                return `/products/seller?${params.toString()}`;
            },
            providesTags: (result) =>
                result && result.products
                    ? [
                        ...result.products.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Product', id: 'LIST' },
                    ]
                    : [{ type: 'Product', id: 'LIST' }],
            transformResponse: transformPaginatedProductResponse,
        }),
        getSellerProductList: builder.query({
            query: () => '/products/seller/list',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Product', id: 'LIST' },
                    ]
                    : [{ type: 'Product', id: 'LIST' }],
        }),
        getAllProducts: builder.query({
            query: () => '/products',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Product', id: 'ALL' },
                    ]
                    : [{ type: 'Product', id: 'ALL' }],
            transformResponse: transformProductListResponse,
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
            transformResponse: transformProductResponse,
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }],
            transformResponse: transformProductResponse,
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...product }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Product', id },
                { type: 'Product', id: 'LIST' },
            ],
            transformResponse: transformProductResponse,
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Product', id },
                { type: 'Product', id: 'LIST' },
            ],
        }),
        updateProductStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/products/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Product', id },
                { type: 'Product', id: 'LIST' },
            ],
        }),
        updateProductStock: builder.mutation({
            query: ({ id, stockQuantity }) => ({
                url: `/products/${id}/stock`,
                method: 'PATCH',
                body: { stockQuantity },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Product', id },
                { type: 'Product', id: 'LIST' },
            ],
        }),
        uploadProductImage: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: '/upload/product-image',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        deleteProductImage: builder.mutation({
            query: (url) => ({
                url: '/upload/product-image',
                method: 'DELETE',
                params: { url },
            }),
        }),



        // Category Endpoints
        getCategories: builder.query({
            query: () => '/categories',
            providesTags: ['Categories'],
            transformResponse: transformCategoryListResponse,
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: '/categories',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Categories'],
            transformResponse: transformCategoryResponse,
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/categories/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Categories'],
            transformResponse: transformCategoryResponse,
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
                params: { id },
            }),
            invalidatesTags: ['Categories'],
        }),
    }),
});

export const {
    useRegisterSellerMutation,
    useLoginSellerMutation,
    useLoginAdminMutation,
    useLogoutUserMutation,
    useGetPendingSellersQuery,
    useGetAllSellersQuery,
    useUpdateSellerStatusMutation,
    useGetSellerProductsQuery,
    useGetSellerProductListQuery,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUpdateProductStatusMutation,
    useUpdateProductStockMutation,
    useUploadProductImageMutation,
    useDeleteProductImageMutation,
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = api;
