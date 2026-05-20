"use client";

import { ErrandPost } from "@/types/post";
import PostCard from "./PostCard";

interface PostGridProps {
  posts: ErrandPost[];
  loading: boolean;
  error: string | null;
}

export default function PostGrid({ posts, loading, error }: PostGridProps) {
  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className='bg-white rounded-2xl p-5 shadow-sm border border-gray-50 animate-pulse'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-12 h-12 bg-gray-200 rounded-lg'></div>
              <div className='flex-1'>
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                <div className='h-3 bg-gray-200 rounded w-1/2'></div>
              </div>
            </div>
            <div className='space-y-3'>
              <div className='h-3 bg-gray-200 rounded w-full'></div>
              <div className='h-3 bg-gray-200 rounded w-5/6'></div>
              <div className='h-3 bg-gray-200 rounded w-4/6'></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <svg
          className='mx-auto h-12 w-12 text-red-400 mb-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
          />
        </svg>
        <p className='text-red-500 mb-4'>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors'>
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className='text-center py-12'>
        <svg
          className='mx-auto h-12 w-12 text-gray-400 mb-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
          />
        </svg>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          No posts found
        </h3>
        <p className='text-gray-500'>
          Try adjusting your search or status filter
        </p>
      </div>
    );
  }

  return (
    <main
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      data-purpose='post-grid'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
