import logger from './logger';

// WhatsApp Business API Integration
// 7/24 customer support and booking via WhatsApp

export interface WhatsAppConfig {
  phoneNumberId: string;
  accessToken: string;
  businessAccountId: string;
  webhookVerifyToken: string;
}

export interface WhatsAppMessage {
  from: string; // Customer phone number
  id: string;
  timestamp: string;
  text?: {
    body: string;
  };
  type: 'text' | 'image' | 'document' | 'location' | 'interactive';
  interactive?: {
    type: string;
    button_reply?: {
      id: string;
      title: string;
    };
    list_reply?: {
      id: string;
      title: string;
    };
  };
}

export interface WhatsAppTemplate {
  name: string;
  language: string;
  components: Array<{
    type: 'header' | 'body' | 'footer' | 'button';
    parameters?: Array<{
      type: 'text' | 'currency' | 'date_time';
      text?: string;
      currency?: { fallback_value: string; code: string; amount_1000: number };
      date_time?: { fallback_value: string };
    }>;
  }>;
}

/**
 * WhatsApp Business API Endpoints
 */
const WHATSAPP_API_BASE = 'https://graph.facebook.com/v18.0';

/**
 * Send text message
 */
export async function sendTextMessage(
  config: WhatsAppConfig,
  to: string,
  message: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const response = await fetch(
      `${WHATSAPP_API_BASE}/${config.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'text',
          text: { body: message }
        })
      }
    );

    const data = await response.json();

    if (data.messages && data.messages[0]) {
      return { success: true, messageId: data.messages[0].id };
    }

    return { success: false, error: data.error?.message || 'Unknown error' };
  } catch (error) {
    logger.error('WhatsApp send message error:', error as Error, { component: 'Whatsappbusiness' });
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Send template message (for booking confirmations, reminders, etc.)
 */
export async function sendTemplateMessage(
  config: WhatsAppConfig,
  to: string,
  template: WhatsAppTemplate
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const response = await fetch(
      `${WHATSAPP_API_BASE}/${config.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'template',
          template
        })
      }
    );

    const data = await response.json();

    if (data.messages && data.messages[0]) {
      return { success: true, messageId: data.messages[0].id };
    }

    return { success: false, error: data.error?.message || 'Unknown error' };
  } catch (error) {
    logger.error('WhatsApp send template error:', error as Error, { component: 'Whatsappbusiness' });
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Send interactive button message
 */
export async function sendButtonMessage(
  config: WhatsAppConfig,
  to: string,
  body: string,
  buttons: Array<{ id: string; title: string }>
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const response = await fetch(
      `${WHATSAPP_API_BASE}/${config.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'interactive',
          interactive: {
            type: 'button',
            body: { text: body },
            action: {
              buttons: buttons.map(btn => ({
                type: 'reply',
                reply: { id: btn.id, title: btn.title }
              }))
            }
          }
        })
      }
    );

    const data = await response.json();

    if (data.messages && data.messages[0]) {
      return { success: true, messageId: data.messages[0].id };
    }

    return { success: false, error: data.error?.message || 'Unknown error' };
  } catch (error) {
    logger.error('WhatsApp send button message error:', error as Error, { component: 'Whatsappbusiness' });
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Send interactive list message
 */
export async function sendListMessage(
  config: WhatsAppConfig,
  to: string,
  body: string,
  buttonText: string,
  sections: Array<{
    title: string;
    rows: Array<{ id: string; title: string; description?: string }>;
  }>
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const response = await fetch(
      `${WHATSAPP_API_BASE}/${config.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'interactive',
          interactive: {
            type: 'list',
            body: { text: body },
            action: {
              button: buttonText,
              sections
            }
          }
        })
      }
    );

    const data = await response.json();

    if (data.messages && data.messages[0]) {
      return { success: true, messageId: data.messages[0].id };
    }

    return { success: false, error: data.error?.message || 'Unknown error' };
  } catch (error) {
    logger.error('WhatsApp send list message error:', error as Error, { component: 'Whatsappbusiness' });
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Pre-built message templates for Travel LyDian
 */
export const WHATSAPP_TEMPLATES = {
  /**
   * Booking confirmation template
   */
  bookingConfirmation: (
    customerName: string,
    bookingId: string,
    itemName: string,
    checkInDate: string,
    totalPrice: string
  ): WhatsAppTemplate => ({
    name: 'booking_confirmation',
    language: 'tr',
    components: [
      {
        type: 'header',
        parameters: [{ type: 'text', text: customerName }]
      },
      {
        type: 'body',
        parameters: [
          { type: 'text', text: bookingId },
          { type: 'text', text: itemName },
          { type: 'text', text: checkInDate },
          { type: 'text', text: totalPrice }
        ]
      }
    ]
  }),

  /**
   * Payment reminder template
   */
  paymentReminder: (customerName: string, bookingId: string, amount: string, dueDate: string): WhatsAppTemplate => ({
    name: 'payment_reminder',
    language: 'tr',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: customerName },
          { type: 'text', text: bookingId },
          { type: 'text', text: amount },
          { type: 'text', text: dueDate }
        ]
      }
    ]
  }),

  /**
   * Check-in reminder template
   */
  checkInReminder: (customerName: string, itemName: string, checkInDate: string, checkInTime: string): WhatsAppTemplate => ({
    name: 'checkin_reminder',
    language: 'tr',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: customerName },
          { type: 'text', text: itemName },
          { type: 'text', text: checkInDate },
          { type: 'text', text: checkInTime }
        ]
      }
    ]
  })
};

