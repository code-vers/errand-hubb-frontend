'use client';

import Pagination from '@/components/common/Pagination';
import { getImageUrl } from '@/configs/api.config';
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Loader2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import icon from '../../../public/icon.svg';
import logo from '../../../public/logo2.svg';
import icon2 from '../../../public/errand/icon.jpg';
import { useConnect } from '@/hooks/useConnect';

interface MembershipPlan {
  priceLabel: string;
  billingCycle: string;
}

interface ErrandrProfile {
  id: string;
  userId: string;
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
  youtubeLink?: string;
  hasYoutubeLink: boolean;
  gallery?: string[];
}

const membershipPlan: MembershipPlan = {
  priceLabel: 'JUST $5',
  billingCycle: 'MONTHLY',
};

const STATIC_POSTS = [
  {
    id: '4fded1f3-13a2-4d21-ad04-a9718138d523',
    userId: '4aa467ed-7f87-4c9e-9df9-b07f13f3ba24',
    title: 'Sandra R.',
    description: 'I am new Post Errand.',
    city: 'USA',
    state: 'New York',
    budget: '14',
    dateNeeded: '2026-06-20T00:00:00.000Z',
    contactInfo: 'sandra@gmail.com',
    photoUrl: '',
    categoryId: '7973dcf1-5c54-4552-bafa-3b40c7a4206e',
    status: 'active',
    createdAt: '2026-06-16T06:47:30.083Z',
    updatedAt: '2026-06-16T06:47:30.083Z',
    youtubeLink: 'https://www.youtube.com/watch?v=4b96HkmtbY8',
    assignedToId: null,
    serviceType: null,
    time: null,
    category: {
      id: '7973dcf1-5c54-4552-bafa-3b40c7a4206e',
      name: 'Personal Transport',
      description: 'Safe and reliable transport for you or your important items.',
      icon: '🚗',
      iconType: 'emoji',
      color: '#10b981',
      status: 'active',
      createdAt: '2026-06-08T06:45:54.778Z',
      updatedAt: '2026-06-08T06:45:54.778Z',
    },
    user: {
      id: '4aa467ed-7f87-4c9e-9df9-b07f13f3ba24',
      firstName: 'Sandra ',
      lastName: 'International',
      profileImage: '/media/profiles/profileImage-1781592364967-715941532.png',
      profile: {
        id: '3c4f4200-8272-4fef-b81a-c78ad8bca60c',
        userId: '4aa467ed-7f87-4c9e-9df9-b07f13f3ba24',
        bio: 'This is My second Errand Post.',
        phone: '01783200274',
        city: 'USA',
        state: 'New York',
        location: null,
        timeZone: null,
        preferredContact: null,
        totalEarnings: '0',
        jobsCompleted: 0,
        visibility: 'public',
        ratePerHour: '14',
        services: 'Grocery',
        createdAt: '2026-06-16T06:46:05.035Z',
        updatedAt: '2026-06-16T06:46:05.035Z',
        youtubeLink: 'https://www.youtube.com/watch?v=4b96HkmtbY8',
        gallery: [],
      },
    },
    assignedTo: null,
  },
  {
    id: '41e986b6-4c29-47ad-bf25-c4923542b621',
    userId: '90f5307d-56ad-4ee1-ade9-cf7996423ba8',
    title: 'Marcus T.',
    description: 'This is Post Errand Post.',
    city: 'USA',
    state: 'New York',
    budget: '12',
    dateNeeded: '2026-06-20T00:00:00.000Z',
    contactInfo: 'marcus@gmail.com',
    photoUrl: '',
    categoryId: 'ee522b07-c43e-4136-bcac-bba637a47928',
    status: 'active',
    createdAt: '2026-06-16T06:45:00.223Z',
    updatedAt: '2026-06-16T06:45:00.223Z',
    youtubeLink: 'https://www.youtube.com/watch?v=4b96HkmtbY8',
    assignedToId: null,
    serviceType: null,
    time: null,
    category: {
      id: 'ee522b07-c43e-4136-bcac-bba637a47928',
      name: 'Grocery Shopping',
      description: 'Get your groceries delivered to your doorstep without any hassle.',
      icon: '🛒',
      iconType: 'emoji',
      color: '#ec6f27',
      status: 'active',
      createdAt: '2026-06-08T06:45:53.751Z',
      updatedAt: '2026-06-08T06:45:53.751Z',
    },
    user: {
      id: '90f5307d-56ad-4ee1-ade9-cf7996423ba8',
      firstName: 'Marcus ',
      lastName: 'T.',
      profileImage: '/media/profiles/profileImage-1781592196817-653585337.png',
      profile: {
        id: '613e19a9-8d51-4f49-95a3-ace39af8358c',
        userId: '90f5307d-56ad-4ee1-ade9-cf7996423ba8',
        bio: 'This is My first Errand Post.',
        phone: '01783200274',
        city: 'USA',
        state: 'New York',
        location: null,
        timeZone: null,
        preferredContact: null,
        totalEarnings: '0',
        jobsCompleted: 0,
        visibility: 'public',
        ratePerHour: '12',
        services: 'Pharmacy',
        createdAt: '2026-06-16T06:43:16.904Z',
        updatedAt: '2026-06-16T06:43:16.904Z',
        youtubeLink: 'https://www.youtube.com/watch?v=4b96HkmtbY8',
        gallery: [],
      },
    },
    assignedTo: null,
  },
  {
    id: '8dd6b938-a796-4c78-b0e6-cc3355b92e06',
    userId: '229b5139-650f-4b66-b353-1ae7ef69783f',
    title: 'Jasica M.',
    description: 'This is First Errand Post.',
    city: 'Dhaka',
    state: 'USA',
    budget: '55',
    dateNeeded: '2026-06-20T00:00:00.000Z',
    contactInfo: 'jasica@gmail.com',
    photoUrl: '',
    categoryId: 'eb85c380-73a9-463e-b8f4-708c3140fac9',
    status: 'active',
    createdAt: '2026-06-16T05:54:34.642Z',
    updatedAt: '2026-06-22T06:56:21.345Z',
    youtubeLink: 'https://www.youtube.com/watch?v=4b96HkmtbY8',
    assignedToId: null,
    serviceType: null,
    time: null,
    category: {
      id: 'eb85c380-73a9-463e-b8f4-708c3140fac9',
      name: 'Food Pickup',
      description: 'Your favorite meals from any restaurant delivered hot.',
      icon: '🍔',
      iconType: 'emoji',
      color: '#f59e0b',
      status: 'active',
      createdAt: '2026-06-08T06:45:55.139Z',
      updatedAt: '2026-06-08T06:45:55.139Z',
    },
    user: {
      id: '229b5139-650f-4b66-b353-1ae7ef69783f',
      firstName: 'Jessica M.',
      lastName: 'Marla',
      profileImage: '/media/profiles/profileImage-1781589150443-158812124.png',
      profile: {
        id: '4b7fc3a1-f773-4f6b-a8b5-cf3e83c9b911',
        userId: '229b5139-650f-4b66-b353-1ae7ef69783f',
        bio: 'This is first test',
        phone: '01783200274',
        city: 'Dhaka',
        state: 'USA',
        location: null,
        timeZone: null,
        preferredContact: null,
        totalEarnings: '0',
        jobsCompleted: 0,
        visibility: 'public',
        ratePerHour: '55',
        services: 'Pharmacy',
        createdAt: '2026-06-16T05:52:30.531Z',
        updatedAt: '2026-06-22T06:56:23.948Z',
        youtubeLink: 'https://www.youtube.com/watch?v=4b96HkmtbY8',
        gallery: [
          '/media/profiles/gallery-1782111383937-276082902.png',
          '/media/profiles/gallery-1782111383938-668943295.png',
          '/media/profiles/gallery-1782111383938-507978134.png',
        ],
      },
    },
    assignedTo: null,
  },
];

