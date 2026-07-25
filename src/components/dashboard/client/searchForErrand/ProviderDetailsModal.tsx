"use client";

import { X, CheckCircle2, MapPin, PlayCircle, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/configs/api.config";
import StarRating from "./StarRating";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";

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
  if (!isOpen || !provider) return null;

  const profile = provider.profile || {};
  const gallery = profile.gallery || [];
  const videoId = profile.youtubeLink ? getYoutubeVideoId(profile.youtubeLink) : null;
  const { data: categories = [] } = useQuery({
    queryKey: ["categories-active"],
    queryFn: () => categoryService.getActive(),
  });
  
  const selectedCategories = categories.filter((c: any) => (profile.categoryIds || []).includes(c.id));

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200'>
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50'>
          <h2 className='text-xl font-bold text-gray-900'>Provider Details</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-200 rounded-full transition-colors'
          >
            <X size={20} className='text-gray-500' />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='overflow-y-auto p-6 space-y-8'>
          {/* Top Info */}
          <div className='flex items-start gap-5'>
            <img
              alt={provider.firstName}
              src={getImageUrl(provider.profileImage) || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop"}
              className='w-24 h-24 rounded-xl border-4 border-[#FDCBA4] object-cover'
            />
            <div className='flex-1'>
              <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
                {provider.firstName} {provider.lastName}
                <CheckCircle2 size={20} className='text-[#FBBC04]' />
              </h3>
              <p className='text-gray-500 flex items-center gap-1.5 mt-1'>
                <MapPin size={16} className='text-[#FBBC04]' />
                {profile.city || "Remote"}, {profile.state || ""}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <StarRating rating={4.9} size='sm' />
                <span className='text-sm text-gray-500'>4.9 (12 reviews)</span>
              </div>
              <div className='mt-3 inline-block px-4 py-1.5 bg-[#FDF0E3] text-[#ec6f27] rounded-full text-sm font-medium border border-[#ec6f27]/30'>
                {profile.services || "Errand Provider"}
              </div>
            </div>
            <div className='text-right'>
              <p className='text-sm text-gray-500'>Rate</p>
              <p className='text-2xl font-bold text-gray-900'>
                ${profile.ratePerHour || "Negotiable"}<span className='text-sm text-gray-500 font-normal'>/hr</span>
              </p>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className='text-lg font-bold text-gray-900 mb-3'>About Me</h4>
            <div className='bg-gray-50 p-4 rounded-xl border border-gray-100'>
              <p className='text-gray-700 whitespace-pre-line leading-relaxed'>
                {profile.bio || "No description provided by this provider yet."}
              </p>
            </div>
          </div>

          {/* Categories */}
          {selectedCategories.length > 0 && (
            <div>
              <h4 className='text-lg font-bold text-gray-900 mb-3'>Selected Categories</h4>
              <div className='flex flex-wrap gap-3'>
                {selectedCategories.map(cat => (
                  <div key={cat.id} className="flex items-center gap-2 bg-[#FDF5EC] px-4 py-2 rounded-lg border border-[#F47A22]/20">
                    <span style={{ color: cat.color || "inherit" }}>
                      {cat.iconType === "emoji" ? cat.icon : (
                        <img src={getImageUrl(cat.icon) || ""} alt={cat.name} className="w-5 h-5 object-contain" />
                      )}
                    </span>
                    <span className="text-sm font-semibold text-[#5C4A2A]">{cat.name}</span>
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
                  onClick={() => { onClose(); onOpenGallery(gallery); }}
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

            {/* Video Preview */}
            {videoId && (
              <div>
                <h4 className='text-lg font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <PlayCircle size={18} className='text-red-500' />
                  Video Intro
                </h4>
                <div className='h-48 rounded-xl overflow-hidden border border-gray-100 shadow-sm'>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Provider Introduction"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors'
          >
            Close
          </button>
          <Link
            href={`/dashboard/messages?errandId=${provider.id}`}
            className='px-8 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl transition-all'
          >
            Contact Provider
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
