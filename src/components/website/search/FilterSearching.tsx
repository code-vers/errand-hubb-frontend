"use client";
import { useState } from "react";
import { SearchFilters } from "@/types/search";

interface FilterSearchingProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
}

const FilterSearching = ({
  onSearch,
  initialFilters,
}: FilterSearchingProps) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearchClick = () => {
    onSearch(filters);
  };

  return (
    <div className=' max-w-7xl mx-auto'>
      {/* Search Card */}
      <div className='bg-white rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-5 px-6 flex flex-col md:flex-row items-start md:items-end gap-4 w-full'>
        {/* Type of Errand */}
        <div className='flex flex-col gap-1.5 flex-1 w-full'>
          <label
            htmlFor='errand-type'
            className='text-[10px] font-bold text-gray-500 uppercase tracking-wider'>
            Type of Errand
          </label>
          <input
            id='errand-type'
            type='text'
            value={filters.errandType}
            onChange={(e) => handleInputChange("errandType", e.target.value)}
            className='h-9.5 w-full border border-gray-200 rounded-md px-3 text-[13px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors'
          />
        </div>

        {/* City */}
        <div className='flex flex-col gap-1.5 flex-1 w-full'>
          <label
            htmlFor='city'
            className='text-[10px] font-bold text-gray-500 uppercase tracking-wider'>
            City
          </label>
          <input
            id='city'
            type='text'
            placeholder='Enter city...'
            value={filters.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className='h-9.5 w-full border border-gray-200 rounded-md px-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors'
          />
        </div>

        {/* State */}
        <div className='flex flex-col gap-1.5 flex-1 w-full'>
          <label
            htmlFor='state'
            className='text-[10px] font-bold text-gray-500 uppercase tracking-wider'>
            State
          </label>
          <input
            id='state'
            type='text'
            value={filters.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className='h-9.5 w-full border border-gray-200 rounded-md px-3 text-[13px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors'
          />
        </div>

        {/* Search Button */}
        <div className='w-full md:w-auto pt-5.5 md:pt-0'>
          <button
            type='button'
            onClick={handleSearchClick}
            className='h-9.5 w-full md:w-auto bg-primary active:scale-95 text-white font-bold text-[11px] uppercase tracking-wider px-8 rounded-md transition-all duration-200 shadow-sm flex items-center justify-center'>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSearching;
