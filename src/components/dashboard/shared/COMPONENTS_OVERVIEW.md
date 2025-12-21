# Shared Dashboard Components - Visual Overview

## 📊 Component Categories

### Display Components
Components for showing data and statistics

#### 1. StatCard
```
┌─────────────────────────────┐
│ 💰 Total Revenue            │
│                             │
│ $45,231.89                  │
│ ↑ 12.5% vs last month       │
└─────────────────────────────┘
```
- **Purpose:** Display key metrics and KPIs
- **Features:** Trend indicators, color variants, loading states
- **Use Cases:** Dashboard overview, analytics pages

#### 2. PropertyCard
```
┌─────────────────────────────┐
│ [Property Image]      ⚡Active│
│                             │
│ Luxury Beach Villa          │
│ 📍 Malibu, California       │
│ 🛏️ 4 beds  👥 8 guests      │
│ $450/night        ⭐ 4.8    │
│ [View]  [Edit]              │
└─────────────────────────────┘
```
- **Purpose:** Display property listings
- **Features:** Image hover effects, status badges, quick actions
- **Use Cases:** Property listings, property management

#### 3. BookingCard
```
┌─────────────────────────────┐
│ 👤 John Doe     ✅Confirmed  │
│ 📍 Luxury Beach Villa       │
│ 👥 4 guests                 │
│                             │
│ Check-in: Jan 15, 2025      │
│ Check-out: Jan 20, 2025     │
│ 5 nights                    │
│                             │
│ Total: $2,250               │
│ [View] [Message]            │
└─────────────────────────────┘
```
- **Purpose:** Display booking information
- **Features:** Guest avatars, property details, action buttons
- **Use Cases:** Bookings list, booking management

#### 4. StatusBadge
```
✅ Confirmed  ⏱️ Pending  ❌ Cancelled
```
- **Purpose:** Show status with color coding
- **Features:** Icons, multiple sizes, custom labels
- **Use Cases:** Status indicators throughout the app

### State Components
Components for different UI states

#### 5. EmptyState
```
┌─────────────────────────────┐
│                             │
│         📭                  │
│                             │
│   No properties yet         │
│   Get started by adding     │
│   your first property       │
│                             │
│   [+ Add Property]          │
│                             │
└─────────────────────────────┘
```
- **Purpose:** Display when no data is available
- **Features:** Multiple variants, CTA buttons, custom icons
- **Use Cases:** Empty lists, search results, error states

#### 6. LoadingState
```
┌─────────────────────────────┐
│ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░   │
│ ▓▓▓▓▓░░░░░░░░░░░░░░░░░░    │
│ ▓▓▓▓▓▓▓▓▓░░░░ ▓▓▓░░░      │
└─────────────────────────────┘
```
- **Purpose:** Show loading skeletons
- **Features:** Multiple variants (card, table, list, text)
- **Use Cases:** Data loading, async operations

### Data Components
Components for displaying and managing data

#### 7. DataTable
```
Desktop View:
┌────────────────────────────────────────────┐
│ Name ↕    │ Email ↕   │ Status  │ Actions │
├────────────────────────────────────────────┤
│ John Doe  │ john@...  │ Active  │   ⋮     │
│ Jane Smith│ jane@...  │ Active  │   ⋮     │
└────────────────────────────────────────────┘
                [1] 2 3 4 5 →

Mobile View:
┌─────────────────────────────┐
│ Name: John Doe              │
│ Email: john@example.com     │
│ Status: Active              │
└─────────────────────────────┘
```
- **Purpose:** Display tabular data
- **Features:** Sorting, pagination, mobile responsive, row actions
- **Use Cases:** User lists, transaction tables, reports

### Input Components
Components for user input and filtering

#### 8. FilterBar
```
┌────────────────────────────────────────────┐
│ 🔍 Search... │ From: │ To: │ Status ▼ │ ✕ │
└────────────────────────────────────────────┘
Active filters: Search: beach  From: Jan 1  ✕ ✕
```
- **Purpose:** Filter and search data
- **Features:** Search, date ranges, dropdowns, active filter chips
- **Use Cases:** List pages, search interfaces, data filtering

#### 9. PhotoUploader
```
┌────────────────────────────────────────────┐
│     Photo Requirements                     │
│     ✅ Minimum 5 photos (3/5)              │
│     ✅ Max 10MB per image                  │
│     ✅ Min 1920x1080px                     │
├────────────────────────────────────────────┤
│              ☁️ Upload                     │
│     Drag & drop images here               │
│     or click to browse                     │
├────────────────────────────────────────────┤
│ Uploaded Photos (3/15)                     │
│ ┌────┐ ┌────┐ ┌────┐                      │
│ │★IMG│ │IMG │ │IMG │                      │
│ │ 1  │ │ 2  │ │ 3  │                      │
│ └────┘ └────┘ └────┘                      │
└────────────────────────────────────────────┘
```
- **Purpose:** Upload and manage photos
- **Features:** Drag & drop, compression, reordering, validation
- **Use Cases:** Property photos, profile pictures, media uploads

## 🎨 Design System

### Color Variants
```
Primary:   🔵 Blue   - Default actions
Success:   🟢 Green  - Positive metrics, confirmed
Warning:   🟡 Yellow - Pending, attention needed
Danger:    🔴 Red    - Errors, cancellations, delete
Default:   ⚪ Gray   - Neutral, inactive
```

### Sizes
```
sm:  Small   - Compact displays, dense layouts
md:  Medium  - Default size for most components
lg:  Large   - Emphasized content, landing pages
```

