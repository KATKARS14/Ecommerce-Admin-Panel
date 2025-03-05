import { Layout, Button } from 'antd';
import { useTheme } from '../context/themeProvider';
import useAuthStore from '../context/authStore';

const { Header } = Layout;

const Navbar = () => {
    const { darkMode, toggleTheme } = useTheme();
    const logout = useAuthStore((state) => state.logout);

    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
            <h1 style={{ color: 'white' }}>Admin Panel</h1>
            <div>
                <Button type="primary" onClick={toggleTheme} style={{ marginRight: '10px' }}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <Button type="default" onClick={logout} danger>
                    Logout
                </Button>
            </div>
        </Header>
    );
};

export default Navbar;
