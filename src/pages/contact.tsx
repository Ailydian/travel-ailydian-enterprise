import Head from 'next/head';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import { useState } from 'react';
import { BookingHeader } from '../components/layout/BookingHeader';
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
        <title>İletişim - Ailydian Travel</title>
        <meta name="description" content="Bize ulaşın. Tüm sorularınız için 7/24 müşteri hizmetleri." />
      </Head>

      <BookingHeader />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Bize Ulaşın
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Sorularınız için 7/24 hizmetinizdeyiz
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Mesaj Gönderin
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Konu
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mesaj
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Mesaj Gönder
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  İletişim Bilgileri
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">E-posta</h3>
                      <p className="text-gray-600 dark:text-gray-400">info@ailydian.com</p>
                      <p className="text-gray-600 dark:text-gray-400">destek@ailydian.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">E-posta</h3>
                      <p className="text-gray-600 dark:text-gray-400">info@ailydian.com</p>
                      <p className="text-gray-600 dark:text-gray-400">destek@ailydian.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Adres</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Atatürk Bulvarı No: 456<br/>
                        Alanya Merkez<br/>
                        07400 Alanya / Antalya
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Çalışma Saatleri</h3>
                      <p className="text-gray-600 dark:text-gray-400">Pazartesi - Cuma: 09:00 - 18:00</p>
                      <p className="text-gray-600 dark:text-gray-400">Cumartesi: 09:00 - 16:00</p>
                      <p className="text-gray-600 dark:text-gray-400">Pazar: Kapalı</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Hızlı Bağlantılar
                </h2>
                
                <div className="space-y-3">
                  <Link href="/help" className="block text-blue-600 hover:text-blue-700 transition-colors">
                    → Yardım Merkezi
                  </Link>
                  <Link href="/faq" className="block text-blue-600 hover:text-blue-700 transition-colors">
                    → Sık Sorulan Sorular
                  </Link>
                  <Link href="/my-trips" className="block text-blue-600 hover:text-blue-700 transition-colors">
                    → Rezervasyonlarım
                  </Link>
                  <Link href="/support" className="block text-blue-600 hover:text-blue-700 transition-colors">
                    → Canlı Destek
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingFooter />
    </>
  );
}