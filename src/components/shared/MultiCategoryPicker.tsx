"use client";
import { Category } from "@/types/categories";
import { getImageUrl } from "@/configs/api.config";
import { Check } from "lucide-react";

interface MultiCategoryPickerProps {
  categories: Category[];
  selectedCategoryIds: string[];
  onChange: (categoryIds: string[]) => void;
  label?: string;
}

const MultiCategoryPicker = ({ categories, selectedCategoryIds, onChange, label = "Select Multiple Categories" }: MultiCategoryPickerProps) => {
  const toggleCategory = (id: string) => {
    if (selectedCategoryIds.includes(id)) {
      onChange(selectedCategoryIds.filter(catId => catId !== id));
    } else {
      onChange([...selectedCategoryIds, id]);
    }
  };

  return (
    <aside className='w-full bg-white p-4 rounded-md shadow-sm h-fit max-h-[850px] flex flex-col border border-gray-100'>
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h3 className='text-[#2a3a4a] text-xs font-extrabold uppercase tracking-wide'>
          {label}
        </h3>
        <span className="text-[10px] text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded-full">
          {selectedCategoryIds.length} Selected
        </span>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'>
        {categories.map((item) => {
          const isSelected = selectedCategoryIds.includes(item.id);
          return (
            <button
              key={item.id}
              type='button'
              onClick={() => toggleCategory(item.id)}
              className={`relative h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border-2 ${
                isSelected 
                  ? "bg-orange-50 border-[#F47A22] scale-[1.02] shadow-sm" 
                  : "bg-[#efefef] border-transparent hover:bg-[#e5e5e5] hover:border-gray-200"
              }`}>
              {isSelected && (
                <div className="absolute top-1 right-1 bg-[#F47A22] text-white rounded-full p-0.5">
                  <Check size={10} strokeWidth={3} />
                </div>
              )}
              <span 
                className={`text-lg leading-none transition-transform ${isSelected ? "scale-110" : ""}`}
                style={{ color: item.color || "inherit" }}
              >
                {item.iconType === "emoji" ? item.icon : (
                  <img src={getImageUrl(item.icon) || ""} alt={item.name} className="w-6 h-6 object-contain" />
                )}
              </span>
              <span className={`text-[9px] font-semibold text-center leading-tight px-1 ${isSelected ? "text-[#F47A22]" : "text-gray-600"}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default MultiCategoryPicker;
