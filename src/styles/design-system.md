# Travel.Ailydian.com Design System

## Overview
This document defines the complete design system for Travel.Ailydian.com, ensuring visual consistency across all 136+ pages. Based on the homepage design (GetYourGuide-style modern aesthetic).

---

## Color Palette

### Primary Colors
```
Cyan:    #00BAFF (Main brand color)
Purple:  #667EEA (Secondary brand)
Orange:  #FF9500 (Accent/Action)
Pink:    #EC4899 (Highlight)
Green:   #10B981 (Success/Nature)
```

### Gradients
```css
/* Aurora Gradient */
from-[#00BAFF]/10 via-[#667EEA]/10 to-[#FF9500]/10

/* Primary Gradient */
from-lydian-primary to-lydian-secondary

/* Action Gradient */
from-[#667EEA] to-[#00BAFF]

/* Warm Gradient */
from-[#FF9500] to-[#EC4899]
```

### Background Colors
```
Light Background:     #FFFFFF
Card Background:      #F9FAFB
Dark Background:      from-gray-900 via-[#1a1a2e] to-gray-900
Glass Effect:         backdrop-blur-3xl with rgba overlays
Neo-Glass:            Gradient + glassmorphism combination
```

### Text Colors
```
Primary Text (Light):     #111827 (neutral-900)
Secondary Text (Light):   #4B5563 (neutral-600)
Tertiary Text (Light):    #6B7280 (neutral-500)
Primary Text (Dark):      #F9FAFB (neutral-50)
Dimmed Text (Dark):       rgba(255, 255, 255, 0.7)
```

---

## Typography

### Font Families
```css
Sans Serif (Body):    'Inter', -apple-system, BlinkMacSystemFont, sans-serif
Display (Headings):   'Cal Sans', 'Inter', sans-serif
Monospace (Code):     'Fira Code', 'Consolas', monospace
```

### Font Scale
```
xs:   12px (0.75rem)   - Small labels, captions
sm:   14px (0.875rem)  - Body small, secondary text
base: 16px (1rem)      - Body text, paragraphs
lg:   18px (1.125rem)  - Emphasized text
xl:   20px (1.25rem)   - Subheadings
2xl:  24px (1.5rem)    - Section subheadings
3xl:  30px (1.875rem)  - Card titles
4xl:  36px (2.25rem)   - Page titles
5xl:  48px (3rem)      - Hero titles
6xl:  60px (3.75rem)   - Large hero titles
7xl:  72px (4.5rem)    - Extra large heroes
```

### Font Weights
```
light:      300 - Subtle text
normal:     400 - Body text
medium:     500 - Emphasized text
semibold:   600 - Subheadings
bold:       700 - Headings
extrabold:  800 - Strong headings
black:      900 - Hero titles
```

### Line Heights
```
tight:    1.25  - Headlines, short text
snug:     1.375 - Subheadings
normal:   1.5   - Body text
relaxed:  1.625 - Readable paragraphs
loose:    2     - Spacious paragraphs
```

---

## Spacing System (8px Grid)

### Spacing Scale
```
2:   8px    - Tight spacing
3:   12px   - Small gaps
4:   16px   - Default spacing
6:   24px   - Medium spacing
8:   32px   - Large spacing
12:  48px   - Section spacing
16:  64px   - Large section spacing
20:  80px   - Extra large spacing
24:  96px   - Hero spacing
```

### Section Padding
```css
/* Small Sections */
py-8 (32px)

/* Medium Sections */
py-12 md:py-16 (48px - 64px)

/* Large Sections */
py-16 md:py-20 (64px - 80px)

/* Hero Sections */
py-20 md:py-24 lg:py-32 (80px - 128px)
```

---

## Components

### FuturisticHeader
- **Fixed positioning** with glassmorphism backdrop
- **Magnetic hover effects** on navigation items
- **Aurora gradient overlays**
- **Animated search panel**
- **Floating action orbs** for cart, favorites, profile

**Usage:**
```tsx
import { FuturisticHeader } from '@/components/layout/FuturisticHeader';
<FuturisticHeader />
```

### BookingFooter
- **Multi-column layout** (5 columns on desktop)
- **Newsletter signup section**
- **Trust badges** with icons
- **Social media links**
- **Payment method badges**

