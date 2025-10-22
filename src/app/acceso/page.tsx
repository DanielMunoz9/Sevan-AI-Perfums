'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Mantener la ruta por compatibilidad pero redirigir a la página de login oficial
export default function Acceso() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return null;
}