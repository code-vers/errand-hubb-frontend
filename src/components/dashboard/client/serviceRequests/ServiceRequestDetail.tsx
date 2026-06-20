"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { serviceRequestService } from "@/services/serviceRequest.service";
import PageHeader from "../../common/PageHeader";
import {
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  MessageSquare,
  DollarSign,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { getImageUrl } from "@/configs/api.config";
import { SERVICE_REQUEST_STATUSES, URGENCY_LEVELS } from "@/types/serviceRequest";

interface ServiceRequestDetailProps {
  id: string;
}

export default function ServiceRequestDetail({ id }: ServiceRequestDetailProps) {
  const router = useRouter();

  const {
    data: request,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service-request-detail", id],
    queryFn: async () => {
      const res = await serviceRequestService.getMyRequestById(id);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-dim">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-dim">
        <div className="text-center text-red-500">
          <p className="text-lg font-bold">Request not found or access denied</p>
          <button
            onClick={() => router.push("/dashboard/service-requests")}
            className="mt-4 text-primary font-bold hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Back to My Requests
          </button>
        </div>
      </div>
    );
  }

  const categoryColor = request.category?.color || "#FF7A2F";
  const statusConfig = SERVICE_REQUEST_STATUSES.find(
    (s) => s.value === request.status
  ) || { label: request.status, color: "#6B7280", bg: "#F3F4F6" };

  const urgencyConfig = URGENCY_LEVELS.find(
    (u) => u.value === request.urgencyLevel
  ) || { label: "Normal", color: "#3B82F6" };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Flexible Date";
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const conversations = request.conversations || [];

  return (
    <div className="min-h-screen py-5 px-12 font-sans bg-surface-dim">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Back navigation */}
        <div>
          <button
            onClick={() => router.push("/dashboard/service-requests")}
            className="flex items-center gap-2 text-gray-600 hover:text-primary font-semibold transition-colors bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm active:scale-95"
          >
            <ArrowLeft size={18} />
            Back to My Requests
          </button>
        </div>

        {/* Main layout: 2 columns (Request Details | Providers Interested) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Service Request Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    style={{
                      backgroundColor: `${categoryColor}15`,
                      color: categoryColor,
                    }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  >
                    {request.category?.iconType === "emoji" ? (
                      <span role="img" aria-label={request.category.name}>
                        {request.category.icon}
                      </span>
                    ) : request.category?.icon ? (
                      <img
                        src={getImageUrl(request.category.icon) || ""}
                        alt={request.category.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <span>📋</span>
                    )}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 leading-tight">
                      {request.title}
                    </h1>
                    <p
                      style={{ color: categoryColor }}
                      className="text-xs font-bold uppercase tracking-wider mt-1"
                    >
                      {request.category?.name || "General Service"}
                    </p>
                  </div>
                </div>

                <div
                  className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
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

              <div className="border-t border-b border-gray-100 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                    Budget
                  </span>
                  <span className="text-lg font-extrabold text-orange-500">
                    {request.budget ? `$${request.budget}` : "Open"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                    Date Needed
                  </span>
                  <span className="text-sm font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                    <Calendar size={14} className="text-gray-400" />
                    {formatDate(request.dateNeeded)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                    Urgency
                  </span>
                  <span
                    className="text-sm font-bold flex items-center gap-1 mt-0.5"
                    style={{ color: urgencyConfig.color }}
                  >
                    <AlertTriangle size={14} />
                    {urgencyConfig.label}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="text-sm font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                    <MapPin size={14} className="text-gray-400" />
                    {request.city}
                    {request.state ? `, ${request.state}` : ""}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">
                  Description
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {request.description}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Interested Providers / Conversations */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-[500px]">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
                <MessageSquare className="text-primary" size={20} />
                <h2 className="text-base font-bold text-gray-800">
                  Interested Errandrs ({conversations.length})
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                {conversations.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                    <User size={40} className="stroke-[1.5] mb-2" />
                    <p className="text-sm font-medium">No responses yet</p>
                    <p className="text-xs mt-1">
                      Errand Providers will appear here once they initiate contact.
                    </p>
                  </div>
                ) : (
                  conversations.map((conv: any) => {
                    const errand = conv.errand;
                    const lastMsg = conv.messages?.[0]?.content || "Started a discussion";
                    
                    return (
                      <div
                        key={conv.id}
                        className="p-4 rounded-xl border border-gray-100 hover:border-orange-100 bg-gray-50/50 hover:bg-orange-50/10 transition-all flex flex-col justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            {errand.profileImage ? (
                              <img
                                src={getImageUrl(errand.profileImage) || ""}
                                alt={`${errand.firstName}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold text-sm">
                                {errand.firstName?.[0]}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 truncate">
                              {errand.firstName} {errand.lastName}
                            </h4>
                            <p className="text-xs text-gray-500 truncate mt-0.5">
                              {lastMsg}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            router.push(`/dashboard/messages?convId=${conv.id}`)
                          }
                          className="w-full py-2 rounded-lg text-xs font-bold text-white bg-primary hover:bg-primary/95 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                        >
                          <MessageSquare size={14} />
                          Open Chat
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
