import axios from 'axios';

type User = {
    id: number;
    name: { firstname: string; lastname: string };
    email: string;
    username: string;
};

export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>('https://fakestoreapi.com/users');
    return response.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
    const response = await axios.get<User>(`https://fakestoreapi.com/users/${id}`);
    return response.data;
};

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await axios.post<User>('https://fakestoreapi.com/users', user);
    return response.data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
    const response = await axios.put<User>(`https://fakestoreapi.com/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`https://fakestoreapi.com/users/${id}`);
};
