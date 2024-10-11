// utils/api.js
import axios from 'axios';
import { SERVER_LOCAL_IP } from '@/utils/constants';

const apiClient = axios.create({
  baseURL: SERVER_LOCAL_IP, // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (optional)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
  }
  return config;
});

// Add a response interceptor to handle unauthorized errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Redirect to login page if unauthorized   
        localStorage.removeItem('authToken');
        window.location.href = '/login';    
        return Promise.reject('Unauthorized! Redirecting to login...');
      }

      // Handle other status codes as needed
      if (status === 403) {
        alert('Access denied!'); // Show an alert or a notification
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
