# 🚀 VERCEL DEPLOYMENT GUIDE - Travel.Ailydian.com

## 📋 PRE-DEPLOYMENT CHECKLIST

### ✅ **1. DOMAIN CONFIGURATION**

#### **A. Vercel Dashboard**
1. Go to: https://vercel.com/your-team/travel-ailydian-enterprise/settings/domains
2. Add custom domain: `travel.ailydian.com`
3. Add www variant: `www.travel.ailydian.com`
4. Vercel will provide DNS records

#### **B. DNS Configuration (Your Domain Provider)**
Add these records to your DNS:

```
Type    Name    Value
A       @       76.76.21.21 (Vercel's IP)
CNAME   www     cname.vercel-dns.com
```

**OR** if using Vercel nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

---

## 🔐 **2. ENVIRONMENT VARIABLES SETUP**

### **Critical Variables (MUST CONFIGURE)**

Go to: `Vercel Dashboard → Settings → Environment Variables`

#### **Database (Supabase)**
```bash
# 1. Create Supabase project: https://supabase.com/dashboard
# 2. Get connection strings from: Settings → Database

DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

**⚠️ Important Notes:**
- `DATABASE_URL`: Uses port **6543** (PgBouncer for connection pooling)
- `DIRECT_URL`: Uses port **5432** (Direct connection for migrations)
- Replace `[PASSWORD]` with your database password
- Replace `[PROJECT-REF]` with your project reference

#### **Authentication (NextAuth.js)**
```bash
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="[YOUR-RANDOM-SECRET-HERE]"
NEXTAUTH_URL="https://travel.ailydian.com"

# Generate with: openssl rand -base64 32
JWT_SECRET="[YOUR-JWT-SECRET-HERE]"
```

#### **Email Service (Resend)**
```bash
# Get from: https://resend.com/api-keys
RESEND_API_KEY="re_[YOUR-API-KEY]"
RESEND_FROM_EMAIL="noreply@travel.ailydian.com"
RESEND_SUPPORT_EMAIL="support@travel.ailydian.com"
```

**Setup Steps:**
1. Create Resend account: https://resend.com
2. Verify your domain: `travel.ailydian.com`
3. Add these DNS records:
```
TXT  @  resend._domainkey  (provided by Resend)
```

#### **Payment (Stripe)**
```bash
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_PUBLIC_KEY="pk_live_[YOUR-PUBLIC-KEY]"
STRIPE_SECRET_KEY="sk_live_[YOUR-SECRET-KEY]"

# Webhook secret (create webhook endpoint first)
STRIPE_WEBHOOK_SECRET="whsec_[YOUR-WEBHOOK-SECRET]"
```

**Webhook Configuration:**
1. Go to: https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://travel.ailydian.com/api/payments/webhook`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`

### **Optional but Recommended**

#### **AI Services**
```bash
# OpenAI (for AI recommendations)
OPENAI_API_KEY="sk-[YOUR-OPENAI-KEY]"
OPENAI_MODEL="gpt-4-turbo-preview"
OPENAI_FALLBACK_MODEL="gpt-3.5-turbo"

# Groq (for fast AI responses)
GROQ_API_KEY="gsk_[YOUR-GROQ-KEY]"
GROQ_PRIMARY_MODEL="llama-3.3-70b-versatile"
GROQ_FAST_MODEL="llama-3.1-8b-instant"
```

#### **Maps & Location**
```bash
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza[YOUR-GOOGLE-MAPS-KEY]"

