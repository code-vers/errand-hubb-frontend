"use client";

import { Search, User, Mail, SlidersHorizontal, RotateCcw, MapPin, X } from "lucide-react";
import { useCallback, useState } from "react";
import { StateDropdown, CityDropdown } from "@/components/shared/StateCityDropdown";

interface SearchBarProps {
  onSearch: (search: string) => void;
  onLocationSearch?: (location: string) => void;
  onWorkerNameSearch?: (name: string) => void;
  onWorkerEmailSearch?: (email: string) => void;
  onReset?: () => void;
}

export default function SearchBar({
  onSearch,
  onLocationSearch,
  onWorkerNameSearch,
  onWorkerEmailSearch,
  onReset,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [workerEmail, setWorkerEmail] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = useCallback(() => {
    onSearch(query);
    const location = selectedCity
      ? (selectedState ? `${selectedCity}, ${selectedState}` : selectedCity)
      : selectedState;
    onLocationSearch?.(location);
    onWorkerNameSearch?.(workerName);
    onWorkerEmailSearch?.(workerEmail);
  }, [query, selectedState, selectedCity, workerName, workerEmail, onSearch, onLocationSearch, onWorkerNameSearch, onWorkerEmailSearch]);

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedCity("");
    const location = stateName;
    onLocationSearch?.(location);
  };

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const location = cityName
      ? (selectedState ? `${cityName}, ${selectedState}` : cityName)
      : selectedState;
    onLocationSearch?.(location);
  };

  const handleReset = () => {
    setQuery("");
    setSelectedState("");
    setSelectedCity("");
    setWorkerName("");
    setWorkerEmail("");
    onSearch("");
    onLocationSearch?.("");
    onWorkerNameSearch?.("");
    onWorkerEmailSearch?.("");
    onReset?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const activeFiltersCount = (selectedState ? 1 : 0) + (selectedCity ? 1 : 0) + (workerName ? 1 : 0) + (workerEmail ? 1 : 0);

  return (
    <section className='w-full bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-md space-y-4' data-purpose='search-bar'>
      {/* Top Main Search Bar */}
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
        <div className='relative flex-1 flex items-center min-w-0'>
          <Search size={18} className='absolute left-4 text-[#EC6F27]' />
          <input
            className='w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium placeholder:text-gray-400 outline-none transition-all'
            placeholder='Search tasks, keywords, or keywords...'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              type='button'
              onClick={() => {
                setQuery("");
                onSearch("");
              }}
              className='absolute right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200/60 transition-all cursor-pointer'
              aria-label='Clear search'
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className='flex items-center gap-2 shrink-0'>
          <button
            type='button'
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              showAdvanced || activeFiltersCount > 0
                ? "bg-primary/10 border-primary text-primary"
                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className='w-5 h-5 rounded-full bg-primary text-white text-[10px] font-extrabold flex items-center justify-center'>
                {activeFiltersCount}
              </span>
            )}
          </button>

          <button
            onClick={handleSearch}
            className='px-6 py-3 bg-[#EC6F27] hover:bg-orange-600 active:scale-95 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-orange-500/20 transition-all cursor-pointer'
          >
            Search
          </button>
        </div>
      </div>

      {/* Advanced Collapsible Filter Controls */}
      {showAdvanced && (
        <div className='pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 animate-in fade-in slide-in-from-top-2 duration-200'>
          {/* State Dropdown */}
          <div className='flex flex-col gap-1'>
            <label className='text-[10px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1'>
              <MapPin size={12} className='text-primary' /> State
            </label>
            <StateDropdown
              value={selectedState}
              allowAll={true}
              placeholder="All States"
              onChange={(e) => handleStateChange(e.target.value)}
              className='w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 outline-none focus:border-primary transition-all'
            />
          </div>

          {/* City Dropdown */}
          <div className='flex flex-col gap-1'>
            <label className='text-[10px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1'>
              <MapPin size={12} className='text-primary' /> City
            </label>
            <CityDropdown
              stateName={selectedState}
              value={selectedCity}
              allowAll={true}
              placeholder={selectedState ? "All Cities" : "Select State First"}
              onChange={(e) => handleCityChange(e.target.value)}
              className='w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 outline-none focus:border-primary transition-all'
            />
          </div>

          {/* Worker Name Filter */}
          <div className='flex flex-col gap-1'>
            <label className='text-[10px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1'>
              <User size={12} className='text-primary' /> Worker Name
            </label>
            <input
              className='w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 placeholder:text-gray-400 outline-none focus:border-primary transition-all'
              placeholder='e.g. John Doe'
              type='text'
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Worker Email Filter */}
          <div className='flex flex-col gap-1'>
            <label className='text-[10px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1'>
              <Mail size={12} className='text-primary' /> Worker Email
            </label>
            <input
              className='w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 placeholder:text-gray-400 outline-none focus:border-primary transition-all'
              placeholder='worker@email.com'
              type='email'
              value={workerEmail}
              onChange={(e) => setWorkerEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Reset Filters Button */}
          <div className='sm:col-span-2 lg:col-span-4 flex justify-end pt-2'>
            <button
              type='button'
              onClick={handleReset}
              className='text-xs font-bold text-gray-500 hover:text-red-500 flex items-center gap-1.5 transition-colors cursor-pointer'
            >
              <RotateCcw size={13} /> Clear Filters
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
