"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import icon from "../../../public/icon.svg";
import logo from "../../../public/logo2.svg";

interface MembershipPlan {
  priceLabel: string;
  billingCycle: string;
}

interface ErrandrProfile {
  id: number;
  name: string;
  location: string;
  bio: string;
  tags: string[];
  availability: string;
  availabilityNote: string;
  responseTime: string;
  services: string[];
  pricingLabel: string;
  pricingText: string;
  imageUrl: string;
  bioLink: string;
  videoThumbUrl: string;
}

const membershipPlan: MembershipPlan = {
  priceLabel: "JUST $5",
  billingCycle: "MONTHLY",
};

const errandrProfiles: ErrandrProfile[] = [
  {
    id: 1,
    name: "Jessica M.",
    location: "New York, NY",
    bio: "I am a highly organized and reliable professional dedicated to helping busy individuals reclaim their time. Whether it's running daily errands, managing deliveries, or providing dedicated senior assistance.",
    tags: ["Driver", "Shopping", "Senior Assisting"],
    availability: "Mon-Fri: 8:00 AM – 6:00 PM",
    availabilityNote: "Available Weekdays",
    responseTime: "15 minutes",
    services: [
      "Grocery Shopping",
      "Food Pickup & Delivery",
      "Pharmacy Pickup",
      "General Errands",
      "And more...",
    ],
    pricingLabel: "Errands from",
    pricingText: "$25 to $100 per hour",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    bioLink: "#",
    videoThumbUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Marcus T.",
    location: "Los Angeles, CA",
    bio: "I am a highly organized and reliable professional dedicated to helping busy individuals reclaim their time. Whether it's running daily errands, managing deliveries, or providing dedicated handyman services.",
    tags: ["Driver", "Cleaning", "Shopping", "Handyman"],
    availability: "Mon-Sun: 7:00 AM – 8:00 PM",
    availabilityNote: "Available 7 days a week",
    responseTime: "30 minutes",
    services: [
      "Moving Help",
      "Handyman",
      "Delivery",
      "Shopping",
      "And more...",
    ],
    pricingLabel: "Errands from",
    pricingText: "$25 to $100 per hour",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    bioLink: "#",
    videoThumbUrl:
      "https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Sandra R.",
    location: "Chicago, IL",
    bio: "Specializing in administrative support and research. I help manage your schedule and take care of the small details so you can focus on what matters most.",
    tags: ["Admin", "Research", "Scheduling"],
    availability: "Mon-Sat: 9:00 AM – 5:00 PM",
    availabilityNote: "Available Mon-Sat",
    responseTime: "1 hour",
    services: [
      "Scheduling",
      "Admin Help",
      "Research",
      "General Errands",
      "And more...",
    ],
    pricingLabel: "Errands from",
    pricingText: "$25 to $100 per hour",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    bioLink: "#",
    videoThumbUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400",
  },
];

