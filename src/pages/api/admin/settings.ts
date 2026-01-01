import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../lib/logger';
import { withAdminAuth, AuthenticatedRequest } from '@/lib/middleware/admin-auth';

/**
 * SECURITY: V16 Critical Fix (CVSS 9.1) - Admin Authorization Added
 * Settings API - manages system configuration
 * This endpoint now requires valid admin authentication via JWT token
 * Access: Admin role with 'settings:read' or 'settings:write' permission required
 */

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  try {
    // SECURITY V16: Admin authentication is now enforced by withAdminAuth middleware
    // Only authenticated admins with proper permissions can access this endpoint

    if (req.method === 'GET') {
      // Return current system settings
      // In production, fetch from database

      const settings = {
        general: {
          siteName: 'Travel LyDian',
          siteUrl: 'https://holiday.ailydian.com',
          supportEmail: 'support@lydian.com',
          defaultLanguage: 'tr',
          defaultCurrency: 'TRY',
          timezone: 'Europe/Istanbul',
        },
        payment: {
          stripeEnabled: true,
          stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
          paypalEnabled: false,
          iyzicoEnabled: true,
        },
        notifications: {
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
          bookingAlerts: true,
          paymentAlerts: true,
          systemAlerts: true,
        },
        security: {
          twoFactorEnabled: false,
          sessionTimeout: 3600,
          maxLoginAttempts: 5,
        },
        api: {
          rateLimit: 100,
          apiVersion: 'v1',
          webhookEnabled: true,
        },
      };

      return res.status(200).json({
        success: true,
        data: settings,
      });
    }

    if (req.method === 'PUT') {
      // SECURITY V16: Verify admin has write permission for PUT requests
      // This is an additional check beyond the middleware
      const hasWritePermission = req.admin.permissions.includes('*') ||
        req.admin.permissions.includes('settings:write');

      if (!hasWritePermission) {
        return res.status(403).json({
          success: false,
          error: 'Insufficient permissions - settings:write required',
        });
      }

      const { section, data } = req.body;

      // In production, save to database
      // For now, just return success

      return res.status(200).json({
        success: true,
        message: 'Settings updated successfully',
        data,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Settings API Error:', error as Error, {component:'Settings'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}

// SECURITY V16: Wrap handler with admin authentication middleware
// GET requires 'settings:read', PUT requires 'settings:write' (checked inside handler)
export default withAdminAuth(handler, ['settings:read']);
