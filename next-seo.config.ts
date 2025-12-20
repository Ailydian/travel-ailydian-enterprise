import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'Ailydian Travel - AI-Powered Enterprise Travel Platform | Hotels, Flights & Transfers',
  titleTemplate: '%s | Ailydian Travel',
  description: 'Discover the future of travel with Ailydian AI. Book hotels, flights, and airport transfers worldwide. Blockchain-secured bookings, VR previews, and personalized AI travel planning.',

  canonical: 'https://travel.ailydian.com',

  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://travel.ailydian.com',
    siteName: 'Ailydian Travel',
    title: 'Ailydian Travel - AI-Powered Enterprise Travel Platform',
    description: 'Türkiye\'nin en gelişmiş AI destekli seyahat platformu. Oteller, uçuş biletleri ve havalimanı transferleri.',
    images: [
      {
        url: 'https://travel.ailydian.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ailydian Travel Platform',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    handle: '@ailydiantravel',
    site: '@ailydiantravel',
    cardType: 'summary_large_image',
  },

  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'otel rezervasyon, ucuz otel, ucuz uçak bileti, havalimanı transfer, tatil paketleri, antalya otelleri, istanbul otelleri, all inclusive otel, hotel booking, flight booking, airport transfer, turkey hotels, ailydian ai',
    },
    {
      name: 'author',
      content: 'Ailydian Travel',
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
      content: 'Ailydian Travel',
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
