'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X, AlertCircle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const ProfessionalAlert: React.FC<AlertProps> = ({ 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-900/90 to-green-800/90',
          border: 'border-green-500/50',
          text: 'text-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-400'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-900/90 to-red-800/90',
          border: 'border-red-500/50',
          text: 'text-red-200',
          icon: AlertCircle,
          iconColor: 'text-red-400'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-yellow-900/90 to-yellow-800/90',
          border: 'border-yellow-500/50',
          text: 'text-yellow-200',
          icon: AlertTriangle,
          iconColor: 'text-yellow-400'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-900/90 to-blue-800/90',
          border: 'border-blue-500/50',
          text: 'text-blue-200',
          icon: Info,
          iconColor: 'text-blue-400'
        };
    }
  };

  const styles = getAlertStyles();
  const Icon = styles.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          className={`
            fixed top-4 right-4 z-50 max-w-sm w-full mx-auto p-4 rounded-xl shadow-2xl backdrop-blur-md
            ${styles.bg} ${styles.border} border-2 ${styles.text}
            sm:max-w-md lg:max-w-lg
          `}
        >
          <div className="flex items-start gap-3">
            <Icon className={`w-6 h-6 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm sm:text-base text-white mb-1">
                {title}
              </h4>
              <p className="text-xs sm:text-sm opacity-90 break-words">
                {message}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors p-1 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook para usar alertas
export const useAlert = () => {
  const [alerts, setAlerts] = useState<Array<AlertProps & { id: string }>>([]);

  const showAlert = (alert: Omit<AlertProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setAlerts(prev => [...prev, { ...alert, id }]);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const AlertContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {alerts.map(alert => (
        <ProfessionalAlert
          key={alert.id}
          {...alert}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );

  return {
    showAlert,
    AlertContainer,
    showSuccess: (title: string, message: string) => showAlert({ type: 'success', title, message }),
    showError: (title: string, message: string) => showAlert({ type: 'error', title, message }),
    showWarning: (title: string, message: string) => showAlert({ type: 'warning', title, message }),
    showInfo: (title: string, message: string) => showAlert({ type: 'info', title, message })
  };
};

// Componente de Loading profesional
export const ProfessionalLoading: React.FC<{ message?: string }> = ({ 
  message = "Cargando..." 
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl shadow-2xl border border-yellow-500/30 max-w-sm w-full mx-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-yellow-500/30 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-yellow-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-yellow-400 font-bold text-lg mb-2">SEVAN AI</h3>
          <p className="text-gray-300 text-sm">{message}</p>
        </div>
      </div>
    </div>
  </div>
);

// Modal profesional responsive
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ProfessionalModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`
              fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
              w-full ${sizeClasses[size]} mx-4 max-h-[90vh] overflow-auto
            `}
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-yellow-500/30">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
                <h2 className="text-xl sm:text-2xl font-bold text-yellow-400">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-6">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};