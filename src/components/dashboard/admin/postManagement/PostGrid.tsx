import React from "react";
import { Post } from "@/types/post";
import PostCard from "./PostCard";
import { FileText } from "lucide-react";

interface PostGridProps {
  posts: Post[];
  onPostAction: (
    postId: string,
    action: "edit" | "mark_inactive" | "remove" | "mark_active",
  ) => void;
  isLoading?: boolean;
  emptyStateMessage?: string;
}

const PostGrid: React.FC<PostGridProps> = ({
  posts,
  onPostAction,
  isLoading = false,
  emptyStateMessage = "No posts found",
}) => {
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className='bg-white rounded-2xl p-6 shadow-sm border border-border animate-pulse'>
            <div className='flex justify-between mb-4'>
              <div className='h-6 bg-gray-200 rounded w-3/4'></div>
              <div className='h-5 bg-gray-200 rounded w-16'></div>
            </div>
            <div className='space-y-3 mb-6'>
              <div className='flex justify-between'>
                <div className='h-4 bg-gray-200 rounded w-1/3'></div>
                <div className='h-4 bg-gray-200 rounded w-1/4'></div>
              </div>
              <div className='flex justify-between items-end'>
                <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                <div className='h-6 bg-gray-200 rounded w-1/5'></div>
              </div>
            </div>
            <div className='border-t border-border pt-4'>
              <div className='h-8 bg-gray-200 rounded w-full'></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className='text-center py-16'>
        <FileText className='mx-auto h-16 w-16 text-muted' strokeWidth={1.5} />
        <h3 className='mt-4 text-lg font-semibold text-foreground'>
          No Posts Found
        </h3>
        <p className='mt-2 text-muted'>{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onAction={onPostAction} />
      ))}
    </div>
  );
};

export default PostGrid;