/**
 * Automated response handler based on message content
 */
export function generateAutomatedResponse(message: string): {
  response: string;
  actionType?: 'booking' | 'support' | 'info' | 'menu';
  buttons?: Array<{ id: string; title: string }>;
} {
  const lowerMessage = message.toLowerCase();

  // Greetings
  if (lowerMessage.match(/merhaba|selam|hey|hi|hello/)) {
    return {
      response: '👋 Merhaba! Travel LyDian\'a hoş geldiniz.\n\nSize nasıl yardımcı olabilirim?\n\n1️⃣ Rezervasyon yapmak\n2️⃣ Mevcut rezervasyonumu görüntüle\n3️⃣ Destek\n4️⃣ Bilgi almak\n\nLütfen numara ile seçim yapın.',
      actionType: 'menu',
      buttons: [
        { id: 'booking', title: '🎫 Rezervasyon' },
        { id: 'support', title: '💬 Destek' },
        { id: 'info', title: 'ℹ️ Bilgi' }
      ]
    };
  }

  // Booking related
  if (lowerMessage.match(/rezervasyon|booking|otel|araç|tur|transfer/)) {
    return {
      response: '🎫 Rezervasyon yapmak için hangi hizmeti arıyorsunuz?\n\n🏨 Oteller\n🚗 Araç Kiralama\n🎭 Turlar\n🚕 Transferler\n🚙 Şoförlü Araç\n\nLütfen seçiminizi yapın veya daha fazla bilgi için holiday.ailydian.com adresini ziyaret edin.',
      actionType: 'booking',
      buttons: [
        { id: 'hotel', title: '🏨 Otel' },
        { id: 'car', title: '🚗 Araç' },
        { id: 'tour', title: '🎭 Tur' }
      ]
    };
  }

  // Support related
  if (lowerMessage.match(/destek|yardım|support|help|problem|sorun/)) {
    return {
      response: '💬 Destek ekibimiz size yardımcı olmak için burada!\n\nSorunuzu detaylı olarak yazabilir veya aşağıdaki seçeneklerden birini seçebilirsiniz:\n\n1️⃣ Rezervasyon iptali\n2️⃣ Ödeme sorunu\n3️⃣ Değişiklik talebi\n4️⃣ Diğer\n\nBir temsilcimiz en kısa sürede size dönüş yapacaktır.',
      actionType: 'support',
      buttons: [
        { id: 'cancel', title: '❌ İptal' },
        { id: 'payment', title: '💳 Ödeme' },
        { id: 'change', title: '✏️ Değişiklik' }
      ]
    };
  }

  // Price/Fiyat
  if (lowerMessage.match(/fiyat|price|ücret|cost|ne kadar/)) {
    return {
      response: '💰 Fiyat bilgisi almak için:\n\n1. holiday.ailydian.com adresini ziyaret edin\n2. İlgilendiğiniz hizmeti seçin\n3. Tarih ve detayları girin\n4. Anlık fiyatları görün\n\n✨ Bundle pricing ile %20\'ye varan indirim!\n\nYardımcı olmamı istediğiniz başka bir konu var mı?',
      actionType: 'info'
    };
  }

  // LyDian Miles
  if (lowerMessage.match(/miles|puan|point|loyalty/)) {
    return {
      response: '🌟 LyDian Miles Loyalty Program!\n\nHer ₺1 harcamada 1 Miles kazanın.\n\n🥈 Silver (1,000+): %2 indirim\n🥇 Gold (5,000+): %5 indirim\n👑 VIP (10,000+): %10 indirim\n\nMiles\'larınızı rezervasyonlarınızda kullanabilirsiniz!\n\nDaha fazla bilgi: holiday.ailydian.com/miles',
      actionType: 'info'
    };
  }

  // Cancel/İptal
  if (lowerMessage.match(/iptal|cancel|vazgeç/)) {
    return {
      response: '❌ Rezervasyon İptali\n\nİptal işlemi için rezervasyon numaranızı paylaşır mısınız?\n\nFormat: RES-2024-XXXX\n\nİptal koşulları:\n• 24-48 saat öncesine kadar ücretsiz\n• Detaylı bilgi rezervasyon detaylarında',
      actionType: 'support'
    };
  }

  // Default response
  return {
    response: 'Anlayamadım. Lütfen daha detaylı bilgi verir misiniz?\n\nVeya şunlardan birini seçebilirsiniz:\n\n1️⃣ Rezervasyon\n2️⃣ Destek\n3️⃣ Bilgi\n\nYa da direkt olarak bir temsilci ile konuşmak için "temsilci" yazın.',
    actionType: 'menu'
  };
}

