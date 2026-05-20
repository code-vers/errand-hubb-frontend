"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: Math.min(totalPages, 4) },
    (_, i) => i + 1,
  );

  return (
    <section
      className='flex justify-center items-center gap-3 mt-12 mb-8'
      data-purpose='pagination'>
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className='w-8 h-8 rounded-full bg-white text-gray-400 flex items-center justify-center text-sm font-bold border border-gray-100 hover:border-primary hover:text-primary transition-colors'>
          ‹
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
            currentPage === page
              ? "bg-primary text-white shadow-md"
              : "bg-white text-gray-400 border border-gray-100 hover:border-primary hover:text-primary"
          }`}
          onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className='w-8 h-8 rounded-full bg-white text-gray-400 flex items-center justify-center text-sm font-bold border border-gray-100 hover:border-primary hover:text-primary transition-colors'>
          ›
        </button>
      )}
    </section>
  );
}
