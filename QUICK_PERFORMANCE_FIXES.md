# Quick Performance Fixes - Action Guide

## Status
- Build errors: **PARTIALLY FIXED**
- Unused dependencies identified: **READY TO REMOVE**
- Optimization opportunities: **10+ identified**

---

## Immediate Action Items (Priority Order)

### 1. Remove Unused @tensorflow/tfjs (271 MB Savings)

```bash
cd /Users/sardag/Desktop/projeler/travel.ailydian.com

# Verify it's not used
grep -r "@tensorflow" src/
# Expected: No results

# Remove the package
npm uninstall @tensorflow/tfjs

# Verify removal
npm ls @tensorflow/tfjs
# Expected: npm ERR! (not found)

# Install dependencies
npm install

# Try build
npm run build
```

**Expected savings:** 271 MB from node_modules

---

### 2. Fix next.config.js Deprecation

**File:** `/Users/sardag/Desktop/projeler/travel.ailydian.com/next.config.js`

```javascript
// REMOVE THIS LINE (line 21):
swcMinify: true,

// NEXT.js 15 no longer supports swcMinify - SWC is used by default
```

**Why:** Next.js 15+ uses SWC minification by default. This deprecated option causes warnings.

---

### 3. Fix Remaining Build Errors

#### Error 1: Dynamic Route Issue
**File:** Check `/src/pages/car-rentals/[slug]-redesigned.tsx` or similar

```typescript
// If using getStaticPaths, remove it if not needed:
// export const getStaticPaths: GetStaticPaths = async () => {
//   return { paths: [], fallback: 'blocking' }
// }

// OR use dynamic import instead:
export const dynamic = 'force-dynamic'
```

#### Error 2: Sentry Configuration
**Files affected:**
- `/src/sentry.server.config.ts`
- `/src/sentry.edge.config.ts`
- `/src/sentry.client.config.ts`

Create instrumentation file instead (Sentry v10.32.1 requirement):

```bash
touch src/instrumentation.ts
```

```typescript
// src/instrumentation.ts
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
      enabled: process.env.NODE_ENV === "production",
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
      enabled: process.env.NODE_ENV === "production",
    });
  }
}
```

---

### 4. Fix Prisma Deprecated Config

**File:** `/Users/sardag/Desktop/projeler/travel.ailydian.com/package.json`

```json
// REMOVE THIS:
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},
```

Create instead: `prisma/prisma.config.ts`

```typescript
// prisma/prisma.config.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seed() {
  // Your seed logic here
}
```

---

## Quick Wins (30-minute tasks)

### 1. Add React.memo to Heavy Components

Find expensive components:
```bash
grep -r "export function" src/components --include="*.tsx" | grep -E "(Chart|Dashboard|Map)" | head -5
```

Example fix:
```typescript
// Before
export function Dashboard() { ... }

// After
export const Dashboard = React.memo(function Dashboard() { ... })
```

### 2. Optimize Image Imports

Find unoptimized images:
```bash
grep -r '<img src=' src/ --include="*.tsx" | head -10
```

Replace with Next.js Image:
```typescript
// Before
<img src="/images/hero.jpg" alt="Hero" />

// After
import Image from 'next/image'
<Image src="/images/hero.jpg" alt="Hero" width={1200} height={600} priority />
```

### 3. Add Dynamic Imports for 3D Components

```typescript
// Find 3D usage
grep -r "react-three-fiber\|three\|drei" src/components --include="*.tsx" | head -10

// Wrap in dynamic import
import dynamic from 'next/dynamic'

const ThreeScene = dynamic(() => import('@/components/3d/Scene'), {
  loading: () => <div>Loading 3D...</div>,
  ssr: false
})
```

---

## Verification Steps

After each fix, run:

```bash
# Step 1: Type check
npm run type-check

# Step 2: Lint
npm run lint

# Step 3: Build
npm run build

# Step 4: Check build output
du -sh .next/
du -sh .next/static/chunks/main*

# Step 5: Bundle analysis
npm run analyze
# Check .next/analyze/client.html
```

---

## Expected Timeline

| Phase | Tasks | Time | Bundle Impact |
|-------|-------|------|---------------|
| Phase 1 | Remove TensorFlow, fix configs | 1 hour | -271 MB |
| Phase 2 | Fix remaining build errors | 2-3 hours | -10 MB |
| Phase 3 | Add React.memo | 4 hours | -30 KB |
| Phase 4 | Dynamic imports | 4 hours | -50 KB |
| Phase 5 | Image optimization | 4 hours | -100 KB |

**Total Estimated Savings:** 271 MB node_modules + 190 KB bundle

---

## Testing Checklist

- [ ] `npm install` succeeds
- [ ] `npm run type-check` passes
- [ ] `npm run build` completes without errors
- [ ] `npm run analyze` generates report
- [ ] Bundle size reduced
- [ ] Lighthouse score > 85
- [ ] No console errors in browser
- [ ] No unused dependencies in node_modules

---

## Rollback Instructions

If something breaks:

```bash
# Revert last npm changes
npm ci  # Clean install from package-lock.json

# Check git status
git status

# Revert file changes
git checkout [filename]

# Verify build
npm run build
```

---

## Troubleshooting

### Issue: Build still fails after fixes
```bash
# Clean everything
rm -rf node_modules .next package-lock.json
npm install
npm run build
```

### Issue: TypeScript errors
```bash
npm run type-check
# Fix reported errors
npm run build
```

### Issue: Runtime errors
```bash
# Check console
npm run dev
# Open http://localhost:3100
# Check browser console for errors
```

---

## Next Steps

1. **This session:**
   - [ ] Remove @tensorflow/tfjs
   - [ ] Fix next.config.js
   - [ ] Fix Sentry config
   - [ ] Verify successful build

2. **Follow-up session:**
   - [ ] Implement React.memo
   - [ ] Add dynamic imports
   - [ ] Optimize images
   - [ ] Run Lighthouse

3. **Advanced optimization:**
   - [ ] Database indexes
   - [ ] Query caching
   - [ ] Edge functions
   - [ ] ISR implementation

---

## Related Documentation

- Full analysis: `PERFORMANCE_OPTIMIZATION.md`
- Build logs: `bundle-analysis.log`
- Next.js docs: https://nextjs.org/docs/app/building-your-application/optimizing
- React docs: https://react.dev/reference/react/memo

---

**Generated:** 2025-12-28
**Status:** Ready for Implementation
