'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import EmailJSInitializer from '@/components/admin/EmailJSInitializer';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace('/login?next=/admin');
      return;
    }

    if (!isAdmin) {
      router.replace('/');
    }
  }, [loading, user, isAdmin, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black/90 text-white">
        <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium text-gray-200">
          Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-950">
      {/* <EmailJSInitializer /> */}
      
      {/* Admin Panel - Temporalmente en construcción */}
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Panel de Administración</h1>
          <p className="mb-8 text-xl text-gray-400">El panel de administración está siendo optimizado para Vercel.</p>
          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-6 py-4 text-yellow-300">
            <p>✨ Panel completo disponible próximamente</p>
            <p className="mt-2 text-sm">Mientras tanto, accede a tu Supabase directamente para gestionar datos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}