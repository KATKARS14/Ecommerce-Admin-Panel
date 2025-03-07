import { useNavigate } from "react-router-dom";
import { Button } from "antd";



const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/Dashboard", { replace: true });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h2>E-Commerce Admin Login</h2>
            <Button type="primary" onClick={handleLogin}>
                Login
            </Button>
        </div>
    );
};

export default Login;
/*
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Card, message } from 'antd';
import { loginUser } from '../api/auth';
import useAuthStore from '../store/authStore';

type LoginFormInputs = {
    username: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await loginUser(data.username, data.password);
            if (response.token) {
                setToken(response.token);
                message.success('Login successful!');
                navigate('/dashboard', { replace: true });
            } else {
                message.error('Invalid credentials');
            }
        } catch (error) {
            message.error('Login failed. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Card title='E-Commerce Admin Login' style={{ width: 400, textAlign: 'center' }}>
                <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <Form.Item label='Username' validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
                        <Input placeholder='Enter username' {...register('username', { required: 'Please enter your username' })} />
                    </Form.Item>
                    <Form.Item label='Password' validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
                        <Input.Password placeholder='Enter password' {...register('password', { required: 'Please enter your password' })} />
                    </Form.Item>
                    <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
*/