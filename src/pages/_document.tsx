import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />

        {/* Search Engine Verification Tags */}
        <meta name="google-site-verification" content="TV3lQxcrnOK813q8VrYGAMvVd1kgaPxuRJ5pmWpXrbQ" />
        <meta name="msvalidate.01" content="2F0B3D24686DAB121DC7BA5429119029" />
        <meta name="yandex-verification" content="travel-ailydian-yandex-verification" />
        <meta name="baidu-site-verification" content="travel-ailydian-baidu-verification" />

        {/* DNS Prefetch - Critical domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.ailydian.com" />
        <link rel="dns-prefetch" href="https://api.travel.ailydian.com" />

        {/* Preconnect - High priority resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Fonts - Display swap for fast FCP */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
