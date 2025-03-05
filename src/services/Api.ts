import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    bookCode: string;
    language: string;
    description: string;
    status: string;
    pages: number;
    filePath: string;
    publicationYear: number;
    createdAt: string;
}

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7777/v1/' }),
    endpoints: (builder) => ({
        getBooks: builder.query<{ list: Book[][]; totalElements: number }, void>({
            query: () => 'books/sorted',
        }),
        addBook: builder.mutation<Book, Partial<Book>>({
            query: (newBook) => ({
                url: 'bookInventory',
                method: 'POST',
                body: newBook,
            }),
        }),
    }),
});

export const { useGetBooksQuery, useAddBookMutation } = booksApi;
