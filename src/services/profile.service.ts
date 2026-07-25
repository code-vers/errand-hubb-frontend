import api from "./api/axios";

export const profileService = {
  getMe: async () => {
    return api.get("/users/me");
  },

  getAllErrands: async (params?: any) => {
    return api.get("/errand-profiles", { params });
  },

  updateProfile: async (data: FormData | any) => {
    // If it's not FormData, axios will handle it as JSON
    return api.patch("/users/profile", data);
  },

  requestDeleteAccount: async () => {
    return api.post("/users/request-delete-account");
  },

  deleteAccount: async (data: { password?: string; code?: string }) => {
    return api.post("/users/delete-account-permanently", data);
  },
};
