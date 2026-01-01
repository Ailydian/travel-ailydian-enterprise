import React from 'react';
import Head from 'next/head';
import { ModernHeader } from '../components/layout/ModernHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import { Shield, Lock, Eye, UserCheck, FileText, AlertCircle, CheckCircle2, Mail, Phone } from 'lucide-react';

export default function KVKK() {
  return (
    <>
      <Head>
        <title>KVKK Aydınlatma Metni - Travel.com</title>
        <meta name="description" content="Travel.com kişisel verilerin korunması ve işlenmesi hakkında KVKK aydınlatma metni. Veri güvenliği ve gizlilik politikamız." />
        <meta name="keywords" content="KVKK, kişisel verilerin korunması, veri güvenliği, gizlilik, aydınlatma metni" />
      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-lydian-primary to-lydian-dark text-lydian-text-inverse py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-16 h-16" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  KVKK Aydınlatma Metni
                </h1>
                <p className="text-xl text-blue-100">
                  Kişisel Verilerin Korunması ve İşlenmesi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 mb-16">
          <div className="bg-lydian-bg-hover rounded-xl shadow-xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lydian-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-lydian-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lydian-text-inverse mb-1">Güvenli Veri İşleme</h3>
                  <p className="text-sm text-lydian-text-dim">Verileriniz 256-bit SSL ile korunur</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lydian-success-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-lydian-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-lydian-text-inverse mb-1">Şeffaf Süreç</h3>
                  <p className="text-sm text-lydian-text-dim">Ne, neden, nasıl işlendiğini bilirsiniz</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lydian-text-inverse mb-1">Haklar Saklı</h3>
                  <p className="text-sm text-lydian-text-dim">Verileriniz üzerinde tam kontrole sahipsiniz</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 pb-16">
          {/* Introduction */}
          <section className="bg-lydian-bg-hover rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">Giriş</h2>
            <p className="text-lydian-text-muted mb-4">
              Travel.com olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında veri sorumlusu sıfatıyla,
              kişisel verilerinizin korunmasına ve güvenliğine azami özen göstermekteyiz. Bu aydınlatma metni ile kişisel verilerinizin
              hangi amaçlarla işlendiği, kimlere ve hangi amaçlarla aktarılabileceği, veri işleme yöntemlerimiz ve yasal haklarınız
              hakkında sizleri bilgilendirmeyi amaçlıyoruz.
            </p>
            <p className="text-lydian-text-muted">
              İşbu KVKK Aydınlatma Metni, Travel.com web sitesi, mobil uygulamalar ve tüm dijital platformlarımız üzerinden
              sunulan hizmetlerimizi kullanmanız sırasında kişisel verilerinizin işlenmesine ilişkin bilgileri içermektedir.
            </p>
          </section>

          {/* Data Controller */}
          <section className="bg-lydian-bg-hover rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-lydian-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-lydian-primary" />
              </div>
              <h2 className="text-2xl font-bold text-lydian-text-inverse">Veri Sorumlusu</h2>
            </div>
            <div className="space-y-3 text-lydian-text-muted">
              <p><strong>Şirket Ünvanı:</strong> Travel.com Seyahat ve Turizm A.Ş.</p>
              <p><strong>Adres:</strong> Atatürk Bulvarı No: 456, Alanya Merkez, 07400 Alanya/Antalya</p>
              <p><strong>E-posta:</strong> kvkk@holiday.ailydian.com</p>
              <p><strong>Telefon:</strong> +90 (850) 555 12 34</p>
            </div>
          </section>

          {/* Data Collection */}
          <section className="bg-lydian-bg-hover rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">
              İşlenen Kişisel Veriler
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-lydian-primary pl-4">
                <h3 className="text-lg font-semibold text-lydian-text-inverse mb-3">Kimlik Bilgileri</h3>
                <ul className="space-y-2 text-lydian-text-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Ad, soyad, T.C. kimlik numarası, doğum tarihi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Pasaport numarası (uluslararası seyahatler için)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Cinsiyet bilgisi</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-lydian-primary pl-4">
                <h3 className="text-lg font-semibold text-lydian-text-inverse mb-3">İletişim Bilgileri</h3>
                <ul className="space-y-2 text-lydian-text-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>E-posta adresi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Telefon numarası (cep telefonu ve/veya sabit telefon)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Adres bilgileri (ikamet, fatura adresi)</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-lydian-text-inverse mb-3">Finansal Bilgiler</h3>
                <ul className="space-y-2 text-lydian-text-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Kredi kartı bilgileri (tokenize edilmiş, şifrelenmiş)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Banka hesap bilgileri (iade işlemleri için)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Fatura bilgileri</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-lydian-success pl-4">
                <h3 className="text-lg font-semibold text-lydian-text-inverse mb-3">İşlem Güvenliği Bilgileri</h3>
                <ul className="space-y-2 text-lydian-text-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>IP adresi, çerez kayıtları</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Tarayıcı bilgileri, işletim sistemi bilgileri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Konum bilgileri (onay vermeniz halinde)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Processing Purposes */}
          <section className="bg-lydian-bg-hover rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">
              Kişisel Verilerin İşlenme Amaçları
            </h2>

            <div className="space-y-4 text-lydian-text-muted">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-lydian-text-inverse rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <p>Seyahat ve konaklama rezervasyonlarınızın alınması, işlenmesi ve yerine getirilmesi</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-lydian-text-inverse rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <p>Müşteri hizmetleri ve destek süreçlerinin yürütülmesi</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-lydian-text-inverse rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <p>Ödeme ve fatura işlemlerinin gerçekleştirilmesi</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-lydian-text-inverse rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <p>Yasal yükümlülüklerin yerine getirilmesi (vergi, ticaret kanunları vb.)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-lydian-text-inverse rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <p>Kullanıcı deneyiminin iyileştirilmesi ve kişiselleştirilmiş hizmet sunulması</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-lydian-text-inverse rounded-full flex items-center justify-center text-sm font-bold">6</span>
                <p>Pazarlama ve reklam faaliyetlerinin yürütülmesi (onayınız dahilinde)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-lydian-text-inverse rounded-full flex items-center justify-center text-sm font-bold">7</span>
                <p>Platform güvenliğinin sağlanması ve dolandırıcılığın önlenmesi</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-lydian-text-inverse rounded-full flex items-center justify-center text-sm font-bold">8</span>
                <p>İstatistiksel analiz ve raporlama faaliyetlerinin gerçekleştirilmesi</p>
              </div>
            </div>
          </section>

          {/* Legal Basis */}
          <section className="bg-lydian-bg-hover rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">
              Kişisel Verilerin İşlenme Hukuki Sebepleri
            </h2>

            <div className="space-y-3 text-lydian-text-muted">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                <span><strong>Sözleşmenin kurulması ve ifası:</strong> Rezervasyon sözleşmesinin yerine getirilmesi için gerekli olması</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                <span><strong>Hukuki yükümlülük:</strong> Vergi, ticaret ve seyahat mevzuatından kaynaklanan yasal zorunluluklar</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                <span><strong>Meşru menfaat:</strong> Dolandırıcılığın önlenmesi, platform güvenliğinin sağlanması</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                <span><strong>Açık rıza:</strong> Pazarlama iletişimi, kişiselleştirilmiş öneriler için açık onayınız</span>
              </p>
            </div>
          </section>

          {/* Data Transfer */}
          <section className="bg-lydian-bg-hover rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">
              Kişisel Verilerin Aktarılması
            </h2>

            <p className="text-lydian-text-muted mb-4">
              Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda ve KVKK&apos;nın 8. ve 9. maddelerinde
              belirtilen şartlara uygun olarak aşağıdaki kişi ve kuruluşlara aktarılabilmektedir:
            </p>

            <div className="space-y-3 text-lydian-text-muted">
              <p className="flex items-start gap-2">
                <span className="text-lydian-primary mt-1">•</span>
                <span>Otel, havayolu, araç kiralama şirketleri gibi hizmet sağlayıcılar</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lydian-primary mt-1">•</span>
                <span>Ödeme kuruluşları ve finansal kuruluşlar</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lydian-primary mt-1">•</span>
                <span>Teknoloji altyapı ve veri depolama hizmet sağlayıcıları</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lydian-primary mt-1">•</span>
                <span>Yasal yükümlülükler gereği kamu kurum ve kuruluşları</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lydian-primary mt-1">•</span>
                <span>İş ortaklarımız ve tedarikçilerimiz (gizlilik sözleşmeleri çerçevesinde)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lydian-primary mt-1">•</span>
                <span>Hukuk, vergi ve mali müşavirlik hizmeti sağlayan danışmanlar</span>
              </p>
            </div>

            <div className="mt-6 bg-lydian-primary-lighter border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-lydian-text-muted">
                  Yurt dışına veri aktarımı yapılması durumunda, KVKK&apos;nın 9. maddesinde öngörülen şartlara uyulmakta ve
                  yeterli güvenlik önlemleri alınmaktadır.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="bg-lydian-bg-hover rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-lydian-primary/10 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-lydian-primary" />
              </div>
              <h2 className="text-2xl font-bold text-lydian-text-inverse">Veri Güvenliği</h2>
            </div>

            <p className="text-lydian-text-muted mb-4">
              Kişisel verilerinizin güvenliğini sağlamak için aşağıdaki teknik ve idari tedbirleri almaktayız:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-lydian-border rounded-lg p-4">
                <h3 className="font-semibold text-lydian-text-inverse mb-2">Teknik Önlemler</h3>
                <ul className="space-y-2 text-sm text-lydian-text-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>256-bit SSL sertifikası ile şifreli bağlantı</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Güvenlik duvarı (firewall) koruması</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Düzenli güvenlik testleri ve penetrasyon testleri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Veri yedekleme sistemleri</span>
                  </li>
                </ul>
              </div>

              <div className="border border-lydian-border rounded-lg p-4">
                <h3 className="font-semibold text-lydian-text-inverse mb-2">İdari Önlemler</h3>
                <ul className="space-y-2 text-sm text-lydian-text-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Erişim yetkilendirme ve log kayıt sistemi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Çalışan gizlilik sözleşmeleri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Düzenli personel eğitimleri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lydian-success flex-shrink-0 mt-0.5" />
                    <span>Veri işleme envanteri tutulması</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-lydian-bg-hover rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-lydian-primary/10 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-lydian-primary" />
              </div>
              <h2 className="text-2xl font-bold text-lydian-text-inverse">Kişisel Veri Sahibi Olarak Haklarınız</h2>
            </div>

            <p className="text-lydian-text-muted mb-4">
              KVKK&apos;nın 11. maddesi uyarınca, kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-lydian-glass-dark rounded-lg">
                <Eye className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lydian-text-inverse mb-1">Bilgi Alma Hakkı</h3>
                  <p className="text-sm text-lydian-text-muted">Kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-lydian-glass-dark rounded-lg">
                <FileText className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lydian-text-inverse mb-1">Amaç ve Aktarım Bilgisi</h3>
                  <p className="text-sm text-lydian-text-muted">İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içi/yurt dışı aktarım bilgilerini talep etme</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-lydian-glass-dark rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lydian-text-inverse mb-1">Düzeltme ve Güncelleme</h3>
                  <p className="text-sm text-lydian-text-muted">Eksik veya yanlış işlenmiş kişisel verilerinizin düzeltilmesini talep etme</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-lydian-glass-dark rounded-lg">
                <AlertCircle className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lydian-text-inverse mb-1">Silme ve Yok Etme</h3>
                  <p className="text-sm text-lydian-text-muted">Kişisel verilerinizin silinmesini veya yok edilmesini talep etme (yasal saklama yükümlülükleri saklı kalmak kaydıyla)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-lydian-glass-dark rounded-lg">
                <Shield className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lydian-text-inverse mb-1">İtiraz Etme</h3>
                  <p className="text-sm text-lydian-text-muted">Otomatik sistemler ile analiz edilmesi sonucunda aleyhinize bir sonuç doğması halinde itiraz etme</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-lydian-glass-dark rounded-lg">
                <Mail className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lydian-text-inverse mb-1">Şikayete Başvurma</h3>
                  <p className="text-sm text-lydian-text-muted">KVKK&apos;ya aykırılık halinde Kişisel Verileri Koruma Kurulu&apos;na şikayette bulunma</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact for Rights */}
          <section className="bg-gradient-to-r from-lydian-primary to-lydian-dark text-lydian-text-inverse rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Haklarınızı Nasıl Kullanabilirsiniz?</h2>
            <p className="text-blue-100 mb-6">
              Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki yollardan bize başvurabilirsiniz:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-lydian-glass-dark-medium backdrop-blur rounded-lg p-4">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">E-posta</p>
                  <a href="mailto:kvkk@holiday.ailydian.com" className="text-blue-100 hover:text-lydian-text-inverse">
                    kvkk@holiday.ailydian.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-lydian-glass-dark-medium backdrop-blur rounded-lg p-4">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Telefon</p>
                  <p className="text-blue-100">+90 (850) 555 12 34</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-lydian-glass-dark-medium backdrop-blur rounded-lg p-4">
                <FileText className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Yazılı Başvuru</p>
                  <p className="text-blue-100">Atatürk Bulvarı No: 456, Alanya Merkez, 07400 Alanya/Antalya</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-lydian-glass-dark-medium backdrop-blur rounded-lg">
              <p className="text-sm text-blue-100">
                Başvurularınız, talebin niteliğine göre en geç 30 gün içerisinde ücretsiz olarak
                sonuçlandırılacaktır. İşlemin ayrıca bir maliyeti gerektirmesi halinde,
                Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir.
              </p>
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-center mt-12 pt-8 border-t border-lydian-border">
            <p className="text-lydian-text-dim">
              <strong>Son Güncelleme:</strong> 26 Aralık 2025
            </p>
            <p className="text-sm text-lydian-text-muted mt-2">
              Bu aydınlatma metni, yasal düzenlemelerdeki değişiklikler veya şirketimizin
              uygulamalarındaki güncellemeler doğrultusunda revize edilebilir.
            </p>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>);

}