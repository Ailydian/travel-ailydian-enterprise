# Animated SVG Components & Interactive Sliders

Beautiful, performant, and accessible animated components for Travel.Ailydian platform built with **Framer Motion** and **React**.

## 📦 Components Overview

### 1. **AnimatedSVG.tsx** - Travel-Themed Animations

Location: `/src/components/ui/AnimatedSVG.tsx`

A comprehensive library of SVG-based animations optimized for travel platforms.

#### Available Components:

##### ✈️ **AnimatedPlane**
Flying plane animation with smooth motion and trail effects.

```tsx
import { AnimatedPlane } from '@/components/ui/AnimatedSVG';

<AnimatedPlane
  size={100}           // Size in pixels
  color="#FF214D"      // Primary color
  speed={3}            // Animation speed (seconds)
  className="my-4"     // Optional className
/>
```

**Use Cases:**
- Flight booking sections
- Travel hero sections
- Loading states for flight searches

---

##### 🌍 **AnimatedGlobe**
Rotating globe with latitude/longitude lines and location pins.

```tsx
import { AnimatedGlobe } from '@/components/ui/AnimatedSVG';

<AnimatedGlobe
  size={120}           // Size in pixels
  speed={20}           // Rotation speed
  className="mx-auto"
/>
```

**Use Cases:**
- International destinations showcase
- World travel sections
- Global navigation indicators

---

##### 📊 **AnimatedPriceChart**
Dynamic price trend chart with animated path drawing.

```tsx
import { AnimatedPriceChart } from '@/components/ui/AnimatedSVG';

<AnimatedPriceChart
  size={100}
  data={[30, 50, 40, 70, 60, 85, 75]}  // Price data points
/>
```

**Use Cases:**
- Price trend visualization
- Historical pricing displays
- Deal analytics

---

##### 📍 **MapPinAnimated**
Location pin with pulse effect and bounce animation.

```tsx
import { MapPinAnimated } from '@/components/ui/AnimatedSVG';

<MapPinAnimated
  size={40}
  color="#FF214D"
/>
```

**Use Cases:**
- Destination markers
- Location selection
- Map overlays

---

##### 🧭 **CompassAnimated**
Rotating compass with directional markers.

```tsx
import { CompassAnimated } from '@/components/ui/AnimatedSVG';

<CompassAnimated
  size={80}
/>
```

**Use Cases:**
- Navigation sections
- Exploration themes
- Direction indicators

---

##### 🧳 **SuitcaseAnimated**
Animated suitcase with floating motion.

```tsx
import { SuitcaseAnimated } from '@/components/ui/AnimatedSVG';

<SuitcaseAnimated
  size={60}
/>
```

**Use Cases:**
- Packing lists
- Travel preparation sections
- Booking confirmations

---

#### Loading Indicators

##### **LoadingSpinner**
```tsx
<LoadingSpinner size={50} color="#FF214D" />
```

##### **LoadingPlane**
```tsx
<LoadingPlane size={40} color="#FF214D" />
```

##### **LoadingDots**
```tsx
<LoadingDots size={8} color="#FF214D" />
```

---

#### Status Icons

##### **StatusIcon**
```tsx
<StatusIcon
  type="success"        // 'success' | 'error' | 'warning'
  size={80}
  showAnimation={true}  // Show glow/confetti effects
/>
```

**Features:**
- Success: Checkmark with confetti
- Error: X mark with shake
- Warning: Exclamation with pulse

---

### 2. **InteractiveSlider.tsx** - Advanced Sliders

Location: `/src/components/ui/InteractiveSlider.tsx`

#### **InteractiveSlider** (Main Component)

Full-featured slider with drag-to-scroll, auto-play, and smooth transitions.

```tsx
import { InteractiveSlider } from '@/components/ui/InteractiveSlider';

<InteractiveSlider
  slidesToShow={3}          // Number of slides visible
  gap={20}                  // Gap between slides (px)
  autoPlay={true}           // Auto-play enabled
  autoPlayInterval={4000}   // Auto-play interval (ms)
  showArrows={true}         // Show nav arrows
  showDots={true}           // Show pagination dots
  pauseOnHover={true}       // Pause on hover
  infinite={true}           // Infinite loop
  centerMode={false}        // Center active slide
>
  {children}
</InteractiveSlider>
```

