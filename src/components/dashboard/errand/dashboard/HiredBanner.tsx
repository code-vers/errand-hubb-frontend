"use client";

import { FC } from "react";
import { PartyPopper, CornerUpLeft, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { HiredBanner as HiredBannerType } from "@/types/dashboard";

interface HiredBannerProps {
  data: HiredBannerType;
  onReplyClick?: () => void;
}

const HiredBanner: FC<HiredBannerProps> = ({ data, onReplyClick }) => {
  return (
    <section className='bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] p-6 mb-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4'>
        <div className='flex items-center gap-3'>
          <div className='text-[var(--color-primary)]'>
            <PartyPopper className='w-6 h-6' />
          </div>
          <h1 className='text-xl md:text-2xl font-bold text-[var(--color-primary)] uppercase tracking-wide'>
            Congratulations.. You&apos;re hired!
          </h1>
        </div>

        <Button
          variant='outline'
          size='md'
          onClick={onReplyClick}
          className='flex items-center gap-2'>
          <CornerUpLeft className='w-5 h-5' />
          REPLY TO CLIENT HERE
        </Button>
      </div>

      <div className='flex flex-wrap items-center gap-6 text-sm text-[#6B7280] mb-4'>
        <div className='flex items-center gap-2'>
          <User className='w-4 h-4 text-foreground' />
          <span className='text-foreground'>Client:</span>
          {data.clientName}
        </div>

        <div className='flex items-center gap-2'>
          <Clock className='w-4 h-4 text-foreground' />
          <span className='text-foreground'>{data.hiredDate}</span>
        </div>
      </div>

      <p className='text-[#4B5563] text-sm md:text-base leading-relaxed'>
        {data.message}
      </p>
    </section>
  );
};

export default HiredBanner;
