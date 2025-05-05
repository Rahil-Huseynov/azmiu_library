import React from "react";
import "./index.scss";
import thumb from "../../../../assets/images/thumb.jpeg";
import dropdown from "../../../../assets/icons/down-arrow.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useClientSidebar } from "../../../../hooks/useClientSidebar";
import { useSidebar } from "../../../../hooks/usedSidebar";
import dropdown_open_navbar from "../../../../assets/icons/icons8-expand-arrow-50.png";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useTranslation } from "react-i18next";

const ClientRightSide = () => {
  const { isClientSidebarOpen, toggleClientSidebar } = useClientSidebar();

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
          <KeyboardDoubleArrowRightIcon className="arrow-icon"  onClick={toggleClientSidebar}/>

        </div>
        <div className="featured-book-image">
          <img src={thumb} alt="" />
        </div>
        <div className="featured-book-title-info">
          <h2 className="featured-book-title">Digital Transformation</h2>
          <p className="featured-book-subtitle">Paul Arvis</p>
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
            <span className="featured-stat-number">323</span>
            <span className="featured-stat-label">Pages</span>
          </div>
          <div className="featured-stat-item">
            <span className="featured-stat-number">542</span>
            <span className="featured-stat-label">Reads</span>
          </div>
          <div className="featured-stat-item">
            <span className="featured-stat-number">110</span>
            <span className="featured-stat-label">Shares</span>
          </div>
        </div>
        <p className="featured-book-description">
          Discover the fundamentals of digital transformation and how
          organizations are using technology to reimagine their business models.
          This comprehensive guide explores the key drivers of change and
          provides a roadmap for successful digital initiatives.
        </p>
        <button className="featured-read-now-btn">
          Read Now
          <ChevronRightIcon className="right-arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default ClientRightSide;
