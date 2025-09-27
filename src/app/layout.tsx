import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Travel Ailydian - AI-Powered Global Tourism Platform',
  description: 'Enterprise-grade AI-powered global tourism platform with interactive maps, dynamic pricing, and smart booking system.',
  keywords: 'travel, tourism, AI, booking, hotels, tours, Turkey, Istanbul, Cappadocia',
  authors: [{ name: 'Travel Ailydian' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
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
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
}