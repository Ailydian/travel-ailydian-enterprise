/**
 * Comprehensive Help Center Page - Holiday.AILYDIAN.com
 * Inspired by GetYourGuide, Viator, Booking.com, TripAdvisor
 *
 * Features:
 * - 60+ FAQs across 8 categories
 * - Animated search with Framer Motion
 * - Expandable accordions
 * - 24/7 support section
 * - Mobile responsive
 * - Turkish content with real data
 */

import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ModernHeader } from '../components/layout/ModernHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import {
  Search,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Plane,
  Car,
  Bus,
  XCircle,
  User,
  Shield,
  Settings,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  HelpCircle,
  Award,
  Globe,
  Calendar,
  MapPin,
  Compass,
  Hotel } from 'lucide-react';

// FAQ Categories with detailed questions
interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
// REZERVASYON VE ÖDEME (Booking & Payment) - 12 questions
{
  id: 1,
  category: 'rezervasyon',
  question: 'Nasıl rezervasyon yapabilirim?',
  answer: 'Rezervasyon yapmak çok kolay: 1) İstediğiniz ürünü (tur, transfer, araç) seçin. 2) Tarih ve katılımcı sayısını belirleyin. 3) "Sepete Ekle" butonuna tıklayın. 4) Sepete gidin ve "Ödemeye Geç" ile rezervasyonunuzu tamamlayın. Tüm rezervasyonlarınız hesabınızın "Seyahatlerim" bölümünde görüntülenebilir.'
},
{
  id: 2,
  category: 'rezervasyon',
  question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
  answer: 'Tüm kredi kartlarını (Visa, Mastercard, American Express), banka kartlarını, havale/EFT ve kripto para ödemelerini kabul ediyoruz. Taksit seçenekleri için bankanızın kampanyalarını kontrol edebilirsiniz. Ödemeleriniz 256-bit SSL şifreleme ile korunur.'
},
{
  id: 3,
  category: 'rezervasyon',
  question: 'Rezervasyonumu nasıl onaylayabilirim?',
  answer: 'Ödeme işlemi tamamlandıktan sonra e-posta adresinize rezervasyon onay belgesi (voucher) gönderilir. Bu belgeyi tur günü rehberinize göstermeniz yeterlidir. Dijital veya basılı olarak kullanabilirsiniz. Ayrıca hesabınızın "Seyahatlerim" bölümünden de ulaşabilirsiniz.'
},
{
  id: 4,
  category: 'rezervasyon',
  question: 'Son dakika rezervasyonu yapabilir miyim?',
  answer: 'Evet, ürünün müsaitlik durumuna göre tur gününden 24 saat öncesine kadar rezervasyon yapabilirsiniz. Bazı turlar için anlık onay (instant confirmation) sağlanır. Transfer ve araç kiralama hizmetleri için en az 6 saat öncesinden rezervasyon yapmanızı öneririz.'
},
{
  id: 5,
  category: 'rezervasyon',
  question: 'Rezervasyonumu değiştirebilir miyim?',
  answer: 'Rezervasyon değişiklikleri ürün tipine ve iptal politikasına göre değişir. Turlar için genellikle 48 saat öncesine kadar ücretsiz değişiklik yapılabilir. Transfer ve araç kiralama için 24 saat öncesine kadar değişiklik yapabilirsiniz. Müşteri hizmetlerimize başvurarak yeni tarih talebi oluşturabilirsiniz.'
},
{
  id: 6,
  category: 'rezervasyon',
  question: 'Grup rezervasyonu için indirim var mı?',
  answer: 'Evet! 10 kişi ve üzeri grup rezervasyonlarında %15\'e varan indirimler sunuyoruz. Grup rezervasyonu için info@lydian.com adresine grup büyüklüğü, tarih ve destinasyon bilgilerini gönderin. Özel grup fiyatı teklifi 24 saat içinde tarafınıza iletilecektir.'
},
{
  id: 7,
  category: 'rezervasyon',
  question: 'Çocuklar için özel fiyat var mı?',
  answer: 'Evet, çoğu turda 4-11 yaş arası çocuklar için %30-50 indirimli çocuk fiyatı uygulanır. 0-3 yaş arası bebekler genellikle ücretsizdir (koltuk kullanmıyorsa). Her ürünün detay sayfasında çocuk fiyatlandırması belirtilmiştir.'
},
{
  id: 8,
  category: 'rezervasyon',
  question: 'Rezervasyonuma özel talep ekleyebilir miyim?',
  answer: 'Elbette! Rezervasyon sırasında "Özel Talepler" bölümüne diyet kısıtlamaları, engelli erişimi, çocuk koltuğu, dil tercihi gibi taleplerinizi yazabilirsiniz. Taleplerinizi mümkün olduğunca karşılamaya çalışacağız. Garanti için rezervasyon sonrası müşteri hizmetlerimizi arayabilirsiniz.'
},
{
  id: 9,
  category: 'rezervasyon',
  question: 'Fiyatlar TL cinsinden mi?',
  answer: 'Evet, tüm fiyatlarımız Türk Lirası (TL) cinsindendir. Yurtdışından rezervasyon yapıyorsanız, kredi kartınız güncel döviz kuruyla TL\'yi kendi para birimine çevirir. Fiyatlara KDV dahildir ve gizli ücret yoktur. Gördüğünüz fiyat = ödeyeceğiniz fiyat.'
},
{
  id: 10,
  category: 'rezervasyon',
  question: 'Rezervasyon voucher\'ımı kaybettim, ne yapmalıyım?',
  answer: 'Endişelenmeyin! Hesabınıza giriş yaparak "Seyahatlerim" bölümünden voucher\'ınızı tekrar indirebilirsiniz. Alternatif olarak kayıtlı e-posta adresinize de gönderilmiştir. Voucher\'a ulaşamıyorsanız, rezervasyon numaranız ile WhatsApp hattımızdan (0850 123 45 67) anında yeni voucher gönderebiliriz.'
},
{
  id: 11,
  category: 'rezervasyon',
  question: 'Fiyat garantisi nedir?',
  answer: 'En İyi Fiyat Garantisi: Aynı ürünü başka bir sitede daha ucuza bulursanız, fark kadar indirim yapıyoruz + ekstra %5 bonus. Rezervasyon sonrası 24 saat içinde diğer sitenin linkini ve ekran görüntüsünü bize gönderin. Onay sonrası fark tutarı hesabınıza yüklenecektir.'
},
{
  id: 12,
  category: 'rezervasyon',
  question: 'Mobil uygulama var mı?',
  answer: 'Şu anda mobil uygulamamız geliştirme aşamasındadır. Ancak web sitemiz tamamen mobil uyumludur (responsive) ve tüm işlemleri telefonunuzun tarayıcısından rahatlıkla yapabilirsiniz. Uygulamamız 2026 Q2\'de yayınlanacaktır.'
},

