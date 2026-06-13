"use client";
import { getImageUrl } from "@/configs/api.config";
import { postService } from "@/services/post.service";
import { Post } from "@/types/search";
import {
  AlertCircle,
  Calendar,
  DollarSign,
  Loader2,
  MapPin,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import logo from "../../../public/logo2.svg";

interface MembershipPlan {
  priceLabel: string;
  billingCycle: string;
}

const membershipPlan: MembershipPlan = {
  priceLabel: "JUST $5",
  billingCycle: "MONTHLY",
};

const ErrandPage = () => {
  const [selectedErrand, setSelectedErrand] = useState<Post | null>(null);
  const [errands, setErrands] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchErrands = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response: any = await postService.findAll({
        limit: 50,
        status: "active",
      });
      if (response && response.success) {
        setErrands(response.data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch errands:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchErrands();
  }, []);

  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center py-20 gap-4'>
        <AlertCircle className='w-12 h-12 text-red-500' />
        <h2 className='text-xl font-bold text-gray-800'>
          Unable to load Errands
        </h2>
        <p className='text-gray-500'>
          There was an error fetching the errands. Please try again later.
        </p>
        <button
          onClick={() => fetchErrands()}
          className='px-6 py-2 bg-primary text-white rounded-md font-bold'>
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
            <h1 className='text-[34px] font-extrabold tracking-[0.5px] text-(--color-secondary) md:text-[46px] uppercase'>
              Active Errands
            </h1>
            <p className='mt-2 text-[18px] text-[#37556d]'>
              Browse available tasks and start earning today
            </p>
          </header>

          {isLoading ? (
            <div className='flex justify-center py-20'>
              <Loader2 className='w-10 h-10 animate-spin text-primary' />
            </div>
          ) : errands.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-20 gap-4 bg-white/50 rounded-2xl mt-8'>
              <AlertCircle className='w-12 h-12 text-gray-400' />
              <h2 className='text-xl font-bold text-gray-800'>
                No active errands found
              </h2>
              <p className='text-gray-500'>
                Check back later for new opportunities.
              </p>
            </div>
          ) : (
            <div className='mt-7.5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {errands.map((errand) => (
                <article
                  key={errand.id}
                  className='overflow-hidden rounded-[18px] bg-[#f6f6f6] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-transform'>
                  <div className='relative h-58.75 md:h-66.5 w-full'>
                    <img
                      src={
                        getImageUrl(errand.user?.profileImage) ||
                        getImageUrl(errand.photoUrl) ||
                        "/errand/bg.png"
                      }
                      alt={errand.title}
                      className='h-full w-full object-cover'
                    />
                    <div className='absolute top-4 left-4'>
                      <span className='bg-primary text-white text-[12px] font-bold px-3 py-1 rounded-full'>
                        {errand.category?.name || "General"}
                      </span>
                    </div>
                  </div>
                  <div className='p-4 pb-4.5'>
                    <div className='flex items-center justify-between gap-2.5'>
                      <h2 className='text-[22px] font-bold text-(--color-secondary) line-clamp-1'>
                        {errand.title}
                      </h2>
                      <div className='flex items-center gap-1 text-primary font-bold'>
                        <DollarSign size={16} />
                        <span className='text-[20px]'>
                          {errand.budget || "Flexible"}
                        </span>
                      </div>
                    </div>

                    <div className='mt-2 flex items-center text-[14px] text-gray-600'>
                      <MapPin size={14} className='mr-1 text-red-500' />
                      {errand.city}, {errand.state}
                    </div>

                    <p className='mt-3 text-[14px] text-[#555555] line-clamp-2 min-h-[40px]'>
                      {errand.description}
                    </p>

                    <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-4'>
                      <div className='flex flex-col'>
                        <span className='text-[11px] tracking-[0.8px] text-[#757b84] uppercase font-bold'>
                          Date Needed
                        </span>
                        <div className='flex items-center text-[13px] font-semibold text-secondary mt-1'>
                          <Calendar size={14} className='mr-1' />
                          {errand.dateNeeded
                            ? new Date(errand.dateNeeded).toLocaleDateString()
                            : "Anytime"}
                        </div>
                      </div>
                    </div>

                    <button
                      type='button'
                      onClick={() => setSelectedErrand(errand)}
                      className='mt-5 min-h-11 w-full rounded-md bg-(--color-primary) text-[13px] font-extrabold tracking-[1px] text-white hover:bg-(--color-primary-dark) transition-colors'>
                      HIRE NOW
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Errand Detail Modal ── */}
      {selectedErrand && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'
          onClick={() => setSelectedErrand(null)}>
          <div
            className='relative w-full max-w-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden'
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className='relative h-48 w-full'>
              <img
                src={
                  getImageUrl(selectedErrand.user?.profileImage) ||
                  getImageUrl(selectedErrand.photoUrl) ||
                  "/errand/bg.png"
                }
                alt={selectedErrand.title}
                className='w-full h-full object-cover'
              />
              <button
                onClick={() => setSelectedErrand(null)}
                className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors'>
                <X size={18} />
              </button>
            </div>

            <div className='p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <span className='bg-primary/10 text-primary text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block'>
                    {selectedErrand.category?.name}
                  </span>
                  <h2 className='text-[26px] font-extrabold text-[#111111] leading-tight'>
                    {selectedErrand.title}
                  </h2>
                  <div className='flex items-center text-sm text-gray-500 mt-1'>
                    <MapPin size={14} className='mr-1 text-red-500' />
                    {selectedErrand.city}, {selectedErrand.state}
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-[11px] font-bold text-gray-400 uppercase'>
                    Budget
                  </p>
                  <p className='text-[24px] font-extrabold text-primary'>
                    ${selectedErrand.budget || "Flexible"}
                  </p>
                </div>
              </div>

              <div className='h-px bg-gray-100 my-4' />

              <div className='space-y-4'>
                <div>
                  <h3 className='text-[13px] font-extrabold text-secondary uppercase tracking-wider mb-2'>
                    Description
                  </h3>
                  <p className='text-[15px] text-gray-600 leading-relaxed'>
                    {selectedErrand.description}
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-gray-50 p-3 rounded-xl'>
                    <p className='text-[11px] font-bold text-gray-400 uppercase mb-1'>
                      Date Needed
                    </p>
                    <div className='flex items-center text-sm font-bold text-secondary'>
                      <Calendar size={14} className='mr-2 text-primary' />
                      {selectedErrand.dateNeeded
                        ? new Date(
                            selectedErrand.dateNeeded,
                          ).toLocaleDateString()
                        : "Flexible"}
                    </div>
                  </div>
                  <div className='bg-gray-50 p-3 rounded-xl'>
                    <p className='text-[11px] font-bold text-gray-400 uppercase mb-1'>
                      Time
                    </p>
                    <div className='flex items-center text-sm font-bold text-secondary'>
                      <span className='text-primary mr-2 font-bold'>🕒</span>
                      {selectedErrand.time || "Flexible"}
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8 flex gap-3'>
                <button
                  onClick={() => {
                    toast.success("Interest sent to client!");
                    setSelectedErrand(null);
                  }}
                  className='flex-1 h-12 rounded-xl bg-primary text-white font-extrabold text-[14px] uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20'>
                  Apply Now
                </button>
                <Link
                  href={`/dashboard/messages?clientId=${selectedErrand.user}`}
                  className='flex-1 h-12 flex items-center justify-center rounded-xl border-2 border-primary text-primary font-extrabold text-[14px] uppercase tracking-widest hover:bg-primary/5 transition-all'>
                  Message Client
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ErrandPage;
