import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import "./index.scss";
import {useSidebar} from "../../hooks/usedSidebar.ts";

const AdminLayout = () => {
    const { isSidebarOpen } = useSidebar();

    return (
        <>
            <div className={`container_admin_main_page ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
                <Header />
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default AdminLayout;
