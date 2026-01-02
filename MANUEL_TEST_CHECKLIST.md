# 📋 MANUEL TEST KONTROL LİSTESİ

## Test URL'leri (localhost:3100)

### ✅ 1. ANA SAYFA → TUR AKIŞI
```
□ http://localhost:3100/ (Ana sayfa)
  - [ ] Slider çalışıyor mu?
  - [ ] Search bar görünüyor mu?
  - [ ] Featured tours listeleniyor mu?
  - [ ] Images yükleniyor mu?

□ http://localhost:3100/tours (Tur listesi)
  - [ ] Tour kartları görünüyor mu?
  - [ ] Filter çalışıyor mu?
  - [ ] Sort fonksiyonu çalışıyor mu?
  - [ ] Price displayed correctly?

□ Herhangi bir tur detayına tıkla
  - [ ] Tour detail sayfası açılıyor mu?
  - [ ] Booking widget görünüyor mu?
  - [ ] Reviews section var mı?
  - [ ] Add to cart çalışıyor mu?
```

### ✅ 2. DİL DEĞİŞTİRME (8 Dil Döngüsü)
```
□ TR → EN (http://localhost:3100/en)
  - [ ] Page reloads with EN content
  - [ ] URL changes to /en/
  - [ ] Nav menu in English

□ EN → DE (http://localhost:3100/de)
  - [ ] German content loads
  - [ ] Currency changes to EUR

□ DE → RU (http://localhost:3100/ru)
  - [ ] Russian content loads
  - [ ] Cyrillic alphabet renders

□ RU → AR (http://localhost:3100/ar)
  - [ ] Arabic content loads
  - [ ] RTL layout active (text right-aligned)

□ AR → FA (http://localhost:3100/fa)
  - [ ] Persian content loads
  - [ ] RTL maintained

□ FA → FR (http://localhost:3100/fr)
  - [ ] French content loads
  - [ ] LTR layout restored

□ FR → EL (http://localhost:3100/el)
  - [ ] Greek content loads
  - [ ] Greek alphabet renders

□ EL → TR (http://localhost:3100/tr)
  - [ ] Back to Turkish
  - [ ] FULL CYCLE COMPLETE ✓
```

### ✅ 3. MOBİL RESPONSIVE (Chrome DevTools)
```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)

□ 320px (iPhone SE)
  - [ ] Hamburger menu görünüyor
  - [ ] Content stacks vertically
  - [ ] Buttons tappable (min 44px)
  - [ ] No horizontal scroll

□ 375px (iPhone X)
  - [ ] Images responsive
  - [ ] Cards stack properly
  - [ ] Footer readable

□ 768px (iPad Portrait)
  - [ ] 2-column grid
  - [ ] Tablet navigation
  - [ ] Touch-friendly

□ 1024px (iPad Pro Landscape)
  - [ ] 3-column grid
  - [ ] Desktop-like nav
  - [ ] Sidebar visible

□ 1920px (Desktop)
  - [ ] Full desktop layout
  - [ ] Max-width containers
  - [ ] No excessive whitespace
```

### ✅ 4. KRİTİK SAYFALAR VISUAL CHECK
```
□ http://localhost:3100/ (Homepage)
  - [ ] Glassmorphism theme OK
  - [ ] No broken images
  - [ ] Animations smooth

□ http://localhost:3100/tours (Tours)
  - [ ] Tour cards styled
  - [ ] Blue-purple gradients
  - [ ] Hover effects work

□ http://localhost:3100/hotels (Hotels)
  - [ ] Hotel listings OK
  - [ ] Filters functional
  - [ ] Booking button visible

□ http://localhost:3100/transfers (Transfers)
  - [ ] Transfer cards OK
  - [ ] Route selector works
  - [ ] No RED colors

□ http://localhost:3100/car-rentals (Car Rentals)
  - [ ] Car cards displayed
  - [ ] Date picker works
  - [ ] Price calculator OK

□ http://localhost:3100/destinations (Destinations)
  - [ ] Destination grid OK
  - [ ] Category filters work
  - [ ] Search functional

□ http://localhost:3100/auth/signin (Sign In)
  - [ ] Form fields visible
  - [ ] Glassmorphism applied
  - [ ] Submit button works

□ http://localhost:3100/auth/signup (Sign Up)
  - [ ] Registration form OK
  - [ ] Password strength indicator
  - [ ] Terms checkbox
```

### ✅ 5. CONSOLE HATALARI
```
□ Chrome DevTools Console (F12)
  - [ ] Zero JavaScript errors
  - [ ] No 404 image errors
  - [ ] No CORS issues
  - [ ] i18n warnings only (expected)
```

### ✅ 6. NETWORK PERFORMANCE
```
□ Chrome DevTools Network Tab
  - [ ] Initial load < 3s
  - [ ] Images optimized (WebP/AVIF)
  - [ ] CSS/JS minified
  - [ ] No failed requests
```

---

## Test Sonuçları

**Tarih**: 2026-01-02
**Tester**: Manuel QA
**Build**: Development (localhost:3100)

### Başarılı Testler:
- [ ] Ana sayfa → Tur akışı
- [ ] 8 dil döngüsü
- [ ] Mobil responsive
- [ ] Visual QA
- [ ] Console temiz
- [ ] Performance OK

### Bulunan Hatalar:
(Boş bırakılacak - manuel test sonrası doldurulacak)

---

**Sonraki Adım**: Eğer tüm testler geçerse → Production build test

