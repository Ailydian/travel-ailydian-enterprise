/**
 * Flights Sitemap
 * Dynamic sitemap for popular flight routes
 */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://travel.ailydian.com';

  try {
    // Get unique routes (from-to combinations)
    const flights = await prisma.flight.findMany({
      where: { isActive: true },
      select: {
        departureAirport: true,
        departureCity: true,
        arrivalAirport: true,
        arrivalCity: true,
        flightType: true,
        updatedAt: true,
      },
      distinct: ['departureAirport', 'arrivalAirport'],
      orderBy: { updatedAt: 'desc' },
    });

    // Create unique route pages
    const uniqueRoutes = flights.map(flight => ({
      from: flight.departureAirport,
      fromCity: flight.departureCity,
      to: flight.arrivalAirport,
      toCity: flight.arrivalCity,
      type: flight.flightType,
      updatedAt: flight.updatedAt,
    }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes.map(route => `  <url>
    <loc>${baseUrl}/flights/${route.from}-${route.to}</loc>
    <lastmod>${route.updatedAt.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating flights sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
