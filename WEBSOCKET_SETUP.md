# Real-time Dashboard WebSocket Implementation

## Overview

This implementation adds real-time functionality to the Admin V2 Dashboard using WebSocket connections. It enables:

- **Live Booking Notifications** - Instant alerts for new, confirmed, and cancelled bookings
- **Real-time Metric Updates** - Automatic updates for revenue, bookings, and customer counts
- **Toast Notifications** - Beautiful animated notifications with sound alerts
- **WebSocket Status Indicator** - Visual connection status in the header

## Architecture

### Components

1. **WebSocket Service** (`src/lib/websocket/dashboard.ts`)
   - Manages WebSocket connection lifecycle
   - Handles reconnection logic (up to 5 attempts)
   - Event-based architecture with pub/sub pattern
   - Type-safe interfaces for all events

2. **Live Notifications Component** (`src/components/admin/LiveNotifications.tsx`)
   - Toast-style notifications with animations
   - Auto-dismiss after 10 seconds
   - Sound alerts for different event types
   - Category-based styling (property, car, transfer, tour)

3. **Admin Dashboard Integration** (`src/pages/admin/v2/index.tsx`)
   - WebSocket connection management
   - Event subscriptions for bookings and metrics
   - Real-time UI updates without page refresh
   - Connection status indicator

## Usage

### 1. Testing with Mock Server

Start the mock WebSocket server:

```bash
# Install ws package if not already installed
npm install ws

# Start the mock server
node mock-websocket-server.js
```

The mock server will:
- Run on `ws://localhost:3001`
- Simulate booking events every 8-15 seconds
- Send metric updates every 5 seconds
- Auto-confirm or cancel bookings after 5-10 seconds

### 2. Start the Application

```bash
npm run dev
```

Navigate to `/admin/v2` to see the real-time dashboard.

### 3. WebSocket Events

#### Booking Events

**New Booking:**
```typescript
{
  type: 'booking:new',
  payload: {
    id: string,
    type: 'property' | 'car' | 'transfer' | 'tour',
    title: string,
    customerName: string,
    amount: number,
    currency: string,
    timestamp: Date,
    status: 'new',
    country: string
  }
}
```

**Confirmed Booking:**
```typescript
{
  type: 'booking:confirmed',
  payload: { /* same as above, status: 'confirmed' */ }
}
```

**Cancelled Booking:**
```typescript
{
  type: 'booking:cancelled',
  payload: { /* same as above, status: 'cancelled' */ }
}
```

#### Metric Updates

```typescript
{
  type: 'metrics:update',
  payload: {
    totalRevenue: number,
    todayRevenue: number,
    activeBookings: number,
    totalCustomers: number,
    revenueChange: number,
    bookingsChange: number,
    customersChange: number,
    timestamp: Date
  }
}
```

## Features

### 1. Live Connection Indicator

The header shows real-time connection status:
- 🟢 **LIVE • WebSocket** - Connected and receiving data
- 🟠 **CONNECTING...** - Attempting to connect
- ⚫ **PAUSED** - Real-time updates disabled

### 2. Toast Notifications

Notifications appear in the top-right corner with:
- Category icon (Home, Car, Bus, Compass)
- Status badge (New, Confirmed, Cancelled)
- Customer name and booking details
- Amount and timestamp
- Auto-dismiss after 10 seconds
- Manual dismiss with X button

### 3. Sound Alerts

Different sounds for different events:
- 🔔 **Info** - New booking (A4 → C#5)
- ✅ **Success** - Confirmed booking (C5 → E5)
- ❌ **Error** - Cancelled booking (E4 → D4)

### 4. Real-time Metric Updates

Metrics automatically update when WebSocket receives updates:
- Total Revenue
- Active Bookings
- Total Customers
- Trend indicators (↑/↓)

### 5. Auto-Reconnection

If connection is lost, the system will:
- Automatically attempt to reconnect
- Use exponential backoff (3s, 6s, 9s, 12s, 15s)
- Show connection status in UI
- Retry up to 5 times

## Configuration

### Environment Variables

Create `.env.local`:

```env
# WebSocket URL (defaults to ws://localhost:3001/admin/dashboard)
NEXT_PUBLIC_WS_URL=ws://localhost:3001/admin/dashboard

# For production
# NEXT_PUBLIC_WS_URL=wss://your-domain.com/admin/dashboard
```

### Customization

**Change reconnection settings:**

Edit `src/lib/websocket/dashboard.ts`:

```typescript
private maxReconnectAttempts = 5;  // Number of retry attempts
private reconnectDelay = 3000;     // Base delay in milliseconds
```

**Change notification display time:**

Edit `src/components/admin/LiveNotifications.tsx`:

```typescript
setTimeout(() => {
  onDismiss(notification.id);
}, 10000);  // Change to desired milliseconds
```

## Production Deployment

### 1. WebSocket Server

For production, you'll need to:

1. Deploy a proper WebSocket server (e.g., using Socket.io, uWebSockets.js)
2. Connect to your database for real events
3. Add authentication/authorization
4. Use WSS (secure WebSocket) with SSL/TLS

### 2. Recommended Stack

- **Socket.io** - Easier development, fallback support
- **Redis** - For pub/sub across multiple server instances
- **Nginx** - As reverse proxy with WebSocket support
- **SSL/TLS** - Required for WSS in production

### 3. Nginx Configuration Example

```nginx
location /admin/dashboard {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## Troubleshooting

### Connection Failed

1. Check if mock server is running: `lsof -i :3001`
2. Verify WebSocket URL in browser console
3. Check firewall settings

### No Notifications Appearing

1. Open browser console and check for errors
2. Verify `isRealtimeEnabled` is true
3. Check if WebSocket is connected (green indicator)

### Notifications Not Dismissing

1. Check browser console for React errors
2. Verify Framer Motion is installed: `npm list framer-motion`

## File Structure

```
src/
├── lib/
│   └── websocket/
│       └── dashboard.ts           # WebSocket service
├── components/
│   └── admin/
│       └── LiveNotifications.tsx  # Notification component
└── pages/
    └── admin/
        └── v2/
            └── index.tsx          # Dashboard with integration

mock-websocket-server.js           # Mock server for testing
WEBSOCKET_SETUP.md                # This file
```

## Next Steps

- [ ] Integrate with real backend WebSocket server
- [ ] Add authentication to WebSocket connections
- [ ] Implement message history/playback
- [ ] Add filters for notification types
- [ ] Create admin settings for notifications
- [ ] Add desktop notifications (browser API)
- [ ] Implement notification center/history

## Support

For issues or questions:
1. Check browser console for errors
2. Verify WebSocket server is running
3. Review this documentation
4. Check network tab for WebSocket frames
