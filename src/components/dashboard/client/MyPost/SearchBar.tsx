"use client";

import { Search } from "lucide-react";
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
          className='w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 shadow-sm outline-none transition-all duration-200 text-sm placeholder:text-gray-400'
          placeholder='Search posts by title, type, or location...'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </section>
  );
}
