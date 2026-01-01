import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'AILYDIAN Holiday - AI-Powered Holiday Travel Platform | Hotels, Flights & Transfers',
  titleTemplate: '%s | AILYDIAN Holiday',
  description: 'Discover the future of travel with AILYDIAN AI. Book hotels, flights, and airport transfers worldwide. Blockchain-secured bookings, VR previews, and personalized AI travel planning.',

  canonical: 'https://holiday.ailydian.com',

  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://holiday.ailydian.com',
    siteName: 'AILYDIAN Holiday',
    title: 'AILYDIAN Holiday - AI-Powered Holiday Travel Platform',
    description: 'Türkiye\'nin en gelişmiş AI destekli seyahat platformu. Oteller, uçuş biletleri ve havalimanı transferleri.',
    images: [
      {
        url: 'https://holiday.ailydian.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AILYDIAN Holiday Platform',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    handle: '@lydiantravel',
    site: '@lydiantravel',
    cardType: 'summary_large_image',
  },

  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'otel rezervasyon, ucuz otel, ucuz uçak bileti, havalimanı transfer, tatil paketleri, antalya otelleri, istanbul otelleri, all inclusive otel, hotel booking, flight booking, airport transfer, turkey hotels, lydian ai',
    },
    {
      name: 'author',
      content: 'AILYDIAN Holiday',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
    {
      name: 'application-name',
      content: 'AILYDIAN Holiday',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'theme-color',
      content: '#FF214D',
    },
  ],

  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

export default config;
