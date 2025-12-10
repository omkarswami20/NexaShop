import { api } from './baseApi';
import { transformPaginatedProductResponse, transformProductListResponse, transformProductResponse } from '../parsers/product.parser';

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});

export const {
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
} = productApi;
