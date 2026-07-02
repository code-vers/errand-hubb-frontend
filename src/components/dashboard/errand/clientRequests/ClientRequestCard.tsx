"use client";

import { ServiceRequest, SERVICE_REQUEST_STATUSES, URGENCY_LEVELS } from "@/types/serviceRequest";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { getImageUrl } from "@/configs/api.config";

interface ClientRequestCardProps {
  request: ServiceRequest;
  onContact: () => void;
  isContacting: boolean;
  onViewDetail: () => void;
}

export default function ClientRequestCard({
  request,
  onContact,
  isContacting,
  onViewDetail,
}: ClientRequestCardProps) {
  const category = request.category;
  const categoryColor = category?.color || "#FF7A2F";

  const urgencyConfig = URGENCY_LEVELS.find(
    (u) => u.value === request.urgencyLevel
  ) || { value: "normal", label: "Normal", color: "#3B82F6" };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Flexible Date";
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const clientName = request.user
    ? `${request.user.firstName} ${request.user.lastName}`
    : "Client";

  return (
    <article className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between border border-gray-50 hover:shadow-md transition-shadow duration-300 relative">
      {/* Category & Title */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-start">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
            style={{
              backgroundColor: `${categoryColor}15`,
              color: categoryColor,
            }}
          >
            {category?.name || "General"}
          </span>
          <span
            className="px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center gap-1"
            style={{
              backgroundColor: `${urgencyConfig.color}10`,
              color: urgencyConfig.color,
            }}
          >
            <AlertTriangle size={10} />
            {urgencyConfig.label}
          </span>
        </div>

        <div>
          <h3 className="card-title text-sm font-bold text-gray-900 line-clamp-1 leading-tight">
            {request.title}
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
            Posted by {clientName}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#6B6B6B] mb-5 leading-[20px] line-clamp-3 h-15">
        {request.description}
      </p>

      {/* Budget */}
      <div className="mb-5">
        <span className="text-[10px] font-medium text-[#6B6B6B] uppercase block">
          Budget
        </span>
        <span className="text-xl font-bold text-orange-500">
          {request.budget ? `$${request.budget}` : "Open Budget"}
        </span>
      </div>

      {/* Info footer */}
      <div className="pt-4 border-t border-[#F5E9D3] text-[10px] text-[#6B6B6B] space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#FF5A3C]" />
            {formatDate(request.dateNeeded)}
          </span>
          {request.time && (
            <span className="text-gray-500 font-bold">{request.time}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#FF5A3C]" />
          <span>
            {request.city}
            {request.state ? `, ${request.state}` : ""}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5">
        <button
          onClick={onViewDetail}
          className="flex-1 py-3 rounded-xl text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-all text-center"
        >
          View Details
        </button>
        <button
          onClick={onContact}
          disabled={isContacting}
          className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary/95 transition-all text-center flex items-center justify-center gap-1 shadow-md shadow-orange-500/10 active:scale-[0.98] disabled:opacity-50"
        >
          <MessageSquare size={14} />
          Message Client
        </button>
      </div>
    </article>
  );
}
