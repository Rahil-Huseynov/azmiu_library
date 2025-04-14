import React, { useState } from "react";
import "./index.scss";
import azmiu from "../../../assets/icons/azmiu.webp";
import dropdown from "../../../assets/icons/down-arrow.png";
import dropdown_open_navbar from "../../../assets/icons/icons8-expand-arrow-50.png";
import dropdown_item from "../../../assets/icons/arrow-down-sign-to-navigate.png";
import logout_icon from "../../../assets/icons/icons8-logout-50.png";
import logout_icon_white from "../../../assets/icons/icons8-logout-50-white.png";
import { useSidebar } from "../../../hooks/usedSidebar.ts";
import SidebarWrapper from "../../admin/Sidebar/SidebarWrapper/index.tsx";
import { ROUTES } from "../../../utils/constant.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.ts";
import { useTranslation } from "react-i18next";
import Language from "../Language/index.tsx";
import { SidebarItem } from "../../admin/Sidebar/SidebarWrapper/index.tsx";

interface HeaderAccountProps {
    sidebarItems: SidebarItem[];
}


const HeaderAccount: React.FC<HeaderAccountProps> = ({ sidebarItems }) => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Logout hover üçün state
    const [isHovered, setIsHovered] = useState(false);

    // Logout funksiyası
    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN_ADMIN, { replace: true });
    };

    return (
        <>
            {/* Sidebar Toggle Button */}
            <div
                className={`Admin_Header_Container_Active_Button_Container ${isSidebarOpen ? "" : "show"}`}
                onClick={toggleSidebar}
            >
                <img
                    className="Admin_Header_Container_Active_Button_Container_Item"
                    src={dropdown_open_navbar}
                    alt="dropdown_icon"
                />
            </div>

            {/* Sidebar */}
            <div className={`Admin_Header_Container ${isSidebarOpen ? "scroll-left" : "scroll-left-1"}`}>
                {/* Header Logo */}
                <div className="Admin_Header_Container_Header">
                    <img className="Admin_Header_Container_Header_AZMIU_Logo" src={azmiu} alt="azmiu" />
                    <p className="Admin_Header_Container_Header_Name">{t('universityName')}</p>
                    <img
                        className="Admin_Header_Container_Header_Dropdown"
                        src={dropdown}
                        alt="dropdown"
                        onClick={toggleSidebar}
                    />
                </div>

                <Language />

                {/* Navigation Items */}
                <SidebarWrapper sidebarItems={sidebarItems} />

                {/* Logout */}
                <div
                    className="Admin_Header_Container_Logout_Container"
                    onClick={handleLogout}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="Admin_Header_Container_Logout_Container_Logout">
                        <img
                            className="Admin_Header_Container_Logout_Container_Logout_ICON"
                            src={isHovered ? logout_icon_white : logout_icon}
                            alt="logout_icon"
                        />
                        <p>{t('logout')}</p>
                    </div>
                    <img className="Admin_Header_Container_Logout_Container_ICON" src={isHovered ? dropdown_open_navbar : dropdown_item} alt="dropdown_item" />
                </div>
            </div>
        </> 
        
    );
};

export default HeaderAccount;
