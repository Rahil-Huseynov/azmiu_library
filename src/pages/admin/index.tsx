import { Outlet } from "react-router-dom";
import Footer from "./Layout/Footer";
import "./index.scss";
import {useSidebar} from "../../hooks/usedSidebar.ts";
import HeaderAccount from "../../components/common/Header/index.tsx";

const AdminLayout = () => {
    const { isSidebarOpen } = useSidebar();

    return (
        <>
            <div className={`container_admin_main_page ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
                <HeaderAccount />
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default AdminLayout;
