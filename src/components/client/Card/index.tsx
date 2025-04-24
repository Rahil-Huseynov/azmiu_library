import React from "react";
import thumb from "../../../assets/images/thumb.jpeg";
import "./index.scss";
import Degree from "../degree";

interface BookCartProps {
  visibleCards: number; 
  additionalClass?: string; 
  showDegree?: boolean; 
}

const BookCart: React.FC<BookCartProps> = ({ visibleCards, additionalClass = "", showDegree = false }) => {
  const books = Array.from({ length: 10 }, () => ({
    name: "Digital Transformation",
    author: "Paul Arvis",
    image: thumb,
  }));

  return (
    <div className="book-carts">
      {books.slice(0, visibleCards).map((book, index) => (
        <div className={`book-cart ${additionalClass}`.trim()} key={index}>
          {showDegree && <Degree variant="books" index={index} />}
          <img src={book.image} alt="recommend-book" />
          <div className="info">
            <h5 className="book-name">{book.name}</h5>
            <p className="author-name">{book.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default BookCart;