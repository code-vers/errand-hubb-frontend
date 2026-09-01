"use client";

import React, { useState } from 'react';
import { Star, X, Loader2, CheckCircle2 } from 'lucide-react';
import { reviewsService } from '@/services/reviewsService';

interface LeaveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  revieweeId: string;
  revieweeName: string;
  revieweeImage?: string;
  postId?: string;
  serviceRequestId?: string;
  onReviewSubmitted?: () => void;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent!',
};

export const LeaveReviewModal: React.FC<LeaveReviewModalProps> = ({
  isOpen,
  onClose,
  revieweeId,
  revieweeName,
  revieweeImage,
  postId,
  serviceRequestId,
  onReviewSubmitted,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revieweeId || typeof revieweeId !== 'string' || !revieweeId.trim()) {
      setError('Unable to identify the review recipient user. Please refresh and try again.');
      return;
    }
    if (!rating) {
      setError('Please select a star rating');
      return;
    }
    if (!comment.trim() || comment.trim().length < 3) {
      setError('Please enter a brief feedback comment (at least 3 characters)');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const createdReview = await reviewsService.createReview({
        revieweeId: revieweeId.trim(),
        rating,
        comment: comment.trim(),
        postId: postId && postId.trim() ? postId.trim() : undefined,
        serviceRequestId: serviceRequestId && serviceRequestId.trim() ? serviceRequestId.trim() : undefined,
      });

      if (typeof window !== 'undefined') {
        const event = new CustomEvent('review-submitted', {
          detail: {
            postId: postId && postId.trim() ? postId.trim() : undefined,
            serviceRequestId: serviceRequestId && serviceRequestId.trim() ? serviceRequestId.trim() : undefined,
            revieweeId: revieweeId.trim(),
            rating,
            comment,
            review: createdReview,
          },
        });
        window.dispatchEvent(event);
      }

      setIsSuccess(true);
      if (onReviewSubmitted) onReviewSubmitted();

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to submit review';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeRating = hoverRating || rating;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 text-gray-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce mb-3" />
            <h3 className="text-xl font-extrabold text-gray-900">Thank You!</h3>
            <p className="text-sm text-gray-500 mt-1">Your rating & review has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Leave a Review</h3>
              <p className="text-xs text-gray-500 mt-0.5">Share your experience to help our community</p>
            </div>

            {/* Target Person Info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <img
                src={revieweeImage || '/image.png'}
                alt={revieweeName}
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-400"
              />
              <div>
                <p className="text-sm font-bold text-gray-900">{revieweeName}</p>
                <span className="text-[11px] text-gray-500">Rate your experience with this user</span>
              </div>
            </div>

            {/* Star Rating Selector */}
            <div className="flex flex-col items-center justify-center py-2 bg-orange-50/50 rounded-xl border border-orange-100">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                  >
                    <Star
                      size={32}
                      className={
                        star <= activeRating
                          ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                ))}
              </div>
              <span className="mt-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
                {RATING_LABELS[activeRating] || 'Select Rating'}
              </span>
            </div>

            {/* Comment Textarea */}
            <div>
              <label htmlFor="review-comment" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Feedback Comment
              </label>
              <textarea
                id="review-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a few words about how the errand went..."
                className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6900] transition-all resize-none text-gray-800 placeholder:text-gray-400"
              />
            </div>

            {error && (
              <p className="text-xs font-semibold text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-100 text-center">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#ff6900] hover:bg-[#e05d00] text-white font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Submitting Review...</span>
                </>
              ) : (
                <span>Submit Review</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LeaveReviewModal;
