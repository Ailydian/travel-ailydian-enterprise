# Design Token Quick Reference Guide
## Travel.AiLydian.com - Instant Migration Cheatsheet

**Last Updated:** January 1, 2026
**For:** Developers migrating to design system

---

## Quick Migration Map

### Colors: Blue → Primary/Info

```tsx
// ❌ OLD (Raw Tailwind)
className="bg-blue-600 text-white hover:bg-blue-700"
className="text-blue-600 hover:text-blue-700"
className="border-blue-500 bg-blue-50"

// ✅ NEW (Design Tokens)
className="bg-lydian-primary text-lydian-text-inverse hover:bg-lydian-primary-hover"
className="text-lydian-primary hover:text-lydian-primary-hover"
className="border-lydian-primary bg-lydian-primary-lighter"
```

### Colors: Gray → Text/Background/Border

```tsx
// ❌ OLD
className="text-gray-900"  // Dark text
className="text-gray-700"  // Medium dark text
className="text-gray-500"  // Muted text
className="text-gray-400"  // Very muted text
className="text-gray-300"  // Dim text
className="bg-gray-50"     // Light background
className="bg-gray-100"    // Slightly darker background
className="border-gray-200" // Border

// ✅ NEW
className="text-lydian-text"           // #111827 (gray-900)
className="text-lydian-text-secondary" // #374151 (gray-700)
className="text-lydian-text-muted"     // #6B7280 (gray-500)
className="text-lydian-text-muted"     // #6B7280 (gray-400 → muted)
className="text-lydian-text-dim"       // #D1D5DB (gray-300)
className="bg-lydian-bg-surface"       // #F9FAFB (gray-50)
className="bg-lydian-bg-surface-raised" // #F3F4F6 (gray-100)
className="border-lydian-border"       // #E5E7EB (gray-200)
```

### Colors: Green → Success

```tsx
// ❌ OLD
className="bg-green-600 text-white"
className="bg-green-100 text-green-800"
className="text-green-600"

// ✅ NEW
className="bg-lydian-success text-lydian-text-inverse"
className="bg-lydian-success-lighter text-lydian-success-text"
className="text-lydian-success"
```

### Colors: Red → Error

```tsx
// ❌ OLD
className="bg-red-600 text-white"
className="bg-red-100 text-red-800"
className="text-red-500"

// ✅ NEW
className="bg-lydian-error text-lydian-text-inverse"
className="bg-lydian-error-lighter text-lydian-error-text"
className="text-lydian-error"
```

### Colors: Yellow → Warning

```tsx
// ❌ OLD
className="bg-yellow-400 text-gray-900"
className="bg-yellow-100 text-yellow-800"

// ✅ NEW
className="bg-lydian-warning text-lydian-text"
className="bg-lydian-warning-lighter text-lydian-warning-text"
```

### Hardcoded Hex Colors

```tsx
// ❌ OLD
className="text-[#FF214D]"    // Primary red
className="text-[#FF6A45]"    // Hover red
className="bg-[#00BAFF]"      // Cyan accent
className="text-[#667EEA]"    // Purple accent
className="bg-[#EC4899]"      // Pink accent
className="text-[#FF9500]"    // Orange/Amber accent

// ✅ NEW
className="text-lydian-primary"
className="text-lydian-primary-hover"
className="bg-lydian-accent-cyan"
className="text-lydian-accent-purple"
className="bg-lydian-accent"
className="text-lydian-accent-amber"
```

---

## Complete Color Token Reference

### Primary Brand Colors

```typescript
lydian-primary          // #DC2626 - Main Lydian Red
lydian-primary-hover    // #B91C1C - Darker (hover state)
lydian-primary-active   // #991B1B - Even darker (active state)
lydian-primary-light    // #FCA5A5 - Light variant
lydian-primary-lighter  // #FEE2E2 - Very light (backgrounds)
lydian-primary-dark     // #991B1B - Dark variant
lydian-primary-darker   // #7F1D1D - Very dark variant

lydian-secondary        // #EF4444 - Secondary red tone
lydian-secondary-hover  // #DC2626
lydian-secondary-active // #B91C1C
```

### Semantic Colors

