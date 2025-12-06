import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../features/authSlice';

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
            transformResponse: (response) => {
                // Parser: Normalize response message
                return {
                    success: true,
                    message: response?.message || 'Logout successful',
                };
            },
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
            transformResponse: (response) => {
                // Handle paginated response structure
                if (response && response.products && Array.isArray(response.products)) {
                    return {
                        products: response.products.map((product) => ({
                            ...product,
                            price: parseFloat(product.price) || 0,
                            stockQuantity: parseInt(product.stockQuantity) || 0,
                            createdAt: product.createdAt ? new Date(product.createdAt) : null,
                            updatedAt: product.updatedAt ? new Date(product.updatedAt) : null,
                        })),
                        total: response.total || 0,
                        page: response.page || 1,
                        pageSize: response.pageSize || 5,
                    };
                }
                // Fallback for non-paginated response (backward compatibility)
                if (Array.isArray(response)) {
                    return {
                        products: response.map((product) => ({
                            ...product,
                            price: parseFloat(product.price) || 0,
                            stockQuantity: parseInt(product.stockQuantity) || 0,
                            createdAt: product.createdAt ? new Date(product.createdAt) : null,
                            updatedAt: product.updatedAt ? new Date(product.updatedAt) : null,
                        })),
                        total: response.length,
                        page: 1,
                        pageSize: response.length,
                    };
                }
                return { products: [], total: 0, page: 1, pageSize: 5 };
            },
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
            transformResponse: (response) => {
                // Parse and normalize product data
                if (Array.isArray(response)) {
                    return response.map((product) => ({
                        ...product,
                        price: parseFloat(product.price) || 0,
                        stockQuantity: parseInt(product.stockQuantity) || 0,
                        createdAt: product.createdAt ? new Date(product.createdAt) : null,
                        updatedAt: product.updatedAt ? new Date(product.updatedAt) : null,
                    }));
                }
                return response;
            },
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
            transformResponse: (response) => {
                // Parse and normalize product data
                if (response) {
                    return {
                        ...response,
                        price: parseFloat(response.price) || 0,
                        stockQuantity: parseInt(response.stockQuantity) || 0,
                        createdAt: response.createdAt ? new Date(response.createdAt) : null,
                        updatedAt: response.updatedAt ? new Date(response.updatedAt) : null,
                    };
                }
                return response;
            },
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }],
            transformResponse: (response) => {
                // Parse and normalize created product data
                if (response) {
                    return {
                        ...response,
                        price: parseFloat(response.price) || 0,
                        stockQuantity: parseInt(response.stockQuantity) || 0,
                        createdAt: response.createdAt ? new Date(response.createdAt) : null,
                        updatedAt: response.updatedAt ? new Date(response.updatedAt) : null,
                    };
                }
                return response;
            },
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
            transformResponse: (response) => {
                // Parse and normalize updated product data
                if (response) {
                    return {
                        ...response,
                        price: parseFloat(response.price) || 0,
                        stockQuantity: parseInt(response.stockQuantity) || 0,
                        createdAt: response.createdAt ? new Date(response.createdAt) : null,
                        updatedAt: response.updatedAt ? new Date(response.updatedAt) : null,
                    };
                }
                return response;
            },
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
        }),
        getCategoryTree: builder.query({
            query: () => '/categories/tree',
            providesTags: ['Categories'],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: '/categories',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Categories'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/categories/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Categories'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
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
    useGetCategoryTreeQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = api;
