/**
 * Airport Transfers Sitemap
 * Dynamic sitemap for all transfer routes
 */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://travel.ailydian.com';

  try {
    const transfers = await prisma.airportTransfer.findMany({
      where: { isActive: true },
      select: {
        id: true,
        fromLocation: true,
        toLocation: true,
        region: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${transfers.map(transfer => `  <url>
    <loc>${baseUrl}/transfers/${transfer.id}</loc>
    <lastmod>${transfer.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating transfers sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
