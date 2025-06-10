import "./index.scss";
import { t } from "i18next";
import book_icon from "../../../../assets/icons/icons8-book-50.png";
import discover from "../../../../assets/svg/discover.svg";
import library from "../../../../assets/svg/library.svg";
import favorites from "../../../../assets/svg/favorites.svg";
import categories from "../../../../assets/svg/categories.svg";
import active_categories from "../../../../assets/svg/activeCategories.svg";
import active_discover from "../../../../assets/svg/activeDsicover.svg";
import active_library from "../../../../assets/svg/activeLibrary.svg";
import active_favorites from "../../../../assets/svg/activeFavorites.svg";
import book_active_icon from "../../../../assets/icons/icons8-book-64.png";
import HeaderAccount from "../../../../components/common/Header/index";
import { ROUTES } from "../../../../utils/constant";
import { useSidebar } from "../../../../hooks/usedSidebar";
import { useTranslation } from "react-i18next";

const ClientSideBar = () => {
    const { t } = useTranslation();
  const { isSidebarOpen } = useSidebar();

  const clientSidebarItems = [
    {
      path: `${ROUTES.DASHBOARD_CLIENT}${ROUTES.DASHBOARD_CLIENT_DISCOVER}`,
      label: t("discover"),
      icon: discover,
      activeIcon: active_discover,
    },
    {
      path: `${ROUTES.DASHBOARD_CLIENT}${ROUTES.DASHBOARD_CLIENT_CATEGORIES}`,
      label: t("categories"),
      icon: categories,
      activeIcon: active_categories,
    },
    {
      path: `${ROUTES.DASHBOARD_CLIENT}${ROUTES.DASHBOARD_CLIENT_LIBRARY}`,
      label: t("myLibrary"),
      icon: library,
      activeIcon: active_library,
    },
    {
      path: `${ROUTES.DASHBOARD_CLIENT}${ROUTES.DASHBOARD_CLIENT_FAVORITES}`,
      label: t("favorites"),
      icon: favorites,
      activeIcon: active_favorites,
    },
  ];

  return (
    <>
      <div
        className={`container_client_main_page ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <HeaderAccount sidebarItems={clientSidebarItems} />
      </div>
    </>
  );
};

export default ClientSideBar;
