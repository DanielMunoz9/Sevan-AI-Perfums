'use client';

import { motion } from 'framer-motion';
import { Star, Sparkles, Package, Award, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const collections = [
  {
    id: 'bestsellers',
    name: 'TOP VENTAS',
    icon: Star,
    description: 'Las fragancias más solicitadas del momento',
    count: 28,
    gradient: 'from-gold-deep via-gold to-gold-light',
    bgGradient: 'from-gold/10 to-gold/5'
  },
  {
    id: 'kit-emprendedor',
    name: 'KIT EMPRENDEDOR',
    icon: Package,
    description: 'Paquetes especiales para iniciar tu negocio de perfumes',
    count: 12,
    gradient: 'from-gray-400 via-gray-300 to-gray-400',
    bgGradient: 'from-gray-800/20 to-gray-900/10'
  }
];

export default function CollectionsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900/95 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.08)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* VIDEO HERO - MEJORADO */}
        <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.8}} viewport={{once: true}} className="mb-24">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight px-4">
                <span className="bg-gradient-to-r from-gold-deep via-gold to-gold-light bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  Te Contamos Nuestra Historia
                </span>
              </h2>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold"></div>
                <Sparkles className="w-6 h-6 text-gold animate-pulse" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold"></div>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wider">Más de 5 años creando experiencias únicas</p>
              <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mt-4 px-6">
                Desde nuestros inicios, nos hemos dedicado a seleccionar las fragancias más exquisitas del mundo, 
                brindándote elegancia y distinción en cada aroma. Somos tu destino de lujo para perfumes exclusivos.
              </p>
            </motion.div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Glow Effect más suave */}
            <div className="absolute -inset-6 bg-gradient-radial from-gold/30 via-gold/10 to-transparent rounded-[4rem] blur-3xl opacity-50 animate-pulse-slow" />
            
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 border border-gold/40 backdrop-blur-xl shadow-[0_0_80px_rgba(212,175,55,0.25)]">
              <div className="relative z-10 p-6 md:p-10">
                {/* Video con borde dorado suave */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gold/10 via-black to-gold/5 border-2 border-gold/30 shadow-[inset_0_0_60px_rgba(212,175,55,0.1)]">
                  <video
                    className="w-full h-full object-cover"
                    src="https://sevan-video.b-cdn.net/videodefinitivosevaaan.mp4"
                    playsInline
                    autoPlay
                    muted
                    loop
                    preload="auto"
                  />
                  {/* Overlay sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>
                </div>

                {/* Stats Cards - Mejorados */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 rounded-2xl border border-gold/40 shadow-lg shadow-gold/10 backdrop-blur-sm"
                  >
                    <Package className="w-10 h-10 text-gold mx-auto mb-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    <p className="text-4xl font-bold bg-gradient-to-br from-gold to-gold-light bg-clip-text text-transparent mb-1">213+</p>
                    <p className="text-xs text-gray-300 font-medium tracking-wide">Fragancias Exclusivas</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-2xl border border-gray-700/60 shadow-lg backdrop-blur-sm"
                  >
                    <Users className="w-10 h-10 text-gray-200 mx-auto mb-3 drop-shadow-lg" />
                    <p className="text-4xl font-bold text-white mb-1">15k+</p>
                    <p className="text-xs text-gray-400 font-medium tracking-wide">Clientes Satisfechos</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 bg-gradient-to-br from-gold/20 via-yellow-600/15 to-gold/10 rounded-2xl border border-gold/40 shadow-lg shadow-gold/10 backdrop-blur-sm"
                  >
                    <Award className="w-10 h-10 text-gold mx-auto mb-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    <p className="text-4xl font-bold bg-gradient-to-br from-gold to-gold-light bg-clip-text text-transparent mb-1">5★</p>
                    <p className="text-xs text-gray-300 font-medium tracking-wide">Calificación Promedio</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 bg-gradient-to-br from-gray-800/60 to-black/40 rounded-2xl border border-gray-700/60 shadow-lg backdrop-blur-sm"
                  >
                    <TrendingUp className="w-10 h-10 text-gray-200 mx-auto mb-3 drop-shadow-lg" />
                    <p className="text-4xl font-bold text-white mb-1">98%</p>
                    <p className="text-xs text-gray-400 font-medium tracking-wide">Tasa de Satisfacción</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* COLECCIONES */}
        <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.8}} viewport={{once: true}} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            <span className="bg-gradient-to-r from-gold-deep via-gold to-gold-light bg-clip-text text-transparent">Nuestras</span>
            <span className="block text-white mt-2">Colecciones</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {collections.map((collection, index) => (
            <motion.div key={collection.id} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{delay: index * 0.1, duration: 0.6}} viewport={{once: true}} className="group relative">
              <Link href={`/products?collection=${collection.id}`}>
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${collection.bgGradient} border border-white/5 p-8 h-full cursor-pointer hover:scale-105 transition-all duration-500`}>
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${collection.gradient} p-0.5 relative`}>
                      <div className="w-full h-full bg-black/60 rounded-2xl flex items-center justify-center">
                        <collection.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${collection.gradient} bg-clip-text text-transparent`}>{collection.name}</h3>
                    <p className="text-gray-300 text-sm mb-6">{collection.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-white">{collection.count}</span>
                      <span className="text-xs text-gray-400">Fragancias</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.8}} viewport={{once: true}} className="text-center">
          <Link href="/products">
            <button className="bg-gradient-to-r from-gold-deep to-gold text-black font-bold px-12 py-4 rounded-xl text-lg shadow-lg hover:scale-105 transition-all">
              <span className="flex items-center gap-3">
                <Star className="w-5 h-5" />
                Ver Toda la Colección
                <Sparkles className="w-5 h-5" />
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
