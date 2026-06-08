import React from "react";
import { Category } from "@/types/categories";
import { Trash2, Power, Edit2 } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  onToggleStatus: (categoryId: string) => void;
  onDelete: (categoryId: string) => void;
  onEdit: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onToggleStatus,
  onDelete,
  onEdit,
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
          style={{ backgroundColor: `${category.color}15`, color: category.color }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
            !isActive && "grayscale opacity-50"
          }`}>
          {category.iconType === "emoji" ? (
            <span role='img' aria-label={category.name}>
              {category.icon}
            </span>
          ) : (
            <img src={category.icon} alt={category.name} className="w-6 h-6 object-contain" />
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex gap-1.5'>
          {/* Edit Button */}
          <button
            aria-label={`Edit ${category.name} category`}
            onClick={() => onEdit(category)}
            className={`
              w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95
              bg-blue-50 text-blue-600 hover:bg-blue-100
              ${!isActive ? "opacity-70 hover:opacity-100" : ""}
            `}>
            <Edit2 size={16} />
          </button>
          
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
            {formatNumber(category.postsCount || 0)}
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
