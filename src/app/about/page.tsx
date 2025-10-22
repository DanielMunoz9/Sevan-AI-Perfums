'use client';

import { motion } from 'framer-motion';
import { Heart, Award, Sparkles, Users, Clock, Star, Shield, Zap } from 'lucide-react';

const stats = [
  { number: '50K+', label: 'Clientes Satisfechos', icon: Users },
  { number: '300+', label: 'Fragancias Premium', icon: Sparkles },
  { number: '5+', label: 'Años de Experiencia', icon: Clock },
  { number: '98%', label: 'Satisfacción Cliente', icon: Star }
];

const values = [
  {
    icon: Award,
    title: 'Excelencia Premium',
    description: 'Solo trabajamos con las mejores fragancias inspiradas en marcas de lujo reconocidas mundialmente.'
  },
  {
    icon: Heart,
    title: 'Pasión por el Perfume',
    description: 'Cada fragancia es seleccionada con amor y cuidado para ofrecer experiencias olfativas únicas.'
  },
  {
    icon: Shield,
    title: 'Garantía Total',
    description: 'Ofrecemos 30 días de garantía en todos nuestros productos para tu completa tranquilidad.'
  },
  {
    icon: Zap,
    title: 'Entrega Rápida',
    description: 'Envíos express a todo Colombia. Tu fragancia perfecta llegará en tiempo récord.'
  }
];

const team = [
  {
    name: 'Laura Castaño',
    role: 'Especialista en Fragancias & Asesora Principal',
    image: '/images/team/laura.jpg',
    description: 'Experta en fragancias con certificación internacional en análisis y composición olfativa. Apasionada por ayudar a cada cliente a encontrar su fragancia perfecta.'
  },
  {
    name: 'Sebastian Enciso',
    role: 'Asesor Senior en Fragancias',
    image: '/images/team/sebastian.jpg',
    description: 'Especialista en tendencias de perfumería mundial con más de 6 años de experiencia. Su conocimiento profundo garantiza la mejor asesoría personalizada.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900/95 to-black pt-20">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-full px-6 py-3 mb-8">
              <Heart className="w-4 h-4 text-gold animate-pulse" />
              <span className="text-gold-soft text-sm font-semibold tracking-wide">
                SOBRE NOSOTROS
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-light mb-8">
              <span className="bg-gradient-to-r from-gold-deep/90 via-gold/95 to-gold-light/90 bg-clip-text text-transparent">
                La Pasión por la
              </span>
              <br />
              <span className="text-white">Perfección Olfativa</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-12">
              En SEVÁN PERFUM, no solo vendemos fragancias; creamos experiencias sensoriales 
              únicas que despiertan emociones y conectan con tu esencia más profunda.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gold mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                Nuestra Historia
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Todo comenzó con una simple obsesión: hacer que las fragancias de lujo 
                  fueran accesibles para todos los colombianos que buscan calidad excepcional 
                  sin comprometer su presupuesto.
                </p>
                
                <p className="leading-relaxed">
                  Fundada en 2019, SEVÁN PERFUM nació del sueño de democratizar el mundo 
                  de los perfumes premium. Nuestro equipo especializado, liderado por 
                  Laura Castaño y Sebastian Enciso, decidió traer las mejores experiencias 
                  olfativas internacionales a Colombia.
                </p>
                
                <p className="leading-relaxed">
                  Hoy, somos la marca líder en fragancias inspiradas en perfumes de lujo, 
                  con más de 50,000 clientes satisfechos que confían en nuestra calidad 
                  y dedicación.
                </p>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl border border-gold/20">
                <blockquote className="text-gold italic text-lg">
                  &ldquo;Creemos que cada persona merece sentirse especial con una fragancia 
                  que refleje su personalidad única.&rdquo;
                </blockquote>
                <cite className="text-gray-400 text-sm mt-2 block">- Laura Castaño & Sebastian Enciso, Equipo SEVÁN PERFUM</cite>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-gold/20 to-gold/5 rounded-3xl border border-gold/20 p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Sparkles className="w-16 h-16 text-gold mx-auto" />
                  <h3 className="text-2xl font-serif text-white">Misión</h3>
                  <p className="text-gray-300">
                    Ofrecer fragancias premium inspiradas en las mejores marcas del mundo, 
                    con calidad excepcional y precios accesibles para todos los colombianos.
                  </p>
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-gold to-gold-deep rounded-full flex items-center justify-center"
              >
                <Heart className="w-8 h-8 text-black" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-gray-900/50 to-black/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Los principios que guían cada decisión que tomamos y cada producto que ofrecemos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl border border-white/10 backdrop-blur-sm p-6 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expertos apasionados dedicados a ofrecerte la mejor experiencia en fragancias.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl border border-white/10 backdrop-blur-sm p-6 text-center group"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-12 h-12 text-gold" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-gold text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              ¿Listo para encontrar tu fragancia perfecta?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Únete a miles de colombianos que ya encontraron su aroma ideal con SEVÁN PERFUM.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/catalog"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gold-deep to-gold text-black font-semibold px-8 py-3 rounded-xl hover:from-gold hover:to-gold-soft transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Ver Catálogo
              </motion.a>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gold text-gold font-semibold px-8 py-3 rounded-xl hover:bg-gold hover:text-black transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Contáctanos
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}