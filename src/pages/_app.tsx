import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

const seoConfig = {
  title: 'Travel.Ailydian - AI Destekli Turizm Platformu',
  description: 'Yapay zeka destekli seyahat önerileri ile dünyayı keşfedin. Kişiselleştirilmiş öneriler ve güvenli rezervasyonlar.',
  canonical: 'https://travel.ailydian.com',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://travel.ailydian.com',
    siteName: 'Travel.Ailydian',
    title: 'Travel.Ailydian - AI Destekli Turizm Platformu',
    description: 'Yapay zeka destekli seyahat önerileri ile dünyayı keşfedin.',
    images: [
      {
        url: 'https://travel.ailydian.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel.Ailydian',
      },
    ],
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp)
