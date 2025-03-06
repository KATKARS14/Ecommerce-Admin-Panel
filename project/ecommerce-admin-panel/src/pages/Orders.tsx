import { useEffect, useState } from 'react';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import { fetchCarts, deleteCart, addCart, updateCart } from '../api/carts';

interface ProductInOrder {
    productId: number;
    quantity: number;
}

interface Order {
    id: number;
    userId: number;
    date: string;
    products: ProductInOrder[];
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCarts()
            .then((data) => {
                const formattedOrders = data.map((order: Order) => ({
                    id: order.id,
                    userId: order.userId,
                    date: new Date(order.date).toLocaleDateString(),
                    products: order.products,
                }));
                setOrders(formattedOrders);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteCart(id);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
            message.success('Order deleted successfully');
        } catch (error) {
            message.error('Failed to delete order');
        }
    };

    const handleEdit = (order: Order) => {
        setEditingOrder(order);
        form.setFieldsValue(order);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingOrder(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleSave = async (values: Omit<Order, 'id'>) => {
        try {
            if (editingOrder) {
                const updatedOrder = await updateCart(editingOrder.id, values);
                setOrders((prevOrders) =>
                    prevOrders.map((order) => (order.id === editingOrder.id ? { ...order, ...updatedOrder } : order))
                );
                message.success('Order updated successfully');
            } else {
                const newOrder = await addCart(values);
                setOrders((prevOrders) => [...prevOrders, newOrder]);
                message.success('Order added successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            message.error('Failed to save order');
        }
    };

    const columns = [
        { title: 'Order ID', dataIndex: 'id', key: 'id' },
        { title: 'User ID', dataIndex: 'userId', key: 'userId' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: 'Total Items',
            key: 'total',
            render: (_: any, record: Order) => record.products.reduce((sum, item) => sum + item.quantity, 0),
        },
        {
            title: 'Actions',
            render: (_: any, record: Order) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Orders</h1>
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: '10px' }}>Add Order</Button>
            <Table dataSource={orders} columns={columns} rowKey="id" loading={loading} />

            <Modal
                title={editingOrder ? 'Edit Order' : 'Add Order'}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="userId" label="User ID" rules={[{ required: true, message: 'Please enter User ID' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please enter Date' }]}>
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item name="products" label="Products (JSON format)" rules={[{ required: true, message: 'Please enter Products' }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Orders;