**Usage:**
```tsx
import { BookingFooter } from '@/components/layout/BookingFooter';
<BookingFooter />
```

### NeoHero
- **Full-viewport hero** with background image
- **Gradient overlays** (aurora, sunset, ocean)
- **Floating elements** animation
- **CTA buttons** with glass effects

**Usage:**
```tsx
import { NeoHero } from '@/components/neo-glass';

<NeoHero
  title="Main Heading"
  subtitle="Supporting text"
  image="/hero.jpg"
  gradient="aurora"
  height="90vh"
  showFloatingElements={true}
>
  <FuturisticButton>Action</FuturisticButton>
</NeoHero>
```

### FuturisticCard
- **3D hover effects** with transform
- **Image with overlay badges**
- **Metadata with icons**
- **Rating and review display**
- **Price with gradient styling**
- **Category color-coding**

**Usage:**
```tsx
import { FuturisticCard } from '@/components/neo-glass';

<FuturisticCard
  image="/product.jpg"
  title="Product Name"
  description="Product description"
  price="₺299"
  badge="Popular"
  badges={['New', 'Featured']}
  metadata={[
    { icon: <MapPin />, label: 'Location' },
    { icon: <Clock />, label: 'Duration' }
  ]}
  rating={4.8}
  reviews={2847}
  onClick={() => router.push('/product')}
  category="tour"
  categoryColor="#667EEA"
/>
```

### FuturisticButton
- **Multiple variants**: primary, secondary, ghost, glass, neo
- **Multiple sizes**: sm, md, lg, xl
- **Icon support**: left or right
- **Glow effects** on hover
- **Loading states**

**Usage:**
```tsx
import { FuturisticButton } from '@/components/neo-glass';

<FuturisticButton
  variant="glass"
  size="xl"
  icon={<Sparkles />}
  iconPosition="left"
  glow={true}
  onClick={handleClick}
>
  Button Text
</FuturisticButton>
```

### NeoSection
- **Background options**: gradient, neo, dark, light
- **Padding variants**: sm, md, lg, xl
- **Title and subtitle** with animations
- **Container auto-centering**

**Usage:**
```tsx
import { NeoSection } from '@/components/neo-glass';

<NeoSection
  title="Section Title"
  subtitle="Section description"
  background="gradient"
  padding="xl"
>
  <div>Section content</div>
</NeoSection>
```

---

## Animation Patterns

### Scroll Animations
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  Content
</motion.div>
```

### Hover Animations
```tsx
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  Hoverable Content
</motion.div>
```

### Staggered Children
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## Shadow System

### Elevation Levels
```css
/* Level 1 - Subtle */
shadow-sm: 0 1px 2px rgba(0,0,0,0.05)

/* Level 2 - Card */
shadow-md: 0 4px 6px rgba(0,0,0,0.1)

/* Level 3 - Elevated Card */
shadow-lg: 0 10px 15px rgba(0,0,0,0.1)

/* Level 4 - Modal/Overlay */
shadow-xl: 0 20px 25px rgba(0,0,0,0.1)

/* Level 5 - Large Modal */
shadow-2xl: 0 25px 50px rgba(0,0,0,0.25)

/* Colored Shadows */
shadow-primary: 0 4px 12px rgba(0,186,255,0.3)
shadow-glow: 0 0 20px currentColor
```

---

## Border Radius

```css
/* Subtle */
rounded-md: 6px

/* Standard */
rounded-lg: 8px

/* Cards */
rounded-xl: 12px

/* Large Cards */
rounded-2xl: 16px

/* Hero Sections */
rounded-3xl: 24px

/* Pills/Badges */
rounded-full: 9999px
```

---

## Glassmorphism Effects

### Light Glass
```css
bg-white/90 backdrop-blur-xl border border-white/20
```

### Dark Glass
```css
bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light
```

### Neo Glass (Homepage Style)
```css
bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-2xl border border-white/30 shadow-lg
```

---

## Responsive Breakpoints

```
Mobile Small:   320px  (xs)
Mobile:         640px  (sm)
Tablet:         768px  (md)
Desktop:        1024px (lg)
Desktop Large:  1280px (xl)
Desktop XL:     1536px (2xl)
```

### Grid Patterns
```tsx
/* Standard Grid */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

