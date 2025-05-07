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

export interface PaginatedResponse<T> {
    list: T[];
    currentPageNumber: number;
    totalPages: number;
    numberOfElements: number;
    totalElements: number;
    hasNextPage: boolean;
  }
  