import React from "react";
import "./index.scss";
import Degree from "../degree";
import defa from "../../../assets/svg/default.svg";
import { useGetBooksQuery } from "../../../services/BookApi";
import { useBookContext } from "../../../context/BookContext";
import { useClientSidebar } from "../../../hooks/useClientSidebar";

interface BookCartProps {
  visibleCards: number;
  additionalClass?: string;
  showDegree?: boolean;
}

const BookCart: React.FC<BookCartProps> = ({
  visibleCards,
  additionalClass = "",
  showDegree = false,
}) => {
  const { data: booksData } = useGetBooksQuery({});
  const books = booksData?.list || [];
  const { setSelectedBook } = useBookContext(); 
  const { isClientSidebarOpen, toggleClientSidebar } = useClientSidebar(); 
  const handleBookClick = (book: any) => {
    setSelectedBook(book); 
    if (!isClientSidebarOpen) {
      toggleClientSidebar(); 
    }
  };



  return (
    <div className="book-carts">
      {books.slice(0, visibleCards).map((book: any, index: number) => (
        <div
          className={`book-cart ${additionalClass}`.trim()}
          key={index}
          onClick={() => handleBookClick(book)} 
        >
          {showDegree && <Degree variant="books" index={index} />}
          <img
            src={book.imagePath ? book.imagePath : defa}
            alt={book.title || "Book Image"}
          />
          <div className="info">
            <h5 className="book-name">{book.title}</h5>
            <p className="author-name">{book.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCart;