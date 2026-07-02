import React from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '@/configs/api.config';
import { PostUser } from '@/types/search';

interface PublicUserProfileModalProps {
  user: PostUser | null;
  isOpen: boolean;
  onClose: () => void;
}

const PublicUserProfileModal: React.FC<PublicUserProfileModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  const displayImage =
    getImageUrl(user.profileImage) ||
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop';
  
  const gallery = user.profile?.gallery || [];

  return (
    <>
      {/* Modal Backdrop */}
      <div
        aria-hidden='true'
        className='fixed inset-0 backdrop-blur-sm z-[100] bg-black/60 transition-opacity'
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className='fixed inset-0 z-[101] w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
          {/* Modal Panel */}
          <div 
            className='relative transform overflow-hidden rounded-[24px] bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className='px-6 py-6 sm:px-8 sm:py-8 flex justify-between items-start'
              style={{
                background: "linear-gradient(135deg, #FFDEB3 0%, #FFEBCD 100%)",
              }}>
              <div className='flex items-center space-x-5'>
                 <div className='h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden shadow-md bg-white p-1'>
                   <img
                     alt={`${user.firstName} ${user.lastName}`}
                     className='h-full w-full rounded-xl object-cover'
                     src={displayImage}
                   />
                 </div>
                 <div className='text-left mt-2'>
                   <h2 className='text-[24px] sm:text-[28px] font-extrabold text-foreground tracking-tight leading-none mb-1'>
                     {user.firstName} {user.lastName}
                   </h2>
                 </div>
              </div>

              {/* Close Button */}
              <button
                aria-label='Close'
                onClick={onClose}
                className='rounded-full p-2 hover:bg-white/80 transition-colors focus:outline-none bg-white/50 backdrop-blur-md shadow-sm'
                >
                <X className='h-5 w-5 text-gray-700' aria-hidden='true' />
              </button>
            </div>

            {/* Modal Body */}
            <div className='bg-white px-6 py-8 sm:px-8 sm:py-10'>
              <div className='mb-4 flex items-center text-[16px] font-bold text-foreground'>
                <ImageIcon className='w-5 h-5 text-primary mr-2' />
                Gallery
              </div>
              
              {gallery.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                  {gallery.map((imgUrl, idx) => (
                    <div key={idx} className='relative aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group'>
                      <img
                        src={getImageUrl(imgUrl)}
                        alt={`Gallery item ${idx + 1}`}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-200'>
                   <p className='text-gray-500 font-medium'>No gallery images available.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicUserProfileModal;
