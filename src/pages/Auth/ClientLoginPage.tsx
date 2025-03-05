import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROLES, ROUTES } from '../../utils/constant.ts';
import Login from "../../components/common/Login/index.tsx";

const ClientLoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = () => {
        // Client login logic
        login("user-token", ROLES.USER);

        const redirectPath = location.state?.from?.pathname || ROUTES.DASHBOARD_CLIENT;
        navigate(redirectPath);
    };

    return (
        <>
            <div>
                <h1>Client Login</h1>
                {/* Add client-specific login form */}
                <button onClick={handleLogin}>Client Login</button>
            </div>
            <div className="Login_container">
                <Login />
            </div>
        </>
    );
};

export default ClientLoginPage;