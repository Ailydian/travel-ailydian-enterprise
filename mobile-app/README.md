# Travel Ailydian Mobile App 📱

## React Native Application

This directory contains the React Native mobile application for Travel Ailydian.

## Quick Start

### Prerequisites
- Node.js 20+
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

```bash
# Navigate to mobile app directory
cd mobile-app/TravelAilydian

# Install dependencies
npm install

# Install iOS dependencies (Mac only)
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
TravelAilydian/
├── src/
│   ├── screens/          # Screen components
│   │   ├── Home/
│   │   ├── VehicleOwner/
│   │   ├── TransferOwner/
│   │   └── Booking/
│   ├── components/       # Reusable components
│   ├── navigation/       # React Navigation setup
│   ├── services/         # API services
│   ├── store/            # State management (Zustand)
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript types
├── android/              # Android native code
├── ios/                  # iOS native code
└── App.tsx              # Root component
```

## Features

### Implemented
- ✅ Vehicle Owner Dashboard
- ✅ Transfer Owner Dashboard
- ✅ Booking Management
- ✅ Push Notifications
- ✅ Offline Support
- ✅ Multi-language (TR/EN)

### Planned
- 🔄 Real-time tracking
- 🔄 In-app payments
- 🔄 AR vehicle preview
- 🔄 Voice commands

## API Integration

The mobile app connects to the main backend:

```typescript
const API_BASE_URL = 'https://travel.ailydian.com/api'
```

## Building for Production

### iOS

```bash
# Build for App Store
npm run build:ios

# Or using Xcode
open ios/TravelAilydian.xcworkspace
```

### Android

```bash
# Build release APK
cd android
./gradlew assembleRelease

# Build App Bundle (for Play Store)
./gradlew bundleRelease
```

## Environment Variables

Create `.env` file:

```env
API_URL=https://travel.ailydian.com/api
GOOGLE_MAPS_KEY=your_key_here
SENTRY_DSN=your_sentry_dsn
```

## Testing

```bash
# Run unit tests
npm test

# Run E2E tests (Detox)
npm run test:e2e:ios
npm run test:e2e:android
```

## Performance

- **Bundle Size:** < 20MB
- **Time to Interactive:** < 2s
- **Offline First:** Full offline support
- **60 FPS:** Smooth animations

## Support

- Email: support@ailydian.com
- Docs: https://docs.ailydian.com/mobile
- Status: https://status.ailydian.com

---

**Built with ❤️ by the Ailydian Team**
