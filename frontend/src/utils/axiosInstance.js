import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/', // Use environment variable for API base URL
    headers: { 'Content-Type': 'application/json' }
});

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.data) {
                if (Array.isArray(error.response.data)) {
                    error.response.data.forEach(message => {
                        toast.error(message || 'An error occurred on the server');
                    });
                } else {
                    toast.error(error.response.data || 'An error occurred on the server');
                }
            }
        }

        return Promise.reject(error); // Reject the promise to handle it properly in the calling code
    }
);

export default axiosInstance;
