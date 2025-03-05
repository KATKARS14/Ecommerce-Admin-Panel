import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Users from './pages/Users';
import Orders from './pages/Orders';
import { ThemeProvider } from './context/themeProvider';

const { Content } = Layout;

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Navbar />
            <Content style={{ margin: '20px', padding: '20px', background: '#fff' }}>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<ProtectedRoute allowedRoles={['admin', 'staff']}><Dashboard /></ProtectedRoute>} />
                <Route path='/products' element={<ProtectedRoute allowedRoles={['admin', 'staff']}><Products /></ProtectedRoute>} />
                <Route path='/users' element={<ProtectedRoute allowedRoles={['admin']}><Users /></ProtectedRoute>} />
                <Route path='/orders' element={<ProtectedRoute allowedRoles={['admin', 'staff']}><Orders /></ProtectedRoute>} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;