import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { ROUTES, ROLES } from "../../../../utils/constant.ts";

// Iconlar
import book_icon from "../../../../assets/icons/icons8-book-50.png";
import member_icon from "../../../../assets/icons/icons8-member-50.png";
import book_active_icon from "../../../../assets/icons/icons8-book-64.png";
import dropdown_item from "../../../../assets/icons/arrow-down-sign-to-navigate.png";
import dropdown_item_active_navbar from "../../../../assets/icons/icons8-expand-arrow-50.png";
import member_active_icon from "../../../../assets/icons/icons8-people-50.png";

import SidebarNavItem from "../SidebarNavItem";

const SidebarWrapper: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, userRole } = useAuth();

  // Admin üçün menyu
  const adminSidebarItems = [
    {
      path: `${ROUTES.DASHBOARD_ADMIN}${ROUTES.DASHBOARD_BOOKS}`,
      label: t('book'),
      icon: book_icon,
      activeIcon: book_active_icon,
    },
    {
      path: `${ROUTES.DASHBOARD_ADMIN}${ROUTES.DASHBOARD_CATEGORIES}`,
      label: t('categories'),
      icon: book_icon,
      activeIcon: book_active_icon,
    },
    {
      path: `${ROUTES.DASHBOARD_ADMIN}${ROUTES.DASHBOARD_MEMBERS}`,
      label: t('members'),
      icon: member_icon,
      activeIcon: member_active_icon,
    }
  ];

  // Client üçün menyu
  const clientSidebarItems = [
    {
      path: `${ROUTES.DASHBOARD_CLIENT}/books`,
      label: t('book'),
      icon: book_icon,
      activeIcon: book_active_icon,
    },
    {
      path: `${ROUTES.DASHBOARD_CLIENT}/members`,
      label: t('members'),
      icon: member_icon,
      activeIcon: member_active_icon,
    }
  ];

  const renderSidebarItems = () => {
    const items =
      userRole === ROLES.ADMIN
        ? adminSidebarItems
        : userRole === ROLES.USER
        ? clientSidebarItems
        : [];

    return items.map((item) => (
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
