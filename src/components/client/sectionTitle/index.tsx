import React from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


interface SectionTitleProps {
  items: Array<{
    path: string;
    label: string;

  }>;
  showSort?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  items,
  showSort = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="section-title-wrapper">
      {items.map((item, index) => (
        <div key={index} className="section-title">
          <h5>{item.label}</h5>
          {showSort ? (
            <div className="sort-container">
              <label htmlFor="sort" className="sort-label">
                {t("sort")}:
              </label>
              <div className="custom-select-wrapper">
                <select id="sort" className="sort-select">
                  <option value="popular">{t("popular")}</option>
                  <option value="a-z">{t("az")}</option>
                  <option value="z-a">{t("za")}</option>
                  <option value="newest">{t("newest")}</option>
                  <option value="oldest">{t("oldest")}</option>
                </select>
                <span className="arrow">&#9662;</span>
              </div>
            </div>
          ) : (
            <p>
              {t("seeAll")}
              <ChevronRightIcon className="right-arrow-icon" />
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionTitle;
