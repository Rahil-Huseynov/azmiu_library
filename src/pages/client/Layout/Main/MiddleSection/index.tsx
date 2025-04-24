import React, { useRef, useEffect, useState } from "react";
import "./index.scss";
import RecommendeSection from "../../../../../components/client/recommended";
import MostReadSection from "../../../../../components/client/mostRead";
import CategorySection from "../../../../../components/client/category";
import SearchInputClient from "../../../../../components/client/search";

const MiddleClientPage: React.FC = () => {
  const middleSectionRef = useRef<HTMLDivElement | null>(null); 
  const [visibleCards, setVisibleCards] = useState<number>(0); 

  // Kartların sayını hesablamaq üçün funksiya
  const calculateVisibleCards = () => {
    if (middleSectionRef.current) {
      const sectionWidth = middleSectionRef.current.offsetWidth; 
      const cardWidth = 185; 
      const cards = Math.floor(sectionWidth / cardWidth); 
      setVisibleCards(Math.min(Math.max(cards, 3), 5));
    }
  };

  useEffect(() => {
    calculateVisibleCards();

    const handleResize = () => {
      calculateVisibleCards(); 
    };

    window.addEventListener("resize", handleResize); 
    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);

  return (
    <div className="middleSection" ref={middleSectionRef}>
      <div className="container">
        <div className="middle-block">
          <SearchInputClient />
          <RecommendeSection visibleCards={visibleCards} />
          <MostReadSection visibleCards={visibleCards} />
          <CategorySection visibleCards={visibleCards} />
        </div>
      </div>
    </div>
  );
};

export default MiddleClientPage;
