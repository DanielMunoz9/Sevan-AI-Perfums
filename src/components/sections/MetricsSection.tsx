'use client';

import { motion } from 'framer-motion';
import { Star, Users, Award, Sparkles, Zap, Crown } from 'lucide-react';

const metrics = [
  {
    number: '213',
    label: 'Fragancias Únicas',
    sublabel: 'Inspiraciones exclusivas',
    icon: Crown,
    gradient: 'from-amber-400 to-yellow-500'
  },
  {
    number: '18%',
    label: 'Concentración',
    sublabel: 'Fórmula premium',
    icon: Zap,
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    number: '4.9',
    label: 'Calificación',
    sublabel: 'De 5 estrellas',
    icon: Star,
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    number: '15K+',
    label: 'Clientes Felices',
    sublabel: 'En toda Colombia',
    icon: Users,
    gradient: 'from-emerald-400 to-green-500'
  },
  {
    number: '2-4H',
    label: 'Entrega Express',
    sublabel: 'Bogotá y principales ciudades',
    icon: Award,
    gradient: 'from-rose-400 to-pink-500'
  },
  {
    number: '100%',
    label: 'Garantía',
    sublabel: 'Satisfacción total',
    icon: Sparkles,
    gradient: 'from-indigo-400 to-purple-500'
  }
];

export default function MetricsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/95 via-black to-gray-900/95 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.02)_50%,transparent_70%)]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/40 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + Math.sin(i) * 30}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            }}
          />
        ))}
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
            <Award className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-gold-soft text-sm font-semibold tracking-wide">
              NÚMEROS QUE NOS RESPALDAN
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            <span className="bg-gradient-to-r from-gold-deep via-gold to-gold-light bg-clip-text text-transparent">
              Excelencia
            </span>
            <span className="block text-white mt-2">Comprobada</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cifras que demuestran nuestro compromiso con la 
            <span className="text-gold font-semibold"> calidad excepcional</span> y la 
            <span className="text-gold font-semibold"> satisfacción total</span> de nuestros clientes.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-3xl p-6 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:scale-105 hover:-translate-y-2">
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Icon */}
                <div className="relative mb-4">
                  <motion.div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${metric.gradient} p-0.5 mx-auto relative`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <div className="w-full h-full bg-black/70 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Floating Ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl border-2 bg-gradient-to-r ${metric.gradient} border-transparent bg-clip-border opacity-30`}
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: 'linear'
                    }}
                    style={{ background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent)' }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <motion.h3 
                    className={`text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    {metric.number}
                  </motion.h3>
                  
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {metric.label}
                  </h4>
                  
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {metric.sublabel}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${metric.gradient} opacity-5 rounded-bl-2xl rounded-tr-3xl`} />
                
                {/* Bottom Glow */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r ${metric.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gold/5 to-transparent p-8 rounded-3xl border border-gold/20 backdrop-blur-sm">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              ¿Listo para formar parte de esta historia de éxito?
            </h3>
            <p className="text-gray-300 mb-6">
              Únete a miles de personas que ya han descubierto la excelencia en cada fragancia.
            </p>
            <motion.button
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-premium px-8 py-3 text-lg group"
            >
              <span className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                Explorar Catálogo Premium
                <Crown className="w-5 h-5 group-hover:animate-pulse" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}