// TURLAR (Tours) - 11 questions
{
  id: 13,
  category: 'turlar',
  question: 'Tur fiyatına neler dahil?',
  answer: 'Tur fiyatına genellikle: Otel transfer (belirtilen bölgelerden), profesyonel rehber, giriş ücretleri, öğle yemeği (full-day turlarda), sigorta, belirtilen aktiviteler ve ekipmanlar dahildir. Her turun detay sayfasında "Fiyata Dahil" ve "Fiyata Dahil Değil" bölümleri açıkça belirtilmiştir.'
},
{
  id: 14,
  category: 'turlar',
  question: 'Otelden alınıp bırakılıyor muyum?',
  answer: 'Evet! Çoğu turda Antalya merkez, Kemer, Belek, Side, Alanya gibi ana bölgelerden ücretsiz otel transferi sağlanır. Transfer bölgeniz dahil değilse, ek ücret karşılığında özel transfer ayarlanabilir veya buluşma noktasına kendiniz gidebilirsiniz. Transfer saati rezervasyon sonrası SMS ile bildirilir.'
},
{
  id: 15,
  category: 'turlar',
  question: 'Turlarda rehber var mı? Hangi dillerde?',
  answer: 'Tüm turlarda TUREB sertifikalı profesyonel rehberler eşlik eder. Türkçe ve İngilizce rehberlik standart olarak sunulur. Rusça, Almanca, Fransızca rehber talebi için rezervasyon sırasında belirtmeniz yeterli (bazı turlar için ek ücret alınabilir).'
},
{
  id: 16,
  category: 'turlar',
  question: 'Tur iptal olursa ne olur?',
  answer: 'Hava şartları, katılımcı sayısı (minimum kontenjan dolmadıysa) veya olağanüstü durumlar sebebiyle tur iptal olursa 48 saat öncesinden tarafınıza bildirilir. %100 iade veya alternatif tarih/tur seçeneği sunulur. İptal durumunda hiçbir ücret ödemezsiniz.'
},
{
  id: 17,
  category: 'turlar',
  question: 'Turlarda yemek var mı? Diyet seçenekleri?',
  answer: 'Full-day (tam gün) turlarda açık büfe öğle yemeği dahildir. Vejeteryan, vegan, gluten-free, helal, hamursuz gibi diyet seçenekleri mevcuttur. Özel diyet ihtiyacınızı rezervasyon sırasında "Özel Talepler" bölümünde belirtmeniz yeterli. Half-day turlarda genellikle yemek dahil değildir.'
},
{
  id: 18,
  category: 'turlar',
  question: 'Tura ne getirmeliyim?',
  answer: 'Genel öneriler: Rahat giysiler, güneş kremi (SPF 50+), şapka/güneş gözlüğü, su şişesi, fotoğraf makinesi, yüzme kıyafeti (tekne/su turları için), su ayakkabısı (rafting/macera turları için), nakit para (ekstra harcamalar için). Her tur için özel tavsiyeler rezervasyon onay mailinde belirtilir.'
},
{
  id: 19,
  category: 'turlar',
  question: 'Hamile kadınlar veya sağlık sorunu olanlar tura katılabilir mi?',
  answer: 'Rahat seviye turlara (tekne turu, şehir turu, kültür turu) hamile kadınlar katılabilir ancak macera turları (rafting, ATV, paragliding) önerilmez. Kalp, sırt, diz rahatsızlığı olanlar için tur detaylarında uyarılar belirtilir. Sağlık durumunuz hakkında mutlaka rezervasyon öncesi bilgi verin.'
},
{
  id: 20,
  category: 'turlar',
  question: 'Turda fotoğraf servisi var mı?',
  answer: 'Bazı turlarda (rafting, paragliding, dalış) profesyonel fotoğraf/video servisi opsiyonel olarak sunulur (150-300 TL arası). Fotoğraflar GoPro veya drone ile çekilir ve aynı gün dijital olarak teslim edilir. Kendi kameranızı da getirebilirsiniz ancak güvenlik nedeniyle bazı aktivitelerde kullanım sınırlıdır.'
},
{
  id: 21,
  category: 'turlar',
  question: 'Tur boyunca sigorta var mı?',
  answer: 'Evet! Tüm turlarda kaza ve sağlık sigortası dahildir. Macera turlarında (rafting, dalış, paragliding) ekstra spor sigortası otomatik olarak yapılır. Sigortanız tur sırasında oluşabilecek yaralanma, kaza ve acil tıbbi müdahaleyi kapsar. Sigorta şirketimiz Mapfre Sigorta\'dır.'
},
{
  id: 22,
  category: 'turlar',
  question: 'Çocuk yaş sınırı var mı?',
  answer: 'Tur tipine göre değişir: Tekne turları 0+, Jeep Safari 5+, Rafting 8+, ATV 16+ (sürücü için, yolcu 8+), Paragliding 16+, Dalış 14+. Her turun "Minimum Yaş" bilgisi detay sayfasında belirtilir. Çocuk güvenliği için yaş sınırlarına kesinlikle uyulması gerekir.'
},
{
  id: 23,
  category: 'turlar',
  question: 'Turu erken terk edebilir miyim?',
  answer: 'Acil durumlarda turu erken terk edebilirsiniz ancak ücret iadesi yapılmaz. Sağlık problemi gibi zorunlu durumlarda rehberiniz size yardımcı olur ve otele dönüş için araç ayarlanır (ek ücret alınabilir). Kendi aracınız varsa buluşma noktasına kendi dönüşünüzü sağlayabilirsiniz.'
},

