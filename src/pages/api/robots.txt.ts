import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robotsContent = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://travel.lydian.com/api/sitemap.xml

# SEO Bot specific rules
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: YandexBot
Allow: /
Crawl-delay: 2

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: Applebot
Allow: /

# Block unnecessary crawlers
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /auth/
Disallow: /_next/
Disallow: /private/
Disallow: /temp/
Disallow: /.well-known/
Disallow: /test/
Disallow: /dev/

# Allow specific API endpoints that should be indexed
Allow: /api/sitemap.xml
Allow: /api/robots.txt

# Travel industry specific
# Allow travel comparison and booking engines
User-agent: TripAdvisorBot
Allow: /

User-agent: Booking.com
Allow: /

User-agent: Expedia
Allow: /

User-agent: Kayak
Allow: /

User-agent: Skyscanner
Allow: /

# Performance optimization
# Crawl-delay for heavy crawlers
User-agent: *
Crawl-delay: 1

# Host directive
Host: travel.lydian.com`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.status(200).send(robotsContent);
}

export const config = {
  api: {
    responseLimit: false,
  },
};