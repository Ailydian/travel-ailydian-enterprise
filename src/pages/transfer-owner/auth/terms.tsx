import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bus,
  FileText,
  Shield,
  CreditCard,
  RefreshCw,
  AlertCircle,
  Lock,
  HeadphonesIcon,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Download,
  Printer,
  Award
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TransferOwnerTermsPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const lastUpdated = '22 Aralık 2025';

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      router.push('/transfer-owner/auth/register');
    }, 1000);
  };

  const handleDecline = () => {
    router.push('/transfer-owner/auth/register');
  };

  const sections = [
    {
      id: 'introduction',
      icon: FileText,
      title: '1. Giriş ve Genel Hükümler',
      content: [
        {
          subtitle: '1.1 Sözleşmenin Tarafları',
          text: 'Bu sözleşme, LyDian platformunu işleten şirket ile platform üzerinden transfer hizmeti sağlamak isteyen transfer firmaları arasında akdedilmiştir.'
        },
        {
          subtitle: '1.2 Sözleşmenin Konusu',
          text: 'İşbu sözleşme, transfer hizmeti sağlayıcılarının LyDian platformu üzerinden transfer hizmetlerini listelemesi, rezervasyon yönetimi, ödeme işlemleri ve tarafların hak ve yükümlülüklerini düzenlemektedir.'
        },
        {
          subtitle: '1.3 Tanımlar',
          text: 'Platform: LyDian internet sitesi ve mobil uygulamalarını ifade eder. Transfer Hizmeti Sağlayıcı/Transfer Firması: Platformda transfer hizmeti ilanı veren ve hizmet sunan gerçek veya tüzel kişiyi ifade eder. Yolcu/Müşteri: Platform üzerinden transfer hizmeti satın alan kişiyi ifade eder. İlan: Transfer firması tarafından platforma eklenen transfer hizmetinin detaylı açıklamasını ifade eder. Transfer Hizmeti: Havalimanı transferi, şehirlerarası transfer, özel araç kiralama ve benzeri ulaşım hizmetlerini ifade eder.'
        },
        {
          subtitle: '1.4 Kabullenme',
          text: 'Transfer hizmeti sağlayıcı, platforma kayıt olarak ve/veya platformu kullanmaya başlayarak işbu sözleşmenin tüm hükümlerini kabul etmiş sayılır.'
        }
      ]
    },
    {
      id: 'commission',
      icon: CreditCard,
      title: '2. Komisyon Oranları ve Ödeme Koşulları',
      content: [
        {
          subtitle: '2.1 Komisyon Oranları',
          text: 'LyDian, her başarılı transfer hizmeti için transfer firmasından %10-12 arasında değişen komisyon ücreti alır. Komisyon oranı, hizmet tipi (havalimanı transferi, VIP transfer, grup transferi), mesafe, sezon ve özel kampanyalara göre değişiklik gösterebilir.'
        },
        {
          subtitle: '2.2 Ödeme Zamanlaması',
          text: 'Transfer firmasına yapılacak ödemeler, transfer hizmetinin tamamlanmasından sonra 48 saat içinde hesaba aktarılır. Transfer tamamlanma zamanı, yolcunun varış noktasına ulaşması ve hizmetin onaylanması olarak kabul edilir. Ödemeler, transfer firmasının tanımladığı banka hesabına veya tercih ettiği ödeme yöntemine yapılır.'
        },
        {
          subtitle: '2.3 Ödeme Yöntemleri',
          text: 'Banka havalesi (EFT/HAVALE), Kredi kartına iade, PayPal ve diğer elektronik ödeme yöntemleri desteklenmektedir. Toplu ödemeler için haftalık veya aylık dönemler seçilebilir.'
        },
        {
          subtitle: '2.4 Vergi ve Yasal Yükümlülükler',
          text: 'Transfer hizmeti sağlayıcı, elde ettiği gelirle ilgili tüm vergi ve yasal yükümlülüklerden sorumludur. LyDian gerekli hallerde stopaj kesintisi yapabilir. Transfer hizmeti gelirlerinin beyan edilmesi ve KDV, gelir vergisi gibi tüm vergi ödemelerinin yapılması hizmet sağlayıcının sorumluluğundadır.'
        },
        {
          subtitle: '2.5 Ödeme Güvencesi',
          text: 'Tüm ödemeler LyDian güvencesi altındadır. Yolcu ödemesini yaptıktan sonra, transfer firması ödemeyi garanti altında alır. Transfer hizmeti tamamlandıktan sonra ödeme kesin olarak yapılır.'
        }
      ]
    },
    {
      id: 'cancellation',
      icon: RefreshCw,
      title: '3. İptal Politikaları',
      content: [
        {
          subtitle: '3.1 İptal Politikası Türleri',
          text: 'Esnek İptal: Transfer zamanından 24 saat öncesine kadar ücretsiz iptal. Orta Esnek İptal: Transfer zamanından 48 saat öncesine kadar ücretsiz iptal. Katı İptal: Transfer zamanından 72 saat öncesine kadar ücretsiz iptal. İade Yok: Hiçbir koşulda iade yapılmaz (özel VIP transferler için). Havalimanı Transferleri: Uçuş gecikmesi veya iptali durumunda özel koşullar uygulanır.'
        },
        {
          subtitle: '3.2 Transfer Firması İptali',
          text: 'Transfer firması, onaylanmış bir rezervasyonu acil ve geçerli bir sebep olmadan iptal edemez. Araç arızası, sürücü rahatsızlığı gibi mücbir sebepler durumunda, yolcuya derhal alternatif transfer sağlanmalı veya tam iade yapılmalıdır. Sebepsiz iptal durumunda transfer firmasına ceza uygulanır ve müşteriye tam iade yapılır.'
        },
        {
          subtitle: '3.3 Yolcu İptali',
          text: 'Yolcu, seçilen iptal politikasına göre rezervasyonunu iptal edebilir. İptal koşulları, rezervasyon sırasında açıkça belirtilir. Havalimanı transferlerinde, uçuş iptali veya gecikmesi durumunda özel iptal koşulları geçerlidir.'
        },
        {
          subtitle: '3.4 No-Show (Gelmeme) Politikası',
          text: 'Yolcu belirlenen kalkış noktasında ve saatinde hazır bulunmazsa, transfer firması 15 dakika bekleme süresinden sonra ayrılma hakkına sahiptir. No-show durumunda iade yapılmaz. Transfer firması bekleme süresini fotoğraf veya zaman damgası ile belgelemelidir.'
        },
        {
          subtitle: '3.5 Uçuş Gecikmeleri',
          text: 'Havalimanı transferlerinde uçuş gecikmesi durumunda, transfer firması uçuş takibi yaparak yolcuyu yeni varış saatinde karşılamakla yükümlüdür. Makul gecikmelerde (4 saate kadar) ek ücret alınamaz. 4 saati aşan gecikmeler için müşteri ile anlaşılarak ek ücret belirlenebilir.'
        },
        {
          subtitle: '3.6 Force Majeure',
          text: 'Doğal afet, salgın, savaş, yol kapanması gibi mücbir sebep hallerinde, LyDian özel iptal koşulları uygulayabilir ve taraflar arası adil bir çözüm bulunur.'
        }
      ]
    },
    {
      id: 'responsibilities',
      icon: Shield,
      title: '4. Sorumluluklar ve Yükümlülükler',
      content: [
        {
          subtitle: '4.1 Transfer Firmasının Temel Sorumlulukları',
          text: 'Transfer firması şu temel yükümlülüklere sahiptir:\n\n• Zamanında Hizmet: Belirlenen saatte kalkış noktasında hazır bulunmak, gecikmemek\n• Profesyonel Sürücü: Deneyimli, güler yüzlü, nazik ve profesyonel sürücü istihdam etmek\n• Temiz ve Bakımlı Araçlar: Her transferden önce araç temizliği yapmak, araçların bakımlı ve çalışır durumda olmasını sağlamak\n• Güvenli Sürüş: Trafik kurallarına uymak, güvenli ve konforlu sürüş sağlamak\n• İletişim: Yolcu ile iletişimde kalmak, gerektiğinde bilgilendirme yapmak\n• Bagaj Yardımı: Yolcu bagajlarına yardımcı olmak, güvenli taşıma sağlamak'
        },
        {
          subtitle: '4.2 Hizmet Listeleme Gereksinimleri',
          text: 'Transfer firması, hizmet ilanı oluştururken şu bilgileri doğru ve eksiksiz vermekle yükümlüdür:\n\n• Araç Bilgileri: Araç markası, modeli, yılı, kapasitesi, konfor özellikleri\n• Rota Bilgileri: Kalkış ve varış noktaları, mesafe, tahmini süre\n• Fiyatlandırma: Net fiyat, dahil olan hizmetler, ekstra ücretler\n• Araç Fotoğrafları: Güncel ve gerçek araç fotoğrafları (en az 4 farklı açıdan)\n• Özellikler: Klima, wifi, çocuk koltuğu, bagaj kapasitesi gibi özellikler\n• Sürücü Bilgileri: Profesyonel sürücü, dil becerileri\n• İptal Politikası: Açık ve anlaşılır iptal koşulları'
        },
        {
          subtitle: '4.3 Rezervasyon Yönetimi',
          text: 'Transfer firması rezervasyon yönetiminde şu kurallara uymakla yükümlüdür:\n\n• Hızlı Onay: Rezervasyon taleplerini en geç 2 saat içinde onaylamak veya reddetmek\n• Anında Onay: Mümkün olduğunca anında onay sistemi kullanmak\n• Müşteri İletişimi: Rezervasyon öncesi ve sonrası müşteri ile iletişimde kalmak\n• Detay Paylaşımı: Transfer öncesi sürücü bilgileri, araç plakası, iletişim numarası paylaşmak\n• Uçuş Takibi: Havalimanı transferlerinde uçuş takibi yapmak\n• Esneklik: Küçük değişikliklere (toplanma saati, adres detayı) uyum sağlamak\n• Sorun Çözümü: Transfer sırasında ortaya çıkan sorunları hızlıca çözmek'
        },
        {
          subtitle: '4.4 Araç ve Sürücü Standartları',
          text: 'Transfer firması şu standartları sağlamakla yükümlüdür:\n\n• Araç Temizliği: Her transferden önce dış ve iç temizlik yapılmalı\n• Araç Bakımı: Düzenli servis bakımı, lastik kontrolü, fren kontrolü\n• Araç Yaşı: Tercihen 5 yaşından genç araçlar, maksimum 10 yaş\n• Konfor: Klima/kalorifer, rahat koltuklar, temiz iç mekan\n• Güvenlik: Airbag, emniyet kemeri, çocuk koltuğu (talep halinde)\n• Sürücü Görünümü: Temiz ve profesyonel giyim\n• Sürücü Davranışı: Kibar, yardımsever, müşteri odaklı\n• Dil Yeterliliği: Temel İngilizce bilgisi (turistik transferler için)\n• Yerel Bilgi: Bölge hakkında bilgi sahibi olma'
        },
        {
          subtitle: '4.5 Yasal Uyumluluk - Genel Yükümlülükler',
          text: 'Transfer firması şu yasal yükümlülüklere uymakla sorumludur:\n\n• Trafik Sigortası: Güncel ve geçerli zorunlu trafik sigortası\n• Kasko Sigortası: Araç için kasko sigortası (önerilir)\n• Yolcu Sigortası: Zorunlu yolcu koltuk sigortası (her koltuk için)\n• Araç Muayenesi: Güncel araç muayenesi (yılda 1 kez)\n• Profesyonel Ehliyet: E sınıfı ehliyet (ticari yolcu taşımacılığı için gerekli)\n• SRC Belgesi: Sürücü Yeterlilik Belgesi (SRC - Sürücü Belgesi)\n• Çalışma Saatleri: Sürücü çalışma saati sınırlarına uyum (günde max 9 saat sürüş)\n• Vergi Mükelleflliği: Ticari faaliyet için vergi mükellefi olma\n• Ticaret Sicili: Ticaret odasına kayıt (ticari işletmeler için)\n• Gelir Beyanı: Transfer gelirlerini beyan etme ve vergilendirme'
        }
      ]
    },
    {
      id: 'd2-license',
      icon: Award,
      title: '4.6 D2 Turizm Belgesi Gereksinimleri (ZORUNLU)',
      content: [
        {
          subtitle: '4.6.1 D2 Turizm Belgesi Nedir?',
          text: 'D2 Turizm İşletme Belgesi, Türkiye\'de turizm amaçlı transfer ve ulaşım hizmetleri vermek için Kültür ve Turizm Bakanlığı tarafından verilen zorunlu bir belgedir. Havalimanı transferleri, otel transferleri, turistik gezi transferleri gibi turizm amaçlı yolcu taşımacılığı yapacak tüm araçlar için bu belge zorunludur.'
        },
        {
          subtitle: '4.6.2 D2 Belgesi Zorunluluğu',
          text: 'LyDian platformunda turizm amaçlı transfer hizmeti vermek isteyen tüm firmalar için D2 Turizm Belgesi ZORUNLUDUR. Bu belge olmadan:\n\n• Platformda hizmet verilemez\n• Havalimanı transferi yapılamaz\n• Otel transferi yapılamaz\n• Turistik tur transferi yapılamaz\n• Yabancı turistlere hizmet verilemez\n\nBelgesiz turizm taşımacılığı yapmak YASAL DEĞİLDİR ve ağır cezai yaptırımlar içerir.'
        },
        {
          subtitle: '4.6.3 D2 Belgesi Nasıl Alınır?',
          text: 'D2 Turizm Belgesi almak için gereken adımlar:\n\n1. Şirket Kuruluşu: Ticaret odasına kayıtlı bir şirket (Ltd. Şti. veya A.Ş.) olmak\n2. Araç Sahipliği: En az 1 adet ticari plakalı araç sahibi olmak (34 TU, 06 TU vb.)\n3. Gerekli Belgeler:\n   • Ticaret sicil gazetesi\n   • Vergi levhası\n   • İmza sirküleri\n   • Araç ruhsatı (ticari plaka)\n   • Araç sigorta poliçeleri\n   • Sürücü SRC belgeleri\n   • İşyeri kira sözleşmesi\n4. Başvuru: İl Kültür ve Turizm Müdürlüğü\'ne başvuru\n5. Denetim: Bakanlık denetimi ve araç kontrolü\n6. Belge Alımı: Onay sonrası D2 belgesi verilir\n\nBelge süresi: 5 yıl (yenilenebilir)'
        },
        {
          subtitle: '4.6.4 D2 Belgesi Olmadan Çalışmanın Cezaları',
          text: 'D2 Turizm Belgesi olmadan turizm taşımacılığı yapmanın cezaları çok ağırdır:\n\n• İdari Para Cezası: 50.000 TL - 100.000 TL arası (2025 yılı tarifesi)\n• Araç Trafikten Men: Araç trafikten men edilir, çekilir\n• Plaka İptali: Ticari plaka iptal edilebilir\n• Ruhsat İptali: İşletme ruhsatı iptal edilir\n• Hapis Cezası: Hileli işlemlerde hapis cezası\n• Platform Yasağı: LyDian platformundan kalıcı olarak yasaklanma\n• İtibar Kaybı: Sektörde itibar kaybı\n\nDenetimler düzenli olarak yapılmaktadır. Havalimanlarında özel denetim ekipleri bulunmaktadır.'
        },
        {
          subtitle: '4.6.5 Belge Kontrolü ve Platform Politikası',
          text: 'LyDian platformu D2 belgesi kontrolünü çok ciddiye almaktadır:\n\n• Kayıt Sırasında: D2 belgesi fotokopisi veya belge numarası talep edilir\n• Belge Doğrulama: Bakanlık sisteminden belge geçerliliği kontrol edilir\n• Periyodik Kontrol: Yılda 2 kez belge geçerliliği kontrol edilir\n• Belge Süresi: Belge süresinin dolması durumunda hizmet verilmesi durdurulur\n• Sahte Belge: Sahte belge kullanımı durumunda hesap kalıcı olarak kapatılır ve yasal işlem başlatılır\n\nTransfer firması, D2 belgesinin her zaman güncel ve geçerli olmasından sorumludur.'
        },
        {
          subtitle: '4.6.6 Resmi Kaynaklar ve İletişim',
          text: 'D2 Turizm Belgesi hakkında detaylı bilgi için:\n\n• Kültür ve Turizm Bakanlığı: www.ktb.gov.tr\n• TURSAB (Türkiye Seyahat Acentaları Birliği): www.tursab.org.tr\n• İl Kültür ve Turizm Müdürlükleri: İlgili il müdürlüğüne başvuru\n• Belge Sorgulama: Bakanlık e-belge sisteminden belge sorgulaması yapılabilir\n• Yardım Hattı: LyDian destek ekibi belge alma sürecinde rehberlik sağlar\n\nÖNEMLİ NOT: D2 Turizm Belgesi olmadan turizm taşımacılığı yapmak yasadışıdır. LyDian platformu, yasal gereksinimlere tam uyum sağlamayı taahhüt eder.'
        }
      ]
    },
    {
      id: 'privacy',
      icon: Lock,
      title: '5. Gizlilik ve Veri Koruma (KVKK)',
      content: [
        {
          subtitle: '5.1 Kişisel Verilerin Korunması',
          text: 'LyDian, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında transfer hizmeti sağlayıcı ve yolcuların kişisel verilerini korumayı taahhüt eder.'
        },
        {
          subtitle: '5.2 Toplanan Veriler',
          text: 'Transfer firması ve yolcular için şu veriler toplanmaktadır:\n\n• Kimlik Bilgileri: Ad, soyad, TC kimlik no, vergi no\n• İletişim: E-posta, telefon numarası, adres\n• Araç Bilgileri: Plaka, ruhsat, sigorta bilgileri\n• Sürücü Bilgileri: Ehliyet, SRC belgesi, fotoğraf\n• D2 Belgesi: Belge numarası, geçerlilik tarihi\n• Ödeme Bilgileri: Banka hesap bilgileri\n• Yolcu Bilgileri: İsim, telefon, kalkış/varış adresi, uçuş bilgileri\n• İletişim Geçmişi: Rezervasyon detayları, mesajlaşma kayıtları\n• Konum Bilgileri: Transfer sırasında GPS konum takibi (güvenlik amaçlı)'
        },
        {
          subtitle: '5.3 Verilerin Kullanım Amaçları',
          text: 'Toplanan veriler şu amaçlarla kullanılır:\n\n• Transfer rezervasyon ve yönetim işlemlerinin gerçekleştirilmesi\n• Ödeme işlemlerinin yapılması\n• Müşteri hizmetleri ve destek sağlanması\n• Yasal yükümlülüklerin yerine getirilmesi (D2 belgesi kontrolü, vergi beyanları)\n• Güvenlik ve kalite kontrolleri\n• Platform güvenliğinin sağlanması\n• İstatistik ve analiz çalışmaları\n• Pazarlama ve iletişim faaliyetleri (izin verilmesi halinde)'
        },
        {
          subtitle: '5.4 Veri Güvenliği',
          text: 'LyDian, kişisel verilerin güvenliği için şu önlemleri almaktadır:\n\n• Tüm veriler şifrelenmiş (encrypted) olarak saklanır\n• SSL sertifikası ile güvenli veri iletimi sağlanır\n• Düzenli güvenlik denetimleri yapılır\n• Yetkisiz erişime karşı çok katmanlı güvenlik önlemleri\n• Güvenli sunucu altyapısı\n• Düzenli yedekleme sistemleri\n• Veri erişim logları tutulur\n• Personel gizlilik sözleşmeleri'
        },
        {
          subtitle: '5.5 Veri Saklama Süresi',
          text: 'Kişisel veriler, yasal yükümlülüklerin gerektirdiği süre boyunca (minimum 5 yıl - vergi mevzuatı gereği) veya veri sahibinin izninin devam ettiği süre boyunca saklanır. Veriler, amaç ortadan kalktığında veya yasal süre dolduğunda silinir, yok edilir veya anonim hale getirilir.'
        },
        {
          subtitle: '5.6 Veri Sahibinin Hakları (KVKK Hakları)',
          text: 'Transfer firması ve yolcular, KVKK kapsamında şu haklara sahiptir:\n\n• Kişisel verilerinin işlenip işlenmediğini öğrenme\n• Kişisel verileri işlenmişse buna ilişkin bilgi talep etme\n• Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme\n• Kişisel verilerin düzeltilmesini talep etme\n• Kişisel verilerin silinmesini veya yok edilmesini talep etme\n• İşleme faaliyetlerine itiraz etme\n• Otomatik sistemler ile yapılan analiz sonuçlarına itiraz etme\n• Kişisel verilerin mevzuata aykırı işlenmesi nedeniyle zararın giderilmesini talep etme\n\nBu hakları kullanmak için kvkk@lydian.com adresine başvurulabilir.'
        }
      ]
    },
    {
      id: 'support',
      icon: HeadphonesIcon,
      title: '6. Müşteri Desteği ve Yardım',
      content: [
        {
          subtitle: '6.1 Destek Kanalları',
          text: 'Transfer firmaları için özel destek kanalları:\n\n• 7/24 Acil Destek Hattı: Transfer sırasında acil durumlar için (araç arızası, kaza vb.)\n• Canlı Destek: Platform üzerinden anlık destek (09:00 - 22:00)\n• E-posta Desteği: transfer-support@lydian.com\n• WhatsApp Destek: 0850 XXX XX XX\n• Telefon Desteği: 0850 XXX XX XX (09:00 - 22:00)\n• Yardım Merkezi: Detaylı makaleler, videolar ve SSS'
        },
        {
          subtitle: '6.2 Destek Konuları',
          text: 'Şu konularda destek sağlanmaktadır:\n\n• Transfer sırasında acil durumlar (araç arızası, kaza, hasta yolcu)\n• Rezervasyon yönetimi ve iptal işlemleri\n• Ödeme ve finansal konular\n• Yolcu şikayetleri ve sorun çözümü\n• Platform kullanımı ve teknik sorunlar\n• Hizmet listeleme ve güncelleme\n• D2 belgesi ve yasal gereksinimler\n• Fiyatlandırma ve komisyon soruları\n• Araç ve sürücü standartları\n• Uçuş takibi ve gecikme durumları'
        },
        {
          subtitle: '6.3 Yanıt Süreleri',
          text: 'LyDian destek ekibi şu yanıt sürelerini hedefler:\n\n• Acil Durumlar (transfer sırasında sorun): Anında - 15 dakika içinde\n• Kritik Sorunlar (rezervasyon, iptal): 1 saat içinde\n• Normal Talepler: 4-6 saat içinde\n• Genel Sorular: 24 saat içinde\n• Yasal/Finansal Konular: 48 saat içinde\n\nHafta sonları ve resmi tatillerde destek hizmetleri sınırlı olabilir, ancak acil durumlar için 7/24 destek sağlanır.'
        },
        {
          subtitle: '6.4 Transfer Firması Eğitimi',
          text: 'LyDian, transfer firmalarına ücretsiz eğitim ve kaynak sağlar:\n\n• Platform Kullanım Eğitimi: Video eğitimler ve canlı webinarlar\n• Müşteri Hizmetleri Eğitimi: İyi hizmet verme teknikleri\n• Fotoğraf ve İlan Oluşturma: Çekici ilan hazırlama ipuçları\n• Yasal Uyumluluk Rehberi: D2 belgesi, sigorta, vergi konuları\n• Sürücü Eğitimi: Profesyonel sürücülük standartları\n• Kriz Yönetimi: Acil durumlar için hazırlık\n• Dijital Pazarlama: Daha fazla rezervasyon alma teknikleri'
        }
      ]
    },
    {
      id: 'general',
      icon: AlertCircle,
      title: '7. Genel Hükümler',
      content: [
        {
          subtitle: '7.1 Sözleşme Değişiklikleri',
          text: 'LyDian, bu sözleşme şartlarını değiştirme hakkını saklı tutar. Değişiklikler, transfer firmalarına e-posta yoluyla bildirilir ve 15 gün sonra yürürlüğe girer. Önemli değişiklikler için daha uzun bildirim süreleri uygulanabilir.'
        },
        {
          subtitle: '7.2 Hesap Askıya Alma ve Sonlandırma',
          text: 'LyDian, şu durumlarda transfer firmasının hesabını askıya alabilir veya sonlandırabilir:\n\n• Sözleşme şartlarını ihlal etme\n• Yanıltıcı bilgi verme (sahte araç fotoğrafları, yanlış fiyatlandırma)\n• Platformu kötüye kullanma\n• D2 belgesi olmadan hizmet verme veya belge sahteliği\n• Müşteri şikayetlerinde tekrarlayan sorunlar\n• Güvenlik kurallarını ihlal etme\n• Zamanında ödeme yapmama\n• Kötü müşteri hizmeti ve sürekli geç kalma\n\nHesap kapatılmadan önce, hafif ihlallerde uyarı yapılır ve düzeltme için süre tanınır.'
        },
        {
          subtitle: '7.3 Uyuşmazlık Çözümü',
          text: 'Taraflar arasında doğabilecek uyuşmazlıklarda öncelikle dostane çözüm aranır. LyDian arabulucu olarak taraflar arası çözüm üretmeye çalışır. Çözülemeyen durumlar için Türkiye Cumhuriyeti mahkemeleri ve icra daireleri yetkilidir. Ankara mahkemeleri ve icra daireleri özel yetkilidir.'
        },
        {
          subtitle: '7.4 Sorumluluk Sınırlamaları',
          text: 'LyDian bir platformdur ve transfer hizmetini doğrudan sunmamaktadır. Transfer hizmetinin kalitesi, güvenliği ve yasal uyumluluğu tamamen transfer firmasının sorumluluğundadır. LyDian, transfer sırasında oluşabilecek kaza, hasar, yaralanma veya kayıplardan sorumlu tutulamaz. Transfer firması yeterli sigorta yapmakla yükümlüdür.'
        },
        {
          subtitle: '7.5 Mücbir Sebepler',
          text: 'Doğal afet, salgın, savaş, hükümet kararları, grev, lokavt, elektrik kesintisi, internet kesintisi gibi tarafların kontrolü dışındaki durumlar mücbir sebep sayılır. Mücbir sebep halinde taraflar sorumlu tutulamaz.'
        },
        {
          subtitle: '7.6 Yürürlük',
          text: 'İşbu sözleşme, transfer firmasının LyDian platformuna kayıt olmasıyla birlikte yürürlüğe girer ve taraflardan biri sözleşmeyi sonlandırana kadar geçerlidir. Sözleşme elektronik ortamda imzalanmış sayılır ve yasal geçerliliğe sahiptir.'
        },
        {
          subtitle: '7.7 Bölünebilirlik',
          text: 'Bu sözleşmenin herhangi bir hükmünün geçersiz veya uygulanamaz olması, diğer hükümlerin geçerliliğini etkilemez. Geçersiz hüküm, amaca en yakın geçerli bir hükümle değiştirilir.'
        },
        {
          subtitle: '7.8 Tam Anlaşma',
          text: 'Bu sözleşme, taraflar arasındaki ilişkiyi düzenleyen tam ve nihai anlaşmadır. Önceki tüm sözlü veya yazılı anlaşmalar bu sözleşme ile geçersiz hale gelir.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">LyDian</span>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span className="text-sm font-medium">Yazdır</span>
              </button>
              <button
                onClick={() => {
                  // In a real app, this would trigger a PDF download
                  alert('PDF indirme özelliği yakında eklenecek');
                }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">PDF İndir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/transfer-owner/auth/register"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Kayıt sayfasına dön</span>
        </Link>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Transfer Hizmeti Sağlayıcı Kullanım Koşulları ve Sözleşmesi
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
            <span>Son Güncelleme: {lastUpdated}</span>
            <span>•</span>
            <span>Yürürlük Tarihi: 1 Ocak 2024</span>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Önemli Not:</strong> Lütfen bu sözleşmeyi dikkatlice okuyunuz. LyDian platformuna transfer hizmeti sağlayıcı olarak kayıt olmadan önce tüm maddeleri anladığınızdan emin olun. Bu sözleşme sizinle LyDian arasındaki yasal ilişkiyi düzenlemektedir. Özellikle D2 Turizm Belgesi gereksinimleri ve yasal yükümlülükler konusunda dikkatli olunuz.
            </p>
          </div>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 bg-gray-50 rounded-xl p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">İçindekiler</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <section.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {section.title}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
              className="scroll-mt-20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>

              <div className="space-y-6 pl-0 sm:pl-16">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">İletişim Bilgileri</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Transfer Hizmetleri Destek</h3>
              <div className="space-y-2 text-gray-700">
                <p>E-posta: transfer-support@lydian.com</p>
                <p>7/24 Acil Hat: 0850 XXX XX XX</p>
                <p>WhatsApp: 0850 XXX XX XX</p>
                <p>Adres: Örnek Mahallesi, Teknoloji Caddesi No:123</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Yasal İşlemler</h3>
              <div className="space-y-2 text-gray-700">
                <p>E-posta: legal@lydian.com</p>
                <p>KVKK İletişim: kvkk@lydian.com</p>
                <p>Şikayet: complaints@lydian.com</p>
                <p>D2 Belgesi Destek: d2-support@lydian.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-4 sm:-mx-6 lg:-mx-8"
        >
          <div className="max-w-3xl mx-auto">
            {accepted ? (
              <div className="flex items-center justify-center gap-3 text-green-600 bg-green-50 py-4 rounded-lg border border-green-200">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">Sözleşme kabul edildi! Yönlendiriliyorsunuz...</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDecline}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Reddet ve Geri Dön</span>
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Kabul Ediyorum</span>
                </button>
              </div>
            )}

            <p className="text-center text-sm text-gray-500 mt-4">
              Bu sözleşmeyi kabul ederek, yukarıda belirtilen tüm şartları okuduğunuzu ve kabul ettiğinizi beyan edersiniz.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
