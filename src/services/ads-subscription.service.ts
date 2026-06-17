import api from './api/axios';

export const adsSubscriptionService = {
  createCheckoutSession: async () => {
    return api.post('/ads-subscriptions/create-checkout-session');
  },

  getMySubscription: async () => {
    return api.get('/ads-subscriptions/me');
  },

  cancelSubscription: async () => {
    return api.post('/ads-subscriptions/cancel');
  },

  createCustomerPortal: async () => {
    return api.post('/ads-subscriptions/customer-portal');
  },
};
