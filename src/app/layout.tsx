import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AilydianEcosystemFooter from '@/components/AilydianEcosystemFooter'
import { QueryProvider } from '@/components/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Travel Ailydian - AI-Powered Global Tourism Platform',
  description: 'Enterprise-grade AI-powered global tourism platform with interactive maps, dynamic pricing, and smart booking system.',
  keywords: 'travel, tourism, AI, booking, hotels, tours, Turkey, Istanbul, Cappadocia',
  authors: [{ name: 'Travel Ailydian' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Travel Ailydian - AI-Powered Global Tourism Platform',
    description: 'Enterprise-grade AI-powered global tourism platform with interactive maps, dynamic pricing, and smart booking system.',
    url: 'https://travel-ailydian-enterprise.vercel.app',
    siteName: 'Travel Ailydian',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel Ailydian',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Ailydian - AI-Powered Tourism',
    description: 'Enterprise-grade AI-powered global tourism platform',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <QueryProvider>
          <div className="min-h-screen bg-white">
            {children}
          </div>

          {/* Ailydian Ecosystem Cross-Links - Güvenli ekleme, mevcut footer'a zarar vermez */}
          <AilydianEcosystemFooter
            currentDomain="travel.ailydian.com"
            theme="dark"
            position="above-footer"
          />
        </QueryProvider>
      </body>
    </html>
  )
}