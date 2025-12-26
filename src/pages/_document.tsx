import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <meta charSet="utf-8" />
        {/* Futuristic Purple Gradient Theme Color */}
        <meta name="theme-color" content="#667EEA" />
        <link rel="manifest" href="/manifest.json" />

        {/* Modern SVG Favicon - Best for scalability */}
        <link rel="icon" type="image/svg+xml" href={`/favicon.svg?v=${Date.now()}`} />

        {/* Fallback PNG favicons for older browsers */}
        <link rel="icon" type="image/png" sizes="16x16" href={`/favicon-16x16.png?v=${Date.now()}`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicon-32x32.png?v=${Date.now()}`} />

        {/* Legacy .ico favicon */}
        <link rel="icon" href={`/favicon.ico?v=${Date.now()}`} />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href={`/apple-touch-icon.png?v=${Date.now()}`} />

        {/* Search Engine Verification Tags */}
        <meta name="google-site-verification" content="TV3lQxcrnOK813q8VrYGAMvVd1kgaPxuRJ5pmWpXrbQ" />
        <meta name="msvalidate.01" content="2F0B3D24686DAB121DC7BA5429119029" />
        <meta name="yandex-verification" content="travel-lydian-yandex-verification" />
        <meta name="baidu-site-verification" content="travel-lydian-baidu-verification" />

        {/* DNS Prefetch - Critical domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.lydian.com" />
        <link rel="dns-prefetch" href="https://api.travel.lydian.com" />

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
