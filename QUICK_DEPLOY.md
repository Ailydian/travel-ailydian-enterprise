# ⚡ QUICK DEPLOYMENT FIX - Travel.Ailydian.com

## 🚨 IMMEDIATE FIXES APPLIED

### 1. Domain Configuration Fixed ✅
- **File**: `vercel.json`
- **Changed**: `travel.lydian.com` → `travel.ailydian.com`
- **Effect**: Domain alias now matches actual domain

### 2. Next.js Production Config ✅
- **File**: `next.config.js`
- **Added**: Production optimizations
  - Standalone output mode
  - Disabled source maps in production
  - Correct environment variables

### 3. Prisma Database Config ✅
- **File**: `prisma/schema.prisma`
- **Added**: `directUrl` for Supabase connection pooling
- **Added**: `jsonProtocol` preview feature

### 4. Build Scripts Updated ✅
- **File**: `package.json`
- **Added**: `build:vercel` command (without migrations)
- **Updated**: Main build command

---

## 🔥 CRITICAL: DO THIS NOW

### Step 1: Configure Vercel Environment Variables

Go to: **Vercel Dashboard → Settings → Environment Variables**

Add these **REQUIRED** variables:

```bash
# Database (GET FROM SUPABASE)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres

# Authentication (GENERATE NEW)
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://travel.ailydian.com
JWT_SECRET=<run: openssl rand -base64 32>

# Email (GET FROM RESEND.COM)
RESEND_API_KEY=re_xxxxxxxxxx
RESEND_FROM_EMAIL=noreply@travel.ailydian.com

# Public URLs
NEXT_PUBLIC_SITE_URL=https://travel.ailydian.com
NEXT_PUBLIC_API_URL=https://travel.ailydian.com/api
NODE_ENV=production
```

### Step 2: Setup Supabase Database

1. **Create Project**: https://supabase.com/dashboard/new
   - Choose region: **East US (Washington D.C.)**
   - Set strong password
   - Save password securely

2. **Get Connection Strings**:
   - Go to: Settings → Database
   - Copy **Connection Pooling** string (port 6543)
   - Copy **Direct Connection** string (port 5432)

3. **Run Migrations**:
```bash
# Set environment variables locally
export DATABASE_URL="postgresql://..."
export DIRECT_URL="postgresql://..."

# Run migrations
npx prisma migrate deploy
```

### Step 3: Deploy to Vercel

**Option A: Push to GitHub (Recommended)**
```bash
# Commit changes
git add .
git commit -m "fix: Vercel deployment configuration for travel.ailydian.com"
git push origin main
```
Vercel will auto-deploy from GitHub.

**Option B: Manual Deploy with CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Step 4: Configure Domain DNS

**If domain is NOT on Vercel DNS:**

Add these DNS records at your domain provider:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**OR use Vercel nameservers:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Wait 5-60 minutes for DNS propagation.

### Step 5: Verify Deployment

```bash
# Make script executable
chmod +x scripts/verify-deployment.sh

# Run verification
./scripts/verify-deployment.sh https://travel.ailydian.com
```

Or manually check:
- ✅ Homepage: https://travel.ailydian.com
- ✅ API Health: https://travel.ailydian.com/api/health
- ✅ DB Health: https://travel.ailydian.com/api/health/db

---

## 🐛 TROUBLESHOOTING

### Issue: "Site not loading"

**Check:**
1. DNS propagation: https://dnschecker.org
2. SSL certificate status in Vercel
3. Deployment status in Vercel dashboard

**Fix:**
```bash
# Force redeploy
vercel --prod --force
```

### Issue: "Database connection error"

**Check:**
1. Environment variables in Vercel
2. Supabase project is running
3. Connection string format is correct

**Fix:**
```bash
# Test connection locally
npx prisma db pull

# If successful, redeploy to Vercel
vercel --prod
```

### Issue: "Build failing"

**Check Vercel logs:**
```bash
vercel logs
```

**Common fixes:**
```bash
# Clear build cache
vercel build --force

# Verify dependencies
npm ci
npm run build:vercel
```

---

## 📝 FILES CHANGED

1. ✅ `vercel.json` - Fixed domain alias
2. ✅ `next.config.js` - Production optimizations
3. ✅ `prisma/schema.prisma` - Supabase config
4. ✅ `package.json` - Build scripts
5. ✅ `.env.production` - Production env template
6. ✅ `VERCEL_DEPLOYMENT_GUIDE.md` - Full guide
7. ✅ `scripts/verify-deployment.sh` - Verification script

---

## ✅ CHECKLIST

Before deployment:
- [ ] Supabase project created
- [ ] Database migrations run
- [ ] Environment variables set in Vercel
- [ ] Code committed to GitHub
- [ ] DNS configured
- [ ] Deployment triggered

After deployment:
- [ ] Site loads at travel.ailydian.com
- [ ] API health check passes
- [ ] Database connection works
- [ ] SSL certificate issued
- [ ] Test a booking flow
- [ ] Check Vercel logs for errors

---

## 🆘 NEED HELP?

1. **Check full guide**: `VERCEL_DEPLOYMENT_GUIDE.md`
2. **Vercel support**: https://vercel.com/support
3. **Check status**: https://www.vercel-status.com
4. **Project logs**: `vercel logs --prod`

---

## 🎯 EXPECTED RESULT

After completing all steps:
- ✅ Site live at: https://travel.ailydian.com
- ✅ All pages loading correctly
- ✅ Database connected
- ✅ API endpoints working
- ✅ SSL certificate active
- ✅ Analytics tracking
- ✅ Error monitoring active

**Deployment Time**: ~15-30 minutes (including DNS propagation)

---

*Last Updated: 2024-12-28*
*Auto-generated fix guide*
