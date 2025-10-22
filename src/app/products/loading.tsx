"use client";
import { motion } from 'framer-motion';

export default function ProductsLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-10">
      <motion.div
        className="w-20 h-20 relative"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-gold/20 border-t-gold"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-0 flex items-center justify-center font-serif text-gold text-2xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >S</motion.span>
      </motion.div>
      <div className="flex flex-col items-center text-gold/70 tracking-widest text-xs">
        <span>CARGANDO CATÁLOGO</span>
        <span className="mt-2 h-[2px] w-32 bg-gradient-to-r from-transparent via-gold to-transparent animate-pulse" />
      </div>
    </div>
  );
}
