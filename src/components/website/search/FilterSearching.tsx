"use client";
import { SearchFilters } from "@/types/search";
import { useState, useEffect } from "react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/categories";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

const STATIC_CATEGORIES: Category[] = [
  { id: "ee522b07-c43e-4136-bcac-bba637a47928", name: "Grocery Shopping", icon: "🛒", iconType: "emoji", color: "#ec6f27", description: "Get your groceries delivered to your doorstep without any hassle.", status: "active" },
  { id: "fast-delivery-id", name: "Fast Delivery", icon: "📦", iconType: "emoji", color: "#3b82f6", description: "Swift and secure delivery of your packages anywhere in the city.", status: "active" },
  { id: "pharmacy-pickup-id", name: "Pharmacy Pickup", icon: "💊", iconType: "emoji", color: "#ef4444", description: "We'll pick up your prescriptions and health essentials for you.", status: "active" },
  { id: "laundry-services-id", name: "Laundry Services", icon: "🧺", iconType: "emoji", color: "#8b5cf6", description: "Professional laundry pickup and delivery at your convenience.", status: "active" },
  { id: "7973dcf1-5c54-4552-bafa-3b40c7a4206e", name: "Personal Transport", icon: "🚗", iconType: "emoji", color: "#10b981", description: "Safe and reliable transport for you or your important items.", status: "active" },
  { id: "pet-care-id", name: "Pet Care", icon: "🐾", iconType: "emoji", color: "#ec4899", description: "Walking, feeding, and caring for your furry friends.", status: "active" },
  { id: "document-handling-id", name: "Document Handling", icon: "📄", iconType: "emoji", color: "#6b7280", description: "Safe transport and filing of your important documents.", status: "active" },
  { id: "eb85c380-73a9-463e-b8f4-708c3140fac9", name: "Food Pickup", icon: "🍔", iconType: "emoji", color: "#f59e0b", description: "Your favorite meals from any restaurant delivered hot.", status: "active" },
  { id: "handyman-help-id", name: "Handyman Help", icon: "🧰", iconType: "emoji", color: "#063b5c", description: "Expert help for small repairs and home maintenance tasks.", status: "active" },
  { id: "personal-shopping-id", name: "Personal Shopping", icon: "🛍️", iconType: "emoji", color: "#ec6f27", description: "Someone to do your shopping and finding the best deals.", status: "active" },
  { id: "wait-in-line-id", name: "Wait in Line", icon: "🧍", iconType: "emoji", color: "#3b82f6", description: "We'll wait in line for you at the DMV, concerts, or any event.", status: "active" },
  { id: "mail-post-id", name: "Mail & Post", icon: "📮", iconType: "emoji", color: "#22c55e", description: "Handling your mail, stamps, and post office errands.", status: "active" }
];

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
      workerEmail: "",
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
      <div className='bg-white rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-4 md:p-6 flex flex-col w-full'>
        {/* Mobile Toggle Header */}
        <div 
          className='flex md:hidden justify-between items-center cursor-pointer select-none'
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <div className='flex items-center gap-2 text-primary'>
            <Filter size={18} />
            <span className='font-bold text-[14px] uppercase tracking-wider'>Search Filters</span>
          </div>
          {isMobileFilterOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
        </div>

        {/* Filter Content */}
        <form onSubmit={handleSearchSubmit} className={`${isMobileFilterOpen ? 'flex mt-4' : 'hidden'} md:flex flex-col gap-4 w-full`}>
          {/* Top Row: Search, Category, Location */}
          <div className='flex flex-col md:flex-row items-end gap-4 w-full'>
          {/* Keyword Search */}
          <div className='flex flex-col gap-1.5 flex-1 w-full'>
            <label
              htmlFor='search'
              className='text-[12px] font-bold text-[#555555] uppercase tracking-wider'>
              What do you need help with?
            </label>
            <input
              id='search'
              type='text'
              placeholder='e.g. Delivery, Cleaning, Tech Support'
              value={filters.search}
              onChange={(e) => handleInputChange("search", e.target.value)}
              className='h-10 w-full border border-gray-200 rounded-md px-3 text-[13px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors'
            />
          </div>

          {/* Category Dropdown */}
          <div className='flex flex-col gap-1.5 flex-1 w-full'>
            <label
              htmlFor='category'
              className='text-[12px] font-bold text-[#555555] uppercase tracking-wider'>
              Category
            </label>
            <select
              id='category'
              value={filters.categoryId}
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
              className='h-10 w-full border border-gray-200 rounded-md px-3 text-[13px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors bg-white'
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
          <div className='flex flex-col gap-1.5 flex-1 w-full'>
            <label
              htmlFor='location'
              className='text-[12px] font-bold text-[#555555] uppercase tracking-wider'>
              Location
            </label>
            <input
              id='location'
              type='text'
              placeholder='City or State...'
              value={filters.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className='h-10 w-full border border-gray-200 rounded-md px-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors'
            />
          </div>
        </div>

        {/* Worker Search Row: Name and Email */}
        <div className='flex flex-col md:flex-row items-end gap-4 w-full mt-2 border-t border-gray-100 pt-4'>
          <div className='flex flex-col gap-1.5 flex-1 w-full'>
            <label
              htmlFor='workerName'
              className='text-[12px] font-bold text-[#555555] uppercase tracking-wider'>
              Worker Name
            </label>
            <input
              id='workerName'
              type='text'
              placeholder='e.g. John Smith'
              value={filters.workerName || ""}
              onChange={(e) => handleInputChange("workerName", e.target.value)}
              className='h-10 w-full border border-gray-200 rounded-md px-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors'
            />
          </div>

          <div className='flex flex-col gap-1.5 flex-1 w-full'>
            <label
              htmlFor='workerEmail'
              className='text-[12px] font-bold text-[#555555] uppercase tracking-wider'>
              Worker Email
            </label>
            <input
              id='workerEmail'
              type='email'
              placeholder='e.g. john@example.com'
              value={filters.workerEmail || ""}
              onChange={(e) => handleInputChange("workerEmail", e.target.value)}
              className='h-10 w-full border border-gray-200 rounded-md px-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors'
            />
          </div>
        </div>

        {/* Bottom Row: Budget, Sorting, Buttons */}
        <div className='flex flex-col md:flex-row items-end gap-4 w-full mt-2 border-t border-gray-100 pt-4'>
          {/* Budget Range */}
          <div className='flex flex-1 gap-2'>
            <div className='flex flex-col gap-1.5 flex-1'>
              <label className='text-[10px] font-bold text-[#555555] uppercase tracking-wider'>Min Budget ($)</label>
              <input
                type='number'
                placeholder='Min'
                value={filters.minBudget}
                onChange={(e) => handleInputChange("minBudget", e.target.value)}
                className='h-9 w-full border border-gray-200 rounded-md px-2 text-[13px] focus:ring-1 focus:ring-primary focus:border-primary'
              />
            </div>
            <div className='flex flex-col gap-1.5 flex-1'>
              <label className='text-[10px] font-bold text-[#555555] uppercase tracking-wider'>Max Budget ($)</label>
              <input
                type='number'
                placeholder='Max'
                value={filters.maxBudget}
                onChange={(e) => handleInputChange("maxBudget", e.target.value)}
                className='h-9 w-full border border-gray-200 rounded-md px-2 text-[13px] focus:ring-1 focus:ring-primary focus:border-primary'
              />
            </div>
          </div>

          {/* Sorting */}
          <div className='flex flex-col gap-1.5 flex-1 w-full'>
            <label className='text-[10px] font-bold text-[#555555] uppercase tracking-wider'>Sort By</label>
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split('-');
                setFilters((prev) => ({ ...prev, sortBy: by, sortOrder: order as "asc" | "desc" }));
              }}
              className='h-9 w-full border border-gray-200 rounded-md px-2 text-[13px] focus:ring-1 focus:ring-primary bg-white'
            >
              <option value='createdAt-desc'>Newest First</option>
              <option value='createdAt-asc'>Oldest First</option>
              <option value='budget-desc'>Highest Budget</option>
              <option value='budget-asc'>Lowest Budget</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-2 w-full md:w-auto mt-4 md:mt-0'>
            <button
              type='button'
              onClick={handleReset}
              className='h-9 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[11px] uppercase tracking-wider rounded-md transition-all duration-200'
            >
              Reset
            </button>
            <button
              type='submit'
              className='h-9 px-8 bg-primary active:scale-95 text-white font-bold text-[11px] uppercase tracking-wider rounded-md transition-all duration-200 shadow-sm'
            >
              Search Errands
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default FilterSearching;
