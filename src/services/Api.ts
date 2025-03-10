import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7777/v1/' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books/sorted',
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: '/bookInventory',
        method: 'POST',
        body: newBook,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = booksApi;