import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'
import { DefaultSeo } from 'next-seo'
import { SessionProvider } from 'next-auth/react'
import * as Sentry from '@sentry/nextjs'
import { ReactQueryProvider } from '../lib/react-query'
import { CartProvider } from '../context/CartContext'
import { VoiceCommandProvider } from '../context/VoiceCommandContext'
import { ToastProvider } from '../context/ToastContext'
import { ThemeProvider } from '../context/ThemeContext'
import { PageLoader } from '../components/ui/PageLoader'
import { ErrorBoundary } from '../components/ErrorBoundary'
import LyDianEcosystemFooter from '../components/LyDianEcosystemFooter'
import RTLWrapper from '../components/RTLWrapper'
import Head from 'next/head'
import '../lib/i18n' // i18n konfigürasyonunu yükle
import '../styles/globals.css'
import '../styles/responsive.css'
import '../styles/lydian-theme.css'
import '../styles/lydian-advanced.css'
import 'leaflet/dist/leaflet.css'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'

const seoConfig = {
  title: 'Travel.LyDian - AI Destekli Turizm Platformu',
  description: 'Yapay zeka destekli seyahat önerileri ile dünyayı keşfedin. Kişiselleştirilmiş öneriler ve güvenli rezervasyonlar.',
  canonical: 'https://travel.lydian.com',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://travel.lydian.com',
    siteName: 'Travel.LyDian',
    title: 'Travel.LyDian - AI Destekli Turizm Platformu',
    description: 'Yapay zeka destekli seyahat önerileri ile dünyayı keşfedin.',
    images: [
      {
        url: 'https://travel.lydian.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel.LyDian',
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

  // Track page view performance with Sentry
  useEffect(() => {
    // Set user context for Sentry if session exists
    if (session?.user?.id) {
      Sentry.setUser({
        id: session.user.id,
        email: session.user.email || undefined,
        username: (session.user as any)?.name || undefined,
      })
    } else {
      Sentry.setUser(null)
    }
  }, [session])

  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        <ThemeProvider defaultTheme="dark">
          <ToastProvider position="top-right" maxToasts={3}>
            <CartProvider>
              <VoiceCommandProvider>
                <RTLWrapper>
                  <ErrorBoundary>
                    <Head>
                      <meta name="google-site-verification" content="TV3lQxcrnOK813q8VrYGAMvVd1kgaPxuRJ5pmWpXrbQ" />
                      <meta name="msvalidate.01" content="2F0B3D24686DAB121DC7BA5429119029" />
                      <meta name="yandex-verification" content="travel-lydian-yandex-verification" />
                      <meta name="baidu-site-verification" content="travel-lydian-baidu-verification" />
                    </Head>
                    <DefaultSeo {...seoConfig} />
                    <PageLoader isLoading={loading} />
                    <Component {...pageProps} />
                    <LyDianEcosystemFooter
                      currentDomain="travel.lydian.com"
                      theme="light"
                      position="above-footer"
                    />
                  </ErrorBoundary>
                </RTLWrapper>
              </VoiceCommandProvider>
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
