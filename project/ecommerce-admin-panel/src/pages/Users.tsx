import { useEffect, useState } from 'react';
import { Table, Button, message, Input, Modal, Form } from 'antd';
import { fetchUsers, deleteUser, addUser, updateUser } from '../api/users';

const Users = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingUser, setEditingUser] = useState<any | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
            message.success('User deleted successfully');
        } catch (error) {
            message.error('Failed to delete user');
        }
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        form.setFieldsValue({
            firstname: user.name.firstname,
            lastname: user.name.lastname,
            username: user.username,
            email: user.email,
        });
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingUser(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleSave = async (values: any) => {
        try {
            const newUser = {
                name: { firstname: values.firstname, lastname: values.lastname },
                username: values.username,
                email: values.email,
            };

            if (editingUser) {
                const updatedUser = await updateUser(editingUser.id, newUser);
                setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...updatedUser } : user)));
                message.success('User updated successfully');
            } else {
                const addedUser = await addUser(newUser);
                setUsers([...users, addedUser]);
                message.success('User added successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            message.error('Failed to save user');
        }
    };

    const filteredUsers = users.filter((user) =>
        `${user.name.firstname} ${user.name.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'First Name', dataIndex: ['name', 'firstname'], key: 'firstname' },
        { title: 'Last Name', dataIndex: ['name', 'lastname'], key: 'lastname' },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Actions',
            render: (_: any, record: any) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Users</h1>
            <Input
                placeholder="Search Users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: '10px' }}>Add User</Button>
            <Table
                dataSource={filteredUsers}
                columns={columns}
                rowKey="id"
                loading={loading}
            />

            <Modal
                title={editingUser ? 'Edit User' : 'Add User'}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="firstname" label="First Name" rules={[{ required: true, message: 'Please enter first name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastname" label="Last Name" rules={[{ required: true, message: 'Please enter last name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter username' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Users;