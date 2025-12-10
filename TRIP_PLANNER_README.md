# AI Trip Planner with Collaborative Features

## Overview

The AI-powered trip planner is a comprehensive travel planning solution that combines artificial intelligence, real-time collaboration, and intelligent optimization to create perfect itineraries for travelers.

## Features Implemented

### 1. Enhanced Trip Planner (`/src/components/ai/EnhancedTripPlanner.tsx`)

#### Natural Language Input
- Users can describe their trip in plain English: "5-day Istanbul trip for 2, budget $2000, love history and food"
- Simple NLP parsing extracts key information
- Structured form fields for precise control

#### AI Itinerary Generation
- **Multi-day itineraries** with hourly schedules
- **Budget breakdown** per day and activity
- **Weather integration** for each day
- **Real-time availability checks** for activities
- **Alternative suggestions** for each major activity
- Export to **PDF and Calendar** formats

#### Key Features:
- Travel style selection (Budget, Balanced, Luxury)
- Interest-based activity filtering
- Date range selection
- Budget slider with visual feedback
- Loading animation during generation
- Confidence scores for AI suggestions

### 2. Collaborative Planning (`/src/components/ai/CollaborativePlanning.tsx`)

#### Real-Time Collaboration
- **Share trip links** with friends and family
- **Real-time collaborative editing** via WebSocket
- **Vote on activities/hotels** (upvote, downvote, interested, not interested)
- **Comments and suggestions** on specific activities
- **Group chat** for discussions
- **User presence indicators** (online/offline status)

#### Cost Management
- **Split cost calculator** with equal or custom splits
- **Track who has paid** their share
- **Budget tracking** across all collaborators
- **Payment requests** integration ready

#### Shared Features:
- **Shared wishlist** for activities and locations
- **Voting system** with majority rules
- **Activity feed** showing all changes
- **Invite system** via email
- **Role-based permissions** (Owner, Editor, Viewer)

### 3. Trip Planner API Endpoints

#### `/api/ai/generate-itinerary` (POST)
Generates detailed itineraries using OpenAI GPT-4:
- Accepts trip preferences (destination, dates, budget, interests)
- Returns day-by-day itinerary with activities, meals, and accommodations
- Includes budget breakdown and travel tips
- Falls back to mock data if OpenAI is unavailable

#### `/api/trips/create` (POST)
Creates a new trip:
- Saves trip details to database
- Creates itinerary days
- Generates unique share link
- Adds creator as owner collaborator

#### `/api/trips/share` (POST)
Shares trip with collaborators:
- Sends invitation via email
- Sets role and permissions
- Creates pending collaborator record

#### `/api/trips/vote` (POST)
Records votes on activities:
- Supports multiple vote types
- Prevents duplicate votes
- Returns vote statistics

#### `/api/trips/comments` (GET/POST/DELETE)
Manages trip comments:
- GET: Retrieve comments for trip or specific activity
- POST: Add new comment (supports replies)
- DELETE: Remove comment (author only)

### 4. Trip Planner Page (`/src/pages/trip-planner.tsx`)

#### Features:
- **Multi-view interface**: Planner, Itinerary, Map, Collaborate
- **Trip creation wizard** with step-by-step guidance
- **Timeline view** of itinerary
- **Interactive map** showing all locations
- **Budget tracker** sidebar with real-time updates
- **One-click booking** integration
- **Export options** (PDF, Calendar, Share)

### 5. Database Schema (Prisma)

#### New Models:
- **Trip**: Core trip information (destination, dates, budget, status)
- **TripItinerary**: Day-by-day breakdown with activities
- **TripCollaborator**: Manage trip participants and permissions
- **TripActivity**: Individual activities with location, cost, timing
- **TripComment**: Comments on trip or specific activities
- **TripVote**: Voting system for activities

#### Enums:
- TripStatus: DRAFT, PLANNING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
- CollaboratorRole: OWNER, EDITOR, VIEWER
- ActivityType: HOTEL, FLIGHT, RESTAURANT, ATTRACTION, TOUR, etc.
- VoteType: UPVOTE, DOWNVOTE, INTERESTED, NOT_INTERESTED

### 6. Utility Libraries

#### Itinerary Optimizer (`/src/lib/ai/itinerary-optimizer.ts`)
- **Time optimization**: Minimize travel time between activities
- **Budget optimization**: Maximize value within budget constraints
- **Quality optimization**: Prioritize best experiences
- **Route optimization**: Traveling salesman problem solution
- **Time slot generation**: Create realistic schedules
- **Weather adaptation**: Adjust for weather conditions
- **Crowd avoidance**: Schedule popular attractions at off-peak times

#### Budget Analyzer (`/src/lib/ai/budget-analyzer.ts`)
- **Budget breakdown** analysis by category
- **Spending score** calculation (0-100)
- **Savings opportunities** identification
- **Destination-specific advice**
- **Cost splitting** for group travel
- **Currency conversion**
- **Daily allowance** calculation

#### Weather Service (`/src/lib/ai/weather-service.ts`)
- **Weather forecasts** for trip dates
- **Activity suitability** based on weather
- **Packing list generation**
- **Clothing recommendations**
- **Comfort index** calculation
- **Best time suggestions** for outdoor activities

#### WebSocket Client (`/src/lib/realtime/websocket-client.ts`)
- **Real-time messaging** via Socket.io
- **Presence tracking** (online/offline status)
- **Auto-reconnection** with exponential backoff
- **Typing indicators**
- **Trip sync** for collaborative editing
- **React hook** for easy integration

