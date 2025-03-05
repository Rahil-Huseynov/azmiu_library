// AdminLoginPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROLES, ROUTES } from '../../utils/constant.ts';
import Login from "../../components/common/Login/index.tsx";

const AdminLoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = () => {
        // Your actual admin login API call would go here
        login("admin-token", ROLES.ADMIN);


        const redirectPath = location.state?.from?.pathname || ROUTES.DASHBOARD_ADMIN;


        navigate(redirectPath, { replace: true });
    };

    return (
        <>
            <div>
                <h1>Admin Login</h1>
                <button onClick={handleLogin}>Login as Admin</button>
            </div>
            <div className="Login_container">
                <Login />
            </div>
        </>
    );
};

export default AdminLoginPage;