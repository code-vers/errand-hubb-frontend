"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import logo from "../../../public/logo2.svg";

const Homepage = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className='w-full flex flex-1 flex-col justify-center items-center bg-white font-sans antialiased py-10 relative'>
      {/* Video Poster Thumbnail Card */}
      <div className='flex justify-center items-center mb-8 px-4 w-full max-w-xl'>
        <button
          onClick={() => setIsVideoOpen(true)}
          className='group relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-gray-100 focus:outline-none cursor-pointer transform hover:scale-[1.01] transition-all duration-300'
          aria-label='Watch How ErrandHubb Works'
        >
          {/* First Frame Poster Image */}
          <Image
            src="/video-thumbnail-v2.jpg"
            alt="ErrandHubb Video Poster - Local Help Done Fast"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />

          {/* Centered Play Control Button Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f47a22] text-white flex items-center justify-center shadow-xl group-hover:bg-[#e06812] group-hover:scale-110 transition-all duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-white text-xs font-extrabold uppercase tracking-wider drop-shadow-md bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
              Watch How It Works
            </span>
          </div>
        </button>
      </div>

      {/* Logo Section */}
      <div className='flex px-8 md:px-0 flex-col items-center mb-10'>
        <Image
          src={logo}
          alt='ErrandHubb Logo'
          width={610}
          height={104}
          priority
        />
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col items-center gap-4 w-full max-w-md px-4'>
        {/* Top row */}
        <div className='flex flex-col sm:flex-row gap-4 w-full justify-center'>
          <Link
            href='/errand'
            className='relative z-10 bg-primary whitespace-nowrap text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto text-center hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:-translate-y-[1px] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:-z-10 after:bg-primary after:rounded-md after:transition-all after:duration-500 hover:after:scale-x-[1.4] hover:after:scale-y-[1.6] hover:after:opacity-0'>
            Become an Errandr
          </Link>

          <Link
            href='/search'
            className='relative z-10 bg-primary whitespace-nowrap text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto text-center hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:-translate-y-[1px] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:-z-10 after:bg-primary after:rounded-md after:transition-all after:duration-500 hover:after:scale-x-[1.4] hover:after:scale-y-[1.6] hover:after:opacity-0'>
            Search For
            <br className='sm:hidden' /> Errandr
          </Link>
        </div>

        {/* Bottom centered button */}
        <Link
          href='/post-errand'
          className='relative z-10 bg-primary text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto text-center hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:-translate-y-[1px] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:-z-10 after:bg-primary after:rounded-md after:transition-all after:duration-500 hover:after:scale-x-[1.4] hover:after:scale-y-[1.6] hover:after:opacity-0'>
          Post An Errand
        </Link>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200'
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className='relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className='absolute top-3 right-3 z-10 p-2 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer'
              aria-label='Close video'
            >
              <X size={24} />
            </button>

            {/* Video iframe */}
            <div className='relative pt-[56.25%] w-full'>
              <iframe
                className='absolute inset-0 w-full h-full'
                src='https://www.youtube.com/embed/KL1mL5e3mSo?autoplay=1&rel=0'
                title='Errand Hubb Video'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Homepage;
