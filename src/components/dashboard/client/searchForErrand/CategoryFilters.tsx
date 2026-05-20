"use client";

import { categories } from "./provider";

interface CategoryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilters({
  selectedCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {categories.map((category) => (
        <button
          key={category}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? "bg-primary text-white shadow-md"
              : "bg-white border border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
          }`}
          onClick={() => onCategoryChange(category)}>
          {category}
        </button>
      ))}
    </div>
  );
}
