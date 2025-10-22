'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, CreditCard, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PaymentPendingPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('order') || 'No especificado';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl border border-yellow-500/30 p-8 text-center">
        <div className="mb-6">
          <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-bold text-white mb-2">Pago Pendiente</h1>
          <p className="text-gray-300">Tu pago está siendo procesado</p>
        </div>

        {orderId && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 font-semibold">Orden #{orderId}</p>
            <p className="text-sm text-gray-400 mt-1">En proceso de verificación</p>
          </div>
        )}

        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-2">¿Qué sigue?</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Recibirás confirmación por email</li>
            <li>• El proceso puede tomar unos minutos</li>
            <li>• Puedes verificar el estado más tarde</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link 
            href="/orders"
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-semibold py-3 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Verificar estado
          </Link>
          
          <Link 
            href="/"
            className="w-full border border-gray-600 text-gray-300 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}