# Quick Start Guide - Shared Dashboard Components

Get up and running with the shared components in 5 minutes.

## Installation

These components are already part of your project. No additional installation needed!

**Required Dependencies:**
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- lucide-react (for icons)

If lucide-react is not installed:
```bash
npm install lucide-react
# or
yarn add lucide-react
```

## Basic Usage

### 1. Import Components

```tsx
import {
  StatCard,
  PropertyCard,
  BookingCard,
  DataTable,
  FilterBar,
  PhotoUploader,
  StatusBadge,
  EmptyState,
  LoadingState,
} from '@/components/dashboard/shared';
```

### 2. Use in Your Pages

#### Dashboard Overview with Stats

```tsx
import { StatCard } from '@/components/dashboard/shared';
import { DollarSign, Home, Calendar, Users } from 'lucide-react';

function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Revenue"
        value="$45,231"
        icon={DollarSign}
        trend={12.5}
        variant="success"
      />
      <StatCard
        title="Properties"
        value={24}
        icon={Home}
        trend={8.2}
        variant="primary"
      />
      <StatCard
        title="Bookings"
        value={156}
        icon={Calendar}
        trend={-3.1}
      />
      <StatCard
        title="Guests"
        value={892}
        icon={Users}
        trend={15.8}
      />
    </div>
  );
}
```

#### Property Listing

```tsx
import { PropertyCard } from '@/components/dashboard/shared';

function PropertyList({ properties }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          {...property}
          onEdit={(id) => console.log('Edit', id)}
          onView={(id) => console.log('View', id)}
        />
      ))}
    </div>
  );
}
```

#### Bookings with Filters

```tsx
import { useState } from 'react';
import { FilterBar, BookingCard } from '@/components/dashboard/shared';

function BookingsList() {
  const [filters, setFilters] = useState({});

  return (
    <div className="space-y-6">
      <FilterBar
        filters={filters}
        onChange={setFilters}
        showSearch
        showDateRange
        showStatus
        statusOptions={[
          { label: 'All', value: '' },
          { label: 'Confirmed', value: 'confirmed' },
          { label: 'Pending', value: 'pending' },
        ]}
      />

      {/* Your booking cards here */}
    </div>
  );
}
```

#### Data Table

```tsx
import { DataTable } from '@/components/dashboard/shared';
import { Edit, Trash } from 'lucide-react';

function UsersTable({ users }) {
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' },
  ];

  const actions = [
    { label: 'Edit', icon: Edit, onClick: (user) => console.log('Edit', user) },
    { label: 'Delete', icon: Trash, onClick: (user) => console.log('Delete', user), danger: true },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      rowActions={actions}
      keyExtractor={(user) => user.id}
      pagination
      itemsPerPage={10}
    />
  );
}
```

#### Photo Upload

```tsx
import { useState } from 'react';
import { PhotoUploader } from '@/components/dashboard/shared';

function PropertyPhotos() {
  const [images, setImages] = useState([]);

  return (
    <PhotoUploader
      images={images}
      onChange={setImages}
      requirements={{
        minPhotos: 5,
        maxPhotos: 20,
        maxFileSize: 10 * 1024 * 1024, // 10MB
      }}
      onUpload={async (file, onProgress) => {
        // Your upload logic
        return uploadedUrl;
      }}
    />
  );
}
```

## Common Patterns

### Loading States

```tsx
import { LoadingState } from '@/components/dashboard/shared';

function MyComponent() {
  const { data, loading } = useData();

  if (loading) {
    return <LoadingState variant="card" count={3} />;
  }

  return <div>{/* Your content */}</div>;
}
```

### Empty States

```tsx
import { EmptyState } from '@/components/dashboard/shared';

function MyList({ items }) {
  if (items.length === 0) {
    return (
      <EmptyState
        variant="no-data"
        title="No items yet"
        description="Get started by creating your first item"
        actionLabel="Create Item"
        onAction={() => console.log('Create')}
      />
    );
  }

  return <div>{/* Your list */}</div>;
}
```

### Status Indicators

```tsx
import { StatusBadge } from '@/components/dashboard/shared';

function BookingStatus({ status }) {
  return <StatusBadge status={status} size="md" />;
}
```

## Component Combinations

### Complete Property Management Page

```tsx
import { useState } from 'react';
import {
  StatCard,
  PropertyCard,
  FilterBar,
  LoadingState,
  EmptyState,
} from '@/components/dashboard/shared';
import { Home, DollarSign } from 'lucide-react';

function PropertiesPage() {
  const [filters, setFilters] = useState({});
  const { properties, loading } = useProperties(filters);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Total Properties"
          value={properties.length}
          icon={Home}
          variant="primary"
        />
        <StatCard
          title="Revenue"
          value="$12,450"
          icon={DollarSign}
          variant="success"
        />
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onChange={setFilters}
        showSearch
        showStatus
        statusOptions={[
          { label: 'All', value: '' },
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ]}
      />

      {/* Content */}
      {loading ? (
        <LoadingState variant="card" count={6} />
      ) : properties.length === 0 ? (
        <EmptyState
          variant="search"
          title="No properties found"
          description="Try adjusting your filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      )}
    </div>
  );
}
```

## TypeScript Tips

All components are fully typed. Import types for better IDE support:

```tsx
import {
  StatCardProps,
  PropertyCardProps,
  BookingCardProps,
  Column,
  RowAction,
  FilterValues,
  UploadedImage,
} from '@/components/dashboard/shared';

// Use with your data
interface User {
  id: string;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
];
```

## Customization

### Tailwind Configuration

Ensure your `tailwind.config.js` includes:

```js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Add custom colors if needed
      colors: {
        // Your custom colors
      },
    },
  },
}
```

### Custom Styling

All components accept `className` prop for additional styling:

```tsx
<StatCard
  className="shadow-xl hover:shadow-2xl"
  title="Revenue"
  value="$45,231"
  icon={DollarSign}
/>
```

## Performance Tips

1. **Memoize data transformations:**
```tsx
const columns = useMemo(() => [
  { key: 'name', label: 'Name', sortable: true },
  // ...
], []);
```

2. **Use loading states:**
```tsx
if (loading) return <LoadingState variant="card" count={3} />;
```

3. **Implement pagination:**
```tsx
<DataTable
  data={data}
  columns={columns}
  pagination
  itemsPerPage={10}
/>
```

## Accessibility

All components follow ARIA best practices:
- Keyboard navigation
- Screen reader support
- Focus management
- Semantic HTML

## Next Steps

1. Check `EXAMPLES.tsx` for comprehensive examples
2. Read `README.md` for detailed component documentation
3. Explore each component's TypeScript interface for all available props
4. Start building your dashboard!

## Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review EXAMPLES.tsx for usage patterns
3. Check TypeScript definitions for prop types

## Component Summary

| Component | Use Case | Key Features |
|-----------|----------|-------------|
| StatCard | Metrics & KPIs | Trends, variants, loading state |
| PropertyCard | Property listings | Images, ratings, actions |
| BookingCard | Booking display | Guest info, dates, status |
| DataTable | Tabular data | Sorting, pagination, mobile-responsive |
| FilterBar | Data filtering | Search, date ranges, dropdowns |
| PhotoUploader | Image uploads | Drag & drop, compression, reordering |
| StatusBadge | Status indicators | Color-coded, icons, sizes |
| EmptyState | No data states | CTA buttons, variants |
| LoadingState | Loading UI | Multiple skeleton types |

Happy coding! 🚀
