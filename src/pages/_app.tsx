import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { SessionProvider } from 'next-auth/react'
import { ReactQueryProvider } from '../lib/react-query'
import { CartProvider } from '../context/CartContext'
import { VoiceCommandProvider } from '../context/VoiceCommandContext'
import { ToastProvider } from '../context/ToastContext'
import { PageLoader } from '../components/ui/PageLoader'
import Head from 'next/head'
import '../lib/i18n' // i18n konfigürasyonunu yükle
import '../styles/globals.css'
import '../styles/responsive.css'
import '../styles/ailydian-theme.css'
import '../styles/ailydian-advanced.css'
import 'leaflet/dist/leaflet.css'
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
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)
    const handleError = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleError)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleError)
    }
  }, [router])

  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        <ToastProvider position="top-right" maxToasts={3}>
          <CartProvider>
            <VoiceCommandProvider>
              <Head>
                <meta name="google-site-verification" content="TV3lQxcrnOK813q8VrYGAMvVd1kgaPxuRJ5pmWpXrbQ" />
                <meta name="msvalidate.01" content="2F0B3D24686DAB121DC7BA5429119029" />
                <meta name="yandex-verification" content="travel-ailydian-yandex-verification" />
                <meta name="baidu-site-verification" content="travel-ailydian-baidu-verification" />
              </Head>
              <DefaultSeo {...seoConfig} />
              <PageLoader isLoading={loading} />
              <Component {...pageProps} />
            </VoiceCommandProvider>
          </CartProvider>
        </ToastProvider>
      </ReactQueryProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp)
