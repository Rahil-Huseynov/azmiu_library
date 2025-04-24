import React, { useState, useEffect } from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";

interface CategoryListProps {
  categories: string[];
  activeCategory?: string;
  className?: string;
  defaultActiveCategory?: string;
  variant?: "categories" | "mostReadBook";
  onCategoryClick?: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  defaultActiveCategory = "",
  className = "",
  variant = "",
  onCategoryClick,
}) => {
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState(defaultActiveCategory || t("all"));

  useEffect(() => {
    setActiveCategory(defaultActiveCategory || t("all"));
  }, [defaultActiveCategory, t]);


  const handleClick = (category: string) => {
    setActiveCategory(category);
    onCategoryClick?.(category);
  };

  return (
    <div className={`category-list ${className} ${variant}`}>
      {categories.map((category) => (
        <span
          key={category}
          onClick={variant === "categories" ? () => handleClick(category) : undefined}
          className={category === activeCategory ? "active" : ""}
        >
          {category}
        </span>
      ))}
    </div>
  );
};

export default CategoryList;
