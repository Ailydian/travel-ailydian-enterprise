# AdminV2 - Comprehensive Content Management System (CMS)

## 🎯 VISION
Transform AdminV2 into a **full-featured CMS** where every frontend element can be managed, updated, and previewed in real-time.

---

## 📋 CORE MODULES

### 1. **Content Management Modules**

#### 1.1 Tours Management
```typescript
Features:
✅ CRUD Operations (Create, Read, Update, Delete)
✅ Rich Text Editor (descriptions, itineraries)
✅ Multi-language Support (TR, EN, DE, RU)
✅ Image Gallery Management (upload, crop, optimize)
✅ Pricing Matrix (seasonal, group discounts)
✅ Availability Calendar (date ranges, capacity)
✅ Inclusions/Exclusions Manager
✅ Tour Guide Assignment
✅ Reviews & Ratings Display
✅ SEO Optimization (meta tags, keywords)
✅ Status Management (draft, published, archived)

API Endpoints:
- GET    /api/admin/tours
- POST   /api/admin/tours
- PUT    /api/admin/tours/:id
- DELETE /api/admin/tours/:id
- PATCH  /api/admin/tours/:id/status
- POST   /api/admin/tours/:id/images
```

#### 1.2 Transfers Management
```typescript
Features:
✅ Route Management (pickup/dropoff locations)
✅ Vehicle Fleet Management (types, capacity, features)
✅ Dynamic Pricing (distance-based, time-based)
✅ Driver Assignment & Tracking
✅ Real-time Availability
✅ Special Requirements (child seats, wheelchair)
✅ Multi-stop Routes
✅ Zone-based Pricing
✅ Commission Settings (partner payouts)

API Endpoints:
- GET    /api/admin/transfers
- POST   /api/admin/transfers
- PUT    /api/admin/transfers/:id
- GET    /api/admin/transfers/routes
- POST   /api/admin/transfers/vehicles
```

#### 1.3 Car Rental Management
```typescript
Features:
✅ Fleet Management (cars, motorcycles, bicycles)
✅ Vehicle Specifications (model, year, features)
✅ Pricing Engine (daily, weekly, monthly rates)
✅ Location Management (pickup/return points)
✅ Availability Calendar
✅ Insurance Options
✅ Extra Services (GPS, child seat, driver)
✅ Fuel Policy Management
✅ Mileage Limits
✅ Age Restrictions
✅ Deposit & Payment Terms

API Endpoints:
- GET    /api/admin/car-rentals
- POST   /api/admin/car-rentals
- PUT    /api/admin/car-rentals/:id
- GET    /api/admin/car-rentals/fleet
- PATCH  /api/admin/car-rentals/:id/availability
```

#### 1.4 Hotels Management
```typescript
Features:
✅ Property Management (hotels, villas, apartments)
✅ Room Types & Specifications
✅ Amenities Management (pool, spa, gym, wifi)
✅ Pricing Calendar (seasonal rates, occupancy-based)
✅ Meal Plans (room only, B&B, half board, full board, all-inclusive)
✅ Image Galleries (property, rooms, facilities)
✅ Location & Maps
✅ Check-in/Check-out Times
✅ Cancellation Policies
✅ Pet Policies
✅ Reviews & Ratings
✅ Star Rating Management

API Endpoints:
- GET    /api/admin/hotels
- POST   /api/admin/hotels
- PUT    /api/admin/hotels/:id
- POST   /api/admin/hotels/:id/rooms
- PATCH  /api/admin/hotels/:id/pricing
```

#### 1.5 Flights Management
```typescript
Features:
✅ Route Management (origin, destination, stops)
✅ Airline Information
✅ Flight Schedules (daily, weekly patterns)
✅ Cabin Classes (economy, business, first)
✅ Baggage Allowances
✅ Pricing Matrix (adult, child, infant)
✅ Seat Availability
✅ Meal Services
✅ In-flight Amenities
✅ Refund & Change Policies

API Endpoints:
- GET    /api/admin/flights
- POST   /api/admin/flights
- PUT    /api/admin/flights/:id
- PATCH  /api/admin/flights/:id/schedule
```

