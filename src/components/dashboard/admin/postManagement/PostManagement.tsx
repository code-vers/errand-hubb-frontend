"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Post, PostStatus, StatusTab } from "@/types/post";
import PostStatusTabs from "./PostStatusTabs";
import PostSearchFilter from "./PostSearchFilter";
import PostGrid from "./PostGrid";
import PageHeader from "../../common/PageHeader";

const PostManagement: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState<PostStatus>("all");
  const [activeFilters, setActiveFilters] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - Replace with API calls
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Need someone to pick up groceries",
      status: "open",
      client: {
        id: "c1",
        name: "Alice Tan",
        initials: "AT",
        avatarColor: "#f97316",
      },
      category: "Errands",
      date: "May 10, 2026",
      budget: 350,
      isActive: true,
    },
    {
      id: "2",
      title: "Fix leaking kitchen faucet",
      status: "pending",
      client: {
        id: "c2",
        name: "Ben Cruz",
        initials: "BC",
        avatarColor: "#f97316",
      },
      category: "Repairs",
      date: "May 10, 2026",
      budget: 800,
      isActive: true,
    },
    {
      id: "3",
      title: "Dog walking for 2 weeks",
      status: "completed",
      client: {
        id: "c3",
        name: "Carol Reyes",
        initials: "CR",
        avatarColor: "#ea580c",
      },
      category: "Pet Care",
      date: "May 7, 2026",
      budget: 1200,
      isActive: true,
    },
    {
      id: "4",
      title: "Help me move furniture",
      status: "flagged",
      client: {
        id: "c4",
        name: "Dan Lim",
        initials: "DL",
        avatarColor: "#ea580c",
      },
      category: "Moving",
      date: "May 7, 2026",
      budget: 2500,
      isActive: true,
    },
    {
      id: "5",
      title: "Cook dinner for 6 guests",
      status: "open",
      client: {
        id: "c5",
        name: "Eva Santos",
        initials: "ES",
        avatarColor: "#ea580c",
      },
      category: "Cooking",
      date: "May 5, 2026",
      budget: 1500,
      isActive: true,
    },
    {
      id: "6",
      title: "Set up home network",
      status: "completed",
      client: {
        id: "c6",
        name: "Frank Go",
        initials: "FG",
        avatarColor: "#ea580c",
      },
      category: "Tech",
      date: "May 4, 2026",
      budget: 600,
      isActive: true,
    },
    {
      id: "7",
      title: "Clean 3-bedroom apartment",
      status: "pending",
      client: {
        id: "c7",
        name: "Grace Yu",
        initials: "GY",
        avatarColor: "#f97316",
      },
      category: "Cleaning",
      date: "May 3, 2026",
      budget: 900,
      isActive: true,
    },
    {
      id: "8",
      title: "Translate documents (Filipino-English)",
      status: "flagged",
      client: {
        id: "c8",
        name: "Henry Sy",
        initials: "HS",
        avatarColor: "#ea580c",
      },
      category: "Admin",
      date: "May 2, 2026",
      budget: 450,
      isActive: true,
    },
  ]);

  // Calculate status counts
  const statusCounts = useMemo(() => {
    const counts: Record<PostStatus, number> = {
      all: posts.length,
      open: 0,
      pending: 0,
      completed: 0,
      flagged: 0,
    };

    posts.forEach((post) => {
      counts[post.status]++;
    });

    return counts;
  }, [posts]);

  // Status tabs configuration
  const statusTabs: StatusTab[] = useMemo(
    () => [
      { id: "all", label: "All", count: statusCounts.all },
      { id: "open", label: "Open", count: statusCounts.open },
      { id: "pending", label: "Pending", count: statusCounts.pending },
      { id: "completed", label: "Completed", count: statusCounts.completed },
      { id: "flagged", label: "Flagged", count: statusCounts.flagged },
    ],
    [statusCounts],
  );

  // Filter posts based on status and search
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by status
    if (activeStatus !== "all") {
      filtered = filtered.filter((post) => post.status === activeStatus);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.client.name.toLowerCase().includes(searchLower) ||
          post.category.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [posts, activeStatus, searchTerm]);

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
    // Open advanced filter modal/drawer
    console.log("Filter button clicked");
    setActiveFilters((prev) => (prev > 0 ? 0 : 1));
  }, []);

  // Handle post actions
  const handlePostAction = useCallback(
    (
      postId: string,
      action: "edit" | "mark_inactive" | "remove" | "mark_active",
    ) => {
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => {
          if (post.id === postId) {
            switch (action) {
              case "edit":
                // Open edit modal
                console.log("Edit post:", postId);
                return post;

              case "mark_inactive":
                return { ...post, isActive: false };

              case "mark_active":
                return { ...post, isActive: true };

              case "remove":
                // Soft delete or remove
                return {
                  ...post,
                  isActive: false,
                  status: "completed" as PostStatus,
                };

              default:
                return post;
            }
          }
          return post;
        });

        return updatedPosts;
      });

      // API call would go here
      // await updatePost(postId, action);
    },
    [],
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
          posts={filteredPosts}
          onPostAction={handlePostAction}
          isLoading={isLoading}
          emptyStateMessage={`No ${activeStatus === "all" ? "" : activeStatus} posts found matching your search criteria`}
        />
      </main>
    </div>
  );
};

export default PostManagement;
