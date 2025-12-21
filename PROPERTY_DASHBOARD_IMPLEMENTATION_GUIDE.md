# Property Owner Dashboard - Uygulama Rehberi

## 1. Proje Kurulumu

### 1.1 Dosya Yapısı

```
src/
├── app/
│   └── dashboard/
│       ├── layout.tsx                 # Dashboard layout
│       ├── page.tsx                   # Overview/home
│       ├── overview/
│       │   └── page.tsx
│       ├── bookings/
│       │   ├── page.tsx
│       │   └── [id]/
│       │       └── page.tsx
│       ├── calendar/
│       │   └── page.tsx
│       ├── earnings/
│       │   └── page.tsx
│       ├── messages/
│       │   └── page.tsx
│       ├── analytics/
│       │   └── page.tsx
│       ├── settings/
│       │   └── page.tsx
│       └── properties/
│           ├── page.tsx
│           └── new/
│               └── page.tsx
│
├── components/
│   ├── dashboard/
│   │   ├── Overview/
│   │   │   ├── DashboardOverview.tsx
│   │   │   ├── QuickStats.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   └── index.ts
│   │   ├── Bookings/
│   │   │   ├── BookingsPage.tsx
│   │   │   ├── BookingTable.tsx
│   │   │   ├── BookingModal.tsx
│   │   │   └── index.ts
│   │   ├── Calendar/
│   │   ├── Earnings/
│   │   ├── Messages/
│   │   ├── Analytics/
│   │   ├── Settings/
│   │   └── Shared/
│   │       ├── DashboardHeader.tsx
│   │       ├── DashboardSidebar.tsx
│   │       ├── StatCard.tsx
│   │       └── index.ts
│   │
│   └── PropertySubmission/
│       ├── PropertyWizard.tsx
│       ├── Step1Basic.tsx
│       ├── Step2Location.tsx
│       ├── Step3Amenities.tsx
│       ├── Step4Pricing.tsx
│       ├── Step5Photos.tsx
│       ├── Step6Rules.tsx
│       ├── Step7Terms.tsx
│       ├── Step8Review.tsx
│       ├── StepIndicator.tsx
│       └── index.ts
│
├── hooks/
│   ├── useDashboard.ts               # All React Query hooks
│   ├── useWizard.ts                  # Wizard state management
│   └── useImageUpload.ts             # Image upload hooks
│
├── services/
│   ├── api.ts                        # API client & endpoints
│   └── websocket.ts                  # Real-time features
│
├── stores/
│   └── dashboardStore.ts             # Zustand stores
│
├── lib/
│   ├── validation/
│   │   └── propertySubmissionSchema.ts  # Zod schemas
│   └── utils/
│       ├── imageOptimizer.ts
│       ├── priceCalculator.ts
│       └── dateFormatter.ts
│
└── types/
    └── dashboard.types.ts            # All TypeScript types
```

### 1.2 Paket Bağımlılıkları

```bash
# Zaten kurulu olanlar (package.json'da var):
npm install @tanstack/react-query zustand zod axios next-auth framer-motion recharts lucide-react

# İhtiyaç duyulabilecekler:
npm install react-dropzone react-dnd react-dnd-html5-backend socket.io-client date-fns clsx tailwind-merge
```

---

## 2. Dashboard Sayfalarının Kurulması

### 2.1 Layout Yapısı

**File: `/app/dashboard/layout.tsx`**

```typescript
import DashboardHeader from '@/components/dashboard/Shared/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/Shared/DashboardSidebar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
```

### 2.2 Overview/Home Page

**File: `/app/dashboard/page.tsx`**

```typescript
'use client';

import { useAnalyticsOverview, useBookings, useProperties } from '@/hooks/useDashboard';
import DashboardOverview from '@/components/dashboard/Overview/DashboardOverview';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { data: metrics, isLoading: metricsLoading } = useAnalyticsOverview();
  const { data: bookings = [], isLoading: bookingsLoading } = useBookings({
    status: 'pending',
  });
  const { data: properties = [], isLoading: propertiesLoading } = useProperties();

  if (metricsLoading || bookingsLoading || propertiesLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <DashboardOverview
      metrics={metrics}
      upcomingBookings={bookings.slice(0, 5)}
      properties={properties}
    />
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
```

