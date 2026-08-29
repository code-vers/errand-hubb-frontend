"use client";

import React, { useState, useEffect } from 'react';
import LeaveReviewModal from './LeaveReviewModal';
import ReviewsListModal from './ReviewsListModal';

export default function GlobalReviewModalManager() {
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [leaveModalData, setLeaveModalData] = useState<{
    revieweeId: string;
    revieweeName: string;
    revieweeImage?: string;
    postId?: string;
    serviceRequestId?: string;
  } | null>(null);

  const [isListOpen, setIsListOpen] = useState(false);
  const [listModalData, setListModalData] = useState<{
    userId: string;
    userName: string;
  } | null>(null);

  useEffect(() => {
    const handleOpenLeaveModal = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setLeaveModalData(customEvent.detail);
        setIsLeaveOpen(true);
      }
    };

    const handleOpenListModal = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setListModalData(customEvent.detail);
        setIsListOpen(true);
      }
    };

    window.addEventListener('open-review-modal', handleOpenLeaveModal);
    window.addEventListener('open-reviews-list-modal', handleOpenListModal);

    return () => {
      window.removeEventListener('open-review-modal', handleOpenLeaveModal);
      window.removeEventListener('open-reviews-list-modal', handleOpenListModal);
    };
  }, []);

  return (
    <>
      {isLeaveOpen && leaveModalData && (
        <LeaveReviewModal
          isOpen={isLeaveOpen}
          onClose={() => setIsLeaveOpen(false)}
          revieweeId={leaveModalData.revieweeId}
          revieweeName={leaveModalData.revieweeName}
          revieweeImage={leaveModalData.revieweeImage}
          postId={leaveModalData.postId}
          serviceRequestId={leaveModalData.serviceRequestId}
          onReviewSubmitted={() => setIsLeaveOpen(false)}
        />
      )}

      {isListOpen && listModalData && (
        <ReviewsListModal
          isOpen={isListOpen}
          onClose={() => setIsListOpen(false)}
          userId={listModalData.userId}
          userName={listModalData.userName}
        />
      )}
    </>
  );
}
