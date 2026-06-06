import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const errorResponse = error.response?.data;
    
    // Handle Rate Limiting (429)
    if (status === 429) {
      toast.error('Too many requests. Please slow down and try again in 15 minutes.');
    }
    
    // Standardize error object
    const formattedError = {
      message: errorResponse?.message || error.message || 'Something went wrong',
      errors: errorResponse?.errors || null, // [{ property, message }]
      status: status,
    };
    
    return Promise.reject(formattedError);
  }
);

export default api;
