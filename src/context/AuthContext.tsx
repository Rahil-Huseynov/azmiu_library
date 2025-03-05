import { ReactNode, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import { ROLES } from "../utils/constant.ts";

type UserRole = typeof ROLES.ADMIN | typeof ROLES.USER;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<{
        isAuthenticated: boolean;
        userRole: UserRole | null;
    }>(() => ({
        isAuthenticated: !!localStorage.getItem("authToken"),
        userRole: localStorage.getItem("userRole") as UserRole | null,
    }));

    const login = (token: string, role: UserRole) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);
        setAuthState({ isAuthenticated: true, userRole: role });
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        setAuthState({ isAuthenticated: false, userRole: null });
    };

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};