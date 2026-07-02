"use client";

import { FC } from "react";
import { Reply, MoreHorizontal } from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar";
import StatusIndicator from "@/components/ui/StatusIndicator";
import type { RecentMessage } from "@/types/messages";

interface RecentMessageItemProps {
  message: RecentMessage;
  onReply?: (messageId: string) => void;
  onMoreOptions?: (messageId: string) => void;
}

const RecentMessageItem: FC<RecentMessageItemProps> = ({
  message,
  onReply,
  onMoreOptions,
}) => {
  return (
    <div className='bg-white rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex items-start gap-4 hover:shadow-md transition-shadow'>
      {/* Avatar and Status */}
      <div className='relative shrink-0'>
        <UserAvatar
          src={message.user.avatar}
          alt={`${message.user.name} Avatar`}
          initials={message.user.initials}
        />
        <StatusIndicator
          status={message.user.onlineStatus}
          className={
            message.user.onlineStatus === "online"
              ? "border-background"
              : "border-background"
          }
        />
      </div>

      {/* Content */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-center justify-between mb-1'>
          <h3 className='text-[14px] font-bold text-foreground truncate'>
            {message.user.name}
          </h3>
          <span className='text-[12px] text-[#6B7280] font-medium shrink-0 ml-2'>
            {message.timeAgo}
          </span>
        </div>

        <p className='text-[14px] text-[#EC6F27]  truncate mb-1'>
          Regarding: {message.regarding}
        </p>

        <p className='text-[14px] text-[#4B5563] truncate'>
          {message.message}
        </p>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-3 shrink-0 self-center'>
        <button
          aria-label='Reply'
          onClick={() => onReply?.(message.id)}
          className='text-primary hover:text-primary-dark transition-colors'>
          <Reply className='w-5 h-5' />
        </button>

        <button
          aria-label='More options'
          onClick={() => onMoreOptions?.(message.id)}
          className='text-gray-400 hover:text-gray-600 transition-colors'>
          <MoreHorizontal className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default RecentMessageItem;
