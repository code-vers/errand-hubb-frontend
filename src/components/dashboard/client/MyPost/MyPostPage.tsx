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
    updatePost,
    deletePost,
    isCreating,
    isUpdating,
  } = usePosts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const handleCreateOpen = () => {
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  const handleEditOpen = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data: any) => {
    if (selectedPost) {
      updatePost({ id: selectedPost.id, data }, {
        onSuccess: () => setIsModalOpen(false)
      });
    } else {
      addPost(data, {
        onSuccess: () => setIsModalOpen(false)
      });
    }
  };

  return (
    <div className='min-h-screen py-5 px-12 font-sans'>
      <div className='mx-auto flex flex-col gap-3.5'>
        <div className='flex justify-between items-center'>
          <PageHeader title='My Posts' />
          <button
            onClick={handleCreateOpen}
            className='flex items-center gap-2 bg-status-orange hover:bg-[#D95F1B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-95'>
            <Plus size={18} />
            Create a Post
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

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={selectedPost}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};

export default MyPostPage;
