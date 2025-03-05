// Create the context with proper typing and default value
import {createContext, useContext} from "react";
import {AuthContextType} from "../types/types.ts";



export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userRole: null,
    login: () => {},
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);