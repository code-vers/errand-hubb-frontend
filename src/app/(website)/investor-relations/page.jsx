"use client";

import Image from "next/image";
import image from "../../../../public/investor/investro.jpg";

export default function InvestorRelationsPage() {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-4 py-16'>
      <div className='max-w-5xl w-full relative bg-white overflow-hidden'>
        {/* Top label */}
        <p className='text-center text-sm md:text-base font-bold tracking-[0.3em] uppercase text-[#111111] mb-12'>
          Serious Inquiries Only
        </p>

        <div className='flex flex-col md:flex-row items-start gap-8 md:gap-12'>
          {/* Left Content */}
          <div className='flex-1 z-10'>
            {/* Logo + Company Name */}
            <div className='mb-8'>
              <div className='mb-4'>
                {/* Horseshoe SVG icon */}
                <svg
                  width='72'
                  height='72'
                  viewBox='0 0 56 56'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <circle
                    cx='28'
                    cy='28'
                    r='26'
                    stroke='#063b5c'
                    strokeWidth='2'
                    fill='none'
                  />
                  <path
                    d='M16 36 C16 24 22 16 28 16 C34 16 40 24 40 36'
                    stroke='#063b5c'
                    strokeWidth='3'
                    fill='none'
                    strokeLinecap='round'
                  />
                  <line
                    x1='16'
                    y1='36'
                    x2='16'
                    y2='42'
                    stroke='#063b5c'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                  <line
                    x1='40'
                    y1='36'
                    x2='40'
                    y2='42'
                    stroke='#063b5c'
                    strokeWidth='3'
                    strokeLinecap='round'
                  />
                  <circle cx='28' cy='21' r='2' fill='#063b5c' />
                </svg>
              </div>
              <p className='text-sm md:text-base font-semibold tracking-wide text-[#063b5c] uppercase leading-tight mb-1'>
                Blue Horseshoe Loves Annacott Steel S-Corp
              </p>
              <p className='text-2xl md:text-3xl font-black text-[#111111] tracking-wide uppercase'>
                Holdings Corporation
              </p>
            </div>

            {/* Quote */}
            <blockquote className='text-lg md:text-xl text-[#111111] font-medium leading-relaxed mb-8 max-w-lg'>
              "What an exciting time and opportunity to become part of
              ErrandHubb.
              <br />
              <br />
              We are currently seeking investors interested in equity ownership
              opportunities in a rapidly growing company focused on transforming
              the errand and task marketplace."
            </blockquote>

            {/* Revenue Projections */}
            <div className='mb-8 space-y-3'>
              <p className='text-base md:text-lg text-[#111111] leading-snug font-semibold'>
                2030 Estimated Annual Revenue:{" "}
                <span className='text-[#063b5c] text-xl md:text-2xl ml-1'>
                  $6.2M
                </span>
              </p>
              <p className='text-base md:text-lg text-[#111111] leading-snug font-semibold'>
                Long-Term Revenue Projection 2033:{" "}
                <span className='text-[#063b5c] text-xl md:text-2xl ml-1'>
                  $60M+ Annually
                </span>
              </p>
            </div>

            {/* PPM Request */}
            <div className='mb-8'>
              <p className='text-base md:text-lg text-[#111111] leading-relaxed italic'>
                Request our Private Placement Memorandum (PPM) for additional
                details.
              </p>
            </div>

            {/* Person Info */}
            <div className='mb-10'>
              <div className='text-base md:text-lg text-[#111111] leading-7'>
                <p className='font-bold text-xl md:text-2xl mb-1'>
                  Graeme X Barrington
                </p>
                <p className='uppercase tracking-widest text-sm md:text-base font-semibold text-gray-500 mb-2'>
                  President &amp; Founder
                </p>
                <p className='font-semibold'>ErrandHubb</p>
                <p className='text-[#063b5c] font-bold'>1-844-377-2632</p>
              </div>
            </div>

            {/* Contact Us */}
            <div className='border-t-2 border-[#e2e8f0] pt-6'>
              <p className='text-sm font-bold tracking-[0.2em] uppercase text-gray-600 mb-2'>
                Contact Us
              </p>
              <a
                href='https://www.errandhubb.com'
                className='text-xl md:text-2xl font-black text-[#111111] hover:text-[#f47a22] transition-colors tracking-tight'>
                WWW.ERRANDHUBB.COM
              </a>
            </div>
          </div>

          {/* Right — Person Image */}
          <div className='w-full md:w-[420px] flex-shrink-0 relative mt-8 md:mt-0'>
            <div className='relative rounded-2xl overflow-hidden shadow-2xl'>
              <Image
                height={640}
                width={420}
                src={image}
                alt='ErrandHubb President'
                className='w-full h-[540px] md:h-[640px] object-cover object-top'
                style={{ objectPosition: "top center" }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
