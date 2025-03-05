import { create } from 'zustand';
import { fetchUsers, addUser, updateUser, deleteUser } from '../api/users';

type User = {
    id: number;
    name: { firstname: string; lastname: string };
    email: string;
    username: string;
};

type UserState = {
    users: User[];
    loading: boolean;
    fetchAllUsers: () => Promise<void>;
    addNewUser: (user: Omit<User, 'id'>) => Promise<void>;
    updateExistingUser: (id: number, user: Partial<User>) => Promise<void>;
    removeUser: (id: number) => Promise<void>;
};

const useUserStore = create<UserState>((set) => ({
    users: [],
    loading: false,

    fetchAllUsers: async () => {
        set({ loading: true });
        try {
            const data = await fetchUsers();
            set({ users: data, loading: false });
        } catch (error) {
            console.error('Error fetching users:', error);
            set({ loading: false });
        }
    },

    addNewUser: async (user) => {
        try {
            const newUser = await addUser(user);
            set((state) => ({ users: [...state.users, newUser] }));
        } catch (error) {
            console.error('Error adding user:', error);
        }
    },

    updateExistingUser: async (id, user) => {
        try {
            const updatedUser = await updateUser(id, user);
            set((state) => ({
                users: state.users.map((u) => (u.id === id ? updatedUser : u)),
            }));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    },

    removeUser: async (id) => {
        try {
            await deleteUser(id);
            set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    },
}));

export default useUserStore;
