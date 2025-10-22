'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Leaf, Shield, Sparkles, Star, Instagram, Facebook, MessageCircle, Music, Users, Zap } from 'lucide-react';

const socialLinks = [
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/sevan__nnn?igsh=MW9xNHphYnNkcjVydA%3D%3D&utm_source=qr',
    handle: '@sevan__nnn',
    followers: '45.2K',
    color: 'from-pink-500 to-purple-600',
    description: 'Contenido exclusivo y looks de fragancias'
  },
  {
    name: 'TikTok',
    icon: Music,
    url: 'https://www.tiktok.com/@sevan___nnn?is_from_webapp=1&sender_device=pc',
    handle: '@sevan___nnn',
    followers: '128K',
    color: 'from-black to-red-500',
    description: 'Videos virales y reseñas de fragancias'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/share/v/1H4cXp7K4a/',
    handle: 'SEVÁN PERFUM',
    followers: '32.8K',
    color: 'from-blue-600 to-blue-700',
    description: 'Noticias, promociones y comunidad'
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: 'https://wa.me/573193605666?text=Hola%20Laura,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20las%20fragancias%20de%20SEV%C3%81N%20PERFUM.%20%C2%BFPodr%C3%ADas%20asesorarme%20para%20encontrar%20mi%20fragancia%20perfecta?',
    handle: '+57 319 360-5666',
    followers: 'Laura Castaño',
    color: 'from-green-500 to-green-600',
    description: 'Asesoría personalizada con Laura'
  }
];

export default function AboutSection() {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      title: 'Calidad Premium',
      description: 'Cada fragancia es creada con los mejores ingredientes y una concentración del 18% para una duración excepcional.'
    },
    {
      icon: <Heart className="w-8 h-8 text-gold" />,
      title: 'Inspiración Única',
      description: 'Nuestras fragancias están inspiradas en los perfumes más icónicos del mundo, adaptados con nuestra propia interpretación.'
    },
    {
      icon: <Leaf className="w-8 h-8 text-gold" />,
      title: 'Ingredientes Naturales',
      description: 'Utilizamos esencias naturales y sintéticas de la más alta calidad para crear aromas únicos y duraderos.'
    },
    {
      icon: <Shield className="w-8 h-8 text-gold" />,
      title: 'Garantía Total',
      description: 'Ofrecemos garantía completa en todos nuestros productos. Si no quedas satisfecho, te devolvemos tu dinero.'
    }
  ];

  const stats = [
    { number: '213', label: 'Fragancias Únicas', icon: Sparkles },
    { number: '18%', label: 'Concentración', icon: Zap },
    { number: '15K+', label: 'Clientes Felices', icon: Users },
    { number: '4.9', label: 'Calificación', icon: Star }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900/95 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(147,51,234,0.05)_0%,transparent_50%)]" />
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
            <Heart className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-gold-soft text-sm font-semibold tracking-wide">
              ACERCA DE NOSOTROS
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-serif font-light mb-6">
            <span className="bg-gradient-to-r from-gold-deep/90 via-gold/95 to-gold-light/90 bg-clip-text text-transparent">
              Nuestra Historia
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Creamos fragancias premium inspiradas en los mejores perfumes del mundo, 
            con tecnología de <span className="text-gold font-medium">18% de concentración</span> y 
            asesoría personalizada con <span className="text-purple-400 font-medium">inteligencia artificial</span>.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:border-gold/30 transition-all duration-300 group-hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-3xl font-bold text-gold mb-2">{stat.number}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:border-gold/30 transition-all duration-300 group-hover:-translate-y-2">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-serif font-light mb-8">
            <span className="bg-gradient-to-r from-gold-deep/90 via-gold/95 to-gold-light/90 bg-clip-text text-transparent">
              Conecta con Nosotros
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl p-6 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-white/20 group-hover:shadow-2xl overflow-hidden">
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                    
                    {/* Icon */}
                    <div className="relative mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} p-0.5 mx-auto relative`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <social.icon className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <h4 className="text-lg font-bold text-white mb-1">
                        {social.name}
                      </h4>
                      
                      <p className={`text-sm font-medium mb-2 bg-gradient-to-r ${social.color} bg-clip-text text-transparent`}>
                        {social.handle}
                      </p>
                      
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                          <Star className="w-2 h-2 text-gold" />
                          {social.followers}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {social.description}
                      </p>
                    </div>

                    {/* Bottom Glow */}
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`} />
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gold/5 to-transparent p-8 rounded-3xl border border-gold/20 backdrop-blur-sm">
            <h3 className="text-2xl font-serif font-light text-white mb-4">
              ¿Listo para descubrir tu fragancia perfecta?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Únete a miles de personas que han encontrado su aroma signature con SEVÁN PERFUM.
            </p>
            <motion.a
              href="/products"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-deep to-gold text-black font-semibold px-8 py-3 rounded-2xl hover:from-gold hover:to-gold-soft transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Explorar Catálogo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}