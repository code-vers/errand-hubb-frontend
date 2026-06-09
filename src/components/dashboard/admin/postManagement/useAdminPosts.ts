import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api/axios";
import { toast } from "sonner";
import { Post, PostStatus } from "@/types/post";

export const adminPostService = {
  getAllPosts: async (params?: any) => {
    return api.get("/posts/admin/all", { params });
  },
  updatePost: async (id: string, data: any) => {
    return api.patch(`/posts/admin/${id}`, data);
  },
  deletePost: async (id: string) => {
    return api.delete(`/posts/admin/${id}`);
  },
};

export function useAdminPosts(filters: any) {
  const queryClient = useQueryClient();

  const { data, isLoading: loading, error } = useQuery({
    queryKey: ["admin-posts", filters],
    queryFn: async () => {
      const res = await adminPostService.getAllPosts(filters);
      return res.data;
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminPostService.updatePost(id, data),
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update post");
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: string) => adminPostService.deletePost(id),
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete post");
    },
  });

  return {
    posts: data?.data || [],
    meta: data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 },
    loading,
    error,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    isUpdating: updatePostMutation.isPending,
    isDeleting: deletePostMutation.isPending,
  };
}
