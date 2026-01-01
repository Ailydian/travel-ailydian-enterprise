import { Job } from 'bullmq';
import nodemailer from 'nodemailer';
import { logger } from '../../logger/winston';
import {
  JobType,
  EmailJobData,
  BookingConfirmationJobData,
  PriceAlertJobData,
  jobQueue,
} from '../job-queue';
import { prisma } from '../../prisma-optimized';

/**
 * EMAIL WORKER - BACKGROUND EMAIL PROCESSING
 *
 * Features:
 * - Email sending with retry logic
 * - Template rendering
 * - Queue-based processing
 * - Error handling and logging
 * - Rate limiting protection
 */

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Email job processor
 */
async function processEmailJob(job: Job): Promise<{ sent: boolean; messageId?: string }> {
  const { type, data } = job;

  logger.info('Processing email job', {
    jobId: job.id,
    type,
    to: data.to || data.userEmail,
  });

  try {
    switch (type) {
      case JobType.SEND_EMAIL:
        return await sendEmail(job.data as EmailJobData);

      case JobType.SEND_BOOKING_CONFIRMATION:
        return await sendBookingConfirmation(job.data as BookingConfirmationJobData);

      case JobType.SEND_PRICE_ALERT:
        return await sendPriceAlert(job.data as PriceAlertJobData);

      case JobType.SEND_WELCOME_EMAIL:
        return await sendWelcomeEmail(job.data as { userEmail: string; userName: string });

      case JobType.SEND_PAYMENT_RECEIPT:
        return await sendPaymentReceipt(job.data as { userId: string; bookingId: string });

      default:
        throw new Error(`Unknown email job type: ${type}`);
    }
  } catch (error) {
    logger.error('Email job processing failed', error as Error, {
      jobId: job.id,
      type,
    });
    throw error;
  }
}

/**
 * Send generic email
 */
async function sendEmail(data: EmailJobData): Promise<{ sent: boolean; messageId: string }> {
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || '"Travel AILYDIAN" <noreply@ailydian.com>',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
    attachments: data.attachments,
  });

  logger.info('Email sent successfully', {
    to: data.to,
    subject: data.subject,
    messageId: info.messageId,
  });

  return {
    sent: true,
    messageId: info.messageId,
  };
}

/**
 * Send booking confirmation email
 */
async function sendBookingConfirmation(
  data: BookingConfirmationJobData
): Promise<{ sent: boolean; messageId: string }> {
  // Fetch booking details
  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error(`Booking not found: ${data.bookingId}`);
  }

  const html = generateBookingConfirmationHTML(booking);

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || '"Travel AILYDIAN" <noreply@ailydian.com>',
    to: data.userEmail,
    subject: `Booking Confirmation - ${data.bookingType} #${booking.bookingReference}`,
    html,
  });

  logger.info('Booking confirmation email sent', {
    bookingId: data.bookingId,
    to: data.userEmail,
    messageId: info.messageId,
  });

  return {
    sent: true,
    messageId: info.messageId,
  };
}

/**
 * Send price alert email
 */
async function sendPriceAlert(
  data: PriceAlertJobData
): Promise<{ sent: boolean; messageId: string }> {
  const alert = await prisma.priceAlert.findUnique({
    where: { id: data.alertId },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  if (!alert) {
    throw new Error(`Price alert not found: ${data.alertId}`);
  }

  const priceDrop = ((data.oldPrice - data.newPrice) / data.oldPrice) * 100;

  const html = generatePriceAlertHTML({
    userName: alert.user.name || 'Traveler',
    entityName: alert.entityName,
    oldPrice: data.oldPrice,
    newPrice: data.newPrice,
    priceDrop: priceDrop.toFixed(1),
    currency: alert.currency,
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || '"Travel AILYDIAN" <noreply@ailydian.com>',
    to: alert.user.email,
    subject: `Price Alert: ${alert.entityName} - ${priceDrop.toFixed(0)}% Price Drop!`,
    html,
  });

  // Update alert
  await prisma.priceAlert.update({
    where: { id: data.alertId },
    data: {
      lastNotifiedAt: new Date(),
      notificationCount: {
        increment: 1,
      },
    },
  });

  logger.info('Price alert email sent', {
    alertId: data.alertId,
    to: alert.user.email,
    messageId: info.messageId,
  });

  return {
    sent: true,
    messageId: info.messageId,
  };
}

/**
 * Send welcome email
 */
async function sendWelcomeEmail(data: {
  userEmail: string;
  userName: string;
}): Promise<{ sent: boolean; messageId: string }> {
  const html = generateWelcomeEmailHTML(data.userName);

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || '"Travel AILYDIAN" <noreply@ailydian.com>',
    to: data.userEmail,
    subject: 'Welcome to Travel AILYDIAN - Your Journey Begins!',
    html,
  });

  logger.info('Welcome email sent', {
    to: data.userEmail,
    messageId: info.messageId,
  });

  return {
    sent: true,
    messageId: info.messageId,
  };
}

/**
 * Send payment receipt
 */
async function sendPaymentReceipt(data: {
  userId: string;
  bookingId: string;
}): Promise<{ sent: boolean; messageId: string }> {
  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error(`Booking not found: ${data.bookingId}`);
  }

  const html = generatePaymentReceiptHTML(booking);

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || '"Travel AILYDIAN" <noreply@ailydian.com>',
    to: booking.user.email,
    subject: `Payment Receipt - ${booking.bookingReference}`,
    html,
  });

  logger.info('Payment receipt sent', {
    bookingId: data.bookingId,
    to: booking.user.email,
    messageId: info.messageId,
  });

  return {
    sent: true,
    messageId: info.messageId,
  };
}

