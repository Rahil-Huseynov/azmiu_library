import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import MiddleClientPage from "./Layout/Main/MiddleSection";
import "./index.scss";

const ClientLayout = () => {
  return (
    <div className="Client-page">
      <Header />
      <MiddleClientPage />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ClientLayout;
