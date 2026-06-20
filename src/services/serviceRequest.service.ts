import api from "./api/axios";

export const serviceRequestService = {
  // Client endpoints
  create: async (data: any) => {
    return api.post("/service-requests", data);
  },

  getMyRequests: async () => {
    return api.get("/service-requests/my-requests");
  },

  getMyRequestById: async (id: string) => {
    return api.get(`/service-requests/my-requests/${id}`);
  },

  update: async (id: string, data: any) => {
    return api.patch(`/service-requests/${id}`, data);
  },

  delete: async (id: string) => {
    return api.delete(`/service-requests/${id}`);
  },

  changeStatus: async (id: string, status: string) => {
    return api.patch(`/service-requests/${id}/status`, { status });
  },

  getConversations: async (id: string) => {
    return api.get(`/service-requests/${id}/conversations`);
  },

  // Errand Provider endpoints
  getAvailable: async (params?: any) => {
    return api.get("/service-requests/available", { params });
  },

  getAvailableById: async (id: string) => {
    return api.get(`/service-requests/available/${id}`);
  },

  contactClient: async (id: string) => {
    return api.post(`/service-requests/${id}/contact`);
  },

  checkContact: async (id: string) => {
    return api.get(`/service-requests/${id}/check-contact`);
  },

  // Admin endpoints
  adminGetAll: async (params?: any) => {
    return api.get("/service-requests/admin/all", { params });
  },

  adminChangeStatus: async (id: string, status: string) => {
    return api.patch(`/service-requests/admin/${id}/status`, { status });
  },

  adminDelete: async (id: string) => {
    return api.delete(`/service-requests/admin/${id}`);
  },
};
