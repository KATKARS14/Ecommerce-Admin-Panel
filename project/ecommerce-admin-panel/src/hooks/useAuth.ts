/*import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import useAuthStore from '../context/authStore';

const useAuth = () => {
    const { user, token, logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    return { user, token, logout };
};

export default useAuth;*/