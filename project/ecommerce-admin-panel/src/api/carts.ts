import axios from 'axios';

type Cart = {
    id: number;
    userId: number;
    date: string;
    products: { productId: number; quantity: number }[];
};

export const fetchCarts = async (): Promise<Cart[]> => {
    const response = await axios.get('https://fakestoreapi.com/carts');
    return response.data as Cart[];
};

export const fetchCartById = async (id: number): Promise<Cart> => {
    const response = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    return response.data as Cart;
};

export const addCart = async (cart: Omit<Cart, 'id'>): Promise<Cart> => {
    const response = await axios.post('https://fakestoreapi.com/carts', cart);
    return response.data as Cart;
};

export const updateCart = async (id: number, cart: Partial<Cart>): Promise<Cart> => {
    const response = await axios.put(`https://fakestoreapi.com/carts/${id}`, cart);
    return response.data as Cart;
};

export const deleteCart = async (id: number): Promise<void> => {
    await axios.delete(`https://fakestoreapi.com/carts/${id}`);
};