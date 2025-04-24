import React, { useState } from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SearchInputClient: React.FC = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClear = () => {
    setSearchText("");
  };
  return (
    <div className="search-container">
      <SearchRoundedIcon className="search-icon" />
      <input type="text" 
      value={searchText}
      onChange={handleChange}
       placeholder={t("searchBook")} />
       {searchText && (
        <CloseRoundedIcon className="x-icon" onClick={handleClear} />
      )}
    </div>
  );
};

export default SearchInputClient;
