import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
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
  Printer
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OwnerTermsPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const lastUpdated = '21 Aralık 2025';

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      router.push('/owner/auth/register');
    }, 1000);
  };

  const handleDecline = () => {
    router.push('/owner/auth/register');
  };

  const sections = [
    {
      id: 'introduction',
      icon: FileText,
      title: '1. Giriş ve Genel Hükümler',
      content: [
        {
          subtitle: '1.1 Sözleşmenin Tarafları',
          text: 'Bu sözleşme, Ailydian platformunu işleten şirket ile platform üzerinden mülk kiralaması yapmak isteyen mülk sahipleri arasında akdedilmiştir.'
        },
        {
          subtitle: '1.2 Sözleşmenin Konusu',
          text: 'İşbu sözleşme, mülk sahiplerinin Ailydian platformu üzerinden mülklerini kiralamak üzere listelemesi, rezervasyon yönetimi, ödeme işlemleri ve tarafların hak ve yükümlülüklerini düzenlemektedir.'
        },
        {
          subtitle: '1.3 Tanımlar',
          text: 'Platform: Ailydian internet sitesi ve mobil uygulamalarını ifade eder. Mülk Sahibi: Platformda mülk ilanı veren ve kiralama işlemi gerçekleştiren gerçek veya tüzel kişiyi ifade eder. Misafir: Platform üzerinden mülk kiralayan kişiyi ifade eder. İlan: Mülk sahibi tarafından platforma eklenen konaklama biriminin detaylı açıklamasını ifade eder.'
        },
        {
          subtitle: '1.4 Kabullenme',
          text: 'Mülk sahibi, platforma kayıt olarak ve/veya platformu kullanmaya başlayarak işbu sözleşmenin tüm hükümlerini kabul etmiş sayılır.'
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
          text: 'Ailydian, her başarılı rezervasyon için mülk sahibinden %12-15 arasında değişen komisyon ücreti alır. Komisyon oranı, mülk tipi, sezon ve özel kampanyalara göre değişiklik gösterebilir.'
        },
        {
          subtitle: '2.2 Ödeme Zamanlaması',
          text: 'Mülk sahibine yapılacak ödemeler, misafirin check-in yapmasından sonra 48 saat içinde hesaba aktarılır. Ödemeler, mülk sahibinin tanımladığı banka hesabına veya tercih ettiği ödeme yöntemine yapılır.'
        },
        {
          subtitle: '2.3 Ödeme Yöntemleri',
          text: 'Banka havalesi (EFT/HAVALE), Kredi kartına iade, PayPal ve diğer elektronik ödeme yöntemleri desteklenmektedir.'
        },
        {
          subtitle: '2.4 Vergi ve Yasal Yükümlülükler',
          text: 'Mülk sahibi, elde ettiği gelirle ilgili tüm vergi ve yasal yükümlülüklerden sorumludur. Ailydian gerekli hallerde stopaj kesintisi yapabilir.'
        },
        {
          subtitle: '2.5 Ödeme Güvencesi',
          text: 'Tüm ödemeler Ailydian güvencesi altındadır. Misafir ödemesini yaptıktan sonra, mülk sahibi ödemeyi garanti altında alır.'
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
          text: 'Esnek İptal: Check-in tarihinden 7 gün öncesine kadar ücretsiz iptal. Orta Esnek İptal: Check-in tarihinden 14 gün öncesine kadar ücretsiz iptal. Katı İptal: Check-in tarihinden 30 gün öncesine kadar ücretsiz iptal. İade Yok: Hiçbir koşulda iade yapılmaz.'
        },
        {
          subtitle: '3.2 Mülk Sahibi İptali',
          text: 'Mülk sahibi, onaylanmış bir rezervasyonu iptal edemez. Zorunlu hallerde iptal edilmesi durumunda, misafire tam iade yapılır ve mülk sahibine ceza uygulanabilir.'
        },
        {
          subtitle: '3.3 Misafir İptali',
          text: 'Misafir, seçilen iptal politikasına göre rezervasyonunu iptal edebilir. İptal koşulları, rezervasyon sırasında açıkça belirtilir.'
        },
        {
          subtitle: '3.4 Force Majeure',
          text: 'Doğal afet, salgın, savaş gibi mücbir sebep hallerinde, Ailydian özel iptal koşulları uygulayabilir ve taraflar arası adil bir çözüm bulunur.'
        }
      ]
    },
    {
      id: 'responsibilities',
      icon: Shield,
      title: '4. Sorumluluklar ve Yükümlülükler',
      content: [
        {
          subtitle: '4.1 Mülk Sahibinin Sorumlulukları',
          text: 'Mülk sahibi, ilanda verdiği bilgilerin doğru, güncel ve eksiksiz olduğunu garanti eder. Mülkün temiz, kullanılabilir durumda ve ilandaki açıklamalara uygun olduğunu taahhüt eder. Misafire güvenli ve konforlu bir konaklama deneyimi sunmakla yükümlüdür.'
        },
        {
          subtitle: '4.2 İlan Gereksinimleri',
          text: 'Mülk sahibi, mülkün gerçek fotoğraflarını kullanmalıdır. Tüm özellikler (oda sayısı, kapasite, olanaklar) doğru belirtilmelidir. Konum bilgisi kesin ve güncel olmalıdır.'
        },
        {
          subtitle: '4.3 Rezervasyon Yönetimi',
          text: 'Mülk sahibi, rezervasyon taleplerini 24 saat içinde yanıtlamalıdır. Check-in ve check-out işlemlerini zamanında ve sorunsuz gerçekleştirmelidir. Misafir ile iletişimde profesyonel ve saygılı olmalıdır.'
        },
        {
          subtitle: '4.4 Bakım ve Temizlik',
          text: 'Her konaklamadan önce mülk profesyonel temizlik yapılmalıdır. Tüm ekipman ve cihazlar çalışır durumda olmalıdır. Mülkte herhangi bir hasar veya sorun durumunda derhal Ailydian\'a bildirilmelidir.'
        },
        {
          subtitle: '4.5 Yasal Uyumluluk',
          text: 'Mülk sahibi, yerel yasalara ve düzenlemelere uymakla yükümlüdür. Gerekli izin ve lisansları edinmek mülk sahibinin sorumluluğundadır.'
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
          text: 'Ailydian, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında mülk sahibi ve misafirlerin kişisel verilerini korumayı taahhüt eder.'
        },
        {
          subtitle: '5.2 Toplanan Veriler',
          text: 'Ad, soyad, e-posta, telefon numarası, adres bilgileri, Ödeme ve banka hesap bilgileri, Mülk bilgileri ve fotoğrafları, İletişim geçmişi ve rezervasyon detayları toplanmaktadır.'
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
          text: 'Mülk sahibi, KVKK kapsamında kişisel verilerine ilişkin bilgi talep etme, düzeltme talep etme, silme talep etme, işlemeye itiraz etme haklarına sahiptir.'
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
          text: '7/24 Canlı Destek: Platform üzerinden anlık destek. E-posta Desteği: support@ailydian.com. Telefon Desteği: 0850 XXX XX XX (09:00 - 22:00). Yardım Merkezi: Detaylı makaleler ve SSS.'
        },
        {
          subtitle: '6.2 Destek Konuları',
          text: 'Teknik sorunlar ve platform kullanımı, Rezervasyon yönetimi, Ödeme ve finansal konular, İptal ve iade işlemleri, Misafir şikayetleri, Mülk listeleme ve güncelleme konularında destek sağlanmaktadır.'
        },
        {
          subtitle: '6.3 Yanıt Süreleri',
          text: 'Acil durumlar: 1 saat içinde, Normal talepler: 4-6 saat içinde, Genel sorular: 24 saat içinde yanıtlanır.'
        },
        {
          subtitle: '6.4 Mülk Sahibi Eğitimi',
          text: 'Ailydian, mülk sahiplerine ücretsiz eğitim ve kaynak sağlar: Platform kullanım rehberleri, İyi ev sahibi olma ipuçları, Pazarlama ve fotoğrafçılık önerileri, Yasal uyumluluk bilgilendirmeleri.'
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
          text: 'Ailydian, bu sözleşme şartlarını değiştirme hakkını saklı tutar. Değişiklikler, mülk sahiplerine e-posta yoluyla bildirilir ve 15 gün sonra yürürlüğe girer.'
        },
        {
          subtitle: '7.2 Hesap Askıya Alma ve Sonlandırma',
          text: 'Ailydian, sözleşme şartlarını ihlal eden, yanıltıcı bilgi veren veya platformu kötüye kullanan mülk sahiplerinin hesaplarını askıya alabilir veya sonlandırabilir.'
        },
        {
          subtitle: '7.3 Uyuşmazlık Çözümü',
          text: 'Taraflar arasında doğabilecek uyuşmazlıklarda öncelikle dostane çözüm aranır. Çözülemeyen durumlar için Türkiye Cumhuriyeti mahkemeleri ve icra daireleri yetkilidir.'
        },
        {
          subtitle: '7.4 Yürürlük',
          text: 'İşbu sözleşme, mülk sahibinin platforma kayıt olmasıyla birlikte yürürlüğe girer ve taraflardan biri sözleşmeyi sonlandırana kadar geçerlidir.'
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
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Ailydian</span>
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
          href="/owner/auth/register"
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
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Mülk Sahibi Kullanım Koşulları ve Sözleşmesi
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
              <strong>Önemli Not:</strong> Lütfen bu sözleşmeyi dikkatlice okuyunuz. Ailydian platformuna mülk sahibi olarak kayıt olmadan önce tüm maddeleri anladığınızdan emin olun. Bu sözleşme sizinle Ailydian arasındaki yasal ilişkiyi düzenlemektedir.
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
                <section.icon className="w-5 h-5 text-[#FF214D] flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900 group-hover:text-[#FF214D] transition-colors">
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
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] rounded-xl flex items-center justify-center">
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
              <h3 className="font-semibold text-gray-900 mb-2">Genel İletişim</h3>
              <div className="space-y-2 text-gray-700">
                <p>E-posta: info@ailydian.com</p>
                <p>Telefon: 0850 XXX XX XX</p>
                <p>Adres: Örnek Mahallesi, Teknoloji Caddesi No:123</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Yasal İşlemler</h3>
              <div className="space-y-2 text-gray-700">
                <p>E-posta: legal@ailydian.com</p>
                <p>KVKK İletişim: kvkk@ailydian.com</p>
                <p>Şikayet: complaints@ailydian.com</p>
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
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
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
