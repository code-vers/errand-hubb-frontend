"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Star,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Award,
  AlertTriangle,
  User,
  CheckCircle2,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { reviewsService } from "@/services/reviewsService";
import { getImageUrl } from "@/configs/api.config";
import { format } from "date-fns";
import StarRating from "@/components/dashboard/client/searchForErrand/StarRating";

interface ReviewItem {
  id: string;
  reviewerId: string;
  revieweeId: string;
  reviewerRole: string;
  rating: number;
  comment: string;
  postId?: string | null;
  serviceRequestId?: string | null;
  createdAt: string;
  reviewer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
    role: string;
  };
  reviewee?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
    role: string;
  };
  post?: {
    id: string;
    title: string;
    budget: number;
    status: string;
  };
}

export default function ReviewManagementPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    fiveStarCount: 0,
    oneStarCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // View Details Modal State
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await reviewsService.getAllReviews({
        page: currentPage,
        limit: 10,
        search: searchQuery,
        rating: selectedRating > 0 ? selectedRating : undefined,
        role: selectedRole !== "all" ? selectedRole : undefined,
      });

      if (res.data) {
        setReviews(res.data.data || []);
        if (res.data.stats) {
          setStats(res.data.stats);
        }
        if (res.data.meta) {
          setTotalPages(res.data.meta.totalPages || 1);
        }
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, selectedRating, selectedRole]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-gray-900">
      {/* Page Header & Read-Only Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Review Management
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold flex items-center gap-1 border border-emerald-200">
              <ShieldCheck size={13} />
              Read-Only Mode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Inspect all ratings and written feedback left across ErrandHub
          </p>
        </div>
      </div>

      {/* Platform Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <MessageSquare size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Reviews</p>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">{stats.totalReviews}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Award size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Platform Score</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <h3 className="text-2xl font-black text-gray-900">{stats.averageRating ? stats.averageRating.toFixed(1) : "0.0"}</h3>
              <Star size={18} className="fill-amber-400 text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">5-Star Ratings</p>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">{stats.fiveStarCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <AlertTriangle size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">1-Star Ratings</p>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">{stats.oneStarCount}</h3>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by reviewer, reviewee or comment..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <Filter size={14} className="text-gray-400" />
            <select
              value={selectedRating}
              onChange={(e) => {
                setSelectedRating(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value={0}>All Ratings</option>
              <option value={5}>5 Stars ★★★★★</option>
              <option value={4}>4 Stars ★★★★☆</option>
              <option value={3}>3 Stars ★★★☆☆</option>
              <option value={2}>2 Stars ★★☆☆☆</option>
              <option value={1}>1 Star ★☆☆☆☆</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <User size={14} className="text-gray-400" />
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs font-bold text-gray-700 focus:outline-none cursor-pointer capitalize"
            >
              <option value="all">All Roles</option>
              <option value="client">Client Reviews</option>
              <option value="errand">Errander Reviews</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3">
            <Loader2 size={32} className="animate-spin text-orange-500" />
            <p className="text-xs font-bold">Loading platform reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center text-gray-400 gap-2">
            <MessageSquare size={36} className="text-gray-300" />
            <h4 className="text-sm font-bold text-gray-700">No Reviews Found</h4>
            <p className="text-xs max-w-sm">No reviews match your current search or filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4">Reviewer</th>
                  <th className="px-6 py-4">Reviewee</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Comment</th>
                  <th className="px-6 py-4">Linked Task</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs font-medium">
                {reviews.map((item) => {
                  const reviewerName = item.reviewer
                    ? `${item.reviewer.firstName} ${item.reviewer.lastName}`
                    : "User";
                  const revieweeName = item.reviewee
                    ? `${item.reviewee.firstName} ${item.reviewee.lastName}`
                    : "User";

                  return (
                    <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
                      {/* Reviewer */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                            {item.reviewer?.profileImage ? (
                              <img
                                src={getImageUrl(item.reviewer.profileImage)}
                                alt={reviewerName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-gray-400">
                                {reviewerName.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block truncate max-w-[140px]" title={reviewerName}>
                              {reviewerName}
                            </span>
                            <span className="text-[10px] font-extrabold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded capitalize">
                              {item.reviewerRole || item.reviewer?.role || "user"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Reviewee */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                            {item.reviewee?.profileImage ? (
                              <img
                                src={getImageUrl(item.reviewee.profileImage)}
                                alt={revieweeName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-gray-400">
                                {revieweeName.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block truncate max-w-[140px]" title={revieweeName}>
                              {revieweeName}
                            </span>
                            <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded capitalize">
                              {item.reviewee?.role || "user"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-4 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <StarRating rating={item.rating} size="sm" />
                          <span className="font-extrabold text-gray-900">{item.rating.toFixed(1)}</span>
                        </div>
                      </td>

                      {/* Comment */}
                      <td className="px-6 py-4 max-w-xs">
                        <p className="line-clamp-2 text-gray-600 leading-relaxed italic" title={item.comment}>
                          "{item.comment}"
                        </p>
                      </td>

                      {/* Linked Task */}
                      <td className="px-6 py-4">
                        {item.post ? (
                          <div>
                            <span className="font-bold text-gray-900 block truncate max-w-[150px]" title={item.post.title}>
                              {item.post.title}
                            </span>
                            <span className="text-[10px] font-black text-orange-600">
                              ${item.post.budget}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">Direct Review</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-500 text-[11px] whitespace-nowrap">
                        {item.createdAt ? format(new Date(item.createdAt), "MMM dd, yyyy") : "N/A"}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedReview(item)}
                          className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 font-extrabold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye size={14} />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Review Inspector Modal (Read-Only) */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 text-gray-900 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-orange-500" />
                <h3 className="font-extrabold text-base text-gray-900">Review Details (Read-Only)</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Reviewer & Reviewee Cards */}
            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Reviewer (Submitted By)</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    {selectedReview.reviewer?.profileImage ? (
                      <img
                        src={getImageUrl(selectedReview.reviewer.profileImage)}
                        alt="Reviewer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 text-xs">
                        {selectedReview.reviewer?.firstName?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">
                      {selectedReview.reviewer?.firstName} {selectedReview.reviewer?.lastName}
                    </h5>
                    <p className="text-[10px] text-gray-400 truncate max-w-[110px]">{selectedReview.reviewer?.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Reviewee (Recipient)</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    {selectedReview.reviewee?.profileImage ? (
                      <img
                        src={getImageUrl(selectedReview.reviewee.profileImage)}
                        alt="Reviewee"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 text-xs">
                        {selectedReview.reviewee?.firstName?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">
                      {selectedReview.reviewee?.firstName} {selectedReview.reviewee?.lastName}
                    </h5>
                    <p className="text-[10px] text-gray-400 truncate max-w-[110px]">{selectedReview.reviewee?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating & Date */}
            <div className="flex items-center justify-between bg-orange-50/50 p-3 rounded-xl border border-orange-100">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Rating</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <StarRating rating={selectedReview.rating} size="sm" />
                  <span className="font-black text-sm text-gray-900">{selectedReview.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Submitted On</p>
                <p className="text-xs font-bold text-gray-700 mt-0.5">
                  {selectedReview.createdAt ? format(new Date(selectedReview.createdAt), "PPP") : "N/A"}
                </p>
              </div>
            </div>

            {/* Comment Text */}
            <div>
              <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">Feedback Comment</p>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs leading-relaxed text-gray-700 italic">
                "{selectedReview.comment}"
              </div>
            </div>

            {/* Linked Task Details if available */}
            {selectedReview.post && (
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                <div>
                  <p className="text-[10px] font-bold text-blue-500 uppercase">Associated Errand Task</p>
                  <h5 className="font-bold text-gray-900 mt-0.5">{selectedReview.post.title}</h5>
                </div>
                <span className="font-black text-blue-600">${selectedReview.post.budget}</span>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
