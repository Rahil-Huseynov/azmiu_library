import React, { createContext, useState, ReactNode } from "react";

interface ClientSidebarContextType {
  isClientSidebarOpen: boolean;
  toggleClientSidebar: () => void;
}

export const ClientSidebarContext = createContext<ClientSidebarContextType | undefined>(undefined);

export const ClientSidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isClientSidebarOpen, setIsClientSidebarOpen] = useState(false);

  const toggleClientSidebar = () => {
    setIsClientSidebarOpen((prev) => !prev);
  };

  return (
    <ClientSidebarContext.Provider value={{ isClientSidebarOpen, toggleClientSidebar }}>
      {children}
    </ClientSidebarContext.Provider>
  );
};