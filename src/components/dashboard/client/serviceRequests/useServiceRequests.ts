"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serviceRequestService } from "@/services/serviceRequest.service";
import { toast } from "sonner";
import { useCallback, useMemo, useState } from "react";
import { ServiceRequest, ServiceRequestFilters } from "@/types/serviceRequest";

const initialFilters: ServiceRequestFilters = {
  search: "",
  status: "All",
  categoryId: "all",
  city: "",
  page: 1,
};

export function useServiceRequests() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<ServiceRequestFilters>(initialFilters);

  const {
    data: response,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["my-service-requests"],
    queryFn: async () => {
      const res = await serviceRequestService.getMyRequests();
      return res.data;
    },
  });

  const allRequests: ServiceRequest[] = useMemo(() => {
    if (!response) return [];
    return response as ServiceRequest[];
  }, [response]);

  const filteredRequests = useMemo(() => {
    let result = [...allRequests];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (req) =>
          req.title.toLowerCase().includes(searchLower) ||
          req.description.toLowerCase().includes(searchLower) ||
          req.city.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status && filters.status !== "All") {
      result = result.filter((req) => req.status === filters.status);
    }

    return result;
  }, [allRequests, filters]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (filters.page - 1) * itemsPerPage,
    filters.page * itemsPerPage
  );

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: allRequests.length,
    };
    allRequests.forEach((req) => {
      counts[req.status] = (counts[req.status] || 0) + 1;
    });
    return counts;
  }, [allRequests]);

  const createMutation = useMutation({
    mutationFn: (data: any) => serviceRequestService.create(data),
    onSuccess: () => {
      toast.success("Service request created successfully");
      queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create service request");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      serviceRequestService.update(id, data),
    onSuccess: () => {
      toast.success("Service request updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update service request");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => serviceRequestService.delete(id),
    onSuccess: () => {
      toast.success("Service request deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete service request");
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      serviceRequestService.changeStatus(id, status),
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update status");
    },
  });

  const updateFilter = useCallback(
    (key: keyof ServiceRequestFilters, value: any) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        ...(key !== "page" ? { page: 1 } : {}),
      }));
    },
    []
  );

  const setSearch = useCallback(
    (search: string) => updateFilter("search", search),
    [updateFilter]
  );
  const setStatus = useCallback(
    (status: string) => updateFilter("status", status),
    [updateFilter]
  );
  const setPage = useCallback(
    (page: number) => updateFilter("page", page),
    [updateFilter]
  );

  return {
    requests: paginatedRequests,
    total: filteredRequests.length,
    totalPages,
    currentPage: filters.page,
    filters,
    statusCounts,
    loading,
    error,
    setSearch,
    setStatus,
    setPage,
    createRequest: createMutation.mutate,
    updateRequest: updateMutation.mutate,
    deleteRequest: deleteMutation.mutate,
    changeStatus: statusMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
