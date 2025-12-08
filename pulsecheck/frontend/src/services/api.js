import axios from 'axios';

const API_URL = 'https://pulsecheck-backend-wqx6.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include auth token if available (optional/future proof)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export const userService = {
    getAllUsers: () => api.get('/users'),
};

export const moodService = {
    getAllMoods: () => api.get('/moods'),
    saveMood: (moodData) => api.post('/moods', moodData),
};

export default api;