/**
 * HTML Email Templates
 */
function generateBookingConfirmationHTML(booking: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #FF214D, #FF6A45); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Booking Confirmed!</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #FF214D;">Hi ${booking.user.name},</h2>
    <p>Your booking has been confirmed. Here are the details:</p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <table style="width: 100%;">
        <tr>
          <td style="padding: 10px 0;"><strong>Booking Reference:</strong></td>
          <td style="text-align: right;">${booking.bookingReference}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0;"><strong>Booking Type:</strong></td>
          <td style="text-align: right;">${booking.bookingType}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0;"><strong>Status:</strong></td>
          <td style="text-align: right;"><span style="background: #d1edff; color: #0c5aa6; padding: 4px 12px; border-radius: 20px; font-size: 12px;">${booking.status}</span></td>
        </tr>
        <tr>
          <td style="padding: 10px 0;"><strong>Total Amount:</strong></td>
          <td style="text-align: right; font-size: 20px; color: #FF214D;"><strong>${booking.totalAmount} ${booking.currency}</strong></td>
        </tr>
      </table>
    </div>

    <p>You can manage your booking in your dashboard.</p>

    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/bookings" style="display: inline-block; background: #FF214D; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0;">View Booking</a>

    <p style="color: #666; font-size: 14px; margin-top: 30px;">
      Thank you for choosing Travel AILYDIAN!<br>
      Safe travels!
    </p>
  </div>
</body>
</html>
  `;
}

function generatePriceAlertHTML(data: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Price Alert</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #FF214D, #FF6A45); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Price Drop Alert!</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #FF214D;">Hi ${data.userName},</h2>
    <p>Great news! The price for <strong>${data.entityName}</strong> has dropped!</p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
      <p style="color: #666; margin: 0;">Previous Price</p>
      <p style="font-size: 24px; color: #999; text-decoration: line-through; margin: 10px 0;">${data.oldPrice} ${data.currency}</p>

      <p style="color: #666; margin: 20px 0 0 0;">New Price</p>
      <p style="font-size: 32px; color: #FF214D; font-weight: bold; margin: 10px 0;">${data.newPrice} ${data.currency}</p>

      <div style="background: #d1edff; color: #0c5aa6; padding: 10px; border-radius: 6px; margin-top: 20px; font-size: 18px; font-weight: bold;">
        You save ${data.priceDrop}%!
      </div>
    </div>

    <p>Book now before the price goes back up!</p>

    <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display: inline-block; background: #FF214D; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Book Now</a>

    <p style="color: #666; font-size: 14px; margin-top: 30px;">
      You're receiving this email because you set up a price alert.<br>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/alerts" style="color: #FF214D;">Manage your alerts</a>
    </p>
  </div>
</body>
</html>
  `;
}

function generateWelcomeEmailHTML(userName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Travel AILYDIAN</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #FF214D, #FF6A45); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Welcome to Travel AILYDIAN!</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #FF214D;">Hi ${userName},</h2>
    <p>Welcome aboard! We're thrilled to have you join the Travel AILYDIAN family.</p>

    <p>With Travel AILYDIAN, you can:</p>
    <ul style="line-height: 2;">
      <li>✈️ Book flights, hotels, and tours</li>
      <li>🎯 Get AI-powered personalized recommendations</li>
      <li>💰 Track prices and receive alerts</li>
      <li>🌟 Earn loyalty points on every booking</li>
      <li>🤝 Plan collaborative trips with friends</li>
    </ul>

    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: #FF214D; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Explore Now</a>

    <p style="color: #666; font-size: 14px; margin-top: 30px;">
      Happy travels!<br>
      The Travel AILYDIAN Team
    </p>
  </div>
</body>
</html>
  `;
}

function generatePaymentReceiptHTML(booking: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Receipt</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #FF214D, #FF6A45); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Payment Receipt</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #FF214D;">Hi ${booking.user.name},</h2>
    <p>Thank you for your payment. Here is your receipt:</p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <table style="width: 100%;">
        <tr>
          <td style="padding: 10px 0;"><strong>Receipt Number:</strong></td>
          <td style="text-align: right;">${booking.bookingReference}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0;"><strong>Date:</strong></td>
          <td style="text-align: right;">${new Date().toLocaleDateString()}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0;"><strong>Payment Method:</strong></td>
          <td style="text-align: right;">${booking.paymentMethod}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0;"><strong>Amount Paid:</strong></td>
          <td style="text-align: right; font-size: 20px; color: #FF214D;"><strong>${booking.totalAmount} ${booking.currency}</strong></td>
        </tr>
      </table>
    </div>

    <p>This receipt has been saved to your account.</p>

    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/bookings/${booking.id}" style="display: inline-block; background: #FF214D; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0;">View Booking</a>

    <p style="color: #666; font-size: 14px; margin-top: 30px;">
      Thank you for your business!<br>
      Travel AILYDIAN
    </p>
  </div>
</body>
</html>
  `;
}

/**
 * Initialize email worker
 */
export function initializeEmailWorker(): void {
  jobQueue.registerWorker('email', processEmailJob, {
    concurrency: 3, // Process 3 emails at a time
    limiter: {
      max: 10, // Max 10 emails
      duration: 1000, // Per second
    },
  });

  logger.info('Email worker initialized');
}

export default initializeEmailWorker;