```typescript
// Success (Green)
lydian-success          // #10B981
lydian-success-hover    // #059669
lydian-success-active   // #047857
lydian-success-light    // #D1FAE5
lydian-success-lighter  // #ECFDF5
lydian-success-text     // #047857 (for text on light bg)

// Warning (Amber)
lydian-warning          // #F59E0B
lydian-warning-hover    // #D97706
lydian-warning-active   // #B45309
lydian-warning-light    // #FEF3C7
lydian-warning-lighter  // #FFFBEB
lydian-warning-text     // #B45309

// Error (Red)
lydian-error            // #EF4444
lydian-error-hover      // #DC2626
lydian-error-active     // #B91C1C
lydian-error-light      // #FEE2E2
lydian-error-lighter    // #FEF2F2
lydian-error-text       // #B91C1C

// Info (Blue)
lydian-info             // #3B82F6
lydian-info-hover       // #2563EB
lydian-info-active      // #1D4ED8
lydian-info-light       // #DBEAFE
lydian-info-lighter     // #EFF6FF
lydian-info-text        // #1D4ED8
```

### Accent Colors

```typescript
lydian-accent           // #DC2626 (same as primary)
lydian-accent-cyan      // #06B6D4 (for tech/info)
lydian-accent-purple    // #8B5CF6 (for premium)
lydian-accent-amber     // #F59E0B (for highlights)
```

### Text Colors

```typescript
lydian-text                 // #111827 (gray-900) - Primary text
lydian-text-secondary       // #374151 (gray-700) - Secondary text
lydian-text-tertiary        // #6B7280 (gray-500) - Tertiary text
lydian-text-muted           // #9CA3AF (gray-400) - Muted text
lydian-text-dim             // #D1D5DB (gray-300) - Dim text
lydian-text-inverse         // #FFFFFF - White text on dark bg
lydian-text-inverse-muted   // #F3F4F6 - Light gray on dark bg
```

### Background Colors

```typescript
lydian-bg                   // #FFFFFF - Primary background
lydian-bg-surface           // #F9FAFB (gray-50) - Elevated surface
lydian-bg-surface-raised    // #F3F4F6 (gray-100) - Raised surface
lydian-bg-overlay           // rgba(0,0,0,0.5) - Dark overlay
lydian-bg-overlay-light     // rgba(0,0,0,0.2) - Light overlay
lydian-bg-hover             // #F9FAFB - Hover state
lydian-bg-active            // #F3F4F6 - Active state
lydian-bg-disabled          // #E5E7EB - Disabled state
```

### Border Colors

```typescript
lydian-border         // #E5E7EB (gray-200) - Default border
lydian-border-light   // #F3F4F6 (gray-100) - Light border
lydian-border-medium  // #D1D5DB (gray-300) - Medium border
lydian-border-heavy   // #9CA3AF (gray-400) - Heavy border
lydian-border-focus   // #DC2626 (primary) - Focus state
```

### Glass/Translucent Colors

```typescript
lydian-glass-light       // rgba(255,255,255,0.1)
lydian-glass-medium      // rgba(255,255,255,0.15)
lydian-glass-heavy       // rgba(255,255,255,0.25)
lydian-glass-dark        // rgba(0,0,0,0.1)
lydian-glass-dark-medium // rgba(0,0,0,0.15)
lydian-glass-dark-heavy  // rgba(0,0,0,0.25)
```

---

## Common Patterns

### Buttons

```tsx
// ❌ OLD - Primary button
<button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg">

// ✅ NEW - Using design tokens
<button className="bg-lydian-primary text-lydian-text-inverse hover:bg-lydian-primary-hover px-4 py-2 rounded-lg">

// ✅ BEST - Use Button component
import { Button } from '@/components/ui/button';
<Button variant="primary">Save</Button>
```

### Cards

```tsx
// ❌ OLD
<div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">

// ✅ NEW
<div className="bg-lydian-bg border border-lydian-border rounded-lg p-4 shadow-md">

// ✅ BEST - Use Card component
import { Card } from '@/components/ui/Card';
<Card variant="default" padding="md">
```

### Status Badges

