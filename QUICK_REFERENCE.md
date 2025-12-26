# 🚀 Quick Reference - Animated Components

## 📦 Import Paths

```tsx
// Animated SVG Components
import { AnimatedPlane, AnimatedGlobe, LoadingSpinner, StatusIcon }
  from '@/components/ui/AnimatedSVG';

// Interactive Sliders
import { InteractiveSlider, TestimonialSlider }
  from '@/components/ui/InteractiveSlider';

// Homepage Sections
import { AnimatedHeroSection } from '@/components/homepage/AnimatedHeroSection';
import { DestinationsSlider } from '@/components/homepage/DestinationsSlider';
import { ExperiencesSlider } from '@/components/homepage/ExperiencesSlider';
```

---

## 🎨 Animated SVG Cheatsheet

```tsx
// Flying Plane
<AnimatedPlane size={100} color="#FF214D" speed={3} />

// Rotating Globe
<AnimatedGlobe size={120} speed={20} />

// Price Chart
<AnimatedPriceChart size={100} data={[30, 50, 70]} />

// Map Pin
<MapPinAnimated size={40} color="#FF214D" />

// Compass
<CompassAnimated size={80} />

// Suitcase
<SuitcaseAnimated size={60} />

// Loading Spinner
<LoadingSpinner size={50} color="#FF214D" />

// Loading Plane
<LoadingPlane size={60} />

// Loading Dots
<LoadingDots size={8} color="#FF214D" />

// Status Icons
<StatusIcon type="success" size={80} showAnimation={true} />
<StatusIcon type="error" size={80} />
<StatusIcon type="warning" size={80} />
```

---

## 🎠 Slider Cheatsheet

```tsx
// Basic Slider
<InteractiveSlider
  slidesToShow={3}
  gap={20}
  autoPlay={true}
  autoPlayInterval={4000}
  showArrows={true}
  showDots={true}
  pauseOnHover={true}
  infinite={true}
>
  {items.map(item => <Card key={item.id} {...item} />)}
</InteractiveSlider>

// Testimonials
<TestimonialSlider
  testimonials={[{
    id: 1,
    name: 'John',
    content: 'Great!',
    rating: 5
  }]}
  autoPlay={true}
/>

// Image Gallery
<ImageGallerySlider
  images={[{
    url: '/image.jpg',
    alt: 'Description',
    caption: 'Caption'
  }]}
  aspectRatio="16/9"
/>
```

---

## 🏠 Homepage Sections

```tsx
// Hero Section
<AnimatedHeroSection onSearch={handleSearch} />

// Destinations
<DestinationsSlider
  destinations={destinations}
  title="Popular Destinations"
/>

// Experiences/Tours
<ExperiencesSlider
  experiences={tours}
  onAddToCart={handleAddToCart}
/>
```

---

## 🎨 LyDian Colors

```tsx
// Use in components
color="#FF214D"  // Primary (Neon Red)
color="#FF6A45"  // Secondary (Neon Orange)
color="#00D4FF"  // Neon Blue
color="#B347FF"  // Neon Purple
color="#39FF14"  // Neon Green
color="#FFFF33"  // Neon Yellow

// Tailwind classes
className="text-lydian-primary"
className="bg-lydian-secondary"
className="border-lydian-neon-blue"
className="shadow-neon"
className="bg-glass-dark"
```

---

## ⚡ Common Patterns

### Loading State
```tsx
{isLoading ? (
  <div className="flex items-center justify-center h-screen">
    <LoadingPlane size={80} />
  </div>
) : (
  <YourContent />
)}
```

### Success Message
```tsx
{showSuccess && (
  <div className="fixed bottom-8 right-8 bg-glass-dark p-6 rounded-2xl">
    <StatusIcon type="success" size={60} />
    <p>Success!</p>
  </div>
)}
```

### Animated Section
```tsx
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="py-20"
>
  <YourContent />
</motion.section>
```

---

## 📱 Responsive Slider

