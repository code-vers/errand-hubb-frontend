"use client";

import { useState, useEffect } from "react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/categories";

interface CategoryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilters({
  selectedCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getActive();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className='flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide w-full'>
      <button
        className={`px-4 sm:px-6 py-2 rounded-lg text-[12px] font-medium transition-all duration-200 shrink-0 whitespace-nowrap cursor-pointer ${
          selectedCategory === "all" || !selectedCategory
            ? "bg-[#EC6F27] text-white"
            : "bg-white border border-gray-200 text-text-placeholder font-normal hover:border-primary hover:text-primary"
        }`}
        onClick={() => onCategoryChange("all")}>
        All Categories
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-4 sm:px-6 py-2 rounded-lg text-[12px] font-medium transition-all duration-200 shrink-0 whitespace-nowrap cursor-pointer ${
            selectedCategory === category.id
              ? "bg-[#EC6F27] text-white "
              : "bg-white border border-gray-200 text-text-placeholder font-normal hover:border-primary hover:text-primary"
          }`}
          onClick={() => onCategoryChange(category.id)}>
          {category.name}
        </button>
      ))}
    </div>
  );
}
