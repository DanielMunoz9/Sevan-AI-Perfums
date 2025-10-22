'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, ShoppingBag } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    visible_title: string;
    price: number;
    image_url?: string;
  };
  quantity?: number;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export default function PaymentModal({
  isOpen,
  onClose,
  product,
  quantity = 1,
  customerEmail,
  customerName,
  customerPhone,
  customerAddress,
  onSuccess,
  onError
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Calcular monto total FIJO basado en el producto
  const unitPrice = Math.round(product.price);
  const totalAmount = unitPrice * quantity;

  const handleMercadoPagoPayment = async () => {
    setIsProcessing(true);
    
    try {
      console.log('🚀 Iniciando pago con monto fijo...');
      
      // Usar la API de MONTO FIJO
      const paymentData = {
        product: {
          id: product.id,
          title: product.title,
          visible_title: product.visible_title,
          price: unitPrice, // MONTO FIJO DEL PRODUCTO
          image_url: product.image_url
        },
        customer: {
          email: customerEmail,
          name: customerName,
          phone: customerPhone || '3001234567',
          address: customerAddress || 'Dirección no especificada'
        },
        quantity: quantity
      };

      console.log('📦 Enviando datos de pago con monto fijo:', paymentData);

      const endpoints = ['/api/mercadopago/create-fixed-payment'];
      if (process.env.NODE_ENV !== 'production') {
        endpoints.push('/api/payment/simulate');
      }

      let lastError: string | undefined;

      for (const endpoint of endpoints) {
        console.log('🔍 Probando endpoint de pago:', endpoint);

        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
          });

          console.log('🔍 Estado de respuesta:', response.status);

          const rawBody = await response.text();
          let data: any = null;

          if (rawBody) {
            try {
              data = JSON.parse(rawBody);
            } catch (parseError) {
              console.error('❌ No se pudo interpretar la respuesta de MercadoPago como JSON:', parseError);
              console.error('📄 Respuesta cruda recibida:', rawBody);
            }
          }

          if (response.ok && data?.success && data?.checkoutUrl) {
            const amountFromApi = typeof data.amount === 'number' ? data.amount : totalAmount;
            console.log('✅ Redirigiendo a MercadoPago:', data.checkoutUrl);
            console.log(`💰 Monto confirmado: ${formatPrice(amountFromApi)}`);

            window.open(data.checkoutUrl, '_blank');
            onSuccess(data.orderId);
            onClose();
            return;
          }

          const parsedError = data?.error || data?.message || data?.detail;
          const fallbackError = rawBody?.trim().length ? rawBody : undefined;
          lastError = parsedError || fallbackError || `Error inesperado (${response.status})`;
          console.warn('⚠️ Endpoint fallido:', endpoint, lastError);
        } catch (endpointError) {
          lastError = endpointError instanceof Error ? endpointError.message : 'Error desconocido';
          console.error('❌ Error comunicando con endpoint:', endpoint, lastError);
        }
      }

      onError(lastError || 'No se pudo iniciar el pago con MercadoPago');
    } catch (error: unknown) {
      console.error('❌ Error de pago completo:', error);
      const fallbackMessage = error instanceof Error ? error.message : 'Problema de red';
      onError(`Error de conexión: ${fallbackMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-md mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gold/20 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Procesar Pago</h2>
                  <p className="text-gray-400 text-sm">Selecciona tu método de pago</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Producto:</span>
                <span className="text-white font-semibold">{product.visible_title}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Cantidad:</span>
                <span className="text-white font-semibold">{quantity}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Precio unitario:</span>
                <span className="text-white font-semibold">{formatPrice(unitPrice)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Envío:</span>
                <span className="text-white font-semibold">Se coordina con asesor</span>
              </div>
              <div className="border-t border-gray-600 mt-2 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gold font-semibold">Total FIJO:</span>
                  <span className="text-gold font-bold text-lg">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 mb-6">
              {/* MercadoPago MONTO FIJO */}
              <button
                onClick={handleMercadoPagoPayment}
                disabled={isProcessing}
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-5 h-5" />
                {isProcessing ? 'Procesando...' : `Pagar ${formatPrice(totalAmount)} - MercadoPago`}
              </button>
              
              <p className="text-xs text-green-400 text-center">
                ✅ Monto fijo del producto - Sin modificaciones posibles
              </p>
            </div>

            {/* Security Info */}
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Lock className="w-4 h-4" />
              <span>Pago seguro procesado por MercadoPago</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}