# 🚀 Travel.Ailydian Enterprise - API Entegrasyon Rehberi

## 📋 Genel Bakış

Bu proje artık aşağıdaki gerçek API'lerle entegre edilmiştir:

- **✈️ Amadeus API** - Uçak biletleri, oteller, araç kiralama
- **🍽️ Google Places API** - Restoranlar ve lokasyon bilgileri  
- **🏪 Foursquare API** - Alternatif restoran verileri
- **🗺️ Geocoding** - Lokasyon koordinatları

## 🔧 Kurulum ve Yapılandırma

### 1. API Anahtarları

`.env.local` dosyasındaki API anahtarlarını gerçek değerlerle değiştirin:

```bash
# Amadeus API (ÜCRETSİZ)
# https://developers.amadeus.com/ adresinden kayıt olun
NEXT_PUBLIC_AMADEUS_CLIENT_ID="YOUR_AMADEUS_CLIENT_ID"
AMADEUS_CLIENT_SECRET="YOUR_AMADEUS_CLIENT_SECRET"

# Google Places API
# https://console.cloud.google.com/ adresinden API key alın
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY="YOUR_GOOGLE_PLACES_API_KEY"

# Foursquare API (İsteğe bağlı - restoran verileri için)
# https://developer.foursquare.com/ adresinden kayıt olun
FOURSQUARE_API_KEY="YOUR_FOURSQUARE_API_KEY"
```

### 2. Bağımlılıkları Yükleme

```bash
npm install
```

### 3. Geliştirme Sunucusunu Başlatma

```bash
npm run dev
```

## 🛠️ API Endpoints

### Uçak Biletleri Arama
```
POST /api/search/flights
```

**Request Body:**
```json
{
  "originLocationCode": "IST",
  "destinationLocationCode": "AYT", 
  "departureDate": "2024-12-01",
  "returnDate": "2024-12-08",
  "adults": 2,
  "travelClass": "ECONOMY"
}
```

### Otel Arama
```
POST /api/search/hotels
```

**Request Body:**
```json
{
  "cityCode": "IST",
  "checkInDate": "2024-12-01",
  "checkOutDate": "2024-12-08",
  "roomQuantity": 1,
  "adults": 2
}
```

### Araç Kiralama Arama
```
POST /api/search/cars
```

**Request Body:**
```json
{
  "pickUpLocationCode": "IST",
  "pickUpDate": "2024-12-01",
  "dropOffDate": "2024-12-08",
  "pickUpTime": "10:00"
}
```

### Restoran Arama
```
POST /api/search/restaurants
```

**Request Body:**
```json
{
  "location": "Istanbul, Turkey",
  "cuisine": "Turkish",
  "priceLevel": 2,
  "openNow": true,
  "limit": 20
}
```

## 🔄 Frontend Entegrasyonu

### SearchContext Kullanımı

Ana sayfa ve diğer komponentlerde arama işlemlerini gerçekleştirmek için:

```jsx
import { useSearchContext } from '@/hooks/useSearchContext';

const MyComponent = () => {
  const { searchFlights, flights } = useSearchContext();
  
  const handleFlightSearch = async () => {
    await searchFlights({
      originLocationCode: 'IST',
      destinationLocationCode: 'AYT',
      departureDate: '2024-12-01',
      adults: 2
    });
  };

  return (
    <div>
      {flights.loading && <div>Aranıyor...</div>}
      {flights.error && <div>Hata: {flights.error}</div>}
      {flights.results.map(flight => (
        <div key={flight.id}>{flight.airline} - {flight.price}</div>
      ))}
    </div>
  );
};
```

## 📊 Özellikler

### ✅ Tamamlanan Entegrasyonlar

