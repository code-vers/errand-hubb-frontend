import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '@/configs/api.config';

interface ImageGalleryModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ images, isOpen, onClose }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div
      className='fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-6'
      onClick={() => {
        onClose();
        setGalleryIndex(0);
      }}
    >
      <div
        className='relative w-full max-w-4xl flex flex-col items-center justify-center'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute -top-12 right-0 p-2 bg-white/15 hover:bg-white/25 rounded-full text-white transition-colors'
          onClick={() => {
            onClose();
            setGalleryIndex(0);
          }}
        >
          <X size={24} />
        </button>

        <div className='relative w-full aspect-[4/3] max-h-[70vh] bg-black/60 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/10'>
          <img
            src={getImageUrl(images[galleryIndex])}
            alt={`Gallery image ${galleryIndex + 1}`}
            className='w-full h-full object-contain select-none transition-all duration-300'
          />

          {images.length > 1 && (
            <button
              onClick={() =>
                setGalleryIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }
              className='absolute left-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors border border-white/15 flex items-center justify-center hover:scale-105 active:scale-95 duration-200'
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {images.length > 1 && (
            <button
              onClick={() =>
                setGalleryIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
              }
              className='absolute right-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors border border-white/15 flex items-center justify-center hover:scale-105 active:scale-95 duration-200'
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {images.length > 1 && (
          <div className='mt-4 flex flex-col items-center gap-3 w-full'>
            <div className='flex gap-2'>
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    idx === galleryIndex
                      ? 'bg-[#F47A22] scale-125'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <div className='flex gap-2 justify-center max-w-full overflow-x-auto py-1'>
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryIndex(idx)}
                  className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                    idx === galleryIndex
                      ? 'border-[#F47A22] opacity-100 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={getImageUrl(imgUrl)}
                    alt={`thumb-${idx}`}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGalleryModal;