### Spacing
All components use consistent Tailwind spacing:
- Padding: p-4, p-6
- Gaps: gap-2, gap-4, gap-6
- Margins: mb-4, mt-6

## 📱 Responsive Design

### Breakpoints
```
Mobile:    < 768px   - Single column, stacked layout
Tablet:    768-1024  - 2 columns, side-by-side
Desktop:   > 1024px  - 3-4 columns, full features
```

### Mobile Adaptations
- **DataTable:** Converts to cards on mobile
- **StatCard:** Full width, stacks vertically
- **FilterBar:** Filters stack vertically
- **PropertyCard:** Full width on mobile

## 🔗 Component Relationships

### Common Usage Patterns

#### Dashboard Page
```
Page
├── StatCard (x4) - Overview metrics
├── FilterBar - Filter data
└── PropertyCard (xN) - Property grid
    or
    DataTable - Tabular view
```

#### List with Filters
```
Page
├── FilterBar - Search and filter
├── LoadingState (if loading)
├── EmptyState (if no results)
└── DataTable or Cards
    └── StatusBadge - Show status
```

#### Form with Upload
```
Form
├── Input fields
├── PhotoUploader - Upload images
└── Submit button
```

## 🚀 Performance Characteristics

### Rendering Performance
```
Fast (< 16ms):      StatusBadge, EmptyState, LoadingState
Medium (16-50ms):   StatCard, PropertyCard, BookingCard
Heavy (> 50ms):     DataTable (large data), PhotoUploader (compression)
```

### Optimization Tips
1. **Memoize columns** for DataTable
2. **Use loading states** during data fetching
3. **Paginate large lists** with DataTable
4. **Lazy load images** in cards
5. **Compress images** with PhotoUploader

## 📦 Bundle Size Impact

### Component Sizes (estimated)
```
Smallest:
- StatusBadge      ~3KB
- EmptyState       ~4KB
- LoadingState     ~4KB

Medium:
- StatCard         ~5KB
- BookingCard      ~8KB
- PropertyCard     ~9KB

Largest:
- FilterBar        ~12KB
- DataTable        ~15KB
- PhotoUploader    ~22KB
```

**Note:** Tree-shaking eliminates unused components

## 🎯 Component Selection Guide

### Choose StatCard when:
- ✅ Displaying metrics/KPIs
- ✅ Showing trends over time
- ✅ Building dashboard overviews

### Choose PropertyCard when:
- ✅ Displaying property listings
- ✅ Need image previews
- ✅ Quick actions required

### Choose BookingCard when:
- ✅ Displaying booking details
- ✅ Guest information important
- ✅ Date ranges visible

### Choose DataTable when:
- ✅ Many columns of data
- ✅ Sorting/filtering needed
- ✅ Bulk actions required
- ✅ Desktop-first interface

### Choose FilterBar when:
- ✅ Multiple filter criteria
- ✅ Search functionality needed
- ✅ Date range filtering
- ✅ Complex queries

### Choose PhotoUploader when:
- ✅ Multiple image uploads
- ✅ Image order matters
- ✅ Quality validation needed
- ✅ Professional requirements

## 🛠️ Customization Levels

### Easy (No code changes)
- Colors via Tailwind
- Spacing via className
- Content via props

### Medium (Props & callbacks)
- Custom render functions
- Action handlers
- Validation rules

### Advanced (Fork component)
- Major layout changes
- New features
- Different UI paradigm

## 📊 Feature Matrix

| Component      | Sort | Filter | Paginate | Mobile | Upload | Actions |
|---------------|------|--------|----------|--------|--------|---------|
| StatCard      | -    | -      | -        | ✅     | -      | ✅      |
| PropertyCard  | -    | -      | -        | ✅     | -      | ✅      |
| BookingCard   | -    | -      | -        | ✅     | -      | ✅      |
| StatusBadge   | -    | -      | -        | ✅     | -      | -       |
| EmptyState    | -    | -      | -        | ✅     | -      | ✅      |
| LoadingState  | -    | -      | -        | ✅     | -      | -       |
| DataTable     | ✅   | -      | ✅       | ✅     | -      | ✅      |
| PhotoUploader | -    | -      | -        | ✅     | ✅     | ✅      |
| FilterBar     | -    | ✅     | -        | ✅     | -      | -       |

## 🎓 Learning Path

### Beginner
1. Start with **StatusBadge** - Simple, no state
2. Try **StatCard** - Props and variants
3. Use **EmptyState** - Conditional rendering

### Intermediate
4. Implement **PropertyCard** - Complex layout
5. Add **FilterBar** - State management
6. Build with **BookingCard** - Multiple features

### Advanced
7. Master **DataTable** - Generics and complex state
8. Integrate **PhotoUploader** - File handling and async
9. Combine all - Build complete dashboard

## 💡 Pro Tips

1. **Always provide loading states** - Better UX
2. **Use TypeScript interfaces** - Type safety
3. **Memoize expensive renders** - Performance
4. **Test mobile views** - Responsive design
5. **Handle empty states** - Edge cases
6. **Validate user input** - Data integrity
7. **Show feedback** - User actions
8. **Follow accessibility** - ARIA labels

## 🎉 Quick Wins

### 5-Minute Implementations

1. **Dashboard Overview**
   - 4 StatCards in a grid
   - Instant visual impact

2. **Property Listing**
   - PropertyCard in a grid
   - Professional appearance

3. **Status Display**
   - StatusBadge anywhere
   - Clear status indication

4. **Loading State**
   - LoadingState while fetching
   - Smooth transitions

5. **Empty Results**
   - EmptyState for no data
   - Better UX

---

**Ready to build amazing dashboards? Start with the QUICKSTART.md guide!**
