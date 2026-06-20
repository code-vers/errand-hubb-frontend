"use client";

import { ServiceRequest, SERVICE_REQUEST_STATUSES, URGENCY_LEVELS } from "@/types/serviceRequest";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  MoreVertical,
  Edit2,
  Trash2,
  MessageSquare,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { getImageUrl } from "@/configs/api.config";
import { useConfirm } from "@/context/ConfirmationContext";

interface ServiceRequestCardProps {
  request: ServiceRequest;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetail?: () => void;
}

export default function ServiceRequestCard({
  request,
  onEdit,
  onDelete,
  onViewDetail,
}: ServiceRequestCardProps) {
  const confirm = useConfirm();
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const category = request.category;
  const categoryColor = category?.color || "#FF7A2F";

  const statusConfig = SERVICE_REQUEST_STATUSES.find(
    (s) => s.value === request.status
  ) || { value: request.status, label: request.status, color: "#6B7280", bg: "#F3F4F6" };

  const urgencyConfig = URGENCY_LEVELS.find(
    (u) => u.value === request.urgencyLevel
  ) || { value: "normal", label: "Normal", color: "#3B82F6" };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Flexible";
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const conversationCount = request._count?.conversations || 0;

  return (
    <article className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between border border-gray-50 hover:shadow-md transition-shadow duration-300 relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            style={{
              backgroundColor: `${categoryColor}15`,
              color: categoryColor,
            }}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
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
          <div>
            <h3 className="card-title text-sm font-bold leading-tight">
              {request.title}
            </h3>
            <p
              style={{ color: categoryColor }}
              className="text-[11px] mt-1 font-bold uppercase tracking-wide"
            >
              {category?.name || "General"}
            </p>
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="text-[#6B6B6B] transition-colors p-1 hover:bg-gray-100 rounded-full"
            aria-label="More options"
          >
            <MoreVertical className="w-5" />
          </button>

          {showOptions && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
              <button
                onClick={() => {
                  onEdit();
                  setShowOptions(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Request
              </button>
              <button
                onClick={async () => {
                  const isConfirmed = await confirm({
                    title: "Delete Service Request",
                    message:
                      "Are you sure you want to delete this request? This action cannot be undone.",
                    type: "danger",
                    confirmLabel: "Delete",
                  });
                  if (isConfirmed) {
                    onDelete();
                  }
                  setShowOptions(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-[12px] text-red-500 hover:bg-red-50 transition-colors text-left"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#6B6B6B] mb-5 leading-[20px] line-clamp-3">
        {request.description}
      </p>

      {/* Budget + Status */}
      <div className="flex justify-between items-end mb-5">
        <div>
          <span className="text-[10px] font-medium text-[#6B6B6B] uppercase">
            Budget
          </span>
          <div className="text-[22px] font-bold text-[#FF5A3C]">
            {request.budget ? `$${request.budget}` : "Open"}
          </div>
        </div>
        <div
          className="px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-1.5"
          style={{
            backgroundColor: statusConfig.bg,
            color: statusConfig.color,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: statusConfig.color }}
          />
          {statusConfig.label}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-[#F5E9D3] text-[10px] text-[#6B6B6B] space-y-2">
        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#FF5A3C]" />
            {formatDate(request.dateNeeded)}
          </span>
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" style={{ color: urgencyConfig.color }} />
            <span style={{ color: urgencyConfig.color, fontWeight: 600 }}>
              {urgencyConfig.label}
            </span>
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#FF5A3C]" />
            {request.city}
            {request.state ? `, ${request.state}` : ""}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-blue-500" />
            <span className="text-blue-600 font-bold">
              {conversationCount}{" "}
              {conversationCount === 1 ? "response" : "responses"}
            </span>
          </span>
        </div>
      </div>

      {/* View Detail Button */}
      {onViewDetail && (
        <button
          onClick={onViewDetail}
          className="mt-4 w-full py-2.5 rounded-xl text-[12px] font-bold text-[#FF7A2F] bg-[#FFF5EE] border border-[#FFD4B2] hover:bg-[#FFEDD5] transition-all"
        >
          View Details & Responses
        </button>
      )}
    </article>
  );
}
