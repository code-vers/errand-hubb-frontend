import axios from 'axios';
import { toast } from 'sonner';
import { API_CONFIG } from '@/configs/api.config';

const api = axios.create({
  baseURL: API_CONFIG.API_V1_URL,
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

    if (errorResponse?.message === 'SUBSCRIPTION_REQUIRED') {
      toast.error('Please subscribe to continue using this feature.');
      if (typeof window !== 'undefined') {
        // Use timeout to allow toast to be visible
        setTimeout(() => {
          window.location.href = '/dashboard/subscription';
        }, 1500);
      }
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
