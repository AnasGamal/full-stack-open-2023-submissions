import { useEffect, useState } from 'react';
import axios from 'axios';
import userService from "../services/users";
import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'

const Users = ({ users }) => {

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
                            <td><Link to={`/users/${user.id}`}>{user.name} </Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
