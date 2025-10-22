'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle, RefreshCw, ArrowLeft, CreditCard } from 'lucide-react';

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('order') || 'No especificado';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl border border-red-500/30 p-8 text-center">
        <div className="mb-6">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Pago Rechazado</h1>
          <p className="text-gray-300">No se pudo procesar tu pago</p>
        </div>

        {orderId && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-red-400 font-semibold">Orden #{orderId}</p>
            <p className="text-sm text-gray-400 mt-1">El pago fue rechazado</p>
          </div>
        )}

        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-2">Posibles causas:</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Fondos insuficientes</li>
            <li>• Datos de tarjeta incorrectos</li>
            <li>• Límites de transacción</li>
            <li>• Restricciones bancarias</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Intentar nuevamente
          </button>
          
          <Link 
            href="/"
            className="w-full border border-gray-600 text-gray-300 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}