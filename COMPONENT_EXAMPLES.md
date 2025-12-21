# Property Owner Dashboard - Component Örnekleri ve Best Practices

## 1. Reusable UI Components Kütüphanesi

### 1.1 Stat Card Component

```typescript
// components/dashboard/Shared/StatCard.tsx
import { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  isLoading?: boolean;
}

export default function StatCard({
  title,
  value,
  unit,
  icon,
  change,
  changeLabel,
  trend = 'neutral',
  isLoading,
}: StatCardProps) {
  if (isLoading) {
    return <div className="h-24 bg-gray-200 rounded-lg animate-pulse" />;
  }

  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  }[trend];

  const trendBgColor = {
    up: 'bg-green-50',
    down: 'bg-red-50',
    neutral: 'bg-gray-50',
  }[trend];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">
            {value}
            {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
          </p>
          {change !== undefined && (
            <p className={`text-sm font-medium mt-2 ${trendColor}`}>
              {trend === 'up' && <ArrowUp className="inline mr-1 w-4 h-4" />}
              {trend === 'down' && <ArrowDown className="inline mr-1 w-4 h-4" />}
              {change > 0 ? '+' : ''}{change}% {changeLabel || 'from last month'}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${trendBgColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
```

### 1.2 Filter Bar Component

```typescript
// components/dashboard/Shared/FilterBar.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterBarProps {
  onSearch?: (query: string) => void;
  filters: Record<string, FilterOption[]>;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterName: string, value: string) => void;
  onClearFilters: () => void;
}

export default function FilterBar({
  onSearch,
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      {/* Search */}
      {onSearch && (
        <Input
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1"
        />
      )}

      {/* Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(selectedFilters).map(([key, values]) =>
            values.map((value) => (
              <div
                key={`${key}-${value}`}
                className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center gap-2"
              >
                <span>{value}</span>
                <button
                  onClick={() => onFilterChange(key, value)}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([filterName, options]) => (
          <div key={filterName} className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {filterName}
              {selectedFilters[filterName]?.length > 0 && (
                <span className="ml-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedFilters[filterName].length}
                </span>
              )}
            </Button>

            {isOpen && (
              <div className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-48">
                {options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters[filterName]?.includes(
                        option.value
                      )}
                      onChange={() =>
                        onFilterChange(filterName, option.value)
                      }
                      className="mr-3"
                    />
                    <span className="flex-1">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-gray-500 text-sm">
                        ({option.count})
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 1.3 Modal Component with Form

```typescript
// components/dashboard/Shared/Modal.tsx
import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  confirmText?: string;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export default function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  isLoading = false,
  size = 'md',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-lg ${sizeClasses[size]}`}>
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            {description && (
              <p className="text-gray-500 text-sm mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">{children}</div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          {onConfirm && (
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Loading...' : confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 2. Complex Components

### 2.1 Booking Calendar Component

```typescript
// components/dashboard/Calendar/BookingCalendar.tsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarBooking } from '@/types/dashboard.types';

interface BookingCalendarProps {
  bookings: CalendarBooking[];
  onDateSelect?: (date: Date) => void;
  highlightRange?: { start: Date; end: Date };
}

export default function BookingCalendar({
  bookings,
  onDateSelect,
  highlightRange,
}: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateBooked = (date: Date) => {
    return bookings.some(
      (booking) =>
        date >= new Date(booking.checkIn) &&
        date <= new Date(booking.checkOut)
    );
  };

  const getBookingForDate = (date: Date) => {
    return bookings.find(
      (booking) =>
        date >= new Date(booking.checkIn) &&
        date <= new Date(booking.checkOut)
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          {currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
              )
            }
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
              )
            }
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} />;
          }

          const isBooked = isDateBooked(date);
          const booking = getBookingForDate(date);

          return (
            <div
              key={date.toISOString()}
              onClick={() => onDateSelect?.(date)}
              className={`p-3 rounded-lg text-center cursor-pointer transition ${
                isBooked
                  ? `bg-blue-100 text-blue-900 hover:bg-blue-200`
                  : `bg-gray-50 hover:bg-gray-100`
              }`}
              title={booking ? `${booking.guestName} - ${booking.status}` : ''}
            >
              <div className="font-semibold">{date.getDate()}</div>
              {isBooked && (
                <div className="text-xs mt-1 truncate">
                  {booking?.guestName}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 rounded" />
          <span className="text-sm text-gray-600">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded" />
          <span className="text-sm text-gray-600">Available</span>
        </div>
      </div>
    </div>
  );
}
```

### 2.2 Analytics Chart Component

```typescript
// components/dashboard/Analytics/RevenueChart.tsx
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartDataPoint } from '@/types/dashboard.types';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface RevenueChartProps {
  data: ChartDataPoint[];
  title?: string;
  metric?: 'revenue' | 'bookings' | 'occupancy';
  timeframe?: '7d' | '30d' | '90d' | 'year';
  onTimeframeChange?: (timeframe: string) => void;
  isLoading?: boolean;
}

