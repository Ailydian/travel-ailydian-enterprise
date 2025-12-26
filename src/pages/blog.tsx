import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import { Calendar, User, Clock, Tag, ArrowRight, TrendingUp, Search } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: '2025 Yılında Keşfedilmesi Gereken 10 Gizli Cennet',
      excerpt: 'Turist kalabalığından uzak, doğal güzellikleriyle büyüleyen ve henüz keşfedilmemiş destinasyonları sizin için derledik. Bu cennet köşeleri mutlaka listenize ekleyin.',
      author: 'Ayşe Yılmaz',
      date: '24 Aralık 2025',
      readTime: '8 dakika',
      category: 'Destinasyonlar',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Yapay Zeka ile Seyahat Planlamak: Yeni Nesil Tatil Deneyimi',
      excerpt: 'Travel.com\'un yapay zeka destekli seyahat asistanı ile tatil planlamanız artık çok daha kolay ve kişiselleştirilmiş. İşte AI\'ın seyahate kattığı yenilikler.',
      author: 'Mehmet Demir',
      date: '22 Aralık 2025',
      readTime: '6 dakika',
      category: 'Teknoloji',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
      featured: true
    },
    {
      id: 3,
      title: 'Bütçe Dostu Seyahat İpuçları: Az Harcayıp Çok Gezin',
      excerpt: 'Sınırlı bütçenizle dünyanın en güzel yerlerini gezmek istiyorsanız, bu pratik ipuçları tam size göre. Paradan tasarruf ederken deneyimlerden ödün vermeyin.',
      author: 'Zeynep Kaya',
      date: '20 Aralık 2025',
      readTime: '10 dakika',
      category: 'Seyahat İpuçları',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop'
    },
    {
      id: 4,
      title: 'Kapadokya\'da Bir Hafta Sonu: Tam Rehber',
      excerpt: 'Kapadokya\'nın büyüleyici peribacaları, yer altı şehirleri ve balon turları ile unutulmaz bir hafta sonu geçirin. İşte detaylı gezi rehberimiz.',
      author: 'Ali Özkan',
      date: '18 Aralık 2025',
      readTime: '12 dakika',
      category: 'Destinasyonlar',
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=500&fit=crop'
    },
    {
      id: 5,
      title: 'Sürdürülebilir Turizm: Çevre Dostu Seyahat Rehberi',
      excerpt: 'Seyahat ederken doğaya saygılı olmanın yolları. Karbon ayak izinizi azaltın ve çevreyi koruyarak keşfedin.',
      author: 'Elif Şahin',
      date: '15 Aralık 2025',
      readTime: '7 dakika',
      category: 'Sürdürülebilirlik',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop'
    },
    {
      id: 6,
      title: 'Solo Seyahat: Yalnız Başına Güvenli Gezmek',
      excerpt: 'Tek başınıza seyahat etmenin avantajları ve güvenli bir yolculuk için bilmeniz gereken her şey. Solo gezginler için detaylı rehber.',
      author: 'Burak Aksoy',
      date: '12 Aralık 2025',
      readTime: '9 dakika',
      category: 'Seyahat İpuçları',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop'
    },
    {
      id: 7,
      title: 'Blockchain ile Güvenli Ödeme: Geleceğin Rezervasyon Sistemi',
      excerpt: 'Travel.com\'un blockchain tabanlı ödeme sistemi ile rezervasyonlarınız artık daha güvenli. İşte blockchain\'in seyahat sektörüne getirdiği yenilikler.',
      author: 'Can Yıldız',
      date: '10 Aralık 2025',
      readTime: '5 dakika',
      category: 'Teknoloji',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop'
    },
    {
      id: 8,
      title: 'Türkiye\'nin En Güzel 15 Plajı',
      excerpt: 'Masmavi sular, altın kumlar ve muhteşem manzaralar. Türkiye\'nin en güzel plajlarını keşfedin ve yaz tatilinizi planlayın.',
      author: 'Selin Aydın',
      date: '8 Aralık 2025',
      readTime: '11 dakika',
      category: 'Destinasyonlar',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop'
    },
    {
      id: 9,
      title: 'Çocuklu Seyahat: Ailece Tatil Rehberi',
      excerpt: 'Küçük çocuklarla seyahat ederken dikkat edilmesi gerekenler ve stressiz bir tatil için ipuçları. Ailece keyifli bir seyahat için hazırlıklı olun.',
      author: 'Fatma Koç',
      date: '5 Aralık 2025',
      readTime: '8 dakika',
      category: 'Seyahat İpuçları',
      image: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=800&h=500&fit=crop'
    }
  ];

  const categories = [
    'all',
    'Destinasyonlar',
    'Seyahat İpuçları',
    'Teknoloji',
    'Sürdürülebilirlik'
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <>
      <Head>
        <title>Blog - Travel.com</title>
        <meta name="description" content="Seyahat rehberleri, destinasyon önerileri, tatil ipuçları ve seyahat teknolojileri hakkında güncel blog yazıları." />
        <meta name="keywords" content="seyahat blogu, tatil rehberi, gezi yazıları, destinasyon önerileri, seyahat ipuçları" />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-lydian-primary to-lydian-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Travel.com Blog
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Seyahat rehberleri, destinasyon önerileri ve tatil ipuçları ile
                hayalinizdeki seyahati planlayın
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Blog yazılarında ara..."
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {searchQuery === '' && selectedCategory === 'all' && (
          <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-16">
            <div className="bg-transparent rounded-xl shadow-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-lydian-primary" />
                <h2 className="text-2xl font-bold text-white">Öne Çıkan Yazılar</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="group cursor-pointer">
                    <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-lydian-primary text-white text-sm font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lydian-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-lydian-primary text-white'
                    : 'bg-white/5 text-gray-200 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'Tümü' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-transparent rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-lydian-primary text-sm font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-lydian-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>

                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-2 text-lydian-primary font-semibold hover:gap-3 transition-all">
                    Devamını Oku
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aradığınız kriterlere uygun blog yazısı bulunamadı.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="bg-transparent py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-lydian-primary to-lydian-dark text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Blog Yazılarımızı Kaçırmayın
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                En yeni seyahat rehberleri ve destinasyon önerileri için haber bültenimize abone olun
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-transparent text-lydian-primary px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
                  Abone Ol
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="bg-white/5 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Popüler Etiketler
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                'Kapadokya',
                'İstanbul',
                'Antalya',
                'Seyahat İpuçları',
                'Bütçe Dostu',
                'Solo Seyahat',
                'Aile Tatili',
                'Sürdürülebilir Turizm',
                'Yapay Zeka',
                'Blockchain',
                'Plaj Tatili',
                'Kültür Turu',
                'Macera',
                'Gastronomi'
              ].map((tag, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-transparent rounded-full text-sm text-gray-200 hover:bg-lydian-primary hover:text-white transition-colors flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>
  );
}
