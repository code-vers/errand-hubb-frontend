"use client";

import { useQuery } from "@tanstack/react-query";
import { adminMessagesService } from "@/services/adminMessagesService";

export function useAdminChatSchedules() {
  const { data: schedules = [], isLoading, error, refetch } = useQuery({
    queryKey: ["admin-chat-schedules"],
    queryFn: async () => {
      const data = await adminMessagesService.getAdminSchedules();
      return data;
    },
  });

  return {
    schedules,
    isLoading,
    error,
    refetch,
  };
}
