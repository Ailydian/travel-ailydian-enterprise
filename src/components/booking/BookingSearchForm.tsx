/**
 * Premium Style Search Form - Premium Design
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
  Home } from
'lucide-react';
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
  { id: 'rentals' as SearchTab, label: 'Konaklama', icon: Home }];


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
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Premium Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-lydian-primary via-lydian-secondary to-pink-600 opacity-95 rounded-lg"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        style={{
          backgroundSize: '200% 200%'
        }} />


      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 rounded-lg"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />


      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Tabs - Premium Animated */}
        <div className="flex gap-1 bg-lydian-glass-dark-medium backdrop-blur-sm p-1 rounded-t-lg overflow-x-auto scrollbar-hide">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-t-md font-bold transition-all whitespace-nowrap min-w-[70px] sm:min-w-0
                  ${isActive ?
                'bg-white/5 text-lydian-primary shadow-lg' :
                'bg-white/90 text-gray-200 hover:bg-white/5 hover:text-white'}
                `
                }>

                <motion.div
                  animate={isActive ? {
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 3 }}>

                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
                <span className="text-xs sm:text-sm font-semibold">{tab.label}</span>
                {isActive &&
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-md -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }} />

                }
                {isActive &&
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-lydian-primary via-lydian-secondary to-pink-600"
                  layoutId="activeTabUnderline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }} />

                }
              </motion.button>);

          })}
        </div>

      {/* Search Form */}
      <div className="bg-lydian-glass-dark rounded-b-lg rounded-tr-lg shadow-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Destination */}
          <div className="md:col-span-4">
            <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
              {activeTab === 'hotels' ? 'Nereye gidiyorsunuz?' :
                activeTab === 'tours' ? 'Hangi şehir?' :
                activeTab === 'cars' ? 'Nereden alacaksınız?' :
                activeTab === 'transfers' ? 'Nereden?' : 'Konum'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />
              <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Şehir, otel, bölge..."
                  className="w-full pl-11 pr-4 py-3 border-2 border-lydian-border-light/10 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-lydian-primary/20 outline-none transition-all text-lydian-text-inverse font-medium" />

            </div>
          </div>

          {/* Check-in Date */}
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
              Giriş Tarihi
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />
              <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-lydian-border-light/10 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-lydian-primary/20 outline-none transition-all text-lydian-text-inverse font-medium" />

            </div>
          </div>

          {/* Check-out Date */}
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
              Çıkış Tarihi
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />
              <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-lydian-border-light/10 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-lydian-primary/20 outline-none transition-all text-lydian-text-inverse font-medium" />

            </div>
          </div>

          {/* Guests Selector */}
          <div className="md:col-span-2 relative">
            <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
              Misafirler
            </label>
            <button
                onClick={() => setShowGuestPicker(!showGuestPicker)}
                className="w-full flex items-center justify-between px-4 py-3 border-2 border-lydian-border-light/10 rounded-lg hover:border-lydian-primary focus:border-lydian-primary focus:ring-2 focus:ring-lydian-primary/20 outline-none transition-all text-lydian-text-inverse font-medium">

              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-lydian-text-muted" />
                <span>{guests.adults + guests.children} kişi</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-lydian-text-muted transition-transform ${showGuestPicker ? 'rotate-180' : ''}`} />
            </button>

            {/* Guest Picker Dropdown */}
            <AnimatePresence>
              {showGuestPicker &&
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-lydian-glass-dark border-2 border-lydian-border-light/10 rounded-lg shadow-xl p-4 z-50">

                  {/* Adults */}
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-semibold text-lydian-text-inverse">Yetişkinler</div>
                      <div className="text-xs text-lydian-text-muted">18 yaş ve üzeri</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests({ ...guests, adults: Math.max(1, guests.adults - 1) })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-lydian-primary text-lydian-primary rounded-full hover:bg-lydian-primary hover:text-lydian-text-inverse transition-all">

                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{guests.adults}</span>
                      <button
                        onClick={() => setGuests({ ...guests, adults: guests.adults + 1 })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-lydian-primary text-lydian-primary rounded-full hover:bg-lydian-primary hover:text-lydian-text-inverse transition-all">

                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-semibold text-lydian-text-inverse">Çocuklar</div>
                      <div className="text-xs text-lydian-text-muted">0-17 yaş</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests({ ...guests, children: Math.max(0, guests.children - 1) })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-lydian-primary text-lydian-primary rounded-full hover:bg-lydian-primary hover:text-lydian-text-inverse transition-all">

                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{guests.children}</span>
                      <button
                        onClick={() => setGuests({ ...guests, children: guests.children + 1 })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-lydian-primary text-lydian-primary rounded-full hover:bg-lydian-primary hover:text-lydian-text-inverse transition-all">

                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-semibold text-lydian-text-inverse">Odalar</div>
                      <div className="text-xs text-lydian-text-muted">Kaç oda?</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests({ ...guests, rooms: Math.max(1, guests.rooms - 1) })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-lydian-primary text-lydian-primary rounded-full hover:bg-lydian-primary hover:text-lydian-text-inverse transition-all">

                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{guests.rooms}</span>
                      <button
                        onClick={() => setGuests({ ...guests, rooms: guests.rooms + 1 })}
                        className="w-8 h-8 flex items-center justify-center border-2 border-lydian-primary text-lydian-primary rounded-full hover:bg-lydian-primary hover:text-lydian-text-inverse transition-all">

                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowGuestPicker(false)}
                    className="w-full mt-2 px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg font-semibold hover:bg-lydian-dark transition-all">

                    Tamam
                  </button>
                </motion.div>
                }
            </AnimatePresence>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6">
          <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">

            <Search className="w-6 h-6" />
            <span>Ara</span>
          </motion.button>
        </div>

        {/* Quick Tips */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-lydian-text-muted">Popüler aramalar:</span>
          {['İstanbul', 'Antalya', 'Kapadokya', 'Bodrum'].map((city) =>
            <button
              key={city}
              onClick={() => setDestination(city)}
              className="text-xs px-3 py-1 bg-lydian-glass-dark-medium hover:bg-lydian-bg-active text-lydian-text-muted rounded-full transition-colors">

              {city}
            </button>
            )}
        </div>
      </div>
      </div>
    </div>);

};