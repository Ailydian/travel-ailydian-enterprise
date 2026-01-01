import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  ArrowRight, Search, HelpCircle, MessageCircle, Phone, Mail,
  Clock, CheckCircle, AlertCircle, FileText, Headphones, Monitor,
  Shield, CreditCard, MapPin, Plane, Hotel, Car, Star, User,
  ChevronDown, ChevronUp, Send, Zap, Globe, Calendar, Settings, Compass } from 'lucide-react';
import { ModernHeader } from '../components/layout/ModernHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import { useToast } from '../context/ToastContext';

const supportCategories = [
{
  id: 'reservations',
  title: 'Rezervasyonlar',
  icon: Calendar,
  color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  description: 'Rezervasyon işlemleri, iptal ve değişiklikler'
},
{
  id: 'payments',
  title: 'Ödemeler',
  icon: CreditCard,
  color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  description: 'Ödeme sorunları, fatura ve geri ödeme'
},
{
  id: 'technical',
  title: 'Teknik Destek',
  icon: Settings,
  color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  description: 'Site kullanımı, hesap ve uygulama sorunları'
},
{
  id: 'travel',
  title: 'Seyahat Danışmanlığı',
  icon: Compass,
  color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  description: 'Destinasyon önerileri ve seyahat planlaması'
}];


const supportTickets = [
{
  id: 'TK-2024-001',
  title: 'Kapadokya turu iptal edildi',
  category: 'reservations',
  status: 'resolved',
  priority: 'high',
  createdAt: '2024-01-15',
  updatedAt: '2024-01-16',
  messages: 3,
  agent: 'Ayşe Demir'
},
{
  id: 'TK-2024-002',
  title: 'Ödeme gerçekleşmedi ancak para çekildi',
  category: 'payments',
  status: 'open',
  priority: 'urgent',
  createdAt: '2024-01-20',
  updatedAt: '2024-01-20',
  messages: 1,
  agent: 'Mehmet Kaya'
},
{
  id: 'TK-2024-003',
  title: 'Hesaba giriş yapamıyorum',
  category: 'technical',
  status: 'in-progress',
  priority: 'medium',
  createdAt: '2024-01-18',
  updatedAt: '2024-01-19',
  messages: 5,
  agent: 'Fatma Özkan'
},
{
  id: 'TK-2024-004',
  title: 'Bali tatili için öneri istiyorum',
  category: 'travel',
  status: 'resolved',
  priority: 'low',
  createdAt: '2024-01-10',
  updatedAt: '2024-01-14',
  messages: 8,
  agent: 'Ali Yılmaz'
}];


const supportStats = [
{
  title: 'Ortalama Yanıt Süresi',
  value: '2 saat',
  icon: Clock,
  color: 'text-lydian-primary'
},
{
  title: 'Müşteri Memnuniyeti',
  value: '98%',
  icon: Star,
  color: 'text-lydian-warning'
},
{
  title: 'Çözüm Oranı',
  value: '99.2%',
  icon: CheckCircle,
  color: 'text-lydian-success'
},
{
  title: 'Aktif Temsilci',
  value: '24/7',
  icon: Headphones,
  color: 'text-purple-600'
}];


