"use client";

import { Search, User, Mail } from "lucide-react";
import { useCallback, useState } from "react";

interface SearchBarProps {
  onSearch: (search: string) => void;
  onWorkerNameSearch?: (name: string) => void;
  onWorkerEmailSearch?: (email: string) => void;
}

export default function SearchBar({ onSearch, onWorkerNameSearch, onWorkerEmailSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [workerEmail, setWorkerEmail] = useState("");

  const handleSearch = useCallback(() => {
    onSearch(query);
    onWorkerNameSearch?.(workerName);
    onWorkerEmailSearch?.(workerEmail);
  }, [query, workerName, workerEmail, onSearch, onWorkerNameSearch, onWorkerEmailSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className='w-full space-y-3' data-purpose='search-bar'>
      {/* Main search input */}
      <div className='relative flex items-center'>
        <div className='absolute left-4 text-[#EC6F27]'>
          <Search size={20} />
        </div>
        <input
          className='w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm outline-none transition-all duration-200 text-sm placeholder:text-gray-400'
          placeholder='Search by task, location, or name…'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Worker name and email row */}
      <div className='flex flex-col md:flex-row gap-3 w-full'>
        <div className='relative flex items-center flex-1 min-w-0 w-full'>
          <div className='absolute left-3 text-gray-400 pointer-events-none'>
            <User size={16} />
          </div>
          <input
            className='w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm outline-none transition-all duration-200 text-sm placeholder:text-gray-400 truncate'
            placeholder='Search by worker name…'
            type='text'
            value={workerName}
            onChange={(e) => setWorkerName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className='relative flex items-center flex-1 min-w-0 w-full'>
          <div className='absolute left-3 text-gray-400 pointer-events-none'>
            <Mail size={16} />
          </div>
          <input
            className='w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm outline-none transition-all duration-200 text-sm placeholder:text-gray-400 truncate'
            placeholder='Search by worker email…'
            type='email'
            value={workerEmail}
            onChange={(e) => setWorkerEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={handleSearch}
          className='w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-primary/95 transition-all active:scale-95 cursor-pointer shrink-0'
        >
          Search
        </button>
      </div>
    </section>
  );
}
