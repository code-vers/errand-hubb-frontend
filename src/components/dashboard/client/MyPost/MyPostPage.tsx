"use client";

import React from "react";
import PageHeader from "../../common/PageHeader";
import SearchBar from "./SearchBar";
import StatusFilterTabs from "./StatusFilterTabs";
import PostGrid from "./PostGrid";
import Pagination from "@/components/common/Pagination";
import StatsInfo from "./StatsInfo";
import { usePosts } from "./usePosts";

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
  } = usePosts();

  return (
    <div className='min-h-screen py-5 px-12 font-sans'>
      <div className='mx-auto flex flex-col gap-3.5'>
        <PageHeader title='My Posts' />

        <div className='max-w-6xl mx-auto w-full mt-4'>
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
    </div>
  );
};

export default MyPostPage;
