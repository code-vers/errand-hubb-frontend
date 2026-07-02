
"use client";

import { FC, useEffect } from "react";
import { X, Clock, MapPin, User, MessageCircle } from "lucide-react";
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

  const getBadgeVariant = (status: string) => {
    if (status === "Pending") return "pending";
    return "completed";
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
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all border border-gray-100'>
        {/* Modal Header */}
        <div className='bg-[#f5ebd8] px-6 py-5 flex justify-between items-center border-b border-[#e8dcc4]'>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h2 id='modal-title' className='text-lg font-bold text-gray-900'>
              Connection Details
            </h2>
          </div>
          <button
            aria-label='Close modal'
            onClick={onClose}
            className='bg-white rounded-full p-1.5 text-primary hover:bg-orange-50 transition-colors shadow-sm'>
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-8 space-y-8'>
          {/* User Profile */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <div className="ring-2 ring-primary/10 rounded-full p-1">
                <UserAvatar
                  src={task.client.avatar}
                  alt={task.client.name}
                  size='lg'
                />
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900'>
                  {task.client.name}
                </h3>
                <div className='flex items-center text-xs text-gray-500 mt-1.5'>
                  <Clock className='w-3.5 h-3.5 mr-1.5 text-orange-400' />
                  <span>Last active: {task.timestamp}</span>
                </div>
              </div>
            </div>
            <Badge variant={getBadgeVariant(task.status)}>
              {task.status === "Pending" ? "New Messages" : "Connected"}
            </Badge>
          </div>

          {/* Last Message Section */}
          <div className='bg-gray-50 rounded-2xl p-5 border border-gray-100 relative'>
             <div className="absolute -top-3 left-4 bg-white px-3 py-0.5 rounded-full border border-gray-100 text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                Latest Message
             </div>
            <p className='text-[15px] text-gray-700 leading-relaxed italic mt-1'>
              "{task.description}"
            </p>
          </div>

          {/* Metadata Grid */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-orange-50/50 rounded-xl p-4 flex items-center space-x-3 border border-orange-100/50'>
              <div className='bg-white p-2.5 rounded-lg shadow-sm shrink-0'>
                <MapPin className='w-5 h-5 text-primary' />
              </div>
              <div>
                <p className='text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5'>
                  Type
                </p>
                <p className='text-sm font-bold text-gray-900'>
                  {task.category}
                </p>
              </div>
            </div>

            <div className='bg-orange-50/50 rounded-xl p-4 flex items-center space-x-3 border border-orange-100/50'>
              <div className='bg-white p-2.5 rounded-lg shadow-sm shrink-0'>
                <MessageCircle className='w-5 h-5 text-primary' />
              </div>
              <div>
                <p className='text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5'>
                  Status
                </p>
                <p className='text-sm font-bold text-gray-900'>
                  Active Chat
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className='px-8 pb-8'>
          <button
            onClick={onReply}
            className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-sm tracking-widest'>
            <MessageCircle className="w-5 h-5" />
            Continue Conversation
          </button>
        </div>
      </div>
    </div>
  );
};
export default ViewDetailsModal;
