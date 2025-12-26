/**
 * Premium Style Footer
 * Clean, organized multi-column layout with red accents
 */
import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Globe,
  Shield,
  Award,
  CreditCard,
  Headphones,
  ChevronRight
} from 'lucide-react';

export const BookingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: {
      title: 'Hizmetlerimiz',
      links: [
        { label: 'Oteller', href: '/hotels' },
        { label: 'Turlar', href: '/tours' },
        { label: 'Araç Kiralama', href: '/car-rentals' },
        { label: 'Transferler', href: '/transfers' },
        { label: 'Konaklama', href: '/rentals' },
      ]
    },
    support: {
      title: 'Destek',
      links: [
        { label: 'Yardım Merkezi', href: '/help' },
        { label: 'Müşteri Hizmetleri', href: '/help#contact' },
        { label: 'SSS', href: '/help#faq' },
        { label: 'İletişim', href: '/help#contact' },
        { label: 'Rezervasyon Yönetimi', href: '/help#booking' },
        { label: 'İptal ve İade', href: '/help#cancellation' },
      ]
    },
    company: {
      title: 'Kurumsal',
      links: [
        { label: 'Hakkımızda', href: '/about' },
        { label: 'Kariyer', href: '/careers' },
        { label: 'Partner Ol', href: '/partner' },
        { label: 'Basın', href: '/press' },
        { label: 'Blog', href: '/blog' },
      ]
    },
    legal: {
      title: 'Yasal',
      links: [
        { label: 'Kullanım Koşulları', href: '/terms' },
        { label: 'Gizlilik Politikası', href: '/privacy' },
        { label: 'Çerez Politikası', href: '/cookies' },
        { label: 'KVKK', href: '/kvkk' },
      ]
    }
  };

  const popularDestinations = [
    { name: 'İstanbul', href: '/destinations/istanbul' },
    { name: 'Antalya', href: '/destinations/antalya' },
    { name: 'Kapadokya', href: '/destinations/cappadocia' },
    { name: 'Bodrum', href: '/destinations/bodrum' },
    { name: 'İzmir', href: '/destinations/izmir' },
    { name: 'Marmaris', href: '/destinations/marmaris' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Özel Fırsatları Kaçırmayın!
              </h3>
              <p className="text-gray-400">
                En iyi fiyatları ve kampanyaları ilk siz öğrenin
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lydian-primary"
              />
              <button className="px-6 py-3 bg-lydian-primary text-white rounded-md font-semibold hover:bg-lydian-dark transition-colors whitespace-nowrap">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">{footerLinks.services.title}</h4>
            <ul className="space-y-2">
              {footerLinks.services.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">{footerLinks.support.title}</h4>
            <ul className="space-y-2">
              {footerLinks.support.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">{footerLinks.company.title}</h4>
            <ul className="space-y-2">
              {footerLinks.company.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">{footerLinks.legal.title}</h4>
            <ul className="space-y-2">
              {footerLinks.legal.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-white font-bold mb-4">Popüler Destinasyonlar</h4>
            <ul className="space-y-2">
              {popularDestinations.map((destination, index) => (
                <li key={index}>
                  <Link
                    href={destination.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <MapPin className="w-3 h-3 text-lydian-primary" />
                    <span>{destination.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Güvenli Ödeme</div>
                <div className="text-xs text-gray-400">256-bit SSL</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Güvenilir</div>
                <div className="text-xs text-gray-400">100K+ Mutlu Müşteri</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Esnek Ödeme</div>
                <div className="text-xs text-gray-400">Tüm Kartlar</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">24/7 Destek</div>
                <div className="text-xs text-gray-400">Her Zaman Yanınızda</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-lydian-primary" />
              <div>
                <div className="text-sm text-gray-400">Müşteri Hizmetleri</div>
                <div className="text-white font-semibold">+90 850 XXX XX XX</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-lydian-primary" />
              <div>
                <div className="text-sm text-gray-400">E-posta</div>
                <div className="text-white font-semibold">info@travel.lydian.com</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-lydian-primary" />
              <div>
                <div className="text-sm text-gray-400">Dil & Para Birimi</div>
                <div className="text-white font-semibold">Türkçe • ₺ TRY</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Payment Methods */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Bizi Takip Edin:</span>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-lydian-primary flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-lydian-primary flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-lydian-primary flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-lydian-primary flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-lydian-primary flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Ödeme Yöntemleri:</span>
              <div className="flex gap-2">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-700">
                  VISA
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-700">
                  MC
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-700">
                  AMEX
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-700">
                  TROY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-lydian-primary font-bold text-lg">Travel.com</span>
              <span>•</span>
              <span>© {currentYear} Tüm hakları saklıdır.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Powered by</span>
              <span className="text-white font-semibold">LyDian AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BookingFooter;
