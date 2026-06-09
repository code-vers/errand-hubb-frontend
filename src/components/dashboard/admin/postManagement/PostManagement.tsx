"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Post, PostStatus, StatusTab } from "@/types/post";
import PostStatusTabs from "./PostStatusTabs";
import PostSearchFilter from "./PostSearchFilter";
import PostGrid from "./PostGrid";
import PageHeader from "../../common/PageHeader";
import { useAdminPosts } from "./useAdminPosts";
import { format } from "date-fns";

const PostManagement: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState<PostStatus>("all");
  const [activeFilters, setActiveFilters] = useState(0);

  const {
    posts: rawPosts,
    loading,
    error,
    meta,
    updatePost,
    deletePost
  } = useAdminPosts({
    search: searchTerm,
    status: activeStatus === "all" ? undefined : activeStatus,
  });

  // Map backend response to Post type
  const posts: Post[] = useMemo(() => {
    return rawPosts.map((post: any) => ({
      id: post.id,
      title: post.title,
      status: post.status as PostStatus,
      client: {
        id: post.user.id,
        name: `${post.user.firstName} ${post.user.lastName}`,
        initials: post.user.firstName.charAt(0) + post.user.lastName.charAt(0),
        avatarColor: "#f97316",
      },
      category: post.category.name,
      date: format(new Date(post.createdAt), "MMM dd, yyyy"),
      budget: Number(post.budget),
      isActive: post.status !== "inactive", // Or whatever logic for isActive
    }));
  }, [rawPosts]);

  // Mock status counts for now or implement in hook
  const statusTabs: StatusTab[] = useMemo(
    () => [
      { id: "all", label: "All", count: meta.total },
      { id: "open", label: "Open", count: 0 }, // Backend could return these counts
      { id: "pending", label: "Pending", count: 0 },
      { id: "completed", label: "Completed", count: 0 },
      { id: "flagged", label: "Flagged", count: 0 },
    ],
    [meta.total],
  );

  // Handle tab change
  const handleTabChange = useCallback((status: PostStatus) => {
    setActiveStatus(status);
  }, []);

  // Handle search
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Handle filter click
  const handleFilterClick = useCallback(() => {
    console.log("Filter button clicked");
  }, []);

  // Handle post actions
  const handlePostAction = useCallback(
    (
      postId: string,
      action: "edit" | "mark_inactive" | "remove" | "mark_active",
    ) => {
      switch (action) {
        case "edit":
          console.log("Edit post:", postId);
          break;
        case "mark_inactive":
          updatePost({ id: postId, data: { status: "inactive" } });
          break;
        case "mark_active":
          updatePost({ id: postId, data: { status: "active" } });
          break;
        case "remove":
          deletePost(postId);
          break;
      }
    },
    [updatePost, deletePost],
  );

  return (
    <div className='w-full p-6 pt-8'>
      <div className='mb-8'>
        <PageHeader title='Post Management' />
      </div>

      <main className=' mx-auto space-y-6'>
        {/* Header & Filters */}
        <div className='space-y-6'>
          {/* Status Tabs */}
          <PostStatusTabs
            tabs={statusTabs}
            activeTab={activeStatus}
            onTabChange={handleTabChange}
          />

          {/* Search and Action Bar */}
          <PostSearchFilter
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onFilterClick={handleFilterClick}
            activeFilters={activeFilters}
          />
        </div>

        {/* Posts Grid */}
        <PostGrid
          posts={posts}
          onPostAction={handlePostAction}
          isLoading={loading}
          emptyStateMessage={`No ${activeStatus === "all" ? "" : activeStatus} posts found matching your search criteria`}
        />
      </main>
    </div>
  );
};

export default PostManagement;
