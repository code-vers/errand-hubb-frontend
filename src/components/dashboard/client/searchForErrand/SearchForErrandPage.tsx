"use client";

import React, { useState } from "react";
import PageHeader from "../../common/PageHeader";
import SearchBar from "./SearchBar";
import CategoryFilters from "./CategoryFilters";
import ProviderGrid from "./ProviderGrid";
import Pagination from "./Pagination";
import FilterModal from "./FilterModal";
import { useProviders } from "./useProviders";

const SearchForErrandPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const {
    providers,
    totalPages,
    currentPage,
    filters,
    loading,
    error,
    setSearch,
    setCategory,
    setSortBy,
    setPage,
    resetFilters,
  } = useProviders();

  return (
    <div className='min-h-screen py-5 px-12 font-sans'>
      <div className='mx-auto flex flex-col gap-3.5'>
        <PageHeader title='Search For Errand' />

        <div className='max-w-6xl mx-auto w-full mt-4'>
          {/* Search Section */}
          <div className='mb-6'>
            <SearchBar 
              onSearch={setSearch} 
              onFilterOpen={() => setIsFilterModalOpen(true)} 
            />
          </div>

          {/* Category Filter Pills */}
          <div className='mb-8 overflow-x-auto pb-2 scrollbar-hide'>
            <CategoryFilters 
              selectedCategory={filters.category} 
              onCategoryChange={setCategory} 
            />
          </div>

          {/* Provider Grid */}
          <ProviderGrid 
            providers={providers} 
            loading={loading} 
            error={error} 
          />

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setPage} 
          />
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onSortChange={setSortBy}
        onReset={resetFilters}
      />
    </div>
  );
};

export default SearchForErrandPage;
