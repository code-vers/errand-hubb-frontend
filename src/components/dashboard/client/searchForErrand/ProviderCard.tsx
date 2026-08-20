'use client';

import { getImageUrl } from '@/configs/api.config';
import { categoryService } from '@/services/category.service';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, CircleCheckBig, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import StarRating from './StarRating';

interface ProviderCardProps {
  provider: any; // User object with profile
  onOpenGallery?: (images: string[]) => void;
  onOpenDetails?: (provider: any) => void;
}

export default function ProviderCard({
  provider,
  onOpenGallery,
  onOpenDetails,
}: ProviderCardProps) {
  const profile = provider.profile || {};

  // Fetch active categories from backend
  const { data: categories = [] } = useQuery({
    queryKey: ['categories-active'],
    queryFn: () => categoryService.getActive(),
  });

  // Map categoryIds to category names if present
  const categoryNames = categories
    .filter((cat: any) => (profile.categoryIds || []).includes(cat.id))
    .map((cat: any) => cat.name);

  // Determine services string or list
  const rawServices =
    profile.services?.trim() ||
    (categoryNames.length > 0 ? categoryNames.join(', ') : 'Errand Provider');

  // Truncate at 10 characters to prevent header overflow
  const isLong = rawServices.length > 10;
  const displayedServices = isLong ? `${rawServices.slice(0, 10)}...` : rawServices;

  return (
    <article className='bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300 overflow-hidden'>
      {/* Header */}
      <div className='flex justify-between items-start mb-3 sm:mb-4 px-4 sm:px-6 pt-5 sm:pt-6 gap-2 sm:gap-3'>
        <div className='flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1'>
          <div className='relative shrink-0'>
            <img
              alt={provider.firstName}
              className='w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-[2px] border-[#FDCBA4] object-cover'
              src={
                getImageUrl(provider.profileImage) ||
                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop'
              }
            />
            {/* Keeping the verified checkmark for design consistency */}
            <div className='absolute -bottom-1 -right-1 bg-white text-white rounded-full p-0.5'>
              <CircleCheckBig size={18} className='text-[#FBBC04]' />
            </div>
          </div>
          <div className='min-w-0 flex-1'>
            <h3 className='font-semibold text-foreground text-sm sm:text-[16px] leading-tight truncate'>
              {provider.firstName} {provider.lastName}
            </h3>
            <p className='text-xs flex items-center py-0.5 sm:py-1 gap-1 font-normal text-[#6B6B6B] truncate'>
              <MapPin size={13} color='#FBBC04' className='shrink-0' />
              <span className='truncate'>
                {profile.city || 'Remote'}, {profile.state || ''}
              </span>
            </p>
            <div className='flex items-center mt-0.5 sm:mt-1'>
              {provider.reviewCount > 0 || provider.rating > 0 ? (
                <>
                  <StarRating rating={provider.rating || 5} size='sm' />
                  <span className='text-[10px] sm:text-[11px] text-[#6B6B6B] ml-1 shrink-0'>
                    {provider.rating ? provider.rating.toFixed(1) : "5.0"} ({provider.reviewCount || 1} {provider.reviewCount === 1 ? 'review' : 'reviews'})
                  </span>
                </>
              ) : (
                <span className='text-[10px] sm:text-[11px] text-gray-400 font-medium italic'>
                  No reviews yet
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Header Section: Services Badge & More Button */}
        <div className='flex flex-col items-end gap-1.5 shrink-0 max-w-[130px] sm:max-w-[150px]'>
          <div className='flex items-center gap-1 flex-wrap justify-end'>
            <span
              onClick={() => onOpenDetails && onOpenDetails(provider)}
              className='px-2 sm:px-2.5 py-0.5 sm:py-1 text-[#ec6f27] border border-[#ec6f27]/40 bg-[#FDF0E3] rounded-full text-[11px] sm:text-[12px] font-medium max-w-[95px] sm:max-w-[110px] truncate cursor-pointer hover:bg-[#FCE3CE] transition-colors'
              title={rawServices}
            >
              {displayedServices}
            </span>
            {isLong && (
              <button
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onOpenDetails) onOpenDetails(provider);
                }}
                className='px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-[#ec6f27] bg-[#FDF0E3] hover:bg-[#FCE3CE] border border-[#ec6f27]/50 rounded-full transition-colors cursor-pointer shrink-0 shadow-2xs'
                title='Click to see all services and details'
              >
                +More
              </button>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              const gallery = profile.gallery || [];
              if (gallery.length > 0 && onOpenGallery) {
                onOpenGallery(gallery);
              } else {
                toast.info('No images available for this provider.');
              }
            }}
            className='text-primary text-[10px] sm:text-[11px] font-semibold hover:underline bg-primary/5 px-2 py-1 rounded-md transition-colors'
          >
            More Images
          </button>
        </div>
      </div>
      <div className='bg-[#f5e9d3] w-full h-px mb-3 sm:mb-4 mt-1'></div>

      {/* Body */}
      <div className='grow'>
        <div className='px-4 sm:px-6'>
          <h4 className='text-xs sm:text-[14px] text-foreground font-semibold mb-1'>
            {profile.bio ? 'About Me' : 'Errand Services'}
          </h4>
          <p className='text-xs text-text-secondary mb-3 sm:mb-4 line-clamp-2'>
            {profile.bio || 'No description provided.'}
          </p>

          <div className='flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4'>
            {['Reliable', 'Verified'].map((skill) => (
              <span
                key={skill}
                className='px-2.5 py-0.5 sm:px-3 sm:py-1 bg-warning-light text-[#6B6B6B] rounded-lg text-[10px] font-medium'
              >
                {skill}
              </span>
            ))}
          </div>

          <div className='flex items-center gap-3 sm:gap-4 text-xs text-gray-400 pb-3 sm:pb-4'>
            <div className='flex items-center gap-1.5'>
              <CheckCircle2 size={15} className='text-green-500' strokeWidth={2.5} />
              <span>{profile.jobsCompleted ? `${profile.jobsCompleted} jobs` : '15 jobs'}</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Clock size={15} className='text-[#FBBC04]' strokeWidth={2.5} />
              <span>Available Now</span>
            </div>
          </div>
        </div>
        <div className='bg-[#f5e9d3] w-full h-px mb-4 sm:mb-5'></div>
      </div>

      {/* Footer - 2 Rows for Clean Mobile Responsiveness */}
      <div className='px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col gap-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-[11px] sm:text-xs text-text-secondary font-medium'>Starting from</span>
          <span className='font-bold text-gray-900 text-sm sm:text-base'>
            ${profile.ratePerHour || 'Negotiable'}
            {profile.ratePerHour && <span className='text-xs text-gray-400 font-normal'>/hr</span>}
          </span>
        </div>
        <div className='grid grid-cols-2 gap-2 w-full'>
          <button
            type='button'
            onClick={() => onOpenDetails && onOpenDetails(provider)}
            className='w-full py-2 px-2 bg-white text-primary border border-primary rounded-lg text-xs sm:text-sm font-bold shadow-xs hover:bg-primary/5 transition-colors duration-200 cursor-pointer text-center truncate'
          >
            View Details
          </button>
          <Link
            href={`/dashboard/messages?errandId=${provider.id}`}
            className='w-full py-2 px-2 bg-primary text-white rounded-lg text-xs sm:text-sm font-bold shadow-md shadow-primary/10 hover:bg-primary-dark transition-colors duration-200 text-center truncate block'
          >
            CONTACT
          </Link>
        </div>
      </div>
    </article>
  );
}

