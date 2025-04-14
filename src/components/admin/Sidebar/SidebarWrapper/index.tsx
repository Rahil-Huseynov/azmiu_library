import React from "react";
import { useAuth } from "../../../../hooks/useAuth";
import SidebarNavItem from "../SidebarNavItem";

import dropdown_item from "../../../../assets/icons/arrow-down-sign-to-navigate.png";
import dropdown_item_active_navbar from "../../../../assets/icons/icons8-expand-arrow-50.png";

// Sidebar item tipi
export interface SidebarItem {
  path: string;
  label: string;
  icon: string;
  activeIcon: string;
}

interface SidebarWrapperProps {
  sidebarItems: SidebarItem[];
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ sidebarItems }) => {
  const { isAuthenticated } = useAuth();

  const renderSidebarItems = () => {
    return sidebarItems.map((item) => (
      <SidebarNavItem
        key={item.path}
        path={item.path}
        label={item.label}
        icon={item.icon}
        activeIcon={item.activeIcon}
        dropdownIcon={dropdown_item}
        activeDropdownIcon={dropdown_item_active_navbar}
      />
    ));
  };

  return (
    <div className="Admin_Header_Container_SidebarNavItem">
      {isAuthenticated && renderSidebarItems()}
    </div>
  );
};

export default SidebarWrapper;
