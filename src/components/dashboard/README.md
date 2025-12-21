# Dashboard Layout System

A complete, production-ready dashboard layout system for the Ailydian travel platform. Built with modern React patterns, TypeScript, and Tailwind CSS.

## Components

### DashboardShell

The main layout wrapper that orchestrates the entire dashboard experience.

**Features:**
- Responsive sidebar (collapsible on desktop, drawer on mobile)
- Mobile-optimized navigation with overlay
- Flexible content area
- Breadcrumb support
- Clean, professional design

**Usage:**

```tsx
import { DashboardShell } from '@/components/dashboard';

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Overview"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Overview' }
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Your dashboard content */}
      </div>
    </DashboardShell>
  );
}
```

### DashboardSidebar

Professional navigation sidebar with property management.

**Features:**
- Active state highlighting
- Property switcher dropdown
- Collapsible on desktop (icon-only mode)
- Mobile drawer with overlay
- "Add Property" action button
- Icons from lucide-react
- Responsive design

**Navigation Items:**
- Overview (Home icon)
- Bookings (Calendar icon)
- Calendar (Calendar icon)
- Earnings (DollarSign icon)
- Messages (MessageSquare icon)
- Analytics (BarChart3 icon)
- Settings (Settings icon)

**Customization:**

The sidebar automatically handles routing and active states. You can customize the navigation items by modifying the `navigationItems` array in `DashboardSidebar.tsx`.

### DashboardHeader

Top navigation header with search, notifications, and user menu.

**Features:**
- Breadcrumb navigation
- Search functionality
- Notifications dropdown with badge
- User avatar with dropdown menu
- Mobile menu toggle
- Responsive design

**Menu Items:**
- Profile
- Settings
- Help & Support
- Log out

## Installation

The components use the following dependencies (already in your project):

```json
{
  "lucide-react": "^0.294.0",
  "next": "15.5.9",
  "react": "^19.2.1",
  "tailwindcss": "^3.3.0"
}
```

## File Structure

```
src/components/dashboard/
├── DashboardShell.tsx      # Main layout wrapper
├── DashboardSidebar.tsx    # Navigation sidebar
├── DashboardHeader.tsx     # Top header
├── types.ts                # TypeScript definitions
├── index.ts                # Export barrel
└── README.md               # This file
```

## Examples

### Basic Dashboard Page

```tsx
import { DashboardShell } from '@/components/dashboard';

export default function OverviewPage() {
  return (
    <DashboardShell
      title="Overview"
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}
    >
      <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
    </DashboardShell>
  );
}
```

### Nested Page with Breadcrumbs

```tsx
import { DashboardShell } from '@/components/dashboard';

export default function BookingDetailsPage() {
  return (
    <DashboardShell
      title="Booking Details"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Bookings', href: '/dashboard/bookings' },
        { label: 'Booking #12345' }
      ]}
    >
      {/* Booking details content */}
    </DashboardShell>
  );
}
```

### With Custom Content

```tsx
import { DashboardShell } from '@/components/dashboard';
import { BarChart3, Calendar, DollarSign, Users } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <DashboardShell
      title="Analytics"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Analytics' }
      ]}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Users} label="Total Guests" value="1,234" />
        <StatCard icon={Calendar} label="Bookings" value="56" />
        <StatCard icon={DollarSign} label="Revenue" value="$12,345" />
        <StatCard icon={BarChart3} label="Occupancy" value="78%" />
      </div>

      {/* Charts and graphs */}
    </DashboardShell>
  );
}
```

## Styling

All components use Tailwind CSS for styling. The design follows a professional, clean aesthetic inspired by Airbnb and Booking.com.

**Color Scheme:**
- Primary: Blue (`blue-600`, `blue-700`)
- Background: Gray (`gray-50`, `gray-100`)
- Text: Gray shades (`gray-500` to `gray-900`)
- Borders: `gray-200`

**Responsive Breakpoints:**
- Mobile: Default (< 640px)
- Tablet: `sm:` (≥ 640px)
- Desktop: `lg:` (≥ 1024px)

## Accessibility

All components follow accessibility best practices:

- Semantic HTML elements
- ARIA labels and attributes
- Keyboard navigation support
- Focus management
- Screen reader support
- Color contrast compliance

## Customization

### Modifying Navigation Items

Edit the `navigationItems` array in `DashboardSidebar.tsx`:

```tsx
const navigationItems: NavigationItem[] = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Custom Page', href: '/dashboard/custom', icon: YourIcon },
  // Add more items...
];
```

### Changing Property Switcher

Replace the mock properties with your actual data:

```tsx
// In DashboardSidebar.tsx
const properties = await fetchUserProperties(); // Your API call
```

### Customizing User Menu

Edit the dropdown menu items in `DashboardHeader.tsx`:

```tsx
<Link href="/your-custom-link" className="...">
  <YourIcon className="h-4 w-4 text-gray-500" />
  <span>Your Menu Item</span>
</Link>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions in `types.ts`:

- `DashboardShellProps`
- `DashboardSidebarProps`
- `DashboardHeaderProps`
- `NavigationItem`
- `Breadcrumb`
- `Property`
- `Notification`
- `User`

## Performance

**Optimizations:**
- Client-side only where needed (`'use client'`)
- Efficient state management
- Minimal re-renders
- Lazy-loaded dropdowns
- Optimized event listeners

## Browser Support

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential improvements:
- Dark mode support
- Customizable themes
- Keyboard shortcuts
- Advanced search with filters
- Real-time notifications
- Multi-language support (i18n)
- Property role-based permissions

## License

Part of the Ailydian Enterprise Platform.

## Support

For questions or issues, please contact the development team.