```tsx
// ❌ OLD - Success badge
<span className="bg-green-100 text-green-800 px-2 py-1 rounded">

// ✅ NEW
<span className="bg-lydian-success-lighter text-lydian-success-text px-2 py-1 rounded">

// ❌ OLD - Error badge
<span className="bg-red-100 text-red-800 px-2 py-1 rounded">

// ✅ NEW
<span className="bg-lydian-error-lighter text-lydian-error-text px-2 py-1 rounded">
```

### Forms

```tsx
// ❌ OLD - Input field
<input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />

// ✅ NEW
<input className="border-lydian-border focus:border-lydian-primary focus:ring-lydian-primary" />

// ❌ OLD - Error message
<p className="text-red-500 text-sm mt-1">

// ✅ NEW
<p className="text-lydian-error text-sm mt-1">
```

### Selected States

```tsx
// ❌ OLD
className={isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}

// ✅ NEW
className={isSelected ? 'border-lydian-primary bg-lydian-primary-lighter' : 'border-lydian-border'}
```

### Hover States

```tsx
// ❌ OLD
className="hover:bg-gray-100 hover:text-gray-900"

// ✅ NEW
className="hover:bg-lydian-bg-hover hover:text-lydian-text"
```

---

## Typography (Already Correct)

✅ Inter is the default font - no need to add `font-inter`
✅ Only use `font-mono` for code/technical content

```tsx
// ❌ WRONG (redundant)
className="font-inter text-lg"

// ✅ CORRECT
className="text-lg"

// ✅ CORRECT (for code)
className="font-mono text-sm"
```

---

## Automated Migration

### Using the Script

```bash
# Preview changes (dry run)
node scripts/migrate-design-tokens.js src/app/owner --dry-run

# Migrate specific directory
node scripts/migrate-design-tokens.js src/app/owner

# Migrate entire src/
node scripts/migrate-design-tokens.js --all

# Migrate single file
node scripts/migrate-design-tokens.js src/components/ui/button.tsx
```

### Manual Find & Replace (VS Code)

```
# Find
\btext-gray-400\b

# Replace
text-lydian-text-muted
```

```
# Find
\bbg-blue-600\b

# Replace
bg-lydian-primary
```

---

## Priority Files to Fix First

### Critical (Day 1)
1. ✅ `src/components/ui/button.tsx` (68 violations) - Base component
2. ✅ `src/components/ui/Card.tsx` (14 violations) - Base component

### High Priority (Day 2-3)
3. `src/app/owner/auth/register/page.tsx` (72 violations)
4. `src/pages/booking-confirmed.tsx` (47 violations)
5. `src/app/owner/settings/page.tsx` (87 violations)
6. `src/app/owner/bookings/page.tsx` (93 violations)

---

## Testing Checklist

After migration:

- [ ] Visual check: Does it look the same?
- [ ] Hover states: Do they work correctly?
- [ ] Focus states: Are they visible?
- [ ] Responsive: Test mobile/tablet/desktop
- [ ] Accessibility: Run axe DevTools
- [ ] Dark mode: Check if applicable
- [ ] Browser compatibility: Chrome, Safari, Firefox

---

## ESLint Rules (Future Prevention)

Add to `.eslintrc.js`:

```javascript
rules: {
  // Warn on raw Tailwind colors
  'no-restricted-syntax': [
    'warn',
    {
      selector: 'Literal[value=/text-gray-\\d+/]',
      message: 'Use design tokens: text-lydian-text-*'
    },
    {
      selector: 'Literal[value=/bg-blue-\\d+/]',
      message: 'Use design tokens: bg-lydian-primary or bg-lydian-info'
    }
  ]
}
```

---

## Need Help?

**Documentation:**
- Full analysis: `COMPREHENSIVE-UI-UX-ANALYSIS.md`
- Design tokens: `src/design-system/tokens.ts`

**Quick Questions:**
- "What token for dark text?" → `text-lydian-text`
- "What token for light background?" → `bg-lydian-bg-surface`
- "What token for primary button?" → `bg-lydian-primary`
- "What token for error message?" → `text-lydian-error`
- "What token for success badge?" → `bg-lydian-success-lighter text-lydian-success-text`

**Still Stuck?**
Check the design token file: `src/design-system/tokens.ts` (lines 31-192)

---

**Last Updated:** January 1, 2026
**Violations Detected:** 5,133
**Files to Migrate:** 649
**Migration Script:** `scripts/migrate-design-tokens.js`
