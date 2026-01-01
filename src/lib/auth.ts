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
        // SECURITY: Hardcoded credentials removed - V1 Critical Fix (CVSS 9.8)
        // All authentication must go through proper database validation
        // Test users should be created in the database, not hardcoded

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // TODO: Implement proper database authentication
        // Example:
        // const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        // if (!user) return null;
        // const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        // if (!isValid) return null;
        // return { id: user.id, email: user.email, name: user.name, image: user.image };

        // Return null - no hardcoded authentication bypass
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
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },

  // SECURITY: Weak JWT secret fallback removed - V3 Critical Fix (CVSS 9.1)
  // Application will fail fast if NEXTAUTH_SECRET is not set in environment
  // This prevents deployment with weak/default secrets
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
  debug: false, // Disable debug to prevent console errors
};