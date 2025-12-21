# Dashboard Layout - Usage Examples

Quick copy-paste examples for common dashboard pages.

---

## Basic Dashboard Page

```tsx
// src/app/dashboard/page.tsx
import { DashboardShell } from '@/components/dashboard';

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Overview"
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}
    >
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      <p className="text-gray-600 mt-2">Welcome back to your dashboard!</p>
    </DashboardShell>
  );
}
```

---

## Bookings Page

```tsx
// src/app/dashboard/bookings/page.tsx
import { DashboardShell } from '@/components/dashboard';
import { Calendar } from 'lucide-react';

export default function BookingsPage() {
  return (
    <DashboardShell
      title="Bookings"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Bookings' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New Booking
          </button>
        </div>

        {/* Your bookings table/grid here */}
      </div>
    </DashboardShell>
  );
}
```

---

## Analytics Page with Stats

```tsx
// src/app/dashboard/analytics/page.tsx
import { DashboardShell } from '@/components/dashboard';
import { TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, change }: any) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <Icon className="h-8 w-8 text-blue-600" />
      <span className="text-sm font-medium text-green-600">{change}</span>
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

export default function AnalyticsPage() {
  return (
    <DashboardShell
      title="Analytics"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Analytics' }
      ]}
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={DollarSign} title="Revenue" value="$24,500" change="+12%" />
        <StatCard icon={Users} title="Guests" value="1,234" change="+18%" />
        <StatCard icon={Calendar} title="Bookings" value="56" change="+8%" />
        <StatCard icon={TrendingUp} title="Occupancy" value="78%" change="+5%" />
      </div>
    </DashboardShell>
  );
}
```

---

## Settings Page with Tabs

```tsx
// src/app/dashboard/settings/page.tsx
'use client';

import { DashboardShell } from '@/components/dashboard';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'billing', label: 'Billing' },
  ];

  return (
    <DashboardShell
      title="Settings"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings' }
      ]}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          {activeTab === 'profile' && <div>Profile settings content</div>}
          {activeTab === 'notifications' && <div>Notification settings</div>}
          {activeTab === 'security' && <div>Security settings</div>}
          {activeTab === 'billing' && <div>Billing settings</div>}
        </div>
      </div>
    </DashboardShell>
  );
}
```

---

## Messages Page with List

```tsx
// src/app/dashboard/messages/page.tsx
import { DashboardShell } from '@/components/dashboard';
import { MessageSquare } from 'lucide-react';

const messages = [
  { id: 1, from: 'John Smith', preview: 'When is check-in?', time: '5m ago', unread: true },
  { id: 2, from: 'Emma Johnson', preview: 'Thanks for the stay!', time: '1h ago', unread: false },
  { id: 3, from: 'Michael Brown', preview: 'Is parking available?', time: '2h ago', unread: true },
];

export default function MessagesPage() {
  return (
    <DashboardShell
      title="Messages"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Messages' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Mark all read
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {messages.map((message) => (
            <button
              key={message.id}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                      {message.from}
                    </p>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 truncate">{message.preview}</p>
                </div>
                {message.unread && (
                  <div className="flex-shrink-0">
                    <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
```

---

## Calendar Page

```tsx
// src/app/dashboard/calendar/page.tsx
import { DashboardShell } from '@/components/dashboard';

export default function CalendarPage() {
  return (
    <DashboardShell
      title="Calendar"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Calendar' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Today
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Block Dates
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          {/* Your calendar component here */}
          <p className="text-gray-500 text-center py-12">
            Calendar component goes here
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
```

---

## Detail Page (Booking Details)

```tsx
// src/app/dashboard/bookings/[id]/page.tsx
import { DashboardShell } from '@/components/dashboard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell
      title={`Booking #${params.id}`}
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Bookings', href: '/dashboard/bookings' },
        { label: `Booking #${params.id}` }
      ]}
    >
      <div className="space-y-6">
        <Link
          href="/dashboard/bookings"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bookings
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          {/* Booking details content */}
        </div>
      </div>
    </DashboardShell>
  );
}
```

---

## Loading State

```tsx
// src/app/dashboard/loading.tsx
import { DashboardShell } from '@/components/dashboard';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Skeleton loader */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
```

---

## Error State

```tsx
// src/app/dashboard/error.tsx
'use client';

import { DashboardShell } from '@/components/dashboard';
import { AlertCircle } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <DashboardShell title="Error">
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </DashboardShell>
  );
}
```

---

## Custom Hook for Dashboard Data

```tsx
// src/hooks/useDashboardData.ts
import { useState, useEffect } from 'react';

export function useDashboardData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

// Usage in dashboard page:
// const { data, loading, error } = useDashboardData();
```

---

## With Authentication

```tsx
// src/app/dashboard/page.tsx
import { DashboardShell } from '@/components/dashboard';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <DashboardShell
      title="Overview"
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}
    >
      <h1 className="text-3xl font-bold">
        Welcome back, {session.user.name}!
      </h1>
    </DashboardShell>
  );
}
```

---

## Tips

1. **Always wrap content in DashboardShell**
2. **Use breadcrumbs for navigation hierarchy**
3. **Keep titles consistent with breadcrumbs**
4. **Use Tailwind utility classes for spacing**
5. **Add loading and error states**
6. **Implement proper authentication**

---

Copy any example above and customize it for your needs!
