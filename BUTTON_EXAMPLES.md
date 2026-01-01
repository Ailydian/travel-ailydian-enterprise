# Button Component - Visual Examples

This document showcases all button variants, sizes, and features for the unified Button component.

---

## Basic Variants

### Primary
The main call-to-action button using Lydian RED brand color.

```tsx
<Button variant="primary">Book Now</Button>
<Button variant="primary" disabled>Book Now</Button>
<Button variant="primary" loading>Processing...</Button>
```

### Secondary
Medium emphasis actions.

```tsx
<Button variant="secondary">Learn More</Button>
<Button variant="secondary" disabled>Learn More</Button>
<Button variant="secondary" loading>Loading...</Button>
```

### Success
Positive confirmations.

```tsx
<Button variant="success">Confirm Booking</Button>
<Button variant="success" disabled>Confirmed</Button>
<Button variant="success" loading>Confirming...</Button>
```

### Warning
Caution actions.

```tsx
<Button variant="warning">Review Changes</Button>
<Button variant="warning" disabled>Under Review</Button>
```

### Error
Destructive actions.

```tsx
<Button variant="error">Cancel Booking</Button>
<Button variant="error" disabled>Cancelled</Button>
<Button variant="error" loading>Cancelling...</Button>
```

### Ghost
Minimal emphasis.

```tsx
<Button variant="ghost">Skip</Button>
<Button variant="ghost" disabled>Skip</Button>
```

### Outline
Low emphasis with border.

```tsx
<Button variant="outline">Contact Support</Button>
<Button variant="outline" disabled>Not Available</Button>
```

---

## Special Effects Variants

### Glass
Glassmorphism effect (from NeoButton).

```tsx
<Button variant="glass">Glass Effect</Button>
<Button variant="glass" effect="glow">Glass with Glow</Button>
```

### Neo
Neomorphism effect (from NeoButton).

```tsx
<Button variant="neo">Neo Effect</Button>
<Button variant="neo" effect="pulse">Neo with Pulse</Button>
```

### Gradient
Animated gradient (from FuturisticButton).

```tsx
<Button variant="gradient">Gradient Button</Button>
<Button variant="gradient" effect="tilt">Gradient with Tilt</Button>
```

### AI
AI-themed gradient (from FuturisticButton).

```tsx
<Button variant="ai">AI Feature</Button>
<Button variant="ai" effect="glow">AI with Glow</Button>
<Button variant="ai" effect="tilt">AI with 3D Tilt</Button>
```

---

## Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (Default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

---

## With Icons

### Left Icon
```tsx
import { Save, Download, Upload, Send } from 'lucide-react';

<Button leftIcon={<Save />}>Save Changes</Button>
<Button leftIcon={<Download />} variant="success">Download</Button>
<Button leftIcon={<Upload />} variant="secondary">Upload</Button>
<Button leftIcon={<Send />} variant="primary">Send Message</Button>
```

### Right Icon
```tsx
import { ArrowRight, ExternalLink, ChevronRight } from 'lucide-react';

<Button rightIcon={<ArrowRight />}>Continue</Button>
<Button rightIcon={<ExternalLink />} variant="outline">Open Link</Button>
<Button rightIcon={<ChevronRight />} variant="ghost">Next Step</Button>
```

### Icon Only
```tsx
import { Heart, Share, Settings, Menu } from 'lucide-react';

<Button iconOnly leftIcon={<Heart />} variant="ghost" aria-label="Like" />
<Button iconOnly leftIcon={<Share />} variant="outline" aria-label="Share" />
<Button iconOnly leftIcon={<Settings />} variant="secondary" aria-label="Settings" />
<Button iconOnly leftIcon={<Menu />} variant="primary" aria-label="Menu" />
```

---

## IconButton Component

Specialized component for icon-only buttons.

