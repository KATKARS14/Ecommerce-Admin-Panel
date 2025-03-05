import { create } from 'zustand';

type AuthState = {
    user: string | null;
    token: string | null;
    role: 'admin' | 'staff' | null;
    login: (username: string, token: string, role: 'admin' | 'staff') => void;
    logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    role: null,
    login: (username, token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', username);
        localStorage.setItem('role', role);
        set({ user: username, token, role });
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        set({ user: null, token: null, role: null });
    },
}));

export default useAuthStore;
