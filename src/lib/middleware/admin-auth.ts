import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import logger from '../logger';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export interface AdminAuthData {
  adminId: number;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
}

export interface AuthenticatedRequest extends NextApiRequest {
  admin: AdminAuthData;
}

export function withAdminAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void> | void,
  requiredPermissions?: string[]
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          error: 'No authorization token provided'
        });
      }

      const token = authHeader.substring(7);
      
      let decoded: AdminAuthData;
      try {
        decoded = jwt.verify(token, JWT_SECRET) as AdminAuthData;
      } catch (jwtError) {
        return res.status(401).json({
          success: false,
          error: 'Invalid or expired token'
        });
      }

      // Check permissions if required
      if (requiredPermissions && requiredPermissions.length > 0) {
        const hasPermission = decoded.permissions.includes('*') || 
          requiredPermissions.some(permission => decoded.permissions.includes(permission));
        
        if (!hasPermission) {
          return res.status(403).json({
            success: false,
            error: 'Insufficient permissions'
          });
        }
      }

      // Attach admin data to request
      (req as AuthenticatedRequest).admin = decoded;
      
      return handler(req as AuthenticatedRequest, res);
    } catch (error) {
      logger.error('Admin auth middleware error:', error as Error, {component:'AdminAuth'});
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };
}

export function hasPermission(adminPermissions: string[], requiredPermission: string): boolean {
  return adminPermissions.includes('*') || adminPermissions.includes(requiredPermission);
}

export function hasAnyPermission(adminPermissions: string[], requiredPermissions: string[]): boolean {
  return adminPermissions.includes('*') || 
    requiredPermissions.some(permission => adminPermissions.includes(permission));
}