"use client";

import { Suspense, useEffect } from "react";
import ChatContainer from "@/components/dashboard/message/realtime/ChatContainer";
import PageHeader from "@/components/dashboard/common/PageHeader";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const MessagesPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === "admin") {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (user?.role === "admin") {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className='w-full py-4 sm:py-5 px-3 sm:px-6 md:px-8 font-sans'>
      <PageHeader title='Inbox' />
      <Suspense fallback={
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }>
        <ChatContainer />
      </Suspense>
    </div>
  );
};

export default MessagesPage;
