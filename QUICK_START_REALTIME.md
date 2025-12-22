# Quick Start - Real-time Dashboard

## ⚡ 5-Minute Setup

### Step 1: Start the WebSocket Server ✅

The mock WebSocket server is **already running** in the background on port 3001!

To verify it's running:
```bash
lsof -i :3001
```

If you need to start it manually later:
```bash
node mock-websocket-server.js
```

### Step 2: Start the Next.js Application

```bash
npm run dev
```

### Step 3: Open the Admin Dashboard

Navigate to: **http://localhost:3000/admin/v2**

### Step 4: Watch the Real-time Magic! 🎉

You should see:

1. **Green "LIVE • WebSocket" indicator** in the top header
2. **Toast notifications** appearing in the top-right corner every 8-15 seconds
3. **Metrics updating** automatically every 5 seconds
4. **Sound alerts** playing when events occur

## What You'll See

### Live Notifications (Top-Right)

Every 8-15 seconds, you'll see notifications like:

```
📨 Yeni Rezervasyon
BMW X5 2024 Premium SUV - 7 Gün
Ahmet Y.
15,000 ₺
```

Then 5-10 seconds later, they'll update to:

```
✅ Onaylandı
BMW X5 2024 Premium SUV - 7 Gün
Ahmet Y.
15,000 ₺
```

### Real-time Metrics (Dashboard Cards)

Watch these numbers change automatically:
- **Toplam Gelir** - Updates every 5 seconds
- **Aktif Rezervasyonlar** - Increments with each new booking
- **Toplam Kullanıcılar** - Updates with metric events

### Connection Status (Header)

- 🟢 **LIVE • WebSocket** = Connected and working
- 🟠 **CONNECTING...** = Trying to connect
- ⚫ **PAUSED** = Real-time disabled (click "Başlat" to enable)

## Troubleshooting

### "CONNECTING..." stays orange
1. Check if the WebSocket server is running: `lsof -i :3001`
2. Restart the server: `node mock-websocket-server.js`
3. Check browser console for errors (F12)

### No notifications appearing
1. Make sure "LIVE • WebSocket" is green
2. Check browser console for WebSocket connection
3. Verify the server is broadcasting (check terminal logs)

### Server not running
```bash
# Kill any existing server on port 3001
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Start fresh
node mock-websocket-server.js
```

## Test the Connection

Open browser console (F12) and check for:

```
✅ Dashboard WebSocket connected successfully
📨 New booking: {id: "...", type: "car", ...}
📊 Metrics update: {totalRevenue: 4850000, ...}
```

## Features to Try

### 1. Pause/Resume Real-time Updates
Click "Duraklat" in the header to pause, "Başlat" to resume

### 2. Dismiss Notifications
Click the X button on any notification

### 3. Sound Alerts
Listen for different sounds:
- 🔔 New booking (info tone)
- ✅ Confirmed booking (success tone)
- ❌ Cancelled booking (error tone)

### 4. Auto-dismiss
Notifications disappear after 10 seconds

## Server Console Output

In the terminal running the WebSocket server, you'll see:

```
📨 NEW BOOKING broadcast to 1 client(s):
   Ahmet Y. (TR) - BMW X5 2024 Premium SUV - 7 Gün
   Amount: 15000 TRY

✅ BOOKING CONFIRMED broadcast to 1 client(s):
   ID: booking-xxx

📊 METRICS UPDATE broadcast to 1 client(s):
   Revenue: 4,850,000 TRY (+15.8%)
   Bookings: 2847 (+12.3%)
   Customers: 38,492 (+23.5%)
```

## Expected Behavior

### Timeline
```
t=0s    : Open dashboard → WebSocket connects
t=1s    : First metric update arrives
t=8-15s : First booking notification appears
t=13-25s: Booking gets confirmed/cancelled
t=every 5s: Metrics update automatically
```

### Notification Lifecycle
```
1. New booking arrives → Toast appears (blue border)
2. Sound plays (info tone)
3. After 5-10s → Status updates to confirmed/cancelled
4. Sound plays (success/error tone)
5. After 10s total → Notification auto-dismisses
```

## What's Happening Behind the Scenes

```
Mock Server (port 3001)
    ↓
Generates random booking event
    ↓
Broadcasts via WebSocket
    ↓
Dashboard receives event
    ↓
Updates React state
    ↓
UI re-renders with new data
    ↓
Notification appears + sound plays
```

## Success Checklist

- [x] WebSocket server running on port 3001
- [ ] Dashboard shows "LIVE • WebSocket" (green)
- [ ] Notifications appear every 8-15 seconds
- [ ] Sound alerts play
- [ ] Metrics update automatically
- [ ] Connection survives page refresh

## Next: Production Deployment

When you're ready for production:

1. Replace `mock-websocket-server.js` with real backend
2. Update `NEXT_PUBLIC_WS_URL` in `.env.local`
3. Add authentication to WebSocket connection
4. Use WSS (secure WebSocket) instead of WS

See `WEBSOCKET_SETUP.md` for detailed production guide.

---

**That's it!** You now have a fully functional real-time dashboard with live notifications and automatic metric updates. 🎉

**Need help?** Check the browser console (F12) and server terminal for detailed logs.
