"use client";

import { FC } from "react";
import { Sparkles, MessageSquare, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { HiredBanner as HiredBannerType } from "@/types/dashboard";

interface HiredBannerProps {
  data: HiredBannerType;
  onReplyClick?: () => void;
}

const HiredBanner: FC<HiredBannerProps> = ({ data, onReplyClick }) => {
  return (
    <section className='bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] p-4 sm:p-6 mb-6 sm:mb-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 mb-4'>
        <div className='flex items-center gap-2.5 sm:gap-3'>
          <div className='text-[var(--color-primary)] shrink-0'>
            <Sparkles className='w-5 h-5 sm:w-6 sm:h-6' />
          </div>
          <h1 className='text-base sm:text-xl md:text-2xl font-bold text-[var(--color-primary)] uppercase tracking-wide'>
            WELCOME TO ERRAND HUB!
          </h1>
        </div>

        {data.clientId && (
          <Button
            variant='outline'
            size='md'
            onClick={onReplyClick}
            className='w-full md:w-auto justify-center flex items-center gap-2 cursor-pointer text-xs sm:text-sm shrink-0'>
            <MessageSquare className='w-4 h-4 sm:w-5 sm:h-5' />
            VIEW MESSAGES
          </Button>
        )}
      </div>

      {data.clientName && data.clientName !== "System" && (
        <div className='flex flex-wrap items-center gap-6 text-sm text-[#6B7280] mb-4'>
          <div className='flex items-center gap-2'>
            <User className='w-4 h-4 text-foreground' />
            <span className='text-foreground'>Latest Connection:</span>
            {data.clientName}
          </div>

          {data.hiredDate && data.hiredDate !== "N/A" && (
            <div className='flex items-center gap-2'>
              <Clock className='w-4 h-4 text-foreground' />
              <span className='text-foreground'>{data.hiredDate}</span>
            </div>
          )}
        </div>
      )}

      <p className='text-[#4B5563] text-sm md:text-base leading-relaxed'>
        {data.message || "Welcome to your Errand Hub dashboard! Connect with clients, manage your errands, and grow your tasks seamlessly."}
      </p>
    </section>
  );
};

export default HiredBanner;