# Mapbox
MAPBOX_ACCESS_TOKEN="pk.[YOUR-MAPBOX-TOKEN]"
```

#### **Monitoring (Sentry)**
```bash
# Get from: https://sentry.io/settings/
NEXT_PUBLIC_SENTRY_DSN="https://[KEY]@[DOMAIN]/[PROJECT-ID]"
SENTRY_AUTH_TOKEN="[YOUR-AUTH-TOKEN]"
SENTRY_ORG="ailydian"
SENTRY_PROJECT="travel-lydian"
```

#### **Analytics**
```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-[YOUR-GA-ID]"
```

#### **Cloud Storage (Cloudinary)**
```bash
CLOUDINARY_CLOUD_NAME="[YOUR-CLOUD-NAME]"
CLOUDINARY_API_KEY="[YOUR-API-KEY]"
CLOUDINARY_API_SECRET="[YOUR-API-SECRET]"
```

#### **Rate Limiting (Upstash Redis)**
```bash
# Get from: https://console.upstash.com/
UPSTASH_REDIS_REST_URL="https://[YOUR-ENDPOINT].upstash.io"
UPSTASH_REDIS_REST_TOKEN="[YOUR-TOKEN]"
```

### **Public Environment Variables**
```bash
NODE_ENV="production"
NEXT_PUBLIC_SITE_URL="https://travel.ailydian.com"
NEXT_PUBLIC_API_URL="https://travel.ailydian.com/api"
```

### **Feature Flags**
```bash
ENABLE_AI_RECOMMENDATIONS="true"
ENABLE_BLOCKCHAIN_FEATURES="false"  # Demo only
ENABLE_METAVERSE_TOURS="false"      # Demo only
ENABLE_NFT_MARKETPLACE="false"      # Demo only
ENABLE_QUANTUM_SEARCH="false"       # Demo only
```

---

## 🗄️ **3. DATABASE SETUP**

### **A. Create Supabase Project**
1. Go to: https://supabase.com/dashboard
2. Click "New Project"
3. Choose region: **East US** (closest to Vercel)
4. Set strong password
5. Wait for setup (~2 minutes)

### **B. Run Migrations**

**Option 1: Via Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy
```

**Option 2: Via GitHub Actions**
Create `.github/workflows/migrate.yml`:
```yaml
name: Database Migration
on:
  push:
    branches: [main]
    paths:
      - 'prisma/**'

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### **C. Seed Initial Data (Optional)**
```bash
npm run db:seed
```

---

## 🚀 **4. DEPLOYMENT STEPS**

### **Method 1: Automatic (GitHub Integration)**

1. **Connect GitHub Repository**
   - Go to: https://vercel.com/new
   - Import Git Repository
   - Select: `your-org/travel-ailydian-enterprise`

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build:vercel
   Output Directory: .next
   Install Command: npm install
   ```

3. **Set Environment Variables**
   - Copy all variables from section #2 above
   - Set each one in Vercel Dashboard

4. **Deploy**
   - Click "Deploy"
   - Wait for build (~5-10 minutes)
   - Check build logs for errors

### **Method 2: Manual (Vercel CLI)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

---

## 🔍 **5. POST-DEPLOYMENT VERIFICATION**

### **A. Health Checks**

1. **Homepage**
   - Visit: https://travel.ailydian.com
   - Should load without errors
   - Check browser console

2. **API Health**
   - Visit: https://travel.ailydian.com/api/health
   - Should return: `{"status": "healthy"}`

3. **Database Connection**
   - Visit: https://travel.ailydian.com/api/health/db
   - Should return: `{"connected": true, "latency": <50ms}`

4. **Authentication**
   - Visit: https://travel.ailydian.com/auth/signin
   - Should show sign-in page

### **B. Feature Testing**

- [ ] Homepage loads
- [ ] Search functionality works
- [ ] Hotel/Tour listings display
- [ ] Booking flow works
- [ ] Payment integration functional
- [ ] Email sending works
- [ ] Maps display correctly
- [ ] i18n switching (TR/EN)
- [ ] Mobile responsive
- [ ] Performance (Lighthouse > 90)

### **C. Monitoring Setup**

1. **Sentry Error Tracking**
   - Verify errors are captured
   - Test with intentional error

2. **Analytics**
   - Verify Google Analytics tracking
   - Check Real-Time reports

3. **Vercel Analytics**
   - Enable in Vercel Dashboard
   - Monitor Web Vitals

---

## 🐛 **6. COMMON ISSUES & FIXES**

### **Issue: "Database connection failed"**

**Solution:**
1. Verify `DATABASE_URL` format is correct
2. Check Supabase project is running
3. Verify IP allowlist in Supabase (should allow all: `0.0.0.0/0`)
4. Test connection locally:
```bash
npx prisma db pull
```

### **Issue: "Module not found" errors**

