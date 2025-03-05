import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '../api/auth';
import useAuthStore from '../context/authStore';
import { Button, Input, Form, message } from 'antd';

type LoginForm = {
    username: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit } = useForm<LoginForm>();
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        try {
            const response = await loginUser(data.username, data.password);
            if (response.token) {
                const role = data.username === 'admin' ? 'admin' : 'staff';
                login(data.username, response.token, role);
                message.success('Login successful!');
                navigate('/dashboard', { replace: true });
            } else {
                message.error('Invalid credentials');
            }
        } catch (error) {
            message.error('Login failed: Invalid username or password');
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <Form onFinish={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: 'auto' }}>
            <Form.Item>
                <Input {...register("username")} placeholder="Username" required />
            </Form.Item>
            <Form.Item>
                <Input.Password {...register("password")} placeholder="Password" required />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
