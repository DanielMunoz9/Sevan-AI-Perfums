'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('order') || 'No especificado';
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (orderId) {
      // TODO: Obtener detalles de la orden de la base de datos
      console.log('🎉 Pago exitoso para orden:', orderId);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl border border-green-500/30 p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">¡Pago Exitoso!</h1>
          <p className="text-gray-300">Tu orden ha sido procesada correctamente</p>
        </div>

        {orderId && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <p className="text-green-400 font-semibold">Orden #{orderId}</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-gray-300">
            <Package className="w-5 h-5 text-blue-400" />
            <span>Preparando tu pedido</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-5 h-5 text-blue-400" />
            <span>Recibirás confirmación por email</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            href="/"
            className="w-full bg-gradient-to-r from-gold-deep to-gold text-black font-semibold py-3 rounded-lg hover:from-gold hover:to-gold-soft transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continuar comprando
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link 
            href="/orders"
            className="w-full border border-gray-600 text-gray-300 py-3 rounded-lg hover:bg-gray-800 transition-colors block"
          >
            Ver mis pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}