const ErrandPage = () => {
  const [hiringProfile, setHiringProfile] = useState<ErrandrProfile | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeGallery, setActiveGallery] = useState<string[] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const { connect, isConnecting } = useConnect();
  const [connectingProfileId, setConnectingProfileId] = useState<string | null>(null);

  const posts = STATIC_POSTS;
  const isLoading = false;
  const totalPages = 1;
  const currentPage = 1;
  const setPage = () => {};
  const isError = null;

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : url;
  };

  const getErrandProfiles = (): ErrandrProfile[] => {
    if (!posts) return [];

    return posts.map((post: any) => {
      const user = post.user;
      const category = post.category;

      const youtubeLink = (post.youtubeLink || '').trim();
      const hasYoutubeLink = youtubeLink.length > 0;

      return {
        id: post.id,
        userId: user?.id || '',
        name: (() => {
          const rawFullName = `${user?.firstName || ''} ${user?.lastName || ''}`.replace(/\s+/g, ' ').trim();
          if (rawFullName === 'Sandra International') return 'Brett Carter';
          return `${user?.firstName || 'User'} ${(user?.lastName || '').charAt(0)}.`;
        })(),
        location: post.city ? `${post.city}, ${post.state}` : 'Location not set',
        bio: post.description || 'No description available.',
        tags: category?.name ? [category.name] : [],
        availability: 'Availability not set',
        availabilityNote: '7 days a week',
        responseTime: '15 minutes',
        services: category?.name ? [category.name] : [],
        pricingLabel: 'Errands from',
        pricingText: post.budget ? `$${post.budget} per hour` : '$25 to $100 per hour',
        imageUrl:
          getImageUrl(user?.profileImage) ||
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
        bioLink: '#',
        videoThumbUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
        youtubeLink: youtubeLink,
        hasYoutubeLink: hasYoutubeLink,
        gallery: user?.profile?.gallery || [],
      };
    });
  };

  const errandProfiles = getErrandProfiles();

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
              <div className='flex flex-wrap items-center gap-3 justify-center xl:justify-start'>
                <Link
                  href='/client-registration'
                  className='inline-flex min-h-12.5 items-center justify-center rounded-md bg-(--color-primary) px-6 text-[14px] font-bold tracking-[0.8px] text-white no-underline hover:bg-(--color-primary-dark)'
                >
                  CREATE CLIENT PROFILE
                </Link>
                <p className='italic text-xl'>(A person needing help)</p>
              </div>
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

              <div className='flex flex-wrap items-center gap-3 justify-center xl:justify-end'>
                <p className='italic text-xl'>(A person that does work)</p>
                <Link
                  href='/errand-registration'
                  className='inline-flex min-h-12.5 items-center justify-center rounded-md bg-(--color-primary) px-6 text-[14px] font-bold tracking-[0.8px] text-white no-underline hover:bg-(--color-primary-dark)'
                >
                  CREATE ERRAND PROFILE
                </Link>
              </div>
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

          {isLoading ? (
            <div className='mt-20 flex flex-col items-center justify-center'>
              <Loader2 className='w-10 h-10 animate-spin text-primary' />
              <p className='mt-4 text-gray-500 font-medium'>Finding errand professionals...</p>
            </div>
          ) : isError ? (
            <div className='mt-20 flex flex-col items-center justify-center text-center'>
              <AlertCircle className='w-12 h-12 text-red-500 mb-4' />
              <p className='text-red-500 font-medium'>{isError}</p>
              <button
                onClick={() => window.location.reload()}
                className='mt-4 px-6 py-2 bg-primary text-white rounded-md font-bold'
              >
                Retry
              </button>
            </div>
          ) : errandProfiles.length > 0 ? (
            <>
              <div className='mt-7.5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
                {errandProfiles.map((profile) => (
                  <article
                    key={profile.id}
                    className='overflow-hidden rounded-[18px] bg-[#f6f6f6] shadow-[0_8px_20px_rgba(0,0,0,0.12)]'
                  >
                    <div className='relative h-58.75 w-full md:h-66.5 bg-gray-100 flex items-center justify-center'>
                      <img
                        src={profile.imageUrl}
                        alt={profile.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='p-4 pb-4.5'>
                      <div className='flex items-center justify-between gap-2.5'>
                        <h2 className='text-[27px] font-bold text-(--color-secondary)'>
                          {profile.name}
                        </h2>
                        <button
                          type='button'
                          onClick={() => setHiringProfile(profile)}
                          className='h-8.5 rounded-sm border border-[#c4c4c4] bg-[#efefef] px-3.5 text-[12px] font-bold text-[#6b6f75] hover:bg-gray-200 transition-colors'
                        >
                          ABOUT ME
                        </button>
                      </div>

                      <div className='mt-3 flex items-center justify-between'>
                        <button
                          type='button'
                          onClick={() =>
                            profile.hasYoutubeLink && setActiveVideoUrl(profile.youtubeLink!)
                          }
                          className={`text-[18px] underline ${profile.hasYoutubeLink ? 'text-[#2f66dc]' : 'text-gray-400'}`}
                        >
                          Intro
                        </button>
                        <div className='flex items-center gap-2'>
                          <button
                            type='button'
                            aria-label='View photo gallery'
                            disabled={!profile.gallery || profile.gallery.length === 0}
                            onClick={() =>
                              profile.gallery &&
                              profile.gallery.length > 0 &&
                              setActiveGallery(profile.gallery)
                            }
                            className='transition-transform hover:scale-105 active:scale-95'
                          >
                            <span className=''>
                              <Image
                                src={icon2}
                                alt='Play intro'
                                width={40}
                                height={40}
                                className={
                                  profile.hasYoutubeLink
                                    ? 'opacity-100 grayscale-0'
                                    : 'opacity-40 grayscale'
                                }
                              />
                            </span>
                          </button>

                          <button
                            type='button'
                            aria-label='Play intro video'
                            onClick={() =>
                              profile.hasYoutubeLink && setActiveVideoUrl(profile.youtubeLink!)
                            }
                          >
                            <Image
                              src={icon}
                              alt='Play intro'
                              width={40}
                              height={40}
                              className={
                                profile.hasYoutubeLink
                                  ? 'opacity-100 grayscale-0'
                                  : 'opacity-40 grayscale'
                              }
                            />
                          </button>
                        </div>
                      </div>

                      <p className='mt-3 text-[11px] tracking-[0.8px] text-[#757b84]'>SERVICES</p>
                      <div className='mt-2 flex flex-wrap gap-1.5'>
                        {profile.services.slice(0, 4).map((service) => (
                          <span
                            key={service}
                            className='rounded-full border border-(--color-primary) bg-[#fff3ea] px-2.5 py-0.75 text-[12px] leading-[1.2] text-[#d96f1f]'
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      <p className='mt-3 text-[11px] tracking-[0.8px] text-[#757b84]'>PRICES</p>
                      <p className='mt-1.25 text-[27px] font-medium text-[#1e2329]'>
                        {profile.pricingText}
                      </p>

                      <button
                        type='button'
                        onClick={() => setHiringProfile(profile)}
                        className='mt-4 min-h-10 w-full rounded-md bg-(--color-primary) text-[13px] font-extrabold tracking-[1px] text-white hover:bg-(--color-primary-dark)'
                      >
                        HIRE NOW
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              {/* Pagination */}
              <div className='mt-12'>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </>
          ) : (
            <div className='mt-20 text-center'>
              <p className='text-gray-500 text-lg'>No errand professionals found at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Hiring Modal ── */}

      {/* ── Video Modal ── */}

      {/* ── Gallery Modal ── */}
    </section>
  );
};

export default ErrandPage;