/* 4-Column Grid */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

/* Auto-fit Grid */
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

---

## Icon System

**Primary Icon Library:** lucide-react

### Common Icons
```
Navigation:  Hotel, Plane, Car, Compass, Bus, Home
Actions:     Search, ShoppingCart, Heart, User, Plus, Eye
UI:          ChevronRight, ArrowRight, X, Menu, Filter
Status:      CheckCircle, AlertCircle, Info, Clock
Social:      Facebook, Twitter, Instagram, LinkedIn, Youtube
```

**Icon Sizes:**
```
Small:   w-4 h-4  (16px)
Medium:  w-5 h-5  (20px)
Large:   w-6 h-6  (24px)
XL:      w-8 h-8  (32px)
```

---

## Accessibility

### Contrast Ratios
- **Body text:** 7:1 (WCAG AAA)
- **Large text:** 4.5:1 (WCAG AA)
- **Interactive elements:** Minimum 3:1

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators required
- Logical tab order

### ARIA Labels
```tsx
/* Buttons without text */
<button aria-label="Add to cart">
  <ShoppingCart />
</button>

/* Navigation landmarks */
<nav aria-label="Main navigation">
<section aria-labelledby="section-title">
```

### Screen Reader Support
```tsx
/* Hidden content for screen readers */
<span className="sr-only">Additional context</span>

/* Live regions for dynamic content */
<div aria-live="polite" aria-atomic="true">
```

---

## Performance Optimization

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

### Code Splitting
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});
```

### Animation Performance
```tsx
/* Use transform and opacity for animations */
transition={{ duration: 0.3 }}

/* Avoid animating layout properties */
/* ❌ Bad: width, height, top, left */
/* ✅ Good: transform, opacity */
```

---

## File Organization

```
src/
├── components/
│   ├── layouts/
│   │   ├── PageLayout.tsx     # Unified page wrapper
│   │   ├── Section.tsx        # Section container
│   │   └── Container.tsx      # Content container
│   ├── layout/
│   │   ├── FuturisticHeader.tsx
│   │   └── BookingFooter.tsx
│   ├── neo-glass/
│   │   ├── NeoHero.tsx
│   │   ├── FuturisticCard.tsx
│   │   ├── FuturisticButton.tsx
│   │   └── NeoSection.tsx
│   └── minimalist/
│       ├── MinimalistHero.tsx
│       ├── MinimalistCard.tsx
│       └── MinimalistButton.tsx
├── pages/
│   └── [organized by feature]
└── styles/
    ├── design-system.ts       # Design tokens
    ├── globals.css            # Global styles
    └── design-system.md       # This document
```

---

## Page Template

```tsx
import React from 'react';
import { PageLayout } from '@/components/layouts/PageLayout';
import { Section } from '@/components/layouts/Section';
import { NeoHero } from '@/components/neo-glass';
import { FuturisticCard } from '@/components/neo-glass';
import { motion } from 'framer-motion';

const ExamplePage: React.FC = () => {
  return (
    <PageLayout
      title="Page Title - Travel.Ailydian"
      description="Page description for SEO"
      keywords={['keyword1', 'keyword2']}
    >
      {/* Hero Section */}
      <NeoHero
        title="Page Title"
        subtitle="Page subtitle"
        image="/hero.jpg"
        gradient="aurora"
        height="70vh"
      />

      {/* Content Section */}
      <Section
        title="Section Title"
        subtitle="Section description"
        background="gradient"
        padding="xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Content grid */}
        </div>
      </Section>

      {/* Additional sections */}
    </PageLayout>
  );
};

export default ExamplePage;
```

---

## Testing Checklist

For each redesigned page:

- [ ] Header and footer present
- [ ] SEO meta tags configured
- [ ] Mobile responsive (test on 320px, 768px, 1024px)
- [ ] Animations smooth (60fps)
- [ ] All images use next/image
- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Color contrast meets WCAG AA minimum
- [ ] No console errors
- [ ] Loading states implemented
- [ ] Error states handled

---

## Version History

**v2.0** - Dec 2025
- Complete redesign matching homepage
- Unified component system
- Comprehensive documentation

**v1.0** - Initial release
- Basic styling
- Mixed design patterns
