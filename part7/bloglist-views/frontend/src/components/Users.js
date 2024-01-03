import { useEffect, useState } from 'react';
import axios from 'axios';
import userService from "../services/users";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await userService.getAll();
            setUsers(response);
        };
        fetchUsers();
    }, []);

    if (!users) {
        return null;
    }

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