export default function Support() {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newTicketData, setNewTicketData] = useState({
    category: '',
    title: '',
    description: '',
    priority: 'medium'
  });
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  const filteredTickets = supportTickets.filter((ticket) =>
  selectedCategory === 'all' || ticket.category === selectedCategory
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'in-progress':return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved':return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:return 'bg-lydian-bg/10 text-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':return 'border-l-4 border-red-500';
      case 'high':return 'border-l-4 border-orange-500';
      case 'medium':return 'border-l-4 border-lydian-primary';
      case 'low':return 'border-l-4 border-green-500';
      default:return 'border-l-4 border-gray-500';
    }
  };

  const handleNewTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({ type: 'success', title: 'Destek talebiniz başarıyla oluşturuldu! Size en kısa sürede dönüş yapacağız.' });
    setNewTicketData({ category: '', title: '', description: '', priority: 'medium' });
    setShowNewTicketForm(false);
  };

  return (
    <>
      <Head>
        <title>Destek Merkezi - AILYDIAN Holiday</title>
        <meta name="description" content="7/24 müşteri desteği, teknik yardım ve seyahat danışmanlığı." />
      </Head>

      <ModernHeader />

      <div className="min-h-screen" style={{ backgroundColor: 'white' }}>

        {/* Hero Section */}
        <div className="text-lydian-text-inverse py-16" style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #4682B4 50%, #0ea5e9 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Destek Merkezi
            </h1>
            <p className="text-xl mb-8" style={{ color: '#f0f9ff' }}>
              7/24 uzman ekibimizden hızlı ve etkili çözümler alın
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Support Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {supportStats.map((stat, index) =>
            <div key={index} className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-lydian-text-inverse dark:text-lydian-text-inverse mb-1">{stat.value}</div>
                <div className="text-sm text-lydian-text-dim dark:text-lydian-text-muted">{stat.title}</div>
              </div>
            )}
          </div>

          {/* Support Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-lydian-text-inverse dark:text-lydian-text-inverse mb-8 text-center">
              Destek Kategorileri
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportCategories.map((category) =>
              <div key={category.id} className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="mb-4">
                    <category.icon className="w-12 h-12 text-lydian-text-muted dark:text-lydian-text-dim group-hover:text-lydian-primary transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse mb-3 group-hover:text-lydian-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-lydian-text-dim dark:text-lydian-text-muted text-sm">
                    {category.description}
                  </p>
                  <div className={`mt-4 px-3 py-1 rounded-full text-xs font-medium ${category.color} inline-block`}>
                    Yardım Al
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* New Ticket Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowNewTicketForm(!showNewTicketForm)}
              className="bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-lydian-text-inverse px-8 py-3 rounded-lg hover:from-lydian-primary-dark hover:to-purple-700 transition-all font-semibold flex items-center mx-auto">

              <MessageCircle className="h-5 w-5 mr-2" />
              Yeni Destek Talebi Oluştur
            </button>
          </div>

          {/* New Ticket Form */}
          {showNewTicketForm &&
          <div className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse mb-6">
                Yeni Destek Talebi
              </h3>
              
              <form onSubmit={handleNewTicketSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                      Kategori
                    </label>
                    <select
                    required
                    className="w-full px-3 py-2 border border-lydian-border-medium dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border dark:bg-gray-700 dark:text-lydian-text-inverse"
                    value={newTicketData.category}
                    onChange={(e) => setNewTicketData({ ...newTicketData, category: e.target.value })}>

                      <option value="">Kategori Seçin</option>
                      <option value="reservations">Rezervasyonlar</option>
                      <option value="payments">Ödemeler</option>
                      <option value="technical">Teknik Destek</option>
                      <option value="travel">Seyahat Danışmanlığı</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                      Öncelik
                    </label>
                    <select
                    className="w-full px-3 py-2 border border-lydian-border-medium dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border dark:bg-gray-700 dark:text-lydian-text-inverse"
                    value={newTicketData.priority}
                    onChange={(e) => setNewTicketData({ ...newTicketData, priority: e.target.value })}>

                      <option value="low">Düşük</option>
                      <option value="medium">Orta</option>
                      <option value="high">Yüksek</option>
                      <option value="urgent">Acil</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                    Konu Başlığı
                  </label>
                  <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-lydian-border-medium dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border dark:bg-gray-700 dark:text-lydian-text-inverse"
                  value={newTicketData.title}
                  onChange={(e) => setNewTicketData({ ...newTicketData, title: e.target.value })}
                  placeholder="Sorununuzu kısaca özetleyin" />

                </div>
                
                <div>
                  <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                    Açıklama
                  </label>
                  <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-lydian-border-medium dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border dark:bg-gray-700 dark:text-lydian-text-inverse"
                  value={newTicketData.description}
                  onChange={(e) => setNewTicketData({ ...newTicketData, description: e.target.value })}
                  placeholder="Sorununuzu detaylı olarak açıklayın" />

                </div>
                
                <div className="flex gap-4">
                  <button
                  type="submit"
                  className="bg-lydian-primary text-lydian-text-inverse px-6 py-2 rounded-lg hover:bg-lydian-primary-dark transition-colors font-semibold">

                    Talep Oluştur
                  </button>
                  <button
                  type="button"
                  onClick={() => setShowNewTicketForm(false)}
                  className="bg-gray-300 dark:bg-gray-600 text-lydian-text-muted dark:text-lydian-text-dim px-6 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-lydian-bg/50 transition-colors">

                    İptal
                  </button>
                </div>
              </form>
            </div>
          }

          {/* Support Tickets */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-lydian-text-inverse dark:text-lydian-text-inverse">
                Destek Talepleriniz
              </h2>
              
              {/* Category Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all' ?
                  'bg-lydian-primary text-white' :
                  'bg-lydian-bg/5 dark:bg-gray-800 text-gray-200 dark:text-lydian-text-dim hover:bg-blue-50 dark:hover:bg-gray-700'}`
                  }>

                  Tümü
                </button>
                {supportCategories.map((category) =>
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id ?
                  'bg-lydian-primary text-white' :
                  'bg-lydian-bg/5 dark:bg-gray-800 text-gray-200 dark:text-lydian-text-dim hover:bg-blue-50 dark:hover:bg-gray-700'}`
                  }>

                    {category.title}
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {filteredTickets.map((ticket) =>
              <div key={ticket.id} className={`bg-lydian-glass-dark dark:bg-gray-800 rounded-lg shadow-md ${getPriorityColor(ticket.priority)}`}>
                  <div
                  className="p-6 cursor-pointer hover:bg-lydian-glass-dark dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}>

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-lg font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse">
                            {ticket.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status === 'open' ? 'Açık' :
                          ticket.status === 'in-progress' ? 'İnceleniyor' : 'Çözüldü'}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-lydian-text-dim dark:text-lydian-text-muted">
                          <span className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {ticket.id}
                          </span>
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {ticket.agent}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {ticket.messages} mesaj
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {ticket.updatedAt}
                          </span>
                        </div>
                      </div>
                      {selectedTicket === ticket.id ?
                    <ChevronUp className="h-5 w-5 text-lydian-text-muted" /> :
                    <ChevronDown className="h-5 w-5 text-lydian-text-muted" />
                    }
                    </div>
                  </div>
                  
                  {selectedTicket === ticket.id &&
                <div className="px-6 pb-6 border-t border-lydian-border dark:border-gray-600 pt-4">
                      <div className="bg-lydian-glass-dark dark:bg-gray-700 rounded-lg p-4 mb-4">
                        <p className="text-lydian-text-muted dark:text-lydian-text-dim">
                          Bu talep hakkında detaylı bilgi ve mesaj geçmişi burada görüntülenir. 
                          Müşteri temsilcinizle olan tüm iletişim kayıtları ve çözüm süreci takip edilebilir.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button className="bg-lydian-primary text-lydian-text-inverse px-4 py-2 rounded-lg hover:bg-lydian-primary-dark transition-colors text-sm">
                          Mesaj Gönder
                        </button>
                        <button className="bg-gray-300 dark:bg-gray-600 text-lydian-text-muted dark:text-lydian-text-dim px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-lydian-bg/50 transition-colors text-sm">
                          Dosya Ekle
                        </button>
                      </div>
                    </div>
                }
                </div>
              )}
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-gradient-to-br from-lydian-primary via-lydian-secondary to-pink-600 rounded-2xl p-8 text-lydian-text-inverse text-center">
            <h2 className="text-3xl font-bold mb-4">
              Anlık Destek İhtiyacınız Var mı?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              7/24 canlı destek ekibimizle hemen iletişime geçin
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="bg-gray-900 border-2 border-lydian-border-light rounded-lg p-6 hover:bg-gray-800 transition-colors group">
                <MessageCircle className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">Canlı Sohbet</h3>
                <p className="text-blue-100">Anında yanıt alın</p>
              </button>
              
              <button className="bg-gray-900 border-2 border-lydian-border-light rounded-lg p-6 hover:bg-gray-800 transition-colors group">
                <Phone className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">Telefon Desteği</h3>
                <p className="text-blue-100">+90 242 123 4567</p>
              </button>
              
              <button className="bg-gray-900 border-2 border-lydian-border-light rounded-lg p-6 hover:bg-gray-800 transition-colors group">
                <Mail className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">E-posta</h3>
                <p className="text-blue-100">destek@lydian.com</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingFooter />
    </>);

}