#### 1.6 Destinations Management
```typescript
Features:
✅ Location Information (city, region, country)
✅ Rich Text Descriptions
✅ Attraction Listings
✅ Image Galleries
✅ Weather Information
✅ Best Time to Visit
✅ Local Tips & Guides
✅ Transportation Options
✅ Currency & Language Info
✅ Emergency Contacts
✅ Visa Requirements
✅ Popular Activities

API Endpoints:
- GET    /api/admin/destinations
- POST   /api/admin/destinations
- PUT    /api/admin/destinations/:id
- POST   /api/admin/destinations/:id/attractions
```

---

### 2. **Content Editor Modules**

#### 2.1 Page Content Editor
```typescript
Features:
✅ Visual Page Builder (drag-and-drop)
✅ Component Library (hero, features, testimonials, CTAs)
✅ Rich Text Editor (WYSIWYG)
✅ Code Editor (HTML, CSS, JS)
✅ Template Management
✅ Section Reordering
✅ Live Preview
✅ Responsive Preview (desktop, tablet, mobile)
✅ A/B Testing Support
✅ Version History

Editable Pages:
- Home Page (/, hero, features, destinations)
- Tours Page (/tours)
- Transfers Page (/transfers)
- Car Rental Page (/car-rental)
- Hotels Page (/hotels)
- About Page (/about)
- Contact Page (/contact)
- Custom Pages

API Endpoints:
- GET    /api/admin/pages
- PUT    /api/admin/pages/:slug
- POST   /api/admin/pages/:slug/sections
- POST   /api/admin/pages/:slug/preview
```

#### 2.2 Media Library
```typescript
Features:
✅ Image Upload (drag-and-drop, multi-file)
✅ Image Optimization (auto-compress, WebP conversion)
✅ Image Editing (crop, resize, filters)
✅ Folder Organization
✅ Search & Filter
✅ Metadata Management (alt text, title, description)
✅ Usage Tracking (where images are used)
✅ CDN Integration
✅ Bulk Actions
✅ Storage Analytics

Supported Formats:
- Images: JPG, PNG, WebP, GIF, SVG
- Documents: PDF
- Videos: MP4, WebM (external hosting)

API Endpoints:
- GET    /api/admin/media
- POST   /api/admin/media/upload
- DELETE /api/admin/media/:id
- PATCH  /api/admin/media/:id
```

#### 2.3 Menu & Navigation Manager
```typescript
Features:
✅ Header Menu Editor
✅ Footer Menu Editor
✅ Mobile Menu Configuration
✅ Dropdown/Mega Menu Support
✅ Link Management (internal, external)
✅ Menu Item Ordering (drag-and-drop)
✅ Icon/Image Support
✅ Visibility Rules (logged in, role-based)
✅ Multi-language Menus

Menus:
- Main Header
- Footer (multiple columns)
- Mobile Menu
- User Account Menu
- Admin Menu

API Endpoints:
- GET    /api/admin/menus
- PUT    /api/admin/menus/:location
- POST   /api/admin/menus/items
```

---

### 3. **Advanced Features**

#### 3.1 SEO & Meta Manager
```typescript
Features:
✅ Global SEO Settings
✅ Per-Page Meta Tags (title, description, keywords)
✅ Open Graph Tags (Facebook, LinkedIn)
✅ Twitter Cards
✅ Schema.org Markup (JSON-LD)
✅ Canonical URLs
✅ Robots.txt Editor
✅ Sitemap Generator
✅ 301 Redirects Manager
✅ Google Analytics Integration
✅ Search Console Integration

API Endpoints:
- GET    /api/admin/seo
- PUT    /api/admin/seo/global
- PUT    /api/admin/seo/page/:slug
- POST   /api/admin/seo/redirects
```

#### 3.2 Pricing & Discount Manager
```typescript
Features:
✅ Dynamic Pricing Rules
✅ Seasonal Pricing
✅ Occupancy-based Pricing
✅ Early Bird Discounts
✅ Last Minute Deals
✅ Group Discounts
✅ Coupon Code Generator
✅ Flash Sales
✅ Loyalty Program Integration
✅ Partner Commission Rules
✅ Currency Management
✅ Tax Configuration

API Endpoints:
- GET    /api/admin/pricing/rules
- POST   /api/admin/pricing/rules
- POST   /api/admin/pricing/coupons
- GET    /api/admin/pricing/analysis
```

