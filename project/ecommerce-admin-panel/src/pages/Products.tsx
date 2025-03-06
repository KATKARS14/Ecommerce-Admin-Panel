import { useEffect, useState } from 'react';
import { Table, Button, message, Input, Modal, Form, Image } from 'antd';
import { fetchProducts, deleteProduct, addProduct, updateProduct } from '../api/products';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchProducts()
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data as Product[]);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
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
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            message.success('Product deleted successfully');
        } catch (error) {
            message.error('Failed to delete product');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        form.setFieldsValue({ ...product });
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleSave = async (values: Omit<Product, 'id'>) => {
        try {
            if (editingProduct) {
                const updatedProduct = (await updateProduct(editingProduct.id, values)) as Product;
                setProducts((prevProducts) =>
                    prevProducts.map((product) => (product.id === editingProduct.id ? { ...product, ...updatedProduct } : product))
                );
                message.success('Product updated successfully');
            } else {
                const newProduct = (await addProduct(values)) as Product;
                setProducts((prevProducts) => [...prevProducts, newProduct]);
                message.success('Product added successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            message.error('Failed to save product');
        }
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Image', dataIndex: 'image', key: 'image', render: (image: string) => <Image width={50} src={image} /> },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Price', dataIndex: 'price', key: 'price', render: (price: number) => `$${price}` },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        {
            title: 'Actions',
            render: (_: any, record: Product) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </>
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
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: '10px' }}>Add Product</Button>
            <Table
                dataSource={filteredProducts}
                columns={columns}
                rowKey="id"
                loading={loading}
            />

            <Modal
                title={editingProduct ? 'Edit Product' : 'Add Product'}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter title' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter category' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="image" label="Image URL" rules={[{ required: true, message: 'Please enter image URL' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Products;