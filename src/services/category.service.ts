import axiosInstance from "./api/axios";
import { Category, CategoryStatus } from "@/types/categories";

const CATEGORY_API_URL = "/categories";

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await axiosInstance.get(CATEGORY_API_URL);
    return response.data;
  },

  getActive: async (): Promise<Category[]> => {
    const response = await axiosInstance.get(`${CATEGORY_API_URL}/active`);
    return response.data;
  },

  getById: async (id: string): Promise<Category> => {
    const response = await axiosInstance.get(`${CATEGORY_API_URL}/${id}`);
    return response.data;
  },

  create: async (data: Partial<Category>): Promise<Category> => {
    const response = await axiosInstance.post(CATEGORY_API_URL, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Category>): Promise<Category> => {
    const response = await axiosInstance.patch(`${CATEGORY_API_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${CATEGORY_API_URL}/${id}`);
  },

  uploadIcon: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post(`${CATEGORY_API_URL}/upload-icon`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  toggleStatus: async (id: string, currentStatus: CategoryStatus): Promise<Category> => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    return categoryService.update(id, { status: newStatus });
  },
};
