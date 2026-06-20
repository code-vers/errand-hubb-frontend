"use client";

import React, { useState, useMemo } from "react";
import PageHeader from "../../common/PageHeader";
import Pagination from "@/components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { categoryService } from "@/services/category.service";
import { Search, Loader2, Calendar, MapPin, MessageSquare, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getImageUrl } from "@/configs/api.config";

export default function AvailableErrandsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "all",
    location: "",
    page: 1,
    limit: 9,
  });

  const [searchInput, setSearchInput] = useState("");

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  const { data: categories } = useQuery({
    queryKey: ["categories-active"],
    queryFn: () => categoryService.getActive(),
  });

  // Query general posts posted by clients
  const { data: response, isLoading: loading } = useQuery({
    queryKey: ["available-errand-posts", filters],
    queryFn: async () => {
      const res = await postService.findAll({
        ...filters,
        categoryId: filters.categoryId === "all" ? undefined : filters.categoryId,
        location: filters.location || undefined,
        search: filters.search || undefined,
        userRole: "client", // Only get posts posted by clients
      });
      return res.data;
    },
  });

  const posts = useMemo(() => response?.data || [], [response]);
  const meta = useMemo(() => response?.meta || { total: 0, page: 1, limit: 9, totalPages: 1 }, [response]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter("search", searchInput);
  };

  const handleContactClient = (clientUserId: string) => {
    // Redirect to messages page with query param errandId.
    // The ChatContainer frontend will automatically start the conversation.
    // If the provider doesn't have a subscription, the backend startConversation endpoint
    // will throw SUBSCRIPTION_REQUIRED, which will automatically redirect the provider to /dashboard/subscription.
    router.push(`/dashboard/messages?errandId=${clientUserId}`);
  };

  const activeCategory = filters.categoryId;

  return (
    <div className="min-h-screen py-5 px-12 font-sans bg-surface-dim">
      <div className="mx-auto flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <PageHeader title="Available Errands (Client Posts)" />
        </div>

        {/* Filter and Search Section */}
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
                placeholder="Search errands by title or keywords..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-sm placeholder:text-gray-400"
              />
            </div>

            <div className="w-full md:w-64">
              <input
                type="text"
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
                placeholder="Location (City/State)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-sm placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary/95 transition-all shadow-sm active:scale-95 animate-fade-in"
            >
              Search
            </button>
          </form>

          {/* Category Tabs Horizontal Scroll */}
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
            <p className="mt-4 text-muted">Finding available errands...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">No errands found</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto">
              No client errand posts match the current filters or search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => {
              const categoryColor = post.category?.color || "#FF7A2F";
              const client = post.user || {};
              const clientName = `${client.firstName || ""} ${client.lastName || ""}`.trim() || "Client";

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between border border-gray-50 hover:shadow-md transition-shadow duration-300 relative"
                >
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-start">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${categoryColor}15`,
                          color: categoryColor,
                        }}
                      >
                        {post.category?.name || "General"}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-green-50 text-green-600 uppercase">
                        Available
                      </span>
                    </div>

                    <div>
                      <h3 className="card-title text-sm font-bold text-gray-900 line-clamp-1 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                        Posted by {clientName}
                      </p>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#6B6B6B] mb-5 leading-[20px] line-clamp-3 h-15">
                    {post.description}
                  </p>

                  <div className="mb-5">
                    <span className="text-[10px] font-medium text-[#6B6B6B] uppercase block">
                      Reward
                    </span>
                    <span className="text-xl font-bold text-orange-500">
                      {post.budget ? `$${post.budget}` : "Flexible"}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[#F5E9D3] text-[10px] text-[#6B6B6B] space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#FF5A3C]" />
                        {post.dateNeeded
                          ? new Date(post.dateNeeded).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Flexible Date"}
                      </span>
                      {post.time && <span className="text-gray-500 font-bold">{post.time}</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF5A3C]" />
                      <span>
                        {post.city}
                        {post.state ? `, ${post.state}` : ""}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleContactClient(post.userId)}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary/95 transition-all text-center flex items-center justify-center gap-1 shadow-md shadow-orange-500/10 active:scale-[0.98]"
                  >
                    <MessageSquare size={14} />
                    Connect
                  </button>
                </article>
              );
            })}
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
