import api from './api/axios';

export const dashboardService = {
  getAdminStats: async () => {
    try {
      const response = await api.get('/dashboard/admin/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching admin dashboard stats:', error);
      throw error;
    }
  }
};
