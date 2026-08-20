"use client";

import React, { useState, useMemo } from "react";
import PageHeader from "../../common/PageHeader";
import Pagination from "@/components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { categoryService } from "@/services/category.service";
import { Search, Loader2, Calendar, MapPin, MessageSquare, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/configs/api.config";
import { useConnect } from "@/hooks/useConnect";

export default function AvailableJobsPage() {
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
    queryKey: ["available-job-posts", filters],
    queryFn: async () => {
      const res = await postService.findAll({
        ...filters,
        categoryId: filters.categoryId === "all" ? undefined : filters.categoryId,
        location: filters.location || undefined,
        search: filters.search || undefined,
        userRole: "client", // Only get posts posted by clients
        status: "available",
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

  const { connect, isConnecting } = useConnect();
  const [connectingPostId, setConnectingPostId] = useState<string | null>(null);

  const handleContactClient = async (clientUserId: string, postId: string) => {
    if (!clientUserId) return;
    setConnectingPostId(postId);
    try {
      await connect(clientUserId);
    } finally {
      setConnectingPostId(null);
    }
  };

  const activeCategory = filters.categoryId;

  return (
    <div className="min-h-screen py-4 sm:py-5 px-3 sm:px-6 md:px-12 font-sans bg-surface-dim">
      <div className="mx-auto flex flex-col gap-4 sm:gap-5 max-w-7xl">
        <div className="flex justify-between items-center">
          <PageHeader title="Available Jobs" />
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative flex items-center min-w-0">
              <span className="absolute left-4 text-orange-500">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search jobs by title or keywords..."
                className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-xs sm:text-sm placeholder:text-gray-400"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    updateFilter("search", "");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200/60 transition-all cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="w-full md:w-64 relative flex items-center">
              <input
                type="text"
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
                placeholder="Location (City/State)"
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-xs sm:text-sm placeholder:text-gray-400"
              />
              {filters.location && (
                <button
                  type="button"
                  onClick={() => updateFilter("location", "")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200/60 transition-all cursor-pointer"
                  aria-label="Clear location"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-primary hover:bg-primary/95 transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
            >
              Search
            </button>
          </form>

          {/* Category Tabs Horizontal Scroll */}
          <div className="border-t border-gray-50 pt-3 sm:pt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full max-w-full">
            <button
              onClick={() => updateFilter("categoryId", "all")}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
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
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
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
            <p className="mt-4 text-muted text-sm">Finding available jobs...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 sm:p-16 text-center shadow-sm border border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">No jobs found</h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-xs mx-auto">
              No client job posts match the current filters or search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((post: any) => {
              const categoryColor = post.category?.color || "#FF7A2F";
              const client = post.user || {};
              const clientName = `${client.firstName || ""} ${client.lastName || ""}`.trim() || "Client";

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between border border-gray-50 hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
                >
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-start gap-2">
                      <span
                        className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider truncate max-w-[150px]"
                        style={{
                          backgroundColor: `${categoryColor}15`,
                          color: categoryColor,
                        }}
                      >
                        {post.category?.name || "General"}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-green-50 text-green-600 uppercase shrink-0">
                        Available
                      </span>
                    </div>

                    <div>
                      <h3 className="card-title text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 leading-tight truncate">
                        {post.title}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 truncate">
                        Posted by {clientName}
                      </p>
                    </div>
                  </div>

                  {post.imageUrl && (
                    <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-50 border border-gray-100">
                      <img src={getImageUrl(post.imageUrl)} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <p className="text-xs sm:text-[13px] text-[#6B6B6B] mb-4 sm:mb-5 leading-relaxed line-clamp-3 whitespace-pre-line">
                    {post.description}
                  </p>

                  <div className="mb-4 sm:mb-5">
                    <span className="text-[10px] font-medium text-[#6B6B6B] uppercase block">
                      Reward
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-orange-500 truncate">
                      {post.budget ? `$${post.budget}` : "Flexible"}
                    </span>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-[#F5E9D3] text-[10px] text-[#6B6B6B] space-y-2 mb-4">
                    <div className="flex justify-between items-center gap-2">
                      <span className="flex items-center gap-1 min-w-0 truncate">
                        <Calendar className="w-3 h-3 text-[#FF5A3C] shrink-0" />
                        <span className="truncate">
                          {post.dateNeeded
                            ? new Date(post.dateNeeded).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Flexible Date"}
                        </span>
                      </span>
                      {post.time && <span className="text-gray-500 font-bold shrink-0">{post.time}</span>}
                    </div>
                    <div className="flex items-center gap-1 min-w-0 truncate">
                      <MapPin className="w-3 h-3 text-[#FF5A3C] shrink-0" />
                      <span className="truncate">
                        {post.city}
                        {post.state ? `, ${post.state}` : ""}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleContactClient(post.user?.id || post.userId, post.id)}
                    disabled={isConnecting && connectingPostId === post.id}
                    className="w-full py-2.5 sm:py-3 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary/95 transition-all text-center flex items-center justify-center gap-1 shadow-md shadow-orange-500/10 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isConnecting && connectingPostId === post.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <MessageSquare size={14} />
                        Connect
                      </>
                    )}
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
