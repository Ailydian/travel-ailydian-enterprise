# Button Component Migration Guide

## Overview

This guide documents the consolidation of 7+ button components into a single, unified Button component system.

## What Changed?

### Consolidated Components

All the following components are now replaced by the unified `Button` component:

1. **button.tsx** - Base button (enhanced)
2. **NeoButton.tsx** - Glassmorphism/Neomorphism effects → `variant="glass"` or `variant="neo"`
3. **MinimalistButton.tsx** - Clean design → `variant="ghost"` or `variant="outline"`
4. **FuturisticButton.tsx** - 3D tilt, glow effects → `effect="tilt"` or `effect="glow"`
5. **SimpleBackButton.tsx** - Navigation buttons → Use `Button` with routing
6. **PremiumVoiceButton.tsx** - Special interactive states → Use `Button` with custom effects
7. **WatchPriceButton.tsx** - Specific use case → Use `Button` with custom content

## Migration Paths

### 1. NeoButton → Button

**Before:**
```tsx
import { NeoButton } from '@/components/neo-glass/NeoButton';

<NeoButton variant="glass" size="md" icon={icon}>
  Click Me
</NeoButton>
```

**After:**
```tsx
import { Button } from '@/components/ui/button';

<Button variant="glass" size="md" leftIcon={icon}>
  Click Me
</Button>
```

**Mapping:**
- `variant="primary"` → `variant="primary"` + `effect="glow"`
- `variant="secondary"` → `variant="secondary"` + `effect="glow"`
- `variant="glass"` → `variant="glass"`
- `variant="neo"` → `variant="neo"`
- `variant="gradient"` → `variant="gradient"`
- `icon` prop → `leftIcon` or `rightIcon`
- `iconPosition="left"` → `leftIcon`
- `iconPosition="right"` → `rightIcon`

---

### 2. MinimalistButton → Button

**Before:**
```tsx
import { MinimalistButton } from '@/components/minimalist/MinimalistButton';

<MinimalistButton variant="primary" size="md">
  Submit
</MinimalistButton>
```

**After:**
```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="md">
  Submit
</Button>
```

**Mapping:**
- `variant="primary"` → `variant="primary"`
- `variant="secondary"` → `variant="outline"`
- `variant="ghost"` → `variant="ghost"`

---

### 3. FuturisticButton → Button

**Before:**
```tsx
import { FuturisticButton } from '@/components/neo-glass/FuturisticButton';

<FuturisticButton
  variant="ai"
  size="lg"
  glow={true}
  icon={icon}
  iconPosition="left"
>
  AI Action
</FuturisticButton>
```

**After:**
```tsx
import { Button } from '@/components/ui/button';

<Button
  variant="ai"
  size="lg"
  effect="glow"
  leftIcon={icon}
>
  AI Action
</Button>
```

**Mapping:**
- `variant="ai"` → `variant="ai"`
- `variant="primary"` → `variant="gradient"` + `effect="tilt"`
- `variant="success"` → `variant="success"` + `effect="glow"`
- `glow={true}` → `effect="glow"`
- Enable 3D tilt → `effect="tilt"`
- `icon` + `iconPosition` → `leftIcon` or `rightIcon`

---

### 4. SimpleBackButton → Button

**Before:**
```tsx
import { SimpleBackButton } from '@/components/navigation/SimpleBackButton';

<SimpleBackButton showHomeButton showBackButton />
```

**After:**
```tsx
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { Home, ArrowLeft } from 'lucide-react';

const router = useRouter();

<div className="fixed top-4 left-4 z-50 flex gap-2">
  <Button
    variant="primary"
    size="md"
    leftIcon={<Home className="w-5 h-5" />}
    onClick={() => router.push('/')}
  >
    Anasayfa
  </Button>

  <Button
    variant="secondary"
    size="md"
    leftIcon={<ArrowLeft className="w-5 h-5" />}
    onClick={() => router.back()}
  >
    Geri
  </Button>
</div>
```

