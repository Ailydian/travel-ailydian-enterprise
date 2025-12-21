# Dashboard Layout - Quick Start Guide

Get your dashboard up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Create a Dashboard Page

**For Next.js App Router:**

Create `/src/app/dashboard/page.tsx`:

```tsx
import { DashboardShell } from '@/components/dashboard';

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Overview"
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">Start building your property management empire!</p>
      </div>
    </DashboardShell>
  );
}
```

**For Next.js Pages Router:**

Create `/src/pages/dashboard/index.tsx`:

```tsx
import { DashboardShell } from '@/components/dashboard';

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Overview"
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">Start building your property management empire!</p>
      </div>
    </DashboardShell>
  );
}
```

### 2. Visit Your Dashboard

Navigate to: `http://localhost:3100/dashboard`

That's it! You now have a fully functional dashboard with:
- ✅ Responsive sidebar navigation
- ✅ Top header with search
- ✅ User menu dropdown
- ✅ Notifications system
- ✅ Property switcher
- ✅ Mobile-optimized design

## 📱 Features Out of the Box

### Sidebar Navigation
- **Overview** - Dashboard home (`/dashboard`)
- **Bookings** - Manage reservations (`/dashboard/bookings`)
- **Calendar** - Availability management (`/dashboard/calendar`)
- **Earnings** - Financial reports (`/dashboard/earnings`)
- **Messages** - Guest communications (`/dashboard/messages`)
- **Analytics** - Performance metrics (`/dashboard/analytics`)
- **Settings** - Account settings (`/dashboard/settings`)

### Header Features
- **Search bar** - Quick navigation (desktop only)
- **Notifications** - Real-time alerts with badge
- **User menu** - Profile, settings, help, logout

### Responsive Behavior
- **Desktop (≥1024px)**: Permanent sidebar with collapse option
- **Mobile (<1024px)**: Drawer-style sidebar with overlay

## 🎨 Customization Examples

### Change Sidebar Logo

Edit `DashboardSidebar.tsx`:

```tsx
<Link href="/" className="flex items-center space-x-2">
  <img src="/your-logo.png" alt="Logo" className="h-8 w-8" />
  <span className="text-xl font-bold">Your Brand</span>
</Link>
```

### Add Custom Navigation Item

Edit `DashboardSidebar.tsx`:

```tsx
import { Star } from 'lucide-react';

const navigationItems = [
  // ... existing items
  { name: 'Reviews', href: '/dashboard/reviews', icon: Star },
];
```

### Customize User Data

In your dashboard page:

```tsx
// Fetch user data from your API
const user = await getCurrentUser();

// Pass to DashboardShell via props (requires modifying components)
// Or use Context API for global user state
```

## 🔧 Common Tasks

### Adding a New Dashboard Page

1. Create the page file:
```tsx
// /src/app/dashboard/bookings/page.tsx
import { DashboardShell } from '@/components/dashboard';

export default function BookingsPage() {
  return (
    <DashboardShell
      title="Bookings"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Bookings' }
      ]}
    >
      {/* Your bookings content */}
    </DashboardShell>
  );
}
```

2. The navigation link will automatically highlight when active!

### Implementing Real Notifications

```tsx
// Create a notifications hook
import { useState, useEffect } from 'react';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch from your API
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  return notifications;
}

// Use in your dashboard
const notifications = useNotifications();
```

### Adding Property Switcher Logic

Edit `DashboardSidebar.tsx`:

```tsx
// Replace mock properties with API call
const { data: properties } = useQuery('properties', fetchProperties);

// Handle property selection
const handlePropertyChange = (propertyId) => {
  // Update global state or context
  setCurrentProperty(propertyId);
  // Optionally navigate or refresh data
};
```

## 📚 Next Steps

1. **Customize the design** - Modify colors, spacing, and styles
2. **Connect to API** - Replace mock data with real endpoints
3. **Add authentication** - Protect routes with your auth system
4. **Implement features** - Build out each dashboard section
5. **Add permissions** - Role-based access control

## 🔗 Resources

- **Full Documentation**: See `README.md` in this directory
- **Example Implementation**: Check `DashboardExample.tsx`
- **Type Definitions**: Reference `types.ts`
- **Utility Functions**: Use helpers from `utils.ts`

## 🆘 Troubleshooting

### Sidebar not showing on mobile?
- Make sure you're clicking the menu button (hamburger icon)
- Check that JavaScript is enabled
- Verify Tailwind CSS is properly configured

### Icons not displaying?
- Ensure `lucide-react` is installed: `npm install lucide-react`
- Check import paths in component files

### Styles not working?
- Verify Tailwind CSS is configured in your project
- Make sure `globals.css` imports Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

### Navigation not highlighting active route?
- Ensure you're using Next.js 13+ with App Router
- Check that routes match the href in navigationItems

## 💡 Pro Tips

1. **Performance**: Components are client-side only (`'use client'`), so use them wisely
2. **SEO**: Add proper meta tags in your page components
3. **Analytics**: Track navigation events for insights
4. **Dark Mode**: Add dark mode support by updating color classes
5. **Internationalization**: Use next-i18next for multi-language support

## 🎯 Ready for More?

Copy the `DashboardExample.tsx` file to see a complete dashboard with:
- Statistics cards
- Recent bookings table
- Quick action buttons
- Real-world component composition

```bash
cp src/components/dashboard/DashboardExample.tsx src/app/dashboard/page.tsx
```

Happy building! 🚀
