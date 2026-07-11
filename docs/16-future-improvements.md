# Future Improvements

After analyzing the current architecture of Errand Hubb, the following improvements are recommended to enhance scalability, reliability, and developer experience.

## 1. Cloud Storage for Media (High Priority)

**Current State:** File uploads (Profile Images, Ad images, Post images) are stored locally on the server's disk using `@nestjs/serve-static`.
**Problem:** This prevents horizontal scaling (running multiple instances of the backend) because files uploaded to Instance A won't be available on Instance B. It also causes data loss if the server is recreated.
**Recommendation:** Integrate AWS S3, Google Cloud Storage, or Cloudinary. Update the file upload controllers to stream buffers directly to the cloud provider and store the resulting URL in the PostgreSQL database.

## 2. Global State Management Refinement

**Current State:** The frontend relies heavily on React Context for Auth and Sockets.
**Problem:** Excessive use of Context can lead to unnecessary re-renders of the entire component tree.
**Recommendation:** Consider integrating a lightweight state manager like Zustand for client-side UI state (modals, theme toggles, sidebar state) to prevent prop-drilling and optimize renders, while keeping React Query strictly for server state.

## 3. Dedicated Caching Layer (Redis)

**Current State:** Rate limiting (Throttler) is handled in memory. 
**Problem:** If the app scales to multiple instances, rate limiting isn't shared. 
**Recommendation:** Introduce Redis. Use it as the backing store for `@nestjs/throttler`. Additionally, Redis can be used to cache heavily accessed data (e.g., public categories, featured ads) to reduce the load on the PostgreSQL database.

## 4. CI/CD Pipeline

**Current State:** Manual deployments or basic platform hooks.
**Recommendation:** Implement GitHub Actions.
- **PR Checks:** Automatically run ESLint, Prettier, and Jest tests on every pull request.
- **Deployment:** Create a pipeline that automatically builds the Next.js app and NestJS app, runs database migrations safely, and deploys to staging/production on merging to the `main` branch.

## 5. Background Jobs (Queueing)

**Current State:** Emails and Stripe webhook processing happen synchronously within the HTTP request lifecycle.
**Problem:** If the SMTP server is slow, the HTTP request hangs, leading to a poor user experience. If the server crashes during webhook processing, data might be lost.
**Recommendation:** Integrate `@nestjs/bull` (which uses Redis). Offload email sending, heavy calculations, and webhook processing to a background queue.

## 6. Comprehensive Testing

**Current State:** Basic Jest configuration exists.
**Recommendation:** 
- Increase unit test coverage for core business logic in backend Services.
- Add End-to-End (E2E) tests using Cypress or Playwright on the frontend to simulate critical user flows (e.g., Registration -> Post a Job -> Apply to Job).
