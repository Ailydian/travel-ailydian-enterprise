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

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber = '+905551234567', // Travel LyDian support number
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

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl w-80 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{agentName}</p>
                    <p className="text-xs text-green-100">{agentTitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 bg-gray-50">
              {/* Welcome Message */}
              <div className="mb-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-gray-800 mb-2">
                    👋 Merhaba! Travel LyDian\'a hoş geldiniz.
                  </p>
                  <p className="text-xs text-gray-600">
                    {responseTime}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-4 space-y-2">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Hızlı Seçenekler:
                </p>
                <button
                  onClick={() => setMessage('Otel rezervasyonu hakkında bilgi almak istiyorum')}
                  className="w-full text-left text-sm bg-white hover:bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 transition-colors"
                >
                  🏨 Otel Rezervasyonu
                </button>
                <button
                  onClick={() => setMessage('Araç kiralama için fiyat bilgisi alabilir miyim?')}
                  className="w-full text-left text-sm bg-white hover:bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 transition-colors"
                >
                  🚗 Araç Kiralama
                </button>
                <button
                  onClick={() => setMessage('Tur seçenekleri hakkında bilgi istiyorum')}
                  className="w-full text-left text-sm bg-white hover:bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 transition-colors"
                >
                  🎭 Turlar
                </button>
              </div>

              {/* Message Input */}
              <div className="mb-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
                  rows={3}
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
                WhatsApp ile Gönder
              </button>

              {/* Direct Call Option */}
              <button
                onClick={() => window.open(`tel:${phoneNumber}`, '_self')}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors mt-2"
              >
                <Phone className="h-4 w-4" />
                Hemen Ara
              </button>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 text-center mt-3">
                WhatsApp üzerinden güvenli iletişim
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <MessageCircle className="h-7 w-7" />
        )}
      </motion.button>

      {/* Notification Badge (optional) */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs font-bold">1</span>
        </motion.div>
      )}

      {/* Pulse Animation */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 bg-green-400 rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
};

export default WhatsAppWidget;
