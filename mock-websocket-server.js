/**
 * Mock WebSocket Server for Testing Real-time Dashboard
 *
 * Usage:
 *   node mock-websocket-server.js
 *
 * Features:
 * - Simulates booking notifications (new, confirmed, cancelled)
 * - Simulates real-time metric updates
 * - Auto-reconnection support
 */

const WebSocket = require('ws');

const PORT = 3001;
const wss = new WebSocket.Server({ port: PORT });

console.log(`🚀 Mock WebSocket Server started on ws://localhost:${PORT}`);
console.log('📡 Waiting for connections...\n');

// Mock data generators
const customerNames = [
  'Ahmet Y.', 'Mehmet K.', 'Ayşe T.', 'Fatma S.',
  'John D.', 'Sarah M.', 'Elena R.', 'Pierre L.',
  'Hans M.', 'Maria G.', 'Ahmed A.', 'Yuki T.'
];

const countries = ['TR', 'US', 'RU', 'DE', 'FR', 'GB', 'JP', 'SA', 'AE'];

const tourTypes = [
  { type: 'property', titles: [
    'Bodrum Villa - 14 Gün',
    'İstanbul Loft - 7 Gün',
    'Antalya Yazlık - 21 Gün',
    'Kapadokya Butik Otel - 3 Gün',
    'Çeşme Beach House - 10 Gün'
  ]},
  { type: 'car', titles: [
    'BMW X5 2024 Premium SUV - 7 Gün',
    'Mercedes E-Class - 5 Gün',
    'Volkswagen Golf - 14 Gün',
    'Audi A6 Sedan - 3 Gün',
    'Range Rover Sport - 10 Gün'
  ]},
  { type: 'transfer', titles: [
    'İstanbul Havalimanı → Taksim VIP',
    'Antalya Havalimanı → Kemer',
    'Bodrum → Gümbet Sahil',
    'Sabiha Gökçen → Kadıköy',
    'İzmir Havalimanı → Çeşme'
  ]},
  { type: 'tour', titles: [
    'Kapadokya Balon Turu - 2 Kişi',
    'Pamukkale Full Day Tour',
    'Boğaz Turu Premium',
    'Antalya Rafting Macerası',
    'Efes Antik Kenti Turu'
  ]}
];

const statuses = ['new', 'confirmed', 'cancelled'];

// Generate random booking
function generateBooking(status = null) {
  const tourType = tourTypes[Math.floor(Math.random() * tourTypes.length)];
  const title = tourType.titles[Math.floor(Math.random() * tourType.titles.length)];
  const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
  const country = countries[Math.floor(Math.random() * countries.length)];
  const amount = Math.floor(Math.random() * 50000) + 500;

  return {
    id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: tourType.type,
    title,
    customerName,
    amount,
    currency: 'TRY',
    timestamp: new Date().toISOString(),
    status: status || statuses[Math.floor(Math.random() * statuses.length)],
    country
  };
}

// Generate random metric update
function generateMetricUpdate() {
  return {
    totalRevenue: Math.floor(4800000 + Math.random() * 100000),
    todayRevenue: Math.floor(125000 + Math.random() * 25000),
    activeBookings: Math.floor(2800 + Math.random() * 100),
    totalCustomers: Math.floor(38000 + Math.random() * 1000),
    revenueChange: (Math.random() * 30 - 5).toFixed(1),
    bookingsChange: (Math.random() * 20 - 2).toFixed(1),
    customersChange: (Math.random() * 40 - 5).toFixed(1),
    timestamp: new Date().toISOString()
  };
}

// Connected clients
const clients = new Set();

wss.on('connection', (ws, req) => {
  const clientId = `client-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  clients.add(ws);

  console.log(`✅ New client connected: ${clientId}`);
  console.log(`👥 Total clients: ${clients.size}\n`);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connected',
    payload: {
      message: 'Connected to Mock WebSocket Server',
      clientId,
      timestamp: new Date().toISOString()
    }
  }));

  // Send initial metric update
  setTimeout(() => {
    ws.send(JSON.stringify({
      type: 'metrics:update',
      payload: generateMetricUpdate()
    }));
  }, 1000);

  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log(`📨 Message from ${clientId}:`, data);

      // Echo back or handle custom logic
      if (data.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }));
      }
    } catch (error) {
      console.error('❌ Failed to parse message:', error);
    }
  });

  // Handle client disconnect
  ws.on('close', () => {
    clients.delete(ws);
    console.log(`❌ Client disconnected: ${clientId}`);
    console.log(`👥 Total clients: ${clients.size}\n`);
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error(`⚠️  WebSocket error for ${clientId}:`, error.message);
  });
});

// Broadcast function
function broadcast(type, payload) {
  const message = JSON.stringify({ type, payload });
  let sentCount = 0;

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
      sentCount++;
    }
  });

  return sentCount;
}

// Simulate real-time events
console.log('🎬 Starting event simulation...\n');

// Send booking notifications every 8-15 seconds
setInterval(() => {
  if (clients.size === 0) return;

  const booking = generateBooking('new');
  const sent = broadcast('booking:new', booking);

  console.log(`📨 NEW BOOKING broadcast to ${sent} client(s):`);
  console.log(`   ${booking.customerName} (${booking.country}) - ${booking.title}`);
  console.log(`   Amount: ${booking.amount} ${booking.currency}\n`);

  // Randomly confirm or cancel after 5-10 seconds
  setTimeout(() => {
    if (clients.size === 0) return;

    const newStatus = Math.random() > 0.2 ? 'confirmed' : 'cancelled';
    const updatedBooking = { ...booking, status: newStatus };
    const eventType = newStatus === 'confirmed' ? 'booking:confirmed' : 'booking:cancelled';

    const sent = broadcast(eventType, updatedBooking);
    console.log(`${newStatus === 'confirmed' ? '✅' : '❌'} BOOKING ${newStatus.toUpperCase()} broadcast to ${sent} client(s):`);
    console.log(`   ID: ${booking.id}\n`);
  }, Math.random() * 5000 + 5000);

}, Math.random() * 7000 + 8000);

// Send metric updates every 5 seconds
setInterval(() => {
  if (clients.size === 0) return;

  const metrics = generateMetricUpdate();
  const sent = broadcast('metrics:update', metrics);

  console.log(`📊 METRICS UPDATE broadcast to ${sent} client(s):`);
  console.log(`   Revenue: ${metrics.totalRevenue.toLocaleString('tr-TR')} TRY (${metrics.revenueChange > 0 ? '+' : ''}${metrics.revenueChange}%)`);
  console.log(`   Bookings: ${metrics.activeBookings} (${metrics.bookingsChange > 0 ? '+' : ''}${metrics.bookingsChange}%)`);
  console.log(`   Customers: ${metrics.totalCustomers.toLocaleString('tr-TR')} (${metrics.customersChange > 0 ? '+' : ''}${metrics.customersChange}%)\n`);
}, 5000);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down WebSocket server...');

  // Notify all clients
  broadcast('server:shutdown', {
    message: 'Server is shutting down',
    timestamp: new Date().toISOString()
  });

  // Close all connections
  wss.close(() => {
    console.log('✅ All connections closed. Goodbye!\n');
    process.exit(0);
  });
});

console.log('💡 Press Ctrl+C to stop the server\n');
console.log('=' .repeat(60));
