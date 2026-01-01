import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Calendar, MapPin, Users, Star, Clock,
  CheckCircle, AlertCircle, XCircle, Download, Share,
  Plane, Hotel, Car, Train, Ship, CreditCard, Phone,
  Mail, FileText, Eye, Edit, Trash2, Plus, Filter,
  ChevronDown, ChevronUp, Globe } from
'lucide-react';

const myTrips = [
{
  id: 'TR-2024-001',
  title: 'İstanbul Tarihi Turu',
  type: 'tour',
  status: 'completed',
  destination: 'İstanbul, Türkiye',
  image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300',
  startDate: '2024-01-15',
  endDate: '2024-01-18',
  duration: '4 gün 3 gece',
  participants: 2,
  totalPrice: '₺4,800',
  bookingDate: '2023-12-20',
  confirmationCode: 'IST-HT-2024-001',
  rating: 5,
  includes: ['Otel konaklama', 'Rehberli turlar', 'Kahvaltı', 'Transfer'],
  services: [
  { type: 'hotel', name: 'Sultanahmet Palace Hotel', rating: 4.5 },
  { type: 'tour', name: 'Hagia Sophia & Blue Mosque Tour', rating: 4.8 },
  { type: 'transfer', name: 'Airport Transfer', rating: 4.7 }]

},
{
  id: 'FL-2024-002',
  title: 'Antalya - İstanbul Uçuş',
  type: 'flight',
  status: 'upcoming',
  destination: 'İstanbul, Türkiye',
  image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300',
  startDate: '2024-02-10',
  endDate: '2024-02-10',
  duration: '1 saat 25 dakika',
  participants: 1,
  totalPrice: '₺850',
  bookingDate: '2024-01-25',
  confirmationCode: 'TK-2453',
  airline: 'Turkish Airlines',
  flightDetails: {
    departure: { time: '14:30', airport: 'AYT - Antalya Havalimanı' },
    arrival: { time: '15:55', airport: 'IST - İstanbul Havalimanı' },
    aircraft: 'Boeing 737-800',
    seat: '12A'
  }
},
{
  id: 'HT-2024-003',
  title: 'Kapadokya Balon Tatili',
  type: 'hotel',
  status: 'upcoming',
  destination: 'Kapadokya, Türkiye',
  image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0deeb?w=400&h=300',
  startDate: '2024-03-05',
  endDate: '2024-03-08',
  duration: '3 gün 2 gece',
  participants: 2,
  totalPrice: '₺3,600',
  bookingDate: '2024-01-30',
  confirmationCode: 'KPD-CAVE-2024',
  hotelDetails: {
    name: 'Cappadocia Cave Suites',
    rating: 4.8,
    roomType: 'Deluxe Cave Room',
    amenities: ['Spa', 'Restaurant', 'Terrace', 'Free WiFi']
  },
  includes: ['Balon turu', 'Kahvaltı', 'Havalimanı transferi']
},
{
  id: 'PK-2024-004',
  title: 'Bodrum Tatil Paketi',
  type: 'package',
  status: 'cancelled',
  destination: 'Bodrum, Türkiye',
  image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300',
  startDate: '2024-01-28',
  endDate: '2024-02-02',
  duration: '5 gün 4 gece',
  participants: 4,
  totalPrice: '₺8,200',
  bookingDate: '2024-01-10',
  confirmationCode: 'BDM-PKG-2024',
  cancelDate: '2024-01-26',
  refundAmount: '₺7,800',
  includes: ['Uçak bileti', 'Otel konaklama', 'Tüm öğünler', 'Aktiviteler']
}];


const tripStats = [
{
  title: 'Tamamlanan Seyahat',
  value: '8',
  icon: CheckCircle,
  color: 'text-lydian-success'
},
{
  title: 'Yaklaşan Seyahat',
  value: '3',
  icon: Clock,
  color: 'text-lydian-primary'
},
{
  title: 'Toplam Tasarruf',
  value: '₺2,450',
  icon: CreditCard,
  color: 'text-purple-600'
},
{
  title: 'Sadakat Puanı',
  value: '1,250',
  icon: Star,
  color: 'text-lydian-warning'
}];


