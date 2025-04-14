import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7777/v1/' }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books/sorted',
      providesTags: ['Books']
    }),
    addBook: builder.mutation({
      query: (formData) => ({
        url: '/bookInventory',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Books']
    }),
    updateBook: builder.mutation({
      query: ({formData }) => ({
        url: `/books`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Books']
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books']
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation
} = booksApi;
