# Integration Guide - Animated Components

Quick guide to integrate the new animated components into your existing Travel.LyDian homepage.

## 🚀 Quick Start

### Step 1: Import Components in Home Page

Add these imports to `/src/pages/home.tsx`:

```tsx
// Add to existing imports
import { AnimatedHeroSection } from '../components/homepage/AnimatedHeroSection';
import { DestinationsSlider } from '../components/homepage/DestinationsSlider';
import { ExperiencesSlider } from '../components/homepage/ExperiencesSlider';
import {
  AnimatedPlane,
  AnimatedGlobe,
  LoadingPlane,
  StatusIcon
} from '../components/ui/AnimatedSVG';
```

### Step 2: Replace Hero Section (Optional)

Replace the existing hero section with the animated version:

```tsx
// OLD CODE (around line 440-500):
{/* <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  ... existing hero code ...
</section> */}

// NEW CODE:
<AnimatedHeroSection onSearch={handleAdvancedSearch} />
```

### Step 3: Add Destinations Slider

Replace or enhance the destinations section (around line 800):

```tsx
{/* Featured Destinations Section */}
<DestinationsSlider
  destinations={featuredDestinations.map(dest => ({
    ...dest,
    price: '₺599'  // Add pricing if needed
  }))}
  title="Öne Çıkan Destinasyonlar"
  subtitle="Dünyanın en güzel yerlerini keşfedin"
  className="bg-lydian-bg"
/>
```

### Step 4: Add Experiences Slider

Replace the experiences/tours section:

```tsx
{/* Top Experiences Section */}
<ExperiencesSlider
  experiences={topExperiences}
  title="Popüler Deneyimler"
  subtitle="AI destekli ve VR özellikli eşsiz turlar"
  onAddToCart={handleAddToCart}
  className="bg-lydian-bg-card/50"
/>
```

### Step 5: Add Loading States

Replace existing loading indicators with animated versions:

```tsx
{/* When searching */}
{isSearching && (
  <div className="fixed inset-0 bg-lydian-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="text-center">
      <LoadingPlane size={60} />
      <p className="text-lydian-text mt-4 text-lg">Arama yapılıyor...</p>
    </div>
  </div>
)}
```

## 📋 Complete Integration Example

Here's a complete example of how your home page structure should look:

```tsx
import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import NavigationHeader from '../components/layout/NavigationHeader';
import { AnimatedHeroSection } from '../components/homepage/AnimatedHeroSection';
import { DestinationsSlider } from '../components/homepage/DestinationsSlider';
import { ExperiencesSlider } from '../components/homepage/ExperiencesSlider';
import { LoadingPlane, StatusIcon } from '../components/ui/AnimatedSVG';
import { useCart } from '../context/CartContext';

const HomePage: React.FC = () => {
  const { addItem } = useCart();
  const [isSearching, setIsSearching] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Your existing data
  const featuredDestinations = [
    {
      id: 1,
      name: 'İstanbul',
      country: 'Türkiye',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800',
      experiences: '1,247',
      rating: 4.8,
      badge: 'Trend',
      description: 'Ayasofya, Sultanahmet ve Boğazla büyüleyen şehir',
      price: '₺599'
    },
    // ... more destinations
  ];

  const topExperiences = [
    {
      id: 1,
      title: 'İstanbul: AI Rehberli Boğaz Turu',
      location: 'İstanbul, Türkiye',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400',
      price: '₺120',
      originalPrice: '₺160',
      rating: 4.8,
      reviews: 3247,
      duration: '2 saat',
      category: 'Tekne Turları',
      badges: ['AI Rehberli', 'Çok Satan', 'Anlık Onay'],
      highlights: ['Boğaz manzaraları', 'Canlı AI rehber', 'Fotoğraf fırsatları']
    },
    // ... more experiences
  ];

  const handleSearch = useCallback(async (query: string) => {
    setIsSearching(true);
    // Your search logic here
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSearching(false);
  }, []);

  const handleAddToCart = useCallback((experience: any) => {
    addItem({
      id: experience.id,
      type: 'tour',
      title: experience.title,
      price: parseFloat(experience.price.replace(/[^0-9.]/g, '')),
      image: experience.image,
      // ... other cart item fields
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, [addItem]);

  return (
    <>
      <Head>
        <title>Travel.LyDian - AI Destekli Seyahat Platformu</title>
        <meta name="description" content="Yapay zeka destekli seyahat platformu" />
      </Head>

      <NavigationHeader />

      <main>
        {/* Hero Section with Animations */}
        <AnimatedHeroSection onSearch={handleSearch} />

        {/* Featured Destinations */}
        <DestinationsSlider
          destinations={featuredDestinations}
          title="Öne Çıkan Destinasyonlar"
          subtitle="Dünyanın en güzel yerlerini keşfedin"
          className="bg-lydian-bg"
        />

        {/* Top Experiences */}
        <ExperiencesSlider
          experiences={topExperiences}
          title="Popüler Deneyimler"
          subtitle="AI destekli ve VR özellikli eşsiz turlar"
          onAddToCart={handleAddToCart}
          className="bg-lydian-bg-card/50"
        />

        {/* Your other sections... */}
      </main>

      {/* Loading Overlay */}
      {isSearching && (
        <motion.div
          className="fixed inset-0 bg-lydian-bg/90 backdrop-blur-md z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <LoadingPlane size={80} />
            <p className="text-lydian-text mt-6 text-xl">Arama yapılıyor...</p>
          </div>
        </motion.div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <motion.div
          className="fixed bottom-8 right-8 bg-glass-dark backdrop-blur-xl border border-lydian-primary/30 rounded-2xl p-6 shadow-neon-lg z-50"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <StatusIcon type="success" size={50} showAnimation={false} />
            <div>
              <h3 className="text-lydian-text font-bold">Sepete Eklendi!</h3>
              <p className="text-lydian-text-muted text-sm">Ürün başarıyla sepete eklendi</p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default HomePage;
```

