# Vercel Environment Variables - Quick Reference

## 🚨 REQUIRED FOR DEPLOYMENT

Copy these to Vercel Dashboard → Settings → Environment Variables

### Core Application
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://holiday.ailydian.com
NEXT_PUBLIC_API_URL=https://holiday.ailydian.com/api
```

### Authentication (CRITICAL - Generate new secrets!)
```bash
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=YOUR_NEW_SECRET_HERE
NEXTAUTH_URL=https://holiday.ailydian.com
JWT_SECRET=YOUR_NEW_SECRET_HERE
```

### Email Configuration
```bash
RESEND_FROM_EMAIL=noreply@holiday.ailydian.com
RESEND_SUPPORT_EMAIL=support@holiday.ailydian.com
```

### Feature Flags (Start with all disabled)
```bash
ENABLE_AI_RECOMMENDATIONS=false
ENABLE_BLOCKCHAIN_FEATURES=false
ENABLE_METAVERSE_TOURS=false
ENABLE_NFT_MARKETPLACE=false
ENABLE_QUANTUM_SEARCH=false
```

### Sentry Configuration (Suppress warnings)
```bash
SENTRY_ORG=ailydian
SENTRY_PROJECT=travel-lydian
SENTRY_SUPPRESS_TUNNEL_WARNING=true
SENTRY_IGNORE_API_RESOLUTION_ERROR=true
```

---

## 📝 HOW TO ADD IN VERCEL

1. Go to: https://vercel.com/your-team/travel-ailydian-holiday/settings/environment-variables
2. For each variable above:
   - Click "Add New"
   - Name: (variable name, e.g., `NEXTAUTH_SECRET`)
   - Value: (your value)
   - Environments: Check "Production", "Preview", "Development"
   - Click "Save"
3. After adding all variables, go to Deployments tab
4. Click "..." on latest deployment → "Redeploy"

---

## 🔒 GENERATE NEW SECRETS

**DO NOT USE THE DEFAULT SECRETS IN PRODUCTION!**

### Generate on macOS/Linux:
```bash
# NEXTAUTH_SECRET
openssl rand -base64 32

# JWT_SECRET
openssl rand -base64 32
```

### Generate on Windows (PowerShell):
```powershell
# NEXTAUTH_SECRET
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# JWT_SECRET
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

---

## 🔧 OPTIONAL VARIABLES (Add Later)

### Database (Supabase)
```bash
DATABASE_URL=postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres
```

### Redis (Upstash)
```bash
REDIS_URL=redis://default:TOKEN@HOST:PORT
UPSTASH_REDIS_REST_URL=https://HOST.upstash.io
UPSTASH_REDIS_REST_TOKEN=YOUR_TOKEN
```

### Stripe Payments
```bash
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Email Service (Resend)
```bash
RESEND_API_KEY=re_...
```

### AI Services
```bash
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
GOOGLE_AI_API_KEY=...
```

### Maps & Location
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
MAPBOX_ACCESS_TOKEN=pk....
```

### Monitoring & Analytics
```bash
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=...
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-...
```

### Cloud Storage
```bash
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## ✅ VERIFICATION

After adding variables and redeploying:

1. Check deployment logs for any missing variable warnings
2. Visit https://holiday.ailydian.com
3. Test basic functionality:
   - Homepage loads
   - Navigation works
   - Search functions (may be limited without AI keys)
   - Static pages render correctly

---

## 🚨 IMPORTANT NOTES

- **Never commit .env.production to Git!** (Already in .gitignore)
- **Generate new secrets for production** - Don't use the defaults!
- **Start minimal** - Add optional variables as needed
- **Test after each addition** - Verify app still works
- **Monitor logs** - Watch for any errors related to missing variables

---

**Quick Deploy Checklist:**
- [ ] Generated new NEXTAUTH_SECRET
- [ ] Generated new JWT_SECRET
- [ ] Added both secrets to Vercel
- [ ] Added NEXT_PUBLIC_SITE_URL
- [ ] Added NEXT_PUBLIC_API_URL
- [ ] Set feature flags to false
- [ ] Redeployed application
- [ ] Tested deployment URL

---

**Last Updated:** January 1, 2026
**Target Domain:** holiday.ailydian.com
**Status:** Ready for deployment
