"use client";

import React from "react";
import { User } from "@/types/users";
import {
  X,
  Star,
  Mail,
  Calendar,
  Briefcase,
  Shield,
  User as UserIcon,
  Eye,
  EyeOff,
  DollarSign,
  CheckCircle,
  Wrench,
} from "lucide-react";

interface UserDetailsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onAction?: (userId: string, action: ModalAction) => void;
}

type ModalAction =
  | "approve"
  | "pause"
  | "mark_unpaid"
  | "remove_profile"
  | "edit";

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
  onAction,
}) => {
  if (!isOpen || !user) return null;

  const isErrandr = user.role === "errand" || user.role === "errandr";

  const handleAction = (action: ModalAction) => {
    if (onAction) {
      onAction(user.id, action);
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className='flex items-center space-x-1'>
        <Star className='w-5 h-5 text-yellow-400 fill-current' />
        <span className='font-bold text-foreground text-base'>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <>
      {/* Modal Backdrop */}
      <div
        aria-hidden='true'
        className='fixed inset-0 backdrop-blur-xs transition-opacity z-40 bg-black/30'
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          {/* Modal Panel */}
          <div className='relative transform overflow-hidden rounded-[32px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl'>
            {/* Modal Header with Gradient */}
            <div
              className='px-8 py-8 flex justify-between items-center'
              style={{
                background: "linear-gradient(135deg, #FFDEB3 0%, #FFEBCD 100%)",
              }}>
              <h2 className='text-[22px] font-bold text-foreground tracking-tight'>
                {isErrandr ? "Errandr Profile" : "Client Profile"}
              </h2>

              {/* Glass Effect Close Button */}
              <button
                aria-label='Close'
                onClick={onClose}
                className='rounded-full p-2 hover:bg-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30'
                style={{
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                }}>
                <X className='h-5 w-5 text-primary' aria-hidden='true' />
              </button>
            </div>

            {/* Modal Body */}
            <div className='bg-white px-8 pb-8 pt-6'>
              {/* Profile Overview */}
              <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center space-x-4'>
                  {/* Avatar */}
                  {user.avatarUrl ? (
                    <img
                      alt={user.name}
                      className='h-[68px] w-[68px] rounded-2xl object-cover shadow-sm'
                      src={user.avatarUrl}
                    />
                  ) : (
                    <div
                      className='h-[68px] w-[68px] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-sm'
                      style={{ backgroundColor: user.avatarColor }}>
                      {user.initials}
                    </div>
                  )}

                  <div>
                    <h3 className='text-[20px] font-bold text-foreground leading-tight'>
                      {user.name}
                    </h3>
                    <p className='text-[15px] text-muted mt-1 flex items-center gap-1.5'>
                      <Mail size={14} />
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-6'>
                  {/* Rating (Errandr only) */}
                  {isErrandr && user.rating && renderStars(user.rating)}

                  {/* Client Status Badge */}
                  {!isErrandr && (
                    <span
                      className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${
                        user.status === "active"
                          ? "bg-green-100 text-success"
                          : "bg-gray-100 text-muted"
                      }`}>
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  )}

                  {/* Header Approve Button */}
                  {user.status === "pending" && (
                    <button
                      type='button'
                      onClick={() => handleAction("approve")}
                      className='inline-flex justify-center rounded-xl bg-green-100 px-5 py-2.5 text-[15px] font-semibold text-success hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors'>
                      Approve
                    </button>
                  )}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {isErrandr ? (
                  <>
                    {/* Errandr-specific metrics */}
                    <div className='rounded-2xl border border-orange-100 bg-white p-5 shadow-sm'>
                      <div className='text-[14px] font-medium text-muted mb-1 flex items-center gap-1.5'>
                        <Wrench size={14} className='text-primary' />
                        Services
                      </div>
                      <div className='text-[16px] font-bold text-foreground tracking-tight'>
                        {user.services?.join(", ") || "N/A"}
                      </div>
                    </div>

                    <div className='rounded-2xl border border-orange-100 bg-white p-5 shadow-sm'>
                      <div className='text-[14px] font-medium text-muted mb-1 flex items-center gap-1.5'>
                        <DollarSign size={14} className='text-primary' />
                        Total Earnings
                      </div>
                      <div className='text-[16px] font-bold text-foreground tracking-tight'>
                        {user.totalEarnings
                          ? formatCurrency(user.totalEarnings)
                          : "$0"}
                      </div>
                    </div>

                    <div className='rounded-2xl border border-orange-100 bg-white p-5 shadow-sm'>
                      <div className='text-[14px] font-medium text-muted mb-1 flex items-center gap-1.5'>
                        <CheckCircle size={14} className='text-primary' />
                        Jobs Completed
                      </div>
                      <div className='text-[16px] font-bold text-foreground tracking-tight'>
                        {user.jobsCompleted || 0}
                      </div>
                    </div>

                    <div className='rounded-2xl border border-orange-100 bg-white p-5 shadow-sm'>
                      <div className='text-[14px] font-medium text-muted mb-1 flex items-center gap-1.5'>
                        {user.visibility === "public" ? (
                          <Eye size={14} className='text-primary' />
                        ) : (
                          <EyeOff size={14} className='text-primary' />
                        )}
                        Visibility
                      </div>
                      <div className='text-[16px] font-bold text-foreground tracking-tight'>
                        {user.visibility === "public" ? "Public" : "Private"}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Client-specific metrics */}
                    <div className='rounded-2xl border border-orange-100 bg-white p-5 shadow-sm'>
                      <div className='text-[14px] font-medium text-muted mb-1 flex items-center gap-1.5'>
                        <Briefcase size={14} className='text-primary' />
                        Posts
                      </div>
                      <div className='text-[16px] font-bold text-foreground tracking-tight'>
                        {user.postsCount} Tasks
                      </div>
                    </div>

                    <div className='rounded-2xl border border-orange-100 bg-white p-5 shadow-sm'>
                      <div className='text-[14px] font-medium text-muted mb-1 flex items-center gap-1.5'>
                        <Shield size={14} className='text-primary' />
                        Status
                      </div>
                      <div
                        className={`text-[16px] font-bold tracking-tight ${
                          user.status === "active"
                            ? "text-success"
                            : "text-muted"
                        }`}>
                        {user.status.toUpperCase()}
                      </div>
                    </div>

                    <div className='rounded-2xl border border-orange-100 bg-white p-5 shadow-sm'>
                      <div className='text-[14px] font-medium text-muted mb-1 flex items-center gap-1.5'>
                        <Calendar size={14} className='text-primary' />
                        Joined
                      </div>
                      <div className='text-[16px] font-bold text-foreground tracking-tight'>
                        {user.joinedDate}
                      </div>
                    </div>

                    <div className='rounded-2xl border border-orange-100 bg-white p-5 shadow-sm'>
                      <div className='text-[14px] font-medium text-muted mb-1 flex items-center gap-1.5'>
                        <UserIcon size={14} className='text-primary' />
                        User Type
                      </div>
                      <div className='text-[16px] font-bold text-foreground tracking-tight'>
                        {user.role === "errand" ? "Errandr" : "Client"}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className='bg-white px-8 py-6 border-t border-border flex items-center space-x-3 rounded-b-[32px]'>
              {isErrandr ? (
                <>
                  {/* Errandr Actions */}
                  <button
                    type='button'
                    onClick={() => handleAction("approve")}
                    className='inline-flex justify-center rounded-xl bg-green-100 px-5 py-2.5 text-[14px] font-bold text-success hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                    Approve
                  </button>

                  <button
                    type='button'
                    onClick={() => handleAction("pause")}
                    className='inline-flex justify-center rounded-xl bg-yellow-50 px-5 py-2.5 text-[14px] font-bold text-yellow-700 hover:bg-yellow-100 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
                    style={{ backgroundColor: "#FFF6D9", color: "#8C6D1F" }}>
                    Pause
                  </button>

                  <button
                    type='button'
                    onClick={() => handleAction("mark_unpaid")}
                    className='inline-flex justify-center rounded-xl bg-red-100 px-5 py-2.5 text-[14px] font-bold text-red-600 hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                    Mark Unpaid
                  </button>

                  <button
                    type='button'
                    onClick={() => handleAction("remove_profile")}
                    className='inline-flex justify-center rounded-xl bg-red-50 px-5 py-2.5 text-[14px] font-bold text-red-500 hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                    Remove Profile
                  </button>
                </>
              ) : (
                <>
                  {/* Client Actions */}
                  <button
                    type='button'
                    onClick={() => handleAction("edit")}
                    className='inline-flex justify-center rounded-xl bg-primary/10 px-5 py-2.5 text-[14px] font-bold text-primary hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
                    Edit Client
                  </button>

                  {user.status === "active" ? (
                    <button
                      type='button'
                      onClick={() => handleAction("pause")}
                      className='inline-flex justify-center rounded-xl bg-yellow-50 px-5 py-2.5 text-[14px] font-bold text-yellow-700 hover:bg-yellow-100 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
                      style={{ backgroundColor: "#FFF6D9", color: "#8C6D1F" }}>
                      Deactivate
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={() => handleAction("approve")}
                      className='inline-flex justify-center rounded-xl bg-green-100 px-5 py-2.5 text-[14px] font-bold text-success hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                      Activate
                    </button>
                  )}

                  <button
                    type='button'
                    onClick={() => handleAction("remove_profile")}
                    className='inline-flex justify-center rounded-xl bg-red-50 px-5 py-2.5 text-[14px] font-bold text-red-500 hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                    Remove Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsModal;
