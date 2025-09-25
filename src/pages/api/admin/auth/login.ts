import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface AdminUser {
  id: number;
  email: string;
  password_hash: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  is_active: boolean;
  last_login?: string;
  created_at: string;
}

// Mock admin users (in production, this would be in database)
const adminUsers: AdminUser[] = [
  {
    id: 1,
    email: 'admin@ailydian.com',
    password_hash: '$2b$12$zk7BGvPdgqiuWuNV80fDK.npWKe6wmQoAX6ZKNgOVBu0HaHBmuNlq', // "admin123"
    role: 'super_admin',
    permissions: ['*'],
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    email: 'moderator@ailydian.com',
    password_hash: '$2b$12$dSVl.kDLWVc6MMEV6B7e1.0Jv53UE8dBWZvTes72EOZ8b85J2mBTG', // "mod123"
    role: 'moderator',
    permissions: ['reviews:read', 'reviews:moderate', 'locations:read', 'users:read'],
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find admin user
    const adminUser = adminUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (!adminUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    if (!adminUser.is_active) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, adminUser.password_hash);
    
    if (!isValidPassword) {
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

    // Update last login (in production, this would update the database)
    adminUser.last_login = new Date().toISOString();

    res.status(200).json({
      success: true,
      data: {
        token,
        admin: {
          id: adminUser.id,
          email: adminUser.email,
          role: adminUser.role,
          permissions: adminUser.permissions,
          last_login: adminUser.last_login
        }
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}