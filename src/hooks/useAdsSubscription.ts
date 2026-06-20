"use client";

import { useState, useEffect, useCallback } from "react";
import { adsSubscriptionService } from "@/services/ads-subscription.service";
import { toast } from "sonner";

export function useAdsSubscription() {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  const fetchSubscription = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adsSubscriptionService.getMySubscription();
      setSubscription(response.data);
    } catch (err: any) {
      console.error("Failed to fetch ads subscription:", err);
      setError(err.message || "Failed to load subscription status");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const subscribe = async () => {
    setIsSubscribing(true);
    try {
      const response = await adsSubscriptionService.createCheckoutSession();
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err: any) {
      console.error("Failed to create checkout session:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to start checkout process");
    } finally {
      setIsSubscribing(false);
    }
  };

  const openPortal = async () => {
    setIsManaging(true);
    try {
      const response = await adsSubscriptionService.createCustomerPortal();
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err: any) {
      console.error("Failed to open customer portal:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to open billing portal");
    } finally {
      setIsManaging(false);
    }
  };

  return {
    subscription,
    loading,
    error,
    subscribe,
    openPortal,
    isSubscribing,
    isManaging,
    refresh: fetchSubscription,
  };
}
