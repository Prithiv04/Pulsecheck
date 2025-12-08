import React, { useEffect, useState } from 'react';
import { userService } from '../services/api';
import { User as UserIcon } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers();
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users. Is the backend running?');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div className="text-center py-10">Loading users...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Users</h2>
            {users.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div key={user._id || user.id || Math.random()} className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <UserIcon className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{user.username || 'Unknown User'}</h3>
                                <p className="text-gray-500 text-sm">{user.email || 'No email'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Users;
