import React from "react";
import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AdminLayout from "../pages/admin";
import ClientLayout from "../pages/client";
import AdminLoginPage from "../pages/Auth/AdminLoginPage";
import ClientLoginPage from "../pages/Auth/ClientLoginPage";
import { ROLES, ROUTES } from '../utils/constant.ts';
import BookPage from "../pages/admin/Pages/Book";
import CategoriesPage from "../pages/admin/Pages/Categories";
import MembersPage from "../pages/admin/Pages/Members/index.tsx";
import Error from "../components/common/Error/index.tsx";

const ProtectedRoute = ({
                            children,
                            role,
                            loginPath
                        }: {
    children: React.ReactNode;
    role?: string;
    loginPath: string;
}) => {
    const { isAuthenticated, userRole } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={loginPath} replace state={{ from: location }} />;
    }

    if (userRole === ROLES.ADMIN) {
        return children;
    }

    if (role && userRole !== role) {
        return <Navigate to={ROUTES.DASHBOARD_CLIENT} replace state={{ from: location }} />;
    }

    return children;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, userRole } = useAuth();
    const location = useLocation();

    if (isAuthenticated) {
        const redirectPath = userRole === ROLES.ADMIN
            ? `${ROUTES.DASHBOARD_ADMIN}${ROUTES.DASHBOARD_BOOKS}`
            : ROUTES.DASHBOARD_CLIENT;
        return <Navigate to={redirectPath} replace state={{ from: location }} />;
    }

    return children;
};

export const routes = createBrowserRouter([
    {
        path: ROUTES.LOGIN_ADMIN,
        element: (
            <PublicRoute>
                <AdminLoginPage />
            </PublicRoute>
        )
    },
    {
        path: ROUTES.LOGIN_CLIENT,
        element: (
            <PublicRoute>
                <ClientLoginPage />
            </PublicRoute>
        )
    },
    {
        path: ROUTES.DASHBOARD_ADMIN,
        element: (
            <ProtectedRoute role={ROLES.ADMIN} loginPath={ROUTES.LOGIN_ADMIN}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <BookPage /> },
            { path: ROUTES.DASHBOARD_BOOKS.slice(1), element: <BookPage /> },
            { path: ROUTES.DASHBOARD_CATEGORIES.slice(1), element: <CategoriesPage /> },
            { path: ROUTES.DASHBOARD_MEMBERS.slice(1), element: <MembersPage /> }

        ]
    },
    {
        path: ROUTES.DASHBOARD_CLIENT,
        element: (
            <ProtectedRoute role={ROLES.USER} loginPath={ROUTES.LOGIN_CLIENT}>
                <ClientLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <h1></h1> },
            // ... other client routes
        ]
    },
    {
        path: ROUTES.HOME,
        element: <Navigate to={ROUTES.DASHBOARD_CLIENT} replace />
    },
    {
        path: ROUTES.NOT_FOUND,
        element: <Error />
    }
]);
