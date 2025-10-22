'use client';

import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  Truck,
  Shield,
  Award,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Ubicación',
    content: 'Bogotá, Colombia',
    subtitle: 'Atención personalizada'
  },
  {
    icon: Phone,
    title: 'Contacto',
    content: '+57 319 360-5666',
    subtitle: 'Laura Castaño - Asesora'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'sebastian@sevanperfum.com',
    subtitle: 'Sebastian Enciso - Asesor'
  },
  {
    icon: Clock,
    title: 'Disponibilidad',
    content: 'Lun - Sáb: 9:00 AM - 7:00 PM',
    subtitle: 'Consultas y pedidos'
  }
];

const features = [
  {
    icon: Truck,
    title: 'Envío Express',
    description: '2-4 horas en Bogotá, 24-48h nacional',
    color: 'text-blue-400'
  },
  {
    icon: Shield,
    title: 'Garantía Total',
    description: '100% satisfacción o devuelves el dinero',
    color: 'text-green-400'
  },
  {
    icon: Award,
    title: 'Calidad Premium',
    description: 'Formulaciones exclusivas con 18% concentración',
    color: 'text-purple-400'
  },
  {
    icon: Star,
    title: 'Servicio 5 Estrellas',
    description: 'Asesoría personalizada de expertos en fragancias',
    color: 'text-gold'
  }
];

export default function ContactSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900/95 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(59,130,246,0.05)_0%,transparent_50%)]" />
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-full px-6 py-3 mb-8"
          >
            <Send className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-gold-soft text-sm font-semibold tracking-wide">
              CONECTA CON NOSOTROS
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-serif font-light mb-6">
            <span className="bg-gradient-to-r from-gold-deep/90 via-gold/95 to-gold-light/90 bg-clip-text text-transparent">
              Contacto & Soporte
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para asesorarte en tu búsqueda de la 
            <span className="text-gold font-medium"> fragancia perfecta</span>. 
            Contáctanos y recibe atención personalizada.
          </p>
        </motion.div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:border-gold/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{info.title}</h3>
                  <p className="text-xs text-gray-400">{info.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-300 font-medium">{info.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-3xl p-8 border border-white/10 backdrop-blur-sm mb-16"
        >
          <h3 className="text-2xl font-serif font-light text-center mb-8">
            <span className="bg-gradient-to-r from-gold-deep/90 via-gold/95 to-gold-light/90 bg-clip-text text-transparent">
              ¿Por qué elegir SEVÁN PERFUM?
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main CTA - WhatsApp Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-500/10 via-green-600/5 to-transparent p-8 rounded-3xl border border-green-500/20 backdrop-blur-sm">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-serif font-light text-white mb-4">
                ¿Necesitas asesoría personalizada?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                <strong className="text-gold">Laura Castaño</strong> y <strong className="text-gold">Sebastian Enciso</strong>, nuestros expertos en fragancias, están listos para ayudarte a encontrar tu aroma perfecto. 
                Contáctalos directamente por WhatsApp y recibe atención personalizada inmediata.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="https://wa.me/573193605666?text=Hola%20Laura,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20las%20fragancias%20de%20SEV%C3%81N%20PERFUM.%20%C2%BFPodr%C3%ADas%20asesorarme%20para%20encontrar%20mi%20fragancia%20perfecta?"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 text-lg hover:from-green-700 hover:to-green-800 shadow-lg">
                    <MessageCircle className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                    Chatear con Nuestros Asesores - WhatsApp
                  </Button>
                </motion.a>
                
                <span className="text-gray-400 text-sm">
                  Respuesta inmediata • Lun-Sáb 9AM-7PM
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}