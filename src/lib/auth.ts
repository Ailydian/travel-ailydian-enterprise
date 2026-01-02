import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import logger from './logger';

/**
 * NextAuth Configuration - Production Ready
 *
 * Features:
 * - Credentials authentication with bcrypt
 * - Google OAuth (configured via env)
 * - Facebook OAuth (configured via env)
 * - Prisma adapter for session persistence
 * - JWT strategy for scalability
 * - Role-based access control (RBAC)
 * - Comprehensive error handling
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    // Credentials Provider - Email/Password authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            logger.warn('Missing credentials in auth attempt');
            return null;
          }

          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user) {
            logger.warn('User not found', { email: credentials.email });
            return null;
          }

          // Check if user has a password (social login users won't)
          if (!user.password) {
            logger.warn('User has no password - social login account', { email: credentials.email });
            return null;
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);

          if (!isValidPassword) {
            logger.warn('Invalid password', { email: credentials.email });
            return null;
          }

          logger.info('User authenticated successfully', { userId: user.id, email: user.email });

          // Return user object for session
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role || 'user',
            membershipType: user.membershipType || 'BASIC',
          };
        } catch (error) {
          logger.error('Authorization error', error);
          return null;
        }
      }
    }),

    // Google OAuth Provider (optional - requires env vars)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            }
          })
        ]
      : []),

    // Facebook OAuth Provider (optional - requires env vars)
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET
      ? [
          FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
          })
        ]
      : []),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours - refresh session every day
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },

  callbacks: {
    /**
     * JWT Callback - Adds custom fields to token
     */
    async jwt({ token, user, account, trigger }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
        token.membershipType = (user as any).membershipType || 'BASIC';
      }

      // Update token when session is updated
      if (trigger === 'update') {
        const updatedUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            membershipType: true
          }
        });

        if (updatedUser) {
          token.name = updatedUser.name;
          token.email = updatedUser.email;
          token.picture = updatedUser.image;
          token.role = updatedUser.role || 'user';
          token.membershipType = updatedUser.membershipType || 'BASIC';
        }
      }

      return token;
    },

    /**
     * Session Callback - Adds custom fields to session
     */
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).membershipType = token.membershipType;
      }
      return session;
    },

    /**
     * Redirect Callback - Custom redirect logic after sign in
     */
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },

  events: {
    async signIn({ user, account, profile, isNewUser }) {
      logger.info('User signed in', {
        userId: user.id,
        email: user.email,
        provider: account?.provider,
        isNewUser
      });

      // Create AI preferences for new users
      if (isNewUser && user.id) {
        try {
          await prisma.aIPreference.create({
            data: {
              userId: user.id,
              travelStyle: [],
              interests: [],
              preferredDestinations: [],
              dietaryRestrictions: [],
              accessibilityNeeds: [],
            }
          });
          logger.info('AI preferences created for new user', { userId: user.id });
        } catch (error) {
          logger.error('Failed to create AI preferences', error, { userId: user.id });
        }
      }
    },

    async signOut({ token }) {
      logger.info('User signed out', { userId: token.id });
    },
  },

  // Security: Strong secret required
  secret: (() => {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      throw new Error(
        'NEXTAUTH_SECRET environment variable is required. ' +
        'Generate a secure secret with: openssl rand -base64 32'
      );
    }
    if (secret.length < 32) {
      throw new Error(
        'NEXTAUTH_SECRET must be at least 32 characters long for security. ' +
        'Generate a secure secret with: openssl rand -base64 32'
      );
    }
    return secret;
  })(),

  debug: process.env.NODE_ENV === 'development',
};
