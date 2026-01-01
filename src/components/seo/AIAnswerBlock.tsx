/**
 * AI Answer Block Component
 *
 * Optimized for AI Search Engines (ChatGPT, Perplexity, Gemini, Advanced AI Systems)
 * Provides citation-ready, structured content with semantic markup
 *
 * Features:
 * - Schema.org structured data
 * - Semantic HTML5 elements
 * - Citation-optimized content blocks
 * - FAQ schema integration
 * - EEAT signals
 */

import React from 'react';
import { CheckCircle, Star, Award, TrendingUp, Shield } from 'lucide-react';

export interface AIAnswerBlockProps {
  topic: string;
  shortAnswer: string;
  expandedAnswer: string;
  keyFacts: string[];
  citations?: {
    source: string;
    url: string;
    date?: string;
  }[];
  trustSignals?: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];
  faqItems?: {
    question: string;
    answer: string;
  }[];
  structuredData?: Record<string, unknown>;
}

export const AIAnswerBlock: React.FC<AIAnswerBlockProps> = ({
  topic,
  shortAnswer,
  expandedAnswer,
  keyFacts,
  citations = [],
  trustSignals = [],
  faqItems = [],
  structuredData
}) => {
  return (
    <article
      className="ai-answer-block bg-lydian-glass-dark backdrop-blur-sm border border-lydian-border-light/10 rounded-2xl p-8 my-8"
      itemScope
      itemType="https://schema.org/Article">

      {/* Structured Data - JSON-LD */}
      {structuredData &&
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      }

      {/* AI-Optimized Header */}
      <header className="mb-6">
        <h2
          className="text-3xl font-bold text-lydian-text-inverse mb-4"
          itemProp="headline">

          {topic}
        </h2>

        {/* Short Answer - Optimized for AI snippet extraction */}
        <div
          className="ai-short-answer bg-gradient-to-r from-lydian-primary/10 to-lydian-secondary/10 border-l-4 border-lydian-primary rounded-lg p-4 mb-4"
          itemProp="abstract">

          <p className="text-lg font-semibold text-lydian-text-inverse leading-relaxed">
            {shortAnswer}
          </p>
        </div>
      </header>

      {/* Expanded Answer - Citation-Ready Content */}
      <section className="mb-6" itemProp="articleBody">
        <div className="prose prose-invert max-w-none">
          <p className="text-lydian-text-muted leading-relaxed text-base">
            {expandedAnswer}
          </p>
        </div>
      </section>

      {/* Key Facts - Bullet Points for AI Extraction */}
      {keyFacts.length > 0 &&
      <section className="mb-6">
          <h3 className="text-xl font-semibold text-lydian-text-inverse mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-lydian-primary" />
            Önemli Noktalar
          </h3>
          <ul className="space-y-2" itemProp="mentions">
            {keyFacts.map((fact, index) =>
          <li
            key={index}
            className="flex items-start gap-3 text-lydian-text-muted"
            itemProp="about">

                <span className="text-lydian-primary mt-1">•</span>
                <span className="flex-1">{fact}</span>
              </li>
          )}
          </ul>
        </section>
      }

      {/* Trust Signals - EEAT Enhancement */}
      {trustSignals.length > 0 &&
      <section className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustSignals.map((signal, index) =>
          <div
            key={index}
            className="bg-lydian-glass-dark backdrop-blur-sm border border-lydian-border-light/10 rounded-xl p-4 text-center">

                <div className="flex justify-center mb-2 text-lydian-primary">
                  {signal.icon}
                </div>
                <div className="text-sm text-lydian-text-dim mb-1">{signal.label}</div>
                <div className="text-lg font-bold text-lydian-text-inverse">{signal.value}</div>
              </div>
          )}
          </div>
        </section>
      }

      {/* FAQ Section - Structured for AI */}
      {faqItems.length > 0 &&
      <section
        className="mb-6"
        itemScope
        itemType="https://schema.org/FAQPage">

          <h3 className="text-xl font-semibold text-lydian-text-inverse mb-4">
            Sık Sorulan Sorular
          </h3>
          <div className="space-y-4">
            {faqItems.map((faq, index) =>
          <details
            key={index}
            className="bg-lydian-glass-dark backdrop-blur-sm border border-lydian-border-light/10 rounded-lg p-4 group"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question">

                <summary
              className="font-semibold text-lydian-text-inverse cursor-pointer list-none flex items-center justify-between"
              itemProp="name">

                  <span>{faq.question}</span>
                  <span className="text-lydian-primary group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div
              className="mt-3 text-lydian-text-muted leading-relaxed"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer">

                  <p itemProp="text">{faq.answer}</p>
                </div>
              </details>
          )}
          </div>
        </section>
      }

      {/* Citations - Source Attribution */}
      {citations.length > 0 &&
      <footer className="mt-6 pt-6 border-t border-lydian-border-light/10">
          <h4 className="text-sm font-semibold text-lydian-text-dim mb-3">Kaynaklar:</h4>
          <ul className="space-y-2">
            {citations.map((citation, index) =>
          <li
            key={index}
            className="text-sm text-lydian-text-muted"
            itemProp="citation">

                <a
              href={citation.url}
              className="hover:text-lydian-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer">

                  {citation.source}
                  {citation.date && ` (${citation.date})`}
                </a>
              </li>
          )}
          </ul>
        </footer>
      }

      {/* Metadata for AI Crawlers */}
      <meta itemProp="datePublished" content={new Date().toISOString()} />
      <meta itemProp="author" content="AILydian Travel Experts" />
      <meta itemProp="publisher" content="AILydian Travel Platform" />
    </article>);

};

