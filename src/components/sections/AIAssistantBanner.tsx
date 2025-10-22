'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, ArrowRight, Bot, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AIAssistantBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 rounded-3xl" />
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-gold/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="text-gold-soft text-sm font-medium">
                    Tecnología IA Avanzada
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-serif text-gold-soft">
                    Encuentra Tu Fragancia Perfecta
                    <span className="block text-gold">con Inteligencia Artificial</span>
                  </h2>
                  
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Nuestro asistente de IA especializado en fragancias te ayuda a 
                    descubrir el perfume ideal según tus gustos, ocasión y 
                    preferencias personales.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-gray-300">
                      Recomendaciones personalizadas basadas en IA
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-gray-300">
                      Análisis de más de 213 fragancias únicas
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-gray-300">
                      Respuestas instantáneas 24/7
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/ai-assistant">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-gold-deep to-gold text-black font-semibold hover:from-gold hover:to-gold-soft transition-all duration-300"
                    >
                      <MessageCircle className="mr-2 w-5 h-5" />
                      Hablar con IA
                    </Button>
                  </Link>
                  
                  <Link href="/products">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-gold/30 text-gold-soft hover:border-gold hover:bg-gold hover:text-black"
                    >
                      Ver Catálogo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Right Content - Interactive Demo */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Chat Interface Demo */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gold/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3 pb-4 border-b border-gold/20">
                      <div className="w-10 h-10 bg-gradient-to-br from-gold/30 to-gold/20 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <div className="font-semibold text-gold-soft">Asistente SEVÁN IA</div>
                        <div className="text-sm text-green-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          En línea
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {/* AI Message */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-gold" />
                        </div>
                        <div className="bg-gold/10 border border-gold/20 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm text-gray-300">
                            ¡Hola! Soy tu asistente especializado en fragancias. 
                            ¿Qué tipo de aroma estás buscando hoy?
                          </p>
                        </div>
                      </div>

                      {/* User Message */}
                      <div className="flex gap-3 justify-end">
                        <div className="bg-gradient-to-r from-gold-deep to-gold rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm text-black">
                            Busco algo elegante para usar en el trabajo
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white font-semibold">TÚ</span>
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-gold" />
                        </div>
                        <div className="bg-gold/10 border border-gold/20 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm text-gray-300">
                            Perfecto! Te recomiendo &ldquo;Caballero Imperial&rdquo; - 
                            es sofisticado, duradero y perfecto para el ambiente profesional.
                          </p>
                          <div className="mt-2 p-2 bg-gold/5 rounded-lg border border-gold/10">
                            <div className="text-xs text-gold-soft font-medium">Caballero Imperial</div>
                            <div className="text-xs text-gray-400">Inspirado en Bleu de Chanel</div>
                            <div className="text-sm text-gold font-bold mt-1">$95.000</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Input */}
                    <div className="flex gap-2 pt-4 border-t border-gold/20">
                      <input
                        type="text"
                        placeholder="Escribe tu pregunta..."
                        className="flex-1 bg-gray-800/50 border border-gold/20 rounded-full px-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gold/40"
                        disabled
                      />
                      <button className="w-10 h-10 bg-gradient-to-r from-gold-deep to-gold rounded-full flex items-center justify-center text-black">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-xl" />
              </motion.div>
            </div>

            {/* Bottom Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gold/20"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gold mb-2">98%</div>
                <div className="text-sm text-gray-400">Precisión en Recomendaciones</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gold mb-2">&lt;2s</div>
                <div className="text-sm text-gray-400">Tiempo de Respuesta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gold mb-2">24/7</div>
                <div className="text-sm text-gray-400">Disponibilidad</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}