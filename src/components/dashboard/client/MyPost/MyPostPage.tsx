"use client";

import React, { useState } from "react";
import PageHeader from "../../common/PageHeader";
import SearchBar from "./SearchBar";
import StatusFilterTabs from "./StatusFilterTabs";
import PostGrid from "./PostGrid";
import Pagination from "@/components/common/Pagination";
import StatsInfo from "./StatsInfo";
import { usePosts } from "./usePosts";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const MyPostPage = () => {
  const {
    posts,
    total,
    totalPages,
    currentPage,
    filters,
    statusCounts,
    loading,
    error,
    setSearch,
    setStatus,
    setPage,
    addPost,
    updatePost,
    deletePost,
    isCreating,
    isUpdating,
  } = usePosts();

  const router = useRouter();

  const handleCreateOpen = () => {
    router.push("/post-errand");
  };

  const handleEditOpen = (post: any) => {
    router.push(`/post-errand?id=${post.id}`);
  };

  return (
    <div className='min-h-screen py-4 sm:py-5 px-3 sm:px-6 md:px-12 font-sans'>
      <div className='mx-auto flex flex-col gap-3.5 max-w-7xl'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4'>
          <PageHeader title='My Posts' />
          <button
            onClick={handleCreateOpen}
            className='w-full sm:w-auto flex items-center justify-center gap-2 bg-status-orange hover:bg-[#D95F1B] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-95 cursor-pointer shrink-0'>
            <Plus size={18} />
            Create a Post
          </button>
        </div>

        <div className='mx-auto w-full mt-2 sm:mt-4'>
          {/* Search Section */}
          <div className='mb-4 sm:mb-6'>
            <SearchBar onSearch={setSearch} />
          </div>

          {/* Status Filter Tabs */}
          <div className='mb-6 sm:mb-8 overflow-x-auto pb-1 scrollbar-hide w-full max-w-full'>
            <StatusFilterTabs
              selectedStatus={filters.status}
              statusCounts={statusCounts}
              onStatusChange={setStatus}
            />
          </div>

          {/* Stats Info */}
          <div className='mb-4'>
            <StatsInfo
              total={total}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>

          {/* Post Grid */}
          <PostGrid 
            posts={posts} 
            loading={loading} 
            error={error} 
            onEdit={handleEditOpen}
            onDelete={deletePost}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPostPage;