---

## 3. Component Geliştirme Örnekleri

### 3.1 Booking Table Component

**File: `/components/dashboard/Bookings/BookingTable.tsx`**

```typescript
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Booking, BookingStatus } from '@/types/dashboard.types';
import { formatDate } from '@/lib/utils/dateFormatter';
import { MoreVertical } from 'lucide-react';

interface BookingTableProps {
  bookings: Booking[];
  onSelect?: (booking: Booking) => void;
  isLoading?: boolean;
}

export default function BookingTable({
  bookings,
  onSelect,
  isLoading,
}: BookingTableProps) {
  const statusColors: Record<BookingStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    'checked-in': 'bg-blue-100 text-blue-800',
    'checked-out': 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow
              key={booking.id}
              onClick={() => onSelect?.(booking)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <TableCell>
                <div>
                  <p className="font-medium">{booking.guestName}</p>
                  <p className="text-sm text-gray-500">{booking.guestEmail}</p>
                </div>
              </TableCell>
              <TableCell>{booking.propertyId}</TableCell>
              <TableCell>{formatDate(booking.checkIn)}</TableCell>
              <TableCell>{formatDate(booking.checkOut)}</TableCell>
              <TableCell className="font-medium">
                ${booking.totalPrice.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge className={statusColors[booking.status]}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

### 3.2 Message Component with WebSocket

**File: `/components/dashboard/Messages/MessageThread.tsx`**

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { useMessages, useSendMessage } from '@/hooks/useDashboard';
import { Message, Conversation } from '@/types/dashboard.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import io from 'socket.io-client';

interface MessageThreadProps {
  conversation: Conversation;
}

export default function MessageThread({
  conversation,
}: MessageThreadProps) {
  const { data: messages = [], refetch } = useMessages(conversation.id);
  const { mutate: sendMessage, isPending } = useSendMessage();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    socketRef.current = io(
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      {
        query: {
          conversationId: conversation.id,
          token: localStorage.getItem('authToken'),
        },
      }
    );

    socketRef.current.on('new-message', () => {
      refetch();
    });

    socketRef.current.on('typing', (userId: string) => {
      // Handle typing indicator
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [conversation.id, refetch]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage({
      conversationId: conversation.id,
      content: input,
    });

    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderType === 'host'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.senderType === 'host'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={isPending || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Property Submission Wizard Kurulumu

### 4.1 Main Wizard Component

**File: `/components/PropertySubmission/PropertyWizard.tsx`**

```typescript
'use client';

import { useState, useCallback } from 'react';
import { useWizardStore } from '@/stores/wizardStore';
import Step1Basic from './Step1Basic';
import Step2Location from './Step2Location';
import Step3Amenities from './Step3Amenities';
import Step4Pricing from './Step4Pricing';
import Step5Photos from './Step5Photos';
import Step6Rules from './Step6Rules';
import Step7Terms from './Step7Terms';
import Step8Review from './Step8Review';
import StepIndicator from './StepIndicator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const STEPS = [
  { number: 1, title: 'Basic Information', component: Step1Basic },
  { number: 2, title: 'Location & Details', component: Step2Location },
  { number: 3, title: 'Amenities & Features', component: Step3Amenities },
  { number: 4, title: 'Pricing', component: Step4Pricing },
  { number: 5, title: 'Photos', component: Step5Photos },
  { number: 6, title: 'House Rules', component: Step6Rules },
  { number: 7, title: 'Terms & Conditions', component: Step7Terms },
  { number: 8, title: 'Review & Submit', component: Step8Review },
];

