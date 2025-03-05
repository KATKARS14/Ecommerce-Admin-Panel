import { create } from 'zustand';
import axios from 'axios';

type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
};

type ProductState = {
    products: Product[];
    fetchProducts: () => Promise<void>;
    addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
};

const useProductStore = create<ProductState>((set) => ({
    products: [],
    fetchProducts: async () => {
        try {
            const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
            set({ products: response.data });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },
    addProduct: async (product) => {
        try {
            const response = await axios.post<Product>('https://fakestoreapi.com/products', product);
            set((state) => ({ products: [...state.products, response.data] }));
        } catch (error) {
            console.error('Error adding product:', error);
        }
    },
    updateProduct: async (id, product) => {
        try {
            const response = await axios.put<Product>(`https://fakestoreapi.com/products/${id}`, product);
            set((state) => ({
                products: state.products.map((p) => (p.id === id ? response.data : p)),
            }));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    },
    deleteProduct: async (id) => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${id}`);
            set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    },
}));

export default useProductStore;