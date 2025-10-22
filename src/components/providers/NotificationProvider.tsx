'use client';

import React, { useState, useCallback, ReactNode } from 'react';
import { AlertsContainer, AlertType } from '@/components/ui/ProfessionalAlert';

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  duration?: number;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = useCallback((type: AlertType, title: string, message: string, duration = 4000) => {
    const id = Date.now().toString() + Math.random();
    setAlerts(prev => [...prev, { id, type, title, message, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  // Escuchar eventos del sistema de notificaciones antiguo
  React.useEffect(() => {
    const handleNotification = (event: any) => {
      const { message, type } = event.detail;
      
      // Mapear tipos de notificaciones
      let alertType: AlertType = 'info';
      let title = '';

      if (type === 'success') {
        alertType = 'success';
        title = '✅ Éxito';
      } else if (type === 'error') {
        alertType = 'error';
        title = '⚠️ Error';
      } else if (type === 'warning') {
        alertType = 'warning';
        title = '⚡ Atención';
      } else {
        alertType = 'info';
        title = 'ℹ️ Información';
      }

      showAlert(alertType, title, message);
    };

    window.addEventListener('showNotification', handleNotification);
    return () => window.removeEventListener('showNotification', handleNotification);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert]);

  return (
    <>
      {children}
      <AlertsContainer 
        alerts={alerts.map(alert => ({
          type: alert.type,
          title: alert.title,
          message: alert.message,
          duration: alert.duration,
          id: alert.id
        }))} 
        onRemove={removeAlert} 
      />
    </>
  );
}