**Features:**
- ✅ Touch-friendly drag scrolling
- ✅ Keyboard navigation
- ✅ Auto-play with pause on hover
- ✅ Smooth spring animations
- ✅ Responsive design
- ✅ Accessibility compliant
- ✅ Progress bar indicator

---

#### **CardSlider**

Specialized slider for card-based content.

```tsx
import { CardSlider } from '@/components/ui/InteractiveSlider';

<CardSlider
  cards={[
    {
      id: 1,
      content: <YourCardComponent />
    },
    // ... more cards
  ]}
  cardWidth={350}
  gap={20}
  autoPlay={true}
/>
```

---

#### **TestimonialSlider**

Optimized for customer reviews and testimonials.

```tsx
import { TestimonialSlider } from '@/components/ui/InteractiveSlider';

<TestimonialSlider
  testimonials={[
    {
      id: 1,
      name: 'John Doe',
      role: 'Travel Blogger',
      content: 'Amazing experience!',
      rating: 5,
      avatar: '/avatar.jpg'
    }
  ]}
  autoPlay={true}
/>
```

**Features:**
- Rating stars with stagger animation
- Avatar with gradient border
- Fade transitions
- Auto-rotation

---

#### **ImageGallerySlider**

Advanced image gallery with thumbnails and captions.

```tsx
import { ImageGallerySlider } from '@/components/ui/InteractiveSlider';

<ImageGallerySlider
  images={[
    {
      url: '/image1.jpg',
      alt: 'Description',
      caption: 'Beautiful sunset'
    }
  ]}
  aspectRatio="16/9"
/>
```

**Features:**
- Swipe navigation
- Thumbnail preview
- Image counter
- Caption overlay
- Keyboard controls

---

### 3. **Homepage Components**

Pre-built sections ready to use on homepage.

#### **AnimatedHeroSection**

Location: `/src/components/homepage/AnimatedHeroSection.tsx`

```tsx
import { AnimatedHeroSection } from '@/components/homepage/AnimatedHeroSection';

<AnimatedHeroSection
  onSearch={(query) => console.log(query)}
/>
```

**Features:**
- Animated background with floating elements
- Flying planes animation
- Rotating globe decoration
- Interactive search form
- Feature badges
- Stats counter
- Scroll indicator

---

#### **DestinationsSlider**

Location: `/src/components/homepage/DestinationsSlider.tsx`

```tsx
import { DestinationsSlider } from '@/components/homepage/DestinationsSlider';

<DestinationsSlider
  destinations={destinations}
  title="Featured Destinations"
  subtitle="Explore amazing places"
/>
```

**Features:**
- Hover zoom effect on images
- Favorite button
- Rating display
- Price tag
- Explore button on hover
- Animated borders

---

#### **ExperiencesSlider**

Location: `/src/components/homepage/ExperiencesSlider.tsx`

```tsx
import { ExperiencesSlider } from '@/components/homepage/ExperiencesSlider';

<ExperiencesSlider
  experiences={experiences}
  onAddToCart={(exp) => handleAddToCart(exp)}
/>
```

**Features:**
- Discount badges
- Category tags
- Highlights list
- Add to cart animation
- Loading state during booking
- Price comparison

---

## 🎨 Design System Integration

All components use the **Ailydian color palette** from `tailwind.config.js`:

```javascript
colors: {
  ailydian: {
    primary: '#FF214D',      // Neon Red
    secondary: '#FF6A45',    // Neon Orange
    'neon-blue': '#00D4FF',  // Neon Blue
    'neon-purple': '#B347FF', // Neon Purple
    'neon-green': '#39FF14', // Neon Green
    'neon-yellow': '#FFFF33', // Neon Yellow
    bg: '#0A0A0B',           // Dark Background
    'bg-card': '#111113',    // Card Background
    text: '#F3F4F6',         // White Text
    'text-muted': '#9CA3AF'  // Muted Text
  }
}
```

### Utility Classes

```css
.text-neon          /* Neon text glow */
.border-neon        /* Neon border glow */
.shadow-neon        /* Neon box shadow */
.shadow-neon-lg     /* Large neon glow */
.bg-glass           /* Glass morphism */
.bg-glass-dark      /* Dark glass */
```

