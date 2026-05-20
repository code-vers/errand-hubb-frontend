"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useState } from "react";

interface SearchBarProps {
  onSearch: (search: string) => void;
  onFilterOpen: () => void;
}

export default function SearchBar({ onSearch, onFilterOpen }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className='w-full' data-purpose='search-bar'>
      <div className='relative flex items-center'>
        <div className='absolute left-4 text-gray-400'>
          <Search size={20} />
        </div>
        <input
          className='w-full pl-12 pr-14 py-3.5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm outline-none transition-all duration-200 text-sm placeholder:text-gray-400'
          placeholder='Search for anything...'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={onFilterOpen}
          className='absolute right-2 p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200'
          title='Filters'>
          <SlidersHorizontal size={20} />
        </button>
      </div>
    </section>
  );
}
