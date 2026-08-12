"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowLeft, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const MORE_GALLERY_ITEMS = [
  { src: "/gallary/gallary.png", alt: "Senior Care & Helper Errand" },
  { src: "/gallary/gallary2.png", alt: "Friendly Client Greeting" },
  { src: "/gallary/gallery3.png", alt: "On-the-Go Errand Runner" },
  { src: "/gallary/gallery4.png", alt: "Doorstep Delivery Helper" },
  { src: "/gallary/gallery5.png", alt: "Document & Package Handover" },
  { src: "/gallary/gallery6.png", alt: "Device Installation & Tech Help" },
  { src: "/gallary/gallery7.png", alt: "Fresh Grocery Bag Delivery" },
  { src: "/gallary/gallery8.png", alt: "Unpacking & Kitchen Help" },
  { src: "/gallary/gallery9.png", alt: "Moving & Kitchen Utensils Assistance" },
  { src: "/gallary/Container (8).png", alt: "Paperwork & Admin Helper" },
];

const MoreGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === 0 ? MORE_GALLERY_ITEMS.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === MORE_GALLERY_ITEMS.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  const selectedItem = selectedIndex !== null ? MORE_GALLERY_ITEMS[selectedIndex] : null;

  return (
    <section className='w-full py-8 sm:py-12'>
      <div className='mx-auto w-full max-w-6xl px-4 sm:px-6'>
        <div className="mb-6">
          <Link href="/gallery" className="inline-flex items-center text-primary hover:underline font-bold text-sm sm:text-base">
            <ArrowLeft size={18} className="mr-2" />
            Back to Gallery
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 tracking-tight text-gray-900">
          More Errand Memories & Services
        </h1>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>
          {MORE_GALLERY_ITEMS.map((item, index) => (
            <div
              key={index}
              className='group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform active:scale-[0.98]'
              onClick={() => setSelectedIndex(index)}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                className='object-cover group-hover:scale-105 transition-transform duration-500'
                sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity' />
              <div className='absolute bottom-0 inset-x-0 p-2.5 sm:p-3 flex items-end justify-between gap-1'>
                <span className='text-white font-bold text-xs sm:text-sm drop-shadow-md line-clamp-1 leading-tight'>
                  {item.alt}
                </span>
                <span className='shrink-0 p-1 rounded-full bg-white/20 text-white backdrop-blur-sm group-hover:bg-primary transition-colors'>
                  <Maximize2 className='w-3 h-3 sm:w-3.5 sm:h-3.5' />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && selectedIndex !== null && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200 select-none'
          onClick={() => setSelectedIndex(null)}>
          
          <button
            onClick={() => setSelectedIndex(null)}
            className='absolute top-4 right-4 z-50 p-3 rounded-full bg-black/60 text-white hover:bg-primary border border-white/20 shadow-2xl transition-all active:scale-90 cursor-pointer'
            aria-label='Close modal'>
            <X className='w-6 h-6' />
          </button>

          <button
            onClick={handlePrev}
            className='absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/60 text-white hover:bg-primary border border-white/20 shadow-2xl transition-all active:scale-90 cursor-pointer'
            aria-label='Previous image'>
            <ChevronLeft className='w-6 h-6' />
          </button>

          <button
            onClick={handleNext}
            className='absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/60 text-white hover:bg-primary border border-white/20 shadow-2xl transition-all active:scale-90 cursor-pointer'
            aria-label='Next image'>
            <ChevronRight className='w-6 h-6' />
          </button>

          <div
            className='relative w-full max-w-4xl max-h-[85vh] h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center'
            onClick={(e) => e.stopPropagation()}>
            <div className='relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black/40 border border-white/10'>
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                unoptimized
                className='object-contain p-2 sm:p-4'
                priority
                sizes='(max-width: 768px) 100vw, 80vw'
              />
              
              <div className='absolute bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-5 bg-black/75 backdrop-blur-md px-4 py-2.5 sm:py-3 rounded-xl border border-white/15 text-center shadow-xl'>
                <p className='text-white font-extrabold text-sm sm:text-base tracking-wide'>
                  {selectedItem.alt}
                </p>
                <p className='text-white/70 text-xs mt-0.5 hidden sm:block'>
                  ErrandHubb On-Demand Service • Image {selectedIndex + 1} of {MORE_GALLERY_ITEMS.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MoreGallery;

