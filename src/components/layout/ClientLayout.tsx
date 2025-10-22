'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import AmelieFloatingChat from '@/components/ai/AmelieFloatingChat';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { NotificationProvider } from '@/components/providers/NotificationProvider';
import SplashScreen from '@/components/layout/SplashScreen';

// 🚀 IMPORTAR SERVICIO EMAILJS PARA QUE ESTÉ DISPONIBLE GLOBALMENTE
import '@/services/sevan-emailjs-service';

interface ClientLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function ClientLayout({ children, className }: ClientLayoutProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen />}
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <div className={className}>
                <Header />
                <main className="min-h-screen">
                  {children}
                </main>
                <AmelieFloatingChat />
              </div>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </>
  );
}