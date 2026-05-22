import React from "react";
import { SearchFilterProps } from "@/types/users";
import { Search, Filter, X } from "lucide-react";

const UserSearchFilter: React.FC<SearchFilterProps> = ({
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
    <section className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
      {/* Search Input */}
      <div className='relative w-full sm:max-w-xs'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search className='h-5 w-5 text-primary' strokeWidth={2} />
        </div>
        <input
          id='user-search'
          name='user-search'
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className='block w-full pl-10 pr-3 py-2 border border-primary/30 rounded-md leading-5 bg-white placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-200'
          placeholder='Search clients...'
          aria-label='Search clients'
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className='absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-gray-600'
            aria-label='Clear search'>
            <X className='h-4 w-4' strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Filter Button */}
      <button
        type='button'
        onClick={onFilterClick}
        className='inline-flex items-center px-4 py-2 border border-primary/30 rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200'
        aria-label={`Filter users${activeFilters > 0 ? ` (${activeFilters} active)` : ""}`}>
        <Filter className='-ml-1 mr-2 h-5 w-5 text-orange-400' strokeWidth={2} />
        Filter
        {activeFilters > 0 && (
          <span className='ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5'>
            {activeFilters}
          </span>
        )}
      </button>
    </section>
  );
};

export default UserSearchFilter;
