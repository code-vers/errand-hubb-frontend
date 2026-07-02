"use client";

import { Post } from "@/types/search";
import ProviderCard from "./ProviderCard";

interface ProviderGridProps {
  providers: Post[];
  loading: boolean;
  error: string | null;
  onOpenGallery?: (images: string[]) => void;
}

export default function ProviderGrid({
  providers,
  loading,
  error,
  onOpenGallery,
}: ProviderGridProps) {
  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse'>
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
        <p className='text-red-500 mb-4'>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors'>
          Try Again
        </button>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className='text-center py-12'>
        <svg
          className='mx-auto h-12 w-12 text-gray-400 mb-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
          />
        </svg>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          No errands found
        </h3>
        <p className='text-gray-500'>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <section
      className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
      data-purpose='service-provider-grid'>
      {providers.map((post) => (
        <ProviderCard 
          key={post.id} 
          provider={post} 
          onOpenGallery={onOpenGallery}
        />
      ))}
    </section>
  );
}