---

### 5. Icon-Only Buttons → IconButton

**Before:**
```tsx
<button className="...">
  <HeartIcon />
</button>
```

**After:**
```tsx
import { IconButton } from '@/components/ui/IconButton';

<IconButton
  icon={<HeartIcon />}
  aria-label="Add to favorites"
  variant="ghost"
  size="sm"
  shape="circle"
/>
```

---

## New Features Available

### 1. Link Buttons

```tsx
<Button as="link" href="/dashboard" variant="primary">
  Go to Dashboard
</Button>

<Button as="link" href="https://example.com" external variant="outline">
  External Link
</Button>
```

### 2. Async onClick Handlers

```tsx
<Button
  onClick={async () => {
    await saveData();
  }}
  loading={isSaving}
>
  Save
</Button>
```

### 3. Visual Effects

```tsx
// Glow effect
<Button variant="primary" effect="glow">Glow Button</Button>

// 3D Tilt effect
<Button variant="ai" effect="tilt">Tilt Button</Button>

// Pulse effect
<Button variant="success" effect="pulse">Pulse Button</Button>

// Shimmer effect (automatic on gradient/ai variants)
<Button variant="gradient">Shimmer Button</Button>
```

### 4. All Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="glass">Glass</Button>
<Button variant="neo">Neo</Button>
<Button variant="gradient">Gradient</Button>
<Button variant="ai">AI</Button>
```

### 5. All Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (Default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

---

## Complete Props Reference

```typescript
interface ButtonProps {
  // Variants
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'outline' | 'glass' | 'neo' | 'gradient' | 'ai';

  // Sizes
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  // States
  loading?: boolean;
  disabled?: boolean;

  // Layout
  fullWidth?: boolean;

  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;

  // Effects
  effect?: 'none' | 'glow' | 'tilt' | 'shimmer' | 'pulse';

  // Behavior
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  type?: 'button' | 'submit' | 'reset';

  // Link mode
  as?: 'button' | 'link';
  href?: string; // when as="link"
  external?: boolean; // when as="link"

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;

  // Standard props
  className?: string;
  children?: React.ReactNode;
}
```

---

## Automated Migration Script

A migration script has been created to help automate the conversion:

```bash
# Run the migration script
node scripts/migrate-buttons.js

# Or manually search and replace
grep -r "import.*NeoButton" src --include="*.tsx"
grep -r "import.*MinimalistButton" src --include="*.tsx"
grep -r "import.*FuturisticButton" src --include="*.tsx"
```

---

## Breaking Changes

### Removed Props

- ❌ `iconPosition` - Use `leftIcon` or `rightIcon` instead
- ❌ `glow` (boolean) - Use `effect="glow"` instead
- ❌ NeoButton's `variant="primary"` with blue gradients - Now uses Lydian RED brand colors

### Changed Defaults

- Default variant is now `"primary"` (Lydian RED)
- Default size is `"md"`
- All buttons now use design tokens for colors

---

## Testing Checklist

After migration, test the following:

- [ ] All button variants render correctly
- [ ] Loading states work as expected
- [ ] Disabled states have correct styling
- [ ] Icons display properly (left/right/only)
- [ ] Link buttons navigate correctly
- [ ] Hover/focus states are accessible
- [ ] Mobile touch targets are adequate (min 44x44px)
- [ ] Keyboard navigation works
- [ ] Screen readers announce buttons correctly

---

## Support

For questions or issues during migration:

1. Check the examples in `/src/components/ui/button.tsx`
2. Review the Storybook stories (if available)
3. Consult the design system documentation

---

## Timeline

- **Phase 1**: Unified Button component created ✅
- **Phase 2**: Migration of all pages (in progress)
- **Phase 3**: Deprecation warnings added to old components
- **Phase 4**: Remove old button components (after full migration)

---

Last Updated: 2026-01-01
