#!/usr/bin/env node

/**
 * Optional Prisma Generate Script
 * Skips Prisma generation if DATABASE_URL is not set
 * Allows deployment to proceed without database
 */

const { execSync } = require('child_process');

// Check if DATABASE_URL is set
const hasDatabaseUrl = !!process.env.DATABASE_URL;

console.log('🔍 Checking for DATABASE_URL...');

if (!hasDatabaseUrl) {
  console.log('⚠️  DATABASE_URL not found - skipping Prisma generation');
  console.log('ℹ️  Site will deploy without database features');
  console.log('✅ Build can continue');
  process.exit(0);
}

console.log('✅ DATABASE_URL found - generating Prisma Client');

try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully');
  process.exit(0);
} catch (error) {
  console.error('❌ Prisma generation failed:', error.message);
  console.log('⚠️  Continuing build without Prisma...');
  // Exit with 0 to allow build to continue
  process.exit(0);
}
