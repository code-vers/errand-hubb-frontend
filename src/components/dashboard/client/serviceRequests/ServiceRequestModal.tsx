"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  X,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import { getImageUrl } from "@/configs/api.config";
import {
  ServiceRequest,
  URGENCY_LEVELS,
  UrgencyLevel,
} from "@/types/serviceRequest";

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: ServiceRequest | null;
  isLoading?: boolean;
}

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
];

const CategoryIcon = ({
  category,
  className = "w-10 h-10 rounded-[10px]",
}: {
  category?: any;
  className?: string;
}) => {
  const categoryColor = category?.color || "#FF7A2F";
  return (
    <div
      aria-hidden="true"
      style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
      className={`${className} flex items-center justify-center text-xl`}
    >
      {category?.iconType === "emoji" ? (
        <span role="img" aria-label={category.name}>
          {category.icon}
        </span>
      ) : category?.icon ? (
        <img
          src={getImageUrl(category.icon) || ""}
          alt={category.name}
          className="w-6 h-6 object-contain"
        />
      ) : (
        <span role="img" aria-label="default">
          📋
        </span>
      )}
    </div>
  );
};

export default function ServiceRequestModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: ServiceRequestModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    description: "",
    budget: "",
    date: "",
    time: "",
    city: "",
    state: "",
    urgencyLevel: "normal" as UrgencyLevel,
    status: "active",
  });

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories-active"],
    queryFn: () => categoryService.getActive(),
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        categoryId: initialData.categoryId || "",
        description: initialData.description,
        budget: initialData.budget ? String(initialData.budget) : "",
        date: initialData.dateNeeded
          ? initialData.dateNeeded.split("T")[0]
          : "",
        time: initialData.time || "",
        city: initialData.city || "",
        state: initialData.state || "",
        urgencyLevel: (initialData.urgencyLevel as UrgencyLevel) || "normal",
        status: initialData.status || "active",
      });
    } else if (categories?.length) {
      setFormData((prev) => ({
        ...prev,
        title: "",
        description: "",
        budget: "",
        date: "",
        time: "",
        city: "",
        state: "",
        urgencyLevel: "normal",
        status: "active",
        categoryId: prev.categoryId || categories[0].id,
      }));
    }
  }, [initialData, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: any = {
      title: formData.title,
      description: formData.description,
      city: formData.city,
      state: formData.state || undefined,
      budget: formData.budget || undefined,
      time: formData.time || undefined,
      urgencyLevel: formData.urgencyLevel,
      status: formData.status,
      categoryId: formData.categoryId,
    };

    if (formData.date) {
      submitData.dateNeeded = new Date(formData.date).toISOString();
    }

    onSubmit(submitData);
  };

  const selectedCategory = categories?.find(
    (c: any) => c.id === formData.categoryId
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-[20px] w-full max-w-[480px] shadow-2xl overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-[18px]"
          style={{ background: "#FFF3E8" }}
        >
          <div className="flex items-center gap-3">
            <CategoryIcon category={selectedCategory} />
            <div>
              <p className="text-[15px] font-semibold text-[#1a1a1a] leading-tight">
                {initialData ? "Edit Service Request" : "Post a Service Request"}
              </p>
              <p className="text-[12px] text-[#888] mt-0.5">
                {initialData
                  ? "Update the details of your request"
                  : "Describe what help you need"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#999] hover:text-[#555] transition-colors border-0 disabled:opacity-50"
          >
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-5 py-5 flex flex-col gap-4 max-h-[520px] overflow-y-auto"
        >
          {/* Category */}
          <div>
            <Label>Service Category</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <CategoryIcon
                  category={selectedCategory}
                  className="w-8 h-8 rounded-lg"
                />
              </span>
              {loadingCategories ? (
                <div
                  className="field flex items-center gap-2"
                  style={{ paddingLeft: "42px" }}
                >
                  <Loader2 size={14} className="animate-spin" /> Loading...
                </div>
              ) : (
                <select
                  disabled={isLoading}
                  className="field disabled:bg-gray-100"
                  style={{ paddingLeft: "46px" }}
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories?.map((t: any) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              )}
              <ChevronIcon />
            </div>
          </div>

          {/* Title */}
          <div>
            <Label>Title</Label>
            <input
              required
              disabled={isLoading}
              className="field disabled:bg-gray-100"
              placeholder="e.g. I need a plumber for a leaking pipe"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <textarea
              required
              disabled={isLoading}
              rows={3}
              className="field resize-none disabled:bg-gray-100"
              placeholder="Describe what you need in detail — specific requirements, preferences, etc."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Budget + Urgency */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Budget ($)</Label>
              <div className="relative">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-bold"
                  style={{ color: "#FF7A2F" }}
                >
                  $
                </span>
                <input
                  disabled={isLoading}
                  type="number"
                  min="0"
                  className="field disabled:bg-gray-100"
                  style={{ paddingLeft: "32px" }}
                  placeholder="Optional"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Urgency</Label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF7A2F]">
                  <AlertTriangle size={14} />
                </span>
                <select
                  disabled={isLoading}
                  className="field disabled:bg-gray-100"
                  style={{ paddingLeft: "32px" }}
                  value={formData.urgencyLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      urgencyLevel: e.target.value as UrgencyLevel,
                    })
                  }
                >
                  {URGENCY_LEVELS.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Preferred Date</Label>
              <div className="relative">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "#FF7A2F" }}
                >
                  <Calendar size={16} />
                </span>
                <input
                  disabled={isLoading}
                  type="date"
                  className="field disabled:bg-gray-100"
                  style={{ paddingLeft: "42px" }}
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Preferred Time</Label>
              <div className="relative">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "#FF7A2F" }}
                >
                  <Clock size={16} />
                </span>
                <input
                  disabled={isLoading}
                  type="time"
                  className="field disabled:bg-gray-100"
                  style={{ paddingLeft: "42px" }}
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* City + State */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>City</Label>
              <div className="relative">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "#FF7A2F" }}
                >
                  <MapPin size={16} />
                </span>
                <input
                  required
                  disabled={isLoading}
                  className="field disabled:bg-gray-100"
                  style={{ paddingLeft: "42px" }}
                  placeholder="e.g. Austin"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label>State</Label>
              <input
                disabled={isLoading}
                className="field disabled:bg-gray-100"
                placeholder="e.g. TX"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </div>
          </div>

          {/* Status (only for edit or draft) */}
          {!initialData && (
            <div>
              <Label>Post Status</Label>
              <div className="flex gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    disabled={isLoading}
                    onClick={() =>
                      setFormData({ ...formData, status: s.value })
                    }
                    className="flex-1 py-[10px] rounded-[10px] text-[13px] font-medium border transition-all disabled:opacity-50"
                    style={
                      formData.status === s.value
                        ? {
                            background: "#FFF5EE",
                            border: "1.5px solid #FF7A2F",
                            color: "#FF7A2F",
                            fontWeight: 600,
                          }
                        : {
                            background: "#FAFAFA",
                            border: "1.5px solid #E8E8E8",
                            color: "#555",
                          }
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-[15px] rounded-[12px] text-[15px] font-bold text-white tracking-wide transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: "#FF7A2F" }}
            >
              {isLoading && <Loader2 size={18} className="animate-spin" />}
              {isLoading
                ? initialData
                  ? "UPDATING..."
                  : "POSTING..."
                : initialData
                ? "UPDATE REQUEST"
                : "POST REQUEST"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .field {
          width: 100%;
          padding: 11px 14px;
          background: #FAFAFA;
          border: 1.5px solid #F0E8E0;
          border-radius: 10px;
          font-size: 13px;
          color: #1a1a1a;
          outline: none;
          font-family: inherit;
          box-sizing: border-box;
          appearance: none;
          transition: border-color 0.15s;
        }
        .field:focus {
          border-color: #FF7A2F;
        }
        .field::placeholder {
          color: #bbb;
        }
      `}</style>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-[6px]"
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#222222",
      }}
    >
      {children}
    </p>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#aaa"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
