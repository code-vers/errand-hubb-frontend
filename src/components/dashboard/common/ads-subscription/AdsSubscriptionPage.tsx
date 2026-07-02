"use client";

import React, { useEffect } from "react";
import PageHeader from "../../common/PageHeader";
import { CreditCard, CheckCircle, Clock, Megaphone, Loader2, AlertCircle } from "lucide-react";
import { useAdsSubscription } from "@/hooks/useAdsSubscription";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const AdsSubscriptionPage = () => {
  const { subscription, loading, error, subscribe, openPortal, isSubscribing, isManaging } = useAdsSubscription();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Ads Subscription successful! You can now post your posters.");
      queryClient.invalidateQueries({ queryKey: ["ads-subscription"] });
    }
    if (searchParams.get("canceled")) {
      toast.error("Checkout was canceled.");
    }
  }, [searchParams, queryClient]);

  const benefits = [
    "Post up to 10 active business posters",
    "Reach thousands of local clients",
    "Include direct contact information",
    "Link to your business website or video",
    "Premium placement in the Ads Gallery",
  ];

  if (loading) {
    return (
      <div className='w-full p-6 space-y-8 flex justify-center items-center h-64'>
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full p-6 space-y-8 flex justify-center items-center h-64'>
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-6 h-6" />
          <p>Failed to load subscription details.</p>
        </div>
      </div>
    );
  }

  const isSubscribed = subscription?.isSubscribed;
  const isCanceled = subscription?.cancelAtPeriodEnd;
  
  return (
    <div className='w-full p-6 space-y-8'>
      <PageHeader title='Ads Subscription' />

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
           <span className="text-white text-xs font-bold">i</span>
        </div>
        <div>
            <p className="text-sm text-blue-700 font-medium">This subscription is specifically for posting business ads in our gallery. It is separate from the ErrandR Pro membership.</p>
        </div>
      </div>

      {/* Subscription Status Banner */}
      <div className={`rounded-2xl p-6 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm ${isSubscribed ? 'bg-white border-[var(--color-primary)]/10' : 'bg-gray-50 border-gray-200'}`}>
        <div className='flex items-center gap-4'>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isSubscribed ? 'bg-orange-50' : 'bg-gray-200'}`}>
            {isSubscribed ? (
              <CheckCircle className='w-8 h-8 text-[var(--color-primary)]' />
            ) : (
              <AlertCircle className='w-8 h-8 text-gray-500' />
            )}
          </div>
          <div>
            <h3 className='text-lg font-bold text-secondary'>
              {isSubscribed ? (isCanceled ? "Ads Plan - Canceling Soon" : "Ads Plan - Active") : "No Active Ads Plan"}
            </h3>
            <p className='text-sm text-muted'>
              {isSubscribed 
                ? (isCanceled ? "Access will end at the close of your current billing cycle" : "Your ads subscription is currently active") 
                : "Subscribe to start promoting your business in our directory"}
            </p>
          </div>
        </div>
        
        {isSubscribed && subscription?.currentPeriodEnd && (
          <div className='flex flex-col items-end'>
            <span className='text-xs font-bold text-muted uppercase tracking-wider mb-1'>
              {isCanceled ? "Ends On" : "Next Billing"}
            </span>
            <p className='text-md font-bold text-secondary flex items-center gap-2'>
              <Clock className='w-4 h-4 text-[var(--color-primary)]' />
              {format(new Date(subscription.currentPeriodEnd), "MMMM dd, yyyy")}
            </p>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Pricing Card */}
        <div className='bg-white rounded-3xl overflow-hidden border border-[var(--color-primary)]/20 shadow-xl relative'>
          <div className='p-8'>
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center'>
                <Megaphone className='w-6 h-6 text-[var(--color-primary)]' />
              </div>
              <h2 className='text-2xl font-black text-secondary uppercase tracking-tight'>Ads Plan</h2>
            </div>

            <div className='flex items-baseline gap-1 mb-8'>
              <span className='text-4xl font-black text-secondary'>$20</span>
              <span className='text-muted font-bold'>/Month</span>
            </div>

            <ul className='space-y-4 mb-8'>
              {benefits.map((benefit, index) => (
                <li key={index} className='flex items-center gap-3 text-sm font-medium text-secondary/80'>
                  <div className='w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0'>
                    <CheckCircle className='w-3.5 h-3.5 text-green-500' />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            {isSubscribed ? (
              <button 
                onClick={() => openPortal()}
                disabled={isManaging}
                className='w-full py-4 bg-gray-800 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-800/20 disabled:opacity-70 disabled:cursor-not-allowed'>
                {isManaging ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className='w-4 h-4' />}
                Manage Billing
              </button>
            ) : (
              <button 
                onClick={() => subscribe()}
                disabled={isSubscribing}
                className='w-full py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[var(--color-primary-dark)] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20 disabled:opacity-70 disabled:cursor-not-allowed'>
                {isSubscribing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Megaphone className='w-4 h-4' />}
                Subscribe Now
              </button>
            )}
          </div>
        </div>

        {/* FAQ & Info */}
        <div className='space-y-6'>
          <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm'>
            <h3 className='text-md font-bold text-secondary uppercase tracking-wider mb-4'>Frequently Asked Questions</h3>
            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">Is this different from ErrandR Pro?</h4>
                    <p className="text-sm text-gray-500">Yes, ErrandR Pro ($5/mo) is for professionals doing errands. This Ads Plan ($20/mo) is for anyone who wants to post promotional posters in our business gallery.</p>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">Can I cancel anytime?</h4>
                    <p className="text-sm text-gray-500">Absolutely. You can manage your subscription via the Stripe portal and cancel whenever you like.</p>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">How many ads can I post?</h4>
                    <p className="text-sm text-gray-500">The current plan allows you to have up to 10 active posters running simultaneously.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsSubscriptionPage;
