"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { messageService } from "@/services/message.service";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface UseConnectReturn {
  connect: (participantId: string) => Promise<void>;
  isConnecting: boolean;
}

/**
 * Reusable hook for creating/opening a conversation with a participant.
 * Handles:
 * - Creating a new conversation if none exists
 * - Opening existing conversation if one already exists (no duplicates)
 * - Loading, success, and error states
 * - Redirecting unauthenticated users to login
 * - Navigating to the messaging page on success
 */
export function useConnect(): UseConnectReturn {
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const connect = useCallback(
    async (participantId: string) => {
      // Guard: must be logged in
      if (!user) {
        toast.error("Please log in to connect with this provider.");
        router.push("/login");
        return;
      }

      // Guard: don't connect to yourself
      if (participantId === user.id) {
        toast.error("You cannot start a conversation with yourself.");
        return;
      }

      // Guard: prevent double-click
      if (isConnecting) return;

      setIsConnecting(true);
      try {
        const response: any = await messageService.startConversation(participantId);
        if (response && response.success && response.data) {
          const conversation = response.data;
          router.push(`/dashboard/messages?convId=${conversation.id}`);
        } else if (response && response.data) {
          // Fallback for different response shapes
          const conversation = response.data;
          router.push(`/dashboard/messages?convId=${conversation.id}`);
        }
      } catch (error: any) {
        // The axios interceptor already handles SUBSCRIPTION_REQUIRED
        if (error?.message !== "SUBSCRIPTION_REQUIRED") {
          toast.error(error?.message || "Failed to start conversation. Please try again.");
        }
      } finally {
        setIsConnecting(false);
      }
    },
    [user, router, isConnecting]
  );

  return { connect, isConnecting };
}
