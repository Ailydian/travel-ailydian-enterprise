# 🎨 LyDian Travel - Design System Documentation

**Version:** 1.0.0
**Last Updated:** 2025-12-27
**Status:** Production Ready ✅

---

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [Design Tokens](#design-tokens)
3. [Component Library](#component-library)
4. [Usage Guidelines](#usage-guidelines)
5. [Token Addition Process](#token-addition-process)
6. [PR Review Checklist](#pr-review-checklist)
7. [Enforcement Rules](#enforcement-rules)
8. [Migration Guide](#migration-guide)

---

## 🎯 Introduction

### What is the Design System?

LyDian Travel Design System is a comprehensive, token-based design architecture that ensures **100% visual consistency** across the entire platform through **architectural enforcement**.

### Key Principles

1. **Single Source of Truth**: All design decisions centralized in `/src/design-system/tokens.ts`
2. **Architectural Enforcement**: ESLint blocks builds if design system is bypassed
3. **Semantic Naming**: Token names describe intent, not appearance
4. **Theme-Aware**: All tokens support future dark mode implementation
5. **Type-Safe**: Full TypeScript support with auto-completion

### Benefits

✅ **Zero Visual Inconsistency**: Build fails if raw colors used
✅ **Faster Development**: No more "which color?" decisions
✅ **Easy Theming**: Change once, apply everywhere
✅ **Better DX**: IDE auto-completion + inline docs
✅ **Future-Proof**: Dark mode ready, scalable architecture

---

## 🎨 Design Tokens

### Location

All tokens are defined in:
```
/src/design-system/tokens.ts
```

### Token Categories

#### 1. Color Tokens

##### Primary Colors
```typescript
// Brand red - main call-to-action color
lydian-primary           // #DC2626 - Primary brand color
lydian-primary-hover     // #B91C1C - Hover state
lydian-primary-active    // #991B1B - Active/pressed state
lydian-primary-light     // #FCA5A5 - Light variant
lydian-primary-lighter   // #FEE2E2 - Lightest variant
lydian-primary-dark      // #991B1B - Dark variant
lydian-primary-darker    // #7F1D1D - Darkest variant
```

##### Secondary Colors
```typescript
lydian-secondary         // #764BA2 - Secondary accent
lydian-secondary-hover   // #5A3A7F
lydian-secondary-active  // #4A2E68
```

##### Semantic Colors
```typescript
// Success (green)
lydian-success           // #10B981
lydian-success-hover     // #059669
lydian-success-light     // #D1FAE5
lydian-success-lighter   // #ECFDF5

// Warning (yellow)
lydian-warning           // #F59E0B
lydian-warning-hover     // #D97706
lydian-warning-light     // #FEF3C7

// Error (red)
lydian-error             // #EF4444
lydian-error-hover       // #DC2626
lydian-error-light       // #FEE2E2

// Info (blue)
lydian-info              // #3B82F6
lydian-info-hover        // #2563EB
lydian-info-light        // #DBEAFE
```

##### Neutral Colors - Text
```typescript
lydian-text              // #111827 - Primary text (dark on light bg)
lydian-text-secondary    // #374151 - Secondary text
lydian-text-tertiary     // #6B7280 - Tertiary text
lydian-text-muted        // #9CA3AF - Muted/disabled text
lydian-text-dim          // #D1D5DB - Very dim text
lydian-text-inverse      // #FFFFFF - Text on dark backgrounds
```

##### Neutral Colors - Backgrounds
```typescript
lydian-bg                // #FFFFFF - Default background
lydian-bg-surface        // #F9FAFB - Surface/card background
lydian-bg-surface-raised // #F3F4F6 - Raised surface
lydian-bg-overlay        // #00000080 - Modal overlay
lydian-bg-hover          // #F9FAFB - Hover background
lydian-bg-active         // #F3F4F6 - Active background
```

##### Neutral Colors - Borders
```typescript
lydian-border            // #E5E7EB - Default border
lydian-border-light      // #F3F4F6 - Light border
lydian-border-medium     // #D1D5DB - Medium border
lydian-border-heavy      // #9CA3AF - Heavy border
lydian-border-focus      // #3B82F6 - Focus ring border
```

##### Glassmorphism
```typescript
lydian-glass-light       // rgba(255, 255, 255, 0.1)
lydian-glass-medium      // rgba(255, 255, 255, 0.15)
lydian-glass-heavy       // rgba(255, 255, 255, 0.25)
lydian-glass-dark        // rgba(0, 0, 0, 0.1)
lydian-glass-dark-medium // rgba(0, 0, 0, 0.15)
lydian-glass-dark-heavy  // rgba(0, 0, 0, 0.25)
```

#### 2. Typography Tokens

```typescript
// Font Families
font-sans    // Inter, system-ui, sans-serif
font-serif   // Georgia, Cambria, serif
font-mono    // Menlo, Monaco, monospace

// Font Sizes (with line heights)
text-xs      // 0.75rem / 1rem
text-sm      // 0.875rem / 1.25rem
text-base    // 1rem / 1.5rem
text-lg      // 1.125rem / 1.75rem
text-xl      // 1.25rem / 1.75rem
text-2xl     // 1.5rem / 2rem
text-3xl     // 1.875rem / 2.25rem
text-4xl     // 2.25rem / 2.5rem
text-5xl     // 3rem / 1
text-6xl     // 3.75rem / 1
text-7xl     // 4.5rem / 1
text-8xl     // 6rem / 1
text-9xl     // 8rem / 1

// Font Weights
font-thin        // 100
font-extralight  // 200
font-light       // 300
font-normal      // 400
font-medium      // 500
font-semibold    // 600
font-bold        // 700
font-extrabold   // 800
font-black       // 900
```

#### 3. Spacing Tokens

```typescript
// 4px base unit
0     // 0
px    // 1px
0.5   // 2px
1     // 4px
1.5   // 6px
2     // 8px
2.5   // 10px
3     // 12px
4     // 16px
5     // 20px
6     // 24px
8     // 32px
10    // 40px
12    // 48px
16    // 64px
20    // 80px
24    // 96px
32    // 128px
40    // 160px
48    // 192px
56    // 224px
64    // 256px
72    // 288px
80    // 320px
96    // 384px
```

#### 4. Shadow Tokens

```typescript
shadow-sm     // Small shadow
shadow-md     // Medium shadow
shadow-lg     // Large shadow
shadow-xl     // Extra large shadow
shadow-2xl    // 2X large shadow
shadow-inner  // Inner shadow

// Glow effects
shadow-glow-primary   // Primary color glow
shadow-glow-success   // Success color glow
shadow-glow-warning   // Warning color glow
shadow-glow-error     // Error color glow
shadow-glow-info      // Info color glow
```

#### 5. Border Radius Tokens

```typescript
rounded-none  // 0
rounded-sm    // 0.125rem (2px)
rounded-md    // 0.375rem (6px)
rounded-lg    // 0.5rem (8px)
rounded-xl    // 0.75rem (12px)
rounded-2xl   // 1rem (16px)
rounded-3xl   // 1.5rem (24px)
rounded-full  // 9999px (circular)
```

---

## 🧩 Component Library

### Button Component

```typescript
import { FuturisticButton } from '@/components/neo-glass';

// Variants
<FuturisticButton variant="primary">Primary</FuturisticButton>
<FuturisticButton variant="secondary">Secondary</FuturisticButton>
<FuturisticButton variant="glass">Glass Effect</FuturisticButton>
<FuturisticButton variant="neo">Neomorphic</FuturisticButton>
<FuturisticButton variant="outline">Outline</FuturisticButton>

// Sizes
<FuturisticButton size="sm">Small</FuturisticButton>
<FuturisticButton size="md">Medium</FuturisticButton>
<FuturisticButton size="lg">Large</FuturisticButton>
<FuturisticButton size="xl">Extra Large</FuturisticButton>

// With Icon
<FuturisticButton
  icon={<ArrowRight />}
  iconPosition="right"
>
  Next
</FuturisticButton>

// Glow Effect
<FuturisticButton glow>Glowing Button</FuturisticButton>
```

### Card Component

```typescript
import { FuturisticCard } from '@/components/neo-glass';

<FuturisticCard
  title="Card Title"
  description="Card description"
  image="https://..."
  price="₺299"
  badge="Popular"
  badges={['New', 'Featured']}
  metadata={[
    { icon: <MapPin />, label: 'Location' },
    { icon: <Clock />, label: 'Duration' }
  ]}
  rating={4.8}
  reviews={1234}
  onClick={() => navigate('/details')}
  category="tour"
  categoryColor="#00BAFF"
/>
```

---

## 📖 Usage Guidelines

### ✅ DO: Use Semantic Tokens

```typescript
// ✅ CORRECT - Semantic token names
<h1 className="text-lydian-text">Title</h1>
<p className="text-lydian-text-secondary">Subtitle</p>
<button className="bg-lydian-primary text-lydian-text-inverse">
  Click Me
</button>
```

### ❌ DON'T: Use Raw Tailwind Colors

```typescript
// ❌ WRONG - Raw Tailwind colors (BUILD WILL FAIL)
<h1 className="text-gray-900">Title</h1>
<p className="text-gray-600">Subtitle</p>
<button className="bg-blue-600 text-white">
  Click Me
</button>
```

### Token Selection Guide

#### For Text Colors:

| Use Case | Token |
|----------|-------|
| Primary heading | `text-lydian-text` |
| Secondary text | `text-lydian-text-secondary` |
| Tertiary text | `text-lydian-text-tertiary` |
| Disabled/muted | `text-lydian-text-muted` |
| Very dim text | `text-lydian-text-dim` |
| Text on dark bg | `text-lydian-text-inverse` |

#### For Backgrounds:

| Use Case | Token |
|----------|-------|
| Main background | `bg-lydian-bg` |
| Card/surface | `bg-lydian-bg-surface` |
| Raised card | `bg-lydian-bg-surface-raised` |
| Hover state | `bg-lydian-bg-hover` |
| Glass effect (light) | `bg-lydian-glass-light` |
| Glass effect (dark) | `bg-lydian-glass-dark` |

#### For Borders:

| Use Case | Token |
|----------|-------|
| Default border | `border-lydian-border` |
| Light border | `border-lydian-border-light` |
| Medium border | `border-lydian-border-medium` |
| Heavy border | `border-lydian-border-heavy` |
| Focus ring | `border-lydian-border-focus` |

#### For Call-to-Actions:

| Use Case | Token |
|----------|-------|
| Primary CTA | `bg-lydian-primary` |
| CTA hover | `hover:bg-lydian-primary-hover` |
| CTA active | `active:bg-lydian-primary-active` |
| Secondary CTA | `bg-lydian-secondary` |

---

## ➕ Token Addition Process

### When to Add New Tokens

Add new tokens when:
1. ✅ New design requirement cannot be met with existing tokens
2. ✅ Proposed token will be reused across multiple components
3. ✅ Token represents a semantic concept (not just a color value)

Do NOT add tokens when:
1. ❌ Existing token can serve the purpose
2. ❌ Token is for one-off use case
3. ❌ Token duplicates existing functionality

### Step-by-Step Process

#### 1. Propose New Token

Create an issue in GitHub with:
- **Token Name**: `lydian-[semantic-name]`
- **Purpose**: Why this token is needed
- **Use Cases**: Where it will be used (minimum 3 locations)
- **Value**: Proposed color/value

**Example:**
```markdown
## New Token Proposal

**Name:** `lydian-accent-purple`
**Purpose:** Secondary accent color for premium features
**Use Cases:**
1. Premium badge backgrounds
2. VIP section highlights
3. Exclusive offer cards

**Value:** `#9333EA`
**Variants Needed:** hover, light, lighter
```

#### 2. Design Review

Design system owner reviews:
- Semantic appropriateness
- Overlap with existing tokens
- Naming consistency
- Value appropriateness

#### 3. Implementation

If approved:

**A. Update tokens.ts:**
```typescript
// /src/design-system/tokens.ts

export const colorTokens = {
  // ... existing tokens

  // New token
  accent: {
    DEFAULT: '#9333EA',
    hover: '#7E22CE',
    active: '#6B21A8',
    light: '#E9D5FF',
    lighter: '#F3E8FF',
  } as const,
} as const;
```

**B. Update flattenColorTokens():**
```typescript
export function flattenColorTokens() {
  return {
    lydian: {
      // ... existing mappings

      // New token mappings
      'accent': colorTokens.accent.DEFAULT,
      'accent-hover': colorTokens.accent.hover,
      'accent-active': colorTokens.accent.active,
      'accent-light': colorTokens.accent.light,
      'accent-lighter': colorTokens.accent.lighter,
    },
  };
}
```

**C. Add JSDoc Documentation:**
```typescript
/**
 * Accent Colors - Secondary brand accent
 *
 * Usage:
 * - `lydian-accent`: Premium feature highlights
 * - `lydian-accent-hover`: Hover state for premium elements
 * - `lydian-accent-light`: Light backgrounds for premium sections
 *
 * @example
 * <div className="bg-lydian-accent-light border-lydian-accent">
 *   Premium Content
 * </div>
 */
```

**D. Update Documentation:**
Add to this file (DESIGN_SYSTEM.md) under Color Tokens section.

#### 4. Test Build

```bash
npm run build
```

Ensure:
- ✅ Build succeeds
- ✅ No TypeScript errors
- ✅ Auto-completion works in IDE

#### 5. Create PR

PR title: `feat(tokens): Add lydian-accent token`

PR description:
```markdown
## New Design Token

**Token:** `lydian-accent`
**Purpose:** Secondary accent color for premium features

### Changes:
- Added accent color family to tokens.ts
- Updated flattenColorTokens()
- Added JSDoc documentation
- Updated DESIGN_SYSTEM.md

### Testing:
- [x] Build passes
- [x] TypeScript types correct
- [x] IDE auto-completion works
- [x] Used in 3+ components

### Usage Examples:
- Premium badge backgrounds
- VIP section highlights
- Exclusive offer cards
```

---

## ✅ PR Review Checklist

### For All PRs

#### 1. Design System Compliance

```markdown
- [ ] No raw Tailwind colors used (text-gray-*, bg-blue-*, etc.)
- [ ] No inline styles (style={{...}})
- [ ] Only lydian-* tokens used for colors
- [ ] Build passes without ESLint violations
```

#### 2. Component Usage

```markdown
- [ ] Uses existing components (Button, Card, etc.) where applicable
- [ ] No duplicate component implementations
- [ ] Component props are typed correctly
```

#### 3. Code Quality

```markdown
- [ ] TypeScript strict mode compliant
- [ ] No `any` types
- [ ] Proper error handling
- [ ] Meaningful variable names
```

### For New Components

```markdown
- [ ] Component uses design tokens exclusively
- [ ] Component is reusable (not page-specific)
- [ ] Component has JSDoc documentation
- [ ] Component has proper TypeScript types
- [ ] Component supports common variants (size, color, etc.)
- [ ] Component has accessibility attributes (aria-*)
```

### For Token Changes

```markdown
- [ ] Token has semantic name (not color-based)
- [ ] Token is used in 3+ locations
- [ ] Token has JSDoc documentation
- [ ] All variants included (hover, active, light, etc.)
- [ ] flattenColorTokens() updated
- [ ] DESIGN_SYSTEM.md updated
```

### UI Review Checklist

```markdown
- [ ] Visual consistency with existing pages
- [ ] Proper spacing (uses spacing tokens)
- [ ] Proper typography (uses typography tokens)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Hover/active states defined
- [ ] Accessibility (contrast ratios, focus states)
```

---

## 🚨 Enforcement Rules

### ESLint Configuration

Location: `.eslintrc.design-system.js`

#### Rule 1: Block Raw Tailwind Colors (ERROR)

**Blocked Patterns:**
```regex
text-(gray|blue|red|green|yellow|purple|slate|zinc|neutral|stone)-(50|100|200|300|400|500|600|700|800|900)
bg-(gray|blue|red|green|yellow|purple|slate|zinc|neutral|stone)-(50|100|200|300|400|500|600|700|800|900)
border-(gray|blue|red|green|yellow|purple|slate|zinc|neutral|stone)-(50|100|200|300|400|500|600|700|800|900)
```

**Error Message:**
```
❌ DESIGN SYSTEM VIOLATION: Use lydian.* tokens instead of raw Tailwind colors.

Examples:
  ❌ text-gray-300 → ✅ text-lydian-text-dim
  ❌ bg-blue-600 → ✅ bg-lydian-primary
  ❌ border-red-500 → ✅ border-lydian-error

See: /src/design-system/tokens.ts
```

#### Rule 2: Block Inline Styles (ERROR)

**Blocked:**
```typescript
<div style={{ color: 'red', padding: '10px' }}>
```

**Error Message:**
```
❌ DESIGN SYSTEM VIOLATION: Inline styles are forbidden.

Reason: Inline styles bypass the design system and create inconsistency.

Solutions:
  1. Use Tailwind classes with lydian.* tokens
  2. Create a component with proper props
  3. For dynamic values, use CSS-in-JS utility functions
```

#### Rule 3: Warn Against Ad-hoc Components (WARNING)

**Warns for:**
```typescript
// Ad-hoc card
<div className="bg-white rounded-lg shadow-md p-4">...</div>

// Ad-hoc button
<button className="bg-blue-600 text-white px-4 py-2 rounded">...</button>
```

**Recommendation:**
```typescript
// Use component library
<Card padding="md" shadow="md">...</Card>
<Button variant="primary">...</Button>
```

### Override Strategy

```javascript
overrides: [
  {
    // Legacy files: warnings only (migration period)
    files: ['src/pages/**/*.tsx', 'src/app/**/*.tsx'],
    rules: { 'no-restricted-syntax': 'warn' }
  },
  {
    // New components: strict enforcement
    files: ['src/components/ui/**/*.tsx', 'src/design-system/**/*.tsx'],
    rules: { 'no-restricted-syntax': 'error' }
  }
]
```

---

## 🔄 Migration Guide

### For Existing Pages

#### Step 1: Analyze Current Usage

```bash
# Find raw color usages
grep -r "text-gray-" src/pages/your-page.tsx
grep -r "bg-blue-" src/pages/your-page.tsx
```

#### Step 2: Create Migration Map

| Current | Replace With | Notes |
|---------|-------------|-------|
| `text-white` | `text-lydian-text-inverse` | On dark backgrounds |
| `text-gray-900` | `text-lydian-text` | Primary text |
| `text-gray-600` | `text-lydian-text-secondary` | Secondary text |
| `text-gray-400` | `text-lydian-text-muted` | Muted text |
| `bg-white` | `bg-lydian-bg` | Default background |
| `bg-gray-50` | `bg-lydian-bg-surface` | Card backgrounds |
| `bg-blue-600` | `bg-lydian-primary` | Primary CTA |
| `border-gray-200` | `border-lydian-border` | Default border |

#### Step 3: Apply Replacements

```bash
# Use search-replace in IDE or sed
sed -i '' 's/text-gray-900/text-lydian-text/g' src/pages/your-page.tsx
sed -i '' 's/bg-blue-600/bg-lydian-primary/g' src/pages/your-page.tsx
```

#### Step 4: Test Build

```bash
npm run build
```

Fix any ESLint errors.

#### Step 5: Visual QA

- Check localhost:3000/your-page
- Verify hover states
- Verify responsive design
- Compare before/after screenshots

### For New Pages

#### Template (Always Start With This):

```typescript
import { FuturisticButton, FuturisticCard } from '@/components/neo-glass';

export default function NewPage() {
  return (
    <main className="min-h-screen bg-lydian-bg">
      {/* Hero Section */}
      <section className="py-20 bg-lydian-glass-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-lydian-text mb-4">
            Page Title
          </h1>
          <p className="text-xl text-lydian-text-secondary">
            Page description
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map(item => (
              <FuturisticCard
                key={item.id}
                title={item.title}
                description={item.description}
                onClick={() => navigate(`/item/${item.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-lydian-bg-surface">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-lydian-text mb-8">
            Ready to Get Started?
          </h2>
          <FuturisticButton
            variant="primary"
            size="xl"
            onClick={() => navigate('/signup')}
          >
            Sign Up Now
          </FuturisticButton>
        </div>
      </section>
    </main>
  );
}
```

---

## 📊 Design System Ownership

### Roles & Responsibilities

#### Design System Owner (Primary)
- **Responsibilities:**
  - Review token addition proposals
  - Approve/reject token changes
  - Maintain DESIGN_SYSTEM.md
  - Conduct design system audits
  - Coordinate with design team

- **Contact:** To be assigned
- **Decision Authority:** Final say on token additions/removals

#### Frontend Lead
- **Responsibilities:**
  - Enforce PR review checklist
  - Review component implementations
  - Guide team on token usage
  - Conduct code reviews

#### All Developers
- **Responsibilities:**
  - Follow design system guidelines
  - Use design tokens exclusively
  - Propose new tokens when needed
  - Report design system violations

### Escalation Path

1. **Question about token usage** → Ask in #frontend Slack channel
2. **Token proposal** → Create GitHub issue → Design System Owner reviews
3. **ESLint violation** → Check this doc → Fix or ask Frontend Lead
4. **Design system violation in PR** → Reviewer blocks → Developer fixes

---

## 🎓 Training & Resources

### For New Team Members

**Day 1:**
1. Read this document (DESIGN_SYSTEM.md)
2. Review `/src/design-system/tokens.ts`
3. Review `.eslintrc.design-system.js`

**Week 1:**
1. Migrate one legacy page to tokens
2. Create one new component using tokens
3. Submit first PR with design system compliance

### Reference Links

- Design Tokens: `/src/design-system/tokens.ts`
- ESLint Config: `.eslintrc.design-system.js`
- Component Library: `/src/components/neo-glass`
- Migration Examples: `/tmp/PHASE4_COMPLETION_REPORT.md`

---

## 📈 Success Metrics

### KPIs

- **Token Compliance:** Target 100% (currently: homepage 100% ✅)
- **Build Success Rate:** Target 100%
- **ESLint Violations:** Target 0
- **Developer Satisfaction:** Survey quarterly
- **Time to Create New Page:** Baseline vs. post-migration

### Quarterly Review

Design System Owner conducts review:
1. Token usage audit
2. Unused token identification
3. Token consolidation opportunities
4. Developer feedback collection
5. Documentation updates

---

## 🚀 Future Roadmap

### Q1 2026
- [ ] Complete Phase 6 automated migration (9,285 remaining usages)
- [ ] Dark mode token variants
- [ ] Design system playground/sandbox

### Q2 2026
- [ ] Figma integration (design tokens sync)
- [ ] Storybook documentation
- [ ] Visual regression testing

### Q3 2026
- [ ] Animation token system
- [ ] Advanced component variants
- [ ] Performance optimization

---

## 📝 Changelog

### Version 1.0.0 (2025-12-27)

**Added:**
- Initial design token system (60+ tokens)
- ESLint enforcement architecture
- Component library (Button, Card)
- Governance documentation
- PR review checklist
- Migration guide

**Completed Phases:**
- ✅ Phase 1: Root Cause Diagnostic
- ✅ Phase 2: Design Token System
- ✅ Phase 3: Enforcement Architecture
- ✅ Phase 4: Homepage Migration
- ✅ Phase 5: Governance Documentation

**Pending:**
- Phase 6: Automated Migration (9,285 usages)

---

## ❓ FAQ

### Q: Why can't I use `text-gray-300`?
**A:** Raw Tailwind colors bypass the design system. Use `text-lydian-text-dim` instead. This ensures visual consistency and enables future theming (dark mode).

### Q: What if I need a color that doesn't have a token?
**A:** Follow the [Token Addition Process](#token-addition-process). If you truly need a new token and it will be reused across multiple components, propose it via GitHub issue.

### Q: Can I use inline styles for dynamic values?
**A:** No. Use CSS-in-JS utilities or create component props. Example:
```typescript
// ❌ WRONG
<div style={{ opacity: dynamicValue }}>

// ✅ CORRECT
<div className={`opacity-${dynamicValue >= 0.5 ? '100' : '50'}`}>
```

### Q: How do I migrate a large page?
**A:** Follow the [Migration Guide](#migration-guide). Use search-replace for bulk changes, then test build. Visual QA is essential.

### Q: Build is failing with ESLint error. What do I do?
**A:** The error message shows exactly what's wrong. Example:
```
❌ text-gray-300 → ✅ text-lydian-text-dim
```
Replace the raw color with the suggested token.

### Q: Can I temporarily disable ESLint for migration?
**A:** No. The whole point is architectural enforcement. Fix the violations instead. Legacy files show warnings (not errors) to allow gradual migration.

---

**Document Owner:** Design System Team
**Last Review:** 2025-12-27
**Next Review:** 2026-01-27
**Status:** Living Document - Updated as system evolves

🎨 **For questions or suggestions, create a GitHub issue tagged with `design-system`**
