# Troubleshooting

## Common Problems & Solutions

### 1. CORS Errors on the Frontend

**Symptom:** The browser console shows an error like `Access to XMLHttpRequest at '...' from origin '...' has been blocked by CORS policy.`

**Cause:** The backend is not configured to allow requests from the specific frontend URL.

**Solution:**
1. Open `errand-hubb-backend/src/main.ts`.
2. Locate `app.enableCors(...)`.
3. Ensure the URL of your frontend (e.g., `http://localhost:3000` or `https://yourdomain.com`) is present in the `allowedOrigins` array.
4. Restart the backend server.

---

### 2. Database Connection Failed

**Symptom:** Backend crashes on startup or throws a `PrismaClientInitializationError`.

**Cause:** The `DATABASE_URL` in `.env` is incorrect, or the PostgreSQL service is not running.

**Solution:**
1. Verify PostgreSQL is running on your machine/server.
2. Check `errand-hubb-backend/.env` and ensure `DATABASE_URL` uses the correct username, password, host, and database name.
3. Example: `postgresql://postgres:mysecretpassword@localhost:5432/errandhub`

---

### 3. Stripe Webhooks Are Not Firing Locally

**Symptom:** You complete a test payment on the frontend, but the user's subscription status does not update in the database.

**Cause:** Stripe cannot reach your `localhost` backend to deliver the webhook event.

**Solution:**
1. Download the [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Login: `stripe login`
3. Forward events to your local backend:
   ```bash
   stripe listen --forward-to localhost:3001/api/v1/webhooks/stripe
   ```
4. The CLI will output a webhook signing secret (`whsec_...`). Copy this and paste it into `STRIPE_WEBHOOK_SECRET` in your backend `.env` file.
5. Restart the backend.

---

### 4. WebSocket (Chat) Not Connecting

**Symptom:** Real-time messages are not appearing; you have to refresh the page to see them.

**Cause:** The frontend socket client is targeting the wrong URL, or credentials (cookies) are not being passed.

**Solution:**
1. Check `NEXT_PUBLIC_SOCKET_URL` in the frontend `.env`. It should point to the base URL of the backend (e.g., `http://localhost:3001`), NOT the `/api/v1` path.
2. Ensure the socket initialization in the frontend passes `withCredentials: true` so the JWT cookie is sent for authentication.

---

### 5. Media Uploads Missing/404 on Production

**Symptom:** Images uploaded to the server load correctly locally, but return a `404 Not Found` in production or after a deployment.

**Cause:** If you are deploying via Docker or a serverless platform, the local file system is ephemeral and gets wiped on deployment.

**Solution:**
The current architecture uses `@nestjs/serve-static` which saves files locally to the `MEDIA_ROOT`. 
- **Quick Fix:** Ensure the `MEDIA_ROOT` directory exists on the VPS and is outside the git deployment folder (so it isn't overwritten).
- **Proper Fix:** Migrate file uploads (in `AdsService` or `ProfileService`) to use cloud storage like AWS S3 or Cloudinary instead of local disk storage. (See `16-future-improvements.md`).
