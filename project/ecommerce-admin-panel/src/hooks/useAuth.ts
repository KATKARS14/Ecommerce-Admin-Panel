/*import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const useAuth = () => {
    const { token, setToken } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const logout = () => {
        setToken(null);
        navigate('/login');
    };

    return { token, setToken, logout };
};

export default useAuth;*/