**Solution:**
1. Clear build cache:
```bash
vercel build --force
```
2. Verify `package.json` has all dependencies
3. Check Node.js version matches (20.x)

### **Issue: "Environment variable not defined"**

**Solution:**
1. Go to Vercel Dashboard → Environment Variables
2. Verify variable is set for "Production" environment
3. Redeploy:
```bash
vercel --prod --force
```

### **Issue: "Serverless Function timeout"**

**Solution:**
1. Upgrade Vercel plan for longer timeouts (Pro: 60s, Enterprise: 900s)
2. Optimize slow queries
3. Add caching:
```typescript
export const config = {
  maxDuration: 60, // Pro plan
};
```

### **Issue: "Domain not working"**

**Solution:**
1. Check DNS propagation: https://dnschecker.org
2. Verify SSL certificate issued (can take 5-60 minutes)
3. Try `https://` instead of `http://`
4. Clear browser cache
5. Check domain config in Vercel:
```bash
vercel domains ls
```

### **Issue: "Build fails on Prisma"**

**Solution:**
1. Verify `postinstall` script in `package.json`:
```json
"postinstall": "prisma generate"
```
2. Check Prisma schema syntax:
```bash
npx prisma validate
```
3. Verify `@prisma/client` version matches `prisma` version

---

## 📊 **7. PERFORMANCE OPTIMIZATION**

### **A. Enable Edge Caching**
```typescript
// In API routes
export const config = {
  runtime: 'edge', // Use Edge Runtime where possible
};

// Add cache headers
return new Response(JSON.stringify(data), {
  headers: {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  },
});
```

### **B. Image Optimization**
- Already configured in `next.config.js`
- Use `next/image` component
- Enable AVIF format

### **C. Code Splitting**
- Implemented in `next.config.js`
- Verify chunks in build output:
```bash
npm run analyze
```

---

## 🔒 **8. SECURITY CHECKLIST**

- [ ] HTTPS enforced (automatic with Vercel)
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] API rate limiting enabled
- [ ] CORS configured properly
- [ ] CSP headers active (check `next.config.js`)
- [ ] Sensitive data not in client bundle
- [ ] Webhook signatures verified
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection enabled

---

## 📈 **9. MONITORING & MAINTENANCE**

### **Daily Tasks**
- Check Vercel Analytics
- Review Sentry errors
- Monitor Supabase usage

### **Weekly Tasks**
- Review slow queries
- Check API response times
- Update dependencies:
```bash
npm outdated
npm update
```

### **Monthly Tasks**
- Review and rotate secrets
- Database backup verification
- Performance audit (Lighthouse)
- Security audit

---

## 🆘 **10. EMERGENCY PROCEDURES**

### **Rollback Deployment**
```bash
# Via Vercel Dashboard
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

# Via CLI
vercel rollback
```

### **Database Restore**
```bash
# Supabase automatic backups (daily)
1. Go to Supabase Dashboard → Database → Backups
2. Select backup point
3. Click "Restore"
```

### **Check System Status**
- Vercel: https://www.vercel-status.com
- Supabase: https://status.supabase.com
- Stripe: https://status.stripe.com

---

## ✅ **FINAL CHECKLIST**

Before going live:

- [ ] All critical environment variables set
- [ ] Database migrations run successfully
- [ ] Domain DNS configured and propagated
- [ ] SSL certificate issued
- [ ] Email delivery tested
- [ ] Payment processing tested (test mode)
- [ ] Error tracking verified (Sentry)
- [ ] Analytics tracking verified
- [ ] Performance tested (Lighthouse score > 90)
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed
- [ ] Backup strategy in place
- [ ] Monitoring alerts configured
- [ ] Team access configured
- [ ] Documentation updated

---

## 📞 **SUPPORT RESOURCES**

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Project Issues**: Create ticket in GitHub repo

---

## 🎉 **SUCCESS!**

If all checks pass, your application is live at:
- **Primary**: https://travel.ailydian.com
- **WWW**: https://www.travel.ailydian.com

**Next Steps:**
1. Monitor for 24-48 hours
2. Collect user feedback
3. Iterate and improve

---

*Generated by Travel.LyDian DevOps Team*
*Last Updated: 2024-12-28*
