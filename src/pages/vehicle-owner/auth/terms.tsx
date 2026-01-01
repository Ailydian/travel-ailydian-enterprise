import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Car,
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
  Printer } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '../../../context/ToastContext';

export default function VehicleOwnerTermsPage() {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const lastUpdated = '21 Aralık 2025';

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      router.push('/vehicle-owner/auth/register');
    }, 1000);
  };

  const handleDecline = () => {
    router.push('/vehicle-owner/auth/register');
  };

  const sections = [
  {
    id: 'introduction',
    icon: FileText,
    title: '1. Giriş ve Genel Hükümler',
    content: [
    {
      subtitle: '1.1 Sözleşmenin Tarafları',
      text: 'Bu sözleşme, LyDian platformunu işleten şirket ile platform üzerinden araç kiralama hizmeti vermek isteyen araç sahipleri arasında akdedilmiştir.'
    },
    {
      subtitle: '1.2 Sözleşmenin Konusu',
      text: 'İşbu sözleşme, araç sahiplerinin LyDian platformu üzerinden araçlarını kiralamak üzere listelemesi, rezervasyon yönetimi, ödeme işlemleri ve tarafların hak ve yükümlülüklerini düzenlemektedir.'
    },
    {
      subtitle: '1.3 Tanımlar',
      text: 'Platform: LyDian internet sitesi ve mobil uygulamalarını ifade eder. Araç Sahibi: Platformda araç ilanı veren ve kiralama işlemi gerçekleştiren gerçek veya tüzel kişiyi ifade eder. Kiracı: Platform üzerinden araç kiralayan kişiyi ifade eder. İlan: Araç sahibi tarafından platforma eklenen aracın detaylı açıklamasını ifade eder.'
    },
    {
      subtitle: '1.4 Kabullenme',
      text: 'Araç sahibi, platforma kayıt olarak ve/veya platformu kullanmaya başlayarak işbu sözleşmenin tüm hükümlerini kabul etmiş sayılır.'
    }]

  },
  {
    id: 'commission',
    icon: CreditCard,
    title: '2. Komisyon Oranları ve Ödeme Koşulları',
    content: [
    {
      subtitle: '2.1 Komisyon Oranları',
      text: 'LyDian, her başarılı rezervasyon için araç sahibinden %12-15 arasında değişen komisyon ücreti alır. Komisyon oranı, araç tipi, kiralama süresi ve özel kampanyalara göre değişiklik gösterebilir.'
    },
    {
      subtitle: '2.2 Ödeme Zamanlaması',
      text: 'Araç sahibine yapılacak ödemeler, aracın kiracıya teslim edilmesinden sonra 48 saat içinde hesaba aktarılır. Ödemeler, araç sahibinin tanımladığı banka hesabına veya tercih ettiği ödeme yöntemine yapılır.'
    },
    {
      subtitle: '2.3 Ödeme Yöntemleri',
      text: 'Banka havalesi (EFT/HAVALE), Kredi kartına iade, PayPal ve diğer elektronik ödeme yöntemleri desteklenmektedir.'
    },
    {
      subtitle: '2.4 Vergi ve Yasal Yükümlülükler',
      text: 'Araç sahibi, elde ettiği gelirle ilgili tüm vergi ve yasal yükümlülüklerden sorumludur. Araç kiralama geliri, yıllık gelir vergisi beyannamesi kapsamında beyan edilmelidir. LyDian gerekli hallerde stopaj kesintisi yapabilir.'
    },
    {
      subtitle: '2.5 Ödeme Güvencesi',
      text: 'Tüm ödemeler LyDian güvencesi altındadır. Kiracı ödemesini yaptıktan sonra, araç sahibi ödemeyi garanti altında alır.'
    }]

  },
  {
    id: 'cancellation',
    icon: RefreshCw,
    title: '3. İptal Politikaları',
    content: [
    {
      subtitle: '3.1 İptal Politikası Türleri',
      text: 'Esnek İptal: Teslim tarihinden 7 gün öncesine kadar ücretsiz iptal. Orta Esnek İptal: Teslim tarihinden 14 gün öncesine kadar ücretsiz iptal. Katı İptal: Teslim tarihinden 30 gün öncesine kadar ücretsiz iptal. İade Yok: Hiçbir koşulda iade yapılmaz.'
    },
    {
      subtitle: '3.2 Araç Sahibi İptali',
      text: 'Araç sahibi, onaylanmış bir rezervasyonu iptal edemez. Zorunlu hallerde iptal edilmesi durumunda, kiracıya tam iade yapılır ve araç sahibine ceza uygulanabilir.'
    },
    {
      subtitle: '3.3 Kiracı İptali',
      text: 'Kiracı, seçilen iptal politikasına göre rezervasyonunu iptal edebilir. İptal koşulları, rezervasyon sırasında açıkça belirtilir.'
    },
    {
      subtitle: '3.4 Force Majeure',
      text: 'Doğal afet, salgın, savaş gibi mücbir sebep hallerinde, LyDian özel iptal koşulları uygulayabilir ve taraflar arası adil bir çözüm bulunur.'
    }]

  },
  {
    id: 'responsibilities',
    icon: Shield,
    title: '4. Sorumluluklar ve Yükümlülükler',
    content: [
    {
      subtitle: '4.1 Araç Sahibinin Sorumlulukları',
      text: 'Araç sahibi, ilanda verdiği bilgilerin doğru, güncel ve eksiksiz olduğunu garanti eder. Aracın temiz, yol güvenliğine uygun ve ilandaki açıklamalara uygun durumda olduğunu taahhüt eder. Kiracıya güvenli ve sorunsuz bir kiralama deneyimi sunmakla yükümlüdür. Araç, tüm bakımları yapılmış, çalışır durumda ve sürüşe hazır halde teslim edilmelidir.'
    },
    {
      subtitle: '4.2 İlan Gereksinimleri',
      text: 'Araç sahibi, aracın gerçek fotoğraflarını kullanmalıdır. Tüm özellikler (marka, model, yıl, yakıt tipi, vites tipi, kilometre bilgisi, koltuk sayısı, bagaj kapasitesi) doğru belirtilmelidir. Araç üzerindeki tüm hasarlar veya kusurlar açıkça belirtilmelidir. Araç lokasyonu kesin ve güncel olmalıdır.'
    },
    {
      subtitle: '4.3 Rezervasyon Yönetimi',
      text: 'Araç sahibi, rezervasyon taleplerini 24 saat içinde yanıtlamalıdır. Araç teslim ve iade işlemlerini zamanında ve sorunsuz gerçekleştirmelidir. Teslim sırasında araç kontrol formu doldurulmalı, fotoğraflar çekilmelidir. Kiracı ile iletişimde profesyonel ve saygılı olmalıdır.'
    },
    {
      subtitle: '4.4 Bakım ve Güvenlik',
      text: 'Her kiralama öncesinde araç profesyonel temizlik yapılmalıdır. Düzenli servis bakımları zamanında yaptırılmalıdır. Tüm güvenlik ekipmanları (airbag, ABS, lastikler vb.) çalışır durumda olmalıdır. Aracın muayenesi güncel olmalıdır. Herhangi bir arıza veya sorun durumunda derhal LyDian\'a ve kiracıya bildirilmelidir. Yedek araç temin etme veya alternatif çözüm sunma yükümlülüğü araç sahibine aittir.'
    },
    {
      subtitle: '4.5 Yasal Uyumluluk - Türkiye Araç Kiralama Gereksinimleri',
      text: 'Araç sahibi, aşağıdaki yasal gereklilikleri karşılamakla yükümlüdür:\n\n• Trafik Sigortası (Zorunlu): Tüm araçlarda geçerli trafik sigortası bulunmalıdır. Kiralama süresi boyunca sigorta geçerliliği kesintisiz olmalıdır.\n\n• Kasko Sigortası (Tavsiye Edilir): Araç hasarları için kapsamlı kasko sigortası yapılması şiddetle tavsiye edilir. Kasko olmayan araçlar için bu durum ilanda açıkça belirtilmelidir.\n\n• Araç Ruhsatı: Araç ruhsatı geçerli olmalı ve aracın üzerinde bulunmalıdır. Ruhsat bilgileri ilandaki araç bilgileriyle tam olarak eşleşmelidir.\n\n• Araç Muayenesi: Araç periyodik muayenesi güncel olmalıdır. Muayene tarihi geçmiş araçlar kiralanamaz.\n\n• Ticari Kiralama Lisansı: Düzenli olarak araç kiralama yapan sahipler için ticari kiralama belgesi gerekebilir. Belediye ve il özel idaresi düzenlemelerine uyum sağlanmalıdır.\n\n• Vergi Yükümlülükleri: Motorlu Taşıtlar Vergisi (MTV) ödenmiş olmalıdır. Araç kiralama geliri yıllık gelir vergisi beyannamesinde bildirilmelidir. Ticari kiralama yapılıyorsa, KDV mükellefi olunmalıdır.'
    }]

  },
  {
    id: 'privacy',
    icon: Lock,
    title: '5. Gizlilik ve Veri Koruma (KVKK)',
    content: [
    {
      subtitle: '5.1 Kişisel Verilerin Korunması',
      text: 'LyDian, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında araç sahibi ve kiracıların kişisel verilerini korumayı taahhüt eder.'
    },
    {
      subtitle: '5.2 Toplanan Veriler',
      text: 'Ad, soyad, e-posta, telefon numarası, adres bilgileri, Ödeme ve banka hesap bilgileri, Araç bilgileri ve fotoğrafları, Sürücü belgesi bilgileri, İletişim geçmişi ve rezervasyon detayları toplanmaktadır.'
    },
    {
      subtitle: '5.3 Verilerin Kullanım Amaçları',
      text: 'Veriler, rezervasyon ve ödeme işlemlerinin gerçekleştirilmesi, müşteri hizmetleri ve destek sağlanması, yasal yükümlülüklerin yerine getirilmesi, platform güvenliğinin sağlanması, pazarlama ve iletişim faaliyetleri (izin verilmesi halinde) için kullanılır.'
    },
    {
      subtitle: '5.4 Veri Güvenliği',
      text: 'Tüm veriler şifrelenmiş olarak saklanır. SSL sertifikası ile güvenli veri iletimi sağlanır. Düzenli güvenlik denetimleri yapılır. Yetkisiz erişime karşı çok katmanlı güvenlik önlemleri alınır.'
    },
    {
      subtitle: '5.5 Veri Saklama Süresi',
      text: 'Kişisel veriler, yasal yükümlülüklerin gerektirdiği süre boyunca veya veri sahibinin izninin devam ettiği süre boyunca saklanır.'
    },
    {
      subtitle: '5.6 Veri Sahibinin Hakları',
      text: 'Araç sahibi, KVKK kapsamında kişisel verilerine ilişkin bilgi talep etme, düzeltme talep etme, silme talep etme, işlemeye itiraz etme haklarına sahiptir.'
    }]

  },
  {
    id: 'support',
    icon: HeadphonesIcon,
    title: '6. Müşteri Desteği ve Yardım',
    content: [
    {
      subtitle: '6.1 Destek Kanalları',
      text: '7/24 Canlı Destek: Platform üzerinden anlık destek. E-posta Desteği: support@lydian.com. Telefon Desteği: 0850 XXX XX XX (09:00 - 22:00). Yardım Merkezi: Detaylı makaleler ve SSS.'
    },
    {
      subtitle: '6.2 Destek Konuları',
      text: 'Teknik sorunlar ve platform kullanımı, Rezervasyon yönetimi, Ödeme ve finansal konular, İptal ve iade işlemleri, Kiracı şikayetleri, Araç listeleme ve güncelleme konularında destek sağlanmaktadır.'
    },
    {
      subtitle: '6.3 Yanıt Süreleri',
      text: 'Acil durumlar: 1 saat içinde, Normal talepler: 4-6 saat içinde, Genel sorular: 24 saat içinde yanıtlanır.'
    },
    {
      subtitle: '6.4 Araç Sahibi Eğitimi',
      text: 'LyDian, araç sahiplerine ücretsiz eğitim ve kaynak sağlar: Platform kullanım rehberleri, İyi araç sahibi olma ipuçları, Pazarlama ve fotoğrafçılık önerileri, Yasal uyumluluk bilgilendirmeleri.'
    }]

  },
  {
    id: 'general',
    icon: AlertCircle,
    title: '7. Genel Hükümler',
    content: [
    {
      subtitle: '7.1 Sözleşme Değişiklikleri',
      text: 'LyDian, bu sözleşme şartlarını değiştirme hakkını saklı tutar. Değişiklikler, araç sahiplerine e-posta yoluyla bildirilir ve 15 gün sonra yürürlüğe girer.'
    },
    {
      subtitle: '7.2 Hesap Askıya Alma ve Sonlandırma',
      text: 'LyDian, sözleşme şartlarını ihlal eden, yanıltıcı bilgi veren veya platformu kötüye kullanan araç sahiplerinin hesaplarını askıya alabilir veya sonlandırabilir.'
    },
    {
      subtitle: '7.3 Uyuşmazlık Çözümü',
      text: 'Taraflar arasında doğabilecek uyuşmazlıklarda öncelikle dostane çözüm aranır. Çözülemeyen durumlar için Türkiye Cumhuriyeti mahkemeleri ve icra daireleri yetkilidir.'
    },
    {
      subtitle: '7.4 Yürürlük',
      text: 'İşbu sözleşme, araç sahibinin platforma kayıt olmasıyla birlikte yürürlüğe girer ve taraflardan biri sözleşmeyi sonlandırana kadar geçerlidir.'
    }]

  }];


  return (
    <div className="min-h-screen bg-lydian-glass-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-lydian-glass-dark border-b border-lydian-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-lydian-success to-lydian-success rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-lydian-text-inverse" />
              </div>
              <span className="text-xl font-bold text-lydian-text-inverse">LyDian</span>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-lydian-text-muted hover:bg-lydian-glass-dark-medium rounded-lg transition-colors">

                <Printer className="w-4 h-4" />
                <span className="text-sm font-medium">Yazdır</span>
              </button>
              <button
                onClick={() => {
                  // In a real app, this would trigger a PDF download
                  showToast({ type: 'info', title: 'PDF indirme özelliği yakında eklenecek' });
                }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-lydian-text-muted hover:bg-lydian-glass-dark-medium rounded-lg transition-colors">

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
          href="/vehicle-owner/auth/register"
          className="inline-flex items-center gap-2 text-lydian-text-dim hover:text-lydian-text-inverse mb-8 transition-colors">

          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Kayıt sayfasına dön</span>
        </Link>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12">

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-lydian-success to-lydian-success rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-lydian-text-inverse" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-lydian-text-inverse">
                Araç Kiralama Hizmet Sağlayıcı Sözleşmesi
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-lydian-text-dim mt-4">
            <span>Son Güncelleme: {lastUpdated}</span>
            <span>•</span>
            <span>Yürürlük Tarihi: 1 Ocak 2024</span>
          </div>
          <div className="mt-6 p-4 bg-lydian-primary-lighter border border-blue-200 rounded-lg">
            <p className="text-sm text-lydian-text-muted">
              <strong>Önemli Not:</strong> Lütfen bu sözleşmeyi dikkatlice okuyunuz. LyDian platformuna araç sahibi olarak kayıt olmadan önce tüm maddeleri anladığınızdan emin olun. Bu sözleşme sizinle LyDian arasındaki yasal ilişkiyi düzenlemektedir.
            </p>
          </div>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 bg-lydian-glass-dark rounded-xl p-6 border border-lydian-border">

          <h2 className="text-xl font-bold text-lydian-text-inverse mb-4">İçindekiler</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((section, index) =>
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-3 p-3 bg-lydian-glass-dark rounded-lg hover:bg-lydian-glass-dark-medium transition-colors group">

                <section.icon className="w-5 h-5 text-lydian-success flex-shrink-0" />
                <span className="text-sm font-medium text-lydian-text-inverse group-hover:text-lydian-success transition-colors">
                  {section.title}
                </span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) =>
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
            className="scroll-mt-20">

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-lydian-success to-lydian-success rounded-xl flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-lydian-text-inverse" />
                </div>
                <h2 className="text-2xl font-bold text-lydian-text-inverse">{section.title}</h2>
              </div>

              <div className="space-y-6 pl-0 sm:pl-16">
                {section.content.map((item, itemIndex) =>
              <div key={itemIndex} className="bg-lydian-glass-dark border border-lydian-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-lydian-text-inverse mb-3">
                      {item.subtitle}
                    </h3>
                    <p className="text-lydian-text-muted leading-relaxed whitespace-pre-line">
                      {item.text}
                    </p>
                  </div>
              )}
              </div>
            </motion.section>
          )}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border border-lydian-border">

          <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">İletişim Bilgileri</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lydian-text-inverse mb-2">Genel İletişim</h3>
              <div className="space-y-2 text-lydian-text-muted">
                <p>E-posta: info@lydian.com</p>
                <p>Telefon: 0850 XXX XX XX</p>
                <p>Adres: Örnek Mahallesi, Teknoloji Caddesi No:123</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lydian-text-inverse mb-2">Yasal İşlemler</h3>
              <div className="space-y-2 text-lydian-text-muted">
                <p>E-posta: legal@lydian.com</p>
                <p>KVKK İletişim: kvkk@lydian.com</p>
                <p>Şikayet: complaints@lydian.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 sticky bottom-0 bg-lydian-glass-dark border-t border-lydian-border p-6 -mx-4 sm:-mx-6 lg:-mx-8">

          <div className="max-w-3xl mx-auto">
            {accepted ?
            <div className="flex items-center justify-center gap-3 text-lydian-success bg-lydian-success-lighter py-4 rounded-lg border border-green-200">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">Sözleşme kabul edildi! Yönlendiriliyorsunuz...</span>
              </div> :

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                onClick={handleDecline}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-lydian-border-medium rounded-lg font-semibold text-lydian-text-muted hover:bg-lydian-glass-dark hover:border-lydian-border-heavy transition-all">

                  <XCircle className="w-5 h-5" />
                  <span>Reddet ve Geri Dön</span>
                </button>
                <button
                onClick={handleAccept}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-lydian-success to-lydian-success text-lydian-text-inverse rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all">

                  <CheckCircle2 className="w-5 h-5" />
                  <span>Kabul Ediyorum</span>
                </button>
              </div>
            }

            <p className="text-center text-sm text-lydian-text-muted mt-4">
              Bu sözleşmeyi kabul ederek, yukarıda belirtilen tüm şartları okuduğunuzu ve kabul ettiğinizi beyan edersiniz.
            </p>
          </div>
        </motion.div>
      </div>
    </div>);

}