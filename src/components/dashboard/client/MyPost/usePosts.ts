"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { toast } from "sonner";
import { useCallback, useMemo, useState } from "react";
import { ErrandPost, PostFilters } from "@/types/post";
import { useRouter } from "next/navigation";

const initialFilters: PostFilters = {
  search: "",
  status: "All",
  page: 1,
};

export function usePosts() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [filters, setFilters] = useState<PostFilters>(initialFilters);

  const { data: response, isLoading: loading, error } = useQuery({
    queryKey: ["my-posts"],
    queryFn: async () => {
      const res = await postService.getMyPosts();
      return res.data;
    },
  });

  const allPosts = useMemo(() => {
    if (!response) return [];
    // Map backend response to ErrandPost type if needed
    return response.map((post: any) => ({
      id: post.id,
      title: post.title,
      type: post.category?.name || "Other",
      description: post.description,
      reward: Number(post.budget),
      status: post.status,
      date: post.dateNeeded ? post.dateNeeded.split("T")[0] : "",
      time: post.time || "",
      location: `${post.city}, ${post.state}`,
      serviceType: post.serviceType || "Delivery",
      assignedTo: post.assignedTo ? `${post.assignedTo.firstName} ${post.assignedTo.lastName}` : null,
      icon: post.category?.icon || "shopping-cart",
      categoryId: post.categoryId,
      category: post.category,
    }));
  }, [response]);

  const filteredPosts = useMemo(() => {
    let result = [...allPosts];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.type.toLowerCase().includes(searchLower) ||
          post.description.toLowerCase().includes(searchLower) ||
          post.location.toLowerCase().includes(searchLower),
      );
    }

    if (filters.status && filters.status !== "All") {
      result = result.filter((post) => post.status === filters.status);
    }

    return result;
  }, [allPosts, filters]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (filters.page - 1) * itemsPerPage,
    filters.page * itemsPerPage,
  );

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: allPosts.length,
    };
    allPosts.forEach((post) => {
      counts[post.status] = (counts[post.status] || 0) + 1;
    });
    return counts;
  }, [allPosts]);

  const createPostMutation = useMutation({
    mutationFn: (data: any) => postService.create(data),
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
    onError: (err: any) => {
      if (err.message === "SUBSCRIPTION_REQUIRED") {
        // Handled globally, but we can prevent double toast here if we want
        return;
      }
      toast.error(err.message || "Failed to create post");
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => postService.update(id, data),
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
    onError: (err: any) => {
      if (err.message === "SUBSCRIPTION_REQUIRED") {
        return;
      }
      toast.error(err.message || "Failed to update post");
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: string) => postService.delete(id),
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete post");
    },
  });

  const updateFilter = useCallback((key: keyof PostFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  }, []);

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
  
  const resetFilters = useCallback(() => setFilters(initialFilters), []);

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    totalPages,
    currentPage: filters.page,
    filters,
    statusCounts,
    loading,
    error,
    setSearch,
    setStatus,
    setPage,
    resetFilters,
    addPost: createPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    isCreating: createPostMutation.isPending,
    isUpdating: updatePostMutation.isPending,
    isDeleting: deletePostMutation.isPending,
  };
}
