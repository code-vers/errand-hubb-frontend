"use client";

import { useAuth } from "@/context/AuthContext";
import MyPostsPageErrand from "@/components/dashboard/errand/myPosts/MyPostsPage";
import MyPostPageClient from "@/components/dashboard/client/MyPost/MyPostPage";
import { Loader2 } from "lucide-react";

export default function MyPostsPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='p-12 text-center'>
        <Loader2 className='w-10 h-10 animate-spin mx-auto text-primary' />
        <p className='mt-4 text-muted'>Loading...</p>
      </div>
    );
  }

  if (user?.role === "client") {
    return <MyPostPageClient />;
  }

  return <MyPostsPageErrand />;
}
