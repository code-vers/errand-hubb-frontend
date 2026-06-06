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

  verify2FALogin: async (data: { userId: string; code: string }) => {
    return api.post('/auth/verify-2fa-login', data);
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

  generate2FA: async () => {
    return api.post('/auth/generate-2fa');
  },

  enable2FA: async (code: string) => {
    return api.post('/auth/enable-2fa', { code });
  },

  disable2FA: async () => {
    return api.post('/auth/disable-2fa');
  },

  getLoginActivity: async () => {
    return api.get('/auth/login-activity');
  },

  getSecurityLogs: async () => {
    return api.get('/auth/security-logs');
  },
};
