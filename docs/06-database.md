# Database Schema

## Table of Contents
1. [Overview](#overview)
2. [Prisma ORM](#prisma-orm)
3. [Core Entities](#core-entities)
4. [Entity Relationships (ERD Concepts)](#entity-relationships-erd-concepts)
5. [Database Migrations](#database-migrations)

---

## Overview

Errand Hubb utilizes a PostgreSQL relational database. The schema is entirely managed through Prisma, providing a single source of truth (`prisma/schema.prisma`) that generates a type-safe TypeScript client.

## Prisma ORM

- **Schema Location:** `errand-hubb-backend/prisma/schema.prisma`
- **Generated Client:** `@prisma/client`
- **Prisma Studio:** Developers can run `npm run prisma:studio` in the backend directory to open a local GUI to interact with the database.

---

## Core Entities

Below are the primary models defined in the database and their purpose.

### 1. `User`
The central authentication and identity entity.
- **Fields:** `id`, `email`, `password`, `role` (admin, client, errand), `status`, `isVerified`.
- **Security Fields:** `twoFactorSecret`, `resetPasswordToken`, `recoveryCodes`.

### 2. `Profile`
Contains public and extended information for a user. One-to-One relationship with `User`.
- **Fields:** `bio`, `phone`, `city`, `state`, `totalEarnings`, `jobsCompleted`, `ratePerHour`, `gallery`.

### 3. `Category`
The taxonomy used for grouping posts and service requests.
- **Fields:** `name`, `description`, `icon`, `status`.

### 4. `Post`
Represents an "Errand" or a job posted by a Client.
- **Fields:** `title`, `description`, `budget`, `dateNeeded`, `status`, `userId` (Owner), `assignedToId` (The ErrandR assigned to the job).

### 5. `ServiceRequest`
Specific requests created by users targeting particular services.
- **Fields:** `title`, `description`, `urgencyLevel`, `status`.

### 6. `Conversation` & `Message`
Handles real-time chat histories.
- **Conversation:** Links a `clientId` and an `errandId` (and optionally a `serviceRequestId`).
- **Message:** Links to a Conversation. Contains `content`, `senderId`, `isRead`, and `type`.

### 7. `Subscription` & `PaymentHistory`
Manages the Stripe monetization logic.
- **Subscription:** Links a User to a Stripe Subscription. Contains `stripeCustomerId`, `stripeSubscriptionId`, `status`, `currentPeriodEnd`.
- **PaymentHistory:** A ledger of all transactions (invoices, charges).

### 8. `Ad`, `AdCategory`, `AdSubcategory`, `AdsSubscription`
Manages the advertising ecosystem.
- Businesses can subscribe (`AdsSubscription`), create `Ad` entities, and categorize them via `AdCategory` and `AdSubcategory`.

### 9. `Notification`
In-app notifications for users.
- **Fields:** `type`, `title`, `message`, `isRead`.

### 10. `SecurityLog` & `LoginActivity`
Audit trails for security tracking.

---

## Entity Relationships (ERD Concepts)

- **User ↔ Profile:** 1-to-1 (`User` has one `Profile`).
- **User ↔ Post:** 1-to-Many (`User` can author many `Posts`. A `User` can be `assignedTo` many `Posts`).
- **User ↔ Subscription:** 1-to-1 (A `User` can have one active `Subscription` and one `AdsSubscription`).
- **User ↔ Conversation:** 1-to-Many (A user acts as a `client` or `errand` in a conversation).
- **Conversation ↔ Message:** 1-to-Many (A conversation holds many messages).
- **Category ↔ Post:** 1-to-Many (A category has many posts).
- **AdCategory ↔ AdSubcategory:** 1-to-Many.
- **User ↔ Ad:** 1-to-Many.

---

## Database Migrations

Because Prisma is used, direct SQL modifications should **never** be made. 

When a schema change is required (e.g., adding a new field to `Post`):
1. Modify `prisma/schema.prisma`.
2. Run the migration command: 
   ```bash
   npx prisma migrate dev --name descriptive_name_of_change
   ```
3. Prisma will generate a `.sql` migration file in `prisma/migrations/` and apply it to the database.
4. The Prisma Client is automatically regenerated.
