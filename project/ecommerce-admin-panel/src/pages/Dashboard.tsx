import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import { fetchCarts } from '../api/carts';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const Dashboard = () => {
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

    const chartData = {
        labels: orders.map((order) => `Order ${order.id}`),
        datasets: [
            {
                label: 'Total Items Ordered',
                data: orders.map((order) => order.products.reduce((sum, item) => sum + item.quantity, 0)),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <Card style={{ marginTop: '20px', padding: '20px' }}>
                {loading ? <p>Loading sales data...</p> : <Bar data={chartData} />}
            </Card>
        </div>
    );
};

export default Dashboard;