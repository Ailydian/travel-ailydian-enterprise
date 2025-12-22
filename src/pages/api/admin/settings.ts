import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

// Settings API - manages system configuration
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      // Return current system settings
      // In production, fetch from database

      const settings = {
        general: {
          siteName: 'Travel Ailydian',
          siteUrl: 'https://travel.ailydian.com',
          supportEmail: 'support@ailydian.com',
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
    console.error('Settings API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
