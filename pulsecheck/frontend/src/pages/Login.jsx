import React, { useState } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Logging in...' });
        try {
            const response = await authService.login(formData);
            setStatus({ type: 'success', message: 'Login successful!' });
            console.log('Login success:', response.data);
            // Optionally store token here
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            // Redirect after short delay
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            console.error('Login error:', err);
            setStatus({ type: 'error', message: err.response?.data?.message || 'Login failed. Please check credentials.' });
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login to PulseCheck</h2>
                {status.message && (
                    <div className={`mb-4 p-3 rounded ${status.type === 'error' ? 'bg-red-100 text-red-700' : status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {status.message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email / Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="******************"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150"
                            type="submit"
                            disabled={status.type === 'loading'}
                        >
                            {status.type === 'loading' ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
