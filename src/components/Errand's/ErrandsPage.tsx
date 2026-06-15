"use client";

import React from "react";
import { useMyPosts } from "@/hooks/usePosts";
import { Loader2, AlertCircle, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/configs/api.config";
import { usePosts } from "../dashboard/client/MyPost/usePosts";
import { useAllErrands } from "@/hooks/useProfile";
import Image from "next/image";

const ErrandCard: React.FC<{ errand: any }> = ({ errand }) => {
  const isAssigned = !!errand.assignedTo;

  // Prefer the assigned Errand's profile picture, fallback to the post's photo, then default bg
  const displayImage =
    isAssigned && errand.assignedTo.profileImage
      ? getImageUrl(errand.assignedTo.profileImage)
      : getImageUrl(errand.photoUrl);
  console.log(errand, "ekhane hocce errand");

  return (
    <div className='bg-[#FDF5EC] rounded-lg p-5 flex gap-3.5 items-start relative border border-primary/10 hover:border-primary/30 transition-all'>
      {/* Errand Image */}
      <div className='w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-primary/10 bg-white flex items-center justify-center'>
        <Image
          src={errand.profileImage}
          width={80}
          height={80}
          alt={errand.title}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Content */}
      <div className='flex-1'>
        <h3 className='text-[16px] font-bold text-foreground mb-1.5 pr-18 leading-snug'>
          {errand.title}
        </h3>
        <p className='text-[12px] text-[#555555] leading-relaxed mb-2.5 line-clamp-2'>
          {errand.description}
        </p>
        <div className='flex items-center justify-between'>
          <p className='text-[14px] font-bold text-primary'>
            Reward: ${errand.budget || "Flexible"}
          </p>
          <div className='flex items-center text-[11px] text-gray-500'>
            <MapPin size={10} className='mr-1' />
            {errand.city}
          </div>
        </div>
        <p className='text-[11px] font-semibold text-[#555555] mt-2 tracking-wide flex items-center uppercase'>
          <span
            className={`w-2 h-2 rounded-full mr-2 ${isAssigned ? "bg-blue-500" : "bg-green-500"}`}></span>
          {isAssigned
            ? `STATUS: ASSIGNED TO ${errand.assignedTo.firstName}`
            : `STATUS: ${errand.status} – AWAITING ERRANDR`}
        </p>
      </div>

      {/* Time Badge */}
      <div className='absolute top-3.5 right-3.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide whitespace-nowrap flex items-center'>
        <Clock size={10} className='mr-1' />
        {errand.time || "Anytime"}
      </div>
    </div>
  );
};

const ErrandsPage: React.FC = () => {
  const { data: errands, isLoading, isError } = useAllErrands();

  const errandsList = errands || [];

  return (
    <div className='bg-primary min-h-screen font-sans'>
      <div className='mx-auto max-w-[1540px] px-6 lg:px-10 py-10'>
        {/* Header */}
        <div className='mb-7 flex justify-between items-end'>
          <div>
            <h1 className='text-[28px] font-extrabold text-white mb-1'>
              My Errands Board
            </h1>
            <p className='text-[13px] text-white/90 font-normal'>
              Manage your posted tasks and see who is assigned to them.
            </p>
          </div>
          <Link
            href='/post-errand'
            className='bg-white text-primary px-6 py-2 rounded-md font-bold text-sm hover:bg-white/90 transition-colors'>
            Post An Errand
          </Link>
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
              You haven't posted any errands yet
            </h2>
            <p className='text-white/70'>
              Click the button above to post your first errand!
            </p>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {errandsList.map((errand: any) => (
                <ErrandCard key={errand.id} errand={errand} />
              ))}
            </div>

            {/* Footer */}
            {/* <div className='text-center mt-8 text-[16px] text-white font-semibold'>
              Total Estimated Rewards:
              <span className='inline-block bg-background text-foreground rounded-full px-5 py-1.5 ml-2 font-bold text-[16px]'>
                $
                {errandsList
                  .reduce(
                    (sum: number, e: any) => sum + (parseFloat(e.budget) || 0),
                    0,
                  )
                  .toFixed(2)}
              </span>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default ErrandsPage;
