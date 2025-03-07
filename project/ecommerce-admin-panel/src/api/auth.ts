// src/api/auth.ts
import axios from 'axios';

type AuthResponse = {
    token: string;
};

export const loginUser = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>('/auth/login', { username, password });
    return response.data;
};
