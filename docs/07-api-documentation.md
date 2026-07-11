# API Documentation

## Table of Contents
1. [Base URL & Global Format](#base-url--global-format)
2. [Authentication Endpoints](#authentication-endpoints)
3. [User & Profile Endpoints](#user--profile-endpoints)
4. [Posts (Errands) Endpoints](#posts-errands-endpoints)
5. [Categories Endpoints](#categories-endpoints)
6. [Ads Endpoints](#ads-endpoints)
7. [Messages Endpoints](#messages-endpoints)

---

## Base URL & Global Format

**Base URL (Local):** `http://localhost:3001/api/v1`

**Global Success Response:**
```json
{
  "success": true,
  "data": { 
    // payload
  }
}
```

**Global Error Response:**
```json
{
  "success": false,
  "statusCode": 400,
  "timestamp": "2026-05-25T14:48:00.000Z",
  "path": "/api/v1/resource",
  "message": "Validation failed",
  "errors": ["Field must be a string"]
}
```

---

## Authentication Endpoints

> **Note:** All login/register routes do not require prior authentication.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register/client` | Register a new Client user. |
| `POST` | `/auth/register/errand` | Register a new ErrandR user. |
| `POST` | `/auth/login` | Authenticate and receive an HTTP-only JWT cookie. |
| `POST` | `/auth/logout` | Clear the JWT cookie. |
| `POST` | `/auth/verify-email` | Verify email using a token. |
| `POST` | `/auth/forgot-password` | Request a password reset link. |
| `POST` | `/auth/reset-password` | Reset password using a token. |

---

## User & Profile Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/users/me` | Yes | Get the currently authenticated user's details and profile. |
| `PATCH`| `/users/profile` | Yes | Update the user's profile details (bio, city, phone). |
| `PATCH`| `/users/change-password`| Yes | Change account password. |

---

## Posts (Errands) Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/posts` | No | Get a paginated list of active posts. |
| `GET` | `/posts/:id` | No | Get details of a specific post. |
| `POST` | `/posts` | Yes (Client) | Create a new post/errand. |
| `PATCH`| `/posts/:id` | Yes (Owner) | Update an existing post. |
| `DELETE`| `/posts/:id` | Yes (Owner) | Delete a post. |

---

## Categories Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/categories` | No | List all active categories. |
| `POST` | `/categories` | Yes (Admin) | Create a new category. |

---

## Ads Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/ads` | No | List public advertisements. |
| `POST` | `/ads` | Yes | Create an advertisement (requires active AdsSubscription). |
| `GET` | `/ads-subscriptions/status` | Yes | Get current user's ads subscription status. |

---

## Messages Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/messages/conversations` | Yes | Get all conversations for the current user. |
| `GET` | `/messages/:conversationId` | Yes | Get message history for a specific conversation. |
| `POST` | `/messages` | Yes | Send a message (Triggers WebSocket event). |

---

> **Note:** This document provides a high-level overview. For exact payload structures (DTOs), refer to the backend source code in `src/[module]/dto/*.dto.ts`.
