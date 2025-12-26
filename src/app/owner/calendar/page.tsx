'use client';

import React, { useState } from 'react';
import { useProperties, usePropertyCalendar, useBlockDates } from '@/hooks/useDashboardHooks';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Lock,
  Unlock,
  X,
  Check,
  AlertCircle,
  Menu
} from 'lucide-react';

// Calendar Day Component
interface CalendarDayProps {
  day: Date | null;
  isCurrentMonth: boolean;
  isToday: boolean;
  isBooked: boolean;
  isBlocked: boolean;
  bookingInfo?: {
    guestName: string;
    checkIn: boolean;
    checkOut: boolean;
  };
  onClick: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isCurrentMonth,
  isToday,
  isBooked,
  isBlocked,
  bookingInfo,
  onClick,
}) => {
  if (!day) {
    return <div className="aspect-square p-2"></div>;
  }

  const dayNumber = day.getDate();

  return (
    <button
      onClick={onClick}
      className={`aspect-square p-1 sm:p-2 border transition-all hover:shadow-md touch-manipulation ${
        !isCurrentMonth
          ? 'bg-white/5 text-gray-400 border-gray-100'
          : isBlocked
          ? 'bg-red-50 border-red-200 text-red-700'
          : isBooked
          ? 'bg-blue-50 border-blue-200 text-blue-700'
          : isToday
          ? 'bg-green-50 border-green-400 text-green-700 font-semibold'
          : 'bg-white/5 border-gray-200 text-white hover:border-blue-300'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-1">
          <span className={`text-xs sm:text-sm ${isToday ? 'font-bold' : ''}`}>{dayNumber}</span>
          {isBlocked && <Lock className="w-2 h-2 sm:w-3 sm:h-3" />}
        </div>
        {bookingInfo && (
          <div className="flex-1 flex flex-col justify-end">
            <div className="text-[10px] sm:text-xs truncate bg-blue-600 text-white px-0.5 sm:px-1 py-0.5 rounded">
              {bookingInfo.guestName}
            </div>
            {(bookingInfo.checkIn || bookingInfo.checkOut) && (
              <div className="text-[8px] sm:text-[10px] text-blue-600 mt-0.5">
                {bookingInfo.checkIn && 'Giriş'}
                {bookingInfo.checkOut && 'Çıkış'}
              </div>
            )}
          </div>
        )}
      </div>
    </button>
  );
};

// Property Selector Component
interface PropertySelectorProps {
  properties: any[];
  selectedPropertyId: string;
  onPropertyChange: (propertyId: string) => void;
}

const PropertySelector: React.FC<PropertySelectorProps> = ({
  properties,
  selectedPropertyId,
  onPropertyChange,
}) => {
  return (
    <div className="bg-white/5 border border-gray-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
      <label className="block text-sm font-medium text-gray-200 mb-2">Mülk Seçin</label>
      <select
        value={selectedPropertyId}
        onChange={(e) => onPropertyChange(e.target.value)}
        className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all touch-manipulation"
      >
        <option value="">Tüm Mülkler</option>
        {properties.map((property) => (
          <option key={property.id} value={property.id}>
            {property.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Quick Edit Modal Component
interface QuickEditModalProps {
  isOpen: boolean;
  date: Date | null;
  onClose: () => void;
  onSave: (data: { startDate: Date; endDate: Date; reason: string; action: 'block' | 'unblock' }) => void;
}

const QuickEditModal: React.FC<QuickEditModalProps> = ({ isOpen, date, onClose, onSave }) => {
  const [action, setAction] = useState<'block' | 'unblock'>('block');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  React.useEffect(() => {
    if (date) {
      const dateStr = date.toISOString().split('T')[0];
      setStartDate(dateStr);
      setEndDate(dateStr);
    }
  }, [date]);

  if (!isOpen || !date) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
      action,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white/5 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white/5 z-10">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Müsaitlik Düzenle</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">İşlem</label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="action"
                  value="block"
                  checked={action === 'block'}
                  onChange={(e) => setAction(e.target.value as 'block')}
                  className="sr-only"
                />
                <div
                  className={`p-3 sm:p-4 border-2 rounded-lg text-center transition-all touch-manipulation ${
                    action === 'block'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
                  <div className="font-medium text-sm sm:text-base">Tarihleri Blokla</div>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="action"
                  value="unblock"
                  checked={action === 'unblock'}
                  onChange={(e) => setAction(e.target.value as 'unblock')}
                  className="sr-only"
                />
                <div
                  className={`p-3 sm:p-4 border-2 rounded-lg text-center transition-all touch-manipulation ${
                    action === 'unblock'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Unlock className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
                  <div className="font-medium text-sm sm:text-base">Blokajı Kaldır</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Başlangıç Tarihi</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Bitiş Tarihi</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation"
              required
            />
          </div>

          {action === 'block' && (
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Sebep (İsteğe Bağlı)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation resize-none"
                placeholder="Örn: Bakım, Kişisel kullanım"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-white/5 font-medium transition-colors touch-manipulation"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors touch-manipulation"
            >
              Değişiklikleri Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Legend Component
const CalendarLegend: React.FC = () => {
  return (
    <div className="bg-white/5 border border-gray-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
      <h4 className="text-sm font-semibold text-white mb-3">Açıklama</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-50 border-2 border-blue-200 rounded flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-gray-200">Rezerve</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-50 border-2 border-red-200 rounded flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-gray-200">Blokeli</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-50 border-2 border-green-400 rounded flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-gray-200">Bugün</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/5 border-2 border-gray-200 rounded flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-gray-200">Müsait</span>
        </div>
      </div>
    </div>
  );
};

// Main Calendar Component
const CalendarPage: React.FC = () => {
  const { data: properties, isLoading: propertiesLoading } = useProperties();
  const { mutate: blockDates } = useBlockDates('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock properties data
  const mockProperties = [
    { id: '1', name: 'Beachfront Villa' },
    { id: '2', name: 'Mountain Cabin' },
    { id: '3', name: 'City Apartment' },
  ];

  const displayProperties = properties || mockProperties;

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push(prevMonthDay);
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    // Add empty cells to complete the last week
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  // Turkish month names
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const monthName = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (data: any) => {
    console.log('Save edit:', data);
    // In a real app, call the blockDates mutation here
  };

  // Mock booking data
  const mockBookings: Record<string, any> = {
    '2025-12-25': { guestName: 'Sarah J.', checkIn: true, checkOut: false },
    '2025-12-26': { guestName: 'Sarah J.', checkIn: false, checkOut: false },
    '2025-12-27': { guestName: 'Sarah J.', checkIn: false, checkOut: true },
  };

  const mockBlockedDates = ['2025-12-15', '2025-12-16', '2025-12-17'];

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  if (propertiesLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 text-white">
          Takvim
        </h1>
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-200 rounded-xl"></div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 text-white">
        Takvim
      </h1>
      <PropertySelector
        properties={displayProperties}
        selectedPropertyId={selectedPropertyId}
        onPropertyChange={setSelectedPropertyId}
      />

      <CalendarLegend />

      <div className="bg-white/5 border border-gray-200 rounded-xl overflow-hidden">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{monthName}</h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">Mülk müsaitliğinizi yönetin</p>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={goToPreviousMonth}
              className="p-2 border border-gray-300 rounded-lg hover:bg-white/5 transition-colors touch-manipulation"
              aria-label="Önceki ay"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-white/5 transition-colors font-medium text-xs sm:text-sm touch-manipulation"
            >
              Bugün
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 border border-gray-300 rounded-lg hover:bg-white/5 transition-colors touch-manipulation"
              aria-label="Sonraki ay"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-3 sm:p-6 overflow-x-auto">
          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 min-w-[280px]">
            {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'].map((day) => (
              <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-300 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 min-w-[280px]">
            {days.map((day, index) => (
              <CalendarDay
                key={index}
                day={day}
                isCurrentMonth={day ? isCurrentMonth(day) : false}
                isToday={day ? isToday(day) : false}
                isBooked={day ? !!mockBookings[getDateKey(day)] : false}
                isBlocked={day ? mockBlockedDates.includes(getDateKey(day)) : false}
                bookingInfo={day ? mockBookings[getDateKey(day)] : undefined}
                onClick={() => day && handleDayClick(day)}
              />
            ))}
          </div>
        </div>
      </div>

      <QuickEditModal
        isOpen={isModalOpen}
        date={selectedDate}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default CalendarPage;
