# Rentals Feature - Quick Start Guide

## 🚀 Quick Access

### URLs
```
Main Listing: http://localhost:3100/rentals
Property Detail: http://localhost:3100/rentals/[property-slug]

Examples:
- http://localhost:3100/rentals
- http://localhost:3100/rentals/alanya-mahmutlar-luxury-seaview-villa
- http://localhost:3100/rentals/bodrum-yalikavak-beachfront-villa
- http://localhost:3100/rentals/cesme-alacati-traditional-stone-house
```

### Available Properties (5 listings)
1. **Alanya** - Mahmutlar Luxury Villa (2,500 ₺/night)
2. **Antalya** - Lara Modern Apartment (1,200 ₺/night)
3. **Marmaris** - İçmeler Private Pool Villa (3,500 ₺/night)
4. **Bodrum** - Yalıkavak Beachfront Villa (5,000 ₺/night)
5. **Çeşme** - Alaçatı Stone House (2,000 ₺/night)

---

## 📁 File Structure

```
src/
├── pages/
│   └── rentals/
│       ├── index.tsx          # Main listing page
│       └── [slug].tsx         # Property detail page
├── components/
│   └── rentals/
│       └── MapView.tsx        # Map component
├── data/
│   └── rental-properties.ts   # Property data (already exists)
└── styles/
    └── globals.css            # Updated with map styles
```

---

## 🎯 Key Features at a Glance

### Main Listing Page (`/rentals`)
| Feature | Description |
|---------|-------------|
| **Grid View** | 3-column responsive grid of properties |
| **Map View** | Interactive map with property markers |
| **Filters** | 10+ filter types (city, type, price, amenities) |
| **Search** | Real-time search across all fields |
| **Sorting** | By price, rating, featured |
| **Favorites** | Heart icon to save properties |
| **Badges** | Featured, Superhost, Instant Book |

### Property Detail Page (`/rentals/[slug]`)
| Feature | Description |
|---------|-------------|
| **Gallery** | 5+ photos with fullscreen modal |
| **Booking Form** | Date picker, guest selector, pricing |
| **Map** | Interactive location map |
| **Amenities** | Full list with icons |
| **Host Info** | Avatar, name, response time |
| **Reviews** | Star rating and count |
| **Share** | Native share or copy link |

---

## 🎨 Filter Options

### Location
- Tümü (All)
- Alanya
- Antalya
- Marmaris
- Bodrum
- Çeşme

### Property Type
- Villa
- Apartment
- House
- Studio
- Penthouse

### Price Range
- Min: 0 ₺
- Max: 10,000 ₺
- Slider for easy adjustment

### Capacity
- Guests: 0-12+
- Bedrooms: 0-6+

### Amenities
- WiFi
- Pool
- Parking
- Kitchen
- Air Conditioning
- Beachfront
- Sea View

### Special Filters
- ⚡ Instant Book
- 🏅 Superhost
- ⭐ Min Rating (4.0+, 4.5+, 4.8+, 5.0)

---

## 💡 Usage Examples

### Example 1: Find Beachfront Villas in Bodrum
```
1. Go to /rentals
2. Select "Bodrum" from city dropdown
3. Click "Villa" button
4. Check "Beachfront" amenity
5. Results update instantly
```

### Example 2: Find Budget-Friendly Options
```
1. Go to /rentals
2. Set price max to 2000 ₺
3. Increase guest count to 4+
4. View filtered results
```

### Example 3: Superhost Properties with Pool
```
1. Go to /rentals
2. Toggle "Superhost" filter
3. Check "Pool" amenity
4. See premium properties
```

### Example 4: View on Map
```
1. Go to /rentals
2. Click "Map" toggle
3. See all properties on map
4. Click markers for popups
5. Click "View Details" in popup
```

---

## 🖱️ Interactive Elements

### Clickable
- Property cards → Navigate to detail
- Images → Open gallery modal
- Map markers → Show property popup
- Favorite hearts → Toggle saved state
- Share button → Open share dialog
- Filter buttons → Apply filters
- View toggles → Switch grid/map

