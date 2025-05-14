import React from "react";
import "./index.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import defa from "../../../../assets/svg/default.svg";
import { useClientSidebar } from "../../../../hooks/useClientSidebar";
import dropdown_open_navbar from "../../../../assets/icons/icons8-expand-arrow-50.png";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useTranslation } from "react-i18next";
import { useBookContext } from "../../../../context/BookContext"; // Context-dən istifadə

const ClientRightSide: React.FC = () => {
  const { isClientSidebarOpen, toggleClientSidebar } = useClientSidebar();
  const { t } = useTranslation();
  const { selectedBook } = useBookContext(); // Seçilmiş kitabı context-dən alın

  return (
    <div className="Client_Footer">
      <div
        className={`Client_Footer_Container_Active_Button_Container ${
          isClientSidebarOpen ? "" : "show"
        }`}
        onClick={toggleClientSidebar}
      >
        <img
          className="Client_Footer_Container_Active_Button_Container_Item"
          src={dropdown_open_navbar}
          alt="dropdown_icon"
        />
      </div>

      <div
        className={`Client_Footer_Container ${
          isClientSidebarOpen ? "scroll-right" : "scroll-right-1"
        }`}
      >
        <div className="close-arrow-icon">
          <KeyboardDoubleArrowRightIcon
            className="arrow-icon"
            onClick={toggleClientSidebar}
          />
        </div>

        {/* Seçilmiş kitab yoxdursa, mesaj göstərin */}
        {!selectedBook ? (
          <p className="no-book-selected">{t("noBookSelected")}</p>
        ) : (
          <>
            <div className="featured-book-image">
              <img
                src={selectedBook.imagePath || defa}
                alt={selectedBook.title || "Book Image"}
              />
            </div>
            <div className="featured-book-title-info">
              <h2 className="featured-book-title">{selectedBook.title}</h2>
              <p className="featured-book-subtitle">{selectedBook.author}</p>
            </div>
            <div className="featured-book-rating">
              <div className="featured-stars">
                <StarIcon className="star-icon" />
                <StarIcon className="star-icon" />
                <StarIcon className="star-icon" />
                <StarIcon className="star-icon" />
                <StarBorderIcon className="star-border-icon" />
              </div>
              <span className="featured-rating-value">4.8</span>
            </div>
            <div className="featured-book-stats">
              <div className="featured-stat-item">
                <span className="featured-stat-number">
                  {selectedBook.pages || 0}
                </span>
                <span className="featured-stat-label">{t("pages")}</span>
              </div>
              <div className="featured-stat-item">
                <span className="featured-stat-number">
                  {selectedBook.reads || 0}
                </span>
                <span className="featured-stat-label">{t("reads")}</span>
              </div>
              <div className="featured-stat-item">
                <span className="featured-stat-number">
                  {selectedBook.shares || 0}
                </span>
                <span className="featured-stat-label">{t("shares")}</span>
              </div>
            </div>
            <p className="featured-book-description">
              {selectedBook.description ||
                "No description available for this book."}
            </p>
            <button className="featured-read-now-btn">
              {t("readNow")}
              <ChevronRightIcon className="right-arrow-icon" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientRightSide;