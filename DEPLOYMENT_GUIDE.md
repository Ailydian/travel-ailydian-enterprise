# 🚀 Travel LyDian Enterprise - Production Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Database Setup (Supabase)](#database-setup-supabase)
3. [Environment Variables Configuration](#environment-variables-configuration)
4. [Prisma Migrations](#prisma-migrations)
5. [External Services Setup](#external-services-setup)
6. [Vercel Deployment](#vercel-deployment)
7. [Post-Deployment Tasks](#post-deployment-tasks)
8. [Testing Checklist](#testing-checklist)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts & Services
- [ ] Node.js 18+ and npm/pnpm installed
- [ ] Git repository access
- [ ] Vercel account (for hosting)
- [ ] Supabase account (for PostgreSQL database)
- [ ] Cloudinary account (for image/video storage)
- [ ] AWS account (for S3 video storage)
- [ ] Stripe account (for international payments)
- [ ] PayTR account (for Turkish payments)
- [ ] SendGrid account (for email service)
- [ ] Twilio account (for SMS service)
- [ ] Meta Developer account (for WhatsApp Business API)
- [ ] Google Cloud Console (for Maps, Places, Analytics)

### Required API Keys
You'll need to obtain API keys from each service during setup.

---

## Database Setup (Supabase)

### Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in project details:
   - **Name:** travel-lydian-enterprise
   - **Database Password:** Generate a strong password (save it!)
   - **Region:** Choose closest to your users (eu-central-1 recommended)
   - **Pricing Plan:** Pro Plan recommended for production

4. Wait 2-3 minutes for project creation

### Step 2: Get Database Connection String

1. In Supabase dashboard, go to **Settings** → **Database**
2. Under "Connection string", select **URI** format
3. Copy the connection string, it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
4. Replace `[YOUR-PASSWORD]` with your actual password
5. Add `?pgbouncer=true&connection_limit=1` to the end for connection pooling

**Example:**
```
postgresql://postgres:MyStr0ngP@ssw0rd@db.abcdefghijk.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

### Step 3: Enable Required Extensions

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for geospatial queries
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Enable pg_trgm for fuzzy text search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Enable unaccent for Turkish character search
CREATE EXTENSION IF NOT EXISTS "unaccent";
```

---

## Environment Variables Configuration

### Step 1: Create .env File

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

### Step 2: Database Configuration

```bash
# Use the connection string from Supabase
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"

# For Prisma migrations, use direct connection (without pgbouncer)
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres"
```

### Step 3: Core Application

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://travel.lydian.com
NEXT_PUBLIC_API_URL=https://travel.lydian.com/api
```

### Step 4: NextAuth Configuration

Generate secure secrets:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

```bash
NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=https://travel.lydian.com
JWT_SECRET=your_jwt_secret_here
```

---

## Prisma Migrations

### Step 1: Install Dependencies

```bash
npm install
# or
pnpm install
```

### Step 2: Generate Prisma Client

```bash
npx prisma generate
```

### Step 3: Run Migrations

```bash
# Push schema to database (first time setup)
npx prisma db push

# Or create and run migration
npx prisma migrate deploy
```

### Step 4: Verify Database

```bash
# Open Prisma Studio to verify tables
npx prisma studio
```

You should see all 50+ tables created including:
- Users, Accounts, Sessions
- Bookings, Reviews, Favorites
- LyDianMilesAccount, MilesTransaction
- WhatsAppConversation, WhatsAppMessage
- VideoReview, VirtualTour
- SEOLandingPage
- PartnerProfile, PartnerListing
- And many more...

---

## External Services Setup

### 1. WhatsApp Business API

#### Step 1: Create Meta Business Account
1. Go to https://business.facebook.com
2. Create a new business account
3. Verify your business

#### Step 2: Create WhatsApp Business App
1. Go to https://developers.facebook.com
2. Create new app → **Business** type
3. Add **WhatsApp** product
4. Complete business verification (can take 1-3 days)

#### Step 3: Get Credentials
1. Go to WhatsApp → **API Setup**
2. Copy these values:
   - Phone Number ID
   - WhatsApp Business Account ID
   - Access Token (generate permanent token)

#### Step 4: Setup Webhook
1. In WhatsApp settings, go to **Configuration** → **Webhook**
2. Set callback URL: `https://travel.lydian.com/api/whatsapp/webhook`
3. Set verify token: `travel_lydian_verify_token_2024`
4. Subscribe to fields: `messages`, `message_status`

#### Environment Variables:
```bash
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_permanent_access_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=travel_lydian_verify_token_2024
WHATSAPP_APP_SECRET=your_app_secret
```

---

### 2. Cloudinary (Images & 360° Tours)

#### Step 1: Create Account
1. Go to https://cloudinary.com/users/register/free
2. Sign up for free (25GB storage, 25GB bandwidth)

#### Step 2: Get Credentials
1. Go to **Dashboard**
2. Copy: Cloud Name, API Key, API Secret

#### Step 3: Create Upload Preset
1. Go to **Settings** → **Upload**
2. Click **Add upload preset**
3. Name: `lydian_preset`
4. Signing Mode: **Unsigned**
5. Folder: `lydian`

#### Environment Variables:
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=lydian_preset
```

---

### 3. AWS S3 (Video Storage)

#### Step 1: Create IAM User
1. Go to AWS Console → **IAM**
2. Create new user: `lydian-video-uploader`
3. Attach policy: `AmazonS3FullAccess`
4. Save Access Key ID and Secret Access Key

#### Step 2: Create S3 Bucket
1. Go to **S3** → Create bucket
2. Name: `lydian-videos`
3. Region: `eu-central-1`
4. Uncheck "Block all public access" (for video delivery)
5. Enable versioning

#### Step 3: Configure CORS
Add this CORS configuration to your bucket:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://travel.lydian.com"],
    "ExposeHeaders": ["ETag"]
  }
]
```

#### Environment Variables:
```bash
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET_NAME=lydian-videos
AWS_S3_REGION=eu-central-1
AWS_S3_BUCKET_URL=https://lydian-videos.s3.eu-central-1.amazonaws.com
```

---

### 4. Stripe (International Payments)

#### Step 1: Create Account
1. Go to https://dashboard.stripe.com/register
2. Complete business verification

#### Step 2: Get API Keys
1. Go to **Developers** → **API keys**
2. Copy: Publishable key, Secret key

#### Step 3: Setup Webhook
1. Go to **Developers** → **Webhooks**
2. Add endpoint: `https://travel.lydian.com/api/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
4. Copy webhook signing secret

#### Environment Variables:
```bash
STRIPE_PUBLIC_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

---

### 5. PayTR (Turkish Payment Gateway)

#### Step 1: Create Merchant Account
1. Go to https://www.paytr.com
2. Apply for merchant account
3. Complete business verification (1-2 weeks)

#### Step 2: Get Credentials
1. Login to PayTR Panel
2. Go to **Ayarlar** → **Bilgilerim**
3. Copy: Merchant ID, Merchant Key, Merchant Salt

#### Environment Variables:
```bash
PAYTR_MERCHANT_ID=your_merchant_id
PAYTR_MERCHANT_KEY=your_merchant_key
PAYTR_MERCHANT_SALT=your_merchant_salt
```

---

### 6. SendGrid (Email Service)

#### Step 1: Create Account
1. Go to https://signup.sendgrid.com
2. Sign up (free tier: 100 emails/day)

#### Step 2: Create API Key
1. Go to **Settings** → **API Keys**
2. Create API Key with **Full Access**
3. Copy and save the key (shown only once!)

#### Step 3: Verify Sender Email
1. Go to **Settings** → **Sender Authentication**
2. Add sender: `noreply@travel.lydian.com`
3. Verify via email link

#### Step 4: Setup Domain Authentication (Optional but recommended)
1. Go to **Settings** → **Sender Authentication** → **Authenticate Your Domain**
2. Follow DNS setup instructions for `travel.lydian.com`

#### Environment Variables:
```bash
SENDGRID_API_KEY=SG.your_api_key
EMAIL_FROM=noreply@travel.lydian.com
EMAIL_FROM_NAME=Travel LyDian
```

---

### 7. Twilio (SMS Service)

#### Step 1: Create Account
1. Go to https://www.twilio.com/try-twilio
2. Sign up and verify your phone number

#### Step 2: Get Credentials
1. Go to **Console Dashboard**
2. Copy: Account SID, Auth Token

#### Step 3: Get Phone Number
1. Go to **Phone Numbers** → **Buy a number**
2. Choose a Turkish number (+90) for SMS
3. Enable SMS capabilities

#### Environment Variables:
```bash
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+905551234567
```

---

### 8. Google Services

#### Step 1: Create Project
1. Go to https://console.cloud.google.com
2. Create new project: `travel-lydian`

#### Step 2: Enable APIs
Enable these APIs:
- Maps JavaScript API
- Places API
- Geocoding API

#### Step 3: Create API Key
1. Go to **APIs & Services** → **Credentials**
2. Create credentials → **API Key**
3. Restrict key to your domain: `travel.lydian.com`
4. Restrict to: Maps, Places, Geocoding APIs

#### Step 4: Google Analytics
1. Go to https://analytics.google.com
2. Create property for `travel.lydian.com`
3. Copy Measurement ID (G-XXXXXXXXXX)

#### Environment Variables:
```bash
GOOGLE_MAPS_API_KEY=your_maps_api_key
GOOGLE_PLACES_API_KEY=your_places_api_key
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

### 9. AI Services (Optional)

#### OpenAI (for AI Content Writer)
```bash
OPENAI_API_KEY=sk-your_openai_key
```

#### Groq (for Neural Search)
```bash
GROQ_API_KEY=your_groq_api_key
```

#### Google AI (Gemini)
```bash
GOOGLE_AI_API_KEY=your_google_ai_key
```

---

## Vercel Deployment

### Step 1: Connect Repository

1. Go to https://vercel.com
2. Click **New Project**
3. Import your Git repository
4. Framework: **Next.js** (auto-detected)

### Step 2: Configure Build Settings

```bash
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Step 3: Add Environment Variables

In Vercel dashboard → **Settings** → **Environment Variables**, add all variables from your `.env` file.

**Important:** Add these to **Production** environment.

### Step 4: Deploy

1. Click **Deploy**
2. Wait 3-5 minutes for build to complete
3. Note your deployment URL: `travel-lydian-enterprise.vercel.app`

### Step 5: Add Custom Domain

1. Go to **Settings** → **Domains**
2. Add domain: `travel.lydian.com`
3. Follow DNS configuration instructions:

```
Type: CNAME
Name: travel
Value: cname.vercel-dns.com
```

4. Wait for DNS propagation (5-30 minutes)

---

## Post-Deployment Tasks

### 1. Seed Database with Initial Data

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@lydian.com',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create sample hotel
  const hotel = await prisma.hotel.create({
    data: {
      name: 'Grand Hilton Istanbul',
      slug: 'grand-hilton-istanbul',
      description: 'Lüks 5 yıldızlı otel',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Harbiye, Cumhuriyet Cd., 34367 Şişli/İstanbul',
      rating: 4.8,
      stars: 5,
      pricePerNight: 2500,
      currency: 'TRY',
      images: ['https://via.placeholder.com/800x600'],
      amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant'],
      isActive: true,
      isFeatured: true,
    },
  });

  console.log('✅ Sample hotel created:', hotel.name);

  // Create loyalty tiers
  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run seed:
```bash
npx prisma db seed
```

### 2. Test WhatsApp Integration

Send a test message:
```bash
curl -X POST "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "905551234567",
    "type": "template",
    "template": {
      "name": "hello_world",
      "language": { "code": "en_US" }
    }
  }'
```

### 3. Setup SEO Landing Pages

Run the SEO page generator:
```bash
npm run generate-seo-pages
```

This will create 100+ SEO landing pages for cities, hotels, tours, etc.

### 4. Configure Cron Jobs

In Vercel, add these cron jobs (`vercel.json`):

```json
{
  "crons": [
    {
      "path": "/api/cron/generate-seo-pages",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/process-payouts",
      "schedule": "0 9 15 * *"
    },
    {
      "path": "/api/cron/expire-miles",
      "schedule": "0 0 1 * *"
    }
  ]
}
```

---

## Testing Checklist

### Core Features
- [ ] User registration and login works
- [ ] Hotel search returns results
- [ ] Booking flow completes successfully
- [ ] Payment processing works (Stripe & PayTR)
- [ ] Email confirmations are sent
- [ ] SMS notifications work

### Advanced Features
- [ ] LyDian Miles are earned on bookings
- [ ] Miles can be redeemed for discounts
- [ ] Tier upgrades work correctly
- [ ] WhatsApp messages are received and replied
- [ ] Video reviews can be uploaded
- [ ] 360° virtual tours display correctly
- [ ] SEO landing pages are accessible
- [ ] Partner dashboard shows correct data

### Performance
- [ ] Homepage loads in < 2 seconds
- [ ] Search results load in < 3 seconds
- [ ] Images are optimized (WebP format)
- [ ] Lighthouse score > 90

### Security
- [ ] HTTPS is enabled
- [ ] API routes are protected
- [ ] SQL injection protected (Prisma)
- [ ] XSS protection enabled
- [ ] CSRF protection enabled

---

## Troubleshooting

### Database Connection Issues

**Problem:** `Error: P1001: Can't reach database server`

**Solutions:**
1. Check if Supabase project is paused (free tier pauses after 1 week inactivity)
2. Verify DATABASE_URL is correct
3. Check if IP is whitelisted in Supabase settings
4. Add `?connection_limit=1` to connection string

### Prisma Migration Errors

**Problem:** `Error: P3009: Failed to create table`

**Solutions:**
1. Drop all tables and re-run migrations:
   ```bash
   npx prisma migrate reset
   ```
2. Use `db push` for development:
   ```bash
   npx prisma db push
   ```

### Vercel Build Failures

**Problem:** Build times out or fails

**Solutions:**
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Clear build cache: **Settings** → **General** → **Clear Build Cache**
4. Check `package.json` for missing dependencies

### WhatsApp Webhook Not Working

**Problem:** Messages not received

**Solutions:**
1. Verify webhook URL is publicly accessible
2. Check webhook verify token matches
3. Test webhook with Postman
4. Check WhatsApp dashboard for errors

### Payment Failures

**Problem:** Stripe payments fail

**Solutions:**
1. Use test cards: `4242 4242 4242 4242`
2. Check webhook is receiving events
3. Verify webhook signing secret is correct
4. Check Stripe dashboard for detailed errors

---

## Support & Maintenance

### Monitoring Tools
- **Vercel Analytics:** Built-in analytics
- **Sentry:** Error tracking (optional)
- **LogRocket:** Session replay (optional)
- **Google Analytics:** User analytics

### Backup Strategy
1. **Database:** Supabase provides automated daily backups
2. **Media Files:** AWS S3 has versioning enabled
3. **Code:** Git repository on GitHub/GitLab

### Update Schedule
- **Security updates:** Weekly
- **Feature updates:** Bi-weekly
- **Dependency updates:** Monthly

---

## Production Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Database migrated and seeded
- [ ] All external services tested
- [ ] Custom domain configured and working
- [ ] SSL certificate active (automatic with Vercel)
- [ ] SEO pages generated
- [ ] Analytics tracking active
- [ ] Error monitoring setup
- [ ] Backup strategy in place
- [ ] Legal pages added (Privacy Policy, Terms of Service)
- [ ] GDPR compliance implemented (for EU users)
- [ ] KVKK compliance implemented (for Turkish users)

---

## Next Steps After Deployment

1. **Marketing Launch:**
   - Submit to Google Search Console
   - Submit to Bing Webmaster Tools
   - Create social media accounts
   - Start content marketing

2. **Monitor & Optimize:**
   - Monitor error logs daily
   - Check performance metrics weekly
   - Optimize slow queries
   - Add caching where needed

3. **User Feedback:**
   - Collect user feedback
   - Fix critical bugs immediately
   - Plan feature updates based on feedback

4. **Scale:**
   - Monitor database performance
   - Upgrade Supabase plan if needed
   - Add CDN for static assets
   - Implement caching strategy (Redis)

---

## Contact & Support

For deployment issues:
- Email: support@lydian.com
- GitHub Issues: https://github.com/lydian/travel-enterprise/issues

---

**Last Updated:** December 22, 2024
**Version:** 1.0.0
**Author:** Travel LyDian Team