#### 3.3 Real-time Preview System
```typescript
Features:
✅ Live Content Preview (iframe)
✅ Responsive Preview (device simulation)
✅ Preview Links (shareable, expiring)
✅ Side-by-side Editing
✅ Change Highlighting
✅ Version Comparison
✅ User Role Simulation

API Endpoints:
- POST   /api/admin/preview/generate
- GET    /api/admin/preview/:token
```

#### 3.4 Version Control & Rollback
```typescript
Features:
✅ Auto-save Drafts
✅ Version History (all changes tracked)
✅ Revision Comparison (diff view)
✅ Rollback to Previous Version
✅ Scheduled Publishing
✅ Change Log
✅ User Attribution (who changed what)
✅ Backup & Restore

API Endpoints:
- GET    /api/admin/versions/:resourceType/:resourceId
- POST   /api/admin/versions/:resourceType/:resourceId/rollback
- POST   /api/admin/versions/:resourceType/:resourceId/schedule
```

---

## 🏗️ TECHNICAL ARCHITECTURE

### Database Schema Updates
```prisma
model ContentPage {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  content         Json     // Page sections as JSON
  metaTitle       String?
  metaDescription String?
  status          PageStatus @default(DRAFT)
  publishedAt     DateTime?
  versions        ContentVersion[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model ContentVersion {
  id              String   @id @default(cuid())
  pageId          String
  page            ContentPage @relation(fields: [pageId], references: [id])
  content         Json
  createdBy       String
  createdAt       DateTime @default(now())
}

model MediaAsset {
  id              String   @id @default(cuid())
  filename        String
  url             String
  thumbnailUrl    String?
  size            Int
  mimeType        String
  altText         String?
  folder          String?
  usageCount      Int      @default(0)
  createdAt       DateTime @default(now())
}

enum PageStatus {
  DRAFT
  PUBLISHED
  SCHEDULED
  ARCHIVED
}
```

### API Architecture
```typescript
// Unified API Service
/api/admin/
  ├── tours/
  ├── transfers/
  ├── car-rentals/
  ├── hotels/
  ├── flights/
  ├── destinations/
  ├── pages/
  ├── media/
  ├── menus/
  ├── seo/
  ├── pricing/
  ├── preview/
  └── versions/
```

---

## 📱 FRONTEND INTEGRATION

### Real-time Content Updates
```typescript
// Frontend pages fetch from unified API
// Changes in AdminV2 reflect immediately on frontend

Example:
1. Admin updates tour description in AdminV2
2. PUT /api/admin/tours/:id
3. Database updated
4. Cache invalidated (Redis)
5. ISR revalidation triggered (Next.js)
6. Frontend shows new content within seconds
```

### Caching Strategy
```typescript
1. Redis Cache (API responses)
2. Next.js ISR (Incremental Static Regeneration)
3. CDN Caching (media assets)
4. Browser Cache (static assets)

Cache Invalidation:
- On content update
- Manual purge option in AdminV2
- Scheduled purges
```

---

## 🚀 IMPLEMENTATION ROADMAP

### Phase 1: Core Content Management (Week 1)
- Tours Management Module
- Transfers Management Module
- Car Rental Management Module
- Unified API Service

### Phase 2: Advanced Management (Week 2)
- Hotels Management Module
- Flights Management Module
- Destinations Management Module
- Media Library

### Phase 3: Content Editing (Week 3)
- Page Content Editor
- Menu & Navigation Manager
- SEO & Meta Manager

### Phase 4: Advanced Features (Week 4)
- Pricing & Discount Manager
- Real-time Preview System
- Version Control & Rollback
- Dashboard Integration

---

## ✅ SUCCESS METRICS

1. **Content Update Time**: < 2 minutes from AdminV2 to live site
2. **API Response Time**: < 100ms (p95)
3. **Media Upload Speed**: < 5 seconds for 5MB image
4. **Preview Generation**: < 1 second
5. **Version Rollback**: < 10 seconds

---

## 🔒 SECURITY & PERMISSIONS

```typescript
Role-Based Access Control:
- SUPER_ADMIN: Full access
- CONTENT_MANAGER: Edit content, cannot delete
- SEO_MANAGER: Edit SEO settings only
- MEDIA_MANAGER: Upload/manage media only
- VIEWER: Read-only access

Audit Logging:
- All changes logged
- User attribution
- Timestamp
- Before/after values
```

---

**This CMS will make AdminV2 the most powerful admin panel for the platform! 🚀**
