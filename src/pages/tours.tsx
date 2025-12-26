import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Star,
  Calendar,
  Users,
  Clock,
  Camera,
  Heart,
  Filter,
  Plane,
  Car,
  Utensils,
  Shield,
  ShoppingCart,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Award,
  Globe,
  TrendingUp,
  Zap,
  Eye
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { allComprehensiveTours as importedComprehensiveTours } from '../data/marmaris-bodrum-cesme-tours';
import { antalyaTours } from '../data/antalya-tours';
import { greeceTours } from '../data/greece-tours';
import { cyprusTours } from '../data/cyprus-tours';
import CountryFilterWidget from '../components/filters/CountryFilterWidget';
import { NeoHero, FuturisticCard, FuturisticButton, NeoSection } from '../components/neo-glass';

// Antalya Tours (16 tours with competitive pricing)
const antalyaToursFormatted = antalyaTours.map(tour => ({
  id: tour.id,
  name: tour.name,
  slug: tour.slug,
  location: `${tour.region}, Türkiye`,
  image: tour.images[0],
  price: tour.pricing.travelLyDian,
  originalPrice: Math.round(tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100)),
  rating: tour.rating,
  reviews: tour.reviewCount,
  duration: tour.duration,
  groupSize: `${tour.maxGroupSize} kişi`,
  category: tour.category,
  type: 'Günlük Tur',
  highlights: tour.highlights.slice(0, 4),
  includes: tour.included,
  description: tour.description,
  difficulty: tour.difficulty,
  languages: ['Türkçe', 'İngilizce', 'Rusça', 'Almanca', 'Arapça', 'Fransızca'],
  badge: tour.pricing.savingsPercentage >= 15 ? 'İndirim' : undefined,
  region: { city: tour.region, country: 'turkey' }
}));

// Greece Tours (2+ tours with competitive pricing, 8-language support)
const greeceToursFormatted = greeceTours.map(tour => ({
  id: tour.id,
  name: tour.name.tr, // Default to Turkish, will be handled by i18n later
  slug: tour.slug,
  location: `${tour.city}, Yunanistan`,
  image: tour.images?.hero || tour.images?.gallery?.[0] || 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=800',
  price: Math.round(tour.pricing.travelLyDian * 35), // Convert EUR to TRY (approx €1 = 35 TRY)
  originalPrice: Math.round((tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100)) * 35),
  rating: tour.rating,
  reviews: tour.reviewCount,
  duration: tour.duration,
  groupSize: `${tour.groupSize.max} kişi`,
  category: tour.category,
  type: 'Günlük Tur',
  highlights: (tour.highlights?.tr || []).slice(0, 4),
  includes: tour.included?.tr || [],
  description: tour.shortDescription?.tr || tour.name.tr,
  difficulty: tour.difficulty?.tr || 'Orta',
  languages: ['Türkçe', 'İngilizce', 'Almanca', 'Rusça', 'Arapça', 'Yunanca', 'Fransızca', 'Farsça'],
  badge: tour.pricing.savingsPercentage >= 10 ? 'İndirim' : undefined,
  region: { city: tour.city, country: 'greece' }
}));

// Cyprus Tours (2+ tours with competitive pricing, 8-language support)
const cyprusToursFormatted = cyprusTours.map(tour => ({
  id: tour.id,
  name: tour.name.tr,
  slug: tour.slug,
  location: `${tour.city}, Kıbrıs`,
  image: tour.images?.hero || tour.images?.gallery?.[0] || 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800',
  price: Math.round(tour.pricing.travelLyDian * 35), // Convert EUR to TRY
  originalPrice: Math.round((tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100)) * 35),
  rating: tour.rating,
  reviews: tour.reviewCount,
  duration: tour.duration,
  groupSize: `${tour.groupSize.max} kişi`,
  category: tour.category === 'historical' ? 'cultural' : tour.category === 'beach-water' ? 'nature' : tour.category,
  type: 'Günlük Tur',
  highlights: (tour.highlights?.tr || []).slice(0, 4),
  includes: tour.included?.tr || [],
  description: tour.shortDescription?.tr || tour.name.tr,
  difficulty: tour.difficulty?.tr || 'Kolay',
  languages: ['Türkçe', 'İngilizce', 'Almanca', 'Rusça', 'Arapça', 'Yunanca', 'Fransızca', 'Farsça'],
  badge: tour.pricing.savingsPercentage >= 10 ? 'İndirim' : undefined,
  region: { city: tour.city, country: 'cyprus' }
}));

