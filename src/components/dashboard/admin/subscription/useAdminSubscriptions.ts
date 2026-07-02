import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/axios";

export const adminSubscriptionService = {
  getAllSubscriptions: async (params?: any) => {
    return api.get("/subscriptions/admin/all", { params });
  },
  getAllPayments: async (params?: any) => {
    return api.get("/subscriptions/admin/payments", { params });
  },
};

export function useAdminSubscriptions(filters?: any) {
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ["admin-subscriptions", filters],
    queryFn: async () => {
      const res = await adminSubscriptionService.getAllSubscriptions(filters);
      return res.data;
    },
  });

  return {
    subscriptions: data?.data || [],
    meta: data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 },
    loading,
    error,
  };
}
