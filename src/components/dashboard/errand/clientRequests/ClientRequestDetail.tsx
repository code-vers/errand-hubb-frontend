"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { toast } from "sonner";
import { URGENCY_LEVELS } from "@/types/serviceRequest";

interface ClientRequestDetailProps {
  id: string;
}

export default function ClientRequestDetail({ id }: ClientRequestDetailProps) {
  const router = useRouter();

  const {
    data: request,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["available-request-detail", id],
    queryFn: async () => {
      const res = await serviceRequestService.getAvailableById(id);
      return res.data;
    },
  });

  const { data: contactStatus, isLoading: checkingContact } = useQuery({
    queryKey: ["check-contact", id],
    queryFn: async () => {
      const res = await serviceRequestService.checkContact(id);
      return res.data;
    },
    enabled: !!request,
  });

  const contactMutation = useMutation({
    mutationFn: () => serviceRequestService.contactClient(id),
    onSuccess: (res: any) => {
      const { conversation, isNew } = res.data;
      if (isNew) {
        toast.success("Conversation started with client!");
      }
      router.push(`/dashboard/messages?convId=${conversation.id}`);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to contact client");
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
          <p className="text-lg font-bold">Request not found or unavailable</p>
          <button
            onClick={() => router.push("/dashboard/client-requests")}
            className="mt-4 text-primary font-bold hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Back to Available Requests
          </button>
        </div>
      </div>
    );
  }

  const categoryColor = request.category?.color || "#FF7A2F";
  const urgencyConfig = URGENCY_LEVELS.find(
    (u) => u.value === request.urgencyLevel
  ) || { label: "Normal", color: "#3B82F6" };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Flexible Date";
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const client = request.user || {};
  const clientName = `${client.firstName || ""} ${client.lastName || ""}`.trim() || "Client";

  return (
    <div className="min-h-screen py-5 px-12 font-sans bg-surface-dim">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Back navigation */}
        <div>
          <button
            onClick={() => router.push("/dashboard/client-requests")}
            className="flex items-center gap-2 text-gray-600 hover:text-primary font-semibold transition-colors bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm active:scale-95"
          >
            <ArrowLeft size={18} />
            Back to Available Requests
          </button>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Request Info */}
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

          {/* Column 2: Client Profile & Contact CTA */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-base font-bold text-gray-800 border-b border-gray-50 pb-3">
                Client Profile
              </h2>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                  {client.profileImage ? (
                    <img
                      src={getImageUrl(client.profileImage) || ""}
                      alt={clientName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold">
                      {client.firstName?.[0] || "C"}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{clientName}</h3>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-extrabold uppercase mt-1 inline-block">
                    Client Role
                  </span>
                </div>
              </div>

              {client.profile?.bio && (
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                    Bio
                  </span>
                  <p className="text-xs text-gray-600 italic">"{client.profile.bio}"</p>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                {checkingContact ? (
                  <div className="flex justify-center py-3">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : contactStatus?.hasContacted ? (
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/messages?convId=${contactStatus.conversationId}`
                      )
                    }
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-green-500 hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-md shadow-green-500/10 active:scale-[0.98]"
                  >
                    <MessageSquare size={16} />
                    View Existing Chat
                  </button>
                ) : (
                  <button
                    onClick={() => contactMutation.mutate()}
                    disabled={contactMutation.isPending}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary/95 transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-500/10 active:scale-[0.98] disabled:opacity-50"
                  >
                    {contactMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MessageSquare size={16} />
                    )}
                    Message Client
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
