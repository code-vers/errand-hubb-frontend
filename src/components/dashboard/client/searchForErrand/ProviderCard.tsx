"use client";

import { ServiceProvider } from "@/types/provider";
import StarRating from "./StarRating";
import Image from "next/image";

interface ProviderCardProps {
  provider: ServiceProvider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <article className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300'>
      {/* Header */}
      <div className='flex justify-between items-start mb-4'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <Image
              alt={provider.name}
              className='w-12 h-12 rounded-lg object-cover'
              height={200}
              width={200}
              src={provider.imageUrl}
            />
            {provider.isVerified && (
              <div className='absolute -bottom-1 -right-1 bg-yellow-400 text-white rounded-full p-0.5'>
                <svg
                  className='w-3 h-3'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' />
                </svg>
              </div>
            )}
          </div>
          <div>
            <h3 className='font-bold text-gray-900 leading-tight'>
              {provider.name}
            </h3>
            <p className='text-xs text-gray-400'>{provider.location}</p>
            <div className='flex items-center mt-1'>
              <StarRating rating={provider.rating} size='sm' />
              <span className='text-[10px] text-gray-400 ml-1'>
                {provider.rating} ({provider.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
        <span className='px-3 py-1 border border-primary/20 text-primary rounded-full text-[10px] font-bold'>
          {provider.category}
        </span>
      </div>

      {/* Body */}
      <div className='flex-grow'>
        <h4 className='text-sm font-bold text-gray-800 mb-2'>
          {provider.title}
        </h4>
        <p className='text-xs text-gray-500 mb-4 line-clamp-2'>
          {provider.description}
        </p>

        <div className='flex flex-wrap gap-2 mb-4'>
          {provider.skills.map((skill) => (
            <span
              key={skill}
              className='px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-[10px] font-medium'>
              {skill}
            </span>
          ))}
        </div>

        <div className='flex items-center gap-4 text-xs text-gray-400 mb-6 border-t border-gray-50 pt-4'>
          <div className='flex items-center gap-1'>
            <svg
              className='w-3.5 h-3.5 text-green-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
            </svg>
            <span>{provider.jobCount} jobs</span>
          </div>
          <div className='flex items-center gap-1'>
            <svg
              className='w-3.5 h-3.5'
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
            <span>{provider.responseTime}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='flex items-center justify-between mt-auto'>
        <div>
          <p className='text-[10px] text-gray-400'>Starting from</p>
          <p className='font-bold text-gray-900'>
            ${provider.startingPrice}
            <span className='text-xs text-gray-400'>/hr</span>
          </p>
        </div>
        <button className='bg-primary text-white px-8 py-2 rounded-lg text-sm font-bold shadow-md shadow-primary/10 hover:bg-primary-dark transition-colors duration-200'>
          CONTACT
        </button>
      </div>
    </article>
  );
}
