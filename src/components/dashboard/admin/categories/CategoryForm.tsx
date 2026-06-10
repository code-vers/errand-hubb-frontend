"use client";

import { Category, IconType } from "@/types/categories";
import { X, Upload, Smile, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { categoryService } from "@/services/category.service";
import { toast } from "sonner";
import { getImageUrl } from "@/configs/api.config";

interface CategoryFormProps {
  category?: Category;
  onClose: () => void;
  onSuccess: () => void;
}

const PRESET_COLORS = [
  "#ec6f27", // Theme orange
  "#3b82f6", // Blue
  "#22c55e", // Green
  "#ef4444", // Red
  "#a855f7", // Purple
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#063b5c"  // Theme secondary
];

const PRESET_EMOJIS = ["📦", "🧹", "🛒", "🛠️", "🐕", "🚗", "💼", "🏠", "🌱", "🍳"];

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    description: "",
    icon: "📦",
    iconType: "emoji",
    color: "#3B82F6",
    status: "active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { url } = await categoryService.uploadIcon(file);
      setFormData({ ...formData, icon: url, iconType: "url" });
      toast.success("Icon uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload icon");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (category?.id) {
        await categoryService.update(category.id, formData);
        toast.success("Category updated successfully");
      } else {
        await categoryService.create(formData);
        toast.success("Category created successfully");
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
      <div className='bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200'>
        <div className='flex justify-between items-center p-6 border-b border-border/40'>
          <h2 className='text-xl font-bold text-foreground'>
            {category ? "Edit Category" : "Add New Category"}
          </h2>
          <button onClick={onClose} className='p-2 hover:bg-hover rounded-xl transition-all'>
            <X size={20} className='text-muted' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-5 overflow-y-auto max-h-[80vh]'>
          <div className='space-y-2'>
            <label className='text-sm font-bold text-muted'>Category Name</label>
            <input
              type='text'
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className='w-full px-4 py-3 bg-[#F8F9FA] border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all'
              placeholder='e.g., Cleaning Services'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-bold text-muted'>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className='w-full px-4 py-3 bg-[#F8F9FA] border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px]'
              placeholder='Tell us more about this category...'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-bold text-muted'>Icon Type</label>
              <div className='flex bg-[#F8F9FA] p-1 rounded-xl'>
                {(["emoji", "url"] as const).map((type) => (
                  <button
                    key={type}
                    type='button'
                    onClick={() => setFormData({ ...formData, iconType: type, icon: type === 'emoji' ? '📦' : '' })}
                    className={`
                      flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all
                      ${formData.iconType === type ? "bg-white text-primary shadow-sm" : "text-muted"}
                    `}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-bold text-muted'>Category Color</label>
              <div className='flex gap-2 flex-wrap'>
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type='button'
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-6 h-6 rounded-full transition-all ${formData.color === color ? 'ring-2 ring-primary ring-offset-2 scale-110' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-bold text-muted'>Icon / Emoji</label>
            {formData.iconType === "emoji" ? (
              <div className='space-y-3'>
                <input
                  type='text'
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className='w-full px-4 py-3 bg-[#F8F9FA] border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all'
                  placeholder='Enter emoji'
                />
                <div className='flex gap-2 flex-wrap'>
                  {PRESET_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type='button'
                      onClick={() => setFormData({ ...formData, icon: emoji })}
                      className={`w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center text-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-border transition-all ${formData.icon === emoji ? 'bg-white shadow-sm border-primary/20 ring-1 ring-primary/20' : ''}`}>
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className='relative'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='hidden'
                  id='icon-upload'
                />
                <label
                  htmlFor='icon-upload'
                  className='flex items-center justify-center gap-2 w-full px-4 py-8 bg-[#F8F9FA] border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-white hover:border-primary/40 transition-all'>
                  {isUploading ? (
                    <Loader2 size={24} className='animate-spin text-primary' />
                  ) : formData.icon ? (
                    <div className='flex flex-col items-center gap-2'>
                      <img src={getImageUrl(formData.icon) || ""} alt='Preview' className='w-12 h-12 object-cover rounded-xl' />
                      <span className='text-xs font-bold text-primary'>Change Icon</span>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center gap-2 text-muted'>
                      <Upload size={24} />
                      <span className='text-xs font-bold'>Upload custom icon</span>
                    </div>
                  )}
                </label>
              </div>
            )}
          </div>

          <div className='flex justify-end gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-3 rounded-2xl font-bold text-muted hover:bg-hover transition-all'>
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting || isUploading}
              className='flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-primary/20'>
              {isSubmitting ? <Loader2 size={18} className='animate-spin' /> : null}
              <span>{category ? "Update Category" : "Create Category"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
