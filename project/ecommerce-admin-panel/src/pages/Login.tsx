import { useNavigate } from "react-router-dom";
import { Button } from "antd";
//import Dashboard from "./Dashboard";


const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/Dashboard", { replace: true });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h2>E-Commerce Admin Login</h2>
            <Button type="primary" onClick={handleLogin}>
                Login
            </Button>
        </div>
    );
};

export default Login;