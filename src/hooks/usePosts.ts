import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/post.service";

export const usePosts = (params?: any) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: async () => {
      const response = await postService.findAll(params);
      return response.data;
    },
  });
};

export const useMyPosts = () => {
  return useQuery({
    queryKey: ["my-posts"],
    queryFn: async () => {
      const response = await postService.getMyPosts();
      return response.data;
    },
  });
};