// Premium LyDian Tours - Now with 45+ comprehensive tours from Marmaris, Bodrum, and Çeşme
const otherRegionTours = importedComprehensiveTours.map(tour => ({
  id: tour.id,
  name: tour.name,
  slug: tour.slug,
  location: `${tour.region}, Türkiye`,
  image: tour.images[0],
  price: tour.pricing.travelLyDian,
  originalPrice: Math.round(tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100)),
  rating: tour.rating,
  reviews: tour.reviewCount,
  duration: tour.duration,
  groupSize: `${tour.maxGroupSize} kişi`,
  category: tour.category,
  type: 'Günlük Tur',
  highlights: tour.highlights.slice(0, 4),
  includes: tour.included,
  description: tour.description,
  difficulty: tour.difficulty,
  languages: ['Türkçe', 'İngilizce'],
  badge: tour.pricing.savingsPercentage >= 15 ? 'İndirim' : undefined,
  region: { city: tour.region, country: 'turkey' }
}));

// Combine all tours: Turkey first, then Greece, then Cyprus
const allComprehensiveTours = [
  ...antalyaToursFormatted,
  ...otherRegionTours,
  ...greeceToursFormatted,
  ...cyprusToursFormatted
];

// Legacy tours for backward compatibility
const legacyTours = [
  {
    id: 1,
    slug: 'istanbul-buyulu-sehir-turu',
    name: 'İstanbul Büyülü Şehir Turu',
    location: 'İstanbul, Türkiye',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop',
    price: 450,
    originalPrice: 650,
    rating: 4.8,
    reviews: 2847,
    duration: '8 saat',
    groupSize: '15 kişi',
    category: 'cultural',
    type: 'daily',
    highlights: ['Ayasofya', 'Topkapı Sarayı', 'Kapalıçarşı', 'Sultanahmet'],
    includes: ['Rehber', 'Ulaşım', 'Müze Biletleri', 'Öğle Yemeği'],
    description: 'İstanbul\'un tarihi yarımadasında unutulmaz bir gün geçirin. Ayasofya\'nın ihtişamından Topkapı Sarayı\'nın gizlerine kadar.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Almanca'],
    badge: 'Popüler'
  },
  {
    id: 2,
    slug: 'kapadokya-balon-ve-doga-turu',
    name: 'Kapadokya Balon ve Doğa Turu',
    location: 'Nevşehir, Türkiye',
    image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=800&h=600&fit=crop',
    price: 1200,
    originalPrice: 1500,
    rating: 4.9,
    reviews: 1856,
    duration: '2 gün',
    groupSize: '12 kişi',
    category: 'adventure',
    type: 'multi-day',
    highlights: ['Sıcak Hava Balonu', 'Göreme Açık Hava Müzesi', 'Derinkuyu', 'Avanos'],
    includes: ['Balon Turu', 'Konaklama', 'Kahvaltı', 'Rehber', 'Ulaşım'],
    description: 'Peri bacalarının üzerinde unutulmaz balon deneyimi yaşayın. Kapadokya\'nın eşsiz manzaralarını gökyüzünden keşfedin.',
    difficulty: 'Orta',
    languages: ['Türkçe', 'İngilizce'],
    badge: 'En Çok Satan'
  },
  {
    id: 3,
    slug: 'antalya-antik-kentler-turu',
    name: 'Antalya Antik Kentler Turu',
    location: 'Antalya, Türkiye',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=600&fit=crop',
    price: 320,
    originalPrice: 420,
    rating: 4.7,
    reviews: 1234,
    duration: '6 saat',
    groupSize: '20 kişi',
    category: 'cultural',
    type: 'daily',
    highlights: ['Aspendos', 'Perge', 'Side', 'Kaleiçi'],
    includes: ['Rehber', 'Ulaşım', 'Müze Biletleri'],
    description: 'Akdeniz\'in antik hazinelerini keşfedin. Aspendos\'un muhteşem tiyatrosundan Side\'nin tarihi limanına.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Rusça'],
    badge: 'Kültür'
  },
  {
    id: 4,
    slug: 'fethiye-yamac-parasutu-tekne-turu',
    name: 'Fethiye Yamaç Paraşütü ve Tekne Turu',
    location: 'Fethiye, Türkiye',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0deeb?w=800&h=600&fit=crop',
    price: 850,
    originalPrice: 1000,
    rating: 4.8,
    reviews: 967,
    duration: '1 gün',
    groupSize: '10 kişi',
    category: 'adventure',
    type: 'boat',
    highlights: ['Babadağ Paraşütü', 'Ölüdeniz', '12 Adalar', 'Butterfly Valley'],
    includes: ['Paraşüt Uçuşu', 'Tekne Turu', 'Öğle Yemeği', 'Güvenlik Ekipmanları'],
    description: 'Gökyüzünden ve denizden Fethiye\'nin güzelliklerini görün. Adrenalindolu bir macera sizi bekliyor!',
    difficulty: 'Zor',
    languages: ['Türkçe', 'İngilizce'],
    badge: 'Macera'
  },
  {
    id: 5,
    slug: 'pamukkale-hierapolis-gunubirlik',
    name: 'Pamukkale ve Hierapolis Günübirlik',
    location: 'Denizli, Türkiye',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop',
    price: 280,
    originalPrice: 350,
    rating: 4.6,
    reviews: 1567,
    duration: '8 saat',
    groupSize: '25 kişi',
    category: 'nature',
    type: 'daily',
    highlights: ['Beyaz Travertenler', 'Hierapolis Antik Kenti', 'Antik Havuz', 'Kleopatra Havuzu'],
    includes: ['Rehber', 'Ulaşım', 'Giriş Biletleri', 'Öğle Yemeği'],
    description: 'Doğanın beyaz mucizesi Pamukkale\'yi keşfedin. Termal sularla dolu travertenlerde unutulmaz anlar.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Almanca'],
    badge: 'Doğa'
  },
  {
    id: 6,
    slug: 'cesme-alacati-gastronomi-turu',
    name: 'Çeşme Alaçatı Gastronomi Turu',
    location: 'İzmir, Türkiye',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    price: 580,
    originalPrice: 750,
    rating: 4.7,
    reviews: 876,
    duration: '1 gün',
    groupSize: '8 kişi',
    category: 'culinary',
    type: 'daily',
    highlights: ['Alaçatı Çarşısı', 'Şarap Tadımı', 'Geleneksel Lezzetler', 'Rüzgar Çiftlikleri'],
    includes: ['Gastronomi Rehberi', 'Yemek Tadımları', 'Şarap Tadımı', 'Ulaşım'],
    description: 'Ege\'nin lezzet durağında eşsiz bir gastronomi deneyimi. Şarap bağlarından Ege mutfağına.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce'],
    badge: 'Gastronomi'
  },
  {
    id: 7,
    slug: 'trabzon-doga-kultur-turu',
    name: 'Trabzon Doğa ve Kültür Turu',
    location: 'Trabzon, Türkiye',
    image: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?w=800&h=600&fit=crop',
    price: 650,
    originalPrice: 800,
    rating: 4.5,
    reviews: 654,
    duration: '2 gün',
    groupSize: '15 kişi',
    category: 'nature',
    type: 'multi-day',
    highlights: ['Uzungöl', 'Sumela Manastırı', 'Ayder Yaylası', 'Çay Bahçeleri'],
    includes: ['Konaklama', 'Rehber', 'Ulaşım', 'Kahvaltı'],
    description: 'Karadeniz\'in yeşil cennetinde doğayla buluşun. Uzungöl\'ün sakin sularından Sumela\'nın gizemine.',
    difficulty: 'Orta',
    languages: ['Türkçe'],
    badge: 'Keşif'
  },
  {
    id: 8,
    slug: 'bodrum-antik-yolculuk',
    name: 'Bodrum Antik Yolculuk',
    location: 'Muğla, Türkiye',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=800&h=600&fit=crop',
    price: 420,
    originalPrice: 550,
    rating: 4.6,
    reviews: 1098,
    duration: '6 saat',
    groupSize: '18 kişi',
    category: 'cultural',
    type: 'daily',
    highlights: ['Bodrum Kalesi', 'Halikarnas Mozolesi', 'Marina', 'Amphitiyatro'],
    includes: ['Rehber', 'Müze Biletleri', 'Ulaşım'],
    description: 'Antik Halikarnas\'ın izlerinde tarihi keşif. Dünyanın 7 harikasından Bodrum Kalesi\'ne.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Almanca'],
    badge: 'Tarih'
  },
  // ALANYA & ANTALYA REGION TOURS
  {
    id: 9,
    slug: 'alanya-korsan-tekne-turu',
    name: 'Alanya Korsan Tekne Turu',
    location: 'Alanya, Antalya',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=600&fit=crop',
    price: 750,
    originalPrice: 950,
    rating: 4.9,
    reviews: 3421,
    duration: '7 saat',
    groupSize: '80 kişi',
    category: 'adventure',
    type: 'boat',
    highlights: ['Korsan Mağarası', 'Aşıklar Mağarası', 'Fosforlu Mağara', 'Köpük Partisi'],
    includes: ['BBQ Öğle Yemeği', 'Sınırsız İçecek', 'Otel Transfer', 'Animasyon', 'Yüzme Molaları'],
    description: 'Alanya\'nın turkuaz sularında unutulmaz bir macera! Korsan gemisinde Akdeniz\'in gizli mağaralarını keşfedin, berrak sularda yüzün ve köpük partisinin tadını çıkarın.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Rusça', 'Almanca'],
    badge: 'En Çok Satan'
  },
  {
    id: 10,
    slug: 'sapadere-kanyonu-koy-turu',
    name: 'Sapadere Kanyonu ve Köy Turu',
    location: 'Alanya, Antalya',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    price: 890,
    originalPrice: 1100,
    rating: 4.8,
    reviews: 2156,
    duration: '8 saat',
    groupSize: '25 kişi',
    category: 'nature',
    type: 'daily',
    highlights: ['Sapadere Kanyonu', 'Cüceler Mağarası', 'Geleneksel Köy', 'Şelale'],
    includes: ['Rehber', 'Öğle Yemeği', 'Ulaşım', 'Kanyon Girişi', 'Köy Gezisi'],
    description: 'Toros Dağları\'nın kalbinde saklı cennet! 400 metre uzunluğundaki Sapadere Kanyonu\'nun büyüleyici şelalelerini keşfedin, geleneksel köy yaşamını deneyimleyin.',
    difficulty: 'Orta',
    languages: ['Türkçe', 'İngilizce', 'Rusça'],
    badge: 'Doğa'
  },
  {
    id: 11,
    slug: 'koprulu-kanyon-rafting-macerasi',
    name: 'Köprülü Kanyon Rafting Macerası',
    location: 'Belek, Antalya',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
    price: 650,
    originalPrice: 850,
    rating: 4.7,
    reviews: 1987,
    duration: '7 saat',
    groupSize: '12 kişi',
    category: 'adventure',
    type: 'adventure',
    highlights: ['14 km Rafting', 'Köprülü Kanyon', 'Profesyonel Rehber', 'Güvenlik Ekipmanları'],
    includes: ['Rafting Ekipmanları', 'Öğle Yemeği', 'Sigorta', 'Otel Transfer', 'Fotoğraf Çekimi'],
    description: 'Türkiye\'nin en güzel rafting parkurunda adrenalin dolu bir gün! Köprülü Kanyon\'un berrak sularında 14 km\'lik heyecan verici yolculuk.',
    difficulty: 'Orta',
    languages: ['Türkçe', 'İngilizce'],
    badge: 'Macera'
  },
  {
    id: 12,
    slug: 'belek-super-kombo-rafting-atv-zipline',
    name: 'Belek Süper Kombo: Rafting + ATV + Zipline',
    location: 'Belek, Antalya',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    price: 1250,
    originalPrice: 1600,
    rating: 4.9,
    reviews: 2843,
    duration: '8 saat',
    groupSize: '15 kişi',
    category: 'adventure',
    type: 'adventure',
    highlights: ['Rafting', 'ATV Safari', 'Zipline', 'Jeep Safari', 'Tazı Kanyonu'],
    includes: ['Tüm Aktiviteler', 'Öğle Yemeği', 'Ekipmanlar', 'Sigorta', 'Otel Transfer', 'Video Çekimi'],
    description: 'Tek günde 4 macera! Köprülü Kanyon\'da rafting yapın, Toros Dağları\'nda ATV sürün, zipline ile uçun ve Tazı Kanyonu\'nu jeep safari ile keşfedin.',
    difficulty: 'Zor',
    languages: ['Türkçe', 'İngilizce', 'Rusça'],
    badge: 'Popüler'
  },
  {
    id: 13,
    slug: 'perge-aspendos-side-antik-kentler',
    name: 'Perge, Aspendos ve Side Antik Kentler',
    location: 'Side, Antalya',
    image: 'https://images.unsplash.com/photo-1572478219402-e287fa9ae5d0?w=800&h=600&fit=crop',
    price: 980,
    originalPrice: 1250,
    rating: 4.8,
    reviews: 1654,
    duration: '9 saat',
    groupSize: '30 kişi',
    category: 'cultural',
    type: 'cultural',
    highlights: ['Perge Antik Kenti', 'Aspendos Tiyatrosu', 'Side Antik Kenti', 'Manavgat Şelalesi'],
    includes: ['Profesyonel Rehber', 'Müze Girişleri', 'Öğle Yemeği', 'Klimalı Araç', 'Otel Transfer'],
    description: 'Akdeniz\'in en etkileyici antik kentlerinde tarihi yolculuk! Dünyanın en iyi korunmuş Roma tiyatrosu Aspendos, antik Perge ve Side\'nin eşsiz güzelliklerini keşfedin.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Almanca', 'Rusça'],
    badge: 'Kültür'
  },
  {
    id: 14,
    slug: 'alanya-quad-safari-jeep-safari-turu',
    name: 'Alanya Quad Safari ve Jeep Safari Turu',
    location: 'Alanya, Antalya',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    price: 720,
    originalPrice: 920,
    rating: 4.7,
    reviews: 2234,
    duration: '6 saat',
    groupSize: '20 kişi',
    category: 'adventure',
    type: 'adventure',
    highlights: ['Quad Safari', 'Jeep Safari', 'Toros Dağları', 'Köy Gezisi', 'Nehir Yüzme'],
    includes: ['Quad & Jeep', 'Güvenlik Ekipmanları', 'Öğle Yemeği', 'Rehber', 'Otel Transfer'],
    description: 'Toros Dağları\'nın tozlu yollarında adrenalin! Quad ve jeep ile dağ köylerini ziyaret edin, muhteşem manzaraların tadını çıkarın ve geleneksel yaşamı keşfedin.',
    difficulty: 'Orta',
    languages: ['Türkçe', 'İngilizce', 'Rusça'],
    badge: 'Macera'
  },
  {
    id: 15,
    slug: 'antalya-sehir-turu-duden-selaleleri',
    name: 'Antalya Şehir Turu ve Düden Şelaleleri',
    location: 'Antalya Merkez',
    image: 'https://images.unsplash.com/photo-1568592410210-e0e4b24f5684?w=800&h=600&fit=crop',
    price: 580,
    originalPrice: 750,
    rating: 4.6,
    reviews: 1876,
    duration: '6 saat',
    groupSize: '25 kişi',
    category: 'cultural',
    type: 'daily',
    highlights: ['Kaleiçi', 'Düden Şelalesi', 'Hadrian Kapısı', 'Yivli Minare', 'Marina'],
    includes: ['Profesyonel Rehber', 'Ulaşım', 'Şelale Girişi', 'Serbest Zaman'],
    description: 'Antalya\'nın tarihi ve doğal güzelliklerini tek günde keşfedin! Kaleiçi\'nin dar sokaklarından Düden Şelalesi\'nin muhteşem manzarasına kadar.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Almanca', 'Rusça'],
    badge: 'Kültür'
  },
  {
    id: 16,
    slug: 'kemer-tekne-turu-suluada-adasi',
    name: 'Kemer Tekne Turu ve Suluada Adası',
    location: 'Kemer, Antalya',
    image: 'https://images.unsplash.com/photo-1544551763-92f7d5a0c2c0?w=800&h=600&fit=crop',
    price: 850,
    originalPrice: 1050,
    rating: 4.9,
    reviews: 2567,
    duration: '8 saat',
    groupSize: '40 kişi',
    category: 'adventure',
    type: 'boat',
    highlights: ['Suluada Adası', 'Yüzme Molaları', 'BBQ Öğle Yemeği', 'Snorkeling', 'Adrasan Koyu'],
    includes: ['Tekne Turu', 'Öğle Yemeği', 'İçecekler', 'Snorkeling Ekipmanı', 'Otel Transfer'],
    description: 'Türkiye\'nin Maldivleri Suluada Adası! Kristal berraklığındaki sularda yüzün, gizli koyları keşfedin ve muhteşem doğanın tadını çıkarın.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Rusça'],
    badge: 'Popüler'
  },
  {
    id: 17,
    slug: 'alanya-tuplu-dalis-deneyimi',
    name: 'Alanya Tüplü Dalış Deneyimi',
    location: 'Alanya, Antalya',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    price: 920,
    originalPrice: 1150,
    rating: 4.8,
    reviews: 1432,
    duration: '5 saat',
    groupSize: '8 kişi',
    category: 'adventure',
    type: 'adventure',
    highlights: ['2 Dalış', 'Profesyonel Eğitim', 'Sualtı Fotoğrafları', 'Sertifikalı Eğitmen'],
    includes: ['Tüm Ekipmanlar', 'Sigorta', 'Eğitim', 'Öğle Yemeği', 'Otel Transfer', 'Fotoğraflar'],
    description: 'Akdeniz\'in büyülü sualtı dünyasını keşfedin! Deneyim gerektirmeyen dalış turumuzda, profesyonel eğitmenler eşliğinde rengarenk balıklar ve mercanlarla tanışın.',
    difficulty: 'Orta',
    languages: ['Türkçe', 'İngilizce', 'Rusça'],
    badge: 'Macera'
  },
  {
    id: 18,
    slug: 'belek-aquapark-dolphinland',
    name: 'Belek Aquapark ve Dolphinland',
    location: 'Belek, Antalya',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
    price: 680,
    originalPrice: 850,
    rating: 4.7,
    reviews: 3128,
    duration: '6 saat',
    groupSize: '50 kişi',
    category: 'nature',
    type: 'daily',
    highlights: ['Yunus Şovu', 'Su Kaydırakları', 'Dalga Havuzu', 'Çocuk Havuzu', 'Fok Balığı Şovu'],
    includes: ['Park Girişi', 'Tüm Şovlar', 'Otel Transfer', 'Serbest Zaman'],
    description: 'Ailece eğlencenin doruğu! Akdeniz\'in en büyük su parkında onlarca kaydırak, dalga havuzu ve yunusların muhteşem şovunu izleyin.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Rusça', 'Almanca'],
    badge: 'Popüler'
  }
];

