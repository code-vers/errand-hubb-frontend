"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Loader2, AlertCircle } from "lucide-react";
import icon from "../../../public/icon.svg";
import logo from "../../../public/logo2.svg";
import { toast } from "sonner";
import { useErrandProfiles } from "@/hooks/useErrandProfiles";
import { getImageUrl } from "@/configs/api.config";

interface MembershipPlan {
  priceLabel: string;
  billingCycle: string;
}

const membershipPlan: MembershipPlan = {
  priceLabel: "JUST $5",
  billingCycle: "MONTHLY",
};

const ErrandPage = () => {
  const [hiringProfile, setHiringProfile] = useState<any | null>(null);
  const { data: errandrs, isLoading, isError } = useErrandProfiles();

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold text-gray-800">Unable to load Errandrs</h2>
        <p className="text-gray-500">There was an error fetching the profiles. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-white rounded-md font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

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

          {isLoading ? (
            <div className='flex justify-center py-20'>
              <Loader2 className='w-10 h-10 animate-spin text-primary' />
            </div>
          ) : (
            <div className='mt-7.5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {Array.isArray(errandrs) && errandrs.map((profile: any) => (
                <article
                  key={profile.id}
                  className='overflow-hidden rounded-[18px] bg-[#f6f6f6] shadow-[0_8px_20px_rgba(0,0,0,0.12)]'>
                  <div className='relative h-58.75 md:h-66.5 w-full'>
                    <img
                      src={getImageUrl(profile.profileImage) || "https://images.unsplash.com/photo-1521791136064-7986c2923216?w=800&auto=format&fit=crop"}
                      alt={profile.firstName || "Errandr"}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='p-4 pb-4.5'>
                    <div className='flex items-center justify-between gap-2.5'>
                      <h2 className='text-[27px] font-bold text-(--color-secondary)'>
                        {profile.firstName} {profile.lastName?.[0] || ""}.
                      </h2>
                      <button
                        type='button'
                        className='h-8.5 rounded-sm border border-[#c4c4c4] bg-[#efefef] px-3.5 text-[12px] font-bold text-[#6b6f75]'>
                        ABOUT ME
                      </button>
                    </div>

                    <div className='mt-3 flex items-center justify-between'>
                      <span className='text-[18px] text-[#2f66dc] underline cursor-pointer'>
                        Intro
                      </span>
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
                      {(profile.profile?.services || "General Errands").toString().split(',').slice(0, 4).map((service: string) => (
                        <span
                          key={service}
                          className='rounded-full border border-(--color-primary) bg-[#fff3ea] px-2.5 py-0.75 text-[12px] leading-[1.2] text-[#d96f1f]'>
                          {service.trim()}
                        </span>
                      ))}
                    </div>

                    <p className='mt-3 text-[11px] tracking-[0.8px] text-[#757b84]'>
                      PRICES
                    </p>
                    <p className='mt-1.25 text-[27px] font-medium text-[#1e2329]'>
                      ${profile.profile?.ratePerHour?.toString() || "25"} / hr
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
          )}
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
            {/* ── TOP HEADER ── */}
            <div className='flex items-center gap-4 px-5 pt-5 pb-4'>
              <div className='w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 border border-gray-100'>
                <img
                  src={getImageUrl(hiringProfile.profileImage) || "https://images.unsplash.com/photo-1521791136064-7986c2923216?w=800&auto=format&fit=crop"}
                  alt={hiringProfile.firstName}
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='flex-1 min-w-0'>
                <h2 className='text-[22px] font-extrabold text-[#111111] leading-tight'>
                  {hiringProfile.firstName} {hiringProfile.lastName}
                </h2>
                <p className='text-sm text-gray-400 mt-0.5'>
                  {hiringProfile.profile?.city}, {hiringProfile.profile?.state}
                </p>
              </div>

              <button className='w-10 h-10 rounded-full bg-[#1ABFBF] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity'>
                <svg width='14' height='16' viewBox='0 0 14 16' fill='none'>
                  <path d='M1.5 1.5L12.5 8L1.5 14.5V1.5Z' fill='white' />
                </svg>
              </button>

              <button
                onClick={() => setHiringProfile(null)}
                className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400'>
                <X size={18} />
              </button>
            </div>

            <div className='h-px bg-gray-100 mx-5' />

            <div className='flex flex-col md:flex-row gap-4 px-5 pt-4 pb-4'>
              <div className='flex-1 min-w-0 flex flex-col gap-4'>
                <div>
                  <p className='text-[11px] font-extrabold text-[#F47A22] uppercase tracking-widest mb-2'>
                    ABOUT {hiringProfile.firstName.toUpperCase()}
                  </p>
                  <p className='text-[13px] text-gray-600 leading-relaxed line-clamp-4'>
                    {hiringProfile.profile?.bio || "No bio available."}
                  </p>
                </div>

                <div className='flex flex-wrap gap-1.5'>
                  {(hiringProfile.profile?.services || "General").toString().split(',').map((tag: string) => (
                    <span
                      key={tag}
                      className='px-3 py-1 rounded-full border border-gray-200 text-[12px] font-semibold text-gray-600 bg-white'>
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <div className='h-px bg-gray-100' />

                <div className='flex flex-col gap-2.5'>
                  <div className='flex items-start gap-2'>
                    <div className='mt-0.5'>
                      <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='text-gray-400'>
                        <rect x='1' y='2.5' width='14' height='12' rx='2' stroke='currentColor' strokeWidth='1.3' />
                        <path d='M5 1v3M11 1v3M1 6.5h14' stroke='currentColor' strokeWidth='1.3' strokeLinecap='round' />
                      </svg>
                    </div>
                    <div>
                      <p className='text-[13px] font-semibold text-gray-700 leading-tight'>
                        Available Weekdays
                      </p>
                      <p className='text-[12px] font-semibold text-[#F47A22] mt-0.5'>
                        Fast Response
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full md:w-[200px] shrink-0'>
                <div className='bg-[#FFF5EE] rounded-xl p-3.5 flex flex-col gap-2'>
                  <p className='text-[11px] font-bold text-gray-400 uppercase'>Rate</p>
                  <p className='text-[18px] font-extrabold text-[#F47A22]'>${hiringProfile.profile?.ratePerHour?.toString() || "25"} / hr</p>
                </div>
              </div>
            </div>

            <div className='px-5 pb-5 pt-1 flex gap-3'>
              <button
                onClick={() => {
                  toast.success("Connection request sent!");
                  setHiringProfile(null);
                }}
                className='flex-1 h-11 rounded-full bg-white border border-[#F47A22] text-[#F47A22] font-extrabold text-[13px] uppercase tracking-wider hover:bg-[#FFF3E8] transition-colors shadow-sm'>
                HIRE NOW
              </button>
              <Link
                href={`/dashboard/messages?errandId=${hiringProfile.id}`}
                className='flex-1 h-11 flex items-center justify-center rounded-full bg-[#F47A22] text-white font-extrabold text-[13px] uppercase tracking-wider hover:bg-[#BB4D00] transition-colors shadow-md'>
                MESSAGE
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ErrandPage;
