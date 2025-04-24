import {} from "react";
import "./index.scss";
import BookCart from "../Card";
import SectionTitle from "../sectionTitle";
import { ROUTES } from "../../../../src/utils/constant";
import { useTranslation } from "react-i18next";
import CategoryList from "../categoryList";
interface CategorySectionProps {
  visibleCards: number; 
}
const CategorySection: React.FC<CategorySectionProps>= ({visibleCards}) => {
  const { t } = useTranslation();

  const CLientMainItems = [
    {
      path: `${ROUTES.DASHBOARD_CLIENT}${ROUTES.DASHBOARD_BOOKS}`,
      label: t("categories"),
    },
  ];

  return (
    <div className="categories-section">
      <SectionTitle items={CLientMainItems} showSort={true} />
      <CategoryList
        categories={[t("all"), "Technology", "Medicine", "Engineering"]}
        activeCategory={"all"}
        variant="categories"
      />
      <BookCart visibleCards={visibleCards} />
    </div>
  );
};

export default CategorySection;
