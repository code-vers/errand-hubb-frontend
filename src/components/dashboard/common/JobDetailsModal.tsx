"use client";

import React, { useState } from "react";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  User,
  CheckCircle2,
  MessageSquare,
  Loader2,
  Edit2,
  Tag,
  ImageIcon,
  Maximize2,
} from "lucide-react";
import { getImageUrl } from "@/configs/api.config";

interface JobDetailsModalProps {
  post: any;
  onClose: () => void;
  onConnect?: (clientUserId: string, postId: string) => void;
  isConnecting?: boolean;
  onEdit?: (post: any) => void;
  isOwner?: boolean;
}

export default function JobDetailsModal({
  post,
  onClose,
  onConnect,
  isConnecting = false,
  onEdit,
  isOwner = false,
}: JobDetailsModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!post) return null;

  // Resolve image URL from various possible post fields
  const imageSrc =
    post.photoUrl ||
    post.imageUrl ||
    post.image ||
    (Array.isArray(post.images) && post.images.length > 0 ? post.images[0] : null) ||
    (Array.isArray(post.attachments) && post.attachments.length > 0 ? post.attachments[0] : null);

  const fullImageUrl = imageSrc ? getImageUrl(imageSrc) : null;

  const category = post.category;
  const categoryName = category?.name || post.type || "General Errand";
  const categoryColor = category?.color || "#FF7A2F";

  const client = post.user || {};
  const clientName = client.firstName
    ? `${client.firstName} ${client.lastName || ""}`.trim()
    : "Client / Post Owner";
  const clientAvatar = client.profileImage ? getImageUrl(client.profileImage) : null;

  const formattedDate = post.dateNeeded
    ? new Date(post.dateNeeded).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : post.date
    ? post.date
    : "Flexible Date";

  const rewardAmount =
    post.budget !== undefined && post.budget !== null
      ? `$${post.budget}`
      : post.reward !== undefined && post.reward !== null
      ? `$${post.reward}`
      : "Flexible";

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200'>
      <div className='bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200 border border-gray-100'>
        {/* Header */}
        <div className='flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/70 shrink-0'>
          <div className='flex items-center gap-2.5 min-w-0 pr-4'>
            <span
              className='px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shrink-0'
              style={{
                backgroundColor: `${categoryColor}15`,
                color: categoryColor,
              }}>
              {categoryName}
            </span>
            <span className='px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-green-50 text-green-600 uppercase shrink-0'>
              {post.status || "Active"}
            </span>
          </div>

          <button
            onClick={onClose}
            className='p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors cursor-pointer shrink-0'
            aria-label='Close modal'>
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className='overflow-y-auto p-5 sm:p-6 space-y-6 flex-1'>
          {/* Post Title */}
          <div>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-900 leading-snug break-words'>
              {post.title}
            </h2>
            <div className='flex items-center gap-2 mt-2 text-xs text-gray-500 flex-wrap'>
              <div className='flex items-center gap-1.5'>
                <div className='w-6 h-6 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0'>
                  {clientAvatar ? (
                    <img src={clientAvatar} alt={clientName} className='w-full h-full object-cover' />
                  ) : (
                    <User size={13} className='text-primary' />
                  )}
                </div>
                <span className='font-semibold text-gray-700'>{clientName}</span>
              </div>
              <span>•</span>
              <span className='text-gray-400'>
                Posted {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "recently"}
              </span>
            </div>
          </div>

          {/* Attached Image Section */}
          {fullImageUrl ? (
            <div className='space-y-2'>
              <h3 className='text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5'>
                <ImageIcon size={14} className='text-orange-500' />
                Attached Job Photo
              </h3>
              <div
                onClick={() => setSelectedImage(fullImageUrl)}
                className='relative w-full h-56 sm:h-72 rounded-xl overflow-hidden bg-gray-900 border border-gray-200 group cursor-pointer shadow-xs'>
                <img
                  src={fullImageUrl}
                  alt={post.title}
                  className='w-full h-full object-contain bg-slate-900 group-hover:scale-102 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs'>
                  <Maximize2 size={18} />
                  <span>Click to expand image</span>
                </div>
              </div>
            </div>
          ) : null}

          {/* Full Description Section */}
          <div className='space-y-2'>
            <h3 className='text-xs font-bold uppercase tracking-wider text-gray-500'>
              Job Description
            </h3>
            <div className='bg-slate-50/80 p-4 sm:p-5 rounded-xl border border-slate-200/80 max-h-[300px] overflow-y-auto'>
              <p className='text-sm text-slate-800 leading-relaxed whitespace-pre-line break-words font-normal'>
                {post.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Key Job Attributes Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2'>
            {/* Reward */}
            <div className='p-3.5 bg-orange-50/60 rounded-xl border border-orange-100 flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold shrink-0 shadow-xs'>
                <DollarSign size={20} />
              </div>
              <div>
                <span className='text-[10px] font-extrabold uppercase tracking-wider text-orange-600 block'>
                  Budget / Reward
                </span>
                <span className='text-lg font-bold text-gray-900'>{rewardAmount}</span>
              </div>
            </div>

            {/* Location */}
            <div className='p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs'>
                <MapPin size={20} />
              </div>
              <div className='min-w-0 flex-1'>
                <span className='text-[10px] font-extrabold uppercase tracking-wider text-blue-600 block'>
                  Location
                </span>
                <span className='text-xs font-bold text-gray-900 truncate block'>
                  {post.location || `${post.city || "Remote"}${post.state ? `, ${post.state}` : ""}`}
                </span>
              </div>
            </div>

            {/* Date Needed */}
            <div className='p-3.5 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-xs'>
                <Calendar size={20} />
              </div>
              <div>
                <span className='text-[10px] font-extrabold uppercase tracking-wider text-purple-600 block'>
                  Date Needed
                </span>
                <span className='text-xs font-bold text-gray-900'>{formattedDate}</span>
              </div>
            </div>

            {/* Time / Urgency */}
            <div className='p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs'>
                <Clock size={20} />
              </div>
              <div>
                <span className='text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 block'>
                  Time / Urgency
                </span>
                <span className='text-xs font-bold text-gray-900'>
                  {post.time || "Flexible Schedule"}
                </span>
              </div>
            </div>
          </div>

          {/* Service Type & Assigned Runner info */}
          <div className='flex items-center justify-between gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs flex-wrap'>
            <div className='flex items-center gap-2'>
              <Tag size={15} className='text-gray-400' />
              <span className='text-gray-600 font-medium'>Service Type:</span>
              <span className='font-bold text-gray-900 bg-white px-2.5 py-0.5 rounded border border-gray-200'>
                {post.serviceType || "Delivery"}
              </span>
            </div>

            {post.assignedTo && (
              <div className='flex items-center gap-1.5 text-green-600 font-bold'>
                <CheckCircle2 size={16} />
                <span>Assigned to {typeof post.assignedTo === "object" ? `${post.assignedTo.firstName} ${post.assignedTo.lastName}` : post.assignedTo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className='p-4 sm:p-5 border-t border-gray-100 bg-gray-50/70 flex items-center justify-end gap-3 shrink-0'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-gray-600 hover:bg-gray-200/70 transition-colors cursor-pointer'>
            Close
          </button>

          {isOwner && onEdit && (
            <button
              type='button'
              onClick={() => {
                onClose();
                onEdit(post);
              }}
              className='px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm cursor-pointer'>
              <Edit2 size={16} />
              Edit Post
            </button>
          )}

          {onConnect && !isOwner && (
            <button
              type='button'
              disabled={isConnecting}
              onClick={() => onConnect(post.user?.id || post.userId, post.id)}
              className='px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-all flex items-center gap-2 shadow-md shadow-orange-500/20 active:scale-95 disabled:opacity-60 cursor-pointer'>
              {isConnecting ? (
                <>
                  <Loader2 size={16} className='animate-spin' />
                  Connecting...
                </>
              ) : (
                <>
                  <MessageSquare size={16} />
                  Connect / Message Client
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Expanded Photo Lightbox Modal */}
      {selectedImage && (
        <div
          className='fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-150'
          onClick={() => setSelectedImage(null)}>
          <div className='relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center'>
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute -top-12 right-0 text-white bg-white/20 hover:bg-white/30 p-2 rounded-full cursor-pointer transition-colors'>
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt='Expanded view'
              className='max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl'
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
