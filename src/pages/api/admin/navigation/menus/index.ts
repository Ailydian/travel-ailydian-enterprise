import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../../../lib/logger';

/**
 * NAVIGATION MENUS API
 * Manages dynamic navigation menus (Header, Footer, Sidebar, Mobile)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { type, isActive, parentId } = req.query;

      // Build where clause
      const where: any = {};

      if (type) {
        where.type = type;
      }

      if (isActive !== undefined) {
        where.isActive = isActive === 'true';
      }

      if (parentId !== undefined) {
        where.parentId = parentId === 'null' ? null : parentId;
      }

      // Fetch menus with hierarchy
      const menus = await prisma.navigationMenu.findMany({
        where,
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' },
        ],
        include: {
          children: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
          },
          parent: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: menus,
        total: menus.length,
      });
    }

    if (req.method === 'POST') {
      const {
        type = 'HEADER',
        title,
        slug,
        href,
        icon,
        description,
        badge,
        order = 0,
        isActive = true,
        parentId,
        translations,
        requiredRole,
        permissions = [],
        metadata,
        openInNewTab = false,
      } = req.body;

      // Validate required fields
      if (!title || !slug || !href) {
        return res.status(400).json({
          success: false,
          error: 'Title, slug, and href are required',
        });
      }

      // Check if slug already exists
      const existingMenu = await prisma.navigationMenu.findUnique({
        where: { slug },
      });

      if (existingMenu) {
        return res.status(400).json({
          success: false,
          error: 'A menu with this slug already exists',
        });
      }

      // Create menu item
      const menu = await prisma.navigationMenu.create({
        data: {
          type,
          title,
          slug,
          href,
          icon,
          description,
          badge,
          order,
          isActive,
          parentId: parentId || null,
          translations: translations || {},
          requiredRole,
          permissions,
          metadata: metadata || {},
          openInNewTab,
        },
        include: {
          children: true,
          parent: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      return res.status(201).json({
        success: true,
        data: menu,
        message: 'Menu created successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Navigation Menus API Error:', error as Error, {component:'Index'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
