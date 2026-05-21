
"use client";

import { FC, useEffect } from "react";
import { X, Clock, MapPin, FileText } from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar";
import { Badge } from "@/components/ui/Badge";
import type { TaskDetails } from "@/types/messages";

interface ViewDetailsModalProps {
  task: TaskDetails;
  onClose: () => void;
  onReply: () => void;
}

const ViewDetailsModal: FC<ViewDetailsModalProps> = ({
  task,
  onClose,
  onReply,
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const getBadgeVariant = (status: TaskDetails["status"]) => {
    const variantMap = {
      ASAP: "asap" as const,
      Pending: "pending" as const,
      Scheduled: "scheduled" as const,
      Completed: "completed" as const,
    };
    return variantMap[status];
  };

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-0'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all'>
        {/* Modal Header */}
        <div className='bg-[#f5ebd8] px-6 py-4 flex justify-between items-center border-b border-[#f5ebd8]'>
          <h2
            id='modal-title'
            className='text-lg font-bold text-foreground'>
            View Details
          </h2>
          <button
            aria-label='Close modal'
            onClick={onClose}
            className='bg-white rounded-full p-1.5 text-primary hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary'>
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-6 space-y-6'>
          {/* User Profile & Category */}
          <div className='flex items-start justify-between'>
            <div className='flex items-center space-x-3'>
              <UserAvatar
                src={task.client.avatar}
                alt={task.client.name}
                size='md'
              />
              <div>
                <h3 className='text-sm font-bold text-foreground'>
                  {task.client.name}
                </h3>
                <div className='flex items-center text-xs text-text-secondary mt-1'>
                  <Clock className='w-3.5 h-3.5 mr-1 text-orange-400' />
                  <span>{task.timestamp}</span>
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-2 text-right'>
              <span className='text-sm font-semibold text-foreground'>
                {task.category}
              </span>
              <Badge variant={getBadgeVariant(task.status)}>
                {task.status}
              </Badge>
            </div>
          </div>

          {/* Job Description Box */}
          <div className='border border-[#f5ebd8] rounded-lg p-4 bg-white shadow-sm'>
            <h4 className='text-sm font-bold text-foreground mb-2'>
              {task.title}
            </h4>
            <p className='text-sm text-text-secondary leading-relaxed'>
              {task.description}
            </p>
          </div>

          {/* Location & Budget Cards */}
          <div className='grid grid-cols-2 gap-4'>
            {/* Location Card */}
            <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-3 border border-gray-100 shadow-sm'>
              <div className='bg-orange-50 p-2 rounded-full flex-shrink-0'>
                <MapPin className='w-5 h-5 text-primary' />
              </div>
              <div>
                <p className='text-xs text-muted font-medium mb-0.5'>
                  Location
                </p>
                <p className='text-sm font-bold text-foreground leading-tight'>
                  {task.location}
                </p>
              </div>
            </div>

            {/* Budget Card */}
            <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-3 border border-gray-100 shadow-sm'>
              <div className='bg-orange-50 p-2 rounded-full flex-shrink-0'>
                <FileText className='w-5 h-5 text-primary' />
              </div>
              <div>
                <p className='text-xs text-muted font-medium mb-0.5'>
                  Budget
                </p>
                <p className='text-sm font-bold text-foreground leading-tight'>
                  {formatBudget(task.budget)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className='px-6 pb-6 pt-2'>
          <button
            onClick={onReply}
            className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary tracking-wide uppercase text-sm'>
            Reply to Client
          </button>
        </div>
      </div>
    </div>
  );
};
export default ViewDetailsModal;
