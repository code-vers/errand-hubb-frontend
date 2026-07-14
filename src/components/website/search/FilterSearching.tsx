"use client";
import { SearchFilters } from "@/types/search";
import { useState, useEffect } from "react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/categories";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

import { STATIC_CATEGORIES } from "@/constants/categories";

interface FilterSearchingProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
}

const FilterSearching = ({
  onSearch,
  initialFilters,
}: FilterSearchingProps) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getActive();
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(STATIC_CATEGORIES);
        }
      } catch (error) {
        console.error("Failed to load categories, using fallback static categories", error);
        setCategories(STATIC_CATEGORIES);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearchClick = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const defaultFilters: SearchFilters = {
      search: "",
      categoryId: "all",
      location: "",
      minBudget: "",
      maxBudget: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      workerName: "",
    };
    setFilters(defaultFilters);
    onSearch(defaultFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchClick();
  };

  return (
    <div className='max-w-7xl mx-auto w-full'>
      <div className='bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden w-full transition-all duration-300'>
        {/* Mobile Toggle Header */}
        <div 
          className='flex md:hidden justify-between items-center cursor-pointer select-none p-4 bg-gray-50 hover:bg-gray-100/50 border-b border-gray-100 transition-colors'
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <div className='flex items-center gap-2 text-primary'>
            <Filter size={18} />
            <span className='font-bold text-[13px] uppercase tracking-wider text-gray-700'>Search Filters</span>
          </div>
          {isMobileFilterOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
        </div>

        {/* Filter Content */}
        <form 
          onSubmit={handleSearchSubmit} 
          className={`${isMobileFilterOpen ? 'flex' : 'hidden'} md:flex flex-col p-5 md:p-6 gap-6 w-full`}
        >
          {/* Grid Layout for Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6'>
            
            {/* Keyword Search */}
            <div className='flex flex-col gap-1.5 lg:col-span-2'>
              <label htmlFor='search' className='text-[11px] font-bold text-[#555555] uppercase tracking-wider'>
                What do you need help with?
              </label>
              <input
                id='search'
                type='text'
                placeholder='e.g. Delivery, Cleaning, Tech Support'
                value={filters.search}
                onChange={(e) => handleInputChange("search", e.target.value)}
                className='h-10 w-full border border-gray-200 rounded-lg px-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              />
            </div>

            {/* Category Dropdown */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor='category' className='text-[11px] font-bold text-[#555555] uppercase tracking-wider'>
                Category
              </label>
              <select
                id='category'
                value={filters.categoryId}
                onChange={(e) => handleInputChange("categoryId", e.target.value)}
                className='h-10 w-full border border-gray-200 rounded-lg px-3 text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white cursor-pointer'
              >
                <option value='all'>All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor='location' className='text-[11px] font-bold text-[#555555] uppercase tracking-wider'>
                Location
              </label>
              <input
                id='location'
                type='text'
                placeholder='City or State...'
                value={filters.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className='h-10 w-full border border-gray-200 rounded-lg px-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              />
            </div>

            {/* Worker Details */}
            <div className='flex flex-col gap-1.5 lg:col-span-2'>
              <label htmlFor='workerName' className='text-[11px] font-bold text-[#555555] uppercase tracking-wider'>
                Worker Details (Name or Email)
              </label>
              <input
                id='workerName'
                type='text'
                placeholder='e.g. John Smith or john@example.com'
                value={filters.workerName || ""}
                onChange={(e) => handleInputChange("workerName", e.target.value)}
                className='h-10 w-full border border-gray-200 rounded-lg px-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              />
            </div>

            {/* Max Budget Slider */}
            <div className='flex flex-col gap-1.5 justify-center'>
              <label className='text-[11px] font-bold text-[#555555] uppercase tracking-wider flex justify-between items-center'>
                <span>Max Budget</span>
                <span className="text-primary font-extrabold text-[13px]">${filters.maxBudget || "500"}</span>
              </label>
              <div className="h-10 flex items-center px-1">
                <input
                  type='range'
                  min='5'
                  max='500'
                  step='5'
                  value={filters.maxBudget || "500"}
                  onChange={(e) => handleInputChange("maxBudget", e.target.value)}
                  className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary'
                />
              </div>
            </div>

            {/* Sort By Dropdown */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-[11px] font-bold text-[#555555] uppercase tracking-wider'>
                Sort By
              </label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [by, order] = e.target.value.split('-');
                  setFilters((prev) => ({ ...prev, sortBy: by, sortOrder: order as "asc" | "desc" }));
                }}
                className='h-10 w-full border border-gray-200 rounded-lg px-3 text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white cursor-pointer'
              >
                <option value='createdAt-desc'>Newest First</option>
                <option value='createdAt-asc'>Oldest First</option>
                <option value='budget-desc'>Highest Budget</option>
                <option value='budget-asc'>Lowest Budget</option>
              </select>
            </div>

          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-3 pt-5 border-t border-gray-100 mt-2'>
            <button
              type='button'
              onClick={handleReset}
              className='h-10 px-5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-bold text-[12px] uppercase tracking-wider rounded-lg transition-all duration-200'
            >
              Reset
            </button>
            <button
              type='submit'
              className='h-10 px-8 bg-primary hover:bg-primary/95 active:scale-[0.98] text-white font-bold text-[12px] uppercase tracking-wider rounded-lg transition-all duration-200 shadow-md shadow-primary/20'
            >
              Search Errands
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterSearching;
