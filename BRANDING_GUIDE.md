# Travel LyDian - Brand Identity Guide

## Brand Overview

**Brand Name:** Travel LyDian
**Industry:** Tourism & Travel Technology
**Positioning:** Premium AI-powered global tourism platform
**Launch Date:** 2025

---

## Logo Usage

### Logo Variants

We have 3 official logo variants available through the `LyDianLogo` component:

#### 1. Full Logo (Primary)
- **Usage:** Main header, landing pages, marketing materials
- **Component:** `<LyDianLogo variant="full" />`
- **Features:**
  - "Travel" text in gradient (primary branding)
  - "LyDian" text below in gray
  - Animated plane icon
  - Breathing animation effect

#### 2. Compact Logo
- **Usage:** Mobile headers, small spaces, secondary placements
- **Component:** `<LyDianLogo variant="compact" />`
- **Features:**
  - Icon + "LyDian" text only
  - No "Travel" prefix
  - Suitable for tight spaces

#### 3. Icon Only
- **Usage:** Favicons, app icons, social media avatars
- **Component:** `<LyDianLogo variant="icon" />`
- **Features:**
  - Plane icon in gradient box
  - Perfect square aspect ratio
  - Minimal, recognizable

### Logo Sizes

Available sizes: `sm`, `md` (default), `lg`, `xl`

```tsx
<LyDianLogo variant="full" size="lg" />
```

### Animation Control

```tsx
// Animated (default)
<LyDianLogo animated={true} />

// Static (for print, screenshots)
<LyDianLogo animated={false} />
```

---

## Color Palette

### Primary Colors

#### LyDian Red (Brand Color)
- **Primary:** `#DC2626` (red-600)
- **Usage:** CTAs, links, active states, highlights
- **Tailwind:** `lydian-primary`, `bg-lydian-primary`, `text-lydian-primary`

#### Secondary Red
- **Secondary:** `#EF4444` (red-500)
- **Usage:** Hover states, gradients, secondary CTAs
- **Tailwind:** `lydian-secondary`, `bg-lydian-secondary`

#### Dark Red
- **Dark:** `#991B1B` (red-800)
- **Usage:** Dark mode, text on light backgrounds, pressed states
- **Tailwind:** `lydian-dark`, `bg-lydian-dark`

### Neutral Colors

#### Text Colors
- **Primary Text:** `#111827` (gray-900)
- **Secondary Text:** `#374151` (gray-700)
- **Muted Text:** `#6B7280` (gray-500)
- **Dim Text:** `#9CA3AF` (gray-400)

#### Background Colors
- **Pure White:** `#FFFFFF`
- **Surface:** `#F9FAFB` (very light gray)
- **Hover:** `#F3F4F6`
- **Selected:** `#FEF2F2` (red tint)

#### Borders
- **Default:** `#E5E7EB` (gray-200)
- **Light:** `#F3F4F6`
- **Dark:** `#D1D5DB`

### Accent Colors

- **Success:** `#059669` (green-600) - Booking confirmations, success states
- **Warning:** `#F59E0B` (amber-500) - Warnings, alerts
- **Error:** `#DC2626` (red-600) - Errors, destructive actions
- **Info:** `#3B82F6` (blue-500) - Information, help text

---

## Typography

### Font Families

#### Sans-Serif (Primary)
- **Font:** Inter, system-ui, sans-serif
- **Usage:** Body text, UI elements, navigation
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 900 (black)

#### Monospace
- **Font:** JetBrains Mono
- **Usage:** Code snippets, technical content

#### Display
- **Font:** Orbitron
- **Usage:** Special headings, futuristic elements

### Font Sizes

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| xs | 0.75rem | 1rem | Small labels, captions |
| sm | 0.875rem | 1.25rem | Small text, secondary info |
| base | 1rem | 1.5rem | Body text (default) |
| lg | 1.125rem | 1.75rem | Large body text |
| xl | 1.25rem | 1.75rem | Small headings |
| 2xl | 1.5rem | 2rem | Card titles |
| 3xl | 1.875rem | 2.25rem | Section headings |
| 4xl | 2.25rem | 2.5rem | Page titles |
| 5xl | 3rem | 1.2 | Hero headings |

---

## Brand Elements

### Gradients

