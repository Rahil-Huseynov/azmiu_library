import { useContext } from "react";
import { ClientSidebarContext } from "../context/ClientSidebarContext";

export const useClientSidebar = () => {
  const context = useContext(ClientSidebarContext);
  if (!context) {
    throw new Error("useClientSidebar must be used within a ClientSidebarProvider");
  }
  return context;
};