import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { createWhatsAppLink } from '@/lib/whatsappBusiness';

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  defaultMessage?: string;
  position?: 'bottom-right' | 'bottom-left';
  agentName?: string;
  agentTitle?: string;
  responseTime?: string;
}

/**
 * WhatsApp Widget Component
 * DISABLED: Fixed bottom-right floating button removed per system optimization request
 * Original functionality preserved in code but returns null to prevent rendering
 */
const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber = '+905551234567',
  defaultMessage = 'Merhaba! Travel LyDian hakkında bilgi almak istiyorum.',
  position = 'bottom-right',
  agentName = 'Travel LyDian Destek',
  agentTitle = '7/24 Müşteri Hizmetleri',
  responseTime = 'Genellikle 5 dakika içinde yanıt verir'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const messageToSend = message || defaultMessage;
    const whatsappLink = createWhatsAppLink(phoneNumber, messageToSend);
    window.open(whatsappLink, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  // REMOVED: Fixed bottom-right WhatsApp widget per user request
  // Component disabled to eliminate floating bottom-right buttons
  return null;
};

export default WhatsAppWidget;
