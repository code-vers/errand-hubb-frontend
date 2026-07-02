"use client";

import React, { useState } from "react";
import PageHeader from "../../common/PageHeader";
import Pagination from "@/components/common/Pagination";
import { useClientRequests } from "./useClientRequests";
import ClientRequestCard from "./ClientRequestCard";
import { Search, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import { useRouter } from "next/navigation";
import { URGENCY_LEVELS } from "@/types/serviceRequest";

export default function ClientRequestsPage() {
  const router = useRouter();
  const {
    requests,
    meta,
    loading,
    filters,
    updateFilter,
    contactClient,
    isContacting,
  } = useClientRequests();

  const { data: categories } = useQuery({
    queryKey: ["categories-active"],
    queryFn: () => categoryService.getActive(),
  });

  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter("search", searchInput);
  };

  const activeCategory = filters.categoryId;

  return (
    <div className="min-h-screen py-5 px-12 font-sans bg-surface-dim">
      <div className="mx-auto flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <PageHeader title="Available Client Requests" />
        </div>

        {/* Filters and search section */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative flex items-center">
              <span className="absolute left-4 text-orange-500">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search requests by keywords..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-sm placeholder:text-gray-400"
              />
            </div>

            <div className="w-full md:w-48">
              <input
                type="text"
                value={filters.city}
                onChange={(e) => updateFilter("city", e.target.value)}
                placeholder="City/State"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-sm placeholder:text-gray-400"
              />
            </div>

            <div className="w-full md:w-48">
              <select
                value={filters.urgencyLevel}
                onChange={(e) => updateFilter("urgencyLevel", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-sm text-gray-700"
              >
                <option value="">Any Urgency</option>
                {URGENCY_LEVELS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary/95 transition-all shadow-sm active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Categories Horizontal Scroller */}
          <div className="border-t border-gray-50 pt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => updateFilter("categoryId", "all")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-gray-50 text-gray-500 border border-gray-100 hover:border-orange-200"
              }`}
            >
              All Categories
            </button>
            {categories?.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => updateFilter("categoryId", cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "text-white shadow-sm"
                    : "bg-gray-50 text-gray-500 border border-gray-100 hover:border-orange-200"
                }`}
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: cat.color || "#FF7A2F" }
                    : undefined
                }
              >
                {cat.iconType === "emoji" ? cat.icon + " " : ""}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results grid */}
        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted">Finding client requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">No requests found</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto">
              We couldn't find any available service requests matching your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req: any) => (
              <ClientRequestCard
                key={req.id}
                request={req}
                isContacting={isContacting}
                onContact={() => contactClient(req.id)}
                onViewDetail={() => router.push(`/dashboard/client-requests/${req.id}`)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-4">
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            onPageChange={(p) => updateFilter("page", p)}
          />
        </div>
      </div>
    </div>
  );
}
