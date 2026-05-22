"use client";

import { Category, CategoryStatus } from "@/types/categories";
import { Plus, Search, X } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import PageHeader from "../../common/PageHeader";
import CategoryGrid from "./CategoryGrid";

const CategoriesManagement: React.FC = () => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | CategoryStatus>(
    "all",
  );

  // Mock data - Replace with API calls
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Errands",
      description: "General errand running tasks",
      emoji: "🏃",
      postsCount: 1240,
      status: "active",
      iconBgColor: "bg-orange-50",
    },
    {
      id: "2",
      name: "Cleaning",
      description: "House and office cleaning",
      emoji: "🧹",
      postsCount: 890,
      status: "active",
      iconBgColor: "bg-blue-50",
    },
    {
      id: "3",
      name: "Repairs",
      description: "Minor home repairs and fixes",
      emoji: "🔧",
      postsCount: 654,
      status: "active",
      iconBgColor: "bg-purple-50",
    },
    {
      id: "4",
      name: "Pet Care",
      description: "Dog walking, pet sitting",
      emoji: "🐾",
      postsCount: 420,
      status: "active",
      iconBgColor: "bg-green-50",
    },
    {
      id: "5",
      name: "Cooking",
      description: "Meal prep and home cooking",
      emoji: "🍳",
      postsCount: 310,
      status: "active",
      iconBgColor: "bg-yellow-50",
    },
    {
      id: "6",
      name: "Moving",
      description: "Packing and moving assistance",
      emoji: "📦",
      postsCount: 178,
      status: "inactive",
      iconBgColor: "bg-red-50",
      cardBgColor: "bg-gray-50",
    },
    {
      id: "7",
      name: "Tech Support",
      description: "Computer and gadget help",
      emoji: "💻",
      postsCount: 247,
      status: "active",
      iconBgColor: "bg-emerald-50",
    },
    {
      id: "8",
      name: "Admin Tasks",
      description: "Office and administrative work",
      emoji: "📋",
      postsCount: 96,
      status: "inactive",
      iconBgColor: "bg-indigo-50",
      cardBgColor: "bg-gray-50",
    },
  ]);

  // Filter categories based on search and status
  const filteredCategories = useMemo(() => {
    let filtered = categories;

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((cat) => cat.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchLower) ||
          cat.description.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [categories, filterStatus, searchTerm]);

  // Handle toggle status
  const handleToggleStatus = useCallback((categoryId: string) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((cat) => {
        if (cat.id === categoryId) {
          const newStatus: CategoryStatus =
            cat.status === "active" ? "inactive" : "active";
          return {
            ...cat,
            status: newStatus,
            cardBgColor: newStatus === "inactive" ? "bg-gray-50" : undefined,
          };
        }
        return cat;
      });

      return updatedCategories;
    });
  }, []);

  // Handle delete
  const handleDelete = useCallback((categoryId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This action cannot be undone.",
      )
    ) {
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== categoryId),
      );
    }
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const total = categories.length;
    const active = categories.filter((cat) => cat.status === "active").length;
    const inactive = categories.filter(
      (cat) => cat.status === "inactive",
    ).length;
    const totalPosts = categories.reduce((sum, cat) => sum + cat.postsCount, 0);

    return { total, active, inactive, totalPosts };
  }, [categories]);

  return (
    <div className='w-full p-6'>
      <PageHeader title='Task Categories' />

      <main className=' mx-auto space-y-8'>
        {/* Actions Bar */}
        <section className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
          <div>
            <p className='text-muted text-sm font-medium'>
              Manage your service categories and their visibility on the
              platform
            </p>
          </div>

          <button
            type='button'
            className='inline-flex items-center px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98] shadow-sm'
            onClick={() => console.log("Add new category")}>
            <Plus size={18} className='mr-1.5 stroke-[3]' />
            ADD CATEGORY
          </button>
        </section>

        {/* Quick Stats Grid */}
        <section className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {[
            {
              label: "Total Categories",
              value: stats.total,
              color: "text-foreground",
            },
            { label: "Active", value: stats.active, color: "text-success" },
            { label: "Inactive", value: stats.inactive, color: "text-muted" },
            {
              label: "Total Posts",
              value: stats.totalPosts.toLocaleString(),
              color: "text-primary",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className='bg-white rounded-2xl p-5 shadow-sm border border-border/50'>
              <p className='text-[10px] font-bold text-muted uppercase tracking-widest mb-1'>
                {stat.label}
              </p>
              <p className={`text-2xl font-black ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Search and Filters */}
        <section className='flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-border/40 shadow-sm'>
          {/* Search */}
          <div className='relative w-full sm:max-w-md'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-primary' strokeWidth={2.5} />
            </div>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-11 pr-10 py-2.5 bg-gray-50/50 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm font-medium placeholder-muted transition-all'
              placeholder='Search by category name or description...'
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-foreground'>
                <X size={18} />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className='flex p-1 bg-gray-50 rounded-xl border border-border/40'>
            {(["all", "active", "inactive"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`
                  px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-tight transition-all
                  ${
                    filterStatus === status
                      ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
                      : "text-muted hover:text-foreground"
                  }
                `}>
                {status}
              </button>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <CategoryGrid
          categories={filteredCategories}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          isLoading={isLoading}
          emptyStateMessage={
            searchTerm
              ? `No categories matching "${searchTerm}"`
              : "No categories available in this status"
          }
        />
      </main>
    </div>
  );
};

export default CategoriesManagement;
