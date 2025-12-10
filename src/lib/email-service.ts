/**
 * Resend Email Service
 * Modern email delivery with beautiful templates
 */

import { Resend } from 'resend';
import { logInfo, logError } from './logger';

const resend = new Resend(process.env.RESEND_API_KEY || '');

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@travel.ailydian.com';
const COMPANY_NAME = 'Travel.Ailydian';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send email using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const { to, subject, html, replyTo } = options;

    const data = await resend.emails.send({
      from: `${COMPANY_NAME} <${FROM_EMAIL}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo: replyTo,
    });

    logInfo('Email sent successfully', { to, subject, data });
    return true;
  } catch (error) {
    logError('Failed to send email', error, { to: options.to, subject: options.subject });
    return false;
  }
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(to: string, name: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; }
        .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Hoş Geldiniz ${name}!</h1>
        </div>
        <div class="content">
          <h2>Travel.Ailydian'a Hoş Geldiniz</h2>
          <p>Merhaba ${name},</p>
          <p>Türkiye'nin en gelişmiş AI destekli seyahat platformuna katıldığınız için teşekkür ederiz!</p>

          <p><strong>Hoş Geldin Hediyeniz:</strong></p>
          <ul>
            <li>✨ 100 Sadakat Puanı</li>
            <li>🎁 İlk rezervasyonunuzda %10 indirim</li>
            <li>🤖 Kişisel AI Seyahat Asistanı</li>
          </ul>

          <p>Hemen keşfetmeye başlayın:</p>
          <a href="https://travel.ailydian.com/destinations" class="button">Destinasyonları Keşfet</a>

          <p>Sorularınız için 7/24 AI asistanımız hizmetinizde!</p>
        </div>
        <div class="footer">
          <p>&copy; 2025 Travel.Ailydian. Tüm hakları saklıdır.</p>
          <p>Antalya, Türkiye</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to,
    subject: `${name}, Travel.Ailydian'a Hoş Geldiniz! 🎉`,
    html,
  });
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmation(
  to: string,
  booking: {
    bookingRef: string;
    type: string;
    name: string;
    date: string;
    amount: number;
    currency: string;
  }
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; }
        .booking-details { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .button { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Rezervasyonunuz Onaylandı</h1>
        </div>
        <div class="content">
          <p>Rezervasyonunuz başarıyla tamamlandı!</p>

          <div class="booking-details">
            <h3>Rezervasyon Detayları</h3>
            <div class="detail-row">
              <strong>Rezervasyon No:</strong>
              <span>${booking.bookingRef}</span>
            </div>
            <div class="detail-row">
              <strong>Tip:</strong>
              <span>${booking.type}</span>
            </div>
            <div class="detail-row">
              <strong>Adı:</strong>
              <span>${booking.name}</span>
            </div>
            <div class="detail-row">
              <strong>Tarih:</strong>
              <span>${booking.date}</span>
            </div>
            <div class="detail-row">
              <strong>Toplam Tutar:</strong>
              <span><strong>${booking.amount} ${booking.currency}</strong></span>
            </div>
          </div>

          <p>Rezervasyon detaylarınızı profil sayfanızdan görebilirsiniz.</p>
          <a href="https://travel.ailydian.com/profile/bookings" class="button">Rezervasyonlarım</a>

          <p><strong>Önemli:</strong> Rezervasyon numaranızı saklayın ve check-in sırasında gösterin.</p>
        </div>
        <div class="footer">
          <p>İyi yolculuklar dileriz! 🌍✈️</p>
          <p>&copy; 2025 Travel.Ailydian</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to,
    subject: `✅ Rezervasyon Onayı - ${booking.bookingRef}`,
    html,
  });
}

/**
 * Send transfer booking confirmation
 */
