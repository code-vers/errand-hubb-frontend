'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Loader2,
  AlertCircle,
  MapPin,
  Clock,
  MessageSquare,
  ExternalLink,
  Calendar,
} from 'lucide-react';
import Pagination from '@/components/common/Pagination';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useConnect } from '@/hooks/useConnect';
import { getImageUrl } from '@/configs/api.config';
import { Eye, X } from 'lucide-react';

const CategoryIcon = ({
  category,
  className = 'w-full h-full',
}: {
  category?: any;
  className?: string;
}) => {
  const categoryColor = category?.color || '#FF7A2F';
  return (
    <div
      aria-hidden='true'
      style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
      className={`${className} flex items-center justify-center text-3xl`}
    >
      {category?.iconType === 'emoji' ? (
        <span role='img' aria-label={category.name}>
          {category.icon}
        </span>
      ) : category?.icon ? (
        <img
          src={getImageUrl(category.icon) || ''}
          alt={category.name}
          className='w-10 h-10 object-contain'
        />
      ) : (
        <span role='img' aria-label='default'>
          🛒
        </span>
      )}
    </div>
  );
};

const PostDetailsModal: React.FC<{ post: any; isOpen: boolean; onClose: () => void }> = ({
  post,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !post) return null;
  const user = post.user || {};
  const clientName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Client';

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
      <div className='bg-white rounded-[20px] w-full max-w-[500px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <h3 className='text-lg font-bold text-gray-900'>Job Details</h3>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X size={20} className='text-gray-500' />
          </button>
        </div>
        <div className='p-6 overflow-y-auto'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='w-16 h-16 rounded-xl overflow-hidden shrink-0'>
              <CategoryIcon category={post.category} />
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-900 mb-1'>{post.title}</h2>
              <p className='text-sm font-semibold text-gray-500'>Posted by {clientName}</p>
            </div>
          </div>

          <div className='space-y-6'>
            <div>
              <h4 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>
                Description
              </h4>
              <p className='text-gray-700 leading-relaxed text-sm whitespace-pre-wrap'>
                {post.description}
              </p>
            </div>

            <div className='grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl'>
              <div>
                <h4 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>
                  Reward
                </h4>
                <p className='font-bold text-primary text-lg'>${post.budget || 'Flexible'}</p>
              </div>
              <div>
                <h4 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>
                  Location
                </h4>
                <p className='font-semibold text-gray-700 text-sm flex items-center gap-1'>
                  <MapPin size={14} className='text-primary' />
                  {post.city}
                  {post.state ? `, ${post.state}` : ''}
                </p>
              </div>
              <div>
                <h4 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>
                  Date Needed
                </h4>
                <p className='font-semibold text-gray-700 text-sm flex items-center gap-1'>
                  <Calendar size={14} className='text-primary' />
                  {post.dateNeeded ? new Date(post.dateNeeded).toLocaleDateString() : 'Flexible'}
                </p>
              </div>
              <div>
                <h4 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>
                  Time
                </h4>
                <p className='font-semibold text-gray-700 text-sm flex items-center gap-1'>
                  <Clock size={14} className='text-primary' />
                  {post.time || 'Flexible'}
                </p>
              </div>
            </div>

            {post.photoUrl && (
              <div>
                <h4 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>
                  Attached Image
                </h4>
                <div className='rounded-xl overflow-hidden border border-gray-100'>
                  <img
                    src={getImageUrl(post.photoUrl)}
                    alt='Attached'
                    className='w-full max-h-48 object-cover'
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ErrandCard: React.FC<{
  post: any;
  onConnect: (userId: string, postId: string) => void;
  onViewDetails: (post: any) => void;
  isConnecting: boolean;
  connectingPostId: string | null;
}> = ({ post, onConnect, onViewDetails, isConnecting, connectingPostId }) => {
  const user = post.user || {};

  const title = post.title || `${user.firstName} ${user.lastName}`;
  const description = post.description || 'Available for errands.';
  const budget = post.budget || 'Flexible';
  const city = post.city || 'Location not set';
  const time = post.dateNeeded ? new Date(post.dateNeeded).toLocaleDateString() : 'Flexible Date';

  const isThisConnecting = isConnecting && connectingPostId === post.id;

  return (
    <div className='bg-[#FDF5EC] rounded-lg p-5 flex gap-3.5 items-start relative border border-primary/10 hover:border-primary/30 transition-all'>
      {/* Category Icon instead of Profile Image */}
      <div
        className='w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-primary/10 bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity'
        onClick={() => onViewDetails(post)}
      >
        <CategoryIcon category={post.category} />
      </div>

      {/* Content */}
      <div className='flex-1'>
        <div className='pr-12'>
          <h3
            className='text-[16px] font-bold text-foreground mb-1.5 leading-snug cursor-pointer hover:text-primary transition-colors line-clamp-1 hover:underline'
            onClick={() => onViewDetails(post)}
          >
            {title}
          </h3>
        </div>
        <p className='text-[12px] text-[#555555] leading-relaxed mb-2.5 line-clamp-2'>
          {description}
        </p>
        <div className='flex items-center justify-between mb-3'>
          <p className='text-[14px] font-bold text-primary'>Reward: ${budget}</p>
          <div className='flex items-center text-[11px] text-gray-500'>
            <MapPin size={10} className='mr-1' />
            {city}
          </div>
        </div>
        <div className='flex items-center justify-between mt-2 pt-3 border-t border-[#F5E9D3]'>
          <p className='text-[10px] font-semibold text-[#555555] tracking-wide flex items-center uppercase'>
            <span className='w-1.5 h-1.5 rounded-full mr-1.5 bg-green-500'></span>
            AVAILABLE
          </p>

          <div className='flex gap-2'>
            <button
              onClick={() => onViewDetails(post)}
              className='flex items-center justify-center w-8 h-8 rounded bg-white text-gray-500 hover:text-primary hover:bg-orange-50 transition-colors border border-gray-200'
              title='View Details'
            >
              <Eye size={14} />
            </button>
            <button
              onClick={() => onConnect(user.id || post.userId, post.id)}
              disabled={isThisConnecting}
              className='flex items-center gap-1.5 text-[11px] font-bold bg-primary text-white px-3 py-1.5 rounded hover:bg-primary/90 transition-colors disabled:opacity-50'
            >
              {isThisConnecting ? (
                <Loader2 size={12} className='animate-spin' />
              ) : (
                <MessageSquare size={12} />
              )}
              CONNECT
            </button>
          </div>
        </div>
      </div>

      {/* Time Badge moved out of title way */}
      <div className='absolute top-3.5 right-3.5 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide whitespace-nowrap flex items-center'>
        <Clock size={10} className='mr-1' />
        {time}
      </div>
    </div>
  );
};

export default function ErrandsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'errand')) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    userRole: 'client', // Fetch only client posts
  });

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== 'page' ? { page: 1 } : {}),
    }));
  };

  const { connect, isConnecting } = useConnect();
  const [connectingPostId, setConnectingPostId] = useState<string | null>(null);

  const handleContactClient = async (clientUserId: string, postId: string) => {
    if (!clientUserId) return;
    setConnectingPostId(postId);
    try {
      await connect(clientUserId);
    } finally {
      setConnectingPostId(null);
    }
  };

  // Pass preferredCategoryIds based on Errand Runner's profile
  const preferredCategoryIds = user?.profile?.categoryIds || [];

  const queryParams = useMemo(() => {
    return {
      ...filters,
      ...(preferredCategoryIds.length > 0
        ? { preferredCategoryIds: JSON.stringify(preferredCategoryIds) }
        : {}),
    };
  }, [filters, preferredCategoryIds]);

  const { data: response, isLoading: postsLoading, error: isError } = usePosts(queryParams);

  const posts = useMemo(() => response?.data || [], [response]);
  const meta = useMemo(
    () => response?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 },
    [response],
  );

  if (authLoading || !user || user.role !== 'errand') {
    return (
      <div className='flex justify-center items-center min-h-screen bg-primary'>
        <Loader2 className='w-10 h-10 animate-spin text-white' />
      </div>
    );
  }

  return (
    <div className='bg-primary min-h-screen font-sans'>
      <div className='mx-auto max-w-[1540px] px-6 lg:px-10 py-10'>
        {/* Header */}
        <div className='mb-7 flex justify-between items-end'>
          <div>
            <h1 className='text-[28px] font-extrabold text-white mb-1'>Errand's Board</h1>
            <p className='text-[13px] text-white/90 font-normal'>
              Browse available client jobs tailored for you.
            </p>
          </div>
        </div>

        {/* State Handling */}
        {postsLoading ? (
          <div className='flex justify-center py-20'>
            <Loader2 className='w-10 h-10 animate-spin text-white' />
          </div>
        ) : isError ? (
          <div className='flex flex-col items-center justify-center py-20 gap-4 text-white'>
            <AlertCircle className='w-12 h-12' />
            <h2 className='text-xl font-bold'>Unable to load jobs</h2>
            <button
              onClick={() => window.location.reload()}
              className='px-6 py-2 bg-white text-primary rounded-md font-bold'
            >
              Retry
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 gap-4 bg-white/10 rounded-2xl'>
            <AlertCircle className='w-12 h-12 text-white/50' />
            <h2 className='text-xl font-bold text-white'>No jobs found at the moment</h2>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {posts.map((post: any) => (
                <ErrandCard
                  key={post.id}
                  post={post}
                  onConnect={handleContactClient}
                  onViewDetails={setSelectedPost}
                  isConnecting={isConnecting}
                  connectingPostId={connectingPostId}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className='mt-10 flex justify-center pb-10'>
              <div className='bg-white/10 rounded-xl p-2 backdrop-blur-sm'>
                <Pagination
                  currentPage={meta.page}
                  totalPages={meta.totalPages}
                  onPageChange={(p) => updateFilter('page', p)}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <PostDetailsModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
}
