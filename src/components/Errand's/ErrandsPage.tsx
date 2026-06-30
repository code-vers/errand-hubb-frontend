"use client";

import React from "react";
import { Loader2, AlertCircle, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/configs/api.config";
import { useProviders } from "@/hooks/useProviders";
import Pagination from "@/components/common/Pagination";
import PublicUserProfileModal from "@/components/common/PublicUserProfileModal";
import { useState } from "react";

const ErrandCard: React.FC<{ errand: any; onUserClick: (user: any) => void }> = ({ errand: post, onUserClick }) => {
  // Map Post object to Card UI
  const user = post.user;
  
  const title = post.title || `${user.firstName} ${user.lastName}`;
  const description = post.description || "Available for errands.";
  const budget = post.budget || "Flexible";
  const city = post.city || "Location not set";
  const time = post.dateNeeded ? new Date(post.dateNeeded).toLocaleDateString() : "Flexible";
  
  const displayImage = getImageUrl(user.profileImage) || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop";

  return (
    <div className='bg-[#FDF5EC] rounded-lg p-5 flex gap-3.5 items-start relative border border-primary/10 hover:border-primary/30 transition-all'>
      {/* Errand Image */}
      <div 
        className='w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-primary/10 bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity'
        onClick={() => onUserClick(user)}
      >
        <img
          src={displayImage}
          alt={title}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Content */}
      <div className='flex-1'>
        <h3 
          className='text-[16px] font-bold text-foreground mb-1.5 pr-18 leading-snug cursor-pointer hover:text-primary transition-colors hover:underline inline-block'
          onClick={() => onUserClick(user)}
        >
          {title}
        </h3>
        <p className='text-[12px] text-[#555555] leading-relaxed mb-2.5 line-clamp-2'>
          {description}
        </p>
        <div className='flex items-center justify-between'>
          <p className='text-[14px] font-bold text-primary'>
            Reward: ${budget}
          </p>
          <div className='flex items-center text-[11px] text-gray-500'>
            <MapPin size={10} className='mr-1' />
            {city}
          </div>
        </div>
        <p className='text-[11px] font-semibold text-[#555555] mt-2 tracking-wide flex items-center uppercase'>
          <span className="w-2 h-2 rounded-full mr-2 bg-green-500"></span>
          STATUS: AVAILABLE - AWAITING HIRE
        </p>
      </div>

      {/* Time Badge */}
      <div className='absolute top-3.5 right-3.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide whitespace-nowrap flex items-center'>
        <Clock size={10} className='mr-1' />
        {time}
      </div>
    </div>
  );
};

const ErrandsPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const { 
    providers: posts, 
    loading: isLoading, 
    error: isError,
    totalPages,
    currentPage,
    setPage
  } = useProviders(10);

  const errandsList = posts || [];

  return (
    <div className='bg-primary min-h-screen font-sans'>
      <div className='mx-auto max-w-[1540px] px-6 lg:px-10 py-10'>
        {/* Header */}
        <div className='mb-7 flex justify-between items-end'>
          <div>
            <h1 className='text-[28px] font-extrabold text-white mb-1'>
              Errand's Board
            </h1>
            <p className='text-[13px] text-white/90 font-normal'>
              Browse available errand professionals ready to help.
            </p>
          </div>
        </div>

        {/* State Handling */}
        {isLoading ? (
          <div className='flex justify-center py-20'>
            <Loader2 className='w-10 h-10 animate-spin text-white' />
          </div>
        ) : isError ? (
          <div className='flex flex-col items-center justify-center py-20 gap-4 text-white'>
            <AlertCircle className='w-12 h-12' />
            <h2 className='text-xl font-bold'>Unable to load errands</h2>
            <p className='text-white/80'>{isError}</p>
            <button
              onClick={() => window.location.reload()}
              className='px-6 py-2 bg-white text-primary rounded-md font-bold'>
              Retry
            </button>
          </div>
        ) : errandsList.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 gap-4 bg-white/10 rounded-2xl'>
            <AlertCircle className='w-12 h-12 text-white/50' />
            <h2 className='text-xl font-bold text-white'>
              No errands found at the moment
            </h2>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {errandsList.map((errand: any) => (
                <ErrandCard key={errand.id} errand={errand} onUserClick={setSelectedUser} />
              ))}
            </div>

            {/* Pagination */}
            <div className='mt-10 flex justify-center'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>

      <PublicUserProfileModal 
        user={selectedUser} 
        isOpen={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
      />
    </div>
  );
};

export default ErrandsPage;
