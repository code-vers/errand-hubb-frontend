# Environment Variables

This document lists all environment variables required for the project to function correctly. Do NOT commit actual `.env` files to version control.

---

## Frontend (`errand-hubb-frontend/.env`)

| Variable | Description | Required? | Example Value |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | The base URL for the backend API. Used by Axios. | Yes | `http://localhost:3001/api/v1` |
| `NEXT_PUBLIC_SOCKET_URL` | The base URL for the backend WebSocket Gateway. | Yes | `http://localhost:3001` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key for loading Stripe Elements. | Yes | `pk_test_...` |

> **Note:** Any variable prefixed with `NEXT_PUBLIC_` is bundled and exposed to the browser. Do not put secrets here.

---

## Backend (`errand-hubb-backend/.env`)

| Variable | Description | Required? | Example Value |
|---|---|---|---|
| `PORT` | The port the NestJS server runs on. | Yes | `3001` |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma. | Yes | `postgresql://user:password@localhost:5432/errandhub` |
| `JWT_SECRET` | Secret key used to sign and verify JSON Web Tokens. | Yes | `super_secret_string_123` |
| `JWT_EXPIRATION` | How long the JWT is valid for. | Yes | `7d` |
| `CLIENT_URL` | The URL of the frontend (used for CORS and email links). | Yes | `http://localhost:3000` |
| `MEDIA_ROOT` | Absolute path where local media uploads are saved. | Yes | `/var/www/media` or `./media` |
| `STRIPE_SECRET_KEY` | Secret key for Stripe API calls. | Yes | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Secret to verify Stripe Webhook signatures. | Yes | `whsec_...` |
| `SMTP_HOST` | Email server host. | Yes | `smtp.gmail.com` |
| `SMTP_PORT` | Email server port. | Yes | `587` |
| `SMTP_USER` | Email account username. | Yes | `youremail@example.com` |
| `SMTP_PASS` | Email account password or App Password. | Yes | `xxxx xxxx xxxx xxxx` |
| `FROM_EMAIL` | Default sender email address. | Yes | `noreply@errandhubb.com` |

### Environment Swapping
The backend repository contains `.env.live` and `.env.test`. You can swap between them using:
- `npm run pay:test`
- `npm run pay:live`
