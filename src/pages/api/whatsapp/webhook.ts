import type { NextApiRequest, NextApiResponse } from 'next';
import {
import logger from '../../../../lib/logger';
  generateAutomatedResponse,
  sendTextMessage,
  sendButtonMessage,
  type WhatsAppMessage,
  type WhatsAppConfig
} from '@/lib/whatsappBusiness';

/**
 * WhatsApp Business Webhook
 *
 * Handles incoming messages from customers via WhatsApp
 * Provides automated responses and routes to support team
 *
 * Webhook URL: https://your-domain.com/api/whatsapp/webhook
 * Verify Token: Set in environment variables
 */

// In production, these would come from environment variables
const WHATSAPP_CONFIG: WhatsAppConfig = {
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
  webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'travel_lydian_verify_token_2024'
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Webhook verification (GET request from Facebook)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === WHATSAPP_CONFIG.webhookVerifyToken) {
      logger.debug('Webhook verified successfully!', { component: 'Webhook' });
      return res.status(200).send(challenge);
    }

    return res.status(403).json({ error: 'Verification failed' });
  }

  // Handle incoming messages (POST request)
  if (req.method === 'POST') {
    try {
      const body = req.body;

      // Check if it's a WhatsApp message
      if (body.object !== 'whatsapp_business_account') {
        return res.status(400).json({ error: 'Not a WhatsApp message' });
      }

      // Extract message from webhook payload
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      if (!value?.messages || value.messages.length === 0) {
        // No messages to process (could be status update)
        return res.status(200).json({ success: true, message: 'No messages to process' });
      }

      const message: WhatsAppMessage = value.messages[0];
      const customerPhone = message.from;

      // Log incoming message
      logger.debug('Received WhatsApp message:', { component: 'Webhook', metadata: { data: {
        from: customerPhone,
        type: message.type,
        text: message.text?.body
      } } });

      // Save message to database (implement based on your schema)
      await saveMessageToDatabase({
        from: customerPhone,
        message: message.text?.body || '',
        type: message.type,
        timestamp: new Date(parseInt(message.timestamp) * 1000)
      });

      // Process text messages
      if (message.type === 'text' && message.text?.body) {
        const incomingMessage = message.text.body;

        // Generate automated response
        const { response, buttons } = generateAutomatedResponse(incomingMessage);

        // Send response
        if (buttons && buttons.length > 0) {
          await sendButtonMessage(
            WHATSAPP_CONFIG,
            customerPhone,
            response,
            buttons
          );
        } else {
          await sendTextMessage(
            WHATSAPP_CONFIG,
            customerPhone,
            response
          );
        }

        // If this seems like it needs human support, notify team
        if (shouldNotifySupport(incomingMessage)) {
          await notifySupportTeam(customerPhone, incomingMessage);
        }
      }

      // Process button/list replies
      if (message.type === 'interactive') {
        const buttonId = message.interactive?.button_reply?.id;
        const listId = message.interactive?.list_reply?.id;

        if (buttonId || listId) {
          const selectedId = buttonId || listId;
          await handleInteractiveResponse(customerPhone, selectedId!);
        }
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      logger.error('WhatsApp webhook error:', error as Error, { component: 'Webhook' });
      return res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

/**
 * Save message to database
 */
async function saveMessageToDatabase(data: {
  from: string;
  message: string;
  type: string;
  timestamp: Date;
}): Promise<void> {
  // In production, save to Prisma database
  // await prisma.whatsAppMessage.create({ data });

  logger.debug('Message saved:', { component: 'Webhook', metadata: { data: data } });
}

/**
 * Check if message requires human support
 */
function shouldNotifySupport(message: string): boolean {
  const urgentKeywords = [
    'acil',
    'urgent',
    'şikayet',
    'complaint',
    'problem',
    'çözüm',
    'solution',
    'konuşmak istiyorum',
    'temsilci',
    'agent',
    'yönetici',
    'manager'
  ];

  const lowerMessage = message.toLowerCase();
  return urgentKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Notify support team about new message
 */
async function notifySupportTeam(customerPhone: string, message: string): Promise<void> {
  // In production, send notification to support dashboard/email/Slack
  logger.debug('Support notification:', { component: 'Webhook', metadata: { data: {
    customer: customerPhone,
    message,
    timestamp: new Date( } })
  });

  // Could also create a ticket in support system
  // await createSupportTicket({ customerPhone, message });
}

/**
 * Handle interactive button/list responses
 */
async function handleInteractiveResponse(customerPhone: string, selectedId: string): Promise<void> {
  let response = '';

  switch (selectedId) {
    case 'booking':
      response = '🎫 Rezervasyon yapmak için lütfen travel.lydian.com adresini ziyaret edin.\n\nVeya hangi hizmeti arıyorsunuz?\n\n🏨 Otel\n🚗 Araç\n🎭 Tur\n🚕 Transfer';
      break;

    case 'support':
      response = '💬 Destek ekibimiz size yardımcı olmaya hazır!\n\nSorunuzu detaylı olarak yazabilirsiniz. En kısa sürede size dönüş yapacağız.';
      await notifySupportTeam(customerPhone, 'Customer requested support');
      break;

    case 'info':
      response = 'ℹ️ Travel LyDian hakkında:\n\n✅ Türkiye\'nin en kapsamlı seyahat platformu\n✅ AI-powered arama sistemi\n✅ Bundle pricing ile %20 indirim\n✅ LyDian Miles loyalty program\n✅ 7/24 destek\n\nWeb: travel.lydian.com';
      break;

    case 'hotel':
      response = '🏨 Otel Rezervasyonu\n\nBinlerce otel seçeneği travel.lydian.com\'da!\n\n• En uygun fiyat garantisi\n• Anında onay\n• Ücretsiz iptal seçeneği\n• Termal, Butik, Koy otelleri ve daha fazlası';
      break;

    case 'car':
      response = '🚗 Araç Kiralama\n\nGüvenilir araç kiralama hizmeti:\n\n• Sınırsız kilometre\n• Kasko dahil\n• Havalimanı teslimat\n• 7/24 yol yardım\n\nDetaylar: travel.lydian.com/arac-kiralama';
      break;

    case 'tour':
      response = '🎭 Tur & Aktiviteler\n\nRehberli turlar ve unutulmaz deneyimler:\n\n• Kültür turları\n• Doğa gezileri\n• Macera aktiviteleri\n• Özel turlar\n\nDetaylar: travel.lydian.com/turlar';
      break;

    case 'cancel':
      response = '❌ İptal İşlemi\n\nRezervasyon iptal etmek için rezervasyon numaranızı paylaşır mısınız?\n\nFormat: RES-2024-XXXX';
      break;

    case 'payment':
      response = '💳 Ödeme Desteği\n\nÖdeme ile ilgili sorunuzu detaylı olarak açıklar mısınız?\n\nDestek ekibimiz size yardımcı olacaktır.';
      await notifySupportTeam(customerPhone, 'Customer has payment issue');
      break;

    case 'change':
      response = '✏️ Rezervasyon Değişikliği\n\nDeğiştirmek istediğiniz rezervasyon numaranız ve yeni detayları paylaşır mısınız?';
      break;

    default:
      response = 'Seçiminiz alındı. Size nasıl yardımcı olabilirim?';
  }

  await sendTextMessage(WHATSAPP_CONFIG, customerPhone, response);
}