// Combine legacy tours with comprehensive tours (45+ tours total)
const tours = [...legacyTours, ...allComprehensiveTours];

// Export legacy tours for use in [slug].tsx
export { legacyTours };

const categories = [
  { id: 'all', name: 'Tümü', icon: Globe, color: 'from-lydian-primary to-lydian-secondary' },
  { id: 'cultural', name: 'Kültürel', icon: Camera, color: 'from-blue-500 to-cyan-500' },
  { id: 'adventure', name: 'Macera', icon: Zap, color: 'from-orange-500 to-red-600' },
  { id: 'nature', name: 'Doğa', icon: MapPin, color: 'from-green-500 to-emerald-600' },
  { id: 'culinary', name: 'Gastronomi', icon: Utensils, color: 'from-purple-500 to-pink-500' },
];

const difficulties = ['Tümü', 'Kolay', 'Orta', 'Zor'];
const durations = ['Tümü', '1 gün altı', '1 gün', '2+ gün'];

export default function Tours() {
  const router = useRouter();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tümü');
  const [selectedDuration, setSelectedDuration] = useState('Tümü');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState('popularity');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Country data for filter widget
  const countries = [
    {
      code: 'turkey',
      name: {
        tr: 'Türkiye',
        en: 'Turkey',
        de: 'Türkei',
        ru: 'Турция',
        ar: 'تركيا',
        fa: 'ترکیه',
        fr: 'Turquie',
        el: 'Τουρκία'
      },
      flag: '🇹🇷',
      tourCount: tours.filter(t => t.region?.country === 'turkey').length
    },
    {
      code: 'greece',
      name: {
        tr: 'Yunanistan',
        en: 'Greece',
        de: 'Griechenland',
        ru: 'Греция',
        ar: 'اليونان',
        fa: 'یونان',
        fr: 'Grèce',
        el: 'Ελλάδα'
      },
      flag: '🇬🇷',
      tourCount: tours.filter(t => t.region?.country === 'greece').length
    },
    {
      code: 'cyprus',
      name: {
        tr: 'Kıbrıs',
        en: 'Cyprus',
        de: 'Zypern',
        ru: 'Кипр',
        ar: 'قبرص',
        fa: 'قبرس',
        fr: 'Chypre',
        el: 'Κύπρος'
      },
      flag: '🇨🇾',
      tourCount: tours.filter(t => t.region?.country === 'cyprus').length
    }
  ];

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.highlights.some(highlight => highlight.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'Tümü' || tour.difficulty === selectedDifficulty;
    const matchesDuration = selectedDuration === 'Tümü' ||
      (selectedDuration === '1 gün altı' && tour.duration.includes('saat')) ||
      (selectedDuration === '1 gün' && tour.duration === '1 gün') ||
      (selectedDuration === '2+ gün' && (tour.duration.includes('2') || tour.duration.includes('3')));

    // Country filter
    const matchesCountry = !selectedCountry || (tour.region && tour.region.country === selectedCountry);

    // URL query parametresine göre type filtrelemesi
    const typeParam = router.query.type as string;
    const matchesType = !typeParam || tour.type === typeParam;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration && matchesCountry && matchesType;
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      default: // popularity
        return b.reviews - a.reviews;
    }
  });

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
      setToastMessage('Favorilerden kaldırıldı');
    } else {
      newFavorites.add(id);
      setToastMessage('Favorilere eklendi');
    }
    setFavorites(newFavorites);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleAddToCart = (tour: any) => {
    addItem({
      id: `tour-${tour.id}`,
      type: 'tour',
      title: tour.name,
      description: tour.description,
      image: tour.image,
      price: tour.price,
      originalPrice: tour.originalPrice,
      currency: 'TRY',
      quantity: 1,
      location: tour.location,
      rating: tour.rating,
      bookingDetails: {
        duration: tour.duration,
        groupSize: tour.groupSize,
        difficulty: tour.difficulty
      }
    });

    setToastMessage(`${tour.name} sepete eklendi!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Kolay': return 'from-green-500 to-emerald-600';
      case 'Orta': return 'from-yellow-500 to-orange-500';
      case 'Zor': return 'from-red-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors: any = {
      'Popüler': 'from-lydian-primary to-lydian-secondary',
      'En Çok Satan': 'from-yellow-500 to-orange-500',
      'Kültür': 'from-blue-500 to-cyan-500',
      'Macera': 'from-orange-500 to-red-600',
      'Doğa': 'from-green-500 to-emerald-600',
      'Gastronomi': 'from-purple-500 to-pink-500',
      'Keşif': 'from-teal-500 to-cyan-600',
      'Tarih': 'from-indigo-500 to-purple-600'
    };
    return colors[badge] || 'from-gray-500 to-gray-600';
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedDifficulty !== 'Tümü' ? 1 : 0) +
    (selectedDuration !== 'Tümü' ? 1 : 0) +
    (selectedCountry ? 1 : 0);

  return (
    <>
      <Head>
        <title>Turlar ve Aktiviteler - LyDian Travel Premium</title>
        <meta name="description" content="Türkiye'nin en özel turları ve unutulmaz deneyimleri keşfedin" />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen">
        {/* 🎬 NEO-GLASS TOURS HERO */}
        <NeoHero
          title="Unutulmaz Turlar"
          subtitle="Türkiye'nin en güzel köşelerinde eşsiz deneyimler sizi bekliyor"
          gradient="twilight"
          height="70vh"
          overlayOpacity={0.2}
          showFloatingElements={true}
        >
          {/* Stats Cards with Glassmorphism */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <motion.div
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-5xl font-black text-white mb-2">{tours.length}</div>
              <div className="text-sm uppercase tracking-widest text-white/80">Benzersiz Tur</div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-5xl font-black text-white mb-2">
                {(tours.reduce((sum, tour) => sum + tour.rating, 0) / tours.length).toFixed(1)}
              </div>
              <div className="text-sm uppercase tracking-widest text-white/80">Ortalama Puan</div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-5xl font-black text-white mb-2">
                {tours.reduce((sum, tour) => sum + tour.reviews, 0).toLocaleString('tr-TR')}
              </div>
              <div className="text-sm uppercase tracking-widest text-white/80">Mutlu Misafir</div>
            </motion.div>
          </div>
        </NeoHero>

        {/* Search & Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tur, destinasyon veya aktivite ara..."
                className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent shadow-lg hover:shadow-xl transition-all"
              />
            </div>
          </div>

          {/* Country Filter Widget */}
          <div className="mb-8">
            <CountryFilterWidget
              countries={countries}
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-neon`
                      : 'bg-white text-gray-700 hover:shadow-xl border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Additional Filters & Sort */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-3">
              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-lydian-primary focus:border-transparent shadow-sm hover:shadow-md transition-all"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>Zorluk: {diff}</option>
                ))}
              </select>

              {/* Duration Filter */}
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-lydian-primary focus:border-transparent shadow-sm hover:shadow-md transition-all"
              >
                {durations.map(dur => (
                  <option key={dur} value={dur}>Süre: {dur}</option>
                ))}
              </select>

              {/* Active Filter Count */}
              {activeFilterCount > 0 && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-lydian-primary/10 text-lydian-primary rounded-xl font-semibold">
                  <Filter className="w-4 h-4" />
                  <span>{activeFilterCount} Filtre Aktif</span>
                </div>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Sırala:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-lydian-primary focus:border-transparent shadow-sm hover:shadow-md transition-all"
              >
                <option value="popularity">Popülerlik</option>
                <option value="rating">Puan (Yüksek-Düşük)</option>
                <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                <option value="duration">Süre</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              <span className="font-bold text-lydian-primary">{sortedTours.length}</span> tur bulundu
            </p>
          </div>

          {/* 🎪 NEO-GLASS TOURS GRID */}
          {sortedTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <FuturisticCard
                    image={tour.image}
                    title={tour.name}
                    description={tour.description}
                    price={`${tour.price.toLocaleString('tr-TR')} ₺`}
                    badge={tour.badge}
                    badges={tour.highlights.slice(0, 2)}
                    metadata={[
                      { icon: <MapPin className="w-4 h-4" />, label: tour.location },
                      { icon: <Clock className="w-4 h-4" />, label: tour.duration },
                      { icon: <Users className="w-4 h-4" />, label: tour.groupSize },
                    ]}
                    rating={tour.rating}
                    reviews={tour.reviews}
                    onClick={() => router.push(`/tours/${tour.slug || tour.name.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')}`)}
                    onFavorite={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tour.id);
                    }}
                    onAddToCart={(e) => {
                      e.stopPropagation();
                      handleAddToCart(tour);
                    }}
                    isFavorite={favorites.has(tour.id)}
                    category={tour.category}
                    categoryColor={
                      tour.category === 'cultural' ? '#667EEA' :
                      tour.category === 'adventure' ? '#FF9500' :
                      tour.category === 'nature' ? '#10B981' :
                      tour.category === 'culinary' ? '#EC4899' :
                      '#667EEA'
                    }
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Camera className="w-32 h-32 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Aradığınız kriterlerde tur bulunamadı
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Arama kriterlerinizi değiştirerek tekrar deneyin
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('Tümü');
                  setSelectedDuration('Tümü');
                  setSelectedCountry(null);
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white rounded-xl font-bold hover:shadow-xl transition-all text-lg"
              >
                Filtreleri Temizle
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </section>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-[100] bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4"
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">{toastMessage}</span>
            {toastMessage.includes('sepete eklendi') && (
              <button
                onClick={() => router.push('/cart')}
                className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors ml-2"
              >
                <Eye className="w-4 h-4" />
                Sepeti Gör
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
