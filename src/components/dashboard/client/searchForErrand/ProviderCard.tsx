"use client";

import { Post } from "@/types/search";
import { CheckCircle2, CircleCheckBig, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import StarRating from "./StarRating";
import Link from "next/link";
import { getImageUrl } from "@/configs/api.config";

interface ProviderCardProps {
  provider: Post;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <article className='bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300'>
      {/* Header */}
      <div className='flex justify-between items-start mb-4 px-6 pt-6'>
        <div className='flex items-center gap-3 '>
          <div className='relative'>
            <img
              alt={provider.user.firstName}
              className='w-16 h-16 rounded-lg border-[2px] border-[#FDCBA4]  object-cover'
              src={getImageUrl(provider.user.profileImage) || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop"}
            />
            {/* Keeping the verified checkmark for design consistency */}
            <div className='absolute -bottom-1 -right-1 bg-white text-white rounded-full p-0.5'>
              <CircleCheckBig size={20} className='text-[#FBBC04]' />
            </div>
          </div>
          <div>
            <h3 className='font-semibold text-foreground text-[16px]  leading-tight'>
              {provider.user.firstName} {provider.user.lastName}
            </h3>
            <p className='text-xs flex items-center py-1 gap-1 font-normal text-[#6B6B6B]  '>
              <MapPin size={14} color='#FBBC04' />
              {provider.city}, {provider.state}
            </p>
            <div className='flex items-center mt-1'>
              {/* Mock rating for design consistency */}
              <StarRating rating={4.9} size='sm' />
              <span className='text-[11px] text-[#6B6B6B] ml-1'>
                4.9 (12 reviews)
              </span>
            </div>
          </div>
        </div>
        <span className='px-3 py-1 text-[#ec6f27] border border-[#ec6f27] bg-[#FDF0E3]  rounded-full text-[14px] font-normal'>
          {provider.category.name}
        </span>
      </div>
      <div className='bg-[#f5e9d3] w-full h-px mb-4 mt-1'></div>
      {/* Body */}
      <div className='grow'>
        <div className='px-6'>
          <h4 className='text-[14px]  text-foreground font-semibold mb-1'>
            {provider.title}
          </h4>
          <p className='text-xs text-text-secondary mb-4 line-clamp-2'>
            {provider.description}
          </p>

          <div className='flex flex-wrap gap-2 mb-4'>
            {[provider.category.name, "Reliable"].map((skill) => (
              <span
                key={skill}
                className='px-3 py-1 bg-warning-light text-[#6B6B6B] rounded-lg text-[10px] font-medium'>
                {skill}
              </span>
            ))}
          </div>

          <div className='flex items-center gap-4 text-xs text-gray-400 pb-4'>
            <div className='flex items-center gap-1.5'>
              <CheckCircle2
                size={15}
                className='text-green-500'
                strokeWidth={2.5}
              />
              {/* Mock job count to preserve original layout */}
              <span>15 jobs</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Clock size={15} className='text-[#FBBC04]' strokeWidth={2.5} />
              <span>{provider.dateNeeded ? new Date(provider.dateNeeded).toLocaleDateString() : 'Flexible'}</span>
            </div>
          </div>
        </div>
        <div className='bg-[#f5e9d3] w-full h-px mb-6'></div>
      </div>

      {/* Footer */}
      <div className='flex items-center justify-between px-6 pb-6'>
        <div>
          <p className='text-[10px] text-text-secondary'>
            Starting from
          </p>
          <p className='font-bold text-gray-900'>
            ${provider.budget || "Negotiable"}
            {provider.budget && <span className='text-xs text-gray-400'>/hr</span>}
          </p>
        </div>
        <Link 
          href={`/dashboard/messages?errandId=${provider.user.id}`}
          className='bg-primary text-white px-8 py-2 rounded-lg text-sm font-bold shadow-md shadow-primary/10 hover:bg-primary-dark transition-colors duration-200'>
          CONTACT
        </Link>
      </div>
    </article>
  );
}
