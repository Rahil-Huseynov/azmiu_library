import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";

interface SidebarNavItemProps {
  path: string;
  label: string;
  icon: string;
  activeIcon: string;
  dropdownIcon: string;
  activeDropdownIcon: string;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  path,
  label,
  icon,
  activeIcon,
  dropdownIcon,
  activeDropdownIcon,
}) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(path);

  return (
    <Link to={path} className="Admin_Header_Link">
      <div
        className={`Admin_Header_Container_SidebarNavItem_Items ${
          isActive ? "active" : ""
        }`}
      >
        <div className="Admin_Header_Container_SidebarNavItem_Items_Book">
          <img
            className="Admin_Header_Container_SidebarNavItem_Items_Book_ICON"
            src={isActive ? activeIcon : icon}
            alt={`${label.toLowerCase()}_icon`}
          />
          <p>{label}</p>
        </div>
        <img
          className="Admin_Header_Container_SidebarNavItem_Items_ICON"
          src={isActive ? activeDropdownIcon : dropdownIcon}
          alt="dropdown_item"
        />
      </div>
    </Link>
  );
};

export default SidebarNavItem;
