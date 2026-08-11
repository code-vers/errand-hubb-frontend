'use client';

import { Play, Plus, Search, Loader2, AlertCircle, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { useAds } from '@/hooks/useAds';
import { useAdsCategories } from '@/hooks/useAdsCategories';
import { getImageUrl } from '@/configs/api.config';
import Pagination from '@/components/common/Pagination';

const AdsGallery = () => {
  const {
    ads,
    loading,
    error,
    totalPages,
    currentPage,
    filters,
    setSearch,
    setCategory,
    setSubcategory,
    setPage,
    resetFilters,
    refresh,
  } = useAds(12);

  const { categories, loading: categoriesLoading } = useAdsCategories();

  const safeCategories = useMemo(() => {
    return Array.isArray(categories) ? categories : [];
  }, [categories]);

  const safeAds = useMemo(() => {
    return Array.isArray(ads) ? ads : [];
  }, [ads]);

  return (
    <div className='min-h-screen bg-white py-12 px-6 lg:px-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b pb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>
              Company Posting Board ADS
            </h1>
            <p className=' mt-1 text-[#f47a22] font-semibold'>Just $20 PER MONTH</p>
          </div>

          <Link
            href='/post-ad'
            className='flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[var(--color-primary-dark)] transition-all active:scale-95 shadow-md shadow-orange-500/20'
          >
            <Plus size={18} />
            Post New Poster
          </Link>
        </div>

        {/* Filters Section */}
        <div className='mb-12 flex flex-col lg:flex-row gap-4 items-end'>
          <div className='w-full lg:w-1/3'>
            <label className='block text-xs font-bold text-gray-400 uppercase mb-2 ml-1'>
              Search
            </label>
            <div className='relative'>
              <Search
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                size={18}
              />
              <input
                type='text'
                placeholder='Search company, title, or keyword...'
                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all'
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className='w-full lg:w-1/3'>
            <label className='block text-xs font-bold text-gray-400 uppercase mb-2 ml-1'>
              Category
            </label>
            <select
              className='w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all cursor-pointer'
              value={
                filters.subcategoryId
                  ? `sub_${filters.subcategoryId}_${filters.categoryId}`
                  : filters.categoryId
                    ? `cat_${filters.categoryId}`
                    : ''
              }
              onChange={(e) => {
                const val = e.target.value;
                if (!val) {
                  setCategory('');
                  setSubcategory('');
                } else if (val.startsWith('cat_')) {
                  setCategory(val.split('_')[1]);
                  setSubcategory('');
                } else if (val.startsWith('sub_')) {
                  const parts = val.split('_');
                  setSubcategory(parts[1]);
                  setCategory(parts[2]);
                }
              }}
            >
              <option value=''>All Categories</option>
              {safeCategories.map((cat) => (
                <optgroup key={cat.id} label={cat.name}>
                  <option value={`cat_${cat.id}`}>All {cat.name}</option>
                  {cat.subcategories?.map((sub: any) => (
                    <option key={sub.id} value={`sub_${sub.id}_${cat.id}`}>
                      {sub.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <button
            onClick={resetFilters}
            className='h-[50px] px-6 text-gray-400 hover:text-gray-600 font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer'
          >
            Reset
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className='flex flex-col items-center justify-center py-20 gap-4'>
            <Loader2 className='w-10 h-10 animate-spin text-[var(--color-primary)]' />
            <p className='text-gray-500 font-medium'>Loading posters...</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className='flex flex-col items-center justify-center py-16 px-4 border border-red-100 bg-red-50/50 rounded-2xl text-center gap-4 max-w-md mx-auto'>
            <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500'>
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className='text-base font-bold text-gray-800 mb-1'>Unable to load posters</h3>
              <p className='text-xs text-gray-500'>{error}</p>
            </div>
            <button
              onClick={refresh}
              className='flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm'
            >
              <RotateCcw size={14} /> Try Again
            </button>
          </div>
        ) : (
          /* Ads Grid - Poster Style */
          <>
            {safeAds.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                {safeAds.map((ad) => (
                  <div
                    key={ad.id}
                    className='flex flex-col gap-3 group animate-in fade-in zoom-in-95 duration-500'
                  >
                    {/* Poster Image */}
                    <div className='relative w-full rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-gray-50 aspect-[4/5]'>
                      <img
                        src={
                          getImageUrl(ad.imageUrl) ||
                          'https://images.unsplash.com/photo-1542831371-29b0f74f9713'
                        }
                        alt={ad.companyName || 'Business Poster'}
                        className='w-full h-full object-cover block group-hover:scale-105 transition-transform duration-700'
                      />
                    </div>

                    {/* Poster Info & Action */}
                    <div className='flex justify-between items-start px-1'>
                      <div className='flex-1 pr-4'>
                        <h3 className='font-bold text-gray-800 leading-tight mb-0.5 line-clamp-1'>
                          {ad.companyName}
                        </h3>
                        <h4 className='text-sm text-gray-600 font-medium mb-1 line-clamp-1'>
                          {ad.title}
                        </h4>
                        <div className='flex flex-wrap gap-1'>
                          {ad.category?.name && (
                            <p className='text-[10px] text-white bg-[var(--color-primary)] px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter'>
                              {ad.category.name}
                            </p>
                          )}
                          {ad.subcategory && (
                            <p className='text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter'>
                              {ad.subcategory.name}
                            </p>
                          )}
                        </div>
                      </div>

                      {ad.youtubeLink && (
                        <a
                          href={ad.youtubeLink}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-[11px] font-bold hover:bg-red-100 transition-colors border border-red-100 shrink-0'
                          title='Watch Video'
                        >
                          <Play size={12} fill='currentColor' />
                          Video
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className='text-center py-20 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50'>
                <p className='text-gray-500 font-bold mb-1 text-base'>No Posters Available</p>
                <p className='text-gray-400 text-xs max-w-sm mx-auto mb-4'>
                  No posters found matching your criteria. Be the first to post a poster on our board!
                </p>
                <Link
                  href='/post-ad'
                  className='inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[var(--color-primary-dark)] transition-all'
                >
                  <Plus size={16} /> Post Poster Now
                </Link>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className='mt-12 flex justify-center'>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdsGallery;
// test
