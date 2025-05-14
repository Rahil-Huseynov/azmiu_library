import React from "react";
import "./index.scss";
import SectionTitle from "../sectionTitle";
import { ROUTES } from "../../../../src/utils/constant";
import { useTranslation } from "react-i18next";
import MainBook from "../mainBook";
import BookCart from "../Card";


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

export default MostReadSection;