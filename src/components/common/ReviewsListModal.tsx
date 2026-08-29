"use client";

import React, { useState, useEffect } from 'react';
import { Star, X, Loader2, MessageSquare } from 'lucide-react';
import { reviewsService } from '@/services/reviewsService';
import { getImageUrl } from '@/configs/api.config';
import { format } from 'date-fns';

interface ReviewsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  userRole?: string;
}

export const ReviewsListModal: React.FC<ReviewsListModalProps> = ({
  isOpen,
  onClose,
  userId,
  userName,
  userRole,
}) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen && userId) {
      setIsLoading(true);
      reviewsService
        .getUserReviews(userId)
        .then((res) => {
          setReviews(res.data?.data || []);
          setSummary(res.data?.summary || null);
        })
        .catch((err) => console.error('Failed to load reviews:', err))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 text-gray-900 max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 shrink-0">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              Ratings & Reviews
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Client & Errander feedback for <span className="font-bold text-gray-800">{userName}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#ff6900]" />
            <p className="mt-3 text-sm text-gray-500 font-medium">Loading reviews...</p>
          </div>
        ) : (
          <div className="overflow-y-auto pt-4 space-y-6 pr-1 flex-1">
            {/* Fiverr-Style Rating Summary Header */}
            {summary && summary.totalReviews > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-6 p-4 bg-orange-50/60 rounded-2xl border border-orange-100/80 items-center">
                {/* Big Score */}
                <div className="flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-orange-200/60 pb-4 sm:pb-0 sm:pr-4">
                  <span className="text-4xl font-black text-gray-900">
                    {summary.averageRating.toFixed(1)}
                  </span>
                  <div className="flex items-center gap-1 my-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= Math.round(summary.averageRating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-500">
                    {summary.totalReviews} {summary.totalReviews === 1 ? 'Review' : 'Reviews'}
                  </span>
                </div>

                {/* Star Breakdown Bars */}
                <div className="space-y-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const item = summary.breakdown?.[stars] || { count: 0, percentage: 0 };
                    return (
                      <div key={stars} className="flex items-center gap-3 text-xs">
                        <span className="w-10 font-semibold text-gray-600 flex items-center gap-1">
                          <span>{stars}</span>
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                        </span>
                        <div className="flex-1 h-2 bg-gray-200/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-right font-medium text-gray-400">
                          {item.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Reviews List */}
            {reviews.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mb-2" />
                <h4 className="text-base font-bold text-gray-700">No Reviews Yet</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Reviews will appear here once tasks are completed and feedback is submitted.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={getImageUrl(rev.reviewer?.profileImage) || '/image.png'}
                          alt={rev.reviewer?.firstName || 'User'}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-bold text-gray-900">
                              {rev.reviewer?.firstName} {rev.reviewer?.lastName}
                            </h5>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                              {rev.reviewerRole || 'User'}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400">
                            {rev.createdAt ? format(new Date(rev.createdAt), 'MMM dd, yyyy') : ''}
                          </span>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-700">{rev.rating}.0</span>
                      </div>
                    </div>

                    {rev.post?.title && (
                      <div className="mt-2 text-[11px] font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md inline-block">
                        Errand: {rev.post.title}
                      </div>
                    )}

                    <p className="mt-2 text-sm text-gray-700 font-normal leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsListModal;
