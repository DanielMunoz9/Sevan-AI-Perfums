'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles, Zap, Bot, Star } from 'lucide-react';
import AIAssistantChat from './AIAssistantChat';

export default function AmelieAIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ bottom: 96, right: 24 });

  const floatingFlowers = [
    { x: -46, y: -18, float: 12, delay: 0 },
    { x: 48, y: -10, float: 10, delay: 0.4 },
    { x: -30, y: 42, float: 14, delay: 0.8 },
    { x: 40, y: 36, float: 11, delay: 1.2 }
  ];

  useEffect(() => {
    // Forzar posición inicial exacta cada vez que se monta el componente
    setPosition({ bottom: 96, right: 24 });

    // Simular notificación después de 3 segundos
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <>
      {/* Botón flotante AMELIE AI - Posicionado encima del WhatsApp */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 30 }}
  className="fixed z-50" // Posicionado encima del WhatsApp (bottom-20 + espacio)
  style={{ bottom: `${position.bottom}px`, right: `${position.right}px` }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          {/* Resplandor exterior animado */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-sky-400/25 via-blue-500/20 to-indigo-400/25 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Anillo giratorio */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              background: 'conic-gradient(from 0deg, #0ea5e9, #2563eb, #1e3a8a, #0ea5e9)',
              padding: '2px'
            }}
          >
            <div className="w-full h-full bg-black rounded-full" />
          </motion.div>
          
          {/* Botón principal con gradiente premium */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white/15 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="vane"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex flex-col items-center"
                >
                  <Bot className="w-7 h-7 mb-1 text-sky-100" />
                  <span className="text-[10px] font-bold tracking-wide">AMELIE</span>
                  <Sparkles className="w-3 h-3 absolute -top-1 -right-2 text-rose-200 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Indicador de nuevo mensaje premium */}
          <AnimatePresence>
            {hasNewMessage && !isOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-3 border-white shadow-lg"
                >
                  <Star className="w-4 h-4" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tooltip mejorado */}
          <AnimatePresence>
            {!isOpen && isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-sky-500/30 whitespace-nowrap min-w-[300px]"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-sky-300" />
                    <span className="font-bold text-lg bg-gradient-to-r from-sky-400 via-blue-300 to-rose-200 bg-clip-text text-transparent">
                      AMELIE AI Premium
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    🎯 Recomendaciones inteligentes<br/>
                    🧠 Análisis olfativo personalizado<br/>
                    💎 Catálogo exclusivo SEVÁN PERFUM
                  </div>
                  <div className="text-xs text-purple-300 font-medium">
                    ¡Descubre tu fragancia perfecta!
                  </div>
                </div>
                
                {/* Flecha elegante */}
                <div className="absolute left-full top-1/2 -translate-y-1/2">
                  <div className="w-0 h-0 border-l-8 border-l-blue-900 border-y-6 border-y-transparent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Efectos de partículas premium */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              animate={{
                x: [0, Math.random() * 60 - 30],
                y: [0, Math.random() * 60 - 30],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
              style={{
                background: i % 2 === 0 ? '#38bdf8' : '#e11d48',
                left: '50%',
                top: '50%'
              }}
            />
          ))}
        </div>

        {/* Flores flotantes sutiles */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingFlowers.map((flower, index) => (
            <motion.div
              key={`flower-${index}`}
              className="absolute"
              animate={{
                y: [0, -flower.float, 0],
                rotate: [0, 6, -6, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: flower.delay,
                ease: 'easeInOut'
              }}
              style={{
                left: `calc(50% + ${flower.x}px)`,
                top: `calc(50% + ${flower.y}px)`
              }}
            >
              <div className="relative w-6 h-6">
                {[0, 1, 2, 3].map((petal) => (
                  <span
                    key={petal}
                    className="absolute left-1/2 top-1/2 block w-2.5 h-4 bg-gradient-to-b from-rose-200 to-rose-400 rounded-full"
                    style={{
                      transform: `rotate(${petal * 90}deg) translateY(-9px)`,
                      transformOrigin: 'center'
                    }}
                  />
                ))}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-2 h-2 bg-rose-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Texto flotante ocasional */}
        <AnimatePresence>
          {!isOpen && hasNewMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-white/20"
            >
              ✨ ¡Nuevo consejo disponible!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal de chat mejorado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-end justify-end p-6"
          >
            {/* Overlay con blur */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat container premium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-2xl h-[85vh] bg-gradient-to-br from-gray-900/98 via-purple-900/5 to-black/98 backdrop-blur-xl border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Header premium del chat */}
              <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 via-blue-600 to-gold rounded-full flex items-center justify-center shadow-lg">
                      <Bot className="w-7 h-7 text-white" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif bg-gradient-to-r from-purple-400 via-blue-400 to-gold bg-clip-text text-transparent">
                        AMELIE AI
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Especialista en fragancias premium
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        🎯 213 fragancias exclusivas • 🧠 IA avanzada
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat content */}
              <div className="h-[calc(100%-6rem)] overflow-hidden">
                <AIAssistantChat />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}