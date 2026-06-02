import api from './api/axios';

export const authService = {
  registerClient: async (data: any) => {
    return api.post('/auth/register/client', data);
  },

  registerErrand: async (data: any) => {
    return api.post('/auth/register/errand', data);
  },

  login: async (credentials: any) => {
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

  changePassword: async (data: any) => {
    return api.post('/auth/change-password', data);
  },
};
