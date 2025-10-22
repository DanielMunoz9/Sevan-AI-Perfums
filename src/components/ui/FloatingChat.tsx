'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface FloatingChatProps {
  productName?: string;
  productId?: string;
}

export default function FloatingChat({ productName, productId }: FloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const whatsappNumber = "573193605666";
  
  const defaultMessages = productName ? [
    `Hola Laura, me interesa el perfume ${productName}. ¿Podrías darme más información y asesorarme?`,
    `¿Tienen disponible ${productName}? ¿Cuál es el precio actual y qué me puedes contar sobre su fragancia?`,
    `Laura, me gustaría conocer las notas olfativas de ${productName} y si me lo recomiendas`,
    `¿${productName} es unisex? ¿Qué duración tiene y para qué ocasiones lo recomiendas?`
  ] : [
    'Hola Laura, me interesa conocer más sobre las fragancias de SEVÁN PERFUM. ¿Podrías asesorarme?',
    '¿Tienen promociones disponibles actualmente? Me gustaría encontrar mi fragancia perfecta',
    'Laura, ¿podrías recomendarme una fragancia para ocasiones especiales?',
    'Hola Laura, ¿cuál es el tiempo de entrega a mi ciudad y qué fragancias me recomiendas?'
  ];

  const sendWhatsApp = (text: string) => {
    const encodedMessage = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const sendCustomMessage = () => {
    if (message.trim()) {
      sendWhatsApp(message);
      setMessage('');
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl shadow-green-500/25 flex items-center justify-center group overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(34, 197, 94, 0.3)",
              "0 0 30px rgba(34, 197, 94, 0.5)",
              "0 0 20px rgba(34, 197, 94, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 0 : 360 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MessageCircle className="w-6 h-6 text-white" />
            )}
          </motion.div>
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Notification dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="text-xs text-white font-bold">!</span>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gold/20 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold">Laura Castaño</h3>
                  <p className="text-xs opacity-90">Asesora SEVÁN PERFUM • En línea</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Asistente IA</span>
                </div>
                <p className="text-gray-300 text-sm">
                  {productName 
                    ? `¡Hola! Veo que estás interesado en ${productName}. ¿En qué puedo ayudarte?`
                    : '¡Hola! Soy tu asistente personal de fragancias. ¿En qué puedo ayudarte hoy?'
                  }
                </p>
              </div>

              {/* Quick Messages */}
              <div className="space-y-2">
                <p className="text-xs text-gray-400 font-medium">Mensajes rápidos:</p>
                {defaultMessages.map((msg, index) => (
                  <motion.button
                    key={index}
                    onClick={() => sendWhatsApp(msg)}
                    className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50 hover:border-gold/30 rounded-lg text-sm text-gray-300 transition-all duration-200"
                    whileHover={{ x: 4 }}
                  >
                    {msg}
                  </motion.button>
                ))}
              </div>

              {/* Custom Message */}
              <div className="border-t border-gray-700/50 pt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-gold/50"
                    onKeyPress={(e) => e.key === 'Enter' && sendCustomMessage()}
                  />
                  <button
                    onClick={sendCustomMessage}
                    disabled={!message.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm disabled:opacity-50 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800/30 px-4 py-2 text-center">
              <p className="text-xs text-gray-400">
                Powered by WhatsApp • Respuesta inmediata
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}