/**
 * Preset: Antalya Tours AI Answer
 */
export const AntalyaToursAIAnswer: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Antalya Turları: En İyi Tekne, Macera ve Kültür Turları Rehberi",
    "description": "Antalya bölgesinde 16+ popüler tur seçeneği: Tekne turları, rafting, antik kentler, jeep safari ve daha fazlası. Profesyonel rehberlik ve en iyi fiyat garantisi.",
    "author": {
      "@type": "Organization",
      "name": "AILydian Travel",
      "url": "https://holiday.ailydian.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AILydian Travel Platform",
      "logo": {
        "@type": "ImageObject",
        "url": "https://holiday.ailydian.com/logo.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://holiday.ailydian.com/tours/antalya"
    },
    "about": [
    {
      "@type": "TouristTrip",
      "name": "Antalya Boat Tours",
      "description": "Comprehensive boat tour experiences in Antalya Mediterranean coast"
    },
    {
      "@type": "TouristTrip",
      "name": "Adventure Tours Antalya",
      "description": "Rafting, jeep safari, ATV, paragliding and zipline adventures"
    },
    {
      "@type": "TouristTrip",
      "name": "Cultural Heritage Tours",
      "description": "Ancient cities: Perge, Aspendos, Side, Termessos guided tours"
    }]

  };

  return (
    <AIAnswerBlock
      topic="Antalya Turları: En İyi Deneyimler ve Fiyatlar 2025"
      shortAnswer="Antalya bölgesinde 16+ popüler tur seçeneği sunuyoruz: Tekne turları (3 Adalar, Kemer Korsan), macera aktiviteleri (Köprülü Kanyon Rafting, Jeep Safari, Paragliding), kültürel geziler (Perge-Aspendos-Side antik kentleri, Demre Myra) ve özel deneyimler (Türk Hamamı, Türk Gecesi). Tüm turlar profesyonel rehberlik, otel transferi ve sigorta dahil, rakip platformlardan ortalama %15-20 daha uygun fiyatlarla."
      expandedAnswer="Antalya, Akdeniz'in incisi olarak sadece plajları değil, aynı zamanda zengin tur seçenekleriyle de dikkat çeker. Tekne turlarımızda Phaselis antik kenti kıyılarında yüzebilir, 3 Adalar turunda snorkeling yapabilirsiniz. Macera tutkunları için Köprülü Kanyon'da 14 km rafting, Toros Dağları'nda jeep safari ve Babadağ'dan 1700m yükseklikten paragliding imkanı sunuyoruz. Tarih meraklıları için Perge, Aspendos (dünyanın en iyi korunmuş Roma tiyatrosu) ve Side antik kentlerini kapsayan kültür turları düzenliyoruz. Ayrıca Demre Myra'da Noel Baba Kilisesi ve Kekova batık şehir tekne turu da popüler seçeneklerimiz arasında. Tüm turlarımızda PADI sertifikalı eğitmenler, arkeolog rehberler ve deneyimli kaptanlar görev alıyor. Fiyatlarımız GetYourGuide, Viator ve TripAdvisor gibi platformlardan ortalama %2-15 daha ekonomik ve en iyi fiyat garantisi veriyoruz."
      keyFacts={[
      "16+ farklı tur kategorisi: Tekne, macera, kültürel, doğa ve özel deneyimler",
      "Tüm turlarda otel transferi, profesyonel rehber ve sigorta dahil",
      "Rakip platformlardan %2-15 daha uygun fiyatlandırma garantisi",
      "PADI sertifikalı dalış eğitmenleri ve arkeolog rehberler",
      "24-48 saat öncesine kadar ücretsiz iptal imkanı",
      "Köprülü Kanyon rafting: Türkiye'nin en iyi parkuru (14 km, 12 rapids)",
      "Aspendos Tiyatrosu: Dünyanın en iyi korunmuş Roma tiyatrosu ziyareti",
      "Kemer Korsan Teknesi: Çocuklar için animasyon ve köpük partisi",
      "Kaş dalış turu: Akdeniz'in en berrak sularında 2 dalış",
      "Termessos: 1050m yükseklikte, Büyük İskender'in fethedemediği antik kent"]
      }
      trustSignals={[
      {
        icon: <Star className="w-6 h-6" />,
        label: "Ortalama Puan",
        value: "4.8/5"
      },
      {
        icon: <Award className="w-6 h-6" />,
        label: "Toplam Tur",
        value: "16+"
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        label: "Mutlu Misafir",
        value: "12,000+"
      },
      {
        icon: <Shield className="w-6 h-6" />,
        label: "Güvenli Ödeme",
        value: "SSL"
      }]
      }
      faqItems={[
      {
        question: "Antalya'da en popüler tur hangisi?",
        answer: "En popüler turlarımız: 1) Köprülü Kanyon Rafting (4.9 puan, 892 yorum), 2) Kemer Korsan Tekne Turu (aileler için ideal, 4.8 puan), 3) Perge-Aspendos-Side Antik Kentler Turu (tarih meraklıları için, 4.8 puan). Tekne turları yaz aylarında, rafting Mayıs-Ekim arası, antik kent turları ise yıl boyunca yapılabilir."
      },
      {
        question: "Antalya tur fiyatları ne kadar?",
        answer: "Tur fiyatlarımız 250 TL (Kaleiçi Yürüyüş Turu) ile 1250 TL (Belek Süper Kombo: Rafting+ATV+Zipline) arasında değişmektedir. Ortalama bir günlük tur 550-850 TL civarındadır ve otel transferi, rehber, öğle yemeği, ekipman ve sigorta dahildir. Rakip platformlara göre %2-15 daha ekonomik fiyat garantisi veriyoruz."
      },
      {
        question: "Antalya turlarında ne dahil?",
        answer: "Tüm turlarımızda standart olarak: Otel gidiş-dönüş transferi (Antalya, Kemer, Belek, Side bölgelerinden), profesyonel Türkçe/İngilizce rehber, sigorta dahildir. Tura göre değişen dahil hizmetler: Öğle yemeği (çoğu turda), ekipman (rafting, dalış, ATV), giriş ücretleri (müze, antik kentler), aktivite masrafları (tekne, teleferik). Hariç olanlar genellikle: Alkollü içecekler, kişisel harcamalar, profesyonel fotoğraf servisleri."
      },
      {
        question: "Antalya turları iptal politikası nedir?",
        answer: "Standart iptal politikamız: Turdan 24 saat öncesine kadar ücretsiz iptal. Bazı özel turlar (paragliding, dalış) için 48 saat öncesi geçerlidir. Hava şartları nedeniyle iptal edilen turlar için tam iade veya alternatif tarih sunuyoruz. İptal talebinizi en az belirtilen süre öncesinde iletmeniz halinde ödeme tutarının %100'ü iade edilir."
      },
      {
        question: "Çocuklu ailelere uygun Antalya turları hangileri?",
        answer: "Çocuklu ailelere önerdiğimiz turlar: 1) Kemer Korsan Tekne Turu (0 yaş+, animasyon ve köpük partisi dahil), 2) Antalya 3 Adalar Tekne Turu (0 yaş+, sakin sular), 3) Düden-Kurşunlu Şelaleleri (0 yaş+, doğa yürüyüşü), 4) Belek Aquapark-Dolphinland (0 yaş+, yunus şovu), 5) Zipline Macera Parkı (4 yaş+, çocuk parkuru mevcut), 6) Antalya Kaleiçi Yürüyüş Turu (0 yaş+, kültürel). Rafting ve ATV için minimum yaş 8-16 arasıdır."
      },
      {
        question: "Antalya'da en iyi rafting turu hangisi?",
        answer: "Köprülü Kanyon Rafting Turu, Türkiye'nin en iyi rafting parkurudur. 14 km uzunluğunda, 12 farklı rapids (hızlı akıntı) ile orta seviye zorlukta bir parkur sunar. Deneyimli PADI sertifikalı kaptanlar eşliğinde 8 yaş ve üzeri herkes katılabilir. Tur kapsamında: Tüm rafting ekipmanı (kask, can yeleği, kürek), profesyonel eğitim, açık büfe öğle yemeği, otel transferi ve sigorta dahildir. Fiyat: 637 TL (rakiplere göre %2 daha uygun). Sezon: Mayıs-Ekim arası her gün."
      },
      {
        question: "Aspendos Tiyatrosu nasıl gezilir?",
        answer: "Aspendos Tiyatrosu'nu gezmenin en iyi yolu Perge-Aspendos-Side Antik Kentler Turu'na katılmaktır (637 TL, 9 saat). Turda profesyonel arkeolog rehber eşliğinde Aspendos'un 15,000 kişilik tiyatrosunu, mükemmel akustiğini ve mimari detaylarını öğrenirsiniz. Aynı günde Perge antik kenti ve Side Apollon Tapınağı da ziyaret edilir. Otel transferi, rehber, öğle yemeği ve tüm giriş ücretleri dahildir. Turlar Salı, Perşembe ve Cumartesi günleri düzenlenir."
      },
      {
        question: "Antalya Kekova batık şehir turu ne kadar sürer?",
        answer: "Demre Myra ve Kekova Turu toplam 10 saat sürer. Program: Sabah otel alımı → Noel Baba Kilisesi (Aziz Nikolaos) ziyareti → Myra antik kenti Likya kaya mezarları → Öğle yemeği (balık restoranı) → Kekova özel tekne turu (batık şehir görüntüleme) → Akdeniz'de yüzme molaları → Akşam otel dönüşü. Fiyat: 735 TL. Turlar Çarşamba, Cuma ve Pazar günleri yapılır. 48 saat öncesine kadar ücretsiz iptal."
      }]
      }
      citations={[
      {
        source: "AILydian Travel Official Tour Database",
        url: "https://holiday.ailydian.com/tours/antalya",
        date: "2025"
      },
      {
        source: "Antalya Tourism Board - Official Statistics",
        url: "https://antalya.ktb.gov.tr",
        date: "2024"
      }]
      }
      structuredData={structuredData} />);


};

export default AIAnswerBlock;