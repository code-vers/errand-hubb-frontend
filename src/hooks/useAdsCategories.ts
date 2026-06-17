"use client";

import { useState, useEffect } from "react";
import { adsService } from "@/services/ads.service";

export function useAdsCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await adsService.getCategories();
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch ads categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading };
}
