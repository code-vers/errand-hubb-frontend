"use client";

import { Play, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Ad {
  id: string;
  companyName: string;
  image: string;
  youtubeLink?: string;
  category: string;
}

const mockAds: Ad[] = [
  {
    id: "1",
    companyName: "Fresh Grocery Co.",
    category: "Grocery",
    image: "https://images.unsplash.com/photo-1704138031624-7aec2ed01304",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    companyName: "Tech Solutions Inc.",
    category: "IT Services",
    image: "https://images.unsplash.com/photo-1770581939371-326fc1537f10",
  },
  {
    id: "3",
    companyName: "Pet Care Professionals",
    category: "Pet Services",
    image: "https://images.unsplash.com/photo-1579677917230-8a938ffc0279",
  },
  {
    id: "4",
    companyName: "Swift Delivery",
    category: "Logistics",
    image: "https://images.unsplash.com/photo-1602333869619-f05b7f19d3c9",
  },
  {
    id: "5",
    companyName: "Home Sparkle",
    category: "Cleaning",
    image: "https://images.unsplash.com/photo-1580130857334-2f9b6d01d99d",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "6",
    companyName: "Garden Experts",
    category: "Landscaping",
    image: "https://images.unsplash.com/photo-1584445743187-cd8ba040349a",
  },
];

const AdsGallery = () => {
  const [ads] = useState<Ad[]>(mockAds);

  return (
    <div className='min-h-screen bg-white py-12 px-6 lg:px-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b pb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>
              Cumpany Posting Board ADS
            </h1>
            <p className='text-gray-500 mt-1'>Just $20 PER MONTH</p>
          </div>

          <Link
            href='/post-ad'
            className='flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[var(--color-primary-dark)] transition-all active:scale-95'>
            <Plus size={18} />
            Post New Poster
          </Link>
        </div>

        {/* Ads Grid - Poster Style */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
          {ads.map((ad) => (
            <div key={ad.id} className='flex flex-col gap-3'>
              {/* Poster Image */}
              <div className='relative w-full rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-gray-50'>
                <img
                  src={ad.image}
                  alt={ad.companyName}
                  className='w-full h-auto block'
                />
              </div>

              {/* Poster Info & Action */}
              <div className='flex justify-between items-center px-1'>
                <div>
                  <h3 className='font-bold text-gray-800 leading-tight'>
                    {ad.companyName}
                  </h3>
                  <p className='text-[11px] text-gray-400 uppercase font-bold tracking-tighter'>
                    {ad.category}
                  </p>
                </div>

                {ad.youtubeLink && (
                  <a
                    href={ad.youtubeLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-[12px] font-bold hover:bg-red-100 transition-colors border border-red-100'
                    title='Watch Video'>
                    <Play size={14} fill='currentColor' />
                    Video
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {ads.length === 0 && (
          <div className='text-center py-20 border-2 border-dashed border-gray-100 rounded-2xl'>
            <p className='text-gray-400 font-medium'>
              No posters available yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdsGallery;
