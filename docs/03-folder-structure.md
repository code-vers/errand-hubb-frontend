# Folder Structure

## Table of Contents
1. [Root Workspace](#root-workspace)
2. [Frontend Structure](#frontend-structure)
3. [Backend Structure](#backend-structure)

---

## Root Workspace

The project is structured as a monorepo consisting of two primary directories, ensuring separation of concerns while keeping the frontend and backend closely aligned.

```
/Errand-Hub
│
├── /errand-hubb-backend/   # NestJS backend REST API
├── /errand-hubb-frontend/  # Next.js frontend application
└── /docs/                  # Project documentation (You are here)
```

---

## Frontend Structure

Path: `/errand-hubb-frontend`

The frontend utilizes the Next.js App Router paradigm.

```
/errand-hubb-frontend
│
├── /src
│   ├── /app                # Next.js App Router directory
│   │   ├── /(auth)         # Route group for authentication pages (login, signup)
│   │   ├── /(website)      # Route group for public-facing marketing pages
│   │   ├── /dashboard      # Protected routes for logged-in users (client/errandR)
│   │   ├── /ads            # Ad-related pages
│   │   ├── /post-ad        # Flow for posting a new ad
│   │   ├── globals.css     # Global Tailwind CSS and styling variables
│   │   └── layout.js       # Root application layout
│   │
│   ├── /components         # Reusable React components (Buttons, Inputs, Modals, Cards)
│   ├── /configs            # Frontend configuration files (e.g., queryClient setup)
│   ├── /context            # React Context providers (AuthContext, SocketContext)
│   ├── /hooks              # Custom React Hooks (e.g., useAuth, useSocket)
│   ├── /lib                # Utility libraries and third-party initializations (e.g., Stripe, Axios instances)
│   ├── /services           # API integration layer (functions that make HTTP requests to the backend)
│   └── /types              # TypeScript interface and type definitions (if applicable)
│
├── /public                 # Static assets (images, fonts, favicons) directly served by Next.js
├── database_schema.dbml    # Visual database schema definition
├── next.config.mjs         # Next.js configuration and environment mapping
├── tailwind.config.js      # (or handled by @tailwindcss/postcss plugin)
└── package.json            # Frontend dependencies and scripts
```

### Why this structure?
- **`/app`:** Utilizing Next.js 14+ App Router for enhanced performance and server components. The use of parentheses `(auth)` allows for logical route grouping without affecting the URL path.
- **`/services`:** Centralizing API calls here prevents components from becoming bloated with `fetch`/`axios` logic, making the code more testable and reusable.

---

## Backend Structure

Path: `/errand-hubb-backend`

The backend follows the highly opinionated, modular architecture enforced by NestJS.

```
/errand-hubb-backend
│
├── /prisma
│   ├── schema.prisma       # Single source of truth for the Database schema
│   ├── seed-admin.js       # Database seeder for the initial admin user
│   └── seed-*.ts           # Seeders for categories, ads, etc.
│
├── /src
│   ├── /config             # Application-wide configuration and environment variable validation
│   ├── /common             # Code shared across modules
│   │   ├── /decorators     # Custom TypeScript decorators (e.g., @CurrentUser)
│   │   ├── /filters        # Global exception filters (HttpExceptionFilter)
│   │   ├── /guards         # Global guards (RolesGuard, JwtAuthGuard)
│   │   └── /interceptors   # Global interceptors (TransformInterceptor)
│   │
│   ├── /auth               # Authentication module (JWT strategy, login, register)
│   ├── /users              # User management, profiles, security logs
│   ├── /posts              # Job/Errand posting logic
│   ├── /categories         # Taxonomy for posts and services
│   ├── /subscriptions      # ErrandR premium subscription logic
│   ├── /ads                # Advertisements business logic
│   ├── /ads-subscriptions  # Business subscription logic for posting ads
│   ├── /messages           # Real-time messaging and WebSocket Gateways
│   ├── /notifications      # Real-time and persistent notification logic
│   ├── /webhooks           # Stripe webhook receivers for payment events
│   ├── /mail               # Nodemailer integration for transactional emails
│   │
│   ├── app.module.ts       # Root NestJS module importing all feature modules
│   └── main.ts             # Application entry point, sets up pipes, CORS, and globals
│
├── /media                  # Local directory where uploaded files are stored (served statically)
├── /test                   # e2e testing configurations
├── apiList.md              # Quick reference for API routes
└── package.json            # Backend dependencies and scripts
```

### Why this structure?
- **Modularity:** Every feature (e.g., `users`, `posts`, `ads`) is encapsulated in its own module directory containing its Controller, Service, DTOs, and Module file. This prevents tight coupling and makes the codebase highly scalable.
- **`/common`:** Extracting reusable cross-cutting concerns (guards, filters) ensures consistency in error formatting and security across all routes.
- **Prisma:** Placing `schema.prisma` in its own directory at the root makes database management distinct from application logic.
