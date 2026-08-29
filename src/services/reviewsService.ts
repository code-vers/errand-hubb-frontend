import api from './api/axios';

export interface CreateReviewData {
  revieweeId: string;
  rating: number;
  comment: string;
  postId?: string;
  serviceRequestId?: string;
}

export const reviewsService = {
  createReview: async (data: CreateReviewData) => {
    return api.post('/reviews', data);
  },

  getUserReviews: async (userId: string, page = 1, limit = 10) => {
    return api.get(`/reviews/user/${userId}`, {
      params: { page, limit },
    });
  },

  getRatingSummary: async (userId: string) => {
    return api.get(`/reviews/summary/${userId}`);
  },

  checkEligibility: async (revieweeId: string, postId?: string, serviceRequestId?: string) => {
    return api.get('/reviews/check-eligibility', {
      params: { revieweeId, postId, serviceRequestId },
    });
  },
};
