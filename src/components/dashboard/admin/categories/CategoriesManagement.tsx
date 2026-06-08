"use client";

import { Category, CategoryStatus } from "@/types/categories";
import { Plus, Search, X } from "lucide-react";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import PageHeader from "../../common/PageHeader";
import CategoryGrid from "./CategoryGrid";
import { categoryService } from "@/services/category.service";
import { toast } from "sonner";
import CategoryForm from "./CategoryForm";

const CategoriesManagement: React.FC = () => {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | CategoryStatus>("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
          (cat.description && cat.description.toLowerCase().includes(searchLower)),
      );
    }

    return filtered;
  }, [categories, filterStatus, searchTerm]);

  // Handle toggle status
  const handleToggleStatus = useCallback(async (categoryId: string) => {
    const categoryToUpdate = categories.find((c) => c.id === categoryId);
    if (!categoryToUpdate) return;

    try {
      const newStatus = categoryToUpdate.status === "active" ? "inactive" : "active";
      await categoryService.update(categoryId, { status: newStatus });
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === categoryId ? { ...cat, status: newStatus } : cat
        )
      );
      toast.success(`Category marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  }, [categories]);

  // Handle delete
  const handleDelete = useCallback(async (categoryId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This action cannot be undone.",
      )
    ) {
      try {
        await categoryService.delete(categoryId);
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.id !== categoryId),
        );
        toast.success("Category deleted successfully");
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  }, []);

  const handleEdit = useCallback((category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const total = categories.length;
    const active = categories.filter((cat) => cat.status === "active").length;
    const inactive = categories.filter(
      (cat) => cat.status === "inactive",
    ).length;
    const totalPosts = categories.reduce((sum, cat) => sum + (cat.postsCount || 0), 0);

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
            onClick={() => {
              setSelectedCategory(undefined);
              setIsFormOpen(true);
            }}>
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
          onEdit={handleEdit}
          isLoading={isLoading}
          emptyStateMessage={
            searchTerm
              ? `No categories matching "${searchTerm}"`
              : "No categories available in this status"
          }
        />
      </main>

      {isFormOpen && (
        <CategoryForm 
          category={selectedCategory} 
          onClose={() => setIsFormOpen(false)} 
          onSuccess={() => {
            setIsFormOpen(false);
            fetchCategories();
          }} 
        />
      )}
    </div>
  );
};

export default CategoriesManagement;