// TRANSFERLER (Transfers) - 9 questions
{
  id: 24,
  category: 'transferler',
  question: 'Transfer hizmeti nedir?',
  answer: 'Transfer, havalimanı/otel arasında özel araç ile güvenli ulaşım hizmetidir. Profesyonel şoförümüz sizi karşılar, bagajınızı taşır ve konforlu araçla destinasyonunuza götürür. Özel (private), paylaşımlı (shared) ve VIP transfer seçenekleri mevcuttur.'
},
{
  id: 25,
  category: 'transferler',
  question: 'Transfer fiyatları nasıl hesaplanır?',
  answer: 'Transfer fiyatları mesafe, araç tipi ve kişi sayısına göre değişir. Örnek fiyatlar: Antalya Havalimanı - Kemer (40 km) 650 TL (sedan), Side (75 km) 850 TL, Alanya (135 km) 1.250 TL. VIP araçlar (Mercedes V-Class) %40 daha pahalıdır. Fiyatlar araç başınadır, kişi başı değil.'
},
{
  id: 26,
  category: 'transferler',
  question: 'Kaç kişilik araçlar var?',
  answer: 'Sedan (3 kişi + bagaj), Minivan (7 kişi + bagaj), Minibüs (14 kişi + bagaj), Otobüs (30+ kişi) araçlarımız mevcuttur. Tüm araçlar klimalı, temiz ve 3 yıldan yeni. Bebek için bebek koltuğu, tekerlekli sandalye için engelli erişimli araç ücretsiz sağlanır (rezervasyon sırasında belirtilmeli).'
},
{
  id: 27,
  category: 'transferler',
  question: 'Gece transfer ücreti var mı?',
  answer: 'Gece transferleri (00:00-06:00 arası) için %20 ek ücret uygulanır. Havalimanı karşılama hizmetinde uçuş gecikmesi durumunda ek ücret alınmaz, şoför bekleme yapar. Maksimum 2 saat bekleme ücretsizdir, sonrası için saat başı 100 TL ücret uygulanır.'
},
{
  id: 28,
  category: 'transferler',
  question: 'Uçuşum gecikirse transfer iptal olur mu?',
  answer: 'Hayır! Uçuş takip sistemimiz sayesinde uçuş gecikmelerini otomatik takip ederiz. Şoförünüz yeni varış saatine göre havalimanında sizi bekler. 2 saate kadar gecikme ücretsizdir. Uçuşunuz iptal olursa, transfer ücreti %100 iade edilir veya yeni tarih ayarlanır.'
},
{
  id: 29,
  category: 'transferler',
  question: 'Transferde bebek koltuğu var mı?',
  answer: 'Evet, ücretsiz! 0-1 yaş için bebek taşıma koltuğu, 1-4 yaş için çocuk koltuğu, 4-12 yaş için yükseltici koltuk (booster) sağlanır. Rezervasyon sırasında çocukların yaşını belirtmeniz yeterli. Tüm koltuklar ECE R44/04 standartlarına uygundur.'
},
{
  id: 30,
  category: 'transferler',
  question: 'Transfer iptalinde ücret iadesi var mı?',
  answer: 'Transfer saatinden 24 saat öncesine kadar yapılan iptallerde %100 ücret iadesi yapılır. 24 saat içinde yapılan iptallerde %50 ücret kesilir. No-show (gelmeme) durumunda iade yapılmaz. Uçuş iptali gibi zorunlu durumlarda belge ile tam iade sağlanır.'
},
{
  id: 31,
  category: 'transferler',
  question: 'Şoför havalimanında nasıl bulur beni?',
  answer: 'Şoförünüz varış terminalinde, bagaj teslim sonrası çıkış kapısında, isim yazılı karşılama tabelası ile sizi bekler. Rezervasyon sonrası şoför adı, telefonu ve araç plakası SMS ile gönderilir. Buluşma sorunu olursa 7/24 destek hattımızı arayabilirsiniz.'
},
{
  id: 32,
  category: 'transferler',
  question: 'Paylaşımlı transfer nedir? Özel transferden farkı?',
  answer: 'Paylaşımlı transfer: Aynı rotada seyahat eden diğer yolcularla minivan paylaşımıdır. %40 daha ucuzdur ancak diğer otellere uğradığı için 30-60 dk daha uzun sürer. Özel transfer: Sadece sizin grubunuza özel araç, direkt ulaşım, maksimum konfor. Tercih tamamen size kalmış.'
},

