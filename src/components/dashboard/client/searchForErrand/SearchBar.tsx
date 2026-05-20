"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useState } from "react";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
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
        <div className='absolute left-4 text-[#EC6F27]'>
          <Search size={20} />
        </div>
        <input
          className='w-full pl-12 pr-14 py-4 bg-white border border-gray-100 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm outline-none transition-all duration-200 text-sm placeholder:text-gray-400'
          placeholder='Search by task, location, or name…'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className='absolute right-12 h-6 w-[1.5px] bg-gray-200' />
        <button
          className='absolute right-2 p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 cursor-default'
          title='Filters'>
          <SlidersHorizontal size={20} />
        </button>
      </div>
    </section>
  );
}