```tsx
import { IconButton } from '@/components/ui/IconButton';
import { Heart, Bookmark, Star, ThumbsUp } from 'lucide-react';

// Rounded (default)
<IconButton
  icon={<Heart />}
  aria-label="Add to favorites"
  variant="ghost"
/>

// Circle
<IconButton
  icon={<Bookmark />}
  aria-label="Bookmark"
  variant="outline"
  shape="circle"
/>

// With tooltip
<IconButton
  icon={<Star />}
  aria-label="Rate"
  variant="primary"
  tooltip="Rate this item"
/>

// Different sizes
<IconButton icon={<ThumbsUp />} aria-label="Like" size="xs" />
<IconButton icon={<ThumbsUp />} aria-label="Like" size="sm" />
<IconButton icon={<ThumbsUp />} aria-label="Like" size="md" />
<IconButton icon={<ThumbsUp />} aria-label="Like" size="lg" />
<IconButton icon={<ThumbsUp />} aria-label="Like" size="xl" />
```

---

## Full Width

```tsx
<Button fullWidth variant="primary">
  Full Width Primary
</Button>

<Button fullWidth variant="outline">
  Full Width Outline
</Button>
```

---

## Loading States

```tsx
const [loading, setLoading] = useState(false);

<Button
  loading={loading}
  onClick={async () => {
    setLoading(true);
    await performAction();
    setLoading(false);
  }}
>
  {loading ? 'Processing...' : 'Submit'}
</Button>
```

---

## Link Buttons

### Internal Link
```tsx
<Button as="link" href="/dashboard" variant="primary">
  Go to Dashboard
</Button>

<Button as="link" href="/tours" variant="outline">
  Browse Tours
</Button>
```

### External Link
```tsx
<Button as="link" href="https://example.com" external variant="secondary">
  Visit Website
</Button>
```

---

## Effects

### Glow Effect
```tsx
<Button variant="primary" effect="glow">
  Glow on Hover
</Button>

<Button variant="success" effect="glow">
  Success with Glow
</Button>

<Button variant="ai" effect="glow">
  AI with Glow
</Button>
```

### 3D Tilt Effect
```tsx
<Button variant="gradient" effect="tilt">
  3D Tilt Effect
</Button>

<Button variant="ai" effect="tilt">
  AI with Tilt
</Button>
```

### Pulse Effect
```tsx
<Button variant="primary" effect="pulse">
  Pulse Animation
</Button>

<Button variant="error" effect="pulse">
  Alert with Pulse
</Button>
```

### Shimmer Effect
Automatic on gradient and AI variants.

```tsx
<Button variant="gradient">
  Shimmer Effect
</Button>

<Button variant="ai">
  AI Shimmer
</Button>
```

---

## Form Buttons

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="primary">
    Submit Form
  </Button>

  <Button type="reset" variant="secondary">
    Reset
  </Button>

  <Button type="button" variant="ghost" onClick={handleCancel}>
    Cancel
  </Button>
</form>
```

---

## Button Groups

```tsx
<div className="flex gap-2">
  <Button variant="outline">Option 1</Button>
  <Button variant="outline">Option 2</Button>
  <Button variant="outline">Option 3</Button>
</div>

<div className="flex gap-2">
  <Button variant="primary" size="lg" fullWidth>Primary Action</Button>
  <Button variant="outline" size="lg">Secondary</Button>
</div>
```

---

## Real-World Examples

### Booking Form
```tsx
<div className="space-y-4">
  <Button
    variant="primary"
    size="xl"
    fullWidth
    leftIcon={<Calendar />}
    loading={isBooking}
    onClick={handleBooking}
  >
    {isBooking ? 'Processing Booking...' : 'Book Now - $299'}
  </Button>

  <div className="flex gap-2">
    <Button variant="outline" fullWidth leftIcon={<Heart />}>
      Save for Later
    </Button>
    <Button variant="outline" fullWidth leftIcon={<Share />}>
      Share
    </Button>
  </div>
