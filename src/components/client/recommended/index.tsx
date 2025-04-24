import React from "react";
import "./index.scss";
import BookCart from "../Card"; 
import SectionTitle from "../sectionTitle";
import { ROUTES } from "../../../../src/utils/constant";
import { useTranslation } from "react-i18next";

interface RecommendeSectionProps {
  visibleCards: number; 
}

const RecommendeSection: React.FC<RecommendeSectionProps> = ({ visibleCards }) => {
  const { t } = useTranslation();

 
  const CLientMainItems = [
    {
      path: `${ROUTES.DASHBOARD_CLIENT}${ROUTES.DASHBOARD_BOOKS}`,
      label: t("recommended"),
    },
  ];

  return (
    <div className="recommended">
      <SectionTitle items={CLientMainItems} showSort={false} />
      <BookCart visibleCards={visibleCards} />
    </div>
  );
};

export default RecommendeSection;
