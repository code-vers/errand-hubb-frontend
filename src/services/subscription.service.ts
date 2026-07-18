import api from './api/axios';

export const subscriptionService = {
  getMySubscription: async () => {
    return api.get('/subscriptions/me');
  },

  createCheckoutSession: async (plan: 'monthly' | 'yearly' = 'monthly') => {
    return api.post('/subscriptions/create-checkout-session', { plan });
  },

  createCustomerPortal: async () => {
    return api.post('/subscriptions/customer-portal');
  },

  cancelSubscription: async () => {
    return api.post('/subscriptions/cancel');
  },
};
