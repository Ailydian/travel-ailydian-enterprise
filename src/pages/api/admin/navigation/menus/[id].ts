import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../../../../../lib/logger';

/**
 * SINGLE NAVIGATION MENU API
 * GET - Fetch single menu
 * PUT - Update menu
 * DELETE - Delete menu
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Menu ID is required',
    });
  }

  try {
    if (req.method === 'GET') {
      const menu = await prisma.navigationMenu.findUnique({
        where: { id },
        include: {
          children: {
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

      if (!menu) {
        return res.status(404).json({
          success: false,
          error: 'Menu not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: menu,
      });
    }

    if (req.method === 'PUT') {
      const {
        type,
        title,
        slug,
        href,
        icon,
        description,
        badge,
        order,
        isActive,
        parentId,
        translations,
        requiredRole,
        permissions,
        metadata,
        openInNewTab,
      } = req.body;

      // Check if menu exists
      const existingMenu = await prisma.navigationMenu.findUnique({
        where: { id },
      });

      if (!existingMenu) {
        return res.status(404).json({
          success: false,
          error: 'Menu not found',
        });
      }

      // If slug is changing, check for conflicts
      if (slug && slug !== existingMenu.slug) {
        const slugConflict = await prisma.navigationMenu.findUnique({
          where: { slug },
        });

        if (slugConflict) {
          return res.status(400).json({
            success: false,
            error: 'A menu with this slug already exists',
          });
        }
      }

      // Prevent circular parent-child relationships
      if (parentId && parentId === id) {
        return res.status(400).json({
          success: false,
          error: 'A menu cannot be its own parent',
        });
      }

      // Build update data
      const updateData: any = {};

      if (type !== undefined) updateData.type = type;
      if (title !== undefined) updateData.title = title;
      if (slug !== undefined) updateData.slug = slug;
      if (href !== undefined) updateData.href = href;
      if (icon !== undefined) updateData.icon = icon;
      if (description !== undefined) updateData.description = description;
      if (badge !== undefined) updateData.badge = badge;
      if (order !== undefined) updateData.order = order;
      if (isActive !== undefined) updateData.isActive = isActive;
      if (parentId !== undefined) updateData.parentId = parentId || null;
      if (translations !== undefined) updateData.translations = translations;
      if (requiredRole !== undefined) updateData.requiredRole = requiredRole;
      if (permissions !== undefined) updateData.permissions = permissions;
      if (metadata !== undefined) updateData.metadata = metadata;
      if (openInNewTab !== undefined) updateData.openInNewTab = openInNewTab;

      // Update menu
      const updatedMenu = await prisma.navigationMenu.update({
        where: { id },
        data: updateData,
        include: {
          children: {
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
        data: updatedMenu,
        message: 'Menu updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      // Check if menu exists
      const menu = await prisma.navigationMenu.findUnique({
        where: { id },
        include: {
          children: true,
        },
      });

      if (!menu) {
        return res.status(404).json({
          success: false,
          error: 'Menu not found',
        });
      }

      // Check if menu has children
      if (menu.children.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete menu with child items. Delete children first or reassign them.',
        });
      }

      // Delete menu
      await prisma.navigationMenu.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Menu deleted successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Navigation Menu API Error:', error as Error, {component:'Id'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
