# Vercel Deployment Commands - Quick Reference

**Platform**: Vercel Production
**Project**: travel.ailydian.com
**Generated**: 2025-12-28

---

## 🚀 Initial Setup

### Install Vercel CLI
```bash
npm i -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Link Project (First Time)
```bash
vercel link
# Select: existing project → travel-ailydian
```

---

## 🔐 Environment Variables

### View All Environment Variables
```bash
vercel env ls
```

### Add Environment Variable
```bash
vercel env add VARIABLE_NAME production
# Then paste the value when prompted
```

### Add Multiple Variables (Batch)
```bash
# Create a temp file with variables
cat > /tmp/env-vars.txt << 'EOF'
NEXTAUTH_SECRET
JWT_SECRET
REFRESH_SECRET
DATABASE_URL
STRIPE_SECRET_KEY
RESEND_API_KEY
GROQ_API_KEY
EOF

# Add each variable
while read var; do
  echo "Adding: $var"
  vercel env add "$var" production
done < /tmp/env-vars.txt
```

### Remove Environment Variable
```bash
vercel env rm VARIABLE_NAME production
```

### Pull Environment Variables (Download)
```bash
# Download production env to local file
vercel env pull .env.production.local
```

---

## 📦 Deployment Commands

### Deploy to Production
```bash
vercel --prod
```

### Deploy to Preview
```bash
vercel
```

### Deploy with Build Env
```bash
vercel --prod --build-env NODE_ENV=production
```

### Redeploy Latest
```bash
# Get latest deployment ID
vercel ls

# Redeploy
vercel redeploy <deployment-url> --prod
```

---

## 🔍 Monitoring & Debugging

### View Deployment Logs
```bash
# Latest deployment
vercel logs

# Specific deployment
vercel logs <deployment-url>

# Follow logs (real-time)
vercel logs --follow
```

### List Deployments
```bash
vercel ls

# Last 10 deployments
vercel ls --limit 10
```

### Inspect Deployment
```bash
vercel inspect <deployment-url>
```

### View Build Logs
```bash
vercel logs <deployment-url> --output build
```

---

## 🔧 Project Management

### View Project Info
```bash
vercel project ls
```

### Remove Project
```bash
vercel remove [project-name]
```

### Switch Project
```bash
vercel switch
```

---

## 🎯 Complete Deployment Workflow

### Step-by-Step Production Deployment

```bash
# 1. Install Vercel CLI (if not installed)
npm i -g vercel

# 2. Login
vercel login

# 3. Link project (if first time)
vercel link

# 4. Add environment variables
# Option A: Interactive (recommended for sensitive data)
vercel env add NEXTAUTH_SECRET production
# Paste: 7sxNy+qofUwKzA7p5+QGDWUK3IEqHbKkx6AX3KaGro0=

vercel env add JWT_SECRET production
# Paste: o5OBmbyvzSerctst8a/WIk0egsfx0lYkjBGA/cWQV4FSWRWKCGnJWTDkYqqG0eiNbAMDlTZ43JwJbkYXQWn7Ew==

vercel env add REFRESH_SECRET production
# Paste: tYrkbyWJzJXP+fIaYtbCIbv2zncotfEjKB4YH4iiRidOeRRfrsldrEPAou5Nsnf4eFDT86tfrUsBuse7afTiRQ==

vercel env add CRON_SECRET production
# Paste: qwV/yT/k8GvHFYTpqoNjovN99jZdceJltf28arQa7lI=

vercel env add INDEXNOW_KEY production
# Paste: 419e178bc8f534cc326c30c1ba03eeaf

vercel env add DATABASE_URL production
# Paste: postgresql://user:pass@host:5432/db?schema=public&connection_limit=20

vercel env add STRIPE_SECRET_KEY production
# Paste: sk_live_YOUR_KEY

vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
# Paste: pk_live_YOUR_KEY

vercel env add STRIPE_WEBHOOK_SECRET production
# Paste: whsec_YOUR_SECRET

vercel env add RESEND_API_KEY production
# Paste: re_YOUR_KEY

vercel env add GROQ_API_KEY production
# Paste: gsk_YOUR_KEY

vercel env add AI_INFERENCE_KEY production
# Paste: gsk_YOUR_KEY

vercel env add UPSTASH_REDIS_REST_URL production
# Paste: https://your-url.upstash.io

vercel env add UPSTASH_REDIS_REST_TOKEN production
# Paste: YOUR_TOKEN

# 5. Verify environment variables
vercel env ls

# 6. Deploy to production
vercel --prod

# 7. Monitor deployment
vercel logs --follow

# 8. Verify deployment
curl https://travel.ailydian.com/api/health

# 9. Check Vercel dashboard
open https://vercel.com/dashboard
```

---

## 📋 Essential Environment Variables Checklist

### Required (Must Set)
```bash
# Authentication & Security
vercel env add NEXTAUTH_SECRET production
vercel env add JWT_SECRET production
vercel env add REFRESH_SECRET production

# Database
vercel env add DATABASE_URL production

# Payment (Stripe)
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production

# Email (Resend)
vercel env add RESEND_API_KEY production
```

### Highly Recommended
```bash
# AI Service
vercel env add GROQ_API_KEY production
vercel env add AI_INFERENCE_KEY production

