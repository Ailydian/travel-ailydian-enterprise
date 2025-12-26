import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Simplified auth without Prisma dependency - prevents 500 errors
export const authOptions: NextAuthOptions = {
  // No adapter - using JWT only for now
  providers: [
    // Credentials Provider - simplified without database
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Temporary: Allow test user for development
        if (credentials?.email === 'test@travel.ailydian.com' && credentials?.password === 'test123') {
          return {
            id: 'test-user-1',
            email: 'test@travel.ailydian.com',
            name: 'Test User',
            image: null,
          };
        }

        // Return null if credentials don't match
        return null;
      }
    }),
  ],
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-please-change-in-production',
  debug: false, // Disable debug to prevent console errors
};