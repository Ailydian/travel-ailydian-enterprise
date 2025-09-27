import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { SessionProvider } from 'next-auth/react'
import { ReactQueryProvider } from '../lib/react-query'
import { CartProvider } from '../context/CartContext'
import '../lib/i18n' // i18n konfigürasyonunu yükle
import '../styles/globals.css'
import '../styles/ailydian-theme.css'
import '../styles/ailydian-advanced.css'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'

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

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps & {
  pageProps: { session: Session }
}) {
  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        <CartProvider>
          <DefaultSeo {...seoConfig} />
          <Component {...pageProps} />
        </CartProvider>
      </ReactQueryProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp)
