'use client';

import { Play, Plus, Search, Loader2, AlertCircle, RotateCcw, X, Eye } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useAds } from '@/hooks/useAds';
import { useAdsCategories } from '@/hooks/useAdsCategories';
import { getImageUrl } from '@/configs/api.config';
import Pagination from '@/components/common/Pagination';
import AdDetailsModal from './AdDetailsModal';

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
  const [selectedAd, setSelectedAd] = useState<any | null>(null);

  const safeCategories = useMemo(() => {
    return Array.isArray(categories) ? categories : [];
  }, [categories]);

  const safeAds = useMemo(() => {
    return Array.isArray(ads) ? ads : [];
  }, [ads]);

  return (
    <div className='bg-[var(--color-surface-dim)] min-h-screen py-12 px-6 lg:px-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-[var(--color-secondary)]'>
              Business Ads Gallery
            </h1>
            <p className='text-gray-500 text-sm mt-1'>
              Discover local businesses and services promoting in our community.
            </p>
          </div>
          <Link
            href='/post-ad'
            className='flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm cursor-pointer'
          >
            <Plus size={18} /> Post Your Ad
          </Link>
        </div>

        {/* Filters */}
        <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col lg:flex-row items-end gap-4'>
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
                className='w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all'
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {filters.search && (
                <button
                  type='button'
                  onClick={() => setSearch('')}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer transition-colors'
                  aria-label='Clear search'
                >
                  <X size={16} />
                </button>
              )}
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
            type='button'
            onClick={resetFilters}
            className='h-[48px] px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-xs hover:shadow-sm active:scale-95 flex items-center justify-center'
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
                    <div
                      onClick={() => setSelectedAd(ad)}
                      className='relative w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-slate-100 aspect-[3/4] flex items-center justify-center cursor-pointer group/poster'
                      title='Click to view poster details'
                    >
                      <img
                        src={
                          getImageUrl(ad.imageUrl) ||
                          'https://images.unsplash.com/photo-1542831371-29b0f74f9713'
                        }
                        alt={ad.companyName || 'Business Poster'}
                        className='w-full h-full object-contain block group-hover:scale-105 transition-transform duration-500'
                      />
                      {/* Floating Eye Badge */}
                      <div
                        className='absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700 hover:text-[var(--color-primary)] p-2 rounded-full shadow-md transition-all group-hover/poster:scale-110'
                        title='View Details'
                      >
                        <Eye size={16} />
                      </div>
                    </div>

                    {/* Poster Info & Action */}
                    <div className='flex justify-between items-start px-1'>
                      <div className='flex-1 pr-3 min-w-0'>
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

                      <div className='flex items-center gap-1.5 shrink-0'>
                        <button
                          type='button'
                          onClick={() => setSelectedAd(ad)}
                          className='flex items-center gap-1 bg-orange-50 hover:bg-orange-100 text-[var(--color-primary)] px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-colors border border-orange-200 cursor-pointer shadow-2xs'
                          title='View Details'
                        >
                          <Eye size={12} />
                          <span>Details</span>
                        </button>

                        {ad.youtubeLink && (
                          <a
                            href={ad.youtubeLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-[11px] font-bold hover:bg-red-100 transition-colors border border-red-100'
                            title='Watch Video'
                          >
                            <Play size={12} fill='currentColor' />
                            Video
                          </a>
                        )}
                      </div>
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

        {/* Ad Details Modal */}
        <AdDetailsModal
          isOpen={!!selectedAd}
          onClose={() => setSelectedAd(null)}
          ad={selectedAd}
        />
      </div>
    </div>
  );
};

export default AdsGallery;
// test
