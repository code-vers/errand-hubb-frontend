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
      <div className='px-4 sm:px-6 pt-5 sm:pt-6'>
        {/* Top Info Row: Avatar + Name, Location, Rating */}
        <div className='flex items-start gap-3 sm:gap-3.5 min-w-0'>
          <div className='relative shrink-0'>
            <img
              alt={provider.firstName}
              className='w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-[2px] border-[#FDCBA4] object-cover'
              src={
                getImageUrl(provider.profileImage) ||
                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop'
              }
            />
            <div className='absolute -bottom-1 -right-1 bg-white text-white rounded-full p-0.5 shadow-xs'>
              <CircleCheckBig size={18} className='text-[#FBBC04]' />
            </div>
          </div>

          <div className='min-w-0 flex-1'>
            <h3 className='font-bold text-gray-900 text-base sm:text-[17px] leading-snug break-words'>
              {provider.firstName} {provider.lastName}
            </h3>
            <p className='text-xs flex items-center mt-0.5 gap-1 font-medium text-[#6B6B6B]'>
              <MapPin size={13} color='#FBBC04' className='shrink-0' />
              <span className='truncate'>
                {profile.city || 'Remote'}{profile.state ? `, ${profile.state}` : ''}
              </span>
            </p>
            <div className='flex items-center gap-1.5 mt-1 flex-wrap'>
              {provider.reviewCount > 0 || provider.rating > 0 ? (
                <>
                  <StarRating rating={provider.rating || 5} size='sm' />
                  <span className='text-[11px] sm:text-xs text-[#6B6B6B] font-medium shrink-0'>
                    {provider.rating ? provider.rating.toFixed(1) : "5.0"} ({provider.reviewCount || 1} {provider.reviewCount === 1 ? 'review' : 'reviews'})
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof window !== 'undefined') {
                        const event = new CustomEvent('open-reviews-list-modal', {
                          detail: {
                            userId: provider.id,
                            userName: `${provider.firstName} ${provider.lastName}`,
                          },
                        });
                        window.dispatchEvent(event);
                      }
                    }}
                    className="text-[10px] font-extrabold text-orange-600 hover:underline cursor-pointer ml-1"
                  >
                    See Reviews
                  </button>
                </>
              ) : (
                <span className='text-[11px] text-gray-400 font-medium italic'>
                  No reviews yet
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sub-Header Row: Service Category Badges & Gallery Action Button */}
        <div className='flex items-center justify-between gap-2 mt-3.5 pt-2.5 border-t border-gray-100 flex-wrap'>
          <div className='flex items-center gap-1.5 flex-wrap min-w-0 max-w-full'>
            <span
              onClick={() => onOpenDetails && onOpenDetails(provider)}
              className='px-2.5 py-1 text-[#ec6f27] border border-[#ec6f27]/40 bg-[#FDF0E3] rounded-full text-xs font-semibold max-w-[170px] sm:max-w-[200px] truncate cursor-pointer hover:bg-[#FCE3CE] transition-colors'
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
                className='px-2 py-0.5 text-[11px] font-bold text-[#ec6f27] bg-[#FDF0E3] hover:bg-[#FCE3CE] border border-[#ec6f27]/50 rounded-full transition-colors cursor-pointer shrink-0'
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
            className='text-primary text-xs font-bold hover:underline bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-md transition-colors shrink-0 cursor-pointer ml-auto'
          >
            More Images
          </button>
        </div>
      </div>

      <div className='bg-[#f5e9d3] w-full h-px mb-3 sm:mb-4 mt-3'></div>

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

