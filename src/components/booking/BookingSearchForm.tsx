/**
 * Booking.com Style Search Form - Premium Design
 * Multi-tab search interface with date pickers, guest selector
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hotel,
  Plane,
  Car,
  Compass,
  Bus,
  MapPin,
  Calendar,
  Users,
  Search,
  Plus,
  Minus,
  ChevronDown,
  Home
} from 'lucide-react';
import { useRouter } from 'next/router';

type SearchTab = 'hotels' | 'flights' | 'cars' | 'tours' | 'transfers' | 'rentals';

interface SearchFormProps {
  defaultTab?: SearchTab;
  onSearch?: (data: any) => void;
}

export const BookingSearchForm: React.FC<SearchFormProps> = ({
  defaultTab = 'hotels',
  onSearch
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SearchTab>(defaultTab);
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1
  });

  const tabs = [
    { id: 'hotels' as SearchTab, label: 'Oteller', icon: Hotel },
    { id: 'tours' as SearchTab, label: 'Turlar', icon: Compass },
    { id: 'cars' as SearchTab, label: 'Araç Kiralama', icon: Car },
    { id: 'transfers' as SearchTab, label: 'Transfer', icon: Bus },
    { id: 'rentals' as SearchTab, label: 'Konaklama', icon: Home },
  ];

  const handleSearch = () => {
    const searchData = {
      type: activeTab,
      destination,
      checkIn,
      checkOut,
      guests
    };

    if (onSearch) {
      onSearch(searchData);
    } else {
      // Default navigation
      switch (activeTab) {
        case 'hotels':
          router.push(`/hotels?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}`);
          break;
        case 'tours':
          router.push(`/tours?location=${destination}`);
          break;
        case 'cars':
          router.push(`/car-rentals?location=${destination}`);
          break;
        case 'transfers':
          router.push(`/transfers?from=${destination}`);
          break;
        case 'rentals':
          router.push(`/rentals?location=${destination}`);
          break;
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-800/30 backdrop-blur-sm p-1 rounded-t-lg overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center gap-2 px-6 py-3 rounded-t-md font-medium transition-all whitespace-nowrap
                ${isActive
                  ? 'bg-white text-ailydian-primary'
                  : 'text-white hover:bg-white/10'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-t-md -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-b-lg rounded-tr-lg shadow-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Destination */}
          <div className="md:col-span-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {activeTab === 'hotels' ? 'Nereye gidiyorsunuz?' :
               activeTab === 'tours' ? 'Hangi şehir?' :
               activeTab === 'cars' ? 'Nereden alacaksınız?' :
               activeTab === 'transfers' ? 'Nereden?' : 'Konum'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Şehir, otel, bölge..."
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ailydian-primary focus:ring-2 focus:ring-ailydian-primary/20 outline-none transition-all text-gray-900 font-medium"
              />
            </div>
          </div>

          {/* Check-in Date */}
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Giriş Tarihi
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ailydian-primary focus:ring-2 focus:ring-ailydian-primary/20 outline-none transition-all text-gray-900 font-medium"
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Çıkış Tarihi
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-ailydian-primary focus:ring-2 focus:ring-ailydian-primary/20 outline-none transition-all text-gray-900 font-medium"
              />
            </div>
          </div>

          {/* Guests Selector */}
          <div className="md:col-span-2 relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Misafirler
            </label>
            <button
              onClick={() => setShowGuestPicker(!showGuestPicker)}
              className="w-full flex items-center justify-between px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-ailydian-primary focus:border-ailydian-primary focus:ring-2 focus:ring-ailydian-primary/20 outline-none transition-all text-gray-900 font-medium"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span>{guests.adults + guests.children} kişi</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showGuestPicker ? 'rotate-180' : ''}`} />
            </button>

            {/* Guest Picker Dropdown */}
            <AnimatePresence>
              {showGuestPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl p-4 z-50"
                >
                  {/* Adults */}
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-semibold text-gray-900">Yetişkinler</div>
                      <div className="text-xs text-gray-500">18 yaş ve üzeri</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests({ ...guests, adults: Math.max(1, guests.adults - 1) })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-ailydian-primary text-ailydian-primary rounded-full hover:bg-ailydian-primary hover:text-white transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{guests.adults}</span>
                      <button
                        onClick={() => setGuests({ ...guests, adults: guests.adults + 1 })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-ailydian-primary text-ailydian-primary rounded-full hover:bg-ailydian-primary hover:text-white transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-semibold text-gray-900">Çocuklar</div>
                      <div className="text-xs text-gray-500">0-17 yaş</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests({ ...guests, children: Math.max(0, guests.children - 1) })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-ailydian-primary text-ailydian-primary rounded-full hover:bg-ailydian-primary hover:text-white transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{guests.children}</span>
                      <button
                        onClick={() => setGuests({ ...guests, children: guests.children + 1 })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-ailydian-primary text-ailydian-primary rounded-full hover:bg-ailydian-primary hover:text-white transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-semibold text-gray-900">Odalar</div>
                      <div className="text-xs text-gray-500">Kaç oda?</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests({ ...guests, rooms: Math.max(1, guests.rooms - 1) })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-ailydian-primary text-ailydian-primary rounded-full hover:bg-ailydian-primary hover:text-white transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{guests.rooms}</span>
                      <button
                        onClick={() => setGuests({ ...guests, rooms: guests.rooms + 1 })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-ailydian-primary text-ailydian-primary rounded-full hover:bg-ailydian-primary hover:text-white transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowGuestPicker(false)}
                    className="w-full mt-2 px-4 py-2 bg-ailydian-primary text-white rounded-lg font-semibold hover:bg-ailydian-dark transition-all"
                  >
                    Tamam
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
          >
            <Search className="w-6 h-6" />
            <span>Ara</span>
          </motion.button>
        </div>

        {/* Quick Tips */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500">Popüler aramalar:</span>
          {['İstanbul', 'Antalya', 'Kapadokya', 'Bodrum'].map((city) => (
            <button
              key={city}
              onClick={() => setDestination(city)}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
