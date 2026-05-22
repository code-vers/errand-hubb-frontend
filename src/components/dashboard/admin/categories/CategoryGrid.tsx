import { Category } from "@/types/categories";
import { FolderX } from "lucide-react";
import React from "react";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
  onToggleStatus: (categoryId: string) => void;
  onDelete: (categoryId: string) => void;
  isLoading?: boolean;
  emptyStateMessage?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onToggleStatus,
  onDelete,
  isLoading = false,
  emptyStateMessage = "No categories found",
}) => {
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className='bg-white rounded-[20px] p-6 shadow-sm border border-gray-50 animate-pulse'>
            <div className='flex justify-between items-start mb-5'>
              <div className='w-12 h-12 rounded-xl bg-gray-200'></div>
              <div className='flex gap-2'>
                <div className='w-9 h-9 rounded-xl bg-gray-200'></div>
                <div className='w-9 h-9 rounded-xl bg-gray-200'></div>
              </div>
            </div>
            <div className='flex-grow space-y-2'>
              <div className='h-5 bg-gray-200 rounded w-2/3'></div>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
            </div>
            <div className='flex justify-between items-end mt-8'>
              <div className='h-4 bg-gray-200 rounded w-1/4'></div>
              <div className='h-6 bg-gray-200 rounded w-16'></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className='text-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200'>
        <FolderX
          className='mx-auto h-16 w-16 text-muted/30 mb-4'
          strokeWidth={1}
        />
        <h3 className='text-xl font-bold text-foreground'>No Categories</h3>
        <p className='mt-2 text-muted font-medium'>{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
