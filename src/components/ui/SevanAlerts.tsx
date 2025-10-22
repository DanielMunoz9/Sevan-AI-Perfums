import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, Loader } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'loading';
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

export const SevanAlert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  duration = 4000,
  onClose,
  actions
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0 && type !== 'loading') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, type]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-400" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-400" />;
      case 'loading':
        return <Loader className="w-6 h-6 text-gold animate-spin" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'from-green-500/20 to-green-600/10',
          border: 'border-green-500/30',
          text: 'text-green-100'
        };
      case 'error':
        return {
          bg: 'from-red-500/20 to-red-600/10',
          border: 'border-red-500/30',
          text: 'text-red-100'
        };
      case 'info':
        return {
          bg: 'from-blue-500/20 to-blue-600/10',
          border: 'border-blue-500/30',
          text: 'text-blue-100'
        };
      case 'loading':
        return {
          bg: 'from-gold/20 to-gold/10',
          border: 'border-gold/30',
          text: 'text-gold-light'
        };
    }
  };

  const colors = getColors();

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className={`fixed top-4 right-4 z-50 max-w-md w-full`}
    >
      <div className={`
        bg-gradient-to-r ${colors.bg} backdrop-blur-md 
        border ${colors.border} rounded-2xl p-6 shadow-2xl
        relative overflow-hidden
      `}>
        {/* Efecto de brillo dorado */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
        
        <div className="flex items-start gap-4">
          {/* Icono */}
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold text-white mb-1`}>
              {title}
            </h4>
            <p className={`text-sm ${colors.text} leading-relaxed`}>
              {message}
            </p>

            {/* Acciones */}
            {actions && actions.length > 0 && (
              <div className="flex gap-2 mt-4">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${action.variant === 'primary' 
                        ? 'bg-gradient-to-r from-gold-deep to-gold text-black hover:from-gold hover:to-gold-soft' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botón cerrar - MÁS VISIBLE */}
          {type !== 'loading' && onClose && (
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(), 300);
              }}
              className="flex-shrink-0 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="Cerrar alerta"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Barra de progreso para alerts temporales */}
        {duration > 0 && type !== 'loading' && (
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold to-gold-light opacity-60"
          />
        )}
      </div>
    </motion.div>
  );
};

// Hook para manegar alertas
export const useSevanAlerts = () => {
  const [alerts, setAlerts] = useState<Array<AlertProps & { id: string }>>([]);

  const addAlert = (alert: Omit<AlertProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAlert = {
      ...alert,
      id,
      onClose: () => removeAlert(id)
    };

    setAlerts(prev => [...prev, newAlert]);
    return id;
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const success = (title: string, message: string, actions?: AlertProps['actions']) => {
    return addAlert({ type: 'success', title, message, actions });
  };

  const error = (title: string, message: string, actions?: AlertProps['actions']) => {
    return addAlert({ type: 'error', title, message, actions });
  };

  const info = (title: string, message: string, actions?: AlertProps['actions']) => {
    return addAlert({ type: 'info', title, message, actions });
  };

  const warning = (title: string, message: string, actions?: AlertProps['actions']) => {
    return addAlert({ type: 'info', title, message, actions }); // Usa 'info' como warning
  };

  const loading = (title: string, message: string) => {
    return addAlert({ type: 'loading', title, message, duration: 0 });
  };

  const AlertContainer = () => (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 pointer-events-none">
      <AnimatePresence>
        {alerts.map(alert => (
          <div key={alert.id} className="pointer-events-auto">
            <SevanAlert {...alert} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );

  return {
    alerts,
    addAlert,
    removeAlert,
    success,
    error,
    info,
    warning,
    loading,
    AlertContainer
  };
};