'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  ArrowRight,
  ArrowLeft,
  Package,
  Truck,
  Shield,
  Clock,
  X,
  Gift,
  Check
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, total, subtotal, shipping, itemCount, updateQuantity, removeFromCart, isLoading, couponCode, couponDiscount, isFreeShipping, couponError, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');

  const cartItems = items;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900/95 to-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando tu carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900/95 to-black pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products" className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Continuar comprando
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl border border-white/10 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="w-6 h-6 text-gold" />
                <h1 className="text-2xl font-serif text-white">Tu Carrito ({itemCount})</h1>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl text-gray-400 mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-500 mb-6">Descubre nuestra exclusiva colección de fragancias</p>
                  <Link href="/products">
                    <button className="bg-gradient-to-r from-gold-deep to-gold text-black font-semibold px-6 py-3 rounded-xl hover:from-gold hover:to-gold-soft transition-all">
                      Explorar Productos
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 p-4 bg-black/30 rounded-xl border border-white/5"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-gold/10 rounded-lg flex items-center justify-center overflow-hidden">
                          <div className="w-12 h-16 bg-gradient-to-b from-gold/40 to-gold/20 rounded-sm"></div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{item.product.visible_title}</h3>
                          <p className="text-gray-400 text-sm mb-1">{item.product.short_description}</p>
                          <p className="text-gold text-xs">{item.product.concentration}</p>
                          
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-4 h-4 text-white" />
                              </button>
                              <span className="text-white w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-gold font-bold">{formatPrice(item.product.sale_price || item.product.price)}</span>
                              {item.product.sale_price && (
                                <span className="text-gray-500 line-through text-sm">{formatPrice(item.product.price)}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-gray-400 hover:text-red-400 transition-colors p-2"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl border border-white/10 backdrop-blur-sm p-6 sticky top-24">
                <h2 className="text-xl font-serif text-white mb-6">Resumen de Compra</h2>

                {/* Sección de Cupón */}
                <div className="mb-6 p-4 bg-black/30 rounded-lg border border-gold/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="w-4 h-4 text-gold" />
                    <h3 className="text-sm font-semibold text-gold">Código de Promoción</h3>
                  </div>
                  
                  {!couponCode ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Ingresa tu código"
                        className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                      <button
                        onClick={() => {
                          if (couponInput.trim()) {
                            applyCoupon(couponInput);
                            setCouponInput('');
                          }
                        }}
                        disabled={!couponInput.trim()}
                        className="px-3 py-2 bg-gold text-black font-semibold rounded-lg text-sm hover:bg-gold-light disabled:opacity-50 transition-colors"
                      >
                        Aplicar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">{couponCode} aplicado ✓</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {couponError && (
                    <p className="text-red-400 text-xs mt-2">{couponError}</p>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Descuento</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-300">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Envío
                    </span>
                    <span className={shipping === 0 || isFreeShipping ? 'text-green-400' : ''}>
                      {shipping === 0 || isFreeShipping ? 'GRATIS ✓' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  {isFreeShipping && (
                    <p className="text-green-400 text-xs">¡Envío gratis en compras nacionales mayores a $300.000!</p>
                  )}
                  
                  <div className="border-t border-gray-600 pt-3">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span className="text-gold">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-gold-deep to-gold text-black font-semibold py-3 rounded-xl hover:from-gold hover:to-gold-soft transition-all mb-4 flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Proceder al Pago
                </button>

                <div className="text-center text-xs text-gray-500 space-y-2">
                  <p>✅ Garantía de satisfacción</p>
                  <p>✅ Pago 100% seguro</p>
                  <p>✅ Envío discreto y seguro</p>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <p className="text-gray-400 text-sm mb-3">Métodos de pago:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>• PSE</div>
                    <div>• Nequi</div>
                    <div>• Daviplata</div>
                    <div>• Efecty</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}