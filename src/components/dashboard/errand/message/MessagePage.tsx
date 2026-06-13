"use client";

import React from "react";
import MessagesDashboard from "@/components/dashboard/message/MessagesDashboard";
import PageHeader from "../../common/PageHeader";
import { useRouter } from "next/navigation";

const ErrandMessagePage = () => {
  const router = useRouter();

  const handleReply = (clientId: string) => {
    // If we have a clientId, redirect to messages with that person
    if (clientId) {
      router.push(`/dashboard/messages?errandId=${clientId}`);
    } else {
      // Fallback
      router.push(`/dashboard/messages`);
    }
  };

  return (
    <div className='w-full p-4'>
      <PageHeader title='inbox' />
      <MessagesDashboard 
        onReplyToMessage={async (messageId) => {
          // You might need to find the user id associated with this messageId
          // For now, let's just redirect to the general messages page
          // or try to extract it if possible
          router.push(`/dashboard/messages`);
        }}
      />
    </div>
  );
};

export default ErrandMessagePage;