// ARAÇ KİRALAMA (Car Rentals) - 10 questions
{
  id: 33,
  category: 'arackiralama',
  question: 'Araç kiralamak için gerekli belgeler nedir?',
  answer: 'Gerekli belgeler: 1) Geçerli sürücü belgesi (en az 2 yıllık), 2) Kimlik veya pasaport, 3) Kredi kartı (depozito için). Yabancı sürücü belgeleri kabul edilir. 21 yaş altı ve 70 yaş üstü kiralamada kısıtlamalar olabilir. Uluslararası sürücü belgesi önerilir ancak zorunlu değil.'
},
{
  id: 34,
  category: 'arackiralama',
  question: 'Kiralama fiyatına neler dahil?',
  answer: 'Fiyata dahil: Sınırsız kilometre, trafik sigortası, kasko sigortası (muafiyet dahilinde), 7/24 yol yardım, havalimanı teslim/iade, bir tank yakıt, ek sürücü (ücret karşılığı). Dahil değil: Yaş indirimi (21-25 yaş arası), GPS cihazı (günlük 50 TL), bebek koltuğu (günlük 50 TL), tam kasko (günlük 100 TL).'
},
{
  id: 35,
  category: 'arackiralama',
  question: 'Depozito ne kadar? Nasıl iade edilir?',
  answer: 'Depozito araç sınıfına göre değişir: Ekonomi 2.000-2.500 TL, Kompakt 2.500-3.000 TL, SUV 3.500-4.500 TL, Lüks 5.000+ TL. Depozito kredi kartınızdan bloke edilir (çekilmez). Araç hasarsız iade edildiğinde 7-14 iş günü içinde bloke kaldırılır. Hasar varsa depozito kullanılır, kalan iade edilir.'
},
{
  id: 36,
  category: 'arackiralama',
  question: 'Yakıt politikası nedir?',
  answer: 'Standart politika: Dolu-Dolu (Full-Full). Araç size full tank teslim edilir, siz de full döndürürsünüz. Tank boş ise, eksik yakıt + %20 hizmet bedeli tahsil edilir. Alternatif: Ön ödeme yaparak ilk tankı alırsınız, boş iade edersiniz (ekonomik değildir). Yakıt fişlerini saklayın.'
},
{
  id: 37,
  category: 'arackiralama',
  question: 'Araçları başka şehre götürebilir miyim?',
  answer: 'Evet, Türkiye içinde tüm şehirlere seyahat edebilirsiniz. Tek yön kiralama (örnek: Antalya\'da al, İstanbul\'da bırak) mümkündür ancak 1.500-3.000 TL arası "tek yön ücreti" uygulanır. Yurtdışına araç çıkışı yasaktır. Kıbrıs, Yunanistan gibi destinasyonlara gidiş için özel izin gerekir.'
},
{
  id: 38,
  category: 'arackiralama',
  question: 'Kaza yaparsam ne olur?',
  answer: 'Kasko sigortamız sayesinde kendi hata payınız (muafiyet) kadar ödeme yaparsınız: Ekonomi araç 2.000 TL, SUV 3.500 TL, Lüks 5.000 TL muafiyet. Tam kasko (CDW) opsiyonunu seçerseniz muafiyeti 0 TL\'ye düşürürsünüz. Kaza durumunda: 1) Polis çağırın (gerekirse), 2) Kaza tutanağı alın, 3) Bizi hemen arayın (7/24 yol yardım).'
},
{
  id: 39,
  category: 'arackiralama',
  question: 'Araç yaş sınırı var mı?',
  answer: 'Minimum yaş 21, sürücü belgesi 2 yıllık olmalı. 21-25 yaş arası "genç sürücü ücreti" günlük 100 TL ek ücret. Maksimum yaş 70. Üst segment ve lüks araçlar için minimum yaş 25, sürücü belgesi 5 yıllık. Yaş dışı kiralama talebi için özel başvuru gerekir (ek primler uygulanır).'
},
{
  id: 40,
  category: 'arackiralama',
  question: 'Araç iptalinde ücret var mı?',
  answer: 'İptal koşulları: 7+ gün öncesi %100 iade, 3-7 gün arası %50 iade, 3 gün içinde iade yok. No-show (gelmeme) durumunda toplam ücretin %100\'ü tahsil edilir. Seyahat sigortası satın aldıysanız, tıbbi zorunluluk gibi durumlarda tam iade alabilirsiniz.'
},
{
  id: 41,
  category: 'arackiralama',
  question: 'Ek ekipman (GPS, bebek koltuğu) ücreti ne kadar?',
  answer: 'Ek ekipman ücretleri (günlük): GPS 50 TL, Bebek koltuğu (0-1 yaş) 50 TL, Çocuk koltuğu (1-4 yaş) 50 TL, Booster (4-12 yaş) 40 TL, Kar zinciri (kış ayları) 80 TL, Roof box (bagaj kutusu) 150 TL. Rezervasyon sırasında eklemeyi unutmayın, yerinde stok bulunmayabilir.'
},
{
  id: 42,
  category: 'arackiralama',
  question: 'Aracı erken/geç iade edebilir miyim?',
  answer: 'Erken iade: Kullanılmayan günler için iade yapılmaz (haftalık/aylık paketler hariç). Geç iade: Belirlenen saatten 1 saat sonraya kadar tolerans var. 1-6 saat geç için günlük ücretin %50\'si, 6+ saat geç için tam gün ücreti tahsil edilir. Gecikme durumunda mutlaka bizi arayın.'
},

