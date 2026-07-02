import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useSubscription() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: subscription, isLoading: loading, error } = useQuery({
    queryKey: ["my-subscription"],
    queryFn: async () => {
      const res = await subscriptionService.getMySubscription();
      return res.data;
    },
  });

  const createCheckoutMutation = useMutation({
    mutationFn: () => subscriptionService.createCheckoutSession(),
    onSuccess: (res) => {
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to start checkout");
    },
  });

  const createPortalMutation = useMutation({
    mutationFn: () => subscriptionService.createCustomerPortal(),
    onSuccess: (res) => {
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to open customer portal");
    },
  });

  return {
    subscription,
    loading,
    error,
    subscribe: createCheckoutMutation.mutate,
    manageBilling: createPortalMutation.mutate,
    isSubscribing: createCheckoutMutation.isPending,
    isManaging: createPortalMutation.isPending,
  };
}
