import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to requests
api.interceptors.request.use(
  (config) => {
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });

    // Don't add token for auth endpoints
    if (!config.url?.includes('/auth/')) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Added token to request');
      } else {
        console.log('No token found in localStorage');
      }
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      headers: response.headers,
      data: response.data
    });
    return response;
  },
  async (error) => {
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });

    // If the error is 401 (Unauthorized)
    if (error.response?.status === 401) {
      console.warn('Received 401 – clearing auth data');

      // Clear stored auth data
      localStorage.removeItem('jwt_token');

      // Reject the promise so calling code can handle the error as well
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api; 