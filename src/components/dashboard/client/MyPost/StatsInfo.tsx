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
    <div className='flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold'>
      <div>{total} posts</div>
      <div>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
