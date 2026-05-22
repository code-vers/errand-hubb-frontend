import React from "react";
import { SearchFilterProps } from "@/types/post";
import { Search, Filter, X } from "lucide-react";

const PostSearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
  activeFilters = 0,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onSearchChange("");
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
      {/* Search Input */}
      <div className='relative w-full max-w-md'>
        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
          <Search className='h-5 w-5 text-primary' strokeWidth={2} />
        </div>
        <input
          id='post-search'
          name='post-search'
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className='w-full pl-10 pr-4 py-2.5 bg-transparent border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm placeholder-muted transition-shadow'
          placeholder='Search posts..'
          aria-label='Search posts'
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className='absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-foreground'
            aria-label='Clear search'>
            <X className='h-4 w-4' strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Filter Button */}
      <button
        type='button'
        onClick={onFilterClick}
        className='px-5 py-2.5 bg-transparent border border-primary text-primary rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors'
        aria-label={`Filter posts${activeFilters > 0 ? ` (${activeFilters} active)` : ""}`}>
        <Filter className='h-4 w-4' strokeWidth={2} />
        Filter
        {activeFilters > 0 && (
          <span className='ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5'>
            {activeFilters}
          </span>
        )}
      </button>
    </div>
  );
};

export default PostSearchFilter;
