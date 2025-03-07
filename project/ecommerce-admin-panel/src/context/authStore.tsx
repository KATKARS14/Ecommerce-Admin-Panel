import { create } from 'zustand';

interface AuthState {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('authToken'),
    setToken: (token: string) => {
        localStorage.setItem('authToken', token);
        set({ token });
    },
    logout: () => {
        localStorage.removeItem('authToken');
        set({ token: null });
    },
}));

export default useAuthStore;
