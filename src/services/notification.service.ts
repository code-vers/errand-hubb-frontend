import api from './api/axios';

export const notificationService = {
  getNotifications: (page = 1, limit = 20) => 
    api.get('/notifications', { params: { page, limit } }),
  getUnreadCount: () => 
    api.get('/notifications/unread-count'),
  markAsRead: (id: string) => 
    api.patch(`/notifications/${id}/read`),
  markAsUnread: (id: string) => 
    api.patch(`/notifications/${id}/unread`),
  markAllAsRead: () => 
    api.post('/notifications/mark-all-read'),
};
