import React from "react";
import { ROUTES } from "../../../../utils/constant.ts";
import book_icon from "../../../../assets/icons/icons8-book-50.png";
import member_icon from "../../../../assets/icons/icons8-member-50.png";
import book_active_icon from "../../../../assets/icons/icons8-book-64.png";
import dropdown_item from "../../../../assets/icons/arrow-down-sign-to-navigate.png";
import dropdown_item_active_navbar from "../../../../assets/icons/icons8-expand-arrow-50.png";
import member_active_icon from "../../../../assets/icons/icons8-people-50.png";
import SidebarNavItem from "../SidebarNavItem";
import { useTranslation } from "react-i18next";
     




const SidebarWrapper: React.FC = () => {

const { t } = useTranslation();
const sidebarItems = [
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
        path: "/admin/members",
        label:  t('members'),
        icon: member_icon,
        activeIcon: member_active_icon,
    }
];

    return (
        <div className="Admin_Header_Container_SidebarNavItem">
            {sidebarItems.map((item) => (
                <SidebarNavItem
                    key={item.path}
                    path={item.path}
                    label={item.label}
                    icon={item.icon}
                    activeIcon={item.activeIcon}
                    dropdownIcon={dropdown_item}
                    activeDropdownIcon={dropdown_item_active_navbar}
                />
            ))}
        </div>
    );
};

export default SidebarWrapper;
