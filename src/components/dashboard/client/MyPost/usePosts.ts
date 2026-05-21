"use client";

import { ErrandPost, PostFilters } from "@/types/post";
import { useCallback, useMemo, useState } from "react";
import { mockPosts, statusCounts as initialStatusCounts } from "./post";

const initialFilters: PostFilters = {
  search: "",
  status: "All",
  page: 1,
};

export function usePosts() {
  const [allPosts, setAllPosts] = useState<ErrandPost[]>(mockPosts);
  const [filters, setFilters] = useState<PostFilters>(initialFilters);

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

  const addPost = useCallback((newPost: ErrandPost) => {
    setAllPosts((prev) => [newPost, ...prev]);
  }, []);

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    totalPages,
    currentPage: filters.page,
    filters,
    statusCounts,
    loading: false,
    error: null,
    setSearch,
    setStatus,
    setPage,
    resetFilters,
    addPost,
  };
}