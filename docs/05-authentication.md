# Authentication & Security

## Table of Contents
1. [Overview](#overview)
2. [JSON Web Tokens (JWT) & Cookies](#json-web-tokens-jwt--cookies)
3. [Registration Flow](#registration-flow)
4. [Login Flow](#login-flow)
5. [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
6. [Email Verification](#email-verification)
7. [Password Management](#password-management)
8. [Two-Factor Authentication (2FA)](#two-factor-authentication-2fa)

---

## Overview

Errand Hubb employs a robust authentication system utilizing JSON Web Tokens (JWT), HTTP-only cookies, and `bcrypt` for password hashing. The system supports multiple user roles, email verification, password resets, and optional Two-Factor Authentication (2FA).

## JSON Web Tokens (JWT) & Cookies

To protect against Cross-Site Scripting (XSS) attacks, JWTs are **not** stored in `localStorage` or `sessionStorage` on the frontend. 

Instead, upon a successful login, the backend generates a JWT and attaches it to an **HTTP-only cookie** named `Authentication`. 

- **Frontend responsibility:** The browser automatically includes this cookie in subsequent HTTP requests to the backend API.
- **Backend responsibility:** The `JwtAuthGuard` intercepts requests to protected routes, extracts the JWT from the cookie, verifies its signature using the secret key (`JWT_SECRET`), and attaches the decoded user payload to the `req.user` object.

## Registration Flow

Registration is split into specific endpoints based on the intended role.

1. **Client Registration (`POST /auth/register/client`)**
2. **ErrandR Registration (`POST /auth/register/errand`)**

**Flow:**
1. User submits email, password, and basic details.
2. The backend hashes the password via `bcrypt` (Salt rounds: 10).
3. A `User` record is created in the database with status `pending` or `active` and `isVerified` set to `false`.
4. An empty `Profile` record is automatically generated for the user.
5. A verification token is generated, and a verification email is dispatched via Nodemailer.

## Login Flow

**Endpoint:** `POST /auth/login`

1. User submits email and password.
2. Backend queries the user by email.
3. Backend compares the hashed password against the input using `bcrypt.compare`.
4. If 2FA is enabled, the backend returns a specific response requiring the client to submit a TOTP code before issuing the JWT.
5. If successful (and 2FA passed/disabled), a JWT is generated.
6. The JWT is set as an HTTP-only cookie.
7. A `LoginActivity` record is created (logging IP, device, browser via `ua-parser-js`) for security auditing.

## Role-Based Access Control (RBAC)

Authorization is managed via Custom Decorators and Guards in NestJS.

- **`@Roles(...)` Decorator:** Applied to controller methods to specify which roles can access the endpoint.
- **`RolesGuard`:** A global or route-specific guard that checks the `req.user.role` against the roles defined in the decorator.

**Example Usage (Backend):**
```typescript
import { UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.admin, UserRole.client)
@Get('dashboard-stats')
getStats() { ... }
```

## Email Verification

- Upon registration, a secure token is generated and appended to a verification link sent via email.
- The frontend route catches the token from the URL and hits the backend `POST /auth/verify-email` endpoint.
- The backend verifies the token and sets `isVerified = true` in the database.

## Password Management

### Password Reset
1. User requests a reset link (`POST /auth/forgot-password`).
2. Backend generates a `resetPasswordToken` and sets an expiration time (`resetPasswordExpires`).
3. An email is sent with the reset link.
4. User submits the new password and token (`POST /auth/reset-password`).
5. Backend verifies the token and expiration, hashes the new password, and saves it.

### Change Password
A logged-in user can change their password from their profile settings by providing their current password and the new password.

## Two-Factor Authentication (2FA)

Users can opt-in to 2FA for enhanced security.
- **Library:** `speakeasy` generates a secret and verifies Time-based One-Time Passwords (TOTP). `qrcode` generates the QR code image for Google Authenticator/Authy.
- **Setup Flow:** Backend generates a secret, saves it to the user record temporarily, and returns a QR code. User scans it, inputs the generated code, and the backend verifies it to permanently enable 2FA.
- **Recovery Codes:** A set of backup recovery codes is generated and provided to the user in case they lose access to their authenticator app.
