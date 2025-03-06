import { Card, Col, Row, Statistic } from "antd";
import { ShoppingCartOutlined, UserOutlined, ShoppingOutlined, BarChartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../api/users";
import { fetchProducts } from "../api/products";
import { fetchCarts } from "../api/carts";

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

        fetchUsers().then((data) => setUserCount(data.length));

        fetchProducts().then((data) => setProductCount(data.length));

        fetchCarts().then((data) => setOrderCount(data.length));
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Admin Dashboard</h2>
            <Row gutter={16}>
                <Col span={6}>
                    <Card hoverable onClick={() => navigate("/users")}>
                        <Statistic
                            title="Total Users"
                            value={userCount}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable onClick={() => navigate("/products")}>
                        <Statistic
                            title="Total Products"
                            value={productCount}
                            prefix={<ShoppingOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable onClick={() => navigate("/orders")}>
                        <Statistic
                            title="Total Orders"
                            value={orderCount}
                            prefix={<ShoppingCartOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable onClick={() => navigate("/analytics")}>
                        <Statistic
                            title="View Analytics"
                            value="Charts"
                            prefix={<BarChartOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;