### Hover Effects
- Property cards elevate
- Buttons change shadow
- Images zoom slightly
- Map markers scale up

---

## 📱 Mobile Experience

### Optimizations
- Single column grid
- Collapsible filters (tap button)
- Touch-friendly buttons (44px min)
- Swipeable galleries
- Bottom sheet filters
- Fixed header with search

### Gestures
- Tap to select
- Swipe to close modals
- Pinch to zoom (map/images)
- Scroll to load more

---

## 🎨 Design Tokens

### Colors
```css
Primary: #DC2626 (red-600)
Secondary: #F97316 (orange-500)
Accent: #FBBF24 (yellow-400)
Success: #10B981 (green-500)
```

### Gradients
```css
Primary: from-red-600 to-orange-500
Featured: from-yellow-400 to-orange-400
Superhost: from-purple-500 to-pink-500
Instant: from-green-500 to-emerald-500
```

### Spacing
```css
Gap: 1.5rem (24px)
Padding: 1.5rem (24px)
Margin: 2rem (32px)
```

---

## 🔧 Customization Guide

### Add New Property
```typescript
// In src/data/rental-properties.ts
export const rentalProperties: RentalProperty[] = [
  // ... existing properties
  {
    id: 'new-property-001',
    title: 'New Amazing Villa',
    slug: 'new-amazing-villa',
    // ... fill in all fields
  }
];
```

### Change Filter Options
```typescript
// In src/pages/rentals/index.tsx
const CITIES = ['Tümü', 'Istanbul', 'Izmir']; // Add cities
const PROPERTY_TYPES = [...]; // Modify types
const AMENITIES = [...]; // Add amenities
```

### Customize Colors
```typescript
// Change gradient classes in components
className="bg-gradient-to-r from-blue-600 to-cyan-500"
```

---

## 🐛 Common Issues & Solutions

### Issue: Map not loading
**Solution:** Check if Leaflet CSS is imported in `_app.tsx`:
```typescript
import 'leaflet/dist/leaflet.css'
```

### Issue: Images not showing
**Solution:** Verify image paths in data:
```typescript
images: ['/rentals/property-1.jpg', ...]
```

### Issue: Filters not working
**Solution:** Check filter state updates:
```typescript
setFilters({ ...filters, city: newCity })
```

### Issue: Toast not appearing
**Solution:** Ensure ToastProvider wraps app in `_app.tsx`

---

## 📊 Data Flow

```
User Action
    ↓
Component State Update
    ↓
useMemo Recalculates Filters
    ↓
Filtered Properties Update
    ↓
UI Re-renders
    ↓
Animation Triggers
```

---

## ✅ Testing Checklist

- [ ] Visit `/rentals` page
- [ ] See 5 property cards
- [ ] Apply city filter
- [ ] Apply price range
- [ ] Toggle instant book
- [ ] Search for "villa"
- [ ] Switch to map view
- [ ] Click map marker
- [ ] View property detail
- [ ] Open image gallery
- [ ] Fill booking form
- [ ] Toggle favorite
- [ ] Click share button
- [ ] Test on mobile
- [ ] Test on tablet

---

## 🎓 Learning Path

### Beginner
1. Browse property listings
2. Try different filters
3. View property details
4. Click around UI

### Intermediate
1. Understand filter logic
2. Explore component structure
3. Modify data
4. Add new property

### Advanced
1. Create new filters
2. Add new features
3. Optimize performance
4. Integrate with backend

---

## 📖 Additional Resources

- **Full Documentation:** `RENTALS_DOCUMENTATION.md`
- **Feature List:** `RENTALS_FEATURES.md`
- **Data Structure:** `src/data/rental-properties.ts`
- **Component Code:** `src/pages/rentals/` & `src/components/rentals/`

---

## 🎉 Success Indicators

✅ All 5 properties visible
✅ Filters reduce results
✅ Map shows markers
✅ Detail pages load
✅ Booking form calculates prices
✅ Animations smooth
✅ Mobile responsive
✅ No console errors

---

**Ready to use! Navigate to http://localhost:3100/rentals to get started.**

_For detailed information, see RENTALS_DOCUMENTATION.md_