```tsx
const [slidesToShow, setSlidesToShow] = useState(3);

useEffect(() => {
  const updateSlides = () => {
    if (window.innerWidth < 768) setSlidesToShow(1);
    else if (window.innerWidth < 1024) setSlidesToShow(2);
    else setSlidesToShow(3);
  };
  updateSlides();
  window.addEventListener('resize', updateSlides);
  return () => window.removeEventListener('resize', updateSlides);
}, []);

<InteractiveSlider slidesToShow={slidesToShow} />
```

---

## 🔧 Props Reference

### AnimatedPlane
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | number | 100 | Size in pixels |
| color | string | '#FF214D' | Primary color |
| speed | number | 3 | Animation speed (seconds) |
| className | string | '' | Additional CSS classes |

### InteractiveSlider
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| slidesToShow | number | 1 | Visible slides |
| gap | number | 20 | Gap between slides (px) |
| autoPlay | boolean | true | Enable auto-play |
| autoPlayInterval | number | 4000 | Auto-play interval (ms) |
| showArrows | boolean | true | Show nav arrows |
| showDots | boolean | true | Show pagination |
| pauseOnHover | boolean | true | Pause on hover |
| infinite | boolean | true | Infinite loop |

### StatusIcon
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | 'success' \| 'error' \| 'warning' | required | Icon type |
| size | number | 80 | Size in pixels |
| showAnimation | boolean | true | Show glow/confetti |
| className | string | '' | Additional CSS classes |

---

## 🎯 Best Practices

### Performance
```tsx
// ✅ Good - Lazy load
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
/>

// ❌ Bad - Always animates
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
/>
```

### Accessibility
```tsx
// ✅ Good - Has label
<button aria-label="Next slide">
  <ChevronRight />
</button>

// ❌ Bad - No label
<button>
  <ChevronRight />
</button>
```

### Responsive
```tsx
// ✅ Good - Responsive
<InteractiveSlider
  slidesToShow={isMobile ? 1 : 3}
/>

// ❌ Bad - Fixed size
<InteractiveSlider
  slidesToShow={3}
/>
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Animations laggy | Use transform/opacity only |
| Slider not dragging | Check parent overflow CSS |
| Images not loading | Add error handler |
| Text not visible | Check color contrast |
| Mobile issues | Test on real device |

---

## 📚 Files Location

```
/src/components/ui/
  ├── AnimatedSVG.tsx          (23KB)
  └── InteractiveSlider.tsx    (18KB)

/src/components/homepage/
  ├── AnimatedHeroSection.tsx  (13KB)
  ├── DestinationsSlider.tsx   (8KB)
  └── ExperiencesSlider.tsx    (12KB)

/src/pages/
  └── animated-showcase.tsx    (18KB)

/
  ├── ANIMATED_COMPONENTS_README.md    (12KB)
  ├── INTEGRATION_GUIDE.md            (10KB)
  ├── IMPLEMENTATION_SUMMARY.md       (15KB)
  └── QUICK_REFERENCE.md             (this file)
```

---

## 🚀 Quick Start

```bash
# 1. View demo
npm run dev
# Visit: http://localhost:3100/animated-showcase

# 2. Import components
import { AnimatedPlane } from '@/components/ui/AnimatedSVG';

# 3. Use it
<AnimatedPlane size={100} />
```

---

## 💡 Tips

1. **Always** use `viewport={{ once: true }}` for scroll animations
2. **Test** on mobile devices for touch gestures
3. **Add** alt text to all images
4. **Use** hardware-accelerated properties
5. **Check** accessibility with keyboard
6. **Optimize** images before using in sliders
7. **Customize** colors to match brand
8. **Monitor** performance with DevTools

---

## 📞 Need Help?

1. Check `/animated-showcase` demo page
2. Read `ANIMATED_COMPONENTS_README.md`
3. Follow `INTEGRATION_GUIDE.md`
4. Review code comments in files

---

**Quick, Simple, Ready to Use!** 🎉
