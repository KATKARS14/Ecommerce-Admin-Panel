// src/components/Sidebar.tsx
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    HomeOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
    {
        key: '1',
        icon: <HomeOutlined />,
        label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
        key: '2',
        icon: <AppstoreOutlined />,
        label: <Link to="/products">Products</Link>,
    },
    {
        key: '3',
        icon: <UserOutlined />,
        label: <Link to="/users">Users</Link>,
    },
    {
        key: '4',
        icon: <ShoppingCartOutlined />,
        label: <Link to="/orders">Orders</Link>,
    },
];

const Sidebar = () => {
    return (
        <Sider collapsible style={{ minHeight: '100vh' }}>
            <Menu theme="dark" mode="inline" items={menuItems} />
        </Sider>
    );
};

export default Sidebar;
