'use client';

import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Truck, 
  Shield, 
  CreditCard, 
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  Headphones,
  RefreshCw,
  Zap
} from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Explora & Elige',
    description: 'Navega nuestro catálogo de 213 fragancias premium. Usa nuestro asistente IA para recomendaciones personalizadas.',
    icon: ShoppingCart,
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '02',
    title: 'Compra Segura',
    description: 'Proceso de compra 100% seguro con múltiples métodos de pago. Tecnología de encriptación bancaria.',
    icon: CreditCard,
    color: 'from-green-500 to-green-600'
  },
  {
    number: '03',
    title: 'Preparación Express',
    description: 'Tu pedido se prepara inmediatamente con empaque premium y control de calidad riguroso.',
    icon: Package,
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: '04',
    title: 'Entrega Rápida',
    description: 'Envío express 2-4h en Bogotá, 24-48h nacional. Tracking en tiempo real de tu pedido.',
    icon: Truck,
    color: 'from-orange-500 to-orange-600'
  }
];

const benefits = [
  {
    icon: Shield,
    title: 'Compra Protegida',
    description: 'Garantía de satisfacción 100% o devuelves tu dinero. Sin preguntas.',
    stats: '99.8% satisfacción'
  },
  {
    icon: Zap,
    title: 'Entrega Express',
    description: 'El e-commerce de fragancias más rápido de Colombia.',
    stats: '2-4 horas Bogotá'
  },
  {
    icon: Star,
    title: 'Calidad Premium',
    description: 'Formulaciones artesanales con 18% de concentración aromática.',
    stats: '4.9/5 estrellas'
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Asesoría especializada disponible en WhatsApp, chat y teléfono.',
    stats: 'Respuesta <2min'
  }
];

const paymentMethods = [
  { name: 'Tarjetas de Crédito', logos: ['Visa', 'Mastercard', 'American Express'] },
  { name: 'Débito', logos: ['Visa Débito', 'Mastercard Débito'] },
  { name: 'Digitales', logos: ['PayPal', 'Apple Pay', 'Google Pay'] },
  { name: 'Colombia', logos: ['PSE', 'Nequi', 'Daviplata', 'Efecty'] }
];

export default function EcommerceSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/95 via-black to-gray-900/95 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_30%,rgba(255,255,255,0.02)_50%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full px-6 py-3 mb-8"
          >
            <ShoppingCart className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-blue-300 text-sm font-semibold tracking-wide">
              COMERCIO ELECTRÓNICO PREMIUM
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-serif font-light mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
              Compra Online
            </span>
            <span className="block text-white mt-2">Segura y Rápida</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Experiencia de compra digital de 
            <span className="text-blue-400 font-medium"> clase mundial</span>. 
            Tecnología avanzada, seguridad bancaria y la comodidad de recibir fragancias premium 
            <span className="text-purple-400 font-medium"> directo en tu puerta</span>.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-serif font-light text-center mb-12 text-white"
          >
            ¿Cómo funciona nuestro proceso?
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-3xl p-6 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-white/20 group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-gold to-gold-deep rounded-2xl flex items-center justify-center font-bold text-black text-lg shadow-2xl">
                    {step.number}
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Icon */}
                  <div className="relative mb-6 pt-4">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mx-auto relative`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <div className="w-full h-full bg-black/80 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h4 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h4>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Glow */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`} />
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gold/50 to-gold/20 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-serif font-light text-center mb-12 text-white"
          >
            Ventajas de comprar con nosotros
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-gold" />
                </div>
                
                <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{benefit.description}</p>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-xs text-gold font-medium">
                  <CheckCircle className="w-3 h-3" />
                  {benefit.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-3xl p-8 border border-white/10 backdrop-blur-sm mb-16"
        >
          <h3 className="text-2xl font-serif font-light text-center mb-8">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Métodos de Pago Seguros
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 group-hover:border-gold/30 transition-all duration-300">
                  <h4 className="text-white font-semibold mb-3">{method.name}</h4>
                  <div className="space-y-2">
                    {method.logos.map((logo) => (
                      <div key={logo} className="px-3 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-300">
                        {logo}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
              <Shield className="w-4 h-4" />
              Encriptación SSL 256-bit • Certificado de seguridad bancaria
            </div>
          </div>
        </motion.div>

        {/* Delivery Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gold/5 to-transparent p-8 rounded-3xl border border-gold/20 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-serif font-light text-white">
                Cobertura Nacional
              </h3>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              Llegamos a todas las ciudades de Colombia. Envío express en Bogotá, Medellín, 
              Cali, Barranquilla y principales ciudades. Envío nacional 24-48 horas.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {['Bogotá 2-4h', 'Medellín 24h', 'Cali 24h', 'Nacional 48h'].map((city, index) => (
                <motion.div
                  key={city}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 px-3 py-2 bg-gold/10 border border-gold/20 rounded-lg text-gold text-sm font-medium"
                >
                  <Clock className="w-3 h-3" />
                  {city}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}