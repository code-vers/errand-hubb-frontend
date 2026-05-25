import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Standardize error object
    const errorResponse = error.response?.data;
    
    const formattedError = {
      message: errorResponse?.message || error.message || 'Something went wrong',
      errors: errorResponse?.errors || null, // [{ property, message }]
      status: error.response?.status,
    };
    
    return Promise.reject(formattedError);
  }
);

export default api;
