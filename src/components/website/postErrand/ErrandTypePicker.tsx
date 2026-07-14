"use client";
import { Category } from "@/types/categories";
import { getImageUrl } from "@/configs/api.config";

interface ErrandTypePickerProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelect: (categoryId: string) => void;
}

const ErrandTypePicker = ({ categories, selectedCategoryId, onSelect }: ErrandTypePickerProps) => {
  return (
    <aside className='w-full bg-white p-4 rounded-md shadow-sm h-fit max-h-[850px] flex flex-col'>
      <h3 className='text-[#2a3a4a] text-xs font-extrabold uppercase tracking-wide shrink-0 mb-4'>
        Choose Errand Type
      </h3>

      <div className='grid grid-cols-3 gap-2.5 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'>
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
                  <img src={getImageUrl(item.icon) || ""} alt={item.name} className="w-6 h-6 object-contain" />
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
