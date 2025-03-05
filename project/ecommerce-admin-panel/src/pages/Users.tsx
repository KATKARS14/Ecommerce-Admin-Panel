import { useEffect, useState } from 'react';
import { Table, Button, message, Input } from 'antd';
import { fetchUsers, deleteUser } from '../api/users';

type User = {
    id: number;
    name: { firstname: string; lastname: string };
    email: string;
    username: string;
};

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredUsers = users.filter((user) =>
        `${user.name.firstname} ${user.name.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', key: 'name', render: (_: any, record: User) => `${record.name.firstname} ${record.name.lastname}` },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Actions',
            render: (_: any, record: User) => (
                <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
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
            <Table
                dataSource={filteredUsers}
                columns={columns}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
};

export default Users;
