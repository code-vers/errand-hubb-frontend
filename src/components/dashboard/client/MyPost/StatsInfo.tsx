"use client";

interface StatsInfoProps {
  total: number;
  currentPage: number;
  totalPages: number;
}

export default function StatsInfo({
  total,
  currentPage,
  totalPages,
}: StatsInfoProps) {
  return (
    <div className='flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest '>
      <div className='flex items-center gap-1.5'>
        <span className='inline-flex items-center justify-center bg-[#FDE2D1] text-[#EC6F27] w-8 h-8 rounded-full text-[10px] font-black'>
          {total}
        </span>
        <span className=' font-normal text-[#6B6B6B]'>posts</span>
      </div>
      <div>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