export default function PropertyWizard() {
  const { toast } = useToast();
  const {
    currentStep,
    formData,
    nextStep,
    prevStep,
    setFormData,
    validateCurrentStep,
    submitWizard,
  } = useWizardStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const CurrentStepComponent = STEPS[currentStep - 1]?.component;

  const handleNext = async () => {
    try {
      const isValid = await validateCurrentStep();
      if (isValid) {
        if (currentStep === STEPS.length) {
          // Last step - submit
          setIsSubmitting(true);
          await submitWizard();
          toast({
            title: 'Success',
            description: 'Property submitted successfully!',
          });
        } else {
          nextStep();
        }
      }
    } catch (error: any) {
      toast({
        title: 'Validation Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      prevStep();
    }
  };

  const handleSaveDraft = async () => {
    try {
      await useWizardStore.getState().saveDraft();
      toast({
        title: 'Draft Saved',
        description: 'Your progress has been saved',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        totalSteps={STEPS.length}
        steps={STEPS}
      />

      {/* Current Step */}
      <div className="mt-12 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">
          {STEPS[currentStep - 1].title}
        </h2>

        {CurrentStepComponent && (
          <CurrentStepComponent
            data={formData[`step${currentStep}` as keyof typeof formData]}
            onChange={(updates) => {
              setFormData(`step${currentStep}`, updates);
            }}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <Button
          onClick={handlePrev}
          disabled={currentStep === 1}
          variant="outline"
        >
          Previous
        </Button>

        <div className="flex gap-3">
          <Button onClick={handleSaveDraft} variant="secondary">
            Save Draft
          </Button>

          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentStep === STEPS.length ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Step {currentStep} of {STEPS.length}
      </div>
    </div>
  );
}
```

### 4.2 Photo Upload Step

**File: `/components/PropertySubmission/Step5Photos.tsx`**

```typescript
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUploadPropertyImages } from '@/hooks/useDashboard';
import { Button } from '@/components/ui/button';
import { Upload, X, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { validateImageDimensions } from '@/lib/validation/propertySubmissionSchema';

interface Step5PhotosProps {
  data: any;
  onChange: (updates: any) => void;
}

export default function Step5Photos({ data, onChange }: Step5PhotosProps) {
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setErrors([]);

      // Validate files
      const validationErrors: string[] = [];

      for (const file of acceptedFiles) {
        // Check size
        if (file.size > 5 * 1024 * 1024) {
          validationErrors.push(`${file.name} exceeds 5MB limit`);
          continue;
        }

        // Check type
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
          validationErrors.push(`${file.name} is not a supported format`);
          continue;
        }

        // Check dimensions
        const isValidDimension = await validateImageDimensions(file);
        if (!isValidDimension) {
          validationErrors.push(
            `${file.name} resolution is too small (min 800x600)`
          );
        }
      }

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Upload valid files
      setUploading(true);
      try {
        const newPhotos = acceptedFiles.map((file, index) => ({
          id: `photo-${Date.now()}-${index}`,
          localFile: file,
          url: URL.createObjectURL(file),
          room: 'other',
          order: (data.photos?.length || 0) + index,
          isUploaded: false,
          uploadProgress: 0,
        }));

        onChange({
          ...data,
          photos: [...(data.photos || []), ...newPhotos],
        });
      } finally {
        setUploading(false);
      }
    },
    [data, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
  });

  const removePhoto = (photoId: string) => {
    onChange({
      ...data,
      photos: data.photos.filter((p: any) => p.id !== photoId),
    });
  };

  const setCoverPhoto = (photoId: string) => {
    const index = data.photos.findIndex((p: any) => p.id === photoId);
    onChange({
      ...data,
      coverPhotoIndex: index,
    });
  };

  const updatePhotoRoom = (photoId: string, room: string) => {
    onChange({
      ...data,
      photos: data.photos.map((p: any) =>
        p.id === photoId ? { ...p, room } : p
      ),
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium">Drop photos here or click to select</p>
        <p className="text-sm text-gray-500 mt-2">
          Minimum 5 photos, max 50. JPG, PNG, WebP (up to 5MB each)
        </p>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-900">Upload errors:</h4>
              <ul className="mt-2 space-y-1">
                {errors.map((error, i) => (
                  <li key={i} className="text-sm text-red-800">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Photos Grid */}
      {data.photos && data.photos.length > 0 && (
        <div>
          <h4 className="font-medium mb-4">Uploaded Photos ({data.photos.length}/50)</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.photos.map((photo: any, index: number) => (
              <div
                key={photo.id}
                className={`relative group rounded-lg overflow-hidden border-2 ${
                  data.coverPhotoIndex === index
                    ? 'border-blue-500'
                    : 'border-gray-200'
                }`}
              >
                {/* Image */}
                <Image
                  src={photo.url}
                  alt={photo.caption || `Photo ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Button
                    size="sm"
                    onClick={() => setCoverPhoto(photo.id)}
                    className="text-xs"
                  >
                    {data.coverPhotoIndex === index ? '✓ Cover' : 'Set Cover'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePhoto(photo.id)}
                    className="text-xs"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>

                {/* Room Select */}
                <select
                  value={photo.room}
                  onChange={(e) => updatePhotoRoom(photo.id, e.target.value)}
                  className="absolute bottom-0 left-0 right-0 text-xs p-1 bg-gray-900 text-white"
                >
                  <option value="living-room">Living Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="bathroom">Bathroom</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="exterior">Exterior</option>
                  <option value="other">Other</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Tips:</strong> Upload high-quality photos from multiple rooms.
          Set one as your cover photo. Use natural lighting and avoid clutter.
        </p>
      </div>
    </div>
  );
}
```

---

## 5. WebSocket & Real-time Updates

### 5.1 WebSocket Service

**File: `/services/websocket.ts`**

```typescript
import io, { Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private token: string | null = null;

  connect() {
    if (this.socket?.connected) return;

    this.token = localStorage.getItem('authToken');

    this.socket = io(
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      {
        auth: {
          token: this.token,
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      }
    );

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    // Business events
    this.socket.on('new-booking', (booking) => {
      this.emit('booking:new', booking);
    });

    this.socket.on('booking-cancelled', (booking) => {
      this.emit('booking:cancelled', booking);
    });

    this.socket.on('new-message', (message) => {
      this.emit('message:new', message);
    });

    this.socket.on('conversation-update', (conversation) => {
      this.emit('conversation:update', conversation);
    });

    this.socket.on('new-review', (review) => {
      this.emit('review:new', review);
    });
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.socket) {
      this.connect();
    }
    this.socket?.on(event, callback);
  }

  emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const wsService = new WebSocketService();
```

---

## 6. Error Handling & Loading States

### 6.1 Custom Error Boundary

```typescript
'use client';

import { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="text-lg font-semibold text-red-900">Error occurred</h2>
            <p className="text-red-700 mt-2">{this.state.error?.message}</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

---

## 7. Testing Strategy

### 7.1 Unit Test Example

```typescript
// __tests__/Step1Basic.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Step1Basic from '@/components/PropertySubmission/Step1Basic';
import { Step1Schema } from '@/lib/validation/propertySubmissionSchema';

describe('Step1Basic', () => {
  it('validates property name', async () => {
    const mockOnChange = jest.fn();

    render(
      <Step1Basic
        data={{}}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByLabelText('Property Name');
    fireEvent.change(input, { target: { value: 'My Awesome Property' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('shows validation error for short name', async () => {
    const { container } = render(
      <Step1Basic
        data={{ propertyName: 'ab' }}
        onChange={() => {}}
      />
    );

    const form = container.querySelector('form');
    fireEvent.submit(form!);

    await expect(
      screen.findByText(/must be at least 3 characters/)
    ).resolves.toBeInTheDocument();
  });
});
```

---

## 8. Performance Optimizations

### 8.1 Image Optimization

```typescript
// lib/utils/imageOptimizer.ts
export async function optimizeImage(file: File): Promise<Blob> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const img = await new Promise<HTMLImageElement>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });

  // Resize
  canvas.width = Math.min(img.width, 2000);
  canvas.height = (canvas.width / img.width) * img.height;

  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/webp', 0.85);
  });
}
```

---

## 9. Deployment

### 9.1 Environment Variables

```
# .env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_SOCKET_URL=https://api.yourdomain.com
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://yourdomain.com
```

### 9.2 Build & Deploy

```bash
# Build
npm run build

# Deploy to Vercel
vercel deploy --prod

# Or Docker
docker build -t dashboard .
docker run -p 3000:3000 dashboard
```

---

## 10. Monitoring & Analytics

### 10.1 Error Tracking

```typescript
import { captureException } from '@sentry/nextjs';

try {
  // Your code
} catch (error) {
  captureException(error);
}
```

---

Bu rehber, Property Owner Dashboard'ın tam olarak uygulanması için gereken tüm bilgileri sağlamaktadır. Her bölümü adım adım takip ederek projeyi tamamlayabilirsiniz.
