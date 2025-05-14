import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";
import MiddleClientPage from "./Layout/Main/MiddleSection";
import "./index.scss";
import ClientRightSide from "./Layout/Footer";
import { ClientSidebarProvider } from "../../context/ClientSidebarContext";
import { BookProvider } from "../../context/BookContext";

const ClientLayout = () => {
  return (
    <BookProvider>
      <ClientSidebarProvider>
        <div className="Client-page">
          <Header />
          <MiddleClientPage />
          <Outlet />
          <ClientRightSide />
        </div>
      </ClientSidebarProvider>
    </BookProvider>
  );
};

export default ClientLayout;
