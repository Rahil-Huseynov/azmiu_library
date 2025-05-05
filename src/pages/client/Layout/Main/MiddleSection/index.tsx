import React, { useRef, useEffect, useState, useCallback } from "react";
import "./index.scss";
import RecommendeSection from "../../../../../components/client/recommended";
import MostReadSection from "../../../../../components/client/mostRead";
import CategorySection from "../../../../../components/client/category";
import SearchInputClient from "../../../../../components/client/search";

const MiddleClientPage: React.FC = () => {
  const middleSectionRef = useRef<HTMLDivElement | null>(null);
  const [visibleCards, setVisibleCards] = useState<number>(0);


  const calculateVisibleCards = useCallback(() => {
    if (middleSectionRef.current) {
      const sectionWidth = middleSectionRef.current.offsetWidth; 
      const cardWidth = 185; 
      const cards = Math.floor(sectionWidth / cardWidth); 
      setVisibleCards(Math.min(Math.max(cards, 2), 6)); 
    }
  }, []);

  useEffect(() => {
    calculateVisibleCards(); 

    const handleResize = () => {
      setTimeout(() => {
        calculateVisibleCards();
      }, 150); 
    };

    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(() => {
      setTimeout(() => {
        calculateVisibleCards();
      }, 150); 
    });

    observer.observe(document.body, {
      attributes: true, 
      childList: true,
      subtree: true,
    });

    if (middleSectionRef.current) {
      observer.observe(middleSectionRef.current, {
        attributes: true, 
        childList: true, 
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize); 
      observer.disconnect(); 
    };
  }, [calculateVisibleCards]);

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
