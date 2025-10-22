'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Settings, Shield, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminAccessButton() {
  // TEMPORAL: Mostramos SIEMPRE el botón para que puedas acceder al CRM
  // En producción, descomentar las validaciones de autenticación

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 z-50"
    >
      <Link href="/admin">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-gradient-to-r from-gold/30 to-gold/40 backdrop-blur-md border-2 border-gold/60 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          {/* Glow effect más visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-gold/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70 group-hover:opacity-100" />
          
          {/* Content */}
          <div className="relative flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/30 rounded-full blur-md" />
              <div className="relative bg-gradient-to-br from-gold/40 to-gold/60 p-3 rounded-full">
                <Crown className="w-6 h-6 text-gold drop-shadow-lg" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gold font-bold text-base">CRM ADMIN</span>
              <span className="text-gold/80 text-sm">Panel de Control</span>
            </div>
            
            <Settings className="w-5 h-5 text-gold/70 group-hover:rotate-90 transition-transform duration-300" />
          </div>
          
          {/* Pulse animation más visible */}
          <div className="absolute top-2 right-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
          </div>
          
          {/* Texto adicional */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-gold text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            👑 Acceso Directo al CRM
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}