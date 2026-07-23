"use client";

import { Play, Plus, Search, Loader2, Filter } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useAds } from "@/hooks/useAds";
import { useAdsCategories } from "@/hooks/useAdsCategories";
import { getImageUrl } from "@/configs/api.config";

const AdsGallery = () => {
  const { 
    ads, 
    loading, 
    filters, 
    setSearch, 
    setCategory, 
    setSubcategory, 
    resetFilters 
  } = useAds(12);
  
  const { categories, loading: categoriesLoading } = useAdsCategories();

  const selectedCategory = useMemo(() => {
    return categories.find(c => c.id === filters.categoryId);
  }, [categories, filters.categoryId]);

  return (
    <div className='min-h-screen bg-white py-12 px-6 lg:px-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b pb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>
              Company Posting Board ADS
            </h1>
            <p className=' mt-1 text-[#f47a22]'>Just $20 PER MONTH</p>
          </div>

          <Link
            href='/post-ad'
            className='flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[var(--color-primary-dark)] transition-all active:scale-95'>
            <Plus size={18} />
            Post New Poster
          </Link>
        </div>

        {/* Filters Section */}
        <div className='mb-12 flex flex-col lg:flex-row gap-4 items-end'>
          <div className='w-full lg:w-1/3'>
            <label className='block text-xs font-bold text-gray-400 uppercase mb-2 ml-1'>Search</label>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
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
            <label className='block text-xs font-bold text-gray-400 uppercase mb-2 ml-1'>Category</label>
            <select
              className='w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all'
              value={filters.subcategoryId ? `sub_${filters.subcategoryId}_${filters.categoryId}` : (filters.categoryId ? `cat_${filters.categoryId}` : '')}
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
              {categories.map(cat => (
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
            className='h-[50px] px-6 text-gray-400 hover:text-gray-600 font-bold text-sm uppercase tracking-wider transition-colors'
          >
            Reset
          </button>
        </div>

        {/* Ads Grid - Poster Style */}
        {loading ? (
          <div className='flex flex-col items-center justify-center py-20 gap-4'>
            <Loader2 className='w-10 h-10 animate-spin text-[var(--color-primary)]' />
            <p className='text-gray-500 font-medium'>Loading posters...</p>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
              {ads.map((ad) => (
                <div key={ad.id} className='flex flex-col gap-3 group animate-in fade-in zoom-in-95 duration-500'>
                  {/* Poster Image */}
                  <div className='relative w-full rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-gray-50 aspect-[4/5]'>
                    <img
                      src={getImageUrl(ad.imageUrl) || "https://images.unsplash.com/photo-1542831371-29b0f74f9713"}
                      alt={ad.companyName}
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
                        <p className='text-[10px] text-white bg-[var(--color-primary)] px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter'>
                          {ad.category?.name}
                        </p>
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
                        title='Watch Video'>
                        <Play size={12} fill='currentColor' />
                        Video
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {ads.length === 0 && (
              <div className='text-center py-20 border-2 border-dashed border-gray-100 rounded-2xl'>
                <p className='text-gray-400 font-medium'>
                  No posters found matching your criteria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdsGallery;
