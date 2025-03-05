import { useEffect, useState } from 'react';
import { Table, Button, message, Input } from 'antd';
import { fetchProducts, deleteProduct } from '../api/products';

type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
};

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter((product) => product.id !== id));
            message.success('Product deleted successfully');
        } catch (error) {
            message.error('Failed to delete product');
        }
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Price', dataIndex: 'price', key: 'price', render: (price: number) => `$${price}` },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        {
            title: 'Actions',
            render: (_: any, record: Product) => (
                <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Products</h1>
            <Input
                placeholder="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Table
                dataSource={filteredProducts}
                columns={columns}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
};

export default Products;
