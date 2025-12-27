import Head from 'next/head';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import { useState } from 'react';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { BookingFooter } from '../components/layout/BookingFooter';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Head>
        <title>İletişim - LyDian Travel</title>
        <meta name="description" content="Bize ulaşın. Tüm sorularınız için 7/24 müşteri hizmetleri." />
      </Head>

      <FuturisticHeader />

      <div className="min-h-screen bg-lydian-glass-dark dark:bg-gray-900">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-lydian-text-inverse dark:text-lydian-text-inverse mb-4">
              Bize Ulaşın
            </h1>
            <p className="text-xl text-lydian-text-dim dark:text-lydian-text-muted">
              Sorularınız için 7/24 hizmetinizdeyiz
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse mb-6">
                Mesaj Gönderin
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-lydian-border-medium dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border dark:bg-gray-700 dark:text-lydian-text-inverse"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                </div>
                
                <div>
                  <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-lydian-border-medium dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border dark:bg-gray-700 dark:text-lydian-text-inverse"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                </div>
                
                <div>
                  <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                    Konu
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-lydian-border-medium dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border dark:bg-gray-700 dark:text-lydian-text-inverse"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}>

                    <option value="">Konu Seçiniz</option>
                    <option value="reservation">Rezervasyon</option>
                    <option value="payment">Ödeme</option>
                    <option value="cancel">İptal</option>
                    <option value="complaint">Şikayet</option>
                    <option value="suggestion">Öneri</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                    Mesaj
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-lydian-border-medium dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border dark:bg-gray-700 dark:text-lydian-text-inverse"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} />

                </div>
                
                <button
                  type="submit"
                  className="w-full bg-lydian-primary text-lydian-text-inverse py-3 px-6 rounded-lg hover:bg-lydian-primary-dark transition-colors font-semibold flex items-center justify-center">

                  <Send className="h-5 w-5 mr-2" />
                  Mesaj Gönder
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse mb-6">
                  İletişim Bilgileri
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-lydian-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse">E-posta</h3>
                      <p className="text-lydian-text-dim dark:text-lydian-text-muted">info@lydian.com</p>
                      <p className="text-lydian-text-dim dark:text-lydian-text-muted">destek@lydian.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-lydian-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse">E-posta</h3>
                      <p className="text-lydian-text-dim dark:text-lydian-text-muted">info@lydian.com</p>
                      <p className="text-lydian-text-dim dark:text-lydian-text-muted">destek@lydian.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-lydian-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse">Adres</h3>
                      <p className="text-lydian-text-dim dark:text-lydian-text-muted">
                        Atatürk Bulvarı No: 456<br />
                        Alanya Merkez<br />
                        07400 Alanya / Antalya
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-lydian-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse">Çalışma Saatleri</h3>
                      <p className="text-lydian-text-dim dark:text-lydian-text-muted">Pazartesi - Cuma: 09:00 - 18:00</p>
                      <p className="text-lydian-text-dim dark:text-lydian-text-muted">Cumartesi: 09:00 - 16:00</p>
                      <p className="text-lydian-text-dim dark:text-lydian-text-muted">Pazar: Kapalı</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse mb-6">
                  Hızlı Bağlantılar
                </h2>
                
                <div className="space-y-3">
                  <Link href="/help" className="block text-lydian-primary hover:text-lydian-primary-dark transition-colors">
                    → Yardım Merkezi
                  </Link>
                  <Link href="/faq" className="block text-lydian-primary hover:text-lydian-primary-dark transition-colors">
                    → Sık Sorulan Sorular
                  </Link>
                  <Link href="/my-trips" className="block text-lydian-primary hover:text-lydian-primary-dark transition-colors">
                    → Rezervasyonlarım
                  </Link>
                  <Link href="/support" className="block text-lydian-primary hover:text-lydian-primary-dark transition-colors">
                    → Canlı Destek
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingFooter />
    </>);

}