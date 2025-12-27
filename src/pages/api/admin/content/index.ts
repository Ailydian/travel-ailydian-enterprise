import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../../../../lib/logger';

// Content management API
// Manages: Hero sections, Page sections, Menus, Footer content

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { type } = req.query; // hero, section, menu, footer

      // For now, return mock data
      // In production, this would fetch from a Content table in database

      const mockContent = {
        hero: {
          title: 'Türkiye\'nin En Kapsamlı Seyahat Platformu',
          subtitle: 'AI destekli seyahat planlama, oteller, turlar, uçuşlar ve daha fazlası',
          backgroundImage: '/hero-bg.jpg',
          ctaText: 'Keşfet',
          ctaLink: '/search',
        },
        sections: [
          {
            id: '1',
            type: 'features',
            title: 'Neden Travel LyDian?',
            items: [
              { icon: 'shield', title: 'Güvenli Ödeme', description: 'SSL sertifikalı güvenli ödeme' },
              { icon: 'star', title: '7/24 Destek', description: 'Her zaman yanınızdayız' },
            ],
          },
        ],
        menus: {
          header: [
            { label: 'Oteller', href: '/hotels', subItems: [] },
            { label: 'Turlar', href: '/tours', subItems: [] },
            { label: 'Uçuşlar', href: '/flights', subItems: [] },
            { label: 'Transferler', href: '/transfers', subItems: [] },
          ],
          footer: [
            { label: 'Hakkımızda', href: '/about' },
            { label: 'İletişim', href: '/contact' },
            { label: 'Blog', href: '/blog' },
          ],
        },
      };

      return res.status(200).json({
        success: true,
        data: type ? mockContent[type as keyof typeof mockContent] : mockContent,
      });
    }

    if (req.method === 'PUT') {
      const { type, data } = req.body;

      // In production, update content in database
      // For now, just return success

      return res.status(200).json({
        success: true,
        message: 'Content updated successfully',
        data,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Content API Error:', error as Error, {component:'Index'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
