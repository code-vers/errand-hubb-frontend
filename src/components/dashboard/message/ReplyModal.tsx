"use client";

import { FC, useState, useEffect, useRef } from "react";
import { X, Clock, Paperclip, Image, Link } from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar";
import type { ReplyMessage } from "@/types/messages";

interface ReplyModalProps {
  recipient: ReplyMessage;
  onClose: () => void;
  onSend: (message: string) => Promise<void>;
}

const ReplyModal: FC<ReplyModalProps> = ({
  recipient,
  onClose,
  onSend,
}) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Auto-focus textarea
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    try {
      await onSend(message.trim());
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Send on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role='dialog'
      aria-modal='true'
      aria-labelledby='reply-modal-title'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col'>
        {/* Modal Header */}
        <div className='bg-[#f5ebd8] px-6 py-5 flex items-center justify-between'>
          <h2
            id='reply-modal-title'
            className='text-[#1A1A1A] font-bold text-lg'>
            Reply to Client
          </h2>
          <button
            aria-label='Close modal'
            onClick={onClose}
            className='bg-white/50 hover:bg-white text-orange-500 rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary'>
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-6 flex flex-col gap-6'>
          {/* Recipient Info */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <UserAvatar
                src={recipient.recipient.avatar}
                alt={`${recipient.recipient.name} avatar`}
                initials={recipient.recipient.initials}
                size='md'
              />
              <div>
                <h3 className='font-bold text-foreground text-sm'>
                  {recipient.recipient.name}
                </h3>
                <div className='flex items-center gap-1.5 text-primary text-xs mt-0.5'>
                  <Clock className='h-3.5 w-3.5' />
                  <span>{recipient.timestamp}</span>
                </div>
              </div>
            </div>
            <div className='text-sm font-semibold text-foreground'>
              {recipient.category}
            </div>
          </div>

          {/* Message Input */}
          <div className='border border-[#f5ebd8] rounded-xl flex flex-col relative focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-shadow'>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Type your message here...'
              className='w-full min-h-[140px] p-4 bg-transparent border-none resize-none text-sm text-foreground placeholder-text-placeholder focus:ring-0 rounded-t-xl'
              maxLength={5000}
            />

            {/* Formatting/Attachment Toolbar */}
            <div className='flex items-center gap-3 px-4 pb-4 pt-2 border-t border-transparent'>
              <button
                aria-label='Attach file'
                className='text-muted hover:text-foreground transition-colors focus:outline-none'>
                <Paperclip className='h-5 w-5' />
              </button>
              <button
                aria-label='Insert image'
                className='text-muted hover:text-foreground transition-colors focus:outline-none'>
                <Image className='h-5 w-5' />
              </button>
              <button
                aria-label='Insert link'
                className='text-muted hover:text-foreground transition-colors focus:outline-none'>
                <Link className='h-5 w-5' />
              </button>
            </div>
          </div>

          {/* Character Counter */}
          {message.length > 0 && (
            <p className='text-xs text-muted -mt-4'>
              {message.length}/5000 characters
            </p>
          )}

          {/* Action Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-lg transition-colors shadow-sm tracking-wider text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed'>
            {isSending ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
