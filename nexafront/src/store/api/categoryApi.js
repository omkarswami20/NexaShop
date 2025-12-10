import { api } from './baseApi';
import { transformCategoryListResponse, transformCategoryResponse } from '../parsers/category.parser';

export const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
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
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
