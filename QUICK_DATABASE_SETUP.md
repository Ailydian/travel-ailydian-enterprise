# ⚡ QUICK DATABASE SETUP GUIDE

**Time Required:** 5 minutes
**Difficulty:** Easy (fully automated)

---

## 🚀 ONE-COMMAND DEPLOYMENT

```bash
./scripts/database-setup.sh
```

That's it! The script will:
1. ✅ Create Supabase project
2. ✅ Generate secure credentials
3. ✅ Configure connection pooling
4. ✅ Deploy all migrations
5. ✅ Verify connection
6. ✅ Generate environment variables

---

## 📋 PRE-REQUISITES

Before running the setup script, ensure you have:

- [x] Supabase CLI installed (`brew install supabase/tap/supabase`)
- [x] Node.js installed (v18+)
- [x] npm installed
- [x] Supabase account (free tier works)

Check if ready:
```bash
supabase --version  # Should show v2.x.x
node --version      # Should show v18+
npm --version       # Should show v9+
```

---

## 🔑 AUTHENTICATION

If not already logged in to Supabase:
```bash
supabase login
```

Follow the browser authentication flow.

---

## 🎯 STEP-BY-STEP

### 1. Run Setup Script
```bash
cd /path/to/travel.ailydian.com
./scripts/database-setup.sh
```

### 2. Choose Project Type
When prompted:
- **New project:** Press `y` → Enter project name → Wait 3 minutes
- **Existing project:** Press `n` → Enter project ID and password

### 3. Wait for Automation
The script will automatically:
- Install dependencies
- Generate Prisma client
- Deploy all 6 migrations
- Create connection strings

### 4. Copy Connection Strings
After completion, find them in:
```bash
cat .env.supabase
```

---

## 📦 WHAT GETS CREATED

### Files
- `.env.supabase` - Your database credentials (⚠️ never commit)
- `logs/database-setup-*.log` - Setup log for debugging

### Database
- PostgreSQL 15 database (Supabase)
- 50+ tables deployed
- 100+ indexes created
- All foreign keys configured

---

## 🔐 SECURITY NOTES

The generated `.env.supabase` contains:
- `DATABASE_URL` - Pooled connection (use in production)
- `DIRECT_URL` - Direct connection (use for migrations)
- `SUPABASE_PROJECT_REF` - Your project identifier

**⚠️ IMPORTANT:**
- This file is automatically added to `.gitignore`
- Never commit it to version control
- Store password in a secure password manager

---

## 🌐 ADD TO VERCEL

Copy these environment variables to Vercel:

1. Go to: https://vercel.com/your-team/travel-ailydian-enterprise/settings/environment-variables

2. Add:
   ```
   DATABASE_URL=[from .env.supabase]
   DIRECT_URL=[from .env.supabase]
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

---

## ✅ VERIFY SETUP

Run the verification script:
```bash
./scripts/db-verify.sh
```

Expected output:
```
✓ Database connection successful
✓ Database schema is synchronized
✓ All essential tables exist
✓ Found 120+ indexes
✓ Query response time: 45ms (Excellent)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESULTS:
  ✓ Passed:  6
  ⚠ Warnings: 0
  ✗ Failed:  0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Database is healthy and ready for production
```

---

## 🔄 RUNNING MIGRATIONS (LATER)

When you make schema changes:

```bash
# 1. Create migration
npx prisma migrate dev --name your_migration_name

# 2. Deploy to production
./scripts/migrate-deploy.sh
```

The deploy script will:
- Create automatic backup
- Show you what will change
- Ask for confirmation
- Deploy safely
- Verify success

---

## 🆘 TROUBLESHOOTING

### "Supabase CLI not found"
```bash
brew install supabase/tap/supabase
```

### "Authentication required"
```bash
supabase login
```

### "DATABASE_URL not set"
```bash
source .env.supabase
```

### "Migration failed"
```bash
# Check status
npx prisma migrate status

# Verify connection
./scripts/db-verify.sh

# Check logs
cat logs/database-setup-*.log
```

### "Permission denied"
```bash
chmod +x scripts/*.sh
```

---

## 📚 FULL DOCUMENTATION

For complete details, see:
- **Full Report:** `/docs/DATABASE_AGENT_REPORT.md`
- **Script Source:** `/scripts/database-setup.sh`
- **Verification:** `/scripts/db-verify.sh`

---

## ⏱️ QUICK REFERENCE

| Task | Command | Time |
|------|---------|------|
| Initial setup | `./scripts/database-setup.sh` | 5 min |
| Verify health | `./scripts/db-verify.sh` | 10 sec |
| Deploy migrations | `./scripts/migrate-deploy.sh` | 30 sec |
| Check status | `npx prisma migrate status` | 5 sec |
| Generate client | `npx prisma generate` | 10 sec |

---

## 🎉 SUCCESS!

If `db-verify.sh` shows all checks passing, you're ready to deploy to production!

**Next Steps:**
1. Add `DATABASE_URL` to Vercel
2. Add `DIRECT_URL` to Vercel
3. Deploy with `vercel --prod`
4. Celebrate! 🎊

---

*Database Agent - Making database deployment effortless*
