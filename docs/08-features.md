# Features Breakdown

## Table of Contents
1. [Job Posting (Errands)](#job-posting-errands)
2. [Real-time Messaging](#real-time-messaging)
3. [Subscriptions (Stripe Integration)](#subscriptions-stripe-integration)
4. [Advertising System](#advertising-system)
5. [Notifications](#notifications)

---

## Job Posting (Errands)

**Purpose:** Allows Clients to request tasks to be completed.

**Flow:**
1. Client creates a Post selecting a Category, location, budget, and date needed.
2. The Post becomes visible in the public or ErrandR-specific feeds.
3. Once an ErrandR is selected, the `assignedToId` is updated on the Post.
4. Upon completion, the status is changed to `completed`.

**Files Involved:**
- Backend: `src/posts/*`
- Frontend: `src/app/dashboard/client/posts/*` (or equivalent UI routes)

---

## Real-time Messaging

**Purpose:** Facilitate direct communication between a Client and an ErrandR to negotiate or discuss task details.

**Flow:**
1. A user initiates a chat. The system checks if a `Conversation` exists between the two users. If not, it creates one.
2. User types a message. The frontend sends a `POST` request to the backend.
3. The backend saves the message to PostgreSQL via Prisma.
4. The backend's WebSocket Gateway (`MessagesGateway`) intercepts the creation and emits a `newMessage` event to the recipient's socket room.
5. The frontend's `SocketContext` listens for `newMessage` and appends it to the active chat window instantly.

---

## Subscriptions (Stripe Integration)

**Purpose:** Monetize the platform by offering premium tiers to ErrandRs (e.g., enhanced visibility, lower commission rates).

**Flow:**
1. User clicks "Upgrade Plan" on the frontend.
2. Backend creates a Stripe Checkout Session or creates a SetupIntent.
3. User enters card details via Stripe Elements.
4. Stripe processes the payment and sends a webhook to the backend (`/webhooks/stripe`).
5. The `WebhooksController` verifies the Stripe signature, parses the event (e.g., `invoice.payment_succeeded`), and updates the local `Subscription` table status to `active`.

**Files Involved:**
- Backend: `src/subscriptions/*`, `src/webhooks/*`

---

## Advertising System

**Purpose:** Allow businesses or users to purchase ad space on the platform.

**Flow:**
1. The user must first purchase an `AdsSubscription` (similar to the regular subscription but specifically for advertising rights).
2. Once active, the user can navigate to the `/post-ad` frontend route.
3. The user creates an `Ad`, filling in company details, descriptions, and assigning it to an `AdCategory`.
4. Admins can moderate (approve/reject) these ads.
5. Approved ads are displayed in designated areas across the application.

---

## Notifications

**Purpose:** Keep users informed about system events (e.g., new message, job assigned, payment successful).

**Flow:**
1. System events trigger the `NotificationsService` on the backend.
2. A `Notification` record is saved to the database.
3. Simultaneously, a WebSocket event is fired to alert the user in real-time.
4. The frontend displays a notification bell with an unread count and toasts the user via `sonner`.
