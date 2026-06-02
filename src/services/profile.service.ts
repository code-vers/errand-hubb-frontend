import api from './api/axios';

export const profileService = {
  getMe: async () => {
    return api.get('/users/me');
  },

  updateProfile: async (data: FormData | any) => {
    // If it's not FormData, axios will handle it as JSON
    return api.patch('/users/profile', data);
  },
};
