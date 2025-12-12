/**
 * Hotels Sitemap
 * Dynamic sitemap for all active hotels
 */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://travel.ailydian.com';

  try {
    const hotels = await prisma.hotel.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
        mainImage: true,
        name: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${hotels.map(hotel => `  <url>
    <loc>${baseUrl}/hotels/${hotel.slug}</loc>
    <lastmod>${hotel.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${hotel.mainImage ? `
    <image:image>
      <image:loc>${hotel.mainImage}</image:loc>
      <image:title>${hotel.name}</image:title>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating hotels sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
