import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  MessageCircle,
  Headphones,
  CheckCircle,
  Sparkles,
  Globe
} from 'lucide-react';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import { NeoHero, FuturisticButton, NeoSection } from '../components/neo-glass';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      details: ['+90 242 123 45 67', '+90 242 123 45 68'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Mail,
      title: 'E-posta',
      details: ['info@lydian.com', 'destek@lydian.com'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MapPin,
      title: 'Adres',
      details: ['Atatürk Bulvarı No: 456', 'Alanya Merkez', '07400 Alanya / Antalya'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      details: ['Pazartesi - Cuma: 09:00 - 18:00', 'Cumartesi: 09:00 - 16:00', 'Pazar: Kapalı'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Canlı Destek',
      description: 'Anında yanıt alın',
      action: 'Sohbete Başla',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Headphones,
      title: 'Telefon Desteği',
      description: '7/24 erişilebilir',
      action: 'Ara: +90 242 123 45 67',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: Mail,
      title: 'E-posta Desteği',
      description: '24 saat içinde yanıt',
      action: 'E-posta Gönder',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const quickLinks = [
    { title: 'Yardım Merkezi', href: '/help', icon: Sparkles },
    { title: 'Sık Sorulan Sorular', href: '/faq', icon: MessageCircle },
    { title: 'Rezervasyonlarım', href: '/my-trips', icon: CheckCircle },
    { title: 'Canlı Destek', href: '/support', icon: Headphones },
  ];

  return (
    <>
      <Head>
        <title>İletişim - LyDian Travel | 7/24 Müşteri Hizmetleri</title>
        <meta
          name="description"
          content="Bize ulaşın. Tüm sorularınız için 7/24 müşteri hizmetleri, canlı destek ve profesyonel yardım ekibi."
        />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* Hero Section */}
        <NeoHero
          title="Bize Ulaşın"
          subtitle="Sorularınız için 7/24 hizmetinizdeyiz. Her zaman yanınızdayız."
          image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop&q=85"
          gradient="ocean"
          height="60vh"
          overlayOpacity={0.5}
          showFloatingElements={true}
        >
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <FuturisticButton
              variant="glass"
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
              iconPosition="left"
            >
              Canlı Destek
            </FuturisticButton>
            <FuturisticButton
              variant="outline"
              size="lg"
              icon={<Phone className="w-5 h-5" />}
              iconPosition="left"
            >
              Bizi Arayın
            </FuturisticButton>
          </div>
        </NeoHero>

        {/* Contact Form & Info Section */}
        <section className="py-20 bg-lydian-glass-dark backdrop-blur-xl border-b border-lydian-border-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-3xl p-8 md:p-10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
                    <Send className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-3xl font-black text-lydian-text-inverse">Mesaj Gönderin</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-lydian-text-inverse mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-lydian-bg/50 backdrop-blur-sm border border-lydian-border-light rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-lydian-text-inverse placeholder-lydian-text-tertiary outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-lydian-text-inverse mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-lydian-bg/50 backdrop-blur-sm border border-lydian-border-light rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-lydian-text-inverse placeholder-lydian-text-tertiary outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-lydian-text-inverse mb-2">
                      Konu
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-lydian-bg/50 backdrop-blur-sm border border-lydian-border-light rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-lydian-text-inverse outline-none appearance-none cursor-pointer"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                    <label className="block text-sm font-semibold text-lydian-text-inverse mb-2">
                      Mesaj
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-lydian-bg/50 backdrop-blur-sm border border-lydian-border-light rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-lydian-text-inverse placeholder-lydian-text-tertiary outline-none resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <FuturisticButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    icon={<Send className="w-5 h-5" />}
                    iconPosition="left"
                    glow={true}
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                  </FuturisticButton>

                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <p className="text-green-400 text-sm font-medium">
                        Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                      </p>
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-3xl p-6 group cursor-default"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        <info.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-lydian-text-inverse mb-3">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-lydian-text-dim text-base leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <NeoSection
          title="Destek Kanallarımız"
          subtitle="Size en uygun iletişim yöntemini seçin"
          background="gradient"
          padding="xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-3xl p-8 text-center group cursor-pointer"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${channel.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <channel.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-lydian-text-inverse mb-3">
                  {channel.title}
                </h3>
                <p className="text-lydian-text-dim mb-6">{channel.description}</p>
                <FuturisticButton variant="outline" size="md" fullWidth>
                  {channel.action}
                </FuturisticButton>
              </motion.div>
            ))}
          </div>
        </NeoSection>

        {/* Quick Links */}
        <section className="py-20 bg-lydian-glass-dark backdrop-blur-xl border-t border-lydian-border-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <Globe className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl font-black text-lydian-text-inverse">Hızlı Bağlantılar</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickLinks.map((link, index) => (
                  <Link key={index} href={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 px-5 py-4 bg-white/5 backdrop-blur-sm border border-lydian-border-light rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all group"
                    >
                      <link.icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-lydian-text-inverse font-medium group-hover:text-cyan-400 transition-colors">
                        {link.title}
                      </span>
                      <ArrowRight className="w-4 h-4 text-lydian-text-muted ml-auto group-hover:translate-x-2 transition-transform" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <BookingFooter />
    </>
  );
}
