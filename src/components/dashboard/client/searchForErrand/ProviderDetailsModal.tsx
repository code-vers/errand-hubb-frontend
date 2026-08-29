'use client';

import { X, CheckCircle2, MapPin, PlayCircle, Image as ImageIcon, Phone, Briefcase, Calendar } from 'lucide-react';
import Image from 'next/image';
import { getImageUrl } from '@/configs/api.config';
import StarRating from './StarRating';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/category.service';

interface ProviderDetailsModalProps {
  provider: any | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenGallery: (images: string[]) => void;
}

export default function ProviderDetailsModal({
  provider,
  isOpen,
  onClose,
  onOpenGallery,
}: ProviderDetailsModalProps) {
  // Always call hooks unconditionally at the top level
  const { data: categories = [] } = useQuery({
    queryKey: ['categories-active'],
    queryFn: () => categoryService.getActive(),
    enabled: Boolean(isOpen && provider),
  });

  if (!isOpen || !provider) return null;

  const profile = provider.profile || {};
  const gallery = profile.gallery || [];
  const rawVideoLinks: string[] = profile.youtubeLinks && profile.youtubeLinks.length > 0
    ? profile.youtubeLinks
    : profile.youtubeLink ? [profile.youtubeLink] : [];

  const videoIds = rawVideoLinks
    .map((link: string) => (link ? getYoutubeVideoId(link) : null))
    .filter((id: string | null): id is string => Boolean(id));

  const selectedCategories = categories.filter((c: any) =>
    (profile.categoryIds || []).includes(c.id),
  );

  // Split services string into array if comma-separated
  const servicesList = profile.services
    ? profile.services.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200'>
      <div className={`bg-white rounded-2xl w-full ${videoIds.length > 1 ? 'max-w-4xl' : 'max-w-2xl'} max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200`}>
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50'>
          <h2 className='text-xl font-bold text-gray-900'>Provider Details</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer'
          >
            <X size={20} className='text-gray-500' />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='overflow-y-auto p-6 space-y-8'>
          {/* Top Info */}
          <div className='flex flex-col sm:flex-row items-start gap-5'>
            <img
              alt={provider.firstName}
              src={
                getImageUrl(provider.profileImage) ||
                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop'
              }
              className='w-24 h-24 rounded-xl border-4 border-[#FDCBA4] object-cover shrink-0'
            />
            <div className='flex-1 min-w-0'>
              <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2 flex-wrap'>
                <span>{provider.firstName} {provider.lastName}</span>
                <CheckCircle2 size={20} className='text-[#FBBC04] shrink-0' />
              </h3>
              <p className='text-gray-500 flex items-center gap-1.5 mt-1 text-sm'>
                <MapPin size={16} className='text-[#FBBC04] shrink-0' />
                <span>{profile.city || 'Remote'}, {profile.state || ''}</span>
              </p>
              <div className='flex items-center gap-2 mt-2 flex-wrap'>
                {provider.reviewCount > 0 || provider.rating > 0 ? (
                  <>
                    <StarRating rating={provider.rating || 5} size='sm' />
                    <span className='text-sm text-gray-500'>
                      {provider.rating ? provider.rating.toFixed(1) : "5.0"} ({provider.reviewCount || 1} {provider.reviewCount === 1 ? 'review' : 'reviews'})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
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
                      className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-600 font-extrabold text-xs rounded-md transition-all cursor-pointer ml-1"
                    >
                      See Reviews
                    </button>
                  </>
                ) : (
                  <span className='text-xs text-gray-400 font-medium italic'>
                    No reviews yet
                  </span>
                )}
              </div>

              {/* Services Badges */}
              <div className='mt-3 flex flex-wrap gap-2'>
                {servicesList.length > 0 ? (
                  servicesList.map((service: string, idx: number) => (
                    <span
                      key={idx}
                      className='px-3 py-1 bg-[#FDF0E3] text-[#ec6f27] rounded-full text-xs font-semibold border border-[#ec6f27]/30'
                    >
                      {service}
                    </span>
                  ))
                ) : (
                  <span className='px-3 py-1 bg-[#FDF0E3] text-[#ec6f27] rounded-full text-xs font-semibold border border-[#ec6f27]/30'>
                    Errand Provider
                  </span>
                )}
              </div>
            </div>

            <div className='sm:text-right shrink-0'>
              <p className='text-xs text-gray-500 uppercase tracking-wider font-semibold'>Rate</p>
              <p className='text-2xl font-bold text-gray-900'>
                ${profile.ratePerHour || 'Negotiable'}
                {profile.ratePerHour && <span className='text-sm text-gray-500 font-normal'>/hr</span>}
              </p>
            </div>
          </div>

          {/* Quick Stats & Info Grid */}
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs'>
            {profile.phone && (
              <div className='flex items-center gap-2 text-gray-700'>
                <Phone size={16} className='text-primary shrink-0' />
                <div>
                  <span className='text-gray-400 block text-[10px] uppercase font-medium'>Phone</span>
                  <span className='font-semibold'>{profile.phone}</span>
                </div>
              </div>
            )}
            <div className='flex items-center gap-2 text-gray-700'>
              <Briefcase size={16} className='text-green-500 shrink-0' />
              <div>
                <span className='text-gray-400 block text-[10px] uppercase font-medium'>Jobs Completed</span>
                <span className='font-semibold'>{profile.jobsCompleted || 0} jobs</span>
              </div>
            </div>
            {profile.createdAt && (
              <div className='flex items-center gap-2 text-gray-700'>
                <Calendar size={16} className='text-amber-500 shrink-0' />
                <div>
                  <span className='text-gray-400 block text-[10px] uppercase font-medium'>Joined</span>
                  <span className='font-semibold'>
                    {new Date(profile.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <div>
            <h4 className='text-lg font-bold text-gray-900 mb-3'>About Me</h4>
            <div className='bg-gray-50 p-4 rounded-xl border border-gray-100'>
              <p className='text-gray-700 whitespace-pre-line leading-relaxed text-sm'>
                {profile.bio || 'No description provided by this provider yet.'}
              </p>
            </div>
          </div>

          {/* Selected Categories */}
          {selectedCategories.length > 0 && (
            <div>
              <h4 className='text-lg font-bold text-gray-900 mb-3'>Selected Categories</h4>
              <div className='flex flex-wrap gap-3'>
                {selectedCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className='flex items-center gap-2 bg-[#FDF5EC] px-4 py-2 rounded-lg border border-[#F47A22]/20 shadow-2xs'
                  >
                    <span style={{ color: cat.color || 'inherit' }}>
                      {cat.iconType === 'emoji' ? (
                        cat.icon
                      ) : (
                        <img
                          src={getImageUrl(cat.icon) || ''}
                          alt={cat.name}
                          className='w-5 h-5 object-contain'
                        />
                      )}
                    </span>
                    <span className='text-sm font-semibold text-[#5C4A2A]'>{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media Section */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Gallery Preview */}
            {gallery.length > 0 && (
              <div>
                <h4 className='text-lg font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <ImageIcon size={18} className='text-primary' />
                  Photos ({gallery.length})
                </h4>
                <div
                  onClick={() => {
                    onClose();
                    onOpenGallery(gallery);
                  }}
                  className='relative h-48 rounded-xl overflow-hidden cursor-pointer group'
                >
                  <img
                    src={getImageUrl(gallery[0])}
                    alt='Gallery preview'
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                    <span className='text-white font-medium bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm'>
                      View All Photos
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Video Previews (Up to 3) */}
            {videoIds.length > 0 && (
              <div>
                <h4 className='text-lg font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <PlayCircle size={18} className='text-red-500' />
                  {videoIds.length > 1 ? `Video Introductions (${videoIds.length})` : 'Video Intro'}
                </h4>
                <div className={`grid gap-4 ${videoIds.length === 1 ? 'grid-cols-1' : videoIds.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                  {videoIds.map((vId, idx) => (
                    <div key={vId + idx} className='flex flex-col gap-1.5'>
                      <div className='h-48 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-black/5'>
                        <iframe
                          width='100%'
                          height='100%'
                          src={`https://www.youtube.com/embed/${vId}`}
                          title={`Provider Introduction ${idx + 1}`}
                          frameBorder='0'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                          allowFullScreen
                        ></iframe>
                      </div>
                      {videoIds.length > 1 && (
                        <span className='text-xs font-semibold text-gray-500 text-center'>
                          Video {idx + 1}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors cursor-pointer'
          >
            Close
          </button>
          <Link
            href={`/dashboard/messages?userId=${provider.id}`}
            className='px-8 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl transition-all cursor-pointer'
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper to extract YouTube video ID from various URL formats
function getYoutubeVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}
