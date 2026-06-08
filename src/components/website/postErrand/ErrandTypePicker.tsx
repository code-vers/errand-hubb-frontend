"use client";
import { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/categories";
import { Loader2 } from "lucide-react";

interface ErrandTypePickerProps {
  selectedCategoryId: string;
  onSelect: (categoryId: string) => void;
}

const ErrandTypePicker = ({ selectedCategoryId, onSelect }: ErrandTypePickerProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getActive();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <aside className='w-full bg-white p-4 rounded-md shadow-sm flex items-center justify-center min-h-[300px]'>
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </aside>
    );
  }

  return (
    <aside className='w-full bg-white p-4 rounded-md shadow-sm'>
      <h3 className='text-[#2a3a4a] text-xs font-extrabold uppercase tracking-wide'>
        Choose Errand Type
      </h3>

      <div className='mt-4 grid grid-cols-3 gap-2.5'>
        {categories.map((item) => {
          const isSelected = selectedCategoryId === item.id;
          return (
            <button
              key={item.id}
              type='button'
              onClick={() => onSelect(item.id)}
              className={`h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border-2 ${
                isSelected 
                  ? "bg-blue-50 border-[#1b539c] scale-[1.02] shadow-md" 
                  : "bg-[#efefef] border-transparent hover:bg-[#e5e5e5] hover:border-gray-200"
              }`}>
              <span 
                className={`text-lg leading-none transition-transform ${isSelected ? "scale-125" : ""}`}
                style={{ color: item.color || "inherit" }}
              >
                {item.iconType === "emoji" ? item.icon : (
                  <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain" />
                )}
              </span>
              <span className={`text-[10px] font-semibold text-center leading-tight ${isSelected ? "text-[#1b539c]" : "text-gray-600"}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default ErrandTypePicker;
