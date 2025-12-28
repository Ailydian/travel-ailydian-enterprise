# Quick Start: Environment Setup for Vercel Deployment

**Target Platform**: Vercel Production
**Estimated Time**: 30-45 minutes
**Difficulty**: Intermediate

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Generate Secrets
```bash
chmod +x scripts/env-setup.sh
./scripts/env-setup.sh
```

**Output**: `.env.vercel.production` created with auto-generated secrets

### Step 2: Review Generated File
```bash
cat .env.vercel.production | grep "GENERATED"
```

**Expected Output**:
```
✅ NEXTAUTH_SECRET: [44 chars, cryptographically secure]
✅ JWT_SECRET: [88 chars, cryptographically secure]
✅ REFRESH_SECRET: [88 chars, cryptographically secure]
✅ CRON_SECRET: [44 chars, cryptographically secure]
✅ INDEXNOW_KEY: [32 hex chars]
```

---

## 📝 Required Configuration (30 Minutes)

### Priority 1: Database (5 min)

**Choose a provider**:
- [Supabase](https://supabase.com) (Recommended - Free tier)
- [Neon](https://neon.tech) (Serverless Postgres)
- [Railway](https://railway.app) (Simple deployment)

**Steps**:
1. Create account and new project
2. Copy PostgreSQL connection string
3. Update in `.env.vercel.production`:
   ```bash
   DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public&connection_limit=20&pool_timeout=10
   ```

---

### Priority 2: Stripe Payment (10 min)

**Setup**:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Complete account setup
3. Switch to **LIVE MODE** (toggle in top-right)
4. Navigate to: Developers → API Keys

**Get Keys**:
```
STRIPE_SECRET_KEY: sk_live_... (click "Reveal test key")
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: pk_live_...
```

5. Navigate to: Developers → Webhooks
6. Add endpoint: `https://travel.ailydian.com/api/webhooks/stripe`
7. Copy signing secret:
   ```
   STRIPE_WEBHOOK_SECRET: whsec_...
   ```

**Update `.env.vercel.production`**:
```bash
STRIPE_SECRET_KEY=sk_live_YOUR_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

---

### Priority 3: Email (Resend) (5 min)

**Setup**:
1. Go to [Resend](https://resend.com/signup)
2. Verify your email
3. Add domain: `travel.ailydian.com`
4. Complete DNS verification (add TXT, MX, CNAME records)
5. Generate API key: Settings → API Keys → Create

**Update `.env.vercel.production`**:
```bash
RESEND_API_KEY=re_YOUR_KEY_HERE
```

---

### Priority 4: AI Service (Groq) (5 min)

**Setup**:
1. Go to [Groq Console](https://console.groq.com/keys)
2. Create account (free tier available)
3. Generate API key

**Update `.env.vercel.production`**:
```bash
GROQ_API_KEY=gsk_YOUR_KEY_HERE
AI_INFERENCE_KEY=gsk_YOUR_KEY_HERE
```

---

### Priority 5: Redis Cache (5 min)

**Setup**:
1. Go to [Upstash Console](https://console.upstash.com)
2. Create Redis database (choose region close to users)
3. Copy REST URL and Token

**Update `.env.vercel.production`**:
```bash
UPSTASH_REDIS_REST_URL=https://YOUR_URL.upstash.io
UPSTASH_REDIS_REST_TOKEN=YOUR_TOKEN_HERE
```

---

## ✅ Validation (2 Minutes)

### Run Validator
```bash
chmod +x scripts/env-validator.sh
./scripts/env-validator.sh --report
```

### Expected Results
```
Total Checks:  31
Passed:        25+ (80%+)
Warnings:      <5
Errors:        0

Status: ✅ VALIDATION PASSED
```

### View HTML Report
```bash
open validation-reports/validation-report-*.html
```

---

## 🚢 Deploy to Vercel (10 Minutes)

### Option 1: Vercel Dashboard (Easiest)

1. **Login to Vercel**:
   ```bash
   open https://vercel.com/dashboard
   ```

2. **Select Project**:
   - Click on your project
   - Go to: Settings → Environment Variables

3. **Copy Variables**:
   - Open `.env.vercel.production`
   - Copy each variable name and value
   - Paste into Vercel dashboard
   - Set scope: **Production**
   - Click "Save"

4. **Deploy**:
   - Go to: Deployments
   - Click: "Redeploy" with latest commit

---

### Option 2: Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project (first time)
vercel link

# Add environment variables
vercel env add NEXTAUTH_SECRET production
# Paste: [your generated secret]

vercel env add DATABASE_URL production
# Paste: [your database URL]

# Repeat for all REQUIRED variables

# Deploy
vercel --prod
```

---

## 🎯 Post-Deployment Verification

### 1. Check Deployment Status
```bash
vercel ls
```

### 2. Test API Health
```bash
curl https://travel.ailydian.com/api/health
```

**Expected Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-12-28T15:14:23.000Z",
  "services": {
    "database": "connected",
    "redis": "connected",
    "stripe": "configured",
    "email": "configured"
  }
}
```

### 3. Verify Sentry Integration
1. Go to [Sentry Dashboard](https://sentry.io)
2. Check for initial deployment event
3. Verify error tracking is active

### 4. Test Stripe Webhooks
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Listen to webhooks
stripe listen --forward-to https://travel.ailydian.com/api/webhooks/stripe

# Trigger test event
stripe trigger payment_intent.succeeded
```

---

## 📋 Checklist

### Required Setup
- [ ] Database configured (PostgreSQL)
- [ ] Stripe live keys added
- [ ] Resend email configured
- [ ] Groq API key added
- [ ] Environment validated (0 errors)
- [ ] Variables deployed to Vercel
- [ ] Production deployment successful

### Recommended Setup
- [ ] Upstash Redis configured
- [ ] Cloudinary CDN configured
- [ ] Sentry error tracking enabled
- [ ] Google Analytics added
- [ ] Monitoring alerts configured

### Optional Setup
- [ ] Amadeus API (flights/hotels)
- [ ] Google Places API
- [ ] WhatsApp Business API
- [ ] Weather API
- [ ] TripAdvisor API

---

## 🆘 Common Issues & Solutions

### Issue: "Database connection failed"
**Solution**:
```bash
# Test database connection
npx prisma db pull

# If fails, check:
1. DATABASE_URL format correct
2. IP whitelist includes Vercel IPs
3. Database is running
4. Credentials are correct
```

### Issue: "Stripe webhook signature mismatch"
**Solution**:
```bash
# Verify webhook secret matches
1. Go to Stripe Dashboard → Webhooks
2. Click on your endpoint
3. Copy "Signing secret"
4. Update STRIPE_WEBHOOK_SECRET in Vercel
5. Redeploy
```

### Issue: "Email not sending"
**Solution**:
```bash
# Check:
1. Domain verified in Resend
2. DNS records properly configured (TXT, MX, CNAME)
3. API key is active
4. RESEND_FROM_EMAIL matches verified domain
```

### Issue: "Validation fails with errors"
**Solution**:
```bash
# Run verbose validation
./scripts/env-validator.sh --report

# Open HTML report to see specific errors
open validation-reports/validation-report-*.html

# Fix each error listed
# Re-run validation
```

---

## 🔄 Updating Environment Variables

### Add New Variable
```bash
# 1. Add to .env.vercel.production
echo "NEW_VARIABLE=value" >> .env.vercel.production

# 2. Validate
./scripts/env-validator.sh

# 3. Deploy to Vercel
vercel env add NEW_VARIABLE production
# Or via dashboard

# 4. Redeploy
vercel --prod
```

### Update Existing Variable
```bash
# 1. Remove old variable
vercel env rm OLD_VARIABLE production

# 2. Add new value
vercel env add OLD_VARIABLE production

# 3. Redeploy
vercel --prod
```

### Rotate Secrets (Every 90 Days)
```bash
# 1. Generate new secrets
./scripts/env-setup.sh --generate-only

# 2. Update in Vercel
vercel env rm NEXTAUTH_SECRET production
vercel env add NEXTAUTH_SECRET production

# 3. Repeat for JWT_SECRET, REFRESH_SECRET, etc.

# 4. Deploy with zero downtime
vercel --prod
```

---

## 📊 Monitoring

### Essential Metrics to Track

1. **Error Rate** (Sentry)
   - Target: <0.1% error rate
   - Alert: >1% error rate

2. **Response Time** (Vercel Analytics)
   - Target: <500ms p95
   - Alert: >2s p95

3. **Database Connections** (Supabase/Neon Dashboard)
   - Target: <80% max connections
   - Alert: >90% max connections

4. **API Usage** (Stripe, Groq, etc.)
   - Monitor quota usage
   - Set up billing alerts

5. **Uptime** (Better Uptime, Pingdom)
   - Target: 99.9% uptime
   - Alert: Any downtime

---

## 🎓 Next Steps

### Week 1
1. Monitor error logs daily
2. Test all user flows
3. Verify payment processing
4. Check email delivery rates

### Month 1
1. Optimize database queries
2. Fine-tune caching strategy
3. Review API costs
4. Scale infrastructure as needed

### Quarter 1
1. First secret rotation
2. Security audit
3. Performance optimization
4. Feature flag evaluation

---

## 📞 Support

**Documentation**:
- Full Report: `docs/ENVIRONMENT_AGENT_REPORT.md`
- Scripts: `scripts/env-*.sh`
- Validation Reports: `validation-reports/`

**External Resources**:
- Vercel: https://vercel.com/docs
- Stripe: https://stripe.com/docs
- Resend: https://resend.com/docs
- Groq: https://console.groq.com/docs

---

**Last Updated**: 2025-12-28
**Version**: 2.0
**Platform**: AILYDIAN Travel Platform
