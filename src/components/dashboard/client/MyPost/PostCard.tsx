"use client";

import { ErrandPost } from "@/types/post";
import { format } from "date-fns";
import {
  Calendar,
  Check,
  Clock,
  Dog,
  MapPin,
  MoreVertical,
  Package,
  Shirt,
  ShoppingCart,
  Sparkles,
  User,
  Utensils,
} from "lucide-react";

interface PostCardProps {
  post: ErrandPost;
}

const iconComponents: Record<string, React.ReactNode> = {
  "shopping-cart": <ShoppingCart className='w-6 h-6 text-orange-400' />,
  package: <Package className='w-6 h-6 text-blue-400' />,
  cleaning: <Sparkles className='w-6 h-6 text-cyan-400' />,
  pet: <Dog className='w-6 h-6 text-yellow-400' />,
  "dry-cleaning": <Shirt className='w-6 h-6 text-purple-400' />,
  food: <Utensils className='w-6 h-6 text-red-400' />,
};

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

const typeColors: Record<string, string> = {
  "Grocery Shopping": "text-orange-400",
  "Package Delivery": "text-blue-400",
  "Home Cleaning": "text-cyan-400",
  "Pet Care": "text-yellow-400",
  "Dry Cleaning": "text-purple-400",
  "Food Pickup": "text-red-400",
};

const iconBgColors: Record<string, string> = {
  "shopping-cart": "bg-orange-50",
  package: "bg-blue-50",
  cleaning: "bg-cyan-50",
  pet: "bg-yellow-50",
  "dry-cleaning": "bg-purple-50",
  food: "bg-red-50",
};

export default function PostCard({ post }: PostCardProps) {
  const statusStyle =
    statusConfig[post.status] || statusConfig["Pending Pickup"];
  const typeColor = typeColors[post.type] || "text-[#FF8C42]";
  const iconBg = iconBgColors[post.icon] || "bg-[#FF5A3C]";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };

  return (
    <article className='bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between border border-gray-50 hover:shadow-md transition-shadow duration-300'>
      {/* Header */}
      <div className='flex justify-between items-start mb-4'>
        <div className='flex items-center gap-3'>
          <div className={`p-3 ${iconBg} rounded-lg`}>
            {iconComponents[post.icon] || iconComponents["shopping-cart"]}
          </div>
          <div>
            <h3 className='card-title text-sm font-bold  leading-tight'>
              {post.title}
            </h3>
            <p
              className={`text-[11px] mt-1 font-medium ${typeColor} font-bold uppercase tracking-wide`}>
              {post.type}
            </p>
          </div>
        </div>
        <button
          className='text-[#6B6B6B]  transition-colors'
          aria-label='More options'>
          <MoreVertical className='w-5 ' />
        </button>
      </div>

      {/* Description */}
      <p className='text-[13px] text-[#6B6B6B] mb-6 leading-[20.1px]'>
        {post.description}
      </p>

      {/* Reward and Status */}
      <div className='flex justify-between items-end mb-6'>
        <div>
          <span className='text-[10px] font-medium text-[#6B6B6B] uppercase'>
            Reward
          </span>
          <div className='card-reward text-[22px] font-bold text-[#FF5A3C]'>
            ${post.reward}
          </div>
        </div>
        <div
          className={`${statusStyle.bg} ${statusStyle.text} px-4 py-2 rounded-full text-[10px] font-bold flex items-center`}>
          <span className={`status-dot ${statusStyle.dot}`}></span>
          {post.status}
        </div>
      </div>

      {/* Footer Info */}
      <div className='pt-4 border-t border-[#F5E9D3] text-[10px] text-[#6B6B6B] space-y-2'>
        <div className='flex justify-between'>
          <span className='flex items-center gap-1'>
            <Calendar className='w-3 h-3 text-[#FF5A3C]' />
            {formatDate(post.date)}
          </span>
          <span className='flex items-center gap-1'>
            <Clock className='w-3 h-3 text-[#FF5A3C]' />
            <span className='text-[#6B6B6B]'> {post.time}</span>
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='flex items-center gap-1'>
            <MapPin className='w-3 h-3 text-[#FF5A3C]' />
            {post.location}
          </span>
          <span className='bg-yellow-50 text-orange-300 px-2 py-0.5 rounded text-[8px] font-bold'>
            {post.serviceType}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          {post.assignedTo ? (
            <>
              <Check className='w-3 h-3 text-status-green ' />
              <span className='font-bold text-status-green'>
                Assigned to <span className='underline'>{post.assignedTo}</span>
              </span>
            </>
          ) : (
            <>
              <User className='w-3 h-3' />
              <span>No Errandr assigned yet</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
