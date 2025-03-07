import React from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import useAuthStore from '../context/authStore';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Button type="text" onClick={handleLogout}>
                    Logout
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <Header>
            <div className="logo" />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/users">Users</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/products">Products</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/orders">Orders</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/analytics">Analytics</Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button type="text">
                            Account <DownOutlined />
                        </Button>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default Navbar;