</div>
```

### Authentication
```tsx
<div className="space-y-3">
  <Button
    type="submit"
    variant="primary"
    size="lg"
    fullWidth
    loading={isLoading}
  >
    Sign In
  </Button>

  <Button variant="ghost" fullWidth onClick={handleForgotPassword}>
    Forgot Password?
  </Button>

  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-2 bg-white text-gray-500">Or continue with</span>
    </div>
  </div>

  <Button variant="outline" fullWidth leftIcon={<Google />}>
    Continue with Google
  </Button>
</div>
```

### AI Features
```tsx
<div className="flex flex-col gap-3">
  <Button
    variant="ai"
    size="xl"
    effect="glow"
    leftIcon={<Sparkles />}
    onClick={handleAIPlanner}
  >
    AI Trip Planner
  </Button>

  <Button
    variant="gradient"
    size="lg"
    effect="tilt"
    leftIcon={<Brain />}
  >
    Smart Recommendations
  </Button>

  <Button variant="glass" effect="pulse" leftIcon={<Mic />}>
    Voice Assistant
  </Button>
</div>
```

### Navigation
```tsx
<div className="fixed top-4 left-4 flex gap-2">
  <Button
    variant="primary"
    leftIcon={<Home />}
    onClick={() => router.push('/')}
  >
    Home
  </Button>

  <Button
    variant="secondary"
    leftIcon={<ArrowLeft />}
    onClick={() => router.back()}
  >
    Back
  </Button>
</div>
```

### Social Actions
```tsx
<div className="flex gap-2">
  <IconButton
    icon={<Heart className={liked ? 'fill-current text-red-500' : ''} />}
    aria-label="Like"
    variant="ghost"
    onClick={handleLike}
  />

  <IconButton
    icon={<Bookmark />}
    aria-label="Save"
    variant="ghost"
    onClick={handleSave}
  />

  <IconButton
    icon={<Share />}
    aria-label="Share"
    variant="ghost"
    onClick={handleShare}
  />

  <IconButton
    icon={<MoreVertical />}
    aria-label="More options"
    variant="ghost"
    onClick={handleMore}
  />
</div>
```

---

## Responsive Design

```tsx
// Small on mobile, large on desktop
<Button
  className="text-sm px-3 py-2 sm:text-base sm:px-4 sm:py-2.5 md:text-lg md:px-6 md:py-3"
>
  Responsive Button
</Button>

// Full width on mobile, auto on desktop
<Button fullWidth className="md:w-auto">
  Responsive Width
</Button>
```

---

## Accessibility Examples

### Proper Labels
```tsx
<IconButton
  icon={<X />}
  aria-label="Close dialog"
  onClick={handleClose}
/>

<Button aria-describedby="tooltip-1">
  Hover for info
</Button>
<span id="tooltip-1" role="tooltip" className="sr-only">
  This action will delete your account
</span>
```

### Loading State Announcements
```tsx
<Button loading={isLoading} aria-live="polite">
  {isLoading ? 'Saving changes...' : 'Save'}
</Button>
```

---

## Testing Examples

All examples above can be tested using the test suite in `__tests__/Button.test.tsx`.

Run tests:
```bash
npm test Button.test.tsx
```

---

## Performance Tips

1. **Memoize icon components:**
```tsx
const SaveIcon = useMemo(() => <Save />, []);

<Button leftIcon={SaveIcon}>Save</Button>
```

2. **Avoid inline functions:**
```tsx
// Bad
<Button onClick={() => handleClick(id)}>Click</Button>

// Good
const handleButtonClick = useCallback(() => handleClick(id), [id]);
<Button onClick={handleButtonClick}>Click</Button>
```

3. **Use IconButton for icon-only buttons:**
```tsx
// Less optimized
<Button iconOnly leftIcon={<Heart />} aria-label="Like" />

// Better
<IconButton icon={<Heart />} aria-label="Like" />
```

---

Last Updated: 2026-01-01