---

## 🚀 Performance Optimization

### Best Practices Implemented:

1. **60 FPS Animations**
   - Hardware-accelerated transforms
   - GPU-optimized properties (transform, opacity)
   - RequestAnimationFrame for smooth rendering

2. **Lazy Loading**
   - Components only animate when in viewport
   - `whileInView` prop for scroll-triggered animations
   - `viewport={{ once: true }}` to prevent re-renders

3. **Optimized SVG**
   - Minimal path complexity
   - Reusable gradient definitions
   - Small file sizes

4. **React Optimization**
   - Memoized callbacks
   - Proper dependency arrays
   - No unnecessary re-renders

---

## ♿ Accessibility Features

- **ARIA Labels**: All interactive elements have proper labels
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: Descriptive text for icons
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Color Contrast**: WCAG AA compliant

---

## 📱 Responsive Design

All components are fully responsive:

```tsx
// Slider adapts to screen size
<InteractiveSlider
  slidesToShow={
    window.innerWidth >= 1024 ? 3 :    // Desktop: 3 slides
    window.innerWidth >= 768 ? 2 : 1   // Tablet: 2, Mobile: 1
  }
/>
```

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

---

## 🎯 Usage Examples

### Complete Homepage Integration

```tsx
import { AnimatedHeroSection } from '@/components/homepage/AnimatedHeroSection';
import { DestinationsSlider } from '@/components/homepage/DestinationsSlider';
import { ExperiencesSlider } from '@/components/homepage/ExperiencesSlider';

export default function HomePage() {
  const destinations = [...]; // Your data
  const experiences = [...];  // Your data

  return (
    <main>
      <AnimatedHeroSection onSearch={handleSearch} />

      <DestinationsSlider
        destinations={destinations}
        title="Popular Destinations"
      />

      <ExperiencesSlider
        experiences={experiences}
        onAddToCart={addToCart}
      />
    </main>
  );
}
```

### Custom Loading State

```tsx
import { LoadingPlane, LoadingDots } from '@/components/ui/AnimatedSVG';

function MyComponent() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <LoadingPlane size={60} />
        <p className="mt-4 text-ailydian-text">Searching flights...</p>
        <LoadingDots size={8} className="mt-2" />
      </div>
    );
  }

  return <YourContent />;
}
```

### Success Confirmation

```tsx
import { StatusIcon } from '@/components/ui/AnimatedSVG';

function BookingConfirmation() {
  return (
    <div className="text-center">
      <StatusIcon type="success" size={120} showAnimation={true} />
      <h2 className="text-2xl font-bold text-ailydian-text mt-6">
        Booking Confirmed!
      </h2>
      <p className="text-ailydian-text-muted mt-2">
        Your adventure awaits
      </p>
    </div>
  );
}
```

---

## 🧪 Testing

### Component Testing

```tsx
import { render, screen } from '@testing-library/react';
import { AnimatedPlane } from '@/components/ui/AnimatedSVG';

test('renders animated plane', () => {
  render(<AnimatedPlane size={100} />);
  const svg = screen.getByRole('img');
  expect(svg).toBeInTheDocument();
});
```

---

## 📊 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari iOS 14+
- ✅ Chrome Android

---

## 🔧 Dependencies

```json
{
  "framer-motion": "^10.18.0",
  "react": "^19.2.1",
  "lucide-react": "^0.294.0"
}
```

---

## 📝 License

These components are part of the Travel.Ailydian platform.

---

## 🤝 Contributing

When adding new animations:

1. Follow naming convention: `AnimatedX` for SVG components
2. Use Ailydian color palette
3. Ensure 60 FPS performance
4. Add accessibility features
5. Test on mobile devices
6. Document usage examples

---

## 🔗 Related Files

- `/src/components/ui/AnimatedSVG.tsx`
- `/src/components/ui/InteractiveSlider.tsx`
- `/src/components/homepage/AnimatedHeroSection.tsx`
- `/src/components/homepage/DestinationsSlider.tsx`
- `/src/components/homepage/ExperiencesSlider.tsx`
- `/src/pages/animated-showcase.tsx` (Demo page)

---

## 📞 Support

For questions or issues, please contact the development team.

**Happy Coding! ✈️🌍**