// İPTAL VE İADE (Cancellation & Refunds) - 9 questions
{
  id: 43,
  category: 'iptal',
  question: 'Rezervasyonumu nasıl iptal edebilirim?',
  answer: 'İptal için 3 yöntem: 1) Web: Hesabınıza giriş yapın > "Seyahatlerim" > Rezervasyon seçin > "İptal Et" butonuna tıklayın. 2) Telefon: 0850 123 45 67 numaralı çağrı merkezini arayın. 3) E-posta: info@lydian.com adresine rezervasyon numaranızla iptal talebi gönderin. İptal onayı e-posta ile gelir.'
},
{
  id: 44,
  category: 'iptal',
  question: 'İptal ücreti ne kadar?',
  answer: 'İptal ücretleri ürün tipine göre değişir: Turlar - 24 saat öncesine kadar ücretsiz, 24 saat içinde %50 kesinti. Transferler - 24 saat öncesi ücretsiz, sonrası %50 kesinti. Araç kiralama - 7 gün öncesi ücretsiz, 3-7 gün arası %50 kesinti, 3 gün içinde tam ücret. Detaylar her ürünün iptal politikasında belirtilir.'
},
{
  id: 45,
  category: 'iptal',
  question: 'İade süresi ne kadar?',
  answer: 'İade süreleri ödeme yöntemine göre değişir: Kredi kartı 7-14 iş günü, Banka kartı 5-10 iş günü, Havale/EFT 3-5 iş günü, Kripto para 1-2 iş günü. İade aynı ödeme yöntemiyle yapılır. İade işlemi başlatıldığında e-posta ile bilgilendirme yapılır. Hesabınızın "İşlem Geçmişi" bölümünden takip edebilirsiniz.'
},
{
  id: 46,
  category: 'iptal',
  question: 'İptal sigortası nedir? Nasıl kullanılır?',
  answer: 'İptal Sigortası: Rezervasyon tutarının %5\'i karşılığında, hastalık, kaza, vize reddi, ölüm gibi zorunlu durumlarda %100 iade garantisi. Kullanımı: İptal sebebinizi belgeleyin (doktor raporu, hastane çıkışı, vize ret mektubu vb.), sigorta şirketine gönderin, 48 saat içinde onay alın, tam iade yapılır.'
},
{
  id: 47,
  category: 'iptal',
  question: 'Hava durumu nedeniyle iptal olursa ne olur?',
  answer: 'Hava şartları (fırtına, yoğun yağış, kar) nedeniyle tur/transfer iptal edilirse %100 ücret iadesi veya alternatif tarih seçeneği sunulur. İptal kararı güvenlik nedeniyle yetkili mercilerce alınır. Müşteri memnuniyetsizliği veya kişisel tercih nedeniyle hava durumunu sebep göstererek iptal tam ücret kesintisine tabidir.'
},
{
  id: 48,
  category: 'iptal',
  question: 'Rezervasyonumu değiştirmek iptal sayılır mı?',
  answer: 'Hayır! Tarih/saat değişikliği iptal sayılmaz. 48 saat öncesine kadar ücretsiz değişiklik yapabilirsiniz. Katılımcı sayısı artırma ücretsiz, azaltma için fark iadesi yapılmaz. Ürün değişikliği (örnek: rafting > jeep safari) iptal edip yeni rezervasyon gerektirir, iptal ücretleri geçerlidir.'
},
{
  id: 49,
  category: 'iptal',
  question: 'Kısmi iptal yapabilir miyim?',
  answer: 'Evet. Örneğin 5 kişilik rezervasyondan 2 kişi iptal olmak istiyorsa, kısmi iptal yapılabilir. İptal edilen kişi sayısı için ücret iadesi yapılır. Ancak grup indirimi almışsanız ve kişi sayısı azalmasıyla grup kontenjanının altına düşülüyorsa, fark ücret yeni rezervasyondan tahsil edilir.'
},
{
  id: 50,
  category: 'iptal',
  question: 'No-show (gelmeme) durumunda iade var mı?',
  answer: 'No-show (rezervasyon saatinde gelmeme, iptal bildirimi yapmama) durumunda ücret iadesi yapılmaz. Geçerli bir mazeret (hastane raporu, kaza, uçuş iptali vb.) belgelerseniz, durum değerlendirmeye alınır ve kısmi iade yapılabilir. Bu sebeple mutlaka iptal bildirimi yapın.'
},
{
  id: 51,
  category: 'iptal',
  question: 'İade ücretim eksik geldi, ne yapmalıyım?',
  answer: 'İade tutarı, iptal ücretleri ve muafiyetler çıkarıldıktan sonraki net tutar olarak yapılır. Hesabınızın "İşlem Detayları" bölümünde kesintilerin dökümünü görebilirsiniz. Eksiklik olduğunu düşünüyorsanız, finansal işlemler ekibimize (finans@lydian.com) başvurun, 48 saat içinde inceleme yapılır.'
},

// HESAP VE PROFİL (Account & Profile) - 7 questions
{
  id: 52,
  category: 'hesap',
  question: 'Nasıl hesap oluşturabilirim?',
  answer: 'Hesap oluşturma çok kolay: 1) Sağ üst köşeden "Kayıt Ol" butonuna tıklayın. 2) E-posta, şifre ve ad-soyad bilgilerinizi girin. 3) E-postanıza gelen aktivasyon linkine tıklayın. 4) Hesabınız aktif! Alternatif: Google veya Facebook hesabınızla hızlı kayıt yapabilirsiniz.'
},
{
  id: 53,
  category: 'hesap',
  question: 'Şifremi unuttum, ne yapmalıyım?',
  answer: 'Şifre sıfırlama: 1) Giriş sayfasında "Şifremi Unuttum" linkine tıklayın. 2) Kayıtlı e-posta adresinizi girin. 3) E-postanıza gelen şifre sıfırlama linkine tıklayın (15 dakika geçerli). 4) Yeni şifrenizi oluşturun. E-posta gelmiyorsa spam/gereksiz klasörünü kontrol edin.'
},
{
  id: 54,
  category: 'hesap',
  question: 'Hesap bilgilerimi nasıl güncellerim?',
  answer: 'Bilgi güncelleme: Hesabınıza giriş yapın > "Profilim" > İlgili alanı düzenleyin (ad-soyad, telefon, adres, pasaport bilgisi vb.) > "Kaydet" butonuna tıklayın. E-posta değişikliği için doğrulama gerekir. Profil fotoğrafı yükleyebilir, tercihlerinizi (dil, para birimi, bildirimler) özelleştirebilirsiniz.'
},
{
  id: 55,
  category: 'hesap',
  question: 'Puan sistemi nasıl çalışır?',
  answer: 'Her rezervasyonda harcadığınız tutarın %2\'si puan olarak kazanılır (100 TL harcama = 2 puan). 100 puan = 10 TL indirim. Puanlar rezervasyonda otomatik uygulanabilir veya manuel seçebilirsiniz. Puanlar 1 yıl geçerlidir. Özel kampanyalarda bonus puan kazanabilirsiniz (yılbaşı, yaz kampanyaları %5 puan).'
},
{
  id: 56,
  category: 'hesap',
  question: 'Hesabımı silebilir miyim?',
  answer: 'Evet. "Profilim" > "Hesap Ayarları" > "Hesabımı Sil" butonuna tıklayın. Hesap silme işlemi geri alınamaz! Aktif rezervasyonlarınız varsa silme yapılamaz, önce rezervasyonları iptal edin. Hesap silindikinde tüm verileriniz KVKK uyarınca kalıcı olarak silinir. Puanlarınız kaybolur.'
},
{
  id: 57,
  category: 'hesap',
  question: 'Rezervasyon geçmişimi nasıl görürüm?',
  answer: 'Hesabınıza giriş yapın > "Seyahatlerim" bölümünde tüm geçmiş, aktif ve gelecek rezervasyonlarınız listelenir. Filtreler: Aktif, Tamamlanan, İptal Edilen, Tümü. Her rezervasyonun detaylarını görüntüleyebilir, voucher indirebilir, yorum yazabilir, tekrar rezervasyon yapabilirsiniz.'
},
{
  id: 58,
  category: 'hesap',
  question: 'E-posta bildirimlerini kapatabilir miyim?',
  answer: 'Evet. "Profilim" > "Bildirim Tercihleri" bölümünden: Promosyon e-postaları, kampanya duyuruları, blog yazıları bildirimlerini kapatabilirsiniz. Ancak rezervasyon onayı, iptal bildirimi, ödeme hatırlatıcısı gibi işlemsel e-postalar güvenlik nedeniyle kapatılamaz. SMS bildirimlerini de aynı bölümden yönetebilirsiniz.'
},

