"use client";

import { ProviderFilters } from "@/types/provider";
import { useCallback, useMemo, useState } from "react";
import { mockProviders } from "./provider";

const initialFilters: ProviderFilters = {
  search: "",
  category: "All",
  sortBy: "highest_rated",
  page: 1,
};

export function useProviders() {
  const [filters, setFilters] = useState<ProviderFilters>(initialFilters);

  const filteredProviders = useMemo(() => {
    let result = [...mockProviders];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower) ||
          p.skills.some((s) => s.toLowerCase().includes(searchLower)),
      );
    }

    // Category filter
    if (filters.category && filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Sorting
    switch (filters.sortBy) {
      case "lowest_price":
        result.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "highest_price":
        result.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case "most_jobs":
        result.sort((a, b) => b.jobCount - a.jobCount);
        break;
      case "highest_rated":
      default:
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [filters]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
  const paginatedProviders = filteredProviders.slice(
    (filters.page - 1) * itemsPerPage,
    filters.page * itemsPerPage,
  );

  const updateFilter = useCallback((key: keyof ProviderFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  }, []);

  const setSearch = (search: string) => updateFilter("search", search);
  const setCategory = (category: string) => updateFilter("category", category);
  const setSortBy = (sortBy: ProviderFilters["sortBy"]) => updateFilter("sortBy", sortBy);
  const setPage = (page: number) => updateFilter("page", page);
  const resetFilters = () => setFilters(initialFilters);

  return {
    providers: paginatedProviders,
    total: filteredProviders.length,
    totalPages,
    currentPage: filters.page,
    filters,
    loading: false,
    error: null,
    setSearch,
    setCategory,
    setSortBy,
    setPage,
    resetFilters,
  };
}
