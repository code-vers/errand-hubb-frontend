# Tech Stack

## Table of Contents
1. [Frontend](#frontend)
2. [Backend](#backend)
3. [Database](#database)
4. [Authentication & Security](#authentication--security)
5. [Third-Party Services](#third-party-services)
6. [Development & Build Tools](#development--build-tools)

---

## Frontend

The frontend is a modern, responsive web application built with a focus on performance, SEO, and developer experience.

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) - Provides server-side rendering (SSR), static site generation (SSG), and optimized routing.
- **UI Library:** [React 19](https://react.dev/) - The core library for building component-based user interfaces.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development and maintaining a consistent design system.
- **State Management & Data Fetching:** [@tanstack/react-query](https://tanstack.com/query/latest) - Manages server state, caching, background updates, and stale data handling.
- **Real-time Communication:** [Socket.IO Client](https://socket.io/) - Enables real-time, bi-directional communication for the messaging and notification systems.
- **Icons:** [Lucide React](https://lucide.dev/) - A clean, consistent icon library.
- **Charting:** [Chart.js](https://www.chartjs.org/) - Used for rendering data visualizations in dashboards.
- **Payments:** [@stripe/react-stripe-js](https://stripe.com/docs/stripe-js/react) - Integrates Stripe Elements for secure frontend payment processing.
- **Forms & Inputs:** Custom validation and specialized inputs like `react-phone-number-input`.

## Backend

The backend is a robust, modular REST API designed for scalability and maintainability.

- **Framework:** [NestJS 11](https://nestjs.com/) - A progressive Node.js framework providing a strict architectural pattern out of the box.
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Ensures type safety across the entire application.
- **Real-time Communication:** [Socket.IO (@nestjs/websockets)](https://docs.nestjs.com/websockets/gateways) - WebSocket gateway for real-time chat and notifications.
- **Validation:** `class-validator` and `class-transformer` - Used extensively in DTOs (Data Transfer Objects) to validate incoming request payloads.
- **Throttling:** `@nestjs/throttler` - Rate-limiting to protect endpoints from abuse and DDoS attacks.
- **Static File Serving:** `@nestjs/serve-static` - Serves user uploads and media files locally.

## Database

- **Database Engine:** [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system.
- **ORM (Object-Relational Mapping):** [Prisma](https://www.prisma.io/) - A next-generation Node.js and TypeScript ORM that provides a type-safe database client (`@prisma/client`) and an intuitive schema modeling language.

## Authentication & Security

- **Authentication Strategy:** JWT (JSON Web Tokens) via `@nestjs/jwt`.
- **Token Delivery:** HTTP-only cookies (`cookie-parser`) are used to store the JWT on the client side, mitigating XSS (Cross-Site Scripting) attacks.
- **Password Hashing:** `bcrypt` - Used to securely hash user passwords before storing them in the database.
- **Two-Factor Authentication (2FA):** `speakeasy` and `qrcode` - Used to generate TOTP secrets and QR codes for optional 2FA security.

## Third-Party Services

- **Payments & Subscriptions:** [Stripe API](https://stripe.com/) (`stripe` node package) - Handles all financial transactions, recurring subscriptions (ErrandR plans and Ad plans), and webhook processing.
- **Email Delivery:** [Nodemailer](https://nodemailer.com/) - Sends transactional emails (verification, password reset, notifications) via SMTP (configurable to services like SendGrid, AWS SES, or Gmail).
- **Analytics/Device Parsing:** `ua-parser-js` - Used to parse user agent strings for tracking login activities and security logs.

## Development & Build Tools

- **Linter/Formatter:** [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) - Enforces code quality and consistent formatting across the monorepo.
- **Testing:** [Jest](https://jestjs.io/) and `supertest` - Configured for unit and end-to-end (e2e) testing in the backend.
- **Package Manager:** `npm` (Node Package Manager).
