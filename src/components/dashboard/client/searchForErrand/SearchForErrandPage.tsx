"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import PageHeader from "../../common/PageHeader";
import CategoryFilters from "./CategoryFilters";
import Pagination from "@/components/common/Pagination";
import ProviderGrid from "./ProviderGrid";
import SearchBar from "./SearchBar";
import { useProviders } from "./useProviders";
import ImageGalleryModal from "@/components/common/ImageGalleryModal";
import ProviderDetailsModal from "./ProviderDetailsModal";

const SortDropdown = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "highest_rated", label: "Highest Rated" },
    { value: "lowest_price", label: "Lowest Price" },
    { value: "highest_price", label: "Highest Price" },
    { value: "most_jobs", label: "Most Jobs" },
  ];

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Highest Rated";

  return (
    <div className='relative shrink-0 w-full md:w-[200px]'>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between bg-white border border-gray-200 text-text-placeholder font-normal hover:border-primary hover:text-primary px-4 py-2.5 rounded-lg text-[12px] transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer'>
        <span>Sort: {selectedLabel}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Custom Dropdown */}
      {isOpen && (
        <div className='absolute top-13 left-0 w-full bg-white rounded-xl shadow-lg border border-gray-100  z-50 overflow-hidden'>
          {/* Highlighted Selected Item */}
          <div className='px-4 py-2.5 bg-warning-light text-[#EC6F27] text-[14px] font-bold  rounded-t-lg '>
            {selectedLabel}
          </div>

          {/* Other Options */}
          <div className='mt-1'>
            {options
              .filter((opt) => opt.value !== value)
              .map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className='px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors mx-1 rounded-lg'>
                  {option.label}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SearchForErrandPage = () => {
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
    setWorkerName,
    setWorkerEmail,
  } = useProviders();

  const [activeGallery, setActiveGallery] = useState<string[] | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);

  return (
    <div className='min-h-screen py-4 sm:py-5 px-3 sm:px-6 md:px-12 font-sans'>
      <div className='mx-auto flex flex-col gap-3.5'>
        <PageHeader title='Search For Errand' />

        <div className='mx-auto w-full mt-2 sm:mt-4'>
          {/* Search Section */}
          <div className='mb-4 sm:mb-6'>
            <SearchBar
              onSearch={setSearch}
              onWorkerNameSearch={setWorkerName}
              onWorkerEmailSearch={setWorkerEmail}
            />
          </div>

          {/* Category Filter Pills & Sort Dropdown */}
          <div className='mb-6 sm:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4'>
            <div className='overflow-x-auto pb-1 scrollbar-hide flex-1 w-full max-w-full'>
              <CategoryFilters
                selectedCategory={filters.categoryId}
                onCategoryChange={setCategory}
              />
            </div>

            {/* Custom Sort Dropdown */}
            <div className='w-full md:w-auto shrink-0'>
              <SortDropdown value={filters.sortBy} onChange={setSortBy} />
            </div>
          </div>

          {/* Provider Grid */}
          <ProviderGrid 
            providers={providers} 
            loading={loading} 
            error={error} 
            onOpenGallery={setActiveGallery}
            onOpenDetails={setSelectedProvider}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
      
      {/* Gallery Modal */}
      <ImageGalleryModal
        images={activeGallery || []}
        isOpen={!!activeGallery}
        onClose={() => setActiveGallery(null)}
      />

      {/* Provider Details Modal */}
      <ProviderDetailsModal
        isOpen={!!selectedProvider}
        onClose={() => setSelectedProvider(null)}
        provider={selectedProvider}
        onOpenGallery={setActiveGallery}
      />
    </div>
  );
};

export default SearchForErrandPage;
