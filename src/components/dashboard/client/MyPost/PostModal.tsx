"use client";

import { ErrandPost, ErrandStatus, PostType, ServiceType } from "@/types/post";
import {
  Calendar,
  Clock,
  MapPin,
  ShoppingCart,
  X,
  Package,
  Wrench,
  Dog,
  Shirt,
  Utensils,
} from "lucide-react";
import React, { useState } from "react";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: ErrandPost) => void;
}

const POST_TYPES: PostType[] = [
  "Grocery Shopping",
  "Package Delivery",
  "Home Cleaning",
  "Pet Care",
  "Dry Cleaning",
  "Food Pickup",
];

const SERVICE_TYPES: ServiceType[] = ["Pickup", "Delivery", "Both"];

const STATUS_OPTIONS: ErrandStatus[] = [
  "Pending Pickup",
  "In Progress",
  "Completed",
];

const getIconForType = (type: PostType) => {
  switch (type) {
    case "Grocery Shopping":
      return <ShoppingCart size={16} />;
    case "Package Delivery":
      return <Package size={16} />;
    case "Home Cleaning":
      return <Wrench size={16} />;
    case "Pet Care":
      return <Dog size={16} />;
    case "Dry Cleaning":
      return <Shirt size={16} />;
    case "Food Pickup":
      return <Utensils size={16} />;
    default:
      return <ShoppingCart size={16} />;
  }
};

const getIconNameForType = (type: PostType): string => {
  const map: Record<PostType, string> = {
    "Grocery Shopping": "shopping-cart",
    "Package Delivery": "package",
    "Home Cleaning": "wrench",
    "Pet Care": "dog",
    "Dry Cleaning": "shirt",
    "Food Pickup": "utensils",
  };
  return map[type] ?? "shopping-cart";
};

export default function PostModal({
  isOpen,
  onClose,
  onSubmit,
}: PostModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "Grocery Shopping" as PostType,
    description: "",
    reward: 15,
    date: "",
    time: "",
    location: "",
    serviceType: "Delivery" as ServiceType,
    status: "Pending Pickup" as ErrandStatus,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: ErrandPost = {
      id: `post-${Math.floor(Math.random() * 1000000)}`,
      title: formData.title,
      type: formData.type,
      description: formData.description,
      reward: formData.reward,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      serviceType: formData.serviceType,
      status: formData.status,
      assignedTo: null,
      icon: getIconNameForType(formData.type),
    };
    onSubmit(newPost);
    onClose();
    setFormData({
      title: "",
      type: "Grocery Shopping",
      description: "",
      reward: 15,
      date: "",
      time: "",
      location: "",
      serviceType: "Delivery",
      status: "Pending Pickup",
    });
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
      <div
        className='bg-white rounded-[20px] w-full max-w-[420px] shadow-2xl overflow-hidden'
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* ── Header ── */}
        <div
          className='flex items-center justify-between px-5 py-[18px]'
          style={{ background: "#FFF3E8" }}>
          <div className='flex items-center gap-3'>
            <div
              className='w-10 h-10 rounded-[10px] flex items-center justify-center'
              style={{ background: "#FF7A2F" }}>
              <ShoppingCart size={20} color='#fff' />
            </div>
            <div>
              <p className='text-[15px] font-semibold text-[#1a1a1a] leading-tight'>
                Post a New Errand
              </p>
              <p className='text-[12px] text-[#888] mt-0.5'>
                Fill in the details to find your Errandr
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#999] hover:text-[#555] transition-colors border-0'>
            <X size={14} />
          </button>
        </div>

        {/* ── Form Body ── */}
        <form
          onSubmit={handleSubmit}
          className='px-5 py-5 flex flex-col gap-4 max-h-[520px] overflow-y-auto'>
          {/* Job Type */}
          <div>
            <Label>Job Type</Label>
            <div className='relative'>
              <span
                className='absolute left-3.5 top-1/2 -translate-y-1/2'
                style={{ color: "#FF7A2F" }}>
                {getIconForType(formData.type)}
              </span>
              <select
                className='field'
                style={{ paddingLeft: "42px" }}
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as PostType })
                }>
                {POST_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          </div>

          {/* Post Title */}
          <div>
            <Label>Post Title</Label>
            <input
              required
              className='field'
              placeholder='e.g. Weekly Grocery Run at H-E-B'
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
              rows={3}
              className='field resize-none'
              placeholder='Describe the errand in detail — what needs to be done, any special instructions...'
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Reward + Status */}
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <Label>Reward ($)</Label>
              <div className='relative'>
                <span
                  className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-bold'
                  style={{ color: "#FF7A2F" }}>
                  $
                </span>
                <input
                  required
                  type='number'
                  min='1'
                  className='field'
                  style={{ paddingLeft: "32px" }}
                  value={formData.reward}
                  onChange={(e) =>
                    setFormData({ ...formData, reward: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <div className='relative'>
                <span
                  className='absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full'
                  style={{ background: "#FF7A2F" }}
                />
                <select
                  className='field'
                  style={{ paddingLeft: "32px" }}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as ErrandStatus,
                    })
                  }>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
            </div>
          </div>

          {/* Date + Time */}
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <Label>Date</Label>
              <div className='relative'>
                <span
                  className='absolute left-3.5 top-1/2 -translate-y-1/2'
                  style={{ color: "#FF7A2F" }}>
                  <Calendar size={16} />
                </span>
                <input
                  type='date'
                  className='field'
                  style={{ paddingLeft: "42px" }}
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Time</Label>
              <div className='relative'>
                <span
                  className='absolute left-3.5 top-1/2 -translate-y-1/2'
                  style={{ color: "#FF7A2F" }}>
                  <Clock size={16} />
                </span>
                <input
                  type='time'
                  className='field'
                  style={{ paddingLeft: "42px" }}
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <Label>Location</Label>
            <div className='relative'>
              <span
                className='absolute left-3.5 top-1/2 -translate-y-1/2'
                style={{ color: "#FF7A2F" }}>
                <MapPin size={16} />
              </span>
              <input
                required
                className='field'
                style={{ paddingLeft: "42px" }}
                placeholder='e.g. Austin, TX'
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
          </div>

          {/* Service Type */}
          <div>
            <Label>Service Type</Label>
            <div className='flex gap-2'>
              {SERVICE_TYPES.map((t) => (
                <button
                  key={t}
                  type='button'
                  onClick={() => setFormData({ ...formData, serviceType: t })}
                  className='flex-1 py-[10px] rounded-[10px] text-[13px] font-medium border transition-all'
                  style={
                    formData.serviceType === t
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
                  }>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className='pt-1'>
            <button
              type='submit'
              className='w-full py-[15px] rounded-[12px] text-[15px] font-bold text-white tracking-wide transition-opacity hover:opacity-90 active:scale-[0.98]'
              style={{ background: "#FF7A2F" }}>
              POST ERRAND
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

/* ── tiny helpers ── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className='mb-[6px]'
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#aaa",
      }}>
      {children}
    </p>
  );
}

function ChevronIcon() {
  return (
    <svg
      className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#aaa'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <polyline points='6 9 12 15 18 9' />
    </svg>
  );
}
