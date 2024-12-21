// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Default backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors if needed (optional)
apiClient.interceptors.request.use(
    (config) => {
        // Modify the request if needed (e.g., add auth tokens)
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
