"use client";

import React, { useState, useMemo, useCallback, Suspense } from "react";
import { User, NavigationTab, UserStatus } from "@/types/users";
import UserNavigationTabs from "./UserNavigationTabs";
import UserSearchFilter from "./UserSearchFilter";
import UserTable from "./UserTable";
import PageHeader from "../../common/PageHeader";
import { useSearchParams } from "next/navigation";
import UserDetailsModal from "./UserDetailsModal";

const UserManagementContent: React.FC = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("type") || "client";

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data using the updated User interface
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      initials: "AT",
      name: "Alice Tan",
      email: "alice@email.com",
      postsCount: 12,
      status: "active",
      joinedDate: "Jan 12, 2024",
      avatarColor: "#f97316",
      role: "client",
    },
    {
      id: "2",
      initials: "BC",
      name: "Ben Cruz",
      email: "ben@email.com",
      postsCount: 7,
      status: "active",
      joinedDate: "Feb 3, 2024",
      avatarColor: "#f97316",
      role: "client",
    },
    {
      id: "3",
      initials: "CR",
      name: "Carol Reyes",
      email: "carol@email.com",
      postsCount: 2,
      status: "deactivated",
      joinedDate: "Mar 18, 2024",
      avatarColor: "#ea580c",
      role: "client",
    },
    {
      id: "7",
      initials: "JD",
      name: "John Doe",
      email: "john@errand.com",
      postsCount: 45,
      status: "active",
      joinedDate: "Jan 05, 2024",
      avatarColor: "#3b82f6",
      role: "errand",
      rating: 4.8,
      services: ["Grocery", "Delivery"],
      totalEarnings: 1250,
      jobsCompleted: 38,
      visibility: "public",
    },
    {
      id: "8",
      initials: "SM",
      name: "Sarah Miller",
      email: "sarah@errand.com",
      postsCount: 32,
      status: "active",
      joinedDate: "Feb 15, 2024",
      avatarColor: "#22c55e",
      role: "errand",
      rating: 4.9,
      services: ["Cleaning", "Repairs"],
      totalEarnings: 2100,
      jobsCompleted: 52,
      visibility: "public",
    },
  ]);

  // Navigation tabs configuration
  const navigationTabs: NavigationTab[] = [
    {
      id: "client-management",
      label: "Client Management",
      href: "/dashboard/users",
      isActive: currentTab === "client",
    },
    {
      id: "errandr-management",
      label: "Errandr Management",
      href: "/dashboard/users?type=errand",
      isActive: currentTab === "errand",
    },
  ];

  // Filter users based on active tab and search term
  const filteredUsers = useMemo(() => {
    let result = users.filter((user) => user.role === currentTab);

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }
    return result;
  }, [users, searchTerm, currentTab]);

  // Handle search input change
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Handle filter button click
  const handleFilterClick = useCallback(() => {
    console.log("Filter button clicked");
  }, []);

  // Handle viewing user details
  const handleViewUser = useCallback((user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  // Handle user actions
  const handleUserAction = useCallback(
    (userId: string, action: "edit" | "deactivate" | "activate") => {
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user.id === userId) {
            switch (action) {
              case "deactivate":
                return { ...user, status: "deactivated" as UserStatus };
              case "activate":
                return { ...user, status: "active" as UserStatus };
              default:
                return user;
            }
          }
          return user;
        });
      });
    },
    [],
  );

  return (
    <div className='w-full p-6'>
      <PageHeader title='User Management' />

      {/* Navigation Tabs */}
      <UserNavigationTabs tabs={navigationTabs} />

      {/* Main Content Container */}
      <div className='mx-auto space-y-6'>
        {/* Search and Filter Section */}
        <UserSearchFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onFilterClick={handleFilterClick}
          activeFilters={activeFilters}
        />

        {/* Users Table */}
        <UserTable
          users={filteredUsers}
          onUserAction={handleUserAction}
          onViewUser={handleViewUser}
          isLoading={isLoading}
          emptyStateMessage={`No ${currentTab}s found matching your search criteria`}
        />
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

const UserManagement: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserManagementContent />
    </Suspense>
  );
};

export default UserManagement;
