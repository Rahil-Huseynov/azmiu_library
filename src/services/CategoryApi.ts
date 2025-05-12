import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../pages/admin/Pages/Categories";
import { PaginatedResponse } from "../types/types";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7777/v1/" }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<PaginatedResponse<Category>, void>({
      query: () => "categories",
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation<Category, Partial<Category>>({
      query: (newCategory) => ({
        url: "categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category']
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation } = categoryApi;
