import api from './api/axios';

export const adminMessagesService = {
  getAllConversations: async () => {
    try {
      const response = await api.get('/messages/admin/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching admin conversations:', error);
      throw error;
    }
  },

  getMessages: async (conversationId: string) => {
    try {
      const response = await api.get(`/messages/admin/conversations/${conversationId}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admin messages:', error);
      throw error;
    }
  },

  getAdminSchedules: async () => {
    try {
      const response = await api.get('/messages/admin/schedules');
      return response.data;
    } catch (error) {
      console.error('Error fetching admin schedules:', error);
      throw error;
    }
  }
};
