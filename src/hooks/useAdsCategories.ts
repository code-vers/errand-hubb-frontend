"use client";

import { useState, useEffect } from "react";
import { adsService } from "@/services/ads.service";

export function useAdsCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: any = await adsService.getCategories();
        const catsList = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.data?.data)
              ? response.data.data
              : [];
        setCategories(catsList);
      } catch (err) {
        console.error("Failed to fetch ads categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading };
}
