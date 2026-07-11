# Errand Hubb Developer Documentation

Welcome to the official developer documentation for the Errand Hubb platform. 

This documentation is designed to help new developers rapidly understand the architecture, infrastructure, and business logic of the project so they can begin contributing immediately.

## Table of Contents

### 1. Introduction & Architecture
- [01. Project Overview](./01-project-overview.md) - Business goals, user roles, and main workflows.
- [02. Tech Stack](./02-tech-stack.md) - The frontend, backend, and infrastructure technologies.
- [03. Folder Structure](./03-folder-structure.md) - Layout of the monorepo and why it is structured this way.
- [04. System Architecture](./04-system-architecture.md) - Request lifecycles, data flow, and error handling.

### 2. Core Systems
- [05. Authentication & Security](./05-authentication.md) - JWTs, Cookies, RBAC, 2FA, and Password management.
- [06. Database Schema](./06-database.md) - Prisma setup, Entities, and Relationships.
- [07. API Documentation](./07-api-documentation.md) - Available endpoints and payloads.
- [08. Features Breakdown](./08-features.md) - Deep dive into Jobs, Messaging, Subscriptions, and Ads.

### 3. Application Details
- [09. Frontend Development](./09-frontend.md) - Next.js App Router, React Query, and Tailwind styling.
- [10. Backend Development](./10-backend.md) - NestJS Modules, DTOs, Validation, and Interceptors.
- [11. Third-Party Services](./11-third-party-services.md) - Stripe integration and Nodemailer setup.

### 4. Operations & Guides
- [12. Environment Variables](./12-environment-variables.md) - Required keys and configuration variables.
- [13. Deployment Guide](./13-deployment.md) - How to deploy the frontend, backend, and database.
- [14. Development Guide](./14-development-guide.md) - Step-by-step guides for adding new features.
- [15. Troubleshooting](./15-troubleshooting.md) - Solutions to common errors (CORS, Stripe, WebSockets).
- [16. Future Improvements](./16-future-improvements.md) - Architectural recommendations for scaling.
