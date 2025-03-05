import { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { fetchCarts, deleteCart } from '../api/carts';

type ProductInOrder = {
    productId: number;
    quantity: number;
};

type Order = {
    id: number;
    userId: number;
    date: string;
    products: ProductInOrder[];
};

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCarts()
            .then((data) => {
                const formattedOrders = data.map((order) => ({
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
            setOrders(orders.filter((order) => order.id !== id));
            message.success('Order deleted successfully');
        } catch (error) {
            message.error('Failed to delete order');
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
                <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Orders</h1>
            <Table
                dataSource={orders}
                columns={columns}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
};

export default Orders;
