"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceRequestService } from "@/services/serviceRequest.service";
import { toast } from "sonner";
import { useState, useMemo, useCallback } from "react";
import { useConfirm } from "@/context/ConfirmationContext";

export function useAdminServiceRequests() {
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    categoryId: "all",
    page: 1,
    limit: 10,
  });

  const {
    data: response,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["admin-service-requests", filters],
    queryFn: async () => {
      const res = await serviceRequestService.adminGetAll(filters);
      return res.data;
    },
  });

  const requests = useMemo(() => {
    return response?.data || [];
  }, [response]);

  const meta = useMemo(() => {
    return response?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 };
  }, [response]);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  }, []);

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      serviceRequestService.adminChangeStatus(id, status),
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-service-requests"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update status");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => serviceRequestService.adminDelete(id),
    onSuccess: () => {
      toast.success("Service request deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-service-requests"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete request");
    },
  });

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete Service Request",
      message:
        "Are you sure you want to delete this request? This action will permanently remove it from the system.",
      type: "danger",
      confirmLabel: "Delete",
    });
    if (isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  return {
    requests,
    meta,
    loading,
    error,
    filters,
    updateFilter,
    changeStatus: statusMutation.mutate,
    deleteRequest: handleDelete,
    isUpdating: statusMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
