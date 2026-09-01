"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { postService } from "@/services/post.service";
import { reviewsService } from "@/services/reviewsService";
import { useAuth } from "@/context/AuthContext";
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  Check,
  Star,
  User,
  Briefcase,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import PageHeader from "../../common/PageHeader";
import { useConfirm } from "@/context/ConfirmationContext";
import { getImageUrl } from "@/configs/api.config";
import JobDetailsModal from "../../common/JobDetailsModal";

export default function MyPostsPageErrand() {
  const { user } = useAuth();
  const confirm = useConfirm();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"all" | "assigned" | "created">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [reviewedPostIds, setReviewedPostIds] = useState<Set<string>>(new Set());

  const fetchPosts = useCallback(async () => {
    try {
      const response = await postService.getMyPosts();
      const loadedPosts = response.data || [];
      setPosts(loadedPosts);

      // Check review eligibility for completed posts
      if (user?.id && loadedPosts.length > 0) {
        const completedPosts = loadedPosts.filter(
          (p: any) => p.status === "completed" || p.status === "Completed"
        );
        const reviewedIds = new Set<string>();

        await Promise.all(
          completedPosts.map(async (post: any) => {
            const isClient = post.userId === user.id;
            const revieweeId = isClient ? post.assignedToId || post.assignedTo?.id : post.userId;
            if (revieweeId) {
              try {
                const res = await reviewsService.checkEligibility(revieweeId, post.id);
                if (res.data && res.data.eligible === false && res.data.reason?.includes("Already reviewed")) {
                  reviewedIds.add(post.id);
                }
              } catch (e) {
                // Ignore
              }
            }
          })
        );

        setReviewedPostIds(reviewedIds);
      }
    } catch (error: any) {
      console.error("Failed to fetch posts", error);
      if (error.message !== "SUBSCRIPTION_REQUIRED") {
        toast.error(error.message || "Failed to load your posts");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchPosts();

    const handleReviewSubmitted = () => {
      fetchPosts();
    };

    window.addEventListener("review-submitted", handleReviewSubmitted);
    return () => {
      window.removeEventListener("review-submitted", handleReviewSubmitted);
    };
  }, [fetchPosts]);

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete Post",
      message: "Are you sure you want to delete this post? This action cannot be undone.",
      type: "danger",
      confirmLabel: "Delete",
    });

    if (!isConfirmed) return;

    try {
      await postService.delete(id);
      toast.success("Post deleted successfully");
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete post");
    }
  };

  const handleMarkCompleted = async (post: any) => {
    const isConfirmed = await confirm({
      title: "Mark Errand as Completed",
      message: `Are you sure you want to mark "${post.title}" as completed? This will finish the errand and unlock client reviews.`,
      type: "info",
      confirmLabel: "Mark Completed",
    });

    if (!isConfirmed) return;

    try {
      await postService.markCompleted(post.id, user?.id);
      toast.success("Errand marked as Completed successfully!");
      fetchPosts();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to complete errand");
    }
  };

  const handleOpenReview = (post: any) => {
    const isClient = post.userId === user?.id;
    const targetRevieweeId = isClient ? post.assignedToId || post.assignedTo?.id : post.userId;
    const targetRevieweeName = isClient
      ? post.assignedTo
        ? typeof post.assignedTo === "object"
          ? `${post.assignedTo.firstName} ${post.assignedTo.lastName}`
          : post.assignedTo
        : "Errander"
      : post.user
      ? `${post.user.firstName || ""} ${post.user.lastName || ""}`.trim() || "Client"
      : "Client";
    const targetRevieweeImage = isClient
      ? post.assignedTo?.profileImage
      : post.user?.profileImage;

    if (!targetRevieweeId) {
      toast.error("Unable to identify the user for this errand.");
      return;
    }

    if (typeof window !== "undefined") {
      const event = new CustomEvent("open-review-modal", {
        detail: {
          postId: post.id,
          revieweeId: targetRevieweeId,
          revieweeName: targetRevieweeName,
          revieweeImage: targetRevieweeImage,
        },
      });
      window.dispatchEvent(event);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const isAssigned = post.assignedToId === user?.id || post.assignedTo?.id === user?.id;
      const isCreated = post.userId === user?.id;

      if (activeTab === "assigned" && !isAssigned) return false;
      if (activeTab === "created" && !isCreated) return false;

      if (statusFilter !== "all") {
        const pStatus = String(post.status).toLowerCase();
        if (statusFilter === "completed" && pStatus !== "completed") return false;
        if (statusFilter === "in-progress" && pStatus !== "in progress" && pStatus !== "assigned") return false;
        if (statusFilter === "active" && pStatus !== "active" && pStatus !== "pending pickup") return false;
      }

      return true;
    });
  }, [posts, activeTab, statusFilter, user?.id]);

  if (isLoading) {
    return (
      <div className='p-12 text-center'>
        <Loader2 className='w-10 h-10 animate-spin mx-auto text-primary' />
        <p className='mt-4 text-muted'>Loading your tasks & posts...</p>
      </div>
    );
  }

  const assignedCount = posts.filter(
    (p) => p.assignedToId === user?.id || p.assignedTo?.id === user?.id
  ).length;
  const createdCount = posts.filter((p) => p.userId === user?.id).length;

  return (
    <div className='p-4 sm:p-6 space-y-6 max-w-7xl mx-auto text-gray-900'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <PageHeader title='My Errands & Jobs' />
          <p className='text-xs sm:text-sm text-gray-500 font-medium mt-1'>
            Manage errands assigned to you and track your own posts
          </p>
        </div>
        <Link
          href='/post-errand'
          className='flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95 text-xs sm:text-sm shrink-0'
        >
          <Plus size={18} />
          <span>Post New Errand</span>
        </Link>
      </div>

      {/* Tabs & Filter Bar */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-gray-100 shadow-sm'>
        {/* Source Tabs */}
        <div className='flex items-center gap-1.5 p-1 bg-gray-100/80 rounded-xl'>
          <button
            type='button'
            onClick={() => setActiveTab("all")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            All ({posts.length})
          </button>
          <button
            type='button'
            onClick={() => setActiveTab("assigned")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "assigned"
                ? "bg-white text-blue-600 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Assigned to Me ({assignedCount})
          </button>
          <button
            type='button'
            onClick={() => setActiveTab("created")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "created"
                ? "bg-white text-orange-600 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Created by Me ({createdCount})
          </button>
        </div>

        {/* Status Filters */}
        <div className='flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0'>
          {[
            { label: "All Statuses", value: "all" },
            { label: "In Progress", value: "in-progress" },
            { label: "Completed", value: "completed" },
          ].map((tab) => (
            <button
              key={tab.value}
              type='button'
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === tab.value
                  ? "bg-orange-50 text-orange-700 border border-orange-200"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className='bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100'>
          <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Briefcase className='text-gray-300 w-10 h-10' />
          </div>
          <h3 className='text-xl font-bold text-gray-800'>No errands found</h3>
          <p className='text-gray-500 mt-2 max-w-xs mx-auto text-xs sm:text-sm'>
            {activeTab === "assigned"
              ? "You have no errands currently assigned. Browse available jobs to find opportunities!"
              : "No errands match the selected filter."}
          </p>
          <Link
            href='/dashboard/available-jobs'
            className='inline-block mt-5 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 shadow-md transition-all'
          >
            Browse Available Jobs &rarr;
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filteredPosts.map((post) => {
            const isAssignedToMe =
              post.assignedToId === user?.id || post.assignedTo?.id === user?.id;
            const isCreatedByMe = post.userId === user?.id;
            const isCompleted =
              String(post.status).toLowerCase() === "completed";
            const categoryColor = post.category?.color || "#FF7A2F";
            const hasReviewed = reviewedPostIds.has(post.id);

            const client = post.user || {};
            const clientName = client.firstName
              ? `${client.firstName} ${client.lastName || ""}`.trim()
              : "Client";

            return (
              <div
                key={post.id}
                className='bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow'
              >
                <div className='p-5 flex-1'>
                  {/* Top Badges */}
                  <div className='flex justify-between items-start mb-3.5 gap-2'>
                    <span
                      className='px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider truncate max-w-[140px]'
                      style={{
                        backgroundColor: `${categoryColor}15`,
                        color: categoryColor,
                      }}
                    >
                      {post.category?.name || "Errand"}
                    </span>

                    <div className='flex items-center gap-1.5 shrink-0'>
                      {isAssignedToMe && (
                        <span className='px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200'>
                          Assigned to You
                        </span>
                      )}
                      {isCompleted ? (
                        <span className='px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200'>
                          Completed
                        </span>
                      ) : (
                        <span className='px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200'>
                          {post.status || "In Progress"}
                        </span>
                      )}

                      {isCreatedByMe && !isCompleted && (
                        <div className='flex gap-1 ml-1'>
                          <Link
                            href={`/post-errand?id=${post.id}`}
                            className='p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors'
                            title='Edit Post'
                          >
                            <Edit size={14} />
                          </Link>
                          <button
                            type='button'
                            onClick={() => handleDelete(post.id)}
                            className='p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer'
                            title='Delete Post'
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className='text-base font-bold text-gray-900 line-clamp-1 mb-1'>
                    {post.title}
                  </h3>

                  {/* Poster Info (If assigned to me) */}
                  {isAssignedToMe && (
                    <div className='flex items-center gap-1.5 text-xs text-gray-500 mb-2'>
                      <span className='text-gray-400'>Client:</span>
                      <span className='font-bold text-gray-800'>{clientName}</span>
                      {client.rating > 0 && (
                        <span className='text-amber-600 font-extrabold text-[11px] ml-1'>
                          ★ {client.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Attached Photo */}
                  {(post.photoUrl || post.imageUrl) && (
                    <div
                      onClick={() => setSelectedPost(post)}
                      className='w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-50 border border-gray-100 cursor-pointer group relative'
                    >
                      <img
                        src={getImageUrl((post.photoUrl || post.imageUrl)!)}
                        alt={post.title}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100'>
                        <span className='bg-white/95 text-gray-900 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5'>
                          <Eye size={14} className='text-orange-500' />
                          View Full Post
                        </span>
                      </div>
                    </div>
                  )}

                  <p className='text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed'>
                    {post.description}
                  </p>

                  <div className='space-y-2 pt-2 border-t border-gray-100'>
                    <div className='flex items-center justify-between text-xs'>
                      <div className='flex items-center gap-1.5 text-gray-500'>
                        <MapPin size={13} className='text-gray-400 shrink-0' />
                        <span className='truncate max-w-[150px]'>
                          {post.city}, {post.state}
                        </span>
                      </div>
                      <div className='flex items-center gap-1 font-bold text-orange-600'>
                        <DollarSign size={14} className='shrink-0' />
                        <span>${post.budget || post.reward || 0}</span>
                      </div>
                    </div>

                    <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                      <Calendar size={13} className='text-gray-400 shrink-0' />
                      <span>
                        {post.dateNeeded
                          ? new Date(post.dateNeeded).toLocaleDateString()
                          : "Flexible Date"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className='p-4 bg-gray-50 border-t border-gray-100 space-y-2'>
                  <button
                    type='button'
                    onClick={() => setSelectedPost(post)}
                    className='w-full py-2 bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-xl border border-gray-200 text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer'
                  >
                    <Eye size={13} />
                    <span>View Details</span>
                  </button>

                  {/* Mark as Completed Action */}
                  {!isCompleted && isAssignedToMe && (
                    <button
                      type='button'
                      onClick={() => handleMarkCompleted(post)}
                      className='w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer'
                    >
                      <Check size={14} />
                      <span>Mark Errand Completed</span>
                    </button>
                  )}

                  {/* Review Actions */}
                  {isCompleted && (
                    hasReviewed ? (
                      <div className='w-full py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-1.5'>
                        <Check size={14} className='text-emerald-600' />
                        <span>Review Submitted</span>
                      </div>
                    ) : (
                      <button
                        type='button'
                        onClick={() => handleOpenReview(post)}
                        className='w-full py-2 bg-[#ff6900] hover:bg-[#e05d00] text-white font-extrabold rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer'
                      >
                        <Star size={14} className='fill-white' />
                        <span>Leave a Review</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {selectedPost && (
        <JobDetailsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          isOwner={selectedPost.userId === user?.id}
        />
      )}
    </div>
  );
}
