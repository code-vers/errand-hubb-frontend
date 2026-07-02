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

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
      
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <section
      className='flex justify-center items-center gap-3 mt-12 mb-8'
      data-purpose='pagination'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='w-8 h-8 rounded-full bg-white text-gray-400 flex items-center justify-center text-sm font-bold border border-gray-100 hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
        ‹
      </button>

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

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='w-8 h-8 rounded-full bg-white text-gray-400 flex items-center justify-center text-sm font-bold border border-gray-100 hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
        ›
      </button>
    </section>
  );
}
