import api from './api/axios';

export const postService = {
  create: async (data: any) => {
    return api.post('/posts', data);
  },

  findAll: async (params?: any) => {
    return api.get('/posts', { params });
  },

  findOne: async (id: string) => {
    return api.get(`/posts/${id}`);
  },

  getMyPosts: async () => {
    return api.get('/posts/my-posts');
  },

  update: async (id: string, data: any) => {
    return api.patch(`/posts/${id}`, data);
  },

  delete: async (id: string) => {
    return api.delete(`/posts/${id}`);
  },
};
