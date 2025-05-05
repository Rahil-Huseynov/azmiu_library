import "./index.scss";
import { t } from "i18next";
import book_icon from "../../../../assets/icons/icons8-book-50.png";
import member_icon from "../../../../assets/icons/icons8-member-50.png";
import book_active_icon from "../../../../assets/icons/icons8-book-64.png";
import member_active_icon from "../../../../assets/icons/icons8-people-50.png";
import HeaderAccount from "../../../../components/common/Header/index";
import { ROUTES } from "../../../../utils/constant";
import { useSidebar } from "../../../../hooks/usedSidebar";

const Header = () => {
  const { isSidebarOpen } = useSidebar();

  const adminSidebarItems = [
    {
      path: `${ROUTES.DASHBOARD_ADMIN}${ROUTES.DASHBOARD_BOOKS}`,
      label: t("book"),
      icon: book_icon,
      activeIcon: book_active_icon,
    },
    {
      path: `${ROUTES.DASHBOARD_ADMIN}${ROUTES.DASHBOARD_CATEGORIES}`,
      label: t("categories"),
      icon: book_icon,
      activeIcon: book_active_icon,
    },
    {
      path: `${ROUTES.DASHBOARD_ADMIN}${ROUTES.DASHBOARD_MEMBERS}`,
      label: t("members"),
      icon: member_icon,
      activeIcon: member_active_icon,
    },
  ];

  return (
    <>
      <div className={`container_admin_main_page ${isSidebarOpen ? "" : "sidebar-closed"}`}>
        <HeaderAccount sidebarItems={adminSidebarItems} />
      </div>
    </>
  );
};

export default Header;