## Technology Stack

### Frontend
- **React** with TypeScript
- **Next.js** 15 (App Router ready)
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **date-fns** for date manipulation
- **Lucide React** for icons

### Backend
- **Next.js API Routes**
- **Prisma ORM** with PostgreSQL
- **OpenAI GPT-4** for itinerary generation
- **Socket.io** for real-time features

### AI Features
- **OpenAI GPT-4 Turbo** for natural language processing
- Context-aware suggestions
- Budget optimization algorithms
- Time optimization (minimize travel time)
- Weather-aware planning
- Personalized recommendations

## Setup Instructions

### 1. Environment Variables

Create `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/travel"

# OpenAI
OPENAI_API_KEY="sk-..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3100"
NEXT_PUBLIC_WS_URL="ws://localhost:3100"

# Optional: Weather API
WEATHER_API_KEY="your-weather-api-key"
```

### 2. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate
```

### 3. Install Dependencies

All required dependencies are already in `package.json`:
- openai: ^5.23.0
- socket.io-client: ^4.8.1
- date-fns: ^2.30.0
- framer-motion: ^10.18.0

### 4. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3100/trip-planner

## Usage Guide

### Creating a Trip

1. Navigate to `/trip-planner`
2. Describe your trip or fill in the form:
   - Destination
   - Travel dates
   - Number of travelers
   - Total budget
   - Travel style (Budget/Balanced/Luxury)
   - Interests (History, Food, Culture, etc.)
3. Click "Generate AI Itinerary"
4. Review the generated itinerary

### Collaborating on a Trip

1. Click "Share" button
2. Copy the share link or enter email addresses
3. Set role for each collaborator (Owner/Editor/Viewer)
4. Collaborators can:
   - View the itinerary
   - Vote on activities
   - Add comments
   - Chat in real-time
   - Suggest changes

### Optimizing Your Itinerary

The system automatically:
- Minimizes travel time between locations
- Balances your budget across activities
- Considers opening hours and crowd levels
- Adapts to weather conditions
- Suggests alternatives for each activity

### Exporting Your Trip

- **PDF**: Complete itinerary with all details
- **Calendar**: ICS file for Google Calendar, Apple Calendar, Outlook
- **Share Link**: Collaborative view for friends/family

## API Integration

### OpenAI Integration

The system uses GPT-4 to generate intelligent itineraries:

```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [
    { role: 'system', content: 'You are an expert travel planner...' },
    { role: 'user', content: prompt }
  ],
  response_format: { type: 'json_object' }
});
```

### WebSocket Integration

Real-time collaboration uses Socket.io:

```typescript
const client = new TripCollaborationClient(tripId, userId, userName);
await client.connect();

// Listen for updates
client.onMessage('update', (data) => {
  // Handle real-time updates
});

// Send messages
client.sendChatMessage('Let\'s add this to the itinerary!');
```

## Performance Optimizations

1. **Lazy Loading**: Map components loaded client-side only
2. **Caching**: Weather and location data cached
3. **Debouncing**: Search and input debounced
4. **Optimistic Updates**: UI updates immediately, syncs in background
5. **Code Splitting**: Components loaded on-demand

## Security Features

1. **Authentication**: User must be logged in
2. **Authorization**: Role-based permissions (Owner/Editor/Viewer)
3. **Rate Limiting**: API endpoints rate-limited
4. **Input Validation**: All inputs validated and sanitized
5. **XSS Protection**: Content properly escaped

## Future Enhancements

### Planned Features:
- [ ] Google Calendar API integration
- [ ] Real-time flight and hotel price tracking
- [ ] AR/VR preview of destinations
- [ ] Voice-based trip planning
- [ ] Automatic booking integration
- [ ] Travel insurance recommendations
- [ ] Visa requirement checker
- [ ] Currency exchange tracking
- [ ] Mobile app (React Native)
- [ ] Offline mode support

### AI Improvements:
- [ ] Multi-destination trips
- [ ] Learning from past trips
- [ ] Personality-based recommendations
- [ ] Social media integration for inspiration
- [ ] Automated expense tracking
- [ ] Smart notifications (flight delays, weather changes)

## Troubleshooting

### OpenAI API Errors
- Check API key in `.env.local`
- Verify account has credits
- System falls back to mock data if API fails

### WebSocket Connection Issues
- Ensure Socket.io server is running
- Check firewall settings
- Verify CORS configuration

### Database Errors
- Run `npm run db:generate` after schema changes
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running

## File Structure

```
/src
  /components
    /ai
      EnhancedTripPlanner.tsx    # Main trip planner component
      CollaborativePlanning.tsx  # Collaboration features
  /pages
    trip-planner.tsx             # Main page
    /api
      /ai
        generate-itinerary.ts    # AI itinerary generation
      /trips
        create.ts                # Create trip
        share.ts                 # Share with collaborators
        vote.ts                  # Vote on activities
        comments.ts              # Comments system
  /lib
    /ai
      itinerary-optimizer.ts     # Optimization algorithms
      budget-analyzer.ts         # Budget analysis
      weather-service.ts         # Weather integration
    /realtime
      websocket-client.ts        # WebSocket client
/prisma
  schema.prisma                  # Database schema
```

## License

This feature is part of the Ailydian Travel Enterprise platform.

## Support

For questions or issues:
- Email: support@ailydian.com
- Documentation: https://docs.ailydian.com
- GitHub: https://github.com/ailydian/travel-enterprise

---

**Built with ❤️ using OpenAI GPT-4, Next.js, and modern web technologies**