const ErrandPage = () => {
  const [hiringProfile, setHiringProfile] = useState<ErrandrProfile | null>(
    null,
  );

  return (
    <section className='w-full bg-(--color-warning-bg)'>
      <div className='bg-white py-8 pb-8'>
        <div className='mx-auto  px-6 lg:px-10'>
          <div className='grid grid-cols-1 items-center gap-6 text-center xl:grid-cols-[1fr_auto_1fr] xl:items-end xl:text-left'>
            <div className='flex flex-col items-center gap-4 xl:items-start'>
              <p className=' text-[18px] lg:whitespace-nowrap font-bold leading-tight tracking-[0.4px] text-(--color-secondary) md:text-[34px]'>
                MARKET YOURSELF TO PEOPLE WHO NEED
              </p>
              <p className=' text-[18px] font-bold leading-tight tracking-[0.4px] text-(--color-secondary) md:text-[34px]'>
                YOUR HELP WITH AN ERRANDR POST
              </p>
              <Link
                href='/client-registration'
                className='inline-flex min-h-12.5 items-center justify-center rounded-md bg-(--color-primary) px-6 text-[14px] font-bold tracking-[0.8px] text-white no-underline hover:bg-(--color-primary-dark)'>
                CREATE CLIENT PROFILE
              </Link>
            </div>

            <div className='flex items-center justify-center pb-1.5'>
              <Image src={logo} alt='ErrandHubb' width={156} height={26} />
            </div>

            <div className='flex flex-col  gap-4 xl:items-end'>
              <p className='text-[44px] leading-[0.95] font-extrabold text-[#171923] md:text-[58px]'>
                {membershipPlan.priceLabel}
              </p>
              <p className='text-[22px] leading-none font-semibold text-(--color-secondary) md:text-[30px]'>
                {membershipPlan.billingCycle}
              </p>

              <Link
                href='/errand-registration'
                className='inline-flex min-h-12.5 items-center mt-12 justify-center rounded-md bg-(--color-primary) px-6 text-[14px] font-bold tracking-[0.8px] text-white no-underline hover:bg-(--color-primary-dark)'>
                CREATE ERRAND PROFILE
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='px-0 py-13 pb-20'>
        <div className='mx-auto  px-6 lg:px-10'>
          <header>
            <h1 className='text-[34px] font-extrabold tracking-[0.5px] text-(--color-secondary) md:text-[46px]'>
              ERRANDR&apos;S
            </h1>
            <p className='mt-2 text-[18px] text-[#37556d]'>
              Choose your dedicated errand professional
            </p>
          </header>

          <div className='mt-7.5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {errandrProfiles.map((profile) => (
              <article
                key={profile.id}
                className='overflow-hidden rounded-[18px] bg-[#f6f6f6] shadow-[0_8px_20px_rgba(0,0,0,0.12)]'>
                <Image
                  src={profile.imageUrl}
                  alt={profile.name}
                  width={350}
                  height={245}
                  className='h-58.75 w-full object-cover md:h-66.5'
                />
                <div className='p-4 pb-4.5'>
                  <div className='flex items-center justify-between gap-2.5'>
                    <h2 className='text-[27px] font-bold text-(--color-secondary)'>
                      {profile.name}
                    </h2>
                    <button
                      type='button'
                      className='h-8.5 rounded-sm border border-[#c4c4c4] bg-[#efefef] px-3.5 text-[12px] font-bold text-[#6b6f75]'>
                      ABOUT ME
                    </button>
                  </div>

                  <div className='mt-3 flex items-center justify-between'>
                    <a
                      href={profile.bioLink}
                      className='text-[18px] text-[#2f66dc] underline'>
                      Intro
                    </a>
                    <div className='flex items-center gap-2'>
                      <button type='button' aria-label='Play intro video'>
                        <Image
                          src={icon}
                          alt='Play intro'
                          width={40}
                          height={40}
                        />
                      </button>
                    </div>
                  </div>

                  <p className='mt-3 text-[11px] tracking-[0.8px] text-[#757b84]'>
                    SERVICES
                  </p>
                  <div className='mt-2 flex flex-wrap gap-1.5'>
                    {profile.services.slice(0, 4).map((service) => (
                      <span
                        key={service}
                        className='rounded-full border border-(--color-primary) bg-[#fff3ea] px-2.5 py-0.75 text-[12px] leading-[1.2] text-[#d96f1f]'>
                        {service}
                      </span>
                    ))}
                  </div>

                  <p className='mt-3 text-[11px] tracking-[0.8px] text-[#757b84]'>
                    PRICES
                  </p>
                  <p className='mt-1.25 text-[27px] font-medium text-[#1e2329]'>
                    {profile.pricingText}
                  </p>

                  <button
                    type='button'
                    onClick={() => setHiringProfile(profile)}
                    className='mt-4 min-h-10 w-full rounded-md bg-(--color-primary) text-[13px] font-extrabold tracking-[1px] text-white hover:bg-(--color-primary-dark)'>
                    HIRE NOW
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hiring Modal ── */}
      {hiringProfile && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
          onClick={() => setHiringProfile(null)}>
          <div
            className='relative w-full max-w-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden'
            onClick={(e) => e.stopPropagation()}>
            {/* ── TOP HEADER: avatar + name + close + play ── */}
            <div className='flex items-center gap-4 px-5 pt-5 pb-4'>
              {/* Avatar */}
              <div className='w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 border border-gray-100'>
                <img
                  src={hiringProfile.imageUrl}
                  alt={hiringProfile.name}
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Name + location */}
              <div className='flex-1 min-w-0'>
                <h2 className='text-[22px] font-extrabold text-[#111111] leading-tight'>
                  {hiringProfile.name}
                </h2>
                <p className='text-sm text-gray-400 mt-0.5'>
                  {hiringProfile.location}
                </p>
              </div>

              {/* Play button (teal circle) */}
              <button className='w-10 h-10 rounded-full bg-[#1ABFBF] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity'>
                <svg width='14' height='16' viewBox='0 0 14 16' fill='none'>
                  <path d='M1.5 1.5L12.5 8L1.5 14.5V1.5Z' fill='white' />
                </svg>
              </button>

              {/* Close button */}
              <button
                onClick={() => setHiringProfile(null)}
                className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400'>
                <X size={18} />
              </button>
            </div>

            {/* ── DIVIDER ── */}
            <div className='h-px bg-gray-100 mx-5' />

            {/* ── BODY: two-column layout ── */}
            <div className='flex flex-col md:flex-row gap-4 px-5 pt-4 pb-4'>
              {/* LEFT COLUMN */}
              <div className='flex-1 min-w-0 flex flex-col gap-4'>
                {/* About section */}
                <div>
                  <p className='text-[11px] font-extrabold text-[#F47A22] uppercase tracking-widest mb-2'>
                    ABOUT {hiringProfile.name.split(" ")[0].toUpperCase()}
                  </p>
                  <p className='text-[13px] text-gray-600 leading-relaxed'>
                    {hiringProfile.bio}
                  </p>
                </div>

                {/* Tags */}
                <div className='flex flex-wrap gap-1.5'>
                  {hiringProfile.tags.map((tag) => (
                    <span
                      key={tag}
                      className='px-3 py-1 rounded-full border border-gray-200 text-[12px] font-semibold text-gray-600 bg-white'>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className='h-px bg-gray-100' />

                {/* Availability */}
                <div className='flex flex-col gap-2.5'>
                  {/* Schedule row */}
                  <div className='flex items-start gap-2'>
                    <div className='mt-0.5'>
                      {/* Calendar icon */}
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        className='text-gray-400'>
                        <rect
                          x='1'
                          y='2.5'
                          width='14'
                          height='12'
                          rx='2'
                          stroke='currentColor'
                          strokeWidth='1.3'
                        />
                        <path
                          d='M5 1v3M11 1v3M1 6.5h14'
                          stroke='currentColor'
                          strokeWidth='1.3'
                          strokeLinecap='round'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-[13px] font-semibold text-gray-700 leading-tight'>
                        {hiringProfile.availability}
                      </p>
                      <p className='text-[12px] font-semibold text-[#F47A22] mt-0.5'>
                        {hiringProfile.availabilityNote}
                      </p>
                    </div>
                  </div>

                  {/* Response time row */}
                  <div className='flex items-center gap-2'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      className='text-gray-400'>
                      <circle
                        cx='8'
                        cy='8'
                        r='6.5'
                        stroke='currentColor'
                        strokeWidth='1.3'
                      />
                      <path
                        d='M8 4.5V8l2.5 2'
                        stroke='currentColor'
                        strokeWidth='1.3'
                        strokeLinecap='round'
                      />
                    </svg>
                    <p className='text-[13px] text-gray-600'>
                      Usually responds within{" "}
                      <span className='font-semibold text-[#F47A22]'>
                        {hiringProfile.responseTime}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN — services card */}
              <div className='w-full md:w-[200px] shrink-0'>
                <div className='bg-[#FFF5EE] rounded-xl p-3.5 flex flex-col gap-2'>
                  {hiringProfile.services.map((service, i) => (
                    <div key={service} className='flex items-center gap-2'>
                      <span className='text-[12px] text-gray-600 leading-tight'>
                        {service}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing row */}
                <div className='flex items-center justify-between mt-3 px-1'>
                  <span className='text-[12px] text-gray-500'>
                    {hiringProfile.pricingLabel}
                  </span>
                  <span className='text-[13px] font-extrabold text-[#F47A22]'>
                    {hiringProfile.pricingText}
                  </span>
                </div>
              </div>
            </div>

            {/* ── HIRE BUTTON ── */}
            <div className='px-5 pb-5 pt-1'>
              <button
                onClick={() => {
                  alert("Hiring request sent!");
                  setHiringProfile(null);
                }}
                className='h-11 px-8 rounded-full bg-[#F47A22] text-white font-extrabold text-[13px] uppercase tracking-wider hover:bg-[#BB4D00] transition-colors shadow-md'>
                HIRE {hiringProfile.name.split(" ")[0].toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ErrandPage;
