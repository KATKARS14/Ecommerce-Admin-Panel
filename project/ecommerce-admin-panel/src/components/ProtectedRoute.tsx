import { Navigate } from 'react-router-dom';
import { JSX } from 'react';

type ProtectedRouteProps = {
    children: JSX.Element;
    allowedRoles: ('admin' | 'staff')[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role') as 'admin' | 'staff' | null;

    if (!token || !role || !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