#### Primary Gradient
```css
background: linear-gradient(to right, #DC2626, #EF4444);
```
**Usage:** Main CTAs, hero sections, highlights

#### Red Gradient (Subtle)
```css
background: linear-gradient(to bottom right, #DC2626, #EF4444, #DC2626);
```
**Usage:** Backgrounds, cards, decorative elements

### Shadows

#### Card Shadows
- **Default:** `shadow-card` - Subtle elevation
- **Hover:** `shadow-card-hover` - Increased elevation on hover

#### Red Accent Shadows
- **Default:** `shadow-red` - Subtle red glow
- **Large:** `shadow-red-lg` - Prominent red glow

### Border Radius

- **Small:** `0.25rem` (4px) - Small elements
- **Default:** `0.375rem` (6px) - Booking.com standard
- **Medium:** `0.5rem` (8px) - Cards, buttons
- **Large:** `0.75rem` (12px) - Large cards
- **XL:** `1rem` (16px) - Modals, major sections

---

## Design Principles

### 1. Clean & Professional
- Maintain whitespace
- Use clean lines and simple layouts
- Avoid clutter

### 2. Trust-Building
- Clear pricing
- Transparent information
- Professional imagery

### 3. Modern & Dynamic
- Smooth animations
- Gradient accents
- Contemporary UI patterns

### 4. Mobile-First
- Responsive design
- Touch-friendly targets (min 44px)
- Optimized for all screen sizes

---

## Logo Usage Guidelines

### DO ✓

- Use official logo components (`<LyDianLogo />`)
- Maintain proper spacing around logo (minimum clearance: logo height)
- Use on white or very light backgrounds
- Scale proportionally
- Use provided color variants

### DON'T ✗

- Modify logo colors outside brand palette
- Stretch or distort logo
- Add effects (drop shadows, outlines, etc.)
- Use on busy backgrounds
- Recreate logo manually
- Use low-resolution versions

---

## Component Library

### Logo Component Location
```
/src/components/branding/LyDianLogo.tsx
```

### Example Usage

```tsx
import { LyDianLogo } from '@/components/branding/LyDianLogo';

// Full logo with animation
<LyDianLogo variant="full" size="md" animated={true} />

// Compact logo
<LyDianLogo variant="compact" size="sm" />

// Icon only
<LyDianLogo variant="icon" size="lg" />

// With click handler
<LyDianLogo
  variant="full"
  onClick={() => router.push('/')}
/>
```

---

## Tailwind CSS Classes

### Background Colors
```css
bg-lydian-primary     /* #DC2626 */
bg-lydian-secondary   /* #EF4444 */
bg-lydian-dark        /* #991B1B */
bg-lydian-light       /* #FCA5A5 */
```

### Text Colors
```css
text-lydian-primary
text-lydian-secondary
text-lydian-dark
```

### Border Colors
```css
border-lydian-primary
border-lydian-secondary
```

### Gradient Classes
```css
from-lydian-primary to-lydian-secondary
bg-gradient-to-r from-lydian-primary to-lydian-secondary
```

---

## Brand Voice & Messaging

### Brand Personality
- **Professional** yet approachable
- **Innovative** and tech-forward
- **Trustworthy** and reliable
- **Global** but locally aware

### Key Messages
- "Your AI-Powered Travel Companion"
- "Discover the World with Intelligence"
- "Premium Travel, Simplified"
- "Where Technology Meets Adventure"

### Tone of Voice
- Clear and concise
- Friendly but professional
- Informative without jargon
- Helpful and supportive

---

## File Naming Conventions

### Images
- Logo files: `lydian-logo-[variant]-[size].png/svg`
- Example: `lydian-logo-full-md.svg`

### Components
- Branding components: `LyDian[Component].tsx`
- Example: `LyDianLogo.tsx`, `LyDianBanner.tsx`

### CSS Classes
- Use `lydian-` prefix for brand-specific classes
- Example: `lydian-primary`, `lydian-gradient`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2025-12-26 | Complete rebrand from Ailydian to LyDian |
| 1.0.0 | 2024 | Initial Ailydian brand launch |

---

## Contact & Support

For branding questions or logo assets:
- **Email:** brand@lydian.com
- **Design Team:** design@lydian.com

---

**Last Updated:** December 26, 2025
**Maintained By:** Travel LyDian Design Team
