'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

export default function SplashScreen({ onComplete, minDuration = 2000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    // Animación de puntos
    const dotsInterval = setInterval(() => {
      setDots(d => (d + 1) % 4);
    }, 600);

    // Timer mínimo de duración
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 800); // Esperar a que termine la animación de salida
    }, minDuration);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(timer);
    };
  }, [minDuration, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold-deep/10" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Logo principal */}
        <div className="relative mb-10 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-deep flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_-10px_rgba(255,215,0,0.5)]"
              animate={{ 
                rotate: [0, 5, -5, 0],
                boxShadow: [
                  '0 0 50px -10px rgba(255,215,0,0.5)',
                  '0 0 80px -5px rgba(255,215,0,0.7)',
                  '0 0 50px -10px rgba(255,215,0,0.5)'
                ]
              }}
              transition={{ 
                rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
                boxShadow: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
              }}
            >
              <motion.span
                className="text-6xl font-serif font-bold text-black drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                S
              </motion.span>
              
              {/* Efectos de brillo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 mix-blend-overlay"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' }
                }}
              />
            </motion.div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-gold-deep via-gold to-gold-light bg-clip-text text-transparent tracking-widest mb-2">
                SEVÁN PERFUM
              </h1>
              <p className="text-sm md:text-base uppercase tracking-[0.5em] text-gold/70 mb-8">
                LUXURY FRAGRANCES
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Líneas animadas */}
        <motion.div 
          className="relative w-[300px] h-32 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-[3px] h-12 origin-bottom"
              style={{ top: `${6 + i * 12}px` }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: [0, 1, 0.7, 1, 0], opacity: [0, 1, 0.8, 1, 0] }}
              transition={{
                duration: 4,
                delay: 1.2 + i * 0.15,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div className="w-full h-full bg-gradient-to-b from-gold via-gold-light to-transparent rounded-full" />
            </motion.div>
          ))}
          
          {/* Línea base */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-gold/50 to-transparent rounded-full"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scaleX: [0.8, 1.2, 0.8] 
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Texto de carga */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.35em] text-gold/80 font-light">
            CARGANDO EXPERIENCIA<span className="inline-block w-8 text-left">{'.'.repeat(dots)}</span>
          </p>
          <div className="mt-3 w-48 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-gold to-transparent"
              animate={{ x: [-64, 240] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}