export default function RevenueChart({
  data,
  title = 'Revenue Trend',
  metric = 'revenue',
  timeframe = '30d',
  onTimeframeChange,
  isLoading,
}: RevenueChartProps) {
  const [chartType, setChartType] = useState<'line' | 'area'>('line');

  if (isLoading) {
    return <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />;
  }

  const formatters: Record<string, (value: any) => string> = {
    revenue: (value) => `$${(value / 1000).toFixed(1)}K`,
    bookings: (value) => value.toString(),
    occupancy: (value) => `${value}%`,
  };

  const ChartComponent = chartType === 'line' ? LineChart : AreaChart;
  const DataComponent = chartType === 'line' ? Line : Area;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2">
          {['7d', '30d', '90d', 'year'].map((tf) => (
            <Button
              key={tf}
              size="sm"
              variant={timeframe === tf ? 'default' : 'outline'}
              onClick={() => onTimeframeChange?.(tf)}
            >
              {tf.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="#ccc"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#ccc"
            style={{ fontSize: '12px' }}
            tickFormatter={formatters[metric]}
          />
          <Tooltip
            formatter={(value) => [formatters[metric](value), 'Value']}
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString()
            }
          />
          <Legend />
          <DataComponent
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            fill="#93c5fd"
            isAnimationActive
          />
        </ChartComponent>
      </ResponsiveContainer>

      {/* Chart Type Toggle */}
      <div className="mt-4 flex gap-2">
        {['line', 'area'].map((type) => (
          <Button
            key={type}
            size="sm"
            variant={chartType === type ? 'default' : 'outline'}
            onClick={() => setChartType(type as 'line' | 'area')}
            className="capitalize"
          >
            {type} Chart
          </Button>
        ))}
      </div>
    </div>
  );
}
```

---

## 3. Form Components

### 3.1 Dynamic Form Builder

```typescript
// components/Forms/DynamicForm.tsx
import { ReactNode } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  helpText?: string;
}

interface DynamicFormProps {
  fields: FormField[];
  schema: ZodSchema;
  defaultValues?: Record<string, any>;
  onSubmit: (data: any) => Promise<void> | void;
  isLoading?: boolean;
  submitLabel?: string;
}

export default function DynamicForm({
  fields,
  schema,
  defaultValues = {},
  onSubmit,
  isLoading = false,
  submitLabel = 'Submit',
}: DynamicFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>

          <Controller
            name={field.name}
            control={control}
            render={({ field: { value, onChange } }) => {
              switch (field.type) {
                case 'textarea':
                  return (
                    <textarea
                      id={field.name}
                      value={value}
                      onChange={onChange}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  );

                case 'select':
                  return (
                    <select
                      id={field.name}
                      value={value}
                      onChange={onChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select {field.label.toLowerCase()}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  );

                case 'checkbox':
                  return (
                    <input
                      id={field.name}
                      type="checkbox"
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                      className="w-4 h-4"
                    />
                  );

                default:
                  return (
                    <Input
                      id={field.name}
                      type={field.type}
                      value={value}
                      onChange={onChange}
                      placeholder={field.placeholder}
                      minLength={field.minLength}
                      maxLength={field.maxLength}
                    />
                  );
              }
            }}
          />

          {field.helpText && (
            <p className="text-sm text-gray-500 mt-1">{field.helpText}</p>
          )}

          {errors[field.name] && (
            <p className="text-sm text-red-500 mt-1">
              {errors[field.name]?.message as ReactNode}
            </p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? 'Loading...' : submitLabel}
      </Button>
    </form>
  );
}
```

---

## 4. Data Table Component

### 4.1 Advanced Data Table

```typescript
// components/dashboard/Shared/DataTable.tsx
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  pageSize?: number;
  isLoading?: boolean;
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  pageSize = 10,
  isLoading,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize },
    },
  });

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer select-none"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-6 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## 5. Custom Hooks

### 5.1 useDebounce Hook

```typescript
// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

### 5.2 usePagination Hook

```typescript
// hooks/usePagination.ts
import { useState, useCallback } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  pageSize?: number;
  total?: number;
}

export function usePagination({
  initialPage = 1,
  pageSize = 10,
  total = 0,
}: UsePaginationProps) {
  const [page, setPage] = useState(initialPage);

  const totalPages = Math.ceil(total / pageSize);

  const goToPage = useCallback((p: number) => {
    const bounded = Math.max(1, Math.min(p, totalPages));
    setPage(bounded);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(page - 1);
  }, [page, goToPage]);

  return {
    page,
    pageSize,
    total,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  };
}
```

---

## 6. Best Practices

### 6.1 Error Handling Pattern

```typescript
// Consistent error handling across components
const { mutate: updateBooking, isPending, error } = useUpdateBooking();

const handleUpdate = async (updates: Partial<Booking>) => {
  try {
    await updateBooking(updates);
    toast({
      title: 'Success',
      description: 'Booking updated successfully',
    });
  } catch (err: any) {
    toast({
      title: 'Error',
      description: err.message || 'Failed to update booking',
      variant: 'destructive',
    });
    // Log to error tracking service
    captureException(err);
  }
};
```

### 6.2 Loading State Pattern

```typescript
// Consistent loading patterns
{
  isLoading ? (
    <Skeleton className="h-96" />
  ) : error ? (
    <ErrorFallback error={error} />
  ) : data ? (
    <Content data={data} />
  ) : null
}
```

### 6.3 Optimistic Updates Pattern

```typescript
// Optimistic UI updates
const { mutate: confirmBooking } = useMutation({
  mutationFn: (bookingId: string) => BookingAPI.confirmBooking(bookingId),
  onMutate: async (bookingId) => {
    // Optimistically update UI
    await queryClient.cancelQueries({ queryKey: ['bookings'] });
    const previousBookings = queryClient.getQueryData(['bookings']);

    queryClient.setQueryData(['bookings'], (old: Booking[]) =>
      old.map((b) =>
        b.id === bookingId ? { ...b, status: 'confirmed' } : b
      )
    );

    return { previousBookings };
  },
  onError: (_err, _bookingId, context) => {
    // Rollback on error
    queryClient.setQueryData(['bookings'], context?.previousBookings);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
  },
});
```

Bu component örnekleri ve best practices'ler, Property Owner Dashboard'ı oluştururken takip edilmesi gereken kalite standartlarını belirtir.