// GÜVENLİK VE GİZLİLİK (Security & Privacy) - 7 questions
{
  id: 59,
  category: 'guvenlik',
  question: 'Kişisel verilerim güvende mi?',
  answer: 'Evet! Tüm verileriniz KVKK (Kişisel Verilerin Korunması Kanunu) ve GDPR standartlarında korunur. 256-bit SSL şifreleme ile iletim güvenliği, sunucularda AES-256 şifreleme ile depolama güvenliği sağlanır. Verileriniz 3. şahıslarla paylaşılmaz (reklam, pazarlama vb.). Detaylı bilgi için Gizlilik Politikamızı okuyun.'
},
{
  id: 60,
  category: 'guvenlik',
  question: 'Kredi kartı bilgilerim saklanıyor mu?',
  answer: 'Hayır! Kredi kartı bilgileriniz sistemimizde saklanmaz. Ödemeler PCI-DSS Level 1 sertifikalı güvenli ödeme ağ geçidi (PayTR, İyzico) üzerinden yapılır. Sadece ödeme token\'ı (şifreli kimlik) saklanır, kart numarası/CVV asla saklanmaz. 3D Secure doğrulama zorunludur.'
},
{
  id: 61,
  category: 'guvenlik',
  question: 'İki faktörlü doğrulama (2FA) var mı?',
  answer: 'Evet! Hesap güvenliği için 2FA önerilir. "Profilim" > "Güvenlik" > "İki Faktörlü Doğrulama" bölümünden aktif edebilirsiniz. SMS veya Google Authenticator seçenekleri mevcut. Aktif edildiğinde, her girişte telefon doğrulama kodu gerekir. 2FA aktif hesaplar %99.9 siber saldırı korumasına sahiptir.'
},
{
  id: 62,
  category: 'guvenlik',
  question: 'Phishing (dolandırıcılık) e-postalarından nasıl korunurum?',
  answer: 'AILYDIAN Holiday asla e-posta ile şifre, kredi kartı bilgisi istemez! Şüpheli e-postalar için kontrol: 1) Gönderen adresi @lydian.com mi? 2) Kişisel bilgi isteniyor mu? 3) Acil eylem (hesabınız kapatılacak vb.) tehdidi var mı? Şüpheli e-posta aldıysanız açmayın, security@lydian.com adresine iletin.'
},
{
  id: 63,
  category: 'guvenlik',
  question: 'Hesabım hacklendi, ne yapmalıyım?',
  answer: 'Acil durum adımları: 1) Hemen şifrenizi değiştirin (şifre sıfırlama). 2) Yetkisiz rezervasyon varsa anında iptal edin ve bizi arayın (0850 123 45 67). 3) Kredi kartınızı bloke ettirin. 4) security@lydian.com adresine bildirin. Ekibimiz hesabınızı inceleyecek, güvenlik önlemleri alacak ve yetkisiz işlemleri iptal edecektir.'
},
{
  id: 64,
  category: 'guvenlik',
  question: 'Verilerim 3. şahıslarla paylaşılıyor mu?',
  answer: 'Verileriniz sadece rezervasyon tamamlama için gerekli taraflarla (otel, tur operatörü, araç kiralama şirketi) sınırlı olarak paylaşılır. Pazarlama, reklam, veri satışı kesinlikle yapılmaz. Analitik için anonim (kişisel olmayan) veriler kullanılır. İzniniz olmadan hiçbir veri paylaşımı yapılmaz (KVKK Madde 5).'
},
{
  id: 65,
  category: 'guvenlik',
  question: 'Çocuk gizliliği korunuyor mu?',
  answer: '13 yaş altı çocuklar için rezervasyon veli/vasi onayı ile yapılır. Çocuklara ait kişisel veriler (ad, doğum tarihi) sadece rezervasyon amacıyla kullanılır, pazarlama/reklam için kullanılmaz. Çocuk fotoğrafları sosyal medya paylaşımında mutlaka veli izni alınır. Detaylar Gizlilik Politikasında.'
},

