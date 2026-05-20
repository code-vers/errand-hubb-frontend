"use client";

import React from "react";
import { X } from "lucide-react";
import { ProviderFilters } from "@/types/provider";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProviderFilters;
  onSortChange: (sortBy: ProviderFilters["sortBy"]) => void;
  onReset: () => void;
}

const sortOptions = [
  { value: "highest_rated", label: "Highest Rated" },
  { value: "lowest_price", label: "Lowest Price" },
  { value: "highest_price", label: "Highest Price" },
  { value: "most_jobs", label: "Most Jobs" },
];

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onSortChange,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50'>
      <div className='bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <h2 className='text-xl font-bold text-gray-800'>Filters</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <X size={20} className='text-gray-500' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          <div>
            <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4'>
              Sort By
            </h3>
            <div className='grid grid-cols-1 gap-2'>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value as any);
                    onClose();
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    filters.sortBy === option.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-100 hover:border-primary/50 text-gray-600"
                  }`}>
                  <span className='font-medium'>${option.label}</span>
                  {filters.sortBy === option.value && (
                    <div className='w-2 h-2 rounded-full bg-primary' />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center gap-3 px-6 py-4 bg-gray-50'>
          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className='flex-1 py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors'>
            Reset All
          </button>
          <button
            onClick={onClose}
            className='flex-[2] py-3 bg-primary text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors'>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