export async function sendTransferConfirmation(
  to: string,
  transfer: {
    bookingRef: string;
    from: string;
    to: string;
    date: string;
    time: string;
    vehicle: string;
    passengers: number;
    amount: number;
    currency: string;
    isVIP: boolean;
  }
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; }
        .vip-badge { background: #fbbf24; color: #78350f; padding: 5px 15px; border-radius: 20px; font-weight: bold; display: inline-block; margin: 10px 0; }
        .transfer-details { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .button { display: inline-block; padding: 12px 30px; background: #f59e0b; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚗 Transfer Rezervasyonu Onaylandı</h1>
          ${transfer.isVIP ? '<div class="vip-badge">⭐ VIP TRANSFER</div>' : ''}
        </div>
        <div class="content">
          <p>Havalimanı transfer rezervasyonunuz başarıyla onaylandı!</p>

          <div class="transfer-details">
            <h3>Transfer Detayları</h3>
            <div class="detail-row">
              <strong>Rezervasyon No:</strong>
              <span>${transfer.bookingRef}</span>
            </div>
            <div class="detail-row">
              <strong>Kalkış:</strong>
              <span>${transfer.from}</span>
            </div>
            <div class="detail-row">
              <strong>Varış:</strong>
              <span>${transfer.to}</span>
            </div>
            <div class="detail-row">
              <strong>Tarih & Saat:</strong>
              <span>${transfer.date} - ${transfer.time}</span>
            </div>
            <div class="detail-row">
              <strong>Araç:</strong>
              <span>${transfer.vehicle}</span>
            </div>
            <div class="detail-row">
              <strong>Yolcu Sayısı:</strong>
              <span>${transfer.passengers} kişi</span>
            </div>
            <div class="detail-row">
              <strong>Toplam Tutar:</strong>
              <span><strong>${transfer.amount} ${transfer.currency}</strong></span>
            </div>
          </div>

          ${transfer.isVIP ? `
          <div style="background: #fef3c7; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <h4>🌟 VIP Hizmetleriniz:</h4>
            <ul>
              <li>✅ Meet & Greet - Karşılama servisi</li>
              <li>✅ Lüks klimali araç</li>
              <li>✅ Su ikramı</li>
              <li>✅ Ücretsiz Wi-Fi</li>
              <li>✅ Profesyonel şoför</li>
              <li>✅ Uçuş takibi</li>
            </ul>
          </div>
          ` : ''}

          <p><strong>Önemli Notlar:</strong></p>
          <ul>
            <li>Şoförünüz belirlenen saatte karşılama noktasında olacaktır</li>
            <li>Havalimanı çıkışında isim levhası ile karşılanacaksınız</li>
            <li>Uçuş gecikmelerinde şoförünüz bekleyecektir</li>
          </ul>

          <a href="https://travel.ailydian.com/profile/transfers" class="button">Transferlerim</a>
        </div>
        <div class="footer">
          <p>İyi yolculuklar! 🚗✈️</p>
          <p>&copy; 2025 Travel.Ailydian</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to,
    subject: `🚗 Transfer Onayı - ${transfer.bookingRef}`,
    html,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(to: string, resetToken: string, name: string): Promise<boolean> {
  const resetUrl = `https://travel.ailydian.com/auth/reset-password?token=${resetToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; }
        .button { display: inline-block; padding: 12px 30px; background: #ef4444; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔒 Şifre Sıfırlama</h1>
        </div>
        <div class="content">
          <p>Merhaba ${name},</p>
          <p>Hesabınız için şifre sıfırlama talebinde bulundunuz.</p>

          <p>Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
          <a href="${resetUrl}" class="button">Şifremi Sıfırla</a>

          <div class="warning">
            <strong>⚠️ Güvenlik Uyarısı:</strong>
            <ul>
              <li>Bu link 1 saat geçerlidir</li>
              <li>Bu talebi siz yapmadıysanız, bu e-postayı görmezden gelin</li>
              <li>Şifrenizi kimseyle paylaşmayın</li>
            </ul>
          </div>

          <p>Link çalışmıyorsa aşağıdaki URL'yi tarayıcınıza kopyalayın:</p>
          <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 5px; font-size: 12px;">${resetUrl}</p>
        </div>
        <div class="footer">
          <p>&copy; 2025 Travel.Ailydian</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to,
    subject: '🔒 Şifre Sıfırlama Talebi',
    html,
  });
}

export default {
  sendEmail,
  sendWelcomeEmail,
  sendBookingConfirmation,
  sendTransferConfirmation,
  sendPasswordResetEmail,
};
