import axios from 'axios';

type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
};

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`https://fakestoreapi.com/products/${id}`);
};
