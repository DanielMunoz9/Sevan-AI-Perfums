"use client";
import { motion } from 'framer-motion';

export default function AdminLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-8">
      <motion.div
        className="relative w-24 h-24"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-deep via-gold to-gold-light blur-md opacity-30"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 rounded-xl border border-gold/30 backdrop-blur-sm flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-serif text-4xl font-bold bg-gradient-to-b from-gold to-gold-light bg-clip-text text-transparent">S</span>
        </motion.div>
      </motion.div>
      <div className="text-center space-y-2">
        <p className="text-gold tracking-[0.4em] text-xs">ADMIN PANEL</p>
        <p className="text-gold/60 text-[11px] tracking-wider">CARGANDO CONTROLES</p>
        <motion.div
          className="mt-2 h-[2px] w-48 bg-gradient-to-r from-transparent via-gold to-transparent"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
