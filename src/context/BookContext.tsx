import React, { createContext, useContext, useState } from "react";

interface Book {
  title: string;
  author: string;
  imagePath: string;
  description: string;
  pages: number;
  reads: number;
  shares: number;
}

interface BookContextProps {
  selectedBook: Book | null;
  setSelectedBook: (book: Book) => void;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};