// TEKNİK DESTEK (Technical Support) - 6 questions
{
  id: 66,
  category: 'teknik',
  question: 'Web sitesine giriş yapamıyorum, ne yapmalıyım?',
  answer: 'Giriş sorunları için kontrol: 1) E-posta ve şifre doğru mu? (büyük/küçük harf duyarlı). 2) Hesabınızı aktivasyon e-postasından aktif ettiniz mi? 3) Tarayıcı çerezleri (cookies) aktif mi? 4) Şifre sıfırlama deneyin. 5) Farklı tarayıcı (Chrome, Firefox, Safari) deneyin. Sorun devam ederse support@lydian.com adresine yazın.'
},
{
  id: 67,
  category: 'teknik',
  question: 'Ödeme sırasında hata alıyorum.',
  answer: 'Ödeme hataları: "Yetersiz bakiye" - Kart limitinizi kontrol edin. "Güvenlik kodu hatalı" - CVV\'yi doğru girin. "3D Secure hatası" - Bankanızın SMS/bildirimini kontrol edin. "İşlem reddedildi" - Bankanızı arayın, online alışverişe açık mı kontrol edin. Sorun devam ederse alternatif kart/ödeme yöntemi deneyin veya bizi arayın.'
},
{
  id: 68,
  category: 'teknik',
  question: 'Rezervasyon onay e-postası gelmiyor.',
  answer: 'E-posta gelmiyorsa: 1) Spam/gereksiz/reklam klasörlerini kontrol edin. 2) E-posta adresinizi doğru girdiğinizden emin olun ("Profilim" > kontrol). 3) 15 dakika bekleyin (sistem gecikmesi olabilir). 4) "Seyahatlerim" bölümünden voucher\'ı manuel indirin. 5) Gelmediyse info@lydian.com adresine rezervasyon numaranızla yazın, tekrar göndeririz.'
},
{
  id: 69,
  category: 'teknik',
  question: 'Mobil sitede görüntü sorunu yaşıyorum.',
  answer: 'Mobil sorunlar için: 1) Tarayıcı önbelleğini (cache) temizleyin. 2) Sayfayı yenileyin (swipe down). 3) Tarayıcınızı güncelleyin (eski sürümler desteklenmez). 4) WiFi yerine mobil veri deneyin (ağ sorunu). 5) Ekran görüntüsü alıp support@lydian.com adresine gönderin, teknik ekibimiz çözüm sağlar.'
},
{
  id: 70,
  category: 'teknik',
  question: 'Hangi tarayıcıları destekliyorsunuz?',
  answer: 'Desteklenen tarayıcılar: Google Chrome (sürüm 90+), Mozilla Firefox (88+), Safari (14+), Microsoft Edge (90+), Opera (76+). Mobil: Safari (iOS 14+), Chrome (Android 10+). Internet Explorer desteklenmez. En iyi deneyim için tarayıcınızı güncel tutun. JavaScript ve çerezler (cookies) aktif olmalı.'
},
{
  id: 71,
  category: 'teknik',
  question: 'Canlı destek saatleri nedir?',
  answer: 'Canlı destek (chat): Her gün 08:00 - 24:00 arası. WhatsApp: 7/24 (0850 123 45 67). Telefon: 09:00 - 22:00 arası. E-posta: 7/24 (yanıt süresi 2-12 saat). Acil durumlar için 7/24 acil hat: +90 242 123 45 67. Bayram ve resmi tatillerde destek saatleri değişebilir, bildirimler yapılır.'
}];


