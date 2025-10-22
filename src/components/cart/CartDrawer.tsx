'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import PaymentModal from '@/components/payment/PaymentModal';
import Image from 'next/image';
import { getProductImageUrl } from '@/utils/imageMapper';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, isLoading, total, subtotal, shipping, itemCount, updateQuantity, removeFromCart, clearCart, createOrder } = useCart();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    email: '',
    name: '',
    phone: '',
    address: ''
  });

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Validar datos del cliente
    if (!orderData.email || !orderData.name || !orderData.phone || !orderData.address) {
      // Mostrar notificación de error
      const event = new CustomEvent('notification', {
        detail: {
          type: 'error',
          message: 'Por favor completa todos los datos de entrega'
        }
      });
      window.dispatchEvent(event);
      return;
    }

    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    try {
      // Crear la orden en la base de datos
      const order = await createOrder({
        customerName: orderData.name,
        customerEmail: orderData.email,
        customerPhone: orderData.phone,
        shippingAddress: orderData.address,
        city: orderData.address, // Simplificado para este ejemplo
        paymentMethod: 'ePayco'
      });

      // Mostrar notificación de éxito
      const event = new CustomEvent('notification', {
        detail: {
          type: 'success',
          message: `¡Pedido #${order.id} creado exitosamente! Recibirás un email de confirmación.`
        }
      });
      window.dispatchEvent(event);

      // Limpiar carrito y cerrar modales
      clearCart();
      setIsPaymentOpen(false);
      onClose();

      // Resetear datos del formulario
      setOrderData({
        email: '',
        name: '',
        phone: '',
        address: ''
      });

    } catch (error) {
      console.error('Error creando orden:', error);
      const event = new CustomEvent('notification', {
        detail: {
          type: 'error',
          message: 'Error procesando el pedido. Contacta soporte.'
        }
      });
      window.dispatchEvent(event);
    }
  };

  const handlePaymentError = (error: string) => {
    const event = new CustomEvent('notification', {
      detail: {
        type: 'error',
        message: error
      }
    });
    window.dispatchEvent(event);
    setIsPaymentOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
          />            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-l border-gray-700 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-gold" />
                  <h2 className="text-xl font-serif text-white">
                    Carrito ({items.length})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
                    <h3 className="text-lg text-white mb-2">Tu carrito está vacío</h3>
                    <p className="text-gray-400 mb-6">Descubre nuestras fragancias exclusivas</p>
                    <button
                      onClick={onClose}
                      className="bg-gradient-to-r from-gold-deep to-gold text-black px-6 py-3 rounded-lg font-semibold hover:from-gold hover:to-gold-soft transition-all"
                    >
                      Explorar Productos
                    </button>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {/* Cart Items */}
                    <div className="space-y-4">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex gap-4 bg-gray-800/50 rounded-lg p-4"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-700">
                            <Image
                              src={getProductImageUrl(item.product)}
                              alt={item.product.visible_title}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.src = '/images/placeholder-product.svg';
                              }}
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium text-sm leading-tight mb-1">
                              {item.product.visible_title}
                            </h3>
                            <p className="text-gold font-semibold text-sm">
                              {formatPrice(item.product.sale_price || item.product.price)}
                            </p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-4 h-4 text-white" />
                              </button>
                              <span className="text-white font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-between">
                            <button
                              onClick={() => removeFromCart(item.product_id)}
                              className="w-8 h-8 rounded-full hover:bg-red-500/20 flex items-center justify-center transition-colors group"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                            </button>
                            <p className="text-white font-semibold text-sm">
                              {formatPrice((item.product.sale_price || item.product.price) * item.quantity)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Customer Data Form */}
                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-white font-semibold mb-4">Datos de Entrega</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Nombre completo *"
                          value={orderData.name}
                          onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all text-sm"
                        />
                        <input
                          type="email"
                          placeholder="Email *"
                          value={orderData.email}
                          onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all text-sm"
                        />
                        <input
                          type="tel"
                          placeholder="Teléfono *"
                          value={orderData.phone}
                          onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all text-sm"
                        />
                        <textarea
                          placeholder="Dirección de entrega *"
                          value={orderData.address}
                          onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                          rows={2}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-700 p-6 space-y-4">
                  {/* Precio breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-gray-300">
                      <span>Subtotal:</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-300">
                      <span>Envío:</span>
                      <span>Se coordina con asesor</span>
                    </div>
                    <div className="border-t border-gray-600 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-white font-semibold">Total:</span>
                        <span className="text-xl font-bold text-gold">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-gold-deep to-gold text-black font-semibold py-3 rounded-lg hover:from-gold hover:to-gold-soft transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Proceder al Pago
                    </button>
                    
                    <button
                      onClick={clearCart}
                      className="w-full border border-gray-600 text-gray-300 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      Vaciar Carrito
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Payment Modal - REACTIVADO CON MONTO FIJO */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        product={{
          id: items[0]?.id || 'cart-order',
          title: `Pedido de ${itemCount} producto${itemCount > 1 ? 's' : ''}`,
          visible_title: `Orden SEVAN - ${itemCount} items`,
          price: total,
          image_url: '/images/placeholder-product.jpg'
        }}
        quantity={1}
        customerEmail={orderData.email}
        customerName={orderData.name}
        customerPhone={orderData.phone}
        customerAddress={orderData.address}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </>
  );
}