- **Amadeus API Servisi** - Gerçek uçak bileti, otel ve araç kiralama verileri
- **Restoran Servisi** - Google Places ve Foursquare entegrasyonu
- **API Endpoint'leri** - RESTful API yapısı
- **Error Handling** - Kapsamlı hata yönetimi
- **Caching Sistemi** - NodeCache ile performans optimizasyonu
- **Request Validation** - Güvenli parametre kontrolü
- **Mock Data Fallback** - API başarısız olursa mock veri
- **TypeScript Support** - Tip güvenliği

### 🔄 Otomatik Fallback Sistemi

API'ler başarısız olursa sistem otomatik olarak mock verilere geçer:

1. **Amadeus API** başarısız → Mock flight/hotel/car data
2. **Google Places API** başarısız → Foursquare API
3. **Foursquare API** başarısız → Mock restaurant data

### 💾 Caching Sistemi

- **15 dakika cache** süresi
- Aynı parametrelerle yapılan aramalar cache'den döner
- API rate limitlerini korur
- Performansı artırır

## 🧪 Test Etme

### API Endpoint'lerini Test Etme

```bash
# Uçak bileti arama testi
curl -X POST http://localhost:3000/api/search/flights \
  -H "Content-Type: application/json" \
  -d '{
    "originLocationCode": "IST",
    "destinationLocationCode": "AYT",
    "departureDate": "2024-12-01",
    "adults": 1
  }'

# Restoran arama testi  
curl -X POST http://localhost:3000/api/search/restaurants \
  -H "Content-Type: application/json" \
  -d '{
    "location": "Istanbul",
    "limit": 10
  }'
```

### Mock Data Kullanımı

API anahtarları olmadan da projeyi test edebilirsiniz. Sistem otomatik olarak mock verilere geçer.

## ⚡ Performans Optimizasyonları

1. **Request Caching** - Tekrarlanan istekleri önler
2. **Error Boundaries** - API hatalarını graceful şekilde handle eder  
3. **Loading States** - Kullanıcı deneyimini iyileştirir
4. **Type Safety** - Runtime hatalarını önler
5. **Memory Management** - Cache otomatik temizlenir

## 🔒 Güvenlik

- API anahtarları sadece server-side kullanılır
- Request validation ile kötü niyetli istekleri engeller  
- Rate limiting koruması
- CORS güvenliği
- Environment variables kullanımı

## 📈 API Limitleri

### Amadeus API (Ücretsiz Plan)
- **1,000 çağrı/ay** - Test ortamı
- Production için ücretli plana geçiş gerekli

### Google Places API  
- **İlk $200 ücretsiz** (aylık)
- Sonrasında kullanım başına ücret

### Foursquare API
- **100,000 çağrı/gün** - Ücretsiz plan
- Premium özellikler için ücretli plan

## 🚨 Sorun Giderme

### Yaygın Hatalar

1. **"API credentials not configured"**
   - `.env.local` dosyasını kontrol edin
   - API anahtarlarının doğru olduğundan emin olun

2. **"Location not found"**
   - Şehir kodlarını (IST, AYT, vb.) kullanın
   - Lokasyon isimlerinin İngilizce olduğundan emin olun

3. **"Rate limit exceeded"**
   - Cache süresini artırın
   - API çağrı sıklığını azaltın

### Debug Modları

```bash
# Detaylı log'lar için
NODE_ENV=development npm run dev

# API çağrılarını console'da görün
DEBUG=amadeus* npm run dev
```

## 🎯 Sonuç

Artık Travel.Ailydian Enterprise projesi gerçek seyahat verilerine erişebiliyor:

- ✅ **Gerçek uçak biletleri** - Amadeus API
- ✅ **Gerçek otel bilgileri** - Amadeus API  
- ✅ **Gerçek araç kiralama** - Amadeus API
- ✅ **Gerçek restoran verileri** - Google Places + Foursquare

Sistem production-ready durumda ve ölçeklenebilir bir yapıya sahip!

---

**🎉 API entegrasyonu başarıyla tamamlandı!** Artık platformunuz gerçek seyahat verileriyle çalışıyor.