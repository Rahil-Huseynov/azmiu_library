import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/category/',
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: '/category/',
        method: 'POST',
        body: newBook,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = booksApi;
