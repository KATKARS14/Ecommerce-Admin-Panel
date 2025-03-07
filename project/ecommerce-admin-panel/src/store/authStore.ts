
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface AuthState {
//     token: string | null;
//     setToken: (token: string | null) => void;
// }

// const useAuthStore = create<AuthState>()(
//     persist(
//         (set) => ({
//             token: null,
//             setToken: (token) => set({ token }),
//         }),
//         {
//             name: 'auth-storage', // Unique name for storage
//             getStorage: () => localStorage, // Use localStorage for persistence
//         }
//     )
// );

// export default useAuthStore;
