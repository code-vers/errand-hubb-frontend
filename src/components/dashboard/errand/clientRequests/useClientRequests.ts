"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceRequestService } from "@/services/serviceRequest.service";
import { toast } from "sonner";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useClientRequests(initialFilters: any = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [filters, setFilters] = useState({
    search: "",
    categoryId: "all",
    city: "",
    urgencyLevel: "",
    minBudget: "",
    maxBudget: "",
    page: 1,
    limit: 9,
    ...initialFilters,
  });

  const {
    data: response,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["available-client-requests", filters],
    queryFn: async () => {
      const res = await serviceRequestService.getAvailable(filters);
      return res.data;
    },
  });

  const requests = useMemo(() => {
    return response?.data || [];
  }, [response]);

  const meta = useMemo(() => {
    return response?.meta || { total: 0, page: 1, limit: 9, totalPages: 1 };
  }, [response]);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  }, []);

  const contactMutation = useMutation({
    mutationFn: (id: string) => serviceRequestService.contactClient(id),
    onSuccess: (res: any) => {
      const { conversation, isNew } = res.data;
      if (isNew) {
        toast.success("Conversation started with client!");
      }
      queryClient.invalidateQueries({ queryKey: ["available-client-requests"] });
      // Redirect to chat container using convId
      router.push(`/dashboard/messages?convId=${conversation.id}`);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to contact client");
    },
  });

  return {
    requests,
    meta,
    loading,
    error,
    filters,
    updateFilter,
    contactClient: contactMutation.mutate,
    isContacting: contactMutation.isPending,
    refetch,
  };
}
