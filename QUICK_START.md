# Quick Start Guide - AI Trip Planner

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
All required packages are already in your `package.json`. Just run:
```bash
npm install
```

### Step 2: Configure Environment
Create or update `.env.local`:
```bash
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/travel"
OPENAI_API_KEY="sk-your-openai-key-here"

# Optional
WEATHER_API_KEY="your-weather-api-key"
NEXT_PUBLIC_WS_URL="ws://localhost:3100"
```

### Step 3: Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Access Trip Planner
Open your browser:
```
http://localhost:3100/trip-planner
```

## ✅ What's Included

### Components
- ✅ `EnhancedTripPlanner.tsx` - Main trip planning interface
- ✅ `CollaborativePlanning.tsx` - Real-time collaboration

### API Endpoints
- ✅ `/api/ai/generate-itinerary` - AI itinerary generation
- ✅ `/api/trips/create` - Create trips
- ✅ `/api/trips/share` - Share with collaborators
- ✅ `/api/trips/vote` - Vote on activities
- ✅ `/api/trips/comments` - Comment system

### Utilities
- ✅ `itinerary-optimizer.ts` - Smart route optimization
- ✅ `budget-analyzer.ts` - Budget management
- ✅ `weather-service.ts` - Weather integration
- ✅ `websocket-client.ts` - Real-time collaboration

### Database
- ✅ 6 new tables (Trip, TripItinerary, TripCollaborator, etc.)
- ✅ 5 new enums
- ✅ Complete relations and indexes

## 🎯 Try These Features

### 1. Create Your First Trip
1. Go to `/trip-planner`
2. Enter: "5-day Istanbul trip for 2, budget $2000, love history and food"
3. Select dates and interests
4. Click "Generate AI Itinerary"

### 2. Collaborate with Friends
1. Click "Share" button on any trip
2. Copy the share link
3. Invite friends via email
4. Vote on activities together

### 3. Optimize Your Budget
1. View budget breakdown
2. Get savings suggestions
3. Split costs with travel companions

### 4. Export Your Trip
1. Download as PDF
2. Export to Google Calendar
3. Share on social media

## 🔧 Troubleshooting

### OpenAI API Not Working?
- The system automatically falls back to mock data
- Check your API key in `.env.local`
- Verify account has credits

### Database Issues?
```bash
# Regenerate Prisma client
npm run db:generate

# Reset database (caution: deletes data)
npm run db:push -- --force-reset
```

### WebSocket Not Connecting?
- Real-time features work without WebSocket
- Updates will be on page refresh
- Implement Socket.io server for full functionality

## 📊 Test Data

The system includes mock data generators for:
- ✅ Itineraries (if OpenAI unavailable)
- ✅ Weather forecasts
- ✅ Collaborators
- ✅ Activities

## 🎨 Customization

### Change Travel Styles
Edit in `EnhancedTripPlanner.tsx`:
```typescript
const travelStyles = [
  { value: 'budget', label: 'Budget Friendly', icon: DollarSign },
  { value: 'balanced', label: 'Balanced', icon: TrendingUp },
  { value: 'luxury', label: 'Luxury', icon: Sparkles }
];
```

### Add New Interests
Edit in `EnhancedTripPlanner.tsx`:
```typescript
const interests = [
  'History', 'Food', 'Culture', 'Adventure', 'Relaxation',
  // Add your custom interests here
];
```

### Modify Budget Ranges
Edit in `EnhancedTripPlanner.tsx`:
```typescript
<input
  type="range"
  min="500"    // Change minimum
  max="10000"  // Change maximum
  step="100"   // Change increment
/>
```

## 🌐 Production Deployment

### Before Going Live:
1. ✅ Set up production database
2. ✅ Configure OpenAI API limits
3. ✅ Implement WebSocket server
4. ✅ Add rate limiting
5. ✅ Set up monitoring
6. ✅ Enable caching (Redis)
7. ✅ Test all features

### Environment Variables for Production:
```bash
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
NEXT_PUBLIC_APP_URL="https://travel.lydian.com"
NEXT_PUBLIC_WS_URL="wss://travel.lydian.com"
```

## 📚 Documentation

- **Full Documentation**: `TRIP_PLANNER_README.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`
- **API Reference**: See individual endpoint files

## 🆘 Support

Need help?
- Check `TRIP_PLANNER_README.md` for detailed docs
- Review `IMPLEMENTATION_SUMMARY.md` for technical details
- All code is fully commented

## 🎉 You're Ready!

Your AI Trip Planner is now ready to use. Start planning amazing trips! 🌍✈️

---

**Built with OpenAI GPT-4, Next.js, and modern web technologies**
