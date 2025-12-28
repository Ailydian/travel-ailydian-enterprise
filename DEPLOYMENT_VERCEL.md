# Vercel Deployment Guide - Travel.Ailydian.com

This guide covers deploying Travel.Ailydian.com to Vercel (Recommended Platform).

## Why Vercel?

- ✅ **Optimized for Next.js**: Built by the Next.js team
- ✅ **Zero-Configuration Deployment**: Automatic builds and deployments
- ✅ **Global CDN**: Fast content delivery worldwide
- ✅ **Automatic HTTPS**: SSL certificates managed automatically
- ✅ **Environment Variables**: Secure secret management
- ✅ **Serverless Functions**: Built-in API route support
- ✅ **Preview Deployments**: Every git push gets a unique URL
- ✅ **Free Hobby Tier**: Generous free tier available

---

## Prerequisites

1. **Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)
   - Connect your GitHub/GitLab/Bitbucket account

2. **Database Setup** (Choose one)
   - **Recommended**: [Supabase](https://supabase.com) PostgreSQL (Free tier available)
   - **Alternative**: [Neon](https://neon.tech) Serverless PostgreSQL
   - **Alternative**: [PlanetScale](https://planetscale.com) MySQL (requires schema changes)

3. **Required API Keys** (See .env.production.example)
   - Stripe (Payment processing)
   - Resend or SMTP (Email delivery)
   - GROQ or OpenAI (AI features)

---

## Step 1: Prepare Your Repository

### 1.1 Create Git Repository (if not done)

```bash
cd /path/to/travel.ailydian.com
git init
git add .
git commit -m "Initial commit - Production ready"
```

### 1.2 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/travel-ailydian.git
git branch -M main
git push -u origin main
```

---

## Step 2: Database Setup (Supabase Example)

### 2.1 Create Supabase Project

1. Go to [database.new](https://database.new)
2. Create a new project
3. Save your database password securely
4. Wait for project to provision (~2 minutes)

### 2.2 Get Connection String

1. Go to **Project Settings** → **Database**
2. Copy **Connection String** (URI mode)
3. Replace `[YOUR-PASSWORD]` with your actual password

Example:
```
postgresql://postgres.abc123:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=20
```

### 2.3 Run Migrations

```bash
# Set DATABASE_URL in .env.local for development
DATABASE_URL="your_supabase_connection_string"

# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Run seed data
# npm run db:seed
```

---

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Go to [vercel.com/new](https://vercel.com/new)**

2. **Import Git Repository**
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables**
   Click "Environment Variables" and add all variables from `.env.production.example`:

   ```bash
   # REQUIRED - Database
   DATABASE_URL=postgresql://...

   # REQUIRED - Authentication
   NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
   JWT_SECRET=your_64_character_secret

   # REQUIRED - Payments
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # REQUIRED - Email
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=noreply@travel.ailydian.com

   # REQUIRED - AI (if using AI features)
   GROQ_API_KEY=gsk_...
   GROQ_PRIMARY_MODEL=llama-3.3-70b-versatile
   GROQ_FAST_MODEL=llama-3.1-8b-instant

   # OPTIONAL - Add remaining variables as needed
   ```

   **Tip**: Copy/paste all variables at once using the "Add Multiple" feature.

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~3-5 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Step 4: Configure Custom Domain

### 4.1 Add Domain in Vercel

1. Go to **Project Settings** → **Domains**
2. Add your domain: `travel.ailydian.com`
3. Add `www` subdomain: `www.travel.ailydian.com`

### 4.2 Configure DNS

Add these DNS records at your domain registrar:

#### For Vercel DNS (Recommended):

| Type | Name | Value |
|------|------|-------|
| A    | @    | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

#### For Custom DNS:

| Type | Name | Value |
|------|------|-------|
| CNAME | @ | cname.vercel-dns.com |
| CNAME | www | cname.vercel-dns.com |

**Note**: DNS propagation takes 24-48 hours

---

## Step 5: Configure Webhooks

### 5.1 Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add Endpoint"
3. Endpoint URL: `https://travel.ailydian.com/api/payments/webhook`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy **Signing Secret** → Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

### 5.2 Resend Email Domain

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add domain: `travel.ailydian.com`
3. Add DNS records (SPF, DKIM, DMARC) to your domain
4. Verify domain

---

## Step 6: Verify Deployment

### 6.1 Health Check

Visit: `https://travel.ailydian.com/api/health`

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-28T10:00:00.000Z",
  "database": "connected",
  "version": "2.0.0"
}
```

### 6.2 Test Critical Endpoints

```bash
# System status
curl https://travel.ailydian.com/api/system/status

# Search endpoint (should work without auth)
curl https://travel.ailydian.com/api/search/hotels?city=Antalya

# Admin login (should require credentials)
curl -X POST https://travel.ailydian.com/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test"}'
```

### 6.3 Database Connection

```bash
# Check if Prisma can connect
vercel env pull .env.production.local
npm run db:studio
```

---

## Step 7: Enable Monitoring

### 7.1 Vercel Analytics

1. Go to **Project Settings** → **Analytics**
2. Enable **Web Analytics**
3. Enable **Speed Insights**

### 7.2 Sentry Error Tracking

1. Create project at [sentry.io](https://sentry.io)
2. Copy DSN
3. Add to Vercel environment variables:
   ```bash
   NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
   SENTRY_AUTH_TOKEN=your_auth_token
   ```
4. Redeploy

### 7.3 Uptime Monitoring

Recommended services:
- [UptimeRobot](https://uptimerobot.com) (Free)
- [Better Uptime](https://betteruptime.com) (Free tier)
- [Pingdom](https://www.pingdom.com)

Monitor URLs:
- `https://travel.ailydian.com` (Homepage)
- `https://travel.ailydian.com/api/health` (API health)

---

## Step 8: Set Up Cron Jobs

Vercel supports cron jobs via `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/update-seo",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/check-price-alerts",
      "schedule": "*/30 * * * *"
    },
    {
      "path": "/api/cron/ping-search-engines",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

Create `vercel.json` in project root and redeploy.

**Secure cron endpoints**: Set `CRON_SECRET` environment variable and validate in API routes.

---

## Step 9: Performance Optimization

### 9.1 Enable ISR (Incremental Static Regeneration)

Already configured for:
- Car rentals: Revalidate every 1 hour
- Hotels: Revalidate every 1 day
- Tours: Revalidate every 6 hours

### 9.2 Configure Caching

Vercel automatically caches:
- Static assets (immutable)
- API routes (configurable)
- ISR pages (per revalidate config)

### 9.3 Image Optimization

Next.js Image component is already configured with:
- AVIF and WebP formats
- Responsive sizes
- Lazy loading

---

## Troubleshooting

### Build Fails

**Error**: `Module not found` or `Cannot find module`
```bash
# Solution: Clear cache and reinstall
vercel env pull
npm ci
npm run build
```

**Error**: `Database connection failed`
```bash
# Solution: Check DATABASE_URL
# Ensure it includes connection pooling: ?pgbouncer=true&connection_limit=20
```

**Error**: `TypeScript errors`
```bash
# Solution: Check build locally
npm run type-check
npm run build
```

### Deployment is Slow

- **First deploy**: 3-5 minutes (normal)
- **Subsequent deploys**: 1-3 minutes
- **Check build logs**: Vercel Dashboard → Deployments → View Logs

### Environment Variables Not Working

1. Ensure variables are added to **Production** environment
2. Redeploy after adding variables
3. Check variable names (case-sensitive)
4. Don't use quotes in Vercel dashboard

### 500 Internal Server Error

1. Check Vercel Function Logs: Dashboard → Functions → Logs
2. Check Sentry for errors
3. Verify all required env vars are set
4. Check database connection

---

## Production Checklist

Before going live, verify:

- [ ] All environment variables set in Vercel
- [ ] Custom domain configured and SSL active
- [ ] Database connected and migrations run
- [ ] Stripe webhook configured and tested
- [ ] Email sending configured (Resend domain verified)
- [ ] Sentry error tracking active
- [ ] Uptime monitoring configured
- [ ] Cron jobs scheduled (if applicable)
- [ ] Test user registration flow
- [ ] Test payment flow (Stripe test mode first!)
- [ ] Test email delivery
- [ ] Test all critical API endpoints
- [ ] Verify mobile responsiveness
- [ ] Run Lighthouse audit (score > 90)
- [ ] Check Core Web Vitals in Vercel Analytics

---

## Scaling & Limits

### Vercel Hobby (Free) Limits:
- **Bandwidth**: 100GB/month
- **Invocations**: 100 GB-Hrs
- **Builds**: 6,000 minutes/month
- **Serverless Function**: 10-second timeout
- **Edge Functions**: 1-second timeout

### Upgrade to Pro ($20/month) for:
- **Bandwidth**: 1TB/month
- **Invocations**: 1,000 GB-Hrs
- **Serverless Function**: 60-second timeout
- **Team collaboration**
- **Password protection**
- **Advanced analytics**

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

---

## Next Steps

1. ✅ **Deployment Complete**
2. ⏭️ Configure **Monitoring** (Sentry, Uptime)
3. ⏭️ Set up **Backup Strategy**
4. ⏭️ Review **Security Headers**
5. ⏭️ Plan **Rollback Strategy**
6. ⏭️ Document **Incident Response Plan**

---

**Questions?** Contact: tech@travel.ailydian.com
