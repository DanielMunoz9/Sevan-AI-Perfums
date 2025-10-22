'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

interface GenericPerfumeOfferProps {
  selectedProduct?: {
    id: string | number;
    title: string;
    price: number;
  };
}

const GENERIC_PERFUME = {
  id: 'generic-perfume',
  title: '100ML - Envase Genérico',
  description: 'Mismo perfume premium, envase sin marca',
  fullDescription: 'Este es el mismo perfume que el de la marca, pero en un envase genérico simple. Obtiene exactamente la misma calidad y fragrancia, solo que sin el empaque de lujo. ¡Paga solo por el aroma, no por la caja!',
  price: 60000,
  images: [
    'https://i.ibb.co/Z6q0QdHS/imggenerico1.jpg',
    'https://i.ibb.co/SDS5P0QH/imggenriico2.jpg'
  ],
  volume: '100ML',
  concentration: '18%',
  duration: '8+ horas',
  notes: 'Mismo aroma premium en presentación genérica'
};

const WHATSAPP_ADVISOR = "573193605666";

export function GenericPerfumeOffer({ selectedProduct }: GenericPerfumeOfferProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleWhatsAppContact = () => {
    const productName = selectedProduct ? selectedProduct.title : 'este perfume';
    const message = encodeURIComponent(
      `Hola! 👋 Me interesa el ${productName} en envase genérico - 100ML por $${GENERIC_PERFUME.price.toLocaleString('es-CO')}. ¿Está disponible?`
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_ADVISOR}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const savings = selectedProduct ? selectedProduct.price - GENERIC_PERFUME.price : 0;
  const savingsPercent = selectedProduct ? Math.round((savings / selectedProduct.price) * 100) : 0;

  return (
    <div className="w-full max-w-6xl mx-auto mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-gold/30 overflow-hidden shadow-xl"
      >
        {/* Banner compacto */}
        <div className="bg-gradient-to-r from-gold via-yellow-500 to-gold py-2 px-4 text-center">
          <p className="text-black font-black text-sm md:text-base tracking-wider">
            ✨ OPCIÓN ECONÓMICA - MISMO PERFUME, ENVASE GENÉRICO
            {savings > 0 && ` - AHORRA ${savingsPercent}%`} ✨
          </p>
        </div>

        {/* Contenido compacto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 lg:p-8">
          
          {/* VIDEO/IMAGEN */}
          <div className="relative">
            <div className="aspect-square relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gold/20">
              {!imageError ? (
                <img
                  src={GENERIC_PERFUME.images[currentImageIndex]}
                  alt={`${GENERIC_PERFUME.title} - Imagen ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Sparkles className="w-20 h-20 text-gold/50" />
                  <div className="text-center mt-3">
                    <p className="text-3xl font-black text-gold">PERFUME</p>
                    <p className="text-2xl font-black text-white">100ML</p>
                    <p className="text-sm text-gray-400 mt-1">Envase Genérico</p>
                  </div>
                </div>
              )}
              
              {/* Badge de volumen */}
              <div className="absolute top-3 right-3 bg-gold text-black px-4 py-1 rounded-full font-black text-sm shadow-lg">
                {GENERIC_PERFUME.volume}
              </div>
            </div>

            {/* Thumbnails compactos */}
            {GENERIC_PERFUME.images.length > 1 && !imageError && (
              <div className="flex gap-2 mt-3 justify-center">
                {GENERIC_PERFUME.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      currentImageIndex === idx
                        ? 'border-gold scale-110'
                        : 'border-gray-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gray-800 rounded-md flex items-center justify-center">
                      <span className="text-gold text-xs font-bold">{idx + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFORMACIÓN COMPACTA */}
          <div className="flex flex-col justify-between space-y-4">
            
            {/* Título y descripción */}
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                {GENERIC_PERFUME.title}
              </h3>
              <p className="text-gold text-sm font-semibold mb-3">
                {GENERIC_PERFUME.description}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                💡 {GENERIC_PERFUME.fullDescription}
              </p>
            </div>

            {/* Especificaciones compactas */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gradient-to-br from-gray-800 to-black border border-gold/20 rounded-lg p-3 text-center">
                <Zap className="w-4 h-4 text-gold mx-auto mb-1" />
                <p className="text-xs text-gray-400">Volumen</p>
                <p className="text-white font-bold text-sm">{GENERIC_PERFUME.volume}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-black border border-gold/20 rounded-lg p-3 text-center">
                <ShieldCheck className="w-4 h-4 text-gold mx-auto mb-1" />
                <p className="text-xs text-gray-400">Concent.</p>
                <p className="text-white font-bold text-sm">{GENERIC_PERFUME.concentration}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-black border border-gold/20 rounded-lg p-3 text-center">
                <Sparkles className="w-4 h-4 text-gold mx-auto mb-1" />
                <p className="text-xs text-gray-400">Duración</p>
                <p className="text-white font-bold text-sm">{GENERIC_PERFUME.duration}</p>
              </div>
            </div>

            {/* Beneficios compactos */}
            <div className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/30 rounded-xl p-4">
              <p className="text-gold font-bold text-xs uppercase mb-2 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> ¿Por qué genérico?
              </p>
              <ul className="space-y-1 text-xs text-gray-300">
                <li className="flex items-start gap-1">
                  <span className="text-gold">✓</span>
                  <span>Mismo aroma premium</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-gold">✓</span>
                  <span>Sin costo de empaque</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-gold">✓</span>
                  <span>Máxima calidad, mínimo precio</span>
                </li>
              </ul>
            </div>

            {/* Precio compacto */}
            <div className="bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl p-4 border-2 border-gold/40">
              <p className="text-xs text-gold/80 mb-1 uppercase font-bold">Precio Especial</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl md:text-4xl font-black text-white">
                  ${formatPrice(GENERIC_PERFUME.price)}
                </span>
                <span className="text-sm font-bold text-gold">COP</span>
              </div>
              
              {selectedProduct && savings > 0 && (
                <div className="bg-black/40 rounded-lg p-2 border border-gold/40">
                  <p className="text-xs text-green-400 font-bold">
                    AHORRAS ${formatPrice(savings)} ({savingsPercent}%)
                  </p>
                </div>
              )}
            </div>

            {/* Botón WhatsApp compacto */}
            <Button
              onClick={handleWhatsAppContact}
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-gold to-yellow-500 text-black font-black text-sm py-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              PEDIR POR WHATSAPP
            </Button>

            {/* Garantía compacta */}
            <div className="bg-white/5 border border-gold/20 rounded-lg p-2 text-center">
              <p className="text-xs font-semibold text-gold">
                ✓ GARANTÍA | ✓ ENVÍO SEGURO | ✓ DEVOLUCIÓN 7 DÍAS
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default GenericPerfumeOffer;
