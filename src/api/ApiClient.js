import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://ecommcerce-backend.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies if sessions are used
});

export default apiClient;
