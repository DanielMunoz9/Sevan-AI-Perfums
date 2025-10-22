// Global fallback loading UI for Next.js App Router
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GlobalLoading() {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDots(d => (d + 1) % 4), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      <div className="relative mb-10">
        <AnimatedMark />
      </div>
      <AnimatedLines />
      <p className="mt-8 text-sm tracking-[0.35em] text-gold/80 font-light">
        INICIANDO<span className="inline-block w-8 text-left">{'.'.repeat(dots)}</span>
      </p>
    </div>
  );
}

function AnimatedMark() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <motion.div
        className="w-28 h-28 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-deep flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_-5px_rgba(255,215,0,0.35)]"
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        <motion.span
          className="text-5xl font-serif font-bold bg-gradient-to-b from-black to-black/60 text-gold drop-shadow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >S</motion.span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 mix-blend-overlay"
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <motion.h1
        className="mt-6 text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-gold-deep via-gold to-gold-light bg-clip-text text-transparent tracking-widest"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        SEVÁN PERFUM
      </motion.h1>
      <motion.p
        className="mt-2 text-xs md:text-sm uppercase tracking-[0.5em] text-gold/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        LUXURY FRAGRANCES
      </motion.p>
    </motion.div>
  );
}

function AnimatedLines() {
  const lines = Array.from({ length: 7 });
  return (
    <div className="relative w-[260px] h-40 mt-2">
      {lines.map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-[2px] h-10 origin-bottom"
          style={{ top: `${8 + i * 14}px` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: 3.6,
            delay: i * 0.18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <motion.div className="w-full h-full bg-gradient-to-b from-gold via-gold-light to-transparent" />
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        animate={{ opacity: [0.2, 0.9, 0.2] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
