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
      {/* Top Play Button - Centered horizontally */}
      <div className='flex justify-center items-center mb-8'>
        <button
          onClick={() => setIsVideoOpen(true)}
          className='group relative flex items-center justify-center focus:outline-none cursor-pointer'
          aria-label='Play Video'
        >
          {/* Subtle pulse animation ring */}
          <div className='' />

          <svg
            viewBox='0 0 100 100'
            className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md hover:drop-shadow-xl transition-all duration-300 transform group-hover:scale-105'
          >
            <path
              d='M 12 8 C 8 8 5 11 5 16 L 5 84 C 5 89 8 92 12 92 C 14 92 16 91 18 90 L 88 56 C 93 53 93 47 88 44 L 18 10 C 16 9 14 8 12 8 Z'
              fill='#f47a22'
              className='transition-colors duration-200 group-hover:fill-[#e06812]'
            />
        
            <text
              x='38'
              y='53'
              fill='#ffffff'
              fontSize='22'
              fontWeight='900'
              fontStyle='italic'
              fontFamily='sans-serif'
              textAnchor='middle'
              dominantBaseline='middle'
            >
              play
            </text>
          </svg>
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