// Category definitions
interface Category {
  id: string;
  name: string;
  icon: any;
  count: number;
  color: string;
}

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: {[key: string]: number;} = {};
    faqs.forEach((faq) => {
      counts[faq.category] = (counts[faq.category] || 0) + 1;
    });
    return counts;
  }, []);

  const categories: Category[] = [
  {
    id: 'all',
    name: 'Tümü',
    icon: HelpCircle,
    count: faqs.length,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'rezervasyon',
    name: 'Rezervasyon ve Ödeme',
    icon: CreditCard,
    count: categoryCounts['rezervasyon'] || 0,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'turlar',
    name: 'Turlar',
    icon: Compass,
    count: categoryCounts['turlar'] || 0,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'transferler',
    name: 'Transferler',
    icon: Bus,
    count: categoryCounts['transferler'] || 0,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'arackiralama',
    name: 'Araç Kiralama',
    icon: Car,
    count: categoryCounts['arackiralama'] || 0,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'iptal',
    name: 'İptal ve İade',
    icon: XCircle,
    count: categoryCounts['iptal'] || 0,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'hesap',
    name: 'Hesap ve Profil',
    icon: User,
    count: categoryCounts['hesap'] || 0,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'guvenlik',
    name: 'Güvenlik ve Gizlilik',
    icon: Shield,
    count: categoryCounts['guvenlik'] || 0,
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'teknik',
    name: 'Teknik Destek',
    icon: Settings,
    count: categoryCounts['teknik'] || 0,
    color: 'from-yellow-500 to-yellow-600'
  }];


  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Quick help topics
  const quickHelpTopics = [
  {
    title: 'Rezervasyon Nasıl Yapılır?',
    description: 'Adım adım rezervasyon rehberi',
    icon: Calendar,
    color: 'from-blue-500 to-indigo-500',
    link: '#rezervasyon'
  },
  {
    title: 'Ödeme Yöntemleri',
    description: 'Güvenli ödeme seçenekleri',
    icon: CreditCard,
    color: 'from-purple-500 to-pink-500',
    link: '#rezervasyon'
  },
  {
    title: 'İptal Politikası',
    description: 'İptal ve iade koşulları',
    icon: XCircle,
    color: 'from-red-500 to-orange-500',
    link: '#iptal'
  },
  {
    title: 'Transfer Hizmetleri',
    description: 'Havalimanı ve otel transferleri',
    icon: Bus,
    color: 'from-green-500 to-teal-500',
    link: '#transferler'
  },
  {
    title: 'Tur Detayları',
    description: 'Turlar hakkında tüm bilgiler',
    icon: Compass,
    color: 'from-yellow-500 to-amber-500',
    link: '#turlar'
  },
  {
    title: 'Hesap Yönetimi',
    description: 'Profil ve güvenlik ayarları',
    icon: User,
    color: 'from-cyan-500 to-blue-500',
    link: '#hesap'
  }];


  return (
    <>
      <Head>
        <title>Yardım Merkezi | Travel LyDian - Tüm Sorularınızın Yanıtları</title>
        <meta
          name="description"
          content="Travel LyDian yardım merkezi. Rezervasyon, ödeme, turlar, transferler, araç kiralama, iptal ve iade hakkında 70+ soru-cevap. 7/24 destek." />

        <meta name="keywords" content="yardım merkezi, sıkça sorulan sorular, rezervasyon yardım, ödeme destek, tur bilgileri, transfer rehberi, müşteri hizmetleri" />
      </Head>

      <ModernHeader />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Hero Section with Gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 text-white py-20 overflow-hidden">

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-full blur-3xl" />

            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-full blur-3xl" />

          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center">

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">7/24 Destek</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-6">
                Size Nasıl Yardımcı Olabiliriz?
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-10">
                70+ soru-cevap ile tüm merak ettikleriniz burada
              </p>

              {/* Animated Search Bar */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative max-w-2xl mx-auto">

                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-300" />
                <input
                  type="text"
                  placeholder="Sorunuzu yazın... (örn: rezervasyon iptali, ödeme yöntemleri, transfer saatleri)"
                  className="w-full pl-14 pr-4 py-5 rounded-2xl text-white text-lg focus:ring-4 focus:ring-white/50 focus:outline-none shadow-2xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />

                {searchQuery &&
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gray-400">

                    <XCircle className="w-6 h-6" />
                  </motion.button>
                }
              </motion.div>

              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>71 Detaylı Yanıt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>8 Kategori</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>Anlık Destek</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Help Topics */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-12 relative z-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {quickHelpTopics.map((topic, index) =>
            <motion.a
              key={index}
              href={topic.link}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 cursor-pointer">

                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${topic.color} mb-4`}>
                  <topic.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-400">
                  {topic.description}
                </p>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filter */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12">

            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Kategoriler
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all
                      ${isActive ?
                    `bg-gradient-to-r ${category.color} text-white shadow-lg` :
                    'bg-white/5 text-white hover:bg-white/5 shadow-md hover:shadow-lg'}
                    `
                    }>

                    <Icon className="w-5 h-5" />
                    <span>{category.name}</span>
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-bold
                      ${isActive ? 'bg-lydian-bg/20' : 'bg-lydian-bg/10'}
                    `}>
                      {category.count}
                    </span>
                  </motion.button>);

              })}
            </div>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12">

            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {searchQuery ?
              `"${searchQuery}" için ${filteredFaqs.length} sonuç bulundu` :
              selectedCategory === 'all' ?
              'Tüm Sorular' :
              categories.find((c) => c.id === selectedCategory)?.name
              }
            </h2>

            <div className="space-y-4 max-w-4xl mx-auto">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.map((faq, index) =>
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden">

                    <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-start justify-between hover:bg-gradient-to-br from-slate-900 via-black to-slate-800 transition-colors group">

                      <div className="flex items-start gap-4 flex-1 pr-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-lg font-semibold text-white group-hover:text-blue-500 transition-colors">
                          {faq.question}
                        </span>
                      </div>
                      <motion.div
                      animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}>

                        <ChevronDown className="w-6 h-6 text-gray-300 flex-shrink-0" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedFaq === faq.id &&
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden">

                          <div className="px-6 pb-6 pl-[72px]">
                            <div className="bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-lg p-4 border-l-4 border-blue-500">
                              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                    }
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {filteredFaqs.length === 0 &&
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16">

                  <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Sonuç Bulunamadı
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Aradığınız soruyu bulamadık. Farklı kelimeler deneyin veya bizimle iletişime geçin.
                  </p>
                  <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-lydian-dark transition-colors font-semibold">

                    Tüm Soruları Göster
                  </button>
                </motion.div>
              }
            </div>
          </motion.div>

          {/* Contact Support Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-3xl p-10 text-white shadow-2xl">

            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">7/24 Kesintisiz Destek</span>
              </div>
              <h2 className="text-4xl font-black mb-4">
                Hala Yardıma İhtiyacınız Var mı?
              </h2>
              <p className="text-xl text-blue-100">
                Uzman ekibimiz size yardımcı olmak için her zaman burada
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phone Support */}
              <motion.a
                href="tel:+908501234567"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 hover:bg-white/10 backdrop-blur-xl border border-white/20 transition-all group text-center">

                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-lydian-success mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Telefon Desteği</h3>
                <p className="text-blue-100 mb-3">09:00 - 22:00</p>
                <p className="text-2xl font-black">0850 123 45 67</p>
              </motion.a>

              {/* Email Support */}
              <motion.a
                href="mailto:info@lydian.com"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 hover:bg-white/10 backdrop-blur-xl border border-white/20 transition-all group text-center">

                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">E-posta Desteği</h3>
                <p className="text-blue-100 mb-3">2-12 saat yanıt süresi</p>
                <p className="text-lg font-bold">info@lydian.com</p>
              </motion.a>

              {/* WhatsApp Support */}
              <motion.a
                href="https://wa.me/908501234567"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 hover:bg-white/10 backdrop-blur-xl border border-white/20 transition-all group text-center">

                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">WhatsApp Destek</h3>
                <p className="text-blue-100 mb-3">7/24 Aktif</p>
                <p className="text-2xl font-black">Mesaj Gönder</p>
              </motion.a>
            </div>

            {/* Additional Info */}
            <div className="mt-10 pt-8 border-t border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-black mb-1">7/24</div>
                  <div className="text-blue-100 text-sm">Kesintisiz Destek</div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">5 dk</div>
                  <div className="text-blue-100 text-sm">Ortalama Yanıt</div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">98%</div>
                  <div className="text-blue-100 text-sm">Müşteri Memnuniyeti</div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">3 Dil</div>
                  <div className="text-blue-100 text-sm">TR, EN, RU</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Resources */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/cancellation-policy"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-xl p-6 shadow-md hover:shadow-xl transition-all group">

              <FileText className="w-10 h-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">
                İptal Politikası
              </h3>
              <p className="text-gray-400">
                Detaylı iptal ve iade koşulları
              </p>
            </Link>

            <Link
              href="/privacy"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-xl p-6 shadow-md hover:shadow-xl transition-all group">

              <Shield className="w-10 h-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">
                Gizlilik Politikası
              </h3>
              <p className="text-gray-400">
                Verilerinizin güvenliği ve KVKK
              </p>
            </Link>

            <Link
              href="/terms"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-xl p-6 shadow-md hover:shadow-xl transition-all group">

              <FileText className="w-10 h-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">
                Kullanım Koşulları
              </h3>
              <p className="text-gray-400">
                Hizmet şartları ve kullanıcı anlaşması
              </p>
            </Link>
          </div>
        </div>
      </div>

      <BookingFooter />
    </>);

};

export default HelpPage;