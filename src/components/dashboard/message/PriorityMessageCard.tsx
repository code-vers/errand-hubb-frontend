"use client";

import { FC } from "react";
import { Reply, CheckCircle, Check, CheckCheck, CircleCheck } from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar";
import StatusIndicator from "@/components/ui/StatusIndicator";
import { Button } from "@/components/ui/Button";
import type { PriorityMessage } from "@/types/messages";

interface PriorityMessageCardProps {
  message: PriorityMessage;
  onReply?: (messageId: string) => void;
  onViewDetails?: (messageId: string) => void;
}

const PriorityMessageCard: FC<PriorityMessageCardProps> = ({
  message,
  onReply,
  onViewDetails,
}) => {
  return (
    <div className='bg-[#ffe6b3] rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex flex-col sm:flex-row gap-4 items-start relative'>
      {/* Avatar and Status */}
      <div className='relative shrink-0 mt-1'>
        <UserAvatar
          src={message.user.avatar}
          alt={`${message.user.name} Avatar`}
          initials={message.user.initials}
        />
        <StatusIndicator status={message.user.onlineStatus} />
      </div>

      {/* Content */}
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-1'>
          <div className='flex items-center gap-3'>
            <h3 className='text-[20px] font-bold text-foreground'>
              {message.user.name}
            </h3>
            {message.isHired && (
              <span className='inline-flex  items-center gap-1.5 rounded-full border border-primary px-6 py-2  text-[#EC6F27] bg-badge-pending  tracking-wider'>
                <CircleCheck className='' />
                <span className='ml-2 mt-0.5 text-[12px]'> Hired</span>
              </span>
            )}
          </div>
          <span className='text-[12px] text-[#6B7280] mt-1 sm:-mt-5'>
            {message.timeAgo}
          </span>
        </div>

        <p className='text-[14px] text-primary font-normal my-3'>
          Regarding: {message.regarding}
        </p>

        <p className='text-[16px] text-[#4B5563] font-normal leading-relaxed pr-0 sm:pr-8'>
          {message.message}
        </p>
      </div>

      {/* Actions */}
      <div className='flex sm:flex-col gap-2 w-full sm:w-auto shrink-0 mt-4 sm:mt-0'>
        <Button
          variant='primary'
          size='md'
          onClick={() => onReply?.(message.id)}
          className='flex-1 sm:flex-none uppercase text-[11px] font-bold tracking-wider'>
          <Reply className='w-3.5 h-3.5' />
          REPLY
        </Button>

        <Button
          variant='outline'
          size='md'
          onClick={() => onViewDetails?.(message.id)}
          className='flex-1 sm:flex-none uppercase text-[11px] font-bold tracking-wider'>
          VIEW DETAILS
        </Button>
      </div>
    </div>
  );
};

export default PriorityMessageCard;