# Redis Cache
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production

# Monitoring
vercel env add NEXT_PUBLIC_SENTRY_DSN production
vercel env add SENTRY_AUTH_TOKEN production

# CDN
vercel env add CLOUDINARY_CLOUD_NAME production
vercel env add CLOUDINARY_API_KEY production
vercel env add CLOUDINARY_API_SECRET production
```

### Optional
```bash
# Travel APIs
vercel env add AMADEUS_CLIENT_ID production
vercel env add AMADEUS_CLIENT_SECRET production
vercel env add NEXT_PUBLIC_AMADEUS_CLIENT_ID production
vercel env add GOOGLE_PLACES_API_KEY production
vercel env add NEXT_PUBLIC_GOOGLE_PLACES_API_KEY production

# Additional Services
vercel env add WEATHER_API_KEY production
vercel env add TRIPADVISOR_API_KEY production
vercel env add WHATSAPP_ACCESS_TOKEN production

# Analytics
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
```

---

## 🔄 Environment Variable Update Workflow

### Update Single Variable
```bash
# Remove old value
vercel env rm VARIABLE_NAME production

# Add new value
vercel env add VARIABLE_NAME production
# Paste new value

# Redeploy
vercel --prod
```

### Bulk Update
```bash
# Remove all outdated variables
vercel env rm NEXTAUTH_SECRET production
vercel env rm JWT_SECRET production
vercel env rm REFRESH_SECRET production

# Add new values
vercel env add NEXTAUTH_SECRET production
vercel env add JWT_SECRET production
vercel env add REFRESH_SECRET production

# Redeploy
vercel --prod
```

---

## 🛡️ Security Best Practices

### Use Production Scope Only
```bash
# Always specify 'production' scope
vercel env add VARIABLE_NAME production

# NOT preview or development for sensitive data
```

### Encrypt Sensitive Data
```bash
# Vercel automatically encrypts environment variables
# But ensure you're using secure secrets:
./scripts/env-setup.sh --generate-only
```

### Regular Rotation
```bash
# Every 90 days, rotate secrets:

# 1. Generate new secrets
./scripts/env-setup.sh --generate-only

# 2. Update in Vercel
vercel env rm NEXTAUTH_SECRET production
vercel env add NEXTAUTH_SECRET production

# 3. Redeploy
vercel --prod
```

### Never Expose Secrets
```bash
# ❌ NEVER do this:
vercel env add SECRET_KEY production --value="my-secret-123"

# ✅ ALWAYS use interactive mode:
vercel env add SECRET_KEY production
# Then paste when prompted (not visible in history)
```

---

## 🔍 Troubleshooting

### Check Environment Variable Status
```bash
# List all variables
vercel env ls

# Check specific deployment
vercel inspect <deployment-url>
```

### Debug Missing Variables
```bash
# Pull environment to local
vercel env pull .env.debug

# Compare with .env.vercel.production
diff .env.debug .env.vercel.production
```

### Verify Variable in Production
```bash
# Deploy with debug logs
vercel --prod --debug

# Check logs
vercel logs --follow
```

### Reset Environment
```bash
# Remove all environment variables
vercel env ls | grep production | awk '{print $1}' | while read var; do
  vercel env rm "$var" production -y
done

# Re-add from scratch
./scripts/deploy-env-to-vercel.sh
```

---

## 📊 Monitoring Commands

### Real-time Logs
```bash
vercel logs --follow
```

### Error Logs Only
```bash
vercel logs | grep -i error
```

### Last 100 Log Lines
```bash
vercel logs --limit 100
```

### Logs for Specific Time Range
```bash
vercel logs --since 1h  # Last hour
vercel logs --since 24h # Last 24 hours
```

---

## 🚀 Advanced Deployment

### Deploy with Specific Branch
```bash
vercel --prod --git-branch main
```

### Deploy with Environment Override
```bash
vercel --prod --env NODE_ENV=production
```

### Deploy with Force
```bash
vercel --prod --force
```

### Deploy and Alias
```bash
vercel --prod --alias travel.ailydian.com
```

---

## 📞 Help & Documentation

### Get Help
```bash
vercel help
vercel env help
vercel deploy help
```

### View Vercel Status
```bash
open https://vercel-status.com
```

### Open Dashboard
```bash
open https://vercel.com/dashboard
```

---

## ✅ Pre-Deployment Checklist

Before running `vercel --prod`, ensure:

- [ ] All required environment variables added
- [ ] Secrets generated and secure
- [ ] Database URL configured
- [ ] Stripe live keys (not test keys)
- [ ] Email domain verified (Resend)
- [ ] Local validation passed (`./scripts/env-validator.sh`)
- [ ] Git committed and pushed
- [ ] Build succeeds locally (`npm run build`)
- [ ] Tests pass (`npm test`)

---

## 🎯 Quick Commands Summary

```bash
# Setup
vercel login
vercel link

# Add env var
vercel env add VAR_NAME production

# Deploy
vercel --prod

# Monitor
vercel logs --follow

# List deployments
vercel ls

# View env vars
vercel env ls
```

---

**Last Updated**: 2025-12-28
**Version**: 2.0
**Platform**: Vercel
**Project**: AILYDIAN Travel Platform
