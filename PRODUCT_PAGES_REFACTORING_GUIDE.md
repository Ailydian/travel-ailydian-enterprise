# ÜRÜN DETAY SAYFALARI REFACTORING REHBERİ
**Proje:** AILYDIAN Holiday Platform
**Tarih:** 2026-01-02
**Durum:** Implementation Ready

---

## TESPİT EDİLEN SORUNLAR

### Mevcut Durum Analizi

| Sayfa | Header | Hero | Cards | Glassmorphism | i18n | Sorun Sayısı |
|-------|--------|------|-------|---------------|------|--------------|
| **Ana Sayfa (home.tsx)** | ModernHeader ✅ | NeoHero ✅ | FuturisticCard ✅ | ✅ | ✅ | 0 (REFERANS) |
| **Tours Detail** | SimplifiedHeader ❌ | Basit ❌ | Eski tasarım ❌ | Kısmi | ✅ | 4 |
| **Transfers Detail** | SimplifiedHeader ❌ | RED gradient ❌ | Farklı tasarım ❌ | Kısmi | ✅ | 4 |
| **Transfers Index** | ModernHeader ✅ | Basit gradient ❌ | Standart ❌ | Kısmi | ✅ | 3 |
| **Car Rentals Detail** | YOK ❌ | YOK ❌ | Eski ❌ | Yok | Kısmi | 5 |

### Kritik Uyumsuzluklar

1. **Header Inconsistency:**
   - Ana sayfa: `ModernHeader` (doğru)
   - Tours/Transfers Detail: `SimplifiedHeader` (farklı)
   - Car Rentals: Header yok (büyük sorun)