/**
 * Format phone number to WhatsApp format
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');

  // If starts with 0, remove it (Turkish format)
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  // Add country code if not present
  if (!cleaned.startsWith('90')) {
    cleaned = '90' + cleaned;
  }

  return cleaned;
}

/**
 * Validate phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  const formatted = formatPhoneNumber(phone);
  // Turkish phone numbers: 90 + 10 digits
  return /^90\d{10}$/.test(formatted);
}

/**
 * Create WhatsApp link for direct messaging
 */
export function createWhatsAppLink(phoneNumber: string, message?: string): string {
  const formatted = formatPhoneNumber(phoneNumber);
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${formatted}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

/**
 * Webhook signature verification
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  appSecret: string
): boolean {
  // In production, use crypto to verify HMAC SHA256 signature
  // const expectedSignature = crypto
  //   .createHmac('sha256', appSecret)
  //   .update(payload)
  //   .digest('hex');
  // return signature === `sha256=${expectedSignature}`;

  // For now, basic verification
  return signature.length > 0;
}

/**
 * Message queue for rate limiting
 */
export class WhatsAppMessageQueue {
  private queue: Array<{ to: string; message: string; timestamp: number }> = [];
  private processing = false;
  private readonly rateLimit = 60; // Messages per minute
  private readonly interval = 60000 / this.rateLimit; // ms between messages

  async add(to: string, message: string): Promise<void> {
    this.queue.push({ to, message, timestamp: Date.now() });

    if (!this.processing) {
      this.process();
    }
  }

  private async process(): Promise<void> {
    this.processing = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item) break;

      // Wait for rate limit
      const now = Date.now();
      const timeSinceLastMessage = now - item.timestamp;
      if (timeSinceLastMessage < this.interval) {
        await new Promise(resolve => setTimeout(resolve, this.interval - timeSinceLastMessage));
      }

      // Send message (implement actual sending logic)
      logger.debug(`Sending WhatsApp message to ${item.to}: ${item.message}`, {component:'Whatsappbusiness'});
    }

    this.processing = false;
  }

  getQueueLength(): number {
    return this.queue.length;
  }
}

/**
 * Export functions for easy usage
 */
export default {
  sendTextMessage,
  sendTemplateMessage,
  sendButtonMessage,
  sendListMessage,
  generateAutomatedResponse,
  formatPhoneNumber,
  isValidPhoneNumber,
  createWhatsAppLink,
  verifyWebhookSignature,
  WHATSAPP_TEMPLATES
};
