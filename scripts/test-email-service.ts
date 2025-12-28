/**
 * Email Service Test Script
 *
 * Run this script to test email sending functionality:
 * npx ts-node scripts/test-email-service.ts
 */

import {
  sendWelcomeEmail,
  sendBookingConfirmation,
  sendEmailVerification,
} from '../src/lib/email/sender';

const TEST_EMAIL = 'your-email@example.com'; // Replace with your email

async function testEmailService() {
  console.log('🧪 Testing Email Service for Travel.Ailydian.com\n');

  // Test 1: Welcome Email
  console.log('📧 Test 1: Sending Welcome Email...');
  try {
    const result1 = await sendWelcomeEmail({
      to: TEST_EMAIL,
      userName: 'Test User',
      userEmail: TEST_EMAIL,
      language: 'en',
    });

    if (result1.success) {
      console.log('✅ Welcome email sent successfully!');
      console.log(`   Message ID: ${result1.messageId}\n`);
    } else {
      console.log(`❌ Failed: ${result1.error}\n`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error}\n`);
  }

  // Test 2: Booking Confirmation
  console.log('📧 Test 2: Sending Booking Confirmation...');
  try {
    const result2 = await sendBookingConfirmation({
      to: TEST_EMAIL,
      userName: 'Test User',
      bookingId: 'BK-TEST-12345',
      bookingType: 'hotel',
      propertyName: 'Luxury Beach Resort Antalya',
      checkInDate: 'January 15, 2025',
      checkOutDate: 'January 20, 2025',
      guests: 2,
      totalPrice: '1,500.00',
      currency: 'USD',
      confirmationUrl: 'https://travel.ailydian.com/bookings/BK-TEST-12345',
      propertyImage:
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      address: 'Lara Beach, Antalya, Turkey',
      language: 'en',
    });

    if (result2.success) {
      console.log('✅ Booking confirmation sent successfully!');
      console.log(`   Message ID: ${result2.messageId}\n`);
    } else {
      console.log(`❌ Failed: ${result2.error}\n`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error}\n`);
  }

  // Test 3: Email Verification
  console.log('📧 Test 3: Sending Email Verification...');
  try {
    const result3 = await sendEmailVerification({
      to: TEST_EMAIL,
      userName: 'Test User',
      verificationUrl:
        'https://travel.ailydian.com/verify-email?token=test123abc',
      verificationCode: '123456',
      expiresIn: '24 hours',
      language: 'en',
    });

    if (result3.success) {
      console.log('✅ Email verification sent successfully!');
      console.log(`   Message ID: ${result3.messageId}\n`);
    } else {
      console.log(`❌ Failed: ${result3.error}\n`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error}\n`);
  }

  console.log('✨ Email service test completed!');
  console.log('\nNote: If RESEND_API_KEY is not set, emails are logged to console in DEV MODE.');
}

// Run tests
testEmailService().catch(console.error);