2. **Color Scheme Differences:**
   - Ana sayfa: Blue (#667EEA) + Purple gradients
   - Transfers: RED brand (#DC2626) - TAMAMEN FARKLI
   - Tours: Basit lydian-bg-hover

3. **Component Pattern'leri:**
   - Ana sayfa: NeoHero, FuturisticCard, Button variants
   - Detay sayfaları: Custom implementations (tutarsız)

---

## OLUŞTURULAN ORTAK COMPONENT LİBRARY

### 1. ProductHero Component
**Dosya:** `/src/components/products/ProductHero.tsx`

**Özellikler:**
- Universal hero section (tours, transfers, hotels, car rentals, rentals)
- Image gallery + lightbox
- Breadcrumb navigation
- Share & favorite buttons
- Stats grid (distance, duration, rating, etc.)
- Glassmorphism design
- Responsive (mobile-first)

**Kullanım:**
```typescript
import { ProductHero } from '@/components/products';

<ProductHero
  title="Mercedes Vito VIP Transfer"
  location="Antalya Havalimanı → Lara Oteller"
  rating={4.8}
  reviewCount={2847}
  images={[
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ]}
  badges={[
    { text: '2024 Excellence Award', icon: <Award />, color: 'warning' },
    { text: 'Anında Onay', icon: <Zap />, color: 'success' }
  ]}
  breadcrumbs={[
    { label: 'Transferler', href: '/transfers' },
    { label: 'Antalya Transferleri', href: '/transfers/antalya' }
  ]}
  productType="transfer"
  stats={[
    { icon: <Navigation />, label: 'Mesafe', value: '18 km' },
    { icon: <Clock />, label: 'Süre', value: '25 dk' },
    { icon: <Users />, label: 'Transfer Sayısı', value: '5,000+' }
  ]}
  onShare={() => console.log('Share clicked')}
  onFavorite={(fav) => console.log('Favorite:', fav)}
/>
```

### 2. BookingWidget Component
**Dosya:** `/src/components/products/BookingWidget.tsx`

**Özellikler:**
- Sticky sidebar (responsive)
- Multi-product type support
- Date picker (single/range)
- Guest selector
- Vehicle options (transfers/car rentals)
- Addons/extras
- Price calculator
- Trust badges
- CTA button

**Kullanım:**
```typescript
import { BookingWidget } from '@/components/products';

<BookingWidget
  basePrice={1200}
  currency="TRY"
  priceLabel="per day"
  savings={300}
  savingsPercentage={20}
  productType="transfer"
  requiresDate={true}
  requiresGuests={true}
  requiresVehicle={true}
  vehicleOptions={[
    { id: 'sedan', name: 'Ekonomi Sedan (1-3)', price: 180 },
    { id: 'vip', name: 'VIP Sedan (1-3)', price: 280 },
    { id: 'minivan', name: 'Minivan (1-7)', price: 350 }
  ]}
  addons={[
    { id: 'gps', name: 'GPS Navigasyon', price: 50, perDay: true },
    { id: 'insurance', name: 'Tam Sigorta', price: 100, perDay: true }
  ]}
  badges={[
    { icon: <Shield />, text: 'Ücretsiz İptal - 24 Saat' },
    { icon: <CheckCircle />, text: 'Anında Onay' },
    { icon: <Phone />, text: '7/24 Destek' }
  ]}
  cancellationPolicy="Ücretsiz iptal 24 saat öncesine kadar"
  onBook={(data) => console.log('Booking:', data)}
/>
```

### 3. FeatureGrid Component
**Dosya:** `/src/components/products/FeatureGrid.tsx`

**Özellikler:**
- Responsive grid (2/3/4 columns)
- Icon support
- Included/excluded variants
- Glassmorphism cards
- Hover animations

**Kullanım:**
```typescript
import { FeatureGrid } from '@/components/products';

<FeatureGrid
  title="Öne Çıkan Özellikler"
  features={[
    { icon: <Wifi />, title: 'Ücretsiz WiFi', included: true },
    { icon: <AirConditioning />, title: 'Klima', included: true },
    { icon: <Luggage />, title: '3 Bavul Kapasitesi', included: true }
  ]}
  columns={3}
  variant="included"
/>
```

### 4. ReviewSection Component
**Dosya:** `/src/components/products/ReviewSection.tsx`

**Özellikler:**
- Star ratings
- Rating distribution chart
- Verified badges
- Helpful votes
- Pagination
- Avatar display

**Kullanım:**
```typescript
import { ReviewSection } from '@/components/products';

<ReviewSection
  reviews={[
    {
      id: '1',
      author: 'Mehmet Yılmaz',
      avatar: 'https://avatar.com/mehmet.jpg',
      rating: 5,
      date: '2024-12-15',
      title: 'Mükemmel hizmet!',
      text: 'Çok keyifli bir deneyimdi...',
      helpful: 127,
      verified: true
    }
  ]}
  averageRating={4.8}
  totalReviews={2847}
  maxReviews={3}
/>
```

---

## REFACTORING IMPLEMENTATION PLAN

### TRANSFERS DETAIL PAGE - TAM ÖRNEK

**Dosya:** `/src/pages/transfers/[slug].tsx`

```typescript
/**
 * Transfer Detail Page - REFACTORED VERSION
 * Uses: ProductHero, BookingWidget, FeatureGrid, ReviewSection
 * Design: Lydian glassmorphism + Modern minimalism
 */

import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ModernHeader } from '@/components/layout/ModernHeader';
import { ProductHero, BookingWidget, FeatureGrid, ReviewSection } from '@/components/products';
import { antalyaAirportTransfers } from '@/data/antalya-transfers';
import { Clock, Navigation, Users, Shield, CheckCircle, Wifi, CreditCard } from 'lucide-react';
import AnimatedCarIcon from '@/components/icons/AnimatedCarIcon';

export default function TransferDetailPage({ transfer, relatedTransfers }) {
  const vehicleLabels = {
    economySedan: 'Ekonomi Sedan (1-3)',
    comfortSedan: 'Konfor Sedan (1-3)',
    vipSedan: 'VIP Sedan (1-3)',
    minivan: 'Minivan (1-7)',
    vipMinivan: 'VIP Minivan (1-7)'
  };

  const vehicleOptions = Object.entries(transfer.pricing).map(([key, price]) => ({
    id: key,
    name: vehicleLabels[key],
    price: price
  }));

  const handleBook = (bookingData) => {
    console.log('Booking data:', bookingData);
    // Redirect to checkout
    router.push({
      pathname: '/checkout',
      query: {
        type: 'transfer',
        id: transfer.id,
        ...bookingData
      }
    });
  };

  return (
    <>
      <ModernHeader />

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* Hero Section with Images */}
        <ProductHero
          title={`${transfer.from.tr} → ${transfer.to.tr}`}
          location="Antalya, Türkiye"
          rating={transfer.rating}
          reviewCount={transfer.totalTransfers}
          images={transfer.images}
          badges={[
            { text: 'D2 Belgeli', icon: <Shield />, color: 'success' },
            { text: 'Anında Rezervasyon', icon: <Zap />, color: 'primary' }
          ]}
          breadcrumbs={[
            { label: 'Transferler', href: '/transfers' },
            { label: 'Antalya', href: '/transfers?city=antalya' }
          ]}
          productType="transfer"
          stats={[
            { icon: <Navigation />, label: 'Mesafe', value: `${transfer.distance} km` },
            { icon: <Clock />, label: 'Süre', value: `${transfer.duration} dk` },
            { icon: <Star />, label: 'Puan', value: `${transfer.rating}/5` },
            { icon: <Users />, label: 'Transfer', value: `${transfer.totalTransfers}+` }
          ]}
        />

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Animated Car Icon */}
              <div className="relative bg-gradient-to-br from-cyan-50/50 via-blue-50/50 to-purple-50/50 p-12 flex items-center justify-center min-h-[300px] rounded-2xl shadow-lg">
                <AnimatedCarIcon size="xl" />
              </div>

              {/* Description */}
              <div className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-lydian-border-light/20">
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">
                  Transfer Hakkında
                </h2>
                <p className="text-lydian-text-muted leading-relaxed whitespace-pre-line">
                  {transfer.longDescription.tr}
                </p>
              </div>

              {/* Features Grid */}
              <div className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-lydian-border-light/20">
                <FeatureGrid
                  title="Öne Çıkan Özellikler"
                  features={transfer.highlights.tr.map(h => ({
                    title: h,
                    included: true
                  }))}
                  columns={2}
                  variant="included"
                />
              </div>

              {/* Route Map */}
              <div className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-lydian-border-light/20">
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">
                  Rota Haritası
                </h2>
                <div className="relative w-full h-96 bg-white/5 rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${encodeURIComponent(transfer.from.en)}&destination=${encodeURIComponent(transfer.to.en)}&mode=driving`}
                  />
                </div>
              </div>

              {/* Reviews */}
              <ReviewSection
                reviews={[
                  {
                    id: '1',
                    author: 'Mehmet Yılmaz',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mehmet',
                    rating: 5,
                    date: '2024-12-15',
                    title: 'Mükemmel transfer hizmeti!',
                    text: 'Profesyonel şoför, temiz araç. Zamanında geldi, güvenli sürüş. Kesinlikle tavsiye ederim.',
                    helpful: 127,
                    verified: true
                  },
                  {
                    id: '2',
                    author: 'Ayşe Demir',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayse',
                    rating: 5,
                    date: '2024-12-10',
                    title: 'Çok memnun kaldık',
                    text: 'Havalimanından otele transferimiz çok rahat geçti. Araç konforlu, fiyat uygun.',
                    helpful: 89,
                    verified: true
                  }
                ]}
                averageRating={transfer.rating}
                totalReviews={transfer.totalTransfers}
                maxReviews={2}
              />
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <BookingWidget
                basePrice={transfer.pricing.economySedan}
                currency="TRY"
                priceLabel="transfer başına"
                savingsPercentage={12}
                productType="transfer"
                requiresDate={true}
                requiresGuests={false}
                requiresVehicle={true}
                vehicleOptions={vehicleOptions}
                badges={[
                  { icon: <Shield />, text: 'Ücretsiz İptal - 24 Saat Öncesine Kadar' },
                  { icon: <CheckCircle />, text: 'Anında Onay - E-posta ile Voucher' },
                  { icon: <Phone />, text: '7/24 Müşteri Desteği' }
                ]}
                cancellationPolicy="Ücretsiz iptal 24 saat öncesine kadar"
                phone="+90 555 123 45 67"
                email="transfer@lydian.com"
                onBook={handleBook}
              />
            </div>
          </div>

          {/* Related Transfers */}
          {relatedTransfers.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-lydian-text-inverse mb-8">
                Benzer Transferler
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTransfers.map(related => (
                  <Link key={related.id} href={`/transfers/${related.seo.slug.tr}`}>
                    <div className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all border border-lydian-border-light/20 cursor-pointer">
                      <div className="relative h-48">
                        <Image
                          src={related.images[0]}
                          alt={`${related.from.tr} - ${related.to.tr}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-lydian-text-inverse mb-2">
                          {related.from.tr} → {related.to.tr}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-lydian-text-muted">
                            {related.distance} km • {related.duration} dk
                          </div>
                          <div className="text-xl font-bold text-blue-400">
                            ₺{related.pricing.economySedan}+
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

// getStaticPaths and getStaticProps remain the same...
```

---

## TASARIM KURALLARı - CHECKLIST

Her detay sayfası için kontrol edilecekler:

### ✅ Header
- [ ] `ModernHeader` component kullanılıyor
- [ ] Dil değiştirici çalışıyor
- [ ] Cart badge gösteriliyor
- [ ] Sticky davranış aktif

### ✅ Hero Section
- [ ] `ProductHero` component kullanılıyor
- [ ] Glassmorphism gradient (blue/purple)
- [ ] Breadcrumb navigation var
- [ ] Stats grid doğru bilgiler gösteriyor
- [ ] Image gallery + lightbox çalışıyor
- [ ] Share & favorite butonları aktif

### ✅ Main Content
- [ ] 2-column layout (lg:col-span-2 + lg:col-span-1)
- [ ] Glassmorphism cards (`bg-lydian-glass-dark/95 backdrop-blur-xl`)
- [ ] Border radius tutarlı (`rounded-2xl`)
- [ ] Spacing tutarlı (`p-6 sm:p-8`)
- [ ] Text colors lydian palette'den

### ✅ Booking Widget
- [ ] `BookingWidget` component kullanılıyor
- [ ] Sticky position (`sticky top-24`)
- [ ] Product type'a uygun fields gösteriliyor
- [ ] Price calculator çalışıyor
- [ ] CTA button gradient (`from-blue-600 to-purple-600`)

### ✅ Features
- [ ] `FeatureGrid` component kullanılıyor
- [ ] Icons mevcut
- [ ] Responsive grid (2/3/4 columns)
- [ ] Hover animations aktif

### ✅ Reviews
- [ ] `ReviewSection` component kullanılıyor
- [ ] Rating distribution chart gösteriliyor
- [ ] Verified badges var
- [ ] Helpful votes çalışıyor

### ✅ Mobile
- [ ] Responsive breakpoints doğru
- [ ] Touch-friendly (min 44x44px tap targets)
- [ ] Swipe gestures image gallery'de
- [ ] Bottom sheet booking (mobile)

### ✅ Performance
- [ ] Images optimized (WebP, lazy loading)
- [ ] Dynamic imports kullanılıyor
- [ ] No layout shift (CLS = 0)
- [ ] 60fps animations

### ✅ i18n
- [ ] `useTranslation` hook kullanılıyor
- [ ] `serverSideTranslations` getStaticProps'ta
- [ ] Tüm text'ler translate ediliyor
- [ ] Locale routing çalışıyor

---

## PRIORITY ORDER

1. **YÜKSEK ÖNCELİK** (Hemen düzelt):
   - Car Rentals Detail (header yok)
   - Tours Detail (SimplifiedHeader yerine ModernHeader)
   - Transfers Detail (RED gradient kaldır, Lydian palette kullan)

2. **ORTA ÖNCELİK** (Bu hafta):
   - Transfers Index (Hero section modernize et)
   - Hotels Detail (component'leri ekle)
   - Rentals Detail (component'leri ekle)

3. **DÜŞÜK ÖNCELİK** (Sonraki sprint):
   - Performance optimizations
   - Lighthouse score 95+ hedefi
   - A/B testing setup

---

## BUILD & TEST

### Development Test
```bash
npm run dev
# Visit:
# http://localhost:3000/transfers/antalya-havalimani-lara-oteller
# http://localhost:3000/tours/atv-quad-safari-antalya
# http://localhost:3000/car-rentals/mercedes-vito-vip
```

### Production Build
```bash
npm run build
npm start
```

### Lighthouse Audit
```bash
npm run lighthouse
# Hedef: 90+ tüm kategorilerde
```

---

## BAŞARI KRİTERLERİ

- [x] Ortak component library oluşturuldu (4 component)
- [ ] Transfers Detail refactor edildi
- [ ] Tours Detail refactor edildi
- [ ] Car Rentals Detail refactor edildi
- [ ] Hotels Detail refactor edildi
- [ ] Rentals Detail refactor edildi
- [ ] Transfers Index modernize edildi
- [ ] Tüm sayfalar responsive
- [ ] Lighthouse score 90+
- [ ] Build başarılı (0 error)
- [ ] i18n all pages working

---

## NEXT STEPS

1. **Transfers Detail sayfasını yukarıdaki örnekle güncelle**
2. **Tours Detail için aynı pattern'i uygula**
3. **Car Rentals için header ekle + refactor yap**
4. **Test et ve fine-tune yap**
5. **Production'a deploy et**

---

**Hazırlayan:** Claude (Sonnet 4.5)
**Tarih:** 2026-01-02
**Durum:** Ready for Implementation
