'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import BookingForm from '../../components/booking/BookingForm';
import { turkeyDestinations, turkeyTours } from '../../data/turkeyTourismData';
import { turkeyHotels } from '../../data/turkeyHotelsData';
import '../../styles/leaflet.css';

// Dynamic import for client-side only rendering
const InteractiveMap = dynamic(() => import('../../components/maps/InteractiveMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-gray-500">Harita yükleniyor...</div>
    </div>
  )
});

interface DemoItem {
  id: string;
  name: { tr: string; en: string; de: string; ru: string; } | string;
  type: 'destination' | 'tour' | 'hotel';
  image: string;
  description: string;
  price?: number;
  rating: number;
  location?: { lat: number; lng: number; };
  originalData: any;
}

export default function DemoPage() {
  const [selectedItem, setSelectedItem] = useState<DemoItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'destination' | 'tour' | 'hotel'>('all');

  // Demo verileri hazırlama
  const demoItems: DemoItem[] = [
    // Destinasyonlar
    ...turkeyDestinations.map(dest => ({
      id: dest.id,
      name: dest.name,
      type: 'destination' as const,
      image: dest.images[0],
      description: typeof dest.description.tr === 'string' ? dest.description.tr : 'Destinasyon açıklaması',
      rating: dest.rating,
      location: dest.coordinates,
      originalData: dest
    })),
    // Turlar
    ...turkeyTours.map(tour => ({
      id: tour.id,
      name: tour.name,
      type: 'tour' as const,
      image: tour.images[0],
      description: typeof tour.description.tr === 'string' ? tour.description.tr : 'Tur açıklaması',
      price: tour.price.adult,
      rating: tour.rating,
      originalData: tour
    })),
    // Oteller
    ...turkeyHotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      type: 'hotel' as const,
      image: hotel.images[0],
      description: typeof hotel.description.tr === 'string' ? hotel.description.tr : 'Otel açıklaması',
      price: hotel.price.min,
      rating: hotel.rating,
      location: hotel.location.coordinates,
      originalData: hotel
    }))
  ];

  const filteredItems = selectedCategory === 'all' 
    ? demoItems 
    : demoItems.filter(item => item.type === selectedCategory);

  const getLocationData = () => {
    return filteredItems
      .filter(item => item.location)
      .map(item => ({
        lat: item.location!.lat,
        lng: item.location!.lng,
        name: typeof item.name === 'string' ? item.name : item.name.tr,
        type: (item.type === 'destination' ? 'attraction' : item.type) as 'custom' | 'hotel' | 'restaurant' | 'attraction' | 'tour' | 'pickup',
        address: `${typeof item.name === 'string' ? item.name : item.name.tr}`
      }));
  };

  const handleItemClick = (item: DemoItem) => {
    setSelectedItem(item);
    if (item.type === 'tour' || item.type === 'hotel') {
      setBookingModalOpen(true);
    }
  };

  const handleBookingClose = () => {
    setBookingModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Travel Ailydian Demo
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              İnteraktif Harita ve Rezervasyon Sistemi
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtre Butonları */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'all', label: '🌍 Tümü', count: demoItems.length },
              { id: 'destination', label: '📍 Destinasyonlar', count: turkeyDestinations.length },
              { id: 'tour', label: '🎒 Turlar', count: turkeyTours.length },
              { id: 'hotel', label: '🏨 Oteller', count: turkeyHotels.length }
            ].map(({ id, label, count }) => (
              <button
                key={id}
                onClick={() => setSelectedCategory(id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Panel - Harita */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  🗺️ İnteraktif Harita
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Lokasyonları görmek için haritayı keşfedin
                </p>
              </div>
              <div className="p-4">
                <InteractiveMap
                  height="500px"
                  locations={getLocationData()}
                  center={[39.9334, 32.8597]} // Türkiye merkezi
                  zoom={6}
                  allowCustomMarkers={true}
                  showPickupOption={false}
                  className="rounded-lg overflow-hidden"
                />
              </div>
            </div>

            {/* Özellikler Kartı */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">🚀 Sistem Özellikleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h4 className="font-medium">Gerçek Zamanlı Harita</h4>
                    <p className="text-sm text-gray-600">OpenStreetMap ile interaktif lokasyon gösterimi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    🚐
                  </div>
                  <div>
                    <h4 className="font-medium">Özel Pickup Lokasyonu</h4>
                    <p className="text-sm text-gray-600">Müşteriler haritadan alınacak noktayı seçebilir</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    💰
                  </div>
                  <div>
                    <h4 className="font-medium">Dinamik Fiyatlandırma</h4>
                    <p className="text-sm text-gray-600">Talep, sezon ve grub büyüklüğüne göre otomatik fiyatlama</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    🎫
                  </div>
                  <div>
                    <h4 className="font-medium">Akıllı Rezervasyon</h4>
                    <p className="text-sm text-gray-600">3 adımda kolay rezervasyon ve ödeme sistemi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Panel - İçerik Listesi */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  📋 {selectedCategory === 'all' ? 'Tüm İçerikler' : 
                      selectedCategory === 'destination' ? 'Destinasyonlar' :
                      selectedCategory === 'tour' ? 'Turlar' : 'Oteller'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredItems.length} sonuç bulundu
                </p>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleItemClick(item)}
                    >
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-2xl">
                          {item.type === 'destination' ? '🏛️' :
                           item.type === 'tour' ? '🎒' : '🏨'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {typeof item.name === 'string' ? item.name : item.name.tr}
                          </h3>
                          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                            <span className="text-sm text-yellow-600 flex items-center gap-1">
                              ⭐ {item.rating}
                            </span>
                            {item.type !== 'destination' && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {item.type === 'tour' ? 'Tur' : 'Otel'}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          {item.price && (
                            <span className="font-bold text-blue-600">
                              {item.price} TL
                              {item.type === 'hotel' && <span className="text-xs text-gray-500">/gece</span>}
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemClick(item);
                            }}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {item.type === 'destination' ? 'Keşfet' : 'Rezervasyon Yap'}
                          </button>
                        </div>
                      </div>
                    </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Kupon Kodu Bilgisi */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3">🎟️ Test Kupon Kodları</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <code className="bg-white px-2 py-1 rounded">WELCOME10</code>
                  <span className="text-green-700">%10 indirim (min 500 TL)</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-white px-2 py-1 rounded">EARLYBIRD</code>
                  <span className="text-green-700">%20 indirim (min 1000 TL)</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-white px-2 py-1 rounded">SUMMER2024</code>
                  <span className="text-green-700">200 TL indirim (sadece turlar)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedItem && (selectedItem.type === 'tour' || selectedItem.type === 'hotel') && (
        <BookingForm
          item={selectedItem.originalData}
          itemType={selectedItem.type as 'tour' | 'hotel'}
          isOpen={bookingModalOpen}
          onClose={handleBookingClose}
        />
      )}

      {/* Footer */}
      <div className="mt-16 bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Travel Ailydian Enterprise Demo</h3>
          <p className="text-gray-400 text-sm">
            🚀 Gelişmiş AI destekli küresel turizm platformu
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span>✨ İnteraktif Harita Sistemi</span>
            <span>💰 Dinamik Fiyatlandırma</span>
            <span>🎫 Akıllı Rezervasyon</span>
            <span>🗺️ Özel Pickup Lokasyonu</span>
            <span>🎯 SEO Optimizasyonu</span>
          </div>
        </div>
      </div>
    </div>
  );
}