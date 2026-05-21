"use client";

import React, { useState } from "react";
import PageHeader from "../../common/PageHeader";
import SearchBar from "./SearchBar";
import StatusFilterTabs from "./StatusFilterTabs";
import PostGrid from "./PostGrid";
import Pagination from "@/components/common/Pagination";
import StatsInfo from "./StatsInfo";
import { usePosts } from "./usePosts";
import PostModal from "./PostModal";
import { Plus } from "lucide-react";

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
  } = usePosts();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='min-h-screen py-5 px-12 font-sans'>
      <div className='mx-auto flex flex-col gap-3.5'>
        <div className='flex justify-between items-center'>
          <PageHeader title='My Posts' />
          <button
            onClick={() => setIsModalOpen(true)}
            className='flex items-center gap-2 bg-status-orange hover:bg-[#D95F1B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-95'>
            <Plus size={18} />
            Post on board
          </button>
        </div>

        <div className=' mx-auto w-full mt-4'>
          {/* Search Section */}
          <div className='mb-6'>
            <SearchBar onSearch={setSearch} />
          </div>

          {/* Status Filter Tabs */}
          <div className='mb-8 overflow-x-auto pb-2 scrollbar-hide'>
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
          <PostGrid posts={posts} loading={loading} error={error} />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addPost}
      />
    </div>
  );
};

export default MyPostPage;
