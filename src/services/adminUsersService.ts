import api from './api/axios';

export const adminUsersService = {
  getAllUsers: async () => {
    try {
      const response = await api.get('/users/admin/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching all users for admin:', error);
      throw error;
    }
  },

  updateUserStatus: async (userId: string, status: string) => {
    try {
      const response = await api.patch(`/users/admin/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }
};
