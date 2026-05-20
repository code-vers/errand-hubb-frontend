"use client";

import { ErrandPost } from "@/types/post";
import { format } from "date-fns";

interface PostCardProps {
  post: ErrandPost;
}

const iconComponents: Record<string, JSX.Element> = {
  "shopping-cart": (
    <svg
      className='w-6 h-6 text-orange-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'>
      <path
        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  ),
  package: (
    <svg
      className='w-6 h-6 text-blue-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'>
      <path
        d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  ),
  cleaning: (
    <svg
      className='w-6 h-6 text-cyan-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'>
      <path
        d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  ),
  pet: (
    <svg
      className='w-6 h-6 text-yellow-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'>
      <path
        d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  ),
  "dry-cleaning": (
    <svg
      className='w-6 h-6 text-purple-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'>
      <path
        d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  ),
  food: (
    <svg
      className='w-6 h-6 text-red-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'>
      <path
        d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  ),
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
  const typeColor = typeColors[post.type] || "text-orange-400";
  const iconBg = iconBgColors[post.icon] || "bg-orange-50";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };

  return (
    <article className='bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between border border-gray-50 hover:shadow-md transition-shadow duration-300'>
      {/* Header */}
      <div className='flex justify-between items-start mb-4'>
        <div className='flex gap-3'>
          <div className={`p-3 ${iconBg} rounded-lg`}>
            {iconComponents[post.icon] || iconComponents["shopping-cart"]}
          </div>
          <div>
            <h3 className='card-title text-sm leading-tight'>{post.title}</h3>
            <p
              className={`text-[10px] ${typeColor} font-bold uppercase tracking-wide`}>
              {post.type}
            </p>
          </div>
        </div>
        <button
          className='text-gray-400 hover:text-gray-600 transition-colors'
          aria-label='More options'>
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
          </svg>
        </button>
      </div>

      {/* Description */}
      <p className='text-xs text-gray-500 mb-6 leading-relaxed'>
        {post.description}
      </p>

      {/* Reward and Status */}
      <div className='flex justify-between items-end mb-6'>
        <div>
          <span className='text-[8px] font-bold text-gray-400 uppercase'>
            Reward
          </span>
          <div className='card-reward'>${post.reward}</div>
        </div>
        <div
          className={`${statusStyle.bg} ${statusStyle.text} px-3 py-1 rounded-full text-[10px] font-bold flex items-center`}>
          <span className={`status-dot ${statusStyle.dot}`}></span>
          {post.status}
        </div>
      </div>

      {/* Footer Info */}
      <div className='pt-4 border-t border-gray-100 text-[10px] text-gray-400 space-y-2'>
        <div className='flex justify-between'>
          <span className='flex items-center gap-1'>
            <svg
              className='w-3 h-3'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
            </svg>
            {formatDate(post.date)}
          </span>
          <span className='flex items-center gap-1'>
            <svg
              className='w-3 h-3'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
            </svg>
            {post.time}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='flex items-center gap-1'>
            <svg
              className='w-3 h-3'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
              <path
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
            </svg>
            {post.location}
          </span>
          <span className='bg-yellow-50 text-orange-300 px-2 py-0.5 rounded text-[8px] font-bold'>
            {post.serviceType}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          {post.assignedTo ? (
            <>
              <svg
                className='w-3 h-3 text-status-green'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  d='M5 13l4 4L19 7'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                />
              </svg>
              <span className='font-bold text-status-green'>
                Assigned to <span className='underline'>{post.assignedTo}</span>
              </span>
            </>
          ) : (
            <>
              <svg
                className='w-3 h-3'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                />
              </svg>
              <span>No Errandr assigned yet</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
