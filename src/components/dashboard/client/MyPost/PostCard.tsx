"use client";

import { ErrandPost } from "@/types/post";
import { format } from "date-fns";
import {
  Calendar,
  Check,
  Clock,
  MapPin,
  MoreVertical,
  User,
  Edit2,
  Trash2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { getImageUrl } from "@/configs/api.config";
import { useConfirm } from "@/context/ConfirmationContext";

interface PostCardProps {
  post: ErrandPost;
  onEdit: () => void;
  onDelete: () => void;
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> =
  {
    "Pending Pickup": {
      bg: "bg-badge-pending",
      text: "text-status-orange",
      dot: "bg-status-orange",
    },
    ASAP: {
      bg: "bg-badge-asap",
      text: "text-status-red",
      dot: "bg-status-red",
    },
    Scheduled: {
      bg: "bg-badge-scheduled",
      text: "text-status-blue",
      dot: "bg-status-blue",
    },
    "In Progress": {
      bg: "bg-badge-progress",
      text: "text-status-purple",
      dot: "bg-status-purple",
    },
    Completed: {
      bg: "bg-badge-completed",
      text: "text-status-green",
      dot: "bg-status-green",
    },
    Cancelled: {
      bg: "bg-badge-cancelled",
      text: "text-status-pink",
      dot: "bg-status-pink",
    },
  };

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  const confirm = useConfirm();
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const statusStyle =
    statusConfig[post.status] || statusConfig["Pending Pickup"];
  
  const category = post.category;
  const categoryColor = category?.color || "#FF7A2F";

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <article className='bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between border border-gray-50 hover:shadow-md transition-shadow duration-300 relative overflow-hidden'>
      {/* Header */}
      <div className='flex justify-between items-start mb-3 sm:mb-4 gap-2'>
        <div className='flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1'>
          {/* Category Icon - Matches CategoryCard logic */}
          <div
            aria-hidden='true'
            style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
            className='w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl shrink-0'>
            {category?.iconType === "emoji" ? (
              <span role='img' aria-label={category.name}>
                {category.icon}
              </span>
            ) : category?.icon ? (
              <img src={getImageUrl(category.icon) || ""} alt={category.name} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            ) : (
              <span role='img' aria-label='default'>🛒</span>
            )}
          </div>
          <div className='min-w-0 flex-1'>
            <h3 className='card-title text-xs sm:text-sm font-bold leading-tight truncate' title={post.title}>
              {post.title}
            </h3>
            <p
              style={{ color: categoryColor }}
              className='text-[10px] sm:text-[11px] mt-0.5 font-bold uppercase tracking-wide truncate'>
              {post.type}
            </p>
          </div>
        </div>
        <div className="relative shrink-0" ref={menuRef}>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className='text-[#6B6B6B] transition-colors p-1 hover:bg-gray-100 rounded-full cursor-pointer'
            aria-label='More options'>
            <MoreVertical className='w-5 h-5' />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
              <button
                onClick={() => {
                  onEdit();
                  setShowOptions(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50 transition-colors text-left cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Post
              </button>
              <button
                onClick={async () => {
                  const isConfirmed = await confirm({
                    title: "Delete Post",
                    message: "Are you sure you want to delete this post? This action cannot be undone.",
                    type: "danger",
                    confirmLabel: "Delete",
                  });
                  if (isConfirmed) {
                    onDelete();
                  }
                  setShowOptions(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-[12px] text-red-500 hover:bg-red-50 transition-colors text-left cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className='text-xs sm:text-[13px] text-[#6B6B6B] mb-4 sm:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3'>
        {post.description}
      </p>

      {/* Reward and Status */}
      <div className='flex justify-between items-end gap-2 mb-4 sm:mb-6'>
        <div className='min-w-0'>
          <span className='text-[10px] font-medium text-[#6B6B6B] uppercase block'>
            Reward
          </span>
          <div className='card-reward text-lg sm:text-[22px] font-bold text-[#FF5A3C] truncate'>
            ${post.reward}
          </div>
        </div>
        <div
          className={`${statusStyle.bg} ${statusStyle.text} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] font-bold flex items-center shrink-0 max-w-[150px] truncate`}>
          <span className={`status-dot ${statusStyle.dot}`}></span>
          <span className='truncate'>{(post.status as string) === "active" ? "Pending Pickup" : post.status}</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className='pt-3 sm:pt-4 border-t border-[#F5E9D3] text-[10px] text-[#6B6B6B] space-y-2'>
        <div className='flex justify-between items-center gap-2'>
          <span className='flex items-center gap-1 min-w-0 truncate'>
            <Calendar className='w-3 h-3 text-[#FF5A3C] shrink-0' />
            <span className='truncate'>{formatDate(post.date)}</span>
          </span>
          <span className='flex items-center gap-1 shrink-0'>
            <Clock className='w-3 h-3 text-[#FF5A3C] shrink-0' />
            <span className='text-[#6B6B6B]'> {post.time}</span>
          </span>
        </div>
        <div className='flex justify-between items-center gap-2'>
          <span className='flex items-center gap-1 min-w-0 flex-1 truncate' title={post.location}>
            <MapPin className='w-3 h-3 text-[#FF5A3C] shrink-0' />
            <span className='truncate'>{post.location}</span>
          </span>
          <span className='bg-yellow-50 text-orange-400 px-2 py-0.5 rounded text-[8px] font-bold shrink-0 max-w-[100px] truncate'>
            {post.serviceType}
          </span>
        </div>
        <div className='flex items-center gap-1 min-w-0 truncate'>
          {post.assignedTo ? (
            <>
              <Check className='w-3 h-3 text-status-green shrink-0' />
              <span className='font-bold text-status-green truncate'>
                Assigned to <span className='underline'>{post.assignedTo}</span>
              </span>
            </>
          ) : (
            <>
              <User className='w-3 h-3 shrink-0' />
              <span className='truncate'>No Errandr assigned yet</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
