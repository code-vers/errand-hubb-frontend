"use client";
import { useEffect } from "react";
import FilterSearching from "./FilterSearching";
import SearchResult from "./SearchResult";
import { SearchFilters } from "@/types/search";
import Pagination from "@/components/common/Pagination";
import { Loader2, AlertCircle } from "lucide-react";
import { useProviders } from "@/hooks/useProviders";

const SearchPage = () => {
  const {
    providers: posts,
    loading: isLoading,
    error: isError,
    total: totalItems,
    totalPages,
    currentPage: page,
    filters,
    setPage,
    setFilters
  } = useProviders(10);

  const handleSearch = (newFilters: SearchFilters) => {
    // Transform SearchFilters (frontend) to SearchFilters (hook)
    // Actually they are almost same now
    setFilters(newFilters);
  };

  return (
    <div className='bg-[#f4f5f7] min-h-screen pt-12 pb-8'>
      <div className='max-w-7xl mx-auto px-4 flex flex-col gap-8'>
        <FilterSearching onSearch={handleSearch} initialFilters={filters as any} />

        {isLoading ? (
          <div className='flex justify-center items-center py-20'>
            <Loader2 className='w-10 h-10 animate-spin text-primary' />
          </div>
        ) : isError ? (
          <div className='flex flex-col items-center justify-center py-20 gap-4 text-center'>
            <AlertCircle className='w-12 h-12 text-red-500' />
            <h2 className='text-xl font-bold'>Error searching errands</h2>
            <p className='text-gray-500'>{isError}</p>
            <button
              onClick={() => window.location.reload()}
              className='px-6 py-2 bg-primary text-white rounded-md font-bold'>
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className='flex justify-between items-center px-2'>
              <h2 className='text-xl font-bold text-gray-800'>
                {totalItems} Errands Found
              </h2>
            </div>

            <SearchResult posts={posts} />

            {totalPages > 1 && (
              <div className='mt-8'>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
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
