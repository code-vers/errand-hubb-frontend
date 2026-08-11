"use client";

import { useState, useEffect, useCallback } from "react";
import { adsService } from "@/services/ads.service";

export interface AdsFilters {
  search: string;
  categoryId: string;
  subcategoryId: string;
  location: string;
  page: number;
}

const initialFilters: AdsFilters = {
  search: "",
  categoryId: "",
  subcategoryId: "",
  location: "",
  page: 1,
};

export function useAds(initialLimit: number = 6) {
  const [filters, setFilters] = useState<AdsFilters>(initialFilters);
  const [ads, setAds] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await adsService.findAll({
        search: filters.search,
        categoryId: filters.categoryId,
        subcategoryId: filters.subcategoryId,
        location: filters.location,
        page: filters.page,
        limit: initialLimit,
      });

      const adsList = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.data)
            ? response.data.data
            : [];

      const meta = response?.meta || response?.data?.meta || {};

      setAds(adsList);
      setTotal(meta.total ?? adsList.length);
      setTotalPages(meta.totalPages ?? 1);
    } catch (err: any) {
      console.error("Failed to fetch ads:", err);
      setError(err?.message || "Failed to load ads. Please try again.");
      setAds([]);
    } finally {
      setLoading(false);
    }
  }, [filters, initialLimit]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const updateFilter = useCallback((key: keyof AdsFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  }, []);

  const setSearch = (search: string) => updateFilter("search", search);
  const setCategory = (categoryId: string) => updateFilter("categoryId", categoryId);
  const setSubcategory = (subcategoryId: string) => updateFilter("subcategoryId", subcategoryId);
  const setLocation = (location: string) => updateFilter("location", location);
  const setPage = (page: number) => updateFilter("page", page);
  const resetFilters = () => setFilters(initialFilters);

  return {
    ads,
    total,
    totalPages,
    currentPage: filters.page,
    filters,
    loading,
    error,
    setSearch,
    setCategory,
    setSubcategory,
    setLocation,
    setPage,
    resetFilters,
    refresh: fetchAds,
  };
}
