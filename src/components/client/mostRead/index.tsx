import React from "react";
import thumb from "../../../assets/images/thumb.jpeg";
import "./index.scss";
import SectionTitle from "../sectionTitle";
import { ROUTES } from "../../../../src/utils/constant";
import { useTranslation } from "react-i18next";
import CategoryList from "../categoryList";
import MainBook from "../mainBook";
import Degree from "../degree";

interface MostReadSectionProps {
  visibleCards: number; 
}
const MostReadSection: React.FC<MostReadSectionProps> = ({ visibleCards }) => {
  const { t } = useTranslation();


  const CLientMainItems = [
    {
      path: `${ROUTES.DASHBOARD_CLIENT}${ROUTES.DASHBOARD_BOOKS}`,
      label: t("mostRead"),
    },
  ];

  return (
    <div className="mostRead">
      <SectionTitle items={CLientMainItems} showSort={false} />
      <MainBook />
      <BookCart visibleCards={visibleCards} additionalClass="most-read-book" showDegree={true} />
    </div>
  );
};

interface BookCartProps {
  visibleCards: number; 
  additionalClass?: string; 
  showDegree?: boolean; 
}

const BookCart: React.FC<BookCartProps> = ({ visibleCards, additionalClass = "", showDegree = false }) => {
  const books = Array(10).fill({
    name: "Digital Transformation",
    author: "Paul Arvis",
    image: thumb,
  });

  return (
    <div className="book-carts">
      {books.slice(0, visibleCards).map((book, index) => (
        <div
          className={`book-cart ${additionalClass}`.trim()} 
          key={index}
        >
          {showDegree && <Degree variant="books" />} 
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

export default MostReadSection;
