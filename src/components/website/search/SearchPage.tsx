"use client";
import { useState, useEffect } from "react";
import FilterSearching from "./FilterSearching";
import SearchResult from "./SearchResult";
import { SearchFilters, PaginatedResponse, Post } from "@/types/search";
import { postService } from "@/services/post.service";
import Pagination from "@/components/common/Pagination";
import { Loader2 } from "lucide-react";

const SearchPage = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    categoryId: "all",
    location: "",
    minBudget: "",
    maxBudget: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  
  const [data, setData] = useState<PaginatedResponse<Post> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async (currentFilters: SearchFilters, currentPage: number) => {
    setIsLoading(true);
    try {
      const response = await postService.findAll({
        ...currentFilters,
        page: currentPage,
        limit,
      });
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch and fetch when page changes
  useEffect(() => {
    fetchPosts(filters, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page on new search
    fetchPosts(newFilters, 1);
  };

  return (
    <div className='bg-[#f4f5f7] min-h-screen pt-12 pb-8'>
      <div className='max-w-7xl mx-auto px-4 flex flex-col gap-8'>
        <FilterSearching onSearch={handleSearch} initialFilters={filters} />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-bold text-gray-800">
                {data?.meta.total || 0} Errands Found
              </h2>
            </div>
            
            <SearchResult posts={data?.data || []} />
            
            {data?.meta && data.meta.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={data.meta.page}
                  totalPages={data.meta.totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
