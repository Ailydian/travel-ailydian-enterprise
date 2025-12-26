import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'LyDian Travel - AI-Powered Enterprise Travel Platform | Hotels, Flights & Transfers',
  titleTemplate: '%s | LyDian Travel',
  description: 'Discover the future of travel with LyDian AI. Book hotels, flights, and airport transfers worldwide. Blockchain-secured bookings, VR previews, and personalized AI travel planning.',

  canonical: 'https://travel.lydian.com',

  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://travel.lydian.com',
    siteName: 'LyDian Travel',
    title: 'LyDian Travel - AI-Powered Enterprise Travel Platform',
    description: 'Türkiye\'nin en gelişmiş AI destekli seyahat platformu. Oteller, uçuş biletleri ve havalimanı transferleri.',
    images: [
      {
        url: 'https://travel.lydian.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LyDian Travel Platform',
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
      content: 'LyDian Travel',
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
      content: 'LyDian Travel',
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
