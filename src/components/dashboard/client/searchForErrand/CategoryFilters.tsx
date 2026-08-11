"use client";

import { useState, useEffect, useRef } from "react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/categories";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

interface CategoryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilters({
  selectedCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm'>
      {/* Category Dropdown Select */}
      <div className='relative flex items-center shrink-0 w-full md:w-56'>
        <LayoutGrid size={16} className='absolute left-3 text-[#EC6F27] pointer-events-none' />
        <select
          value={selectedCategory || "all"}
          onChange={(e) => onCategoryChange(e.target.value)}
          className='w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-all appearance-none truncate'
        >
          <option value='all'>All Categories ({categories.length})</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className='absolute right-3 pointer-events-none text-gray-400 text-xs'>▼</div>
      </div>

      {/* Horizontal Divider for desktop */}
      <div className='hidden md:block w-px h-6 bg-gray-200 shrink-0' />

      {/* Scrollable Pills Carousel */}
      <div className='relative flex items-center flex-1 min-w-0 overflow-hidden group'>
        <button
          onClick={() => scroll("left")}
          className='absolute left-0 z-10 p-1 rounded-full bg-white/90 shadow-md text-gray-600 hover:text-primary hover:bg-white transition-all opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center'
          aria-label='Scroll left'
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={scrollRef}
          className='flex flex-nowrap gap-2 overflow-x-auto py-1 scrollbar-hide w-full scroll-smooth'
        >
          <button
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shrink-0 whitespace-nowrap cursor-pointer ${
              selectedCategory === "all" || !selectedCategory
                ? "bg-[#EC6F27] text-white shadow-sm"
                : "bg-gray-50 border border-gray-200 text-gray-600 hover:border-primary/50 hover:text-primary hover:bg-white"
            }`}
            onClick={() => onCategoryChange("all")}
          >
            All Categories
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shrink-0 whitespace-nowrap cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-[#EC6F27] text-white shadow-sm"
                  : "bg-gray-50 border border-gray-200 text-gray-600 hover:border-primary/50 hover:text-primary hover:bg-white"
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className='absolute right-0 z-10 p-1 rounded-full bg-white/90 shadow-md text-gray-600 hover:text-primary hover:bg-white transition-all opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center'
          aria-label='Scroll right'
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
