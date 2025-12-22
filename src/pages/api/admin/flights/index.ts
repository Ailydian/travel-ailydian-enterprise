import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const {
        page = '1',
        limit = '50',
        search,
        airline,
        departureAirport,
        arrivalAirport,
        isActive,
      } = req.query;

      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
      const take = parseInt(limit as string);

      const where: any = {};

      if (search) {
        where.OR = [
          { flightNumber: { contains: search as string, mode: 'insensitive' } },
          { airline: { contains: search as string, mode: 'insensitive' } },
          { departureCity: { contains: search as string, mode: 'insensitive' } },
          { arrivalCity: { contains: search as string, mode: 'insensitive' } },
        ];
      }

      if (airline) where.airline = airline;
      if (departureAirport) where.departureAirport = departureAirport;
      if (arrivalAirport) where.arrivalAirport = arrivalAirport;
      if (isActive !== undefined) where.isActive = isActive === 'true';

      const [flights, total] = await Promise.all([
        prisma.flight.findMany({
          where,
          skip,
          take,
          orderBy: { departureTime: 'desc' },
        }),
        prisma.flight.count({ where }),
      ]);

      return res.status(200).json({
        success: true,
        data: flights,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      });
    }

    if (req.method === 'POST') {
      const flightData = req.body;

      const flight = await prisma.flight.create({
        data: flightData,
      });

      return res.status(201).json({
        success: true,
        data: flight,
        message: 'Flight created successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Flight API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
