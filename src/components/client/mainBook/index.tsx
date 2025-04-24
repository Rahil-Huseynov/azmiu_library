import React from "react";
import "./index.scss";
import CategoryList from "../categoryList";
import thumb from "../../../assets/images/thumb.jpeg";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useTranslation } from "react-i18next";
import Degree from "../degree";


const MainBook: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="main-book">
    <div className="img">
      <Degree variant="mainbook" />
      <img src={thumb} alt="recommend-book" />
    </div>
    <div className="info">
      <div className="book-details">
        <h5 className="book-name">Digital Transformation</h5>
        <p className="author-name">Paul arvis</p>
        <div className="rating">
          <StarIcon className="star-icon" />
          <StarIcon className="star-icon" />
          <StarIcon className="star-icon" />
          <StarIcon className="star-icon" />
          <StarBorderIcon className="star-border-icon" />
          <span className="score">4.0</span>
          <span className="reviews">(128 {t("reviews")})</span>
        </div>
        <p className="text">
          The most frequently accessed resource in our library. This
          comprehensive guide to data science covers statistical
          methods, programming, visualization techniques, and
          practical applications that have made it essential reading
          for students across disciplines.
        </p>
        <CategoryList  categories={[ "Technology", "Medicine", "Engineering"]}
      variant="mostReadBook"/>
      </div>
      <div className="button-container">
        <button className="read">{t("readNow")}</button>
        <button className="add-library">{t("addToLibrary")}</button>
      </div>
    </div>
  </div>
  );
};

export default MainBook;
