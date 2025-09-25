import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Search, HelpCircle, BookOpen, Phone, Mail, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'Rezervasyonumu nasıl iptal edebilirim?',
    answer: 'Rezervasyonunuzu iptal etmek için hesabınıza giriş yapıp "Seyahatlerim" bölümünden rezervasyonunuzu bulabilirsiniz. İptal koşulları rezervasyon tipine göre değişiklik gösterebilir.',
    category: 'rezervasyon'
  },
  {
    id: 2,
    question: 'Ödeme yaparken sorun yaşıyorum, ne yapmalıyım?',
    answer: 'Ödeme sorunları için öncelikle internet bağlantınızı kontrol edin. Kredi kartınızın limit durumunu ve güvenlik kodunu doğru girdiğinizden emin olun. Sorun devam ederse canlı destek ile iletişime geçin.',
    category: 'ödeme'
  },
  {
    id: 3,
    question: 'Uçak biletimi değiştirebilir miyim?',
    answer: 'Uçak bileti değişiklikleri havayolu şirketinin kurallarına tabi tutulur. Çoğu bilet türü için değişiklik ücreti alınır. Detaylar için rezervasyon detaylarınızı kontrol edebilirsiniz.',
    category: 'uçak'
  },
  {
    id: 4,
    question: 'Otel rezervasyonumda özel taleplerimi nasıl iletebilirim?',
    answer: 'Özel taleplerinizi rezervasyon sırasında "Özel Talepler" bölümünde belirtebilir veya rezervasyonunuz sonrasında müşteri hizmetleri ile iletişime geçebilirsiniz.',
    category: 'otel'
  },
  {
    id: 5,
    question: 'Ailydian Travel güvenli mi?',
    answer: 'Evet, Ailydian Travel SSL sertifikası ile korumalıdır. Tüm ödemeleriniz blockchain teknolojisi ile güvence altına alınır ve kişisel verileriniz KVKK standartlarında korunur.',
    category: 'güvenlik'
  },
  {
    id: 6,
    question: 'Puan sistemi nasıl çalışır?',
    answer: 'Her rezervasyonunuzda puan kazanırsınız. Kazandığınız puanları gelecek rezervasyonlarınızda indirim olarak kullanabilirsiniz. 100 puan = 10 TL indirim.',
    category: 'puan'
  },
  {
    id: 7,
    question: 'Grup rezervasyonu yapabilir miyim?',
    answer: 'Evet, 10 kişi ve üzeri gruplar için özel fiyatlar ve avantajlar sunuyoruz. Grup rezervasyonları için özel ekibimiz ile iletişime geçin.',
    category: 'grup'
  },
  {
    id: 8,
    question: 'Vize işlemleri konusunda yardım alabilir miyim?',
    answer: 'Vize danışmanlığı hizmeti sunuyoruz. Gitmek istediğiniz ülkenin vize gereksinimlerini öğrenebilir ve başvuru sürecinde destek alabilirsiniz.',
    category: 'vize'
  }
];

const categories = [
  { id: 'all', name: 'Tümü', icon: BookOpen },
  { id: 'rezervasyon', name: 'Rezervasyon', icon: HelpCircle },
  { id: 'ödeme', name: 'Ödeme', icon: HelpCircle },
  { id: 'uçak', name: 'Uçak Bileti', icon: HelpCircle },
  { id: 'otel', name: 'Otel', icon: HelpCircle },
  { id: 'güvenlik', name: 'Güvenlik', icon: HelpCircle },
];

const helpTopics = [
  {
    title: 'Rezervasyon Yönetimi',
    description: 'Rezervasyon yapma, iptal etme ve değiştirme işlemleri',
    icon: '📅',
    link: '#rezervasyon'
  },
  {
    title: 'Ödeme ve Faturalama',
    description: 'Ödeme yöntemleri, fatura talepleri ve iade işlemleri',
    icon: '💳',
    link: '#ödeme'
  },
  {
    title: 'Seyahat Dokümantasyonu',
    description: 'Pasaport, vize ve diğer seyahat belgeleri',
    icon: '📄',
    link: '#dokuman'
  },
  {
    title: 'Acil Durum Desteği',
    description: '7/24 acil durum yardım hattı ve destek',
    icon: '🚨',
    link: '#acil'
  },
  {
    title: 'Müşteri Hesabı',
    description: 'Hesap yönetimi, şifre değiştirme ve profil güncellemeleri',
    icon: '👤',
    link: '#hesap'
  },
  {
    title: 'Puan ve İndirimler',
    description: 'Sadakat programı, puan kazanma ve kullanma',
    icon: '🎁',
    link: '#puan'
  }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <>
      <Head>
        <title>Yardım Merkezi - Ailydian Travel</title>
        <meta name="description" content="Sık sorulan sorular ve yardım konuları. Tüm sorularınızın yanıtları burada." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  Ailydian Travel
                </Link>
              </div>
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 flex items-center"
              >
                <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                Ana Sayfa&apos;ya Dön
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Size Nasıl Yardımcı Olabiliriz?
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Sorularınızın yanıtlarını bulun veya bizimle iletişime geçin
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Sorunuzu yazın..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick Help Topics */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Popüler Yardım Konuları
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpTopics.map((topic, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="text-4xl mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Sık Sorulan Sorular
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Aradığınız sonuç bulunamadı
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Farklı anahtar kelimeler deneyin veya bizimle iletişime geçin
                </p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Hala Yardıma İhtiyacınız Var mı?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Uzman ekibimiz size yardımcı olmak için burada
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/contact"
                className="bg-gray-900 border-2 border-white rounded-lg p-6 hover:bg-gray-800 transition-colors group"
              >
                <Mail className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">İletişim Formu</h3>
                <p className="text-blue-100">Detaylı sorularınız için</p>
              </Link>
              
              <a
                href="mailto:info@ailydian.com"
                className="bg-gray-900 border-2 border-white rounded-lg p-6 hover:bg-gray-800 transition-colors group"
              >
                <Mail className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">E-posta Desteği</h3>
                <p className="text-blue-100">info@ailydian.com</p>
              </a>
              
              <button className="bg-gray-900 border-2 border-white rounded-lg p-6 hover:bg-gray-800 transition-colors group">
                <MessageCircle className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">Canlı Destek</h3>
                <p className="text-blue-100">Anında yardım alın</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}