"use client";

import { useState, useEffect, useCallback } from "react";
import { profileService } from "@/services/profile.service";
import { Post } from "@/types/search";

export interface SearchFilters {
  search: string;
  categoryId: string;
  location: string;
  minBudget: string;
  maxBudget: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  workerName: string;
  workerEmail: string;
}

const initialFilters: SearchFilters = {
  search: "",
  categoryId: "all",
  location: "",
  minBudget: "",
  maxBudget: "",
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
  workerName: "",
  workerEmail: "",
};

export function useProviders(initialLimit: number = 6) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setFilters({
        search: searchParams.get('search') || initialFilters.search,
        categoryId: searchParams.get('categoryId') || initialFilters.categoryId,
        location: searchParams.get('location') || initialFilters.location,
        minBudget: searchParams.get('minBudget') || initialFilters.minBudget,
        maxBudget: searchParams.get('maxBudget') || initialFilters.maxBudget,
        sortBy: searchParams.get('sortBy') || initialFilters.sortBy,
        sortOrder: (searchParams.get('sortOrder') as "asc" | "desc") || initialFilters.sortOrder,
        page: initialFilters.page,
        workerName: searchParams.get('workerName') || initialFilters.workerName,
        workerEmail: searchParams.get('workerEmail') || initialFilters.workerEmail,
      });
      setIsInitialized(true);
    }
  }, []);

  const [providers, setProviders] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!isInitialized) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await profileService.getAllErrands({
        search: filters.search,
        location: filters.location,
        categoryId: filters.categoryId === "all" ? "" : filters.categoryId,
        minBudget: filters.minBudget,
        maxBudget: filters.maxBudget,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        page: filters.page,
        limit: initialLimit,
        workerName: filters.workerName || undefined,
        workerEmail: filters.workerEmail || undefined,
      });
      setProviders(response.data.data);
      setTotal(response.data.meta.total);
      setTotalPages(response.data.meta.totalPages);
    } catch (err: any) {
      console.error("Failed to fetch posts:", err);
      setError(err.message || "Failed to load providers");
    } finally {
      setLoading(false);
    }
  }, [filters, initialLimit, isInitialized]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const updateFilter = useCallback((key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "page" ? { page: 1 } : {}), // Reset to page 1 on filter change
    }));
  }, []);

  const setSearch = (search: string) => updateFilter("search", search);
  const setLocation = (location: string) => updateFilter("location", location);
  const setCategory = (categoryId: string) => updateFilter("categoryId", categoryId);
  const setPage = (page: number) => updateFilter("page", page);
  const setWorkerName = (workerName: string) => updateFilter("workerName", workerName);
  const setWorkerEmail = (workerEmail: string) => updateFilter("workerEmail", workerEmail);
  const resetFilters = () => setFilters(initialFilters);
  
  const setSortBy = (sortOption: string) => {
    // Map the old provider sort options to backend parameters
    let sortBy = "createdAt";
    let sortOrder: "asc" | "desc" = "desc";
    
    if (sortOption === "lowest_price") {
      sortBy = "budget";
      sortOrder = "asc";
    } else if (sortOption === "highest_price") {
      sortBy = "budget";
      sortOrder = "desc";
    } else if (sortOption === "highest_rated") {
      sortBy = "createdAt";
      sortOrder = "desc"; // Default fallback
    }

    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
      page: 1,
    }));
  };

  const setFiltersDirectly = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      ...(newFilters.page === undefined ? { page: 1 } : {})
    }));
  };

  return {
    providers,
    total,
    totalPages,
    currentPage: filters.page,
    filters,
    loading,
    error,
    setSearch,
    setLocation,
    setCategory,
    setSortBy,
    setPage,
    setWorkerName,
    setWorkerEmail,
    resetFilters,
    setFilters: setFiltersDirectly,
    refresh: fetchPosts
  };
}
