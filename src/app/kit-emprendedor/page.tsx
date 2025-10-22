'use client';

import { motion } from 'framer-motion';
import { Package, TrendingUp, DollarSign, Users, CheckCircle, MessageCircle, Sparkles, ArrowRight, Gift, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const kitHeroImage = '/images/kitemprendedor.jpg';

export default function KitEmprendedorPage() {
  const beneficios = [
    {
      icon: DollarSign,
      title: 'Inversión Inteligente',
      description: 'Solo $300.000 COP por 3 perfumes de alta gama',
      highlight: '$70.000 por perfume'
    },
    {
      icon: TrendingUp,
      title: 'Duplica tus Ganancias',
      description: 'Potencial de venta de hasta $600.000 COP',
      highlight: '100% de rentabilidad'
    },
    {
      icon: Users,
      title: 'Asesoría Personalizada',
      description: 'Atención directa de nuestros expertos',
      highlight: 'Sin costo adicional'
    },
    {
      icon: Gift,
      title: 'Flexibilidad Total',
      description: 'Elige y cambia los perfumes según tu mercado',
      highlight: 'Personalizable'
    }
  ];

  const caracteristicas = [
    'Perfumes inspirados en marcas de lujo reconocidas mundialmente',
    'Fragancias de larga duración (8-12 horas)',
    'Presentación elegante y profesional',
    'Empaques premium listos para regalo',
    'Certificados de calidad',
    'Material de marketing incluido',
    'Acceso a catálogo digital actualizado',
    'Capacitación sobre cada fragancia'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-[125px]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30 rounded-full px-6 py-2 mb-6">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-gold font-semibold text-sm tracking-wide">OPORTUNIDAD DE NEGOCIO</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gold-deep via-gold to-gold-light bg-clip-text text-transparent">
                  KIT EMPRENDEDOR
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Lleva 3 perfumes premium por <span className="text-gold font-bold">$300.000 COP</span> y duplica tu ganancia
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/40 rounded-2xl px-6 py-4">
                  <div className="text-3xl font-bold text-gold mb-1">$70.000</div>
                  <div className="text-sm text-gray-400">Por perfume</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/40 rounded-2xl px-6 py-4">
                  <div className="text-3xl font-bold text-green-400 mb-1">+100%</div>
                  <div className="text-sm text-gray-400">Rentabilidad</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/573193605666?text=Hola%20Laura,%20me%20interesa%20el%20Kit%20Emprendedor%20de%20SEV%C3%81N%20PERFUM.%20%C2%BFPodr%C3%ADas%20darme%20m%C3%A1s%20informaci%C3%B3n%20sobre%20c%C3%B3mo%20empezar%20mi%20negocio?"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button 
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:shadow-2xl hover:shadow-yellow-500/50 font-bold text-base px-8 py-6 h-auto rounded-xl group inline-flex items-center"
                  >
                    Hablar con Asesor
                    <MessageCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  </button>
                </a>
                <Link href="/products?collection=kit-emprendedor">
                  <button 
                    className="border-2 border-yellow-500/50 text-yellow-600 hover:bg-yellow-500/10 font-semibold text-base px-8 py-6 h-auto rounded-xl group inline-flex items-center"
                  >
                    Ver Catálogo
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Imagen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 via-gold/10 to-transparent rounded-3xl blur-3xl opacity-60 animate-pulse-slow" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl shadow-gold/20 bg-black/40 w-full max-w-[14rem] sm:max-w-[16.5rem] lg:max-w-[18rem] mx-auto">
                <Image
                  src="/images/kitemprendedor.jpg"
                  alt="Kit Emprendedor SEVÁN PERFUM"
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  onError={(event) => {
                    event.currentTarget.src = '/images/default-perfume.jpg';
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold mb-6">
              <span className="bg-gradient-to-r from-gold-deep via-gold to-gold-light bg-clip-text text-transparent">
                Beneficios de Emprender con Perfumes
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((beneficio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-6 hover:border-gold/50 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold/30 to-gold/10 rounded-2xl flex items-center justify-center mb-6">
                  <beneficio.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{beneficio.title}</h3>
                <p className="text-gray-400 mb-4">{beneficio.description}</p>
                <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-2">
                  <span className="text-gold font-bold text-sm">{beneficio.highlight}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-serif font-bold mb-6">
                <span className="bg-gradient-to-r from-gold-deep via-gold to-gold-light bg-clip-text text-transparent">
                  ¿Qué Incluye el Kit?
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {caracteristicas.map((caracteristica, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-r from-gray-900/80 to-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-gold/50 transition-all"
                >
                  <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{caracteristica}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personalización */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border-2 border-gold/40 rounded-3xl p-12">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-10 h-10 text-gold" />
                <h3 className="text-3xl font-serif font-bold text-white">Personalización Total</h3>
              </div>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                <span className="text-gold font-bold">¡Importante!</span> Puedes cambiar y seleccionar los perfumes de tu kit según las preferencias de tus clientes. 
                Los perfumes mostrados en la imagen son referenciales. <span className="text-gold font-semibold">Comunícate con nuestro asesor</span> para elegir 
                las fragancias que mejor se adapten a tu mercado objetivo.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/573193605666?text=Hola%20Laura,%20me%20interesa%20el%20Kit%20Emprendedor%20y%20necesito%20asesor%C3%ADa%20para%20seleccionar%20las%20mejores%20fragancias.%20%C2%BFPuedes%20ayudarme?"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button 
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:shadow-xl hover:shadow-yellow-500/50 font-bold px-8 py-3 rounded-xl inline-flex items-center"
                  >
                    Asesoría Gratuita
                    <MessageCircle className="w-5 h-5 ml-2" />
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-serif font-bold mb-8">
              <span className="bg-gradient-to-r from-gold-deep via-gold to-gold-light bg-clip-text text-transparent">
                ¿Listo para Emprender?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Únete a nuestra comunidad de emprendedores exitosos
            </p>
            <a
              href="https://wa.me/573193605666?text=Hola%20Laura,%20estoy%20listo%20para%20emprender%20con%20el%20Kit%20de%20SEV%C3%81N%20PERFUM.%20%C2%BFPuedes%20ayudarme%20a%20dar%20el%20primer%20paso?"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button 
                className="bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-400 text-black hover:shadow-2xl hover:shadow-yellow-500/60 font-bold text-xl px-12 py-8 h-auto rounded-2xl inline-flex items-center"
              >
                Contactar Asesor Ahora
                <MessageCircle className="w-6 h-6 ml-3" />
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

