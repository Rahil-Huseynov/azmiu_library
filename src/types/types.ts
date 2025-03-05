import {ROLES} from "../utils/constant.ts";

export type AuthContextType = {
    isAuthenticated: boolean;
    userRole: typeof ROLES.ADMIN | typeof ROLES.USER | null;
    login: (token: string, role: typeof ROLES.ADMIN | typeof ROLES.USER) => void;
    logout: () => void;
};

export interface SidebarContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void; // Add toggle function
}

