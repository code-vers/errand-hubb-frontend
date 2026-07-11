# Third-Party Services

## Table of Contents
1. [Stripe (Payments & Subscriptions)](#stripe-payments--subscriptions)
2. [Nodemailer (Emails)](#nodemailer-emails)

---

## Stripe (Payments & Subscriptions)

Errand Hubb uses Stripe to handle financial transactions securely.

### Configuration
- **API Keys:** You need a Publishable Key (for the frontend) and a Secret Key (for the backend).
- **Webhooks:** Stripe Webhooks are critical. They inform the backend when an async event occurs (e.g., a subscription payment succeeds, fails, or is cancelled).

### Webhook Flow
1. User pays via Stripe Checkout on the frontend.
2. Stripe processes the payment on their servers.
3. Stripe sends an HTTP `POST` request containing the event payload to `https://your-domain.com/api/v1/webhooks/stripe`.
4. The backend `WebhooksController` intercepts this.
5. The backend **verifies the cryptographic signature** of the webhook using the `STRIPE_WEBHOOK_SECRET` to ensure it genuinely came from Stripe.
6. If valid, the backend updates the user's `Subscription` status in the PostgreSQL database.

> [!WARNING]
> Never update a user's subscription status solely based on a frontend API call. Always rely on Stripe Webhooks for security.

### Live vs. Test Environments
The backend includes scripts (`npm run pay:test` and `npm run pay:live`) to easily swap `.env` files, changing the Stripe keys between test mode and live mode.

---

## Nodemailer (Emails)

Nodemailer is used to send transactional emails (Password Resets, Email Verification, Welcome Emails).

### Configuration
The Mail Service (`src/mail/mail.service.ts`) is configured using SMTP settings provided in the `.env` file.

### Secrets Needed
- `SMTP_HOST` (e.g., smtp.gmail.com or smtp.sendgrid.net)
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS` (Use App Passwords, not your primary account password)
- `FROM_EMAIL`

### Usage in Code
The backend triggers emails asynchronously to avoid blocking the HTTP request:

```typescript
await this.mailService.sendVerificationEmail(user.email, verificationLink);
```
