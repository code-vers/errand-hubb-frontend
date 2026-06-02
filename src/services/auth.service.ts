import api from './api/axios';

export const authService = {
  registerClient: async (data) => {
    return api.post('/auth/register/client', data);
  },

  registerErrand: async (data) => {
    return api.post('/auth/register/errand', data);
  },

  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  logout: async () => {
    return api.post('/auth/logout');
  },

  forgotPassword: async (email: string) => {
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (data: any) => {
    return api.post('/auth/reset-password', data);
  },
};
