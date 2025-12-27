import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../lib/logger';

/**
 * PUBLIC NAVIGATION API
 * Returns active navigation menus for frontend consumption
 * Supports caching and multi-language
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { type = 'HEADER', lang = 'tr' } = req.query;

      // Fetch active menus with hierarchy
      const menus = await prisma.navigationMenu.findMany({
        where: {
          type: type as string,
          isActive: true,
          parentId: null, // Only top-level items
        },
        orderBy: { order: 'asc' },
        include: {
          children: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
            include: {
              children: {
                where: { isActive: true },
                orderBy: { order: 'asc' },
              },
            },
          },
        },
      });

      // Transform menus for frontend (apply translations if needed)
      const transformedMenus = menus.map((menu: any) => {
        const translations = menu.translations || {};
        const langData = translations[lang as string] || {};

        return {
          id: menu.id,
          title: langData.title || menu.title,
          description: langData.description || menu.description,
          href: menu.href,
          icon: menu.icon,
          badge: menu.badge,
          openInNewTab: menu.openInNewTab,
          children: menu.children?.map((child: any) => {
            const childTranslations = child.translations || {};
            const childLangData = childTranslations[lang as string] || {};

            return {
              id: child.id,
              title: childLangData.title || child.title,
              description: childLangData.description || child.description,
              href: child.href,
              icon: child.icon,
              badge: child.badge,
              openInNewTab: child.openInNewTab,
              children: child.children?.map((subChild: any) => {
                const subTranslations = subChild.translations || {};
                const subLangData = subTranslations[lang as string] || {};

                return {
                  id: subChild.id,
                  title: subLangData.title || subChild.title,
                  description: subLangData.description || subChild.description,
                  href: subChild.href,
                  icon: subChild.icon,
                  badge: subChild.badge,
                  openInNewTab: subChild.openInNewTab,
                };
              }),
            };
          }),
        };
      });

      // Set cache headers (30 minutes)
      res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');

      return res.status(200).json({
        success: true,
        data: transformedMenus,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Navigation API Error:', error as Error, {component:'Menus'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
