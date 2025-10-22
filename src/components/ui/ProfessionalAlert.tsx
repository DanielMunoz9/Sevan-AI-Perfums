'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface ProfessionalAlertProps {
  type: AlertType;
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function useProfessionalAlert() {
  const [alerts, setAlerts] = useState<(ProfessionalAlertProps & { id: string })[]>([]);

  const showAlert = (alert: ProfessionalAlertProps) => {
    const id = Date.now().toString();
    const newAlert = { ...alert, id };
    setAlerts(prev => [...prev, newAlert]);

    if (alert.duration !== 0) {
      const timeout = setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== id));
      }, alert.duration || 4000);

      return () => clearTimeout(timeout);
    }
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return { alerts, showAlert, removeAlert };
}

export function ProfessionalAlert({ 
  type, 
  title, 
  message, 
  duration = 4000, 
  onClose 
}: ProfessionalAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration === 0) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variants = {
    enter: { opacity: 0, y: -20, scale: 0.95 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 }
  };

  const iconMap = {
    success: <CheckCircle className="w-6 h-6" />,
    error: <XCircle className="w-6 h-6" />,
    warning: <AlertCircle className="w-6 h-6" />,
    info: <Info className="w-6 h-6" />
  };

  const colorMap = {
    success: {
      bg: 'bg-gradient-to-r from-emerald-900/20 via-emerald-800/10 to-teal-900/20',
      border: 'border-emerald-500/30',
      icon: 'text-emerald-400',
      title: 'text-emerald-300',
      text: 'text-emerald-200/90',
      accent: 'from-emerald-500/20 to-teal-500/20'
    },
    error: {
      bg: 'bg-gradient-to-r from-red-900/20 via-red-800/10 to-rose-900/20',
      border: 'border-red-500/30',
      icon: 'text-red-400',
      title: 'text-red-300',
      text: 'text-red-200/90',
      accent: 'from-red-500/20 to-rose-500/20'
    },
    warning: {
      bg: 'bg-gradient-to-r from-amber-900/20 via-amber-800/10 to-orange-900/20',
      border: 'border-amber-500/30',
      icon: 'text-amber-400',
      title: 'text-amber-300',
      text: 'text-amber-200/90',
      accent: 'from-amber-500/20 to-orange-500/20'
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-900/20 via-blue-800/10 to-cyan-900/20',
      border: 'border-blue-500/30',
      icon: 'text-blue-400',
      title: 'text-blue-300',
      text: 'text-blue-200/90',
      accent: 'from-blue-500/20 to-cyan-500/20'
    }
  };

  const colors = colorMap[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={`
            ${colors.bg} 
            ${colors.border}
            border-2 rounded-2xl p-5 
            backdrop-blur-xl
            shadow-2xl
            relative overflow-hidden
          `}
        >
          {/* Animated background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${colors.accent} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
          
          {/* Content */}
          <div className="relative z-10 flex gap-4">
            {/* Icon */}
            <div className={`flex-shrink-0 mt-0.5 ${colors.icon}`}>
              {iconMap[type]}
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-base mb-1 ${colors.title}`}>
                {title}
              </h3>
              <p className={`text-sm leading-relaxed ${colors.text}`}>
                {message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className={`flex-shrink-0 p-1 rounded-lg transition-all hover:bg-white/10 ${colors.icon}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          {duration > 0 && (
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.accent}`}
              style={{ transformOrigin: 'left' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AlertsContainer({ alerts, onRemove }: { alerts: (ProfessionalAlertProps & { id: string })[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-md pointer-events-none">
      <AnimatePresence mode="popLayout">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="pointer-events-auto"
          >
            <ProfessionalAlert
              {...alert}
              onClose={() => onRemove(alert.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
