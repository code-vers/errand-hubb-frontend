"use client";

import { Post } from "@/types/search";
import { MapPin, FolderX, X, Loader2 } from "lucide-react";
import Image from "next/image";
import icon from "../../../../public/icon.svg";
import { useState } from "react";
import { getImageUrl } from "@/configs/api.config";
import { useConnect } from "@/hooks/useConnect";

interface SearchResultProps {
  posts: Post[];
}

const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};

const SearchResult = ({ posts }: SearchResultProps) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { connect, isConnecting } = useConnect();
  const [connectingUserId, setConnectingUserId] = useState<string | null>(null);

  const handleContact = async (userId: string) => {
    setConnectingUserId(userId);
    await connect(userId);
    setConnectingUserId(null);
  };

  if (posts.length === 0) {
    return (
      <div className='text-center py-20 bg-white rounded-[10px] shadow-sm'>
        <FolderX
          className='mx-auto h-16 w-16 text-gray-300 mb-4'
          strokeWidth={1}
        />
        <h3 className='text-xl font-bold text-gray-800'>No Errands Found</h3>
        <p className='mt-2 text-gray-500 font-medium'>
          Try adjusting your search filters to find more results.
        </p>
      </div>
    );
  }

  return (
    <div className='w-full font-sans antialiased text-[#2a3a4a] relative'>
      {/* Dashed outer border grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {posts.map((post) => {
          const displayImage = getImageUrl(post.user.profileImage) || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop";
          const hasYoutubeLink = post.youtubeLink && post.youtubeLink.length > 0;
          const isThisConnecting = isConnecting && connectingUserId === post.user.id;

          return (
            <article
              key={post.id}
              className='bg-white rounded shadow-sm p-6 flex flex-col border border-gray-100'>
              {/* Top row: avatar + info + media */}
              <div className='flex gap-4 mb-3'>
                {/* Avatar */}
                <div className='shrink-0 bg-gray-50 flex items-center justify-center w-20 h-20 rounded overflow-hidden'>
                  <img
                    src={displayImage}
                    alt={`${post.user.firstName} profile`}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Name / location / more images + media icons */}
                <div className='grow'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h2 className='text-[16px] font-bold text-secondary leading-tight'>
                        {post.user.firstName} {post.user.lastName}
                      </h2>
                      <div className='flex items-center text-[12px] font-normal text-[#555555] mt-0.5'>
                        <MapPin className='w-3 h-3 text-red-500 mr-1 shrink-0' />
                        {post.city}, {post.state}
                      </div>
                      <a
                        href='#'
                        className='text-primary text-[11px] font-semibold hover:underline inline-block mt-0.5'>
                        More Images
                      </a>
                    </div>

                    {/* Play + video thumb */}
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => {
                          if (hasYoutubeLink) {
                            const embedUrl = getYoutubeEmbedUrl(post.youtubeLink!);
                            if (embedUrl) setActiveVideo(embedUrl);
                          }
                        }}
                        className={`transition-colors cursor-pointer active:scale-95 ${hasYoutubeLink ? 'text-[#1b539c] hover:text-blue-800' : 'cursor-not-allowed opacity-40'}`}>
                        <Image
                          src={icon}
                          height={50}
                          width={50}
                          alt='Play Video'
                          className={hasYoutubeLink ? 'opacity-100 grayscale-0' : 'opacity-40 grayscale'}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className='text-[13px] text-foreground mb-4 leading-snug grow'>
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className='flex flex-wrap gap-2 mb-5'>
                    {[
                      post.category.name,
                      post.budget ? `$${post.budget}` : "Flexible",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className='bg-surface-dim text-secondary text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#E5E5E5]'>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Contact button */}
                  <div>
                    <button
                      onClick={() => handleContact(post.user.id)}
                      disabled={isThisConnecting}
                      className='bg-[#f27b2a] hover:bg-orange-600 active:scale-95 text-white text-[12px] font-bold py-2 px-6 rounded shadow-sm transition-all uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2'>
                      {isThisConnecting ? (
                        <>
                          <Loader2 className='w-3.5 h-3.5 animate-spin' />
                          Connecting...
                        </>
                      ) : (
                        'Contact'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className='fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4'
          onClick={() => setActiveVideo(null)}
        >
          <div className='relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl'>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveVideo(null); }}
              className='absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors'>
              <X size={24} />
            </button>
            <iframe
              className='w-full h-full'
              src={`${activeVideo}?autoplay=1`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;