export default function MyTrips() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('date');

  const filteredTrips = myTrips.filter((trip) => {
    if (selectedTab === 'all') return true;
    return trip.status === selectedTab;
  });

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case 'price':
        const priceA = parseInt(a.totalPrice.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.totalPrice.replace(/[^\d]/g, ''));
        return priceB - priceA;
      case 'destination':
        return a.destination.localeCompare(b.destination);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'upcoming':return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled':return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'in-progress':return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:return 'bg-lydian-bg/10 text-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flight':return Plane;
      case 'hotel':return Hotel;
      case 'tour':return Globe;
      case 'package':return MapPin;
      case 'car':return Car;
      default:return MapPin;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':return 'Tamamlandı';
      case 'upcoming':return 'Yaklaşan';
      case 'cancelled':return 'İptal Edildi';
      case 'in-progress':return 'Devam Ediyor';
      default:return status;
    }
  };

  return (
    <>
      <Head>
        <title>Seyahatlerim - AILYDIAN Holiday</title>
        <meta name="description" content="Geçmiş ve gelecek seyahatlerinizi yönetin, rezervasyon detaylarını görüntüleyin." />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: 'white' }}>
        {/* Header */}
        <div className="shadow-sm border-b" style={{ backgroundColor: 'white', borderBottomColor: '#0ea5e9' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-2xl font-bold" style={{ color: '#0ea5e9' }}>
                  AILYDIAN Holiday
                </Link>
              </div>
              <Link
                href="/"
                className="ocean-button-secondary flex items-center">

                <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                Ana Sayfa&apos;ya Dön
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-lydian-text-inverse py-16" style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #4682B4 50%, #0ea5e9 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Seyahatlerim
            </h1>
            <p className="text-xl mb-8" style={{ color: '#f0f9ff' }}>
              Geçmiş ve gelecek seyahatlerinizi tek yerden yönetin
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {tripStats.map((stat, index) =>
            <div key={index} className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-center">
                <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 ${stat.color}`} />
                <div className="text-xl sm:text-2xl font-bold text-lydian-text-inverse dark:text-lydian-text-inverse mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-lydian-text-dim dark:text-lydian-text-muted">{stat.title}</div>
              </div>
            )}
          </div>

          {/* Filters and Tabs */}
          <div className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Status Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                { key: 'all', label: 'Tümü' },
                { key: 'upcoming', label: 'Yaklaşan' },
                { key: 'completed', label: 'Tamamlanan' },
                { key: 'cancelled', label: 'İptal Edilen' }].
                map((tab) =>
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTab === tab.key ?
                  'bg-lydian-primary text-white' :
                  'bg-lydian-bg/10 dark:bg-gray-700 text-gray-200 dark:text-lydian-text-dim hover:bg-blue-50 dark:hover:bg-gray-600'}`
                  }>

                    {tab.label}
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim">
                  Sırala:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-lydian-border-medium dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border dark:bg-gray-700 dark:text-lydian-text-inverse text-sm">

                  <option value="date">Tarihe Göre</option>
                  <option value="price">Fiyata Göre</option>
                  <option value="destination">Destinasyona Göre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trips List */}
          <div className="space-y-6">
            {sortedTrips.map((trip) => {
              const TypeIcon = getTypeIcon(trip.type);

              return (
                <div key={trip.id} className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 relative flex-shrink-0">
                      <Image
                        src={trip.image}
                        alt={trip.title}
                        width={400}
                        height={300}
                        className="w-full h-48 sm:h-56 md:h-full object-cover" />

                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${getStatusColor(trip.status)}`}>
                          {getStatusText(trip.status)}
                        </span>
                      </div>
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-lydian-bg/90 dark:bg-gray-800/90 p-1.5 sm:p-2 rounded-full">
                        <TypeIcon className="h-3 w-3 sm:h-4 sm:w-4 text-lydian-text-muted dark:text-lydian-text-dim" />
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse mb-2">
                            {trip.title}
                          </h3>
                          <div className="flex items-center text-lydian-text-dim dark:text-lydian-text-muted mb-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            {trip.destination}
                          </div>
                          <div className="flex items-center text-lydian-text-dim dark:text-lydian-text-muted mb-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            {trip.startDate} - {trip.endDate} ({trip.duration})
                          </div>
                          <div className="flex items-center text-lydian-text-dim dark:text-lydian-text-muted">
                            <Users className="h-4 w-4 mr-2" />
                            {trip.participants} kişi
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-lydian-text-inverse dark:text-lydian-text-inverse mb-2">
                            {trip.totalPrice}
                          </div>
                          <div className="text-sm text-lydian-text-dim dark:text-lydian-text-muted">
                            {trip.confirmationCode}
                          </div>
                        </div>
                      </div>

                      {/* Trip Details */}
                      <div className="border-t border-lydian-border dark:border-gray-600 pt-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {trip.includes?.map((item, index) =>
                          <span
                            key={index}
                            className="px-2 py-1 bg-lydian-primary-light dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">

                              {item}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          <button className="bg-lydian-primary text-lydian-text-inverse px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-lydian-primary-dark transition-colors text-xs sm:text-sm flex items-center">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                            Detayları Gör
                          </button>

                          {trip.status === 'upcoming' &&
                          <button className="bg-lydian-success text-lydian-text-inverse px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-lydian-success-hover transition-colors text-xs sm:text-sm flex items-center">
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              Düzenle
                            </button>
                          }

                          <button className="bg-gray-600 text-lydian-text-inverse px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-gray-700 transition-colors text-xs sm:text-sm flex items-center">
                            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                            İndir
                          </button>

                          <button className="bg-purple-600 text-lydian-text-inverse px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-purple-700 transition-colors text-xs sm:text-sm flex items-center">
                            <Share className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                            Paylaş
                          </button>

                          {trip.status === 'upcoming' &&
                          <button className="bg-lydian-primary text-lydian-text-inverse px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-lydian-primary-dark transition-colors text-xs sm:text-sm flex items-center">
                              <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              İptal Et
                            </button>
                          }

                          {trip.status === 'completed' && !trip.rating &&
                          <button className="bg-lydian-warning text-lydian-text-inverse px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-yellow-700 transition-colors text-xs sm:text-sm flex items-center">
                              <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              Değerlendir
                            </button>
                          }
                        </div>

                        {/* Rating Display */}
                        {trip.rating &&
                        <div className="flex items-center mt-3">
                            <span className="text-sm text-lydian-text-dim dark:text-lydian-text-muted mr-2">Değerlendirmeniz:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) =>
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                              i < trip.rating ? 'text-yellow-400 fill-current' : 'text-lydian-text-dim'}`
                              } />

                            )}
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>);

            })}
          </div>

          {/* Empty State */}
          {sortedTrips.length === 0 &&
          <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-lydian-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse mb-2">
                Henüz seyahat kaydınız bulunmuyor
              </h3>
              <p className="text-lydian-text-dim dark:text-lydian-text-muted mb-6">
                İlk seyahatinizi planlamaya başlayın!
              </p>
              <Link
              href="/"
              className="bg-lydian-primary text-lydian-text-inverse px-6 py-3 rounded-lg hover:bg-lydian-primary-dark transition-colors font-semibold">

                Seyahat Planla
              </Link>
            </div>
          }

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] rounded-2xl p-8 text-lydian-text-inverse text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">
              Yeni Bir Maceraya Hazır mısınız?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Hayalinizdeki destinasyonu keşfedin ve unutulmaz anılar biriktirin
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-lydian-bg-hover text-lydian-primary px-6 py-3 rounded-lg hover:bg-lydian-primary-lighter transition-colors font-semibold flex items-center justify-center">

                <Plus className="h-5 w-5 mr-2" />
                Yeni Seyahat Planla
              </Link>
              <Link
                href="/destinations"
                className="bg-lydian-glass-dark-heavy text-lydian-text-inverse px-6 py-3 rounded-lg hover:bg-lydian-bg/30 transition-colors font-semibold flex items-center justify-center">

                <Globe className="h-5 w-5 mr-2" />
                Destinasyonları Keşfet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>);

}