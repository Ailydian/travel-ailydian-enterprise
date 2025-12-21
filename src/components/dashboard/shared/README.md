# Shared Dashboard Components

A comprehensive collection of production-ready UI components for building modern dashboard interfaces.

## Components Overview

### 1. StatCard
Display statistics and metrics with trend indicators.

```tsx
import { StatCard } from './shared';
import { DollarSign } from 'lucide-react';

<StatCard
  title="Total Revenue"
  value="$45,231.89"
  icon={DollarSign}
  trend={12.5}
  variant="success"
  description="vs last month"
/>
```

**Features:**
- Color variants (default, primary, success, warning, danger)
- Trend indicators with up/down arrows
- Loading skeleton state
- Optional click handler
- Fully accessible

### 2. PropertyCard
Display property listings with images, details, and actions.

```tsx
import { PropertyCard } from './shared';

<PropertyCard
  id="prop-123"
  title="Luxury Beach Villa"
  location="Malibu, California"
  image="/images/property.jpg"
  price={450}
  rating={4.8}
  reviewCount={124}
  status="active"
  bedrooms={4}
  maxGuests={8}
  onEdit={handleEdit}
  onView={handleView}
  onToggleStatus={handleToggle}
/>
```

**Features:**
- Hover effects with image zoom
- Status badges (active, inactive, pending)
- Quick actions menu
- Rating display
- Property details (bedrooms, guests)
- Mobile responsive

### 3. BookingCard
Display booking information with guest and property details.

```tsx
import { BookingCard } from './shared';

<BookingCard
  id="book-123"
  guestName="John Doe"
  guestAvatar="/avatars/john.jpg"
  propertyName="Luxury Beach Villa"
  checkIn="2025-01-15"
  checkOut="2025-01-20"
  price={2250}
  status="confirmed"
  guests={4}
  nights={5}
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  onViewDetails={handleView}
  onMessage={handleMessage}
/>
```

**Features:**
- Guest avatar with fallback initials
- Property thumbnail
- Date display with nights calculation
- Status-based action buttons
- Message functionality
- Mobile responsive layout

### 4. StatusBadge
Display status with color-coded badges and icons.

```tsx
import { StatusBadge } from './shared';

<StatusBadge status="confirmed" size="md" showIcon />
<StatusBadge status="pending" size="sm" />
<StatusBadge status="cancelled" label="Canceled by Guest" />
```

**Features:**
- Pre-configured status types with colors
- Size variants (sm, md, lg)
- Optional icons
- Custom labels
- Animated processing state

### 5. EmptyState
Display empty states with call-to-action buttons.

```tsx
import { EmptyState } from './shared';
import { Home } from 'lucide-react';

<EmptyState
  variant="no-data"
  title="No properties yet"
  description="Get started by adding your first property"
  actionLabel="Add Property"
  onAction={handleAddProperty}
/>
```

**Features:**
- Multiple variants (no-data, search, error, not-found)
- Custom icons
- Primary and secondary actions
- Size variants
- Custom content support

### 6. LoadingState
Display loading skeletons for different content types.

```tsx
import { LoadingState } from './shared';

<LoadingState variant="card" count={3} />
<LoadingState variant="table" count={5} />
<LoadingState variant="list" count={4} />
```

**Features:**
- Multiple variants (card, table, list, text, stat)
- Customizable count
- Animated pulse effect
- Maintains layout structure

### 7. DataTable
Comprehensive data table with sorting, pagination, and mobile support.

```tsx
import { DataTable } from './shared';
import { Edit, Trash } from 'lucide-react';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', render: (user) => <Badge>{user.role}</Badge> },
];

const actions = [
  { label: 'Edit', icon: Edit, onClick: handleEdit },
  { label: 'Delete', icon: Trash, onClick: handleDelete, danger: true },
];

<DataTable
  data={users}
  columns={columns}
  rowActions={actions}
  keyExtractor={(user) => user.id}
  pagination
  itemsPerPage={10}
/>
```

**Features:**
- Column sorting
- Pagination with page controls
- Row actions menu
- Empty state handling
- Loading state
- Mobile responsive (converts to cards)
- Custom cell rendering
- Accessible keyboard navigation

### 8. PhotoUploader
Advanced photo upload with drag & drop, compression, and reordering.

```tsx
import { PhotoUploader } from './shared';

const [images, setImages] = useState([]);

<PhotoUploader
  images={images}
  onChange={setImages}
  requirements={{
    minPhotos: 5,
    maxPhotos: 15,
    maxFileSize: 10 * 1024 * 1024,
    minWidth: 1920,
    minHeight: 1080,
  }}
  onUpload={async (file, onProgress) => {
    // Upload logic here
    return uploadedUrl;
  }}
/>
```

**Features:**
- Drag & drop file upload
- Multiple file selection
- Image preview thumbnails
- Upload progress bars
- Drag to reorder images
- Cover photo selection
- Image validation (size, format, dimensions)
- Client-side compression using canvas
- Error handling
- Requirements display
- Delete functionality

### 9. FilterBar
Advanced filtering with search, dates, and dropdowns.

```tsx
import { FilterBar } from './shared';

const [filters, setFilters] = useState({});

<FilterBar
  filters={filters}
  onChange={setFilters}
  showSearch
  searchPlaceholder="Search bookings..."
  showDateRange
  showStatus
  statusOptions={[
    { label: 'All', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
  ]}
  showProperty
  propertyOptions={properties}
/>
```

**Features:**
- Search input with clear button
- Date range picker
- Status dropdown filter
- Property dropdown filter
- Active filters display (chips)
- Clear all filters button
- Mobile responsive
- Custom filter support

## Usage

### Import Components

```tsx
// Import individual components
import { StatCard, PropertyCard, BookingCard } from '@/components/dashboard/shared';

// Or import with types
import { DataTable, Column, RowAction } from '@/components/dashboard/shared';
```

### Styling

All components use Tailwind CSS and require the following configuration:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Your custom theme
    },
  },
  plugins: [],
}
```

### Icons

Components use Lucide React icons. Install if not already present:

```bash
npm install lucide-react
```

## Accessibility

All components follow accessibility best practices:
- ARIA labels and roles
- Keyboard navigation support
- Focus states
- Screen reader compatible
- Semantic HTML

## TypeScript

All components are fully typed with comprehensive interfaces:
- Props interfaces exported
- Type-safe event handlers
- Generic support (DataTable)
- Enum types for variants

## Mobile Responsive

Components are designed mobile-first:
- Responsive grid layouts
- Touch-friendly controls
- Mobile-optimized views (DataTable converts to cards)
- Responsive typography

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Part of the Travel Ailydian Enterprise project.
