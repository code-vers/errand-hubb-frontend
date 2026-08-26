import api from './api/axios';

export const adsService = {
  create: async (data: any) => {
    return api.post('/ads', data);
  },

  uploadImage: async (data: FormData) => {
    return api.post('/ads/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  findAll: async (params?: any) => {
    return api.get('/ads', { params });
  },

  findOne: async (id: string) => {
    return api.get(`/ads/${id}`);
  },

  getMyAds: async () => {
    return api.get('/ads/my-ads');
  },

  getCategories: async () => {
    return api.get('/ads/categories');
  },

  adminCreate: async (data: any) => {
    return api.post('/ads/admin', data);
  },

  reorderAds: async (orders: { id: string; position: number }[]) => {
    return api.patch('/ads/reorder', { orders });
  },

  update: async (id: string, data: any) => {
    return api.patch(`/ads/${id}`, data);
  },

  delete: async (id: string) => {
    return api.delete(`/ads/${id}`);
  },
};
