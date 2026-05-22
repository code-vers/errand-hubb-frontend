import React from "react";
import { Category } from "@/types/categories";
import { Trash2, Power } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  onToggleStatus: (categoryId: string) => void;
  onDelete: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onToggleStatus,
  onDelete,
}) => {
  const isActive = category.status === "active";

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US");
  };

  return (
    <article
      className={`
        rounded-[20px] p-6 flex flex-col h-full border transition-all duration-200
        ${
          isActive
            ? "bg-white shadow-sm border-border/40"
            : "bg-gray-50/50 shadow-none border-dashed border-gray-200"
        }
      `}>
      {/* Card Header: Icon & Actions */}
      <header className='flex justify-between items-start mb-5'>
        {/* Category Icon */}
        <div
          aria-hidden='true'
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${category.iconBgColor} ${
            !isActive && "grayscale opacity-50"
          }`}>
          <span role='img' aria-label={category.name}>
            {category.emoji}
          </span>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2'>
          {/* Toggle Status Button */}
          <button
            aria-label={`${isActive ? "Deactivate" : "Activate"} ${category.name} category`}
            onClick={() => onToggleStatus(category.id)}
            className={`
              w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95
              ${
                isActive
                  ? "bg-green-50 text-success hover:bg-green-100"
                  : "bg-white text-muted border border-border hover:bg-hover"
              }
            `}>
            <Power size={18} className={isActive ? "stroke-[2.5]" : "stroke-[2]"} />
          </button>

          {/* Delete Button */}
          <button
            aria-label={`Delete ${category.name} category`}
            onClick={() => onDelete(category.id)}
            className={`
              w-9 h-9 rounded-xl bg-red-50 text-error flex items-center justify-center 
              hover:bg-red-100 transition-all active:scale-95
              ${!isActive ? "opacity-70 hover:opacity-100" : ""}
            `}>
            <Trash2 size={16} />
          </button>
        </div>
      </header>

      {/* Card Body: Text Content */}
      <div className='flex-grow'>
        <h3
          className={`text-[17px] font-bold mb-1 leading-tight ${
            isActive ? "text-foreground" : "text-gray-500"
          }`}>
          {category.name}
        </h3>
        <p
          className={`text-[13px] leading-snug font-medium ${
            isActive ? "text-muted" : "text-gray-400"
          }`}>
          {category.description}
        </p>
      </div>

      {/* Card Footer: Stats & Badge */}
      <footer className='flex justify-between items-end mt-8'>
        <div
          className={`text-[13px] ${isActive ? "text-muted" : "text-gray-400"}`}>
          <span
            className={`font-bold text-[15px] ${
              isActive ? "text-foreground" : "text-gray-600"
            }`}>
            {formatNumber(category.postsCount)}
          </span>{" "}
          posts
        </div>
        <span
          className={`
          px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
          ${
            isActive
              ? "bg-green-50 border-green-200 text-success"
              : "bg-white border-border text-gray-400"
          }
        `}>
          {category.status}
        </span>
      </footer>
    </article>
  );
};

export default CategoryCard;
