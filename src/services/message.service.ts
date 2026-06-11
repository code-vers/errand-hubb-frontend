import api from './api/axios';

export const messageService = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (conversationId: string) => api.get(`/messages/conversations/${conversationId}/messages`),
  startConversation: (participantId: string) => api.post('/messages/conversations', { participantId }),
  getAdminConversations: () => api.get('/messages/admin/conversations'),
};
