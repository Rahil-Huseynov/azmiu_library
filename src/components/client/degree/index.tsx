import React from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";

interface DegreeProps {
  variant: "books" | "mainbook" | string;
  index?: number;
}

const Degree: React.FC<DegreeProps> = ({ variant, index = 0 }) => {
  const { t } = useTranslation();

  const data =
    variant === "mainbook"
      ? [{ id: "degree-main", label: t("mostPopular") }]
      : [
          { id: "degree1", label: "10k " + t("reads") },
          { id: "degree2", label: "8k " + t("reads") },
          { id: "degree3", label: "5k " + t("reads") },
        ];

  const current = variant === "mainbook" ? data[0] : data[index] || { label: t("reads") };

  return (
    <div className={`degree ${variant}`} id={current.id}>
      {current.label}
    </div>
  );
};

export default Degree;
