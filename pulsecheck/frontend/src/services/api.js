const BACKEND_BASE_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://pulsecheck-backend-wqx6.onrender.com";

export const API_BASE_URL = `${BACKEND_BASE_URL}/api`;

export const getUsers = async () => {
    const res = await fetch(`${API_BASE_URL}/users`);
    return res.json();
};

export const getMoods = async () => {
    const res = await fetch(`${API_BASE_URL}/moods`);
    return res.json();
};

export const saveReading = async (readingData) => {
    const res = await fetch(`${API_BASE_URL}/saveReading`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(readingData)
    });
    return res.json();
};

export const getHistory = async () => {
    const res = await fetch(`${API_BASE_URL}/history`);
    return res.json();
};

export const login = async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return res.json();
};

export const userService = {
    getAllUsers: async () => {
        const data = await getUsers();
        return { data };
    }
};

export const moodService = {
    getAllMoods: async () => {
        const data = await getMoods();
        return { data };
    }
};

export const authService = {
    login: async (credentials) => {
        const data = await login(credentials);
        return { data };
    }
};
