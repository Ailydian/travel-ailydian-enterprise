import nodemailer from 'nodemailer'
import { bookingConfirmationTemplate } from '@/lib/email/templates/booking-confirmation'

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export interface BookingNotification {
  customerName: string
  customerEmail: string
  bookingRef: string
  bookingType: 'property' | 'car' | 'transfer' | 'flight'
  bookingDetails: any
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmation(data: BookingNotification): Promise<boolean> {
  try {
    let emailSubject = ''
    let emailBody = ''

    switch (data.bookingType) {
      case 'property':
        emailSubject = `Booking Confirmation - ${data.bookingRef}`
        emailBody = generatePropertyConfirmationEmail(data)
        break
      case 'car':
        emailSubject = `Car Rental Confirmation - ${data.bookingRef}`
        emailBody = generateCarRentalConfirmationEmail(data)
        break
      case 'transfer':
        emailSubject = `Transfer Booking Confirmation - ${data.bookingRef}`
        emailBody = generateTransferConfirmationEmail(data)
        break
      case 'flight':
        emailSubject = `Flight Booking Confirmation - ${data.bookingRef}`
        emailBody = generateFlightConfirmationEmail(data)
        break
    }

    const mailOptions = {
      from: `"Travel LyDian" <${process.env.SMTP_FROM || 'noreply@holiday.ailydian.com'}>`,
      to: data.customerEmail,
      subject: emailSubject,
      html: emailBody,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending booking confirmation email:', error)
    return false
  }
}

/**
 * Send booking reminder email (24h before check-in)
 */
export async function sendBookingReminder(data: BookingNotification): Promise<boolean> {
  try {
    const emailSubject = `Reminder: Your booking ${data.bookingRef} is tomorrow`
    const emailBody = generateReminderEmail(data)

    const mailOptions = {
      from: `"Travel LyDian" <${process.env.SMTP_FROM || 'noreply@holiday.ailydian.com'}>`,
      to: data.customerEmail,
      subject: emailSubject,
      html: emailBody,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending booking reminder email:', error)
    return false
  }
}

/**
 * Send cancellation confirmation email
 */
export async function sendCancellationConfirmation(
  data: BookingNotification & { refundAmount?: number; refundPercentage?: number }
): Promise<boolean> {
  try {
    const emailSubject = `Booking Cancelled - ${data.bookingRef}`
    const emailBody = generateCancellationEmail(data)

    const mailOptions = {
      from: `"Travel LyDian" <${process.env.SMTP_FROM || 'noreply@holiday.ailydian.com'}>`,
      to: data.customerEmail,
      subject: emailSubject,
      html: emailBody,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending cancellation email:', error)
    return false
  }
}

/**
 * Send payment confirmation email
 */
export async function sendPaymentConfirmation(data: BookingNotification): Promise<boolean> {
  try {
    const emailSubject = `Payment Received - ${data.bookingRef}`
    const emailBody = generatePaymentConfirmationEmail(data)

    const mailOptions = {
      from: `"Travel LyDian" <${process.env.SMTP_FROM || 'noreply@holiday.ailydian.com'}>`,
      to: data.customerEmail,
      subject: emailSubject,
      html: emailBody,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending payment confirmation email:', error)
    return false
  }
}

// Email template generators
function generatePropertyConfirmationEmail(data: BookingNotification): string {
  const { bookingDetails } = data
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, var(--lydian-info) 0%, var(--lydian-info-hover) 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="margin: 0;">Booking Confirmed!</h1>
      <p style="margin: 10px 0 0 0;">Booking Reference: ${data.bookingRef}</p>
    </div>

    <div style="background: var(--lydian-bg-surface); padding: 30px; border-radius: 0 0 10px 10px;">
      <h2>Dear ${data.customerName},</h2>
      <p>Your property booking has been confirmed. Here are your booking details:</p>

      <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>${bookingDetails.propertyName}</h3>
        <p><strong>Check-in:</strong> ${formatDate(bookingDetails.checkIn)}</p>
        <p><strong>Check-out:</strong> ${formatDate(bookingDetails.checkOut)}</p>
        <p><strong>Guests:</strong> ${bookingDetails.guests}</p>
        <p><strong>Total Price:</strong> ${bookingDetails.currency} ${bookingDetails.totalPrice}</p>
      </div>

      <p>We look forward to welcoming you!</p>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://holiday.ailydian.com/bookings/${data.bookingRef}" style="background: var(--lydian-info); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">View Booking</a>
      </div>
    </div>

    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
      <p>Travel LyDian | support@holiday.ailydian.com</p>
    </div>
  </div>
</body>
</html>
  `
}

function generateCarRentalConfirmationEmail(data: BookingNotification): string {
  const { bookingDetails } = data
  return bookingConfirmationTemplate({
    customerName: data.customerName,
    bookingRef: data.bookingRef,
    vehicleName: bookingDetails.carName,
    vehicleImage: bookingDetails.carImage,
    pickupDate: formatDate(bookingDetails.pickupDate),
    dropoffDate: formatDate(bookingDetails.dropoffDate),
    pickupLocation: bookingDetails.pickupLocation,
    totalPrice: bookingDetails.totalPrice,
    currency: bookingDetails.currency,
  })
}

function generateTransferConfirmationEmail(data: BookingNotification): string {
  const { bookingDetails } = data
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Transfer Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, var(--lydian-info) 0%, var(--lydian-info-hover) 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="margin: 0;">Transfer Booked!</h1>
      <p style="margin: 10px 0 0 0;">Booking Reference: ${data.bookingRef}</p>
    </div>

    <div style="background: var(--lydian-bg-surface); padding: 30px; border-radius: 0 0 10px 10px;">
      <h2>Dear ${data.customerName},</h2>
      <p>Your airport transfer has been confirmed:</p>

      <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>${bookingDetails.vehicleName}</h3>
        <p><strong>From:</strong> ${bookingDetails.pickupLocation}</p>
        <p><strong>To:</strong> ${bookingDetails.dropoffLocation}</p>
        <p><strong>Pickup Date:</strong> ${formatDate(bookingDetails.pickupDate)} at ${bookingDetails.pickupTime}</p>
        <p><strong>Passengers:</strong> ${bookingDetails.passengers}</p>
        ${bookingDetails.flightNumber ? `<p><strong>Flight:</strong> ${bookingDetails.flightNumber}</p>` : ''}
        <p><strong>Total Price:</strong> ${bookingDetails.currency} ${bookingDetails.totalPrice}</p>
      </div>

      <p>Your driver will be waiting for you at the designated pickup point.</p>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://holiday.ailydian.com/bookings/${data.bookingRef}" style="background: var(--lydian-info); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">View Booking</a>
      </div>
    </div>

    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
      <p>Travel LyDian | support@holiday.ailydian.com</p>
    </div>
  </div>
</body>
</html>
  `
}

function generateFlightConfirmationEmail(data: BookingNotification): string {
  const { bookingDetails } = data
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Flight Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, var(--lydian-info) 0%, var(--lydian-info-hover) 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="margin: 0;">Flight Booked!</h1>
      <p style="margin: 10px 0 0 0;">Booking Reference: ${data.bookingRef}</p>
    </div>

    <div style="background: var(--lydian-bg-surface); padding: 30px; border-radius: 0 0 10px 10px;">
      <h2>Dear ${data.customerName},</h2>
      <p>Your flight has been confirmed:</p>

      <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>${bookingDetails.airline} - ${bookingDetails.flightNumber}</h3>
        <p><strong>From:</strong> ${bookingDetails.departureAirport} (${bookingDetails.departureCity})</p>
        <p><strong>To:</strong> ${bookingDetails.arrivalAirport} (${bookingDetails.arrivalCity})</p>
        <p><strong>Departure:</strong> ${formatDateTime(bookingDetails.departureTime)}</p>
        <p><strong>Arrival:</strong> ${formatDateTime(bookingDetails.arrivalTime)}</p>
        <p><strong>Passengers:</strong> ${bookingDetails.passengers}</p>
        <p><strong>Class:</strong> ${bookingDetails.cabinClass}</p>
        <p><strong>Total Price:</strong> ${bookingDetails.currency} ${bookingDetails.totalPrice}</p>
      </div>

      <p>Please arrive at the airport at least 2 hours before departure for international flights.</p>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://holiday.ailydian.com/bookings/${data.bookingRef}" style="background: var(--lydian-info); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">View E-Ticket</a>
      </div>
    </div>

    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
      <p>Travel LyDian | support@holiday.ailydian.com</p>
    </div>
  </div>
</body>
</html>
  `
}

function generateReminderEmail(data: BookingNotification): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #fbbf24; color: #78350f; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="margin: 0;">Booking Reminder</h1>
    </div>

    <div style="background: var(--lydian-bg-surface); padding: 30px; border-radius: 0 0 10px 10px;">
      <h2>Dear ${data.customerName},</h2>
      <p>This is a friendly reminder that your booking ${data.bookingRef} is scheduled for tomorrow.</p>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://holiday.ailydian.com/bookings/${data.bookingRef}" style="background: var(--lydian-info); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">View Booking Details</a>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

function generateCancellationEmail(
  data: BookingNotification & { refundAmount?: number; refundPercentage?: number }
): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: var(--lydian-secondary); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="margin: 0;">Booking Cancelled</h1>
    </div>

    <div style="background: var(--lydian-bg-surface); padding: 30px; border-radius: 0 0 10px 10px;">
      <h2>Dear ${data.customerName},</h2>
      <p>Your booking ${data.bookingRef} has been cancelled.</p>

      ${
        data.refundAmount
          ? `<div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
               <p><strong>Refund Amount:</strong> ${data.refundAmount} (${data.refundPercentage}%)</p>
               <p>Your refund will be processed within 5-7 business days.</p>
             </div>`
          : ''
      }

      <p>If you have any questions, please contact our support team.</p>
    </div>
  </div>
</body>
</html>
  `
}

function generatePaymentConfirmationEmail(data: BookingNotification): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: var(--lydian-success); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="margin: 0;">Payment Received</h1>
    </div>

    <div style="background: var(--lydian-bg-surface); padding: 30px; border-radius: 0 0 10px 10px;">
      <h2>Dear ${data.customerName},</h2>
      <p>We have received your payment for booking ${data.bookingRef}.</p>

      <p>Thank you for choosing Travel LyDian!</p>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://holiday.ailydian.com/bookings/${data.bookingRef}/invoice" style="background: var(--lydian-info); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">Download Invoice</a>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

// Helper functions
function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}
