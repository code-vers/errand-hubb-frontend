# System Architecture

## Table of Contents
1. [High-Level Architecture](#high-level-architecture)
2. [Request Lifecycle](#request-lifecycle)
3. [Data Flow](#data-flow)
4. [Real-time Architecture](#real-time-architecture)
5. [Error Handling Strategy](#error-handling-strategy)

---

## High-Level Architecture

Errand Hubb follows a standard Client-Server architecture utilizing a RESTful API approach, augmented by WebSockets for real-time functionality.

1. **Client (Browser):** The Next.js frontend handles the UI, routing, and client-side state. It communicates with the backend exclusively via HTTP APIs and WebSocket connections.
2. **API Server (NestJS):** The backend acts as the central brain. It receives HTTP requests, processes business logic, interacts with the database, and integrates with third-party APIs (Stripe).
3. **Database (PostgreSQL):** The persistent storage layer, interacted with exclusively through Prisma ORM.

---

## Request Lifecycle

When a user interacts with the frontend (e.g., creating a new Post), the following lifecycle occurs:

1. **Frontend Action:** A user submits a form. React Hook Form (or native state) captures the data.
2. **API Call (`/services`):** The frontend makes an Axios `POST` request to the backend. The HTTP-only JWT cookie is automatically attached by the browser.
3. **Backend Ingress (`main.ts`):** 
   - **CORS Check:** Ensures the request originates from an allowed domain.
   - **Rate Limiting:** The Throttler checks if the IP has exceeded request limits.
4. **Authentication & Authorization (`Guards`):**
   - The `JwtAuthGuard` verifies the JWT token in the cookie.
   - If the route is restricted, the `RolesGuard` checks if the user's role matches the allowed roles.
5. **Data Validation (`Pipes`):** 
   - The global `ValidationPipe` intercepts the request body.
   - It cross-references the body against the specified Data Transfer Object (DTO) using `class-validator`. If validation fails, a `400 Bad Request` is thrown immediately.
6. **Controller Layer:** The route handler in the controller receives the validated data and passes it to the corresponding Service method.
7. **Service Layer & Database:** 
   - The Service executes the core business logic (e.g., checking user balances, verifying constraints).
   - It uses the `PrismaService` to execute SQL queries against PostgreSQL.
8. **Response Formatting (`Interceptors`):** 
   - The `TransformInterceptor` intercepts the output and wraps it in a standard JSON format (`{ success: true, data: { ... } }`).
9. **Frontend Consumption:** The frontend receives the response, updates the UI (often utilizing React Query to invalidate caches), and shows a success toast notification.

---

## Data Flow

- **Frontend State:** `React Query` acts as the primary data store for server state. It handles caching, deduplication, and automatic refetching. Local UI state (modals, toggles) is handled via React `useState`.
- **Database Interaction:** No direct SQL is written. Prisma Client generates type-safe queries. All database relations are defined in `schema.prisma`, ensuring data consistency.

---

## Real-time Architecture

Errand Hubb requires real-time capabilities for **Messaging** and **Notifications**.

1. **WebSocket Gateway:** NestJS utilizes `@nestjs/websockets` to spin up a Socket.IO server alongside the HTTP server.
2. **Connection:** When a user logs into the Next.js app, the `SocketContext` establishes a persistent connection to the backend gateway.
3. **Authentication:** The WebSocket connection is authenticated using the same JWT strategy.
4. **Events:** 
   - When User A sends a message to User B, it hits the HTTP endpoint `POST /messages`.
   - The Message Service saves the message to the database.
   - The Service then emits an event via the `MessagesGateway` to User B's specific socket room.
   - The frontend socket listener catches the event and instantly updates the UI without a page refresh.

---

## Error Handling Strategy

The system is designed to never leak stack traces to the client while providing meaningful UI feedback.

1. **Backend Global Filter:** The `HttpExceptionFilter` catches all exceptions thrown in the backend.
2. **Format:** It formats errors into a standard JSON structure:
   ```json
   {
     "success": false,
     "statusCode": 400,
     "timestamp": "...",
     "path": "/api/v1/...",
     "message": "Validation failed",
     "errors": ["email must be an email"]
   }
   ```
3. **Frontend Interception:** An Axios interceptor in the frontend catches these error responses, extracts the `message` or `errors` array, and globally triggers a UI toast notification (using `sonner`) to inform the user of what went wrong.
