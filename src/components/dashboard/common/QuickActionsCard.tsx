import React from "react";

interface QuickActionsCardProps {
  onPostOnBoard?: () => void;
  onViewMyPosts?: () => void;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  onPostOnBoard,
  onViewMyPosts,
}) => {
  return (
    <div className='bg-white rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)]'>
      <div className='text-[18px] font-bold text-(--color-foreground) px-4.5 pt-4 pb-3 border-b border-[#F5E9D3] tracking-tight'>
        Quick Actions
      </div>

      <div className='px-4.5 py-4 flex flex-col gap-2.5'>
        <p className='text-xs text-(--color-text-placeholder) m-0'>
          Get things done faster with one click.
        </p>

        {/* POST ON BOARD */}
        <button
          onClick={onPostOnBoard}
          className='flex items-center justify-center gap-2 w-full py-[11px] px-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white border-none rounded-md text-[13px] font-semibold cursor-pointer tracking-wide transition-colors duration-150 font-[var(--font-sans)]'>
          <svg
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'>
            <circle cx='12' cy='12' r='10' />
            <line x1='12' y1='8' x2='12' y2='16' />
            <line x1='8' y1='12' x2='16' y2='12' />
          </svg>
          POST ON BOARD
        </button>

        {/* VIEW MY POSTS */}
        <button
          onClick={onViewMyPosts}
          className='flex items-center justify-center gap-2 w-full py-[10px] px-4 bg-white hover:bg-[var(--color-hover)] text-[#EC6F27] border border-[#EC6F27] rounded-md text-[13px] font-medium cursor-pointer transition-colors duration-150 font-[var(--font-sans)]'>
          <svg
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'>
            <line x1='8' y1='6' x2='21' y2='6' />
            <line x1='8' y1='12' x2='21' y2='12' />
            <line x1='8' y1='18' x2='21' y2='18' />
            <line x1='3' y1='6' x2='3.01' y2='6' />
            <line x1='3' y1='12' x2='3.01' y2='12' />
            <line x1='3' y1='18' x2='3.01' y2='18' />
          </svg>
          VIEW MY POSTS
        </button>

        {/* Tip */}
        <div className='flex bg-[#FFF3CD99] px-4 py-1 items-start gap-1.5 mt-0.5'>
          <span className='text-[11px] text-[#6B7280] leading-relaxed'>
            <strong className='text-[#4B5563] font-semibold'>Tip:</strong>{" "}
            Posting on the board connects you with verified Errands in your
            area.
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;
