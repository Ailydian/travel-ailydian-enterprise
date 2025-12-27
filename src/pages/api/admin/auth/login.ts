import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';
import logger from '../../../../lib/logger';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set. Please configure it in your .env file.');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      logger.error('Admin login failed - missing credentials', new Error('Missing email or password'));
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    logger.info('Admin login attempt', { email });

    // Find admin user in database
    const adminUser = await prisma.admin.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!adminUser) {
      logger.error('Admin login failed - user not found', new Error('Invalid credentials'), { email });
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    if (!adminUser.isActive) {
      logger.error('Admin login failed - account deactivated', new Error('Account inactive'), { email });
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, adminUser.passwordHash);

    if (!isValidPassword) {
      logger.error('Admin login failed - invalid password', new Error('Invalid credentials'), { email });
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        adminId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        permissions: adminUser.permissions
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login timestamp
    await prisma.admin.update({
      where: { id: adminUser.id },
      data: { lastLogin: new Date() }
    });

    logger.info('Admin login successful', { email, role: adminUser.role });

    res.status(200).json({
      success: true,
      data: {
        token,
        admin: {
          id: adminUser.id,
          email: adminUser.email,
          role: adminUser.role,
          permissions: adminUser.permissions,
          lastLogin: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    logger.error('Admin login error', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
