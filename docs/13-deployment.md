# Deployment Guide

## Table of Contents
1. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
2. [Backend Deployment (VPS / PM2)](#backend-deployment-vps--pm2)
3. [Database Deployment](#database-deployment)

---

## Frontend Deployment (Vercel)

The Next.js frontend is optimized for deployment on Vercel.

1. **Connect Repository:** Log in to Vercel and import your GitHub repository.
2. **Select Framework:** Choose Next.js.
3. **Root Directory:** Set the root directory to `errand-hubb-frontend`.
4. **Environment Variables:** Add all production environment variables from your local `.env` file (e.g., `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`).
5. **Deploy:** Click Deploy. Vercel automatically handles the build (`npm run build`) and deployment.

---

## Backend Deployment (VPS / PM2)

For the NestJS backend, you typically use a Virtual Private Server (VPS) like DigitalOcean, AWS EC2, or Hetzner, running Ubuntu.

### Prerequisites
- Node.js (v18+) and npm installed.
- PM2 installed globally (`npm install -g pm2`).
- Nginx installed.
- PostgreSQL database accessible.

### Steps
1. **Clone & Install:**
   ```bash
   git clone <repo_url>
   cd errand-hubb-backend
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file containing your production database URL, JWT secrets, and SMTP configurations.

3. **Database Migrations:**
   Run Prisma migrations to apply the schema to your production DB.
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

4. **Build:**
   ```bash
   npm run build
   ```

5. **Start with PM2:**
   ```bash
   pm2 start dist/src/main.js --name "errand-backend"
   pm2 save
   pm2 startup
   ```

6. **Nginx Reverse Proxy:**
   Configure Nginx to route traffic from `api.yourdomain.com` to `localhost:3001` (or whatever `PORT` you specified).
   ```nginx
   server {
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **SSL Certificate:**
   Use Certbot (Let's Encrypt) to secure your API with HTTPS.

---

## Database Deployment

You can host your PostgreSQL database on a managed service for reliability:
- AWS RDS
- Supabase
- Neon
- Render Database

Ensure the connection string provided by the hosting provider is securely placed in your backend's `.env` file under `DATABASE_URL`.
