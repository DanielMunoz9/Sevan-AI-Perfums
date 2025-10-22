'use client';

import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    location: 'Bogotá',
    rating: 5,
    text: 'Increíble calidad y duración. El aroma de "Elegancia Nocturna" es exactamente lo que buscaba. Definitivamente volveré a comprar.',
    product: 'Elegancia Nocturna',
    avatar: '/images/avatars/maria.jpg'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    location: 'Medellín',
    rating: 5,
    text: 'Excelente servicio y producto de primera calidad. "Caballero Imperial" se ha convertido en mi fragancia favorita para el trabajo.',
    product: 'Caballero Imperial',
    avatar: '/images/avatars/carlos.jpg'
  },
  {
    id: 3,
    name: 'Ana Sofía Torres',
    location: 'Cali',
    rating: 5,
    text: 'La atención al cliente es excepcional y los perfumes duran todo el día. Recomiendo SEVÁN PERFUM al 100%.',
    product: 'Pasión Divina',
    avatar: '/images/avatars/ana.jpg'
  },
  {
    id: 4,
    name: 'Diego Morales',
    location: 'Barranquilla',
    rating: 5,
    text: 'Precio increíble para la calidad que ofrecen. "Fuerza Magnética" recibe cumplidos constantemente.',
    product: 'Fuerza Magnética',
    avatar: '/images/avatars/diego.jpg'
  },
  {
    id: 5,
    name: 'Valentina Cruz',
    location: 'Cartagena',
    rating: 5,
    text: 'El envío fue rapidísimo y el empaque muy elegante. La fragancia superó mis expectativas.',
    product: 'Elegancia Nocturna',
    avatar: '/images/avatars/valentina.jpg'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-gold-soft text-sm font-medium">Testimonios</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif text-gold-soft mb-6">
            Lo Que Dicen Nuestros Clientes
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Miles de clientes satisfechos han encontrado en SEVÁN PERFUM 
            la fragancia perfecta que los representa.
          </p>
        </motion.div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-2xl px-8 py-6 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-gold fill-gold" />
              ))}
            </div>
            <div className="border-l border-gold/30 pl-4">
              <div className="text-2xl font-bold text-gold">4.8/5</div>
              <div className="text-sm text-gray-400">1,247 reseñas</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-gold/10 border border-gold/30 rounded-full text-gold hover:bg-gold hover:text-black transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-gold w-8' 
                      : 'bg-gold/30 hover:bg-gold/50'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 bg-gold/10 border border-gold/30 rounded-full text-gold hover:bg-gold hover:text-black transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] 
                  border border-gold/20 rounded-2xl backdrop-blur-sm
                  ${index === 1 ? 'transform scale-105 border-gold/40' : ''}
                  hover:border-gold/40 transition-all duration-300
                `}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-12 h-12 text-gold" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Product */}
                <div className="mb-4">
                  <span className="text-sm text-gold-soft bg-gold/10 px-3 py-1 rounded-full">
                    {testimonial.product}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                    <span className="text-gold font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gold-soft">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gold/20"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">5000+</div>
            <div className="text-sm text-gray-400">Clientes Satisfechos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">98%</div>
            <div className="text-sm text-gray-400">Tasa de Satisfacción</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">24h</div>
            <div className="text-sm text-gray-400">Tiempo de Respuesta</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">100%</div>
            <div className="text-sm text-gray-400">Garantía de Calidad</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif text-gold-soft mb-4">
              ¿Listo para Encontrar Tu Fragancia Perfecta?
            </h3>
            <p className="text-gray-300 mb-8">
              Únete a miles de clientes satisfechos que ya han encontrado 
              su aroma signature con SEVÁN PERFUM.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}