## 🎨 Styling Tips

### 1. Background Variations

Use different backgrounds for visual hierarchy:

```tsx
{/* Dark background */}
<section className="bg-lydian-bg py-20">
  <DestinationsSlider ... />
</section>

{/* Card background */}
<section className="bg-lydian-bg-card/50 py-20">
  <ExperiencesSlider ... />
</section>

{/* Gradient background */}
<section className="bg-gradient-to-b from-lydian-bg via-lydian-bg-card to-lydian-bg py-20">
  <YourContent />
</section>
```

### 2. Spacing Between Sections

```tsx
{/* Add consistent spacing */}
<div className="space-y-20">
  <AnimatedHeroSection />
  <DestinationsSlider />
  <ExperiencesSlider />
</div>
```

### 3. Responsive Adjustments

```tsx
{/* Mobile-friendly slider */}
<InteractiveSlider
  slidesToShow={1}           // Mobile: 1 slide
  className="md:hidden"       // Hide on desktop
/>

<InteractiveSlider
  slidesToShow={3}           // Desktop: 3 slides
  className="hidden md:block" // Hide on mobile
/>
```

## 🔄 Migration Checklist

- [ ] Install dependencies (already in package.json)
- [ ] Import new components
- [ ] Replace hero section (optional)
- [ ] Add destinations slider
- [ ] Add experiences slider
- [ ] Update loading states
- [ ] Add success/error notifications
- [ ] Test on mobile devices
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify performance (60 FPS)

## 📱 Mobile Optimization

For mobile devices, adjust slider settings:

```tsx
// Use React hooks to detect screen size
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

// Then use in slider
<InteractiveSlider
  slidesToShow={isMobile ? 1 : 3}
  gap={isMobile ? 16 : 24}
  showArrows={!isMobile}
/>
```

## 🎯 Performance Tips

1. **Lazy Load Images**
```tsx
<img
  src={image}
  alt={alt}
  loading="lazy"
  decoding="async"
/>
```

2. **Reduce Animation on Low-End Devices**
```tsx
// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<AnimatedPlane
  speed={prefersReducedMotion ? 10 : 3}  // Slower on reduced motion
/>
```

3. **Optimize Slider Performance**
```tsx
<InteractiveSlider
  autoPlay={true}
  autoPlayInterval={5000}  // Longer interval = less CPU
/>
```

## 🐛 Troubleshooting

### Issue: Animations not smooth
**Solution**: Check if transform and opacity are used (GPU accelerated)

### Issue: Slider not dragging on mobile
**Solution**: Ensure touch events are not prevented by parent elements

### Issue: Images not loading
**Solution**: Verify image URLs and add error handling:

```tsx
<img
  src={image}
  alt={alt}
  onError={(e) => {
    e.currentTarget.src = '/fallback-image.jpg';
  }}
/>
```

## 📚 Additional Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Best Practices](https://react.dev/learn)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## ✅ Testing Checklist

Before deploying:

- [ ] All animations run at 60 FPS
- [ ] Slider works on touch devices
- [ ] Keyboard navigation works
- [ ] Screen reader announces content
- [ ] Loading states display correctly
- [ ] Success/error notifications work
- [ ] Images have alt text
- [ ] Links are keyboard accessible
- [ ] Color contrast meets WCAG AA
- [ ] Works on Safari, Chrome, Firefox
- [ ] Mobile responsive on all breakpoints

---

**Need Help?** Check the demo page at `/animated-showcase` to see all components in action!
