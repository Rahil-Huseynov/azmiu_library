import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";
import MiddleClientPage from "./Layout/Main/MiddleSection";
import "./index.scss";
import ClientRightSide from "./Layout/Footer";
import { ClientSidebarProvider } from "../../context/ClientSidebarContext";

const ClientLayout = () => {
  return (
    <ClientSidebarProvider>
    <div className="Client-page">
      <Header />
      <MiddleClientPage />
      <Outlet />
      <ClientRightSide/>
    </div>
    </ClientSidebarProvider>
  );
};

export default ClientLayout;
