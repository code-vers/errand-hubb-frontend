import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Truck, Shirt, Palette } from 'lucide-react';

export default function MerchBannerAd() {
  return (
    <div className="flex flex-col items-center">
      <Link 
        href="/merchandise" 
        className="block relative w-64 h-[160px] overflow-hidden rounded-md shadow-md hover:shadow-lg transition group bg-[#f4f7f9] cursor-pointer mt-4"
      >
        <div 
          className="absolute top-0 left-0 w-[1280px] h-[800px] origin-top-left"
          style={{ transform: 'scale(0.2)' }}
        >
          {/* EXACT Hero Section from Merchandise Page */}
          <div className='max-w-7xl mx-auto px-12 py-16 grid grid-cols-2 gap-12 items-center h-full'>
            <div className='space-y-6 z-10'>
              <h1 className='text-6xl font-extrabold leading-tight tracking-tight uppercase'>
                <span className='text-[#063b5c] block'>Wear the Brand.</span>
                <span className='text-[#f47a22] block'>Represent the Hustle.</span>
              </h1>

              <p className='text-2xl font-bold text-[#063b5c]'>
                Official ErrandHubb Apparel for Drivers, Partners & Fans
              </p>

              <p className='text-gray-600 text-xl max-w-lg'>
                Premium branded clothing designed for the people who keep the world moving.
              </p>

              <div className='grid grid-cols-3 gap-6 py-4'>
                <div className='flex items-center gap-3'>
                  <Truck className='text-[#063b5c]' size={36} />
                  <span className='text-lg font-semibold text-gray-800 leading-tight'>
                    Free Shipping<br />on Orders Over $75
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <Shirt className='text-[#063b5c]' size={36} />
                  <span className='text-lg font-semibold text-gray-800 leading-tight'>
                    Premium Cotton &<br />Moisture-Wicking Fabrics
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <Palette className='text-[#063b5c]' size={36} />
                  <span className='text-lg font-semibold text-gray-800 leading-tight'>
                    Available in Multiple<br />Colors & Sizes
                  </span>
                </div>
              </div>

              <div className='flex flex-wrap gap-4 pt-4'>
                <div className='bg-[#063b5c] text-white px-8 py-4 rounded-md font-bold text-xl uppercase inline-block'>
                  Shop T-Shirts
                </div>
                <div className='bg-[#f47a22] text-white px-8 py-4 rounded-md font-bold text-xl uppercase inline-block'>
                  Shop Polo Shirts
                </div>
              </div>
            </div>

            <div className='relative h-[600px] w-full rounded-xl overflow-hidden shadow-xl'>
              <Image
                src='/merch/merch_hero_exact.png'
                alt='ErrandHubb Apparel'
                fill
                className='object-cover object-center'
                priority
              />
            </div>
          </div>
        </div>
      </Link>
      <Link href="/merchandise" className="mt-4 font-extrabold text-lg text-[#DF4228] tracking-wide hover:text-[#c4361e] transition-colors cursor-pointer">
        ORDER TODAY
      </Link>
    </div>
  );
}
