/**
 * Create Test User Script
 *
 * Creates a test user in the database for development/testing purposes
 *
 * Usage:
 *   npx ts-node scripts/create-test-user.ts
 *
 * Environment:
 *   Requires DATABASE_URL in .env
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating test user...');

  const testUser = {
    name: 'Test User',
    email: 'test@ailydian.com',
    password: 'test12345', // Will be hashed
  };

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: testUser.email },
    });

    if (existingUser) {
      console.log(`User ${testUser.email} already exists with ID: ${existingUser.id}`);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(testUser.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: testUser.name,
        email: testUser.email,
        password: hashedPassword,
        membershipType: 'BASIC',
        loyaltyPoints: 100,
        preferredLanguage: 'tr',
        preferredCurrency: 'TRY',
      },
      select: {
        id: true,
        name: true,
        email: true,
        membershipType: true,
        loyaltyPoints: true,
        createdAt: true,
      },
    });

    // Create AI preferences
    await prisma.aIPreference.create({
      data: {
        userId: user.id,
        travelStyle: [],
        interests: [],
        preferredDestinations: [],
        dietaryRestrictions: [],
        accessibilityNeeds: [],
      },
    });

    console.log('Test user created successfully!');
    console.log('-----------------------------------');
    console.log('Email:', testUser.email);
    console.log('Password:', testUser.password);
    console.log('User ID:', user.id);
    console.log('-----------------------------------');
    console.log('You can now sign in with these credentials at /auth/signin');
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
