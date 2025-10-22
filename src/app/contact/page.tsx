'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, MessageCircle, Music, Star } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/573193605666?text=Hola%20Laura,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20las%20fragancias%20de%20SEV%C3%81N%20PERFUM.%20%C2%BFPodr%C3%ADas%20asesorarme%20para%20encontrar%20mi%20fragancia%20perfecta?',
      color: 'text-green-400',
      description: '+57 319 360-5666 (Laura)'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/sevan__nnn?igsh=MW9xNHphYnNkcjVydA%3D%3D&utm_source=qr',
      color: 'text-pink-400',
      description: '@sevan__nnn'
    },
    {
      name: 'TikTok',
      icon: Music,
      url: 'https://www.tiktok.com/@sevan___nnn?is_from_webapp=1&sender_device=pc',
      color: 'text-purple-400',
      description: '@sevan___nnn'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/share/v/1H4cXp7K4a/',
      color: 'text-blue-400',
      description: 'SEVÁN PERFUM'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900/95 to-black pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-full px-6 py-3 mb-8">
            <Mail className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-gold-soft text-sm font-semibold tracking-wide">
              CONTACTO
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-light mb-6">
            <span className="bg-gradient-to-r from-gold-deep/90 via-gold/95 to-gold-light/90 bg-clip-text text-transparent">
              Hablemos
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos aquí para ayudarte a encontrar tu fragancia perfecta. 
            Contáctanos y recibe asesoría personalizada.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl border border-white/10 backdrop-blur-sm p-8"
          >
            <h2 className="text-2xl font-serif text-white mb-6">Envíanos un mensaje</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                    placeholder="+57 300 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Asunto
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="asesoria">Asesoría de fragancias</option>
                  <option value="pedido">Consulta sobre pedido</option>
                  <option value="producto">Información de producto</option>
                  <option value="envio">Consulta de envío</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all resize-none"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gold-deep to-gold text-black font-semibold py-3 rounded-xl hover:from-gold hover:to-gold-soft transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl border border-white/10 backdrop-blur-sm p-6">
              <h3 className="text-xl font-serif text-white mb-6">Contacto Directo</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">WhatsApp - Laura Castaño</h4>
                    <p className="text-gray-400">+57 319 360-5666</p>
                    <p className="text-green-400 text-sm">Asesora especializada • Respuesta inmediata</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email</h4>
                    <p className="text-gray-400">contacto@sevanperfum.com</p>
                    <p className="text-gold text-sm">Respuesta en 24h</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Horario de Atención</h4>
                    <p className="text-gray-400">Lun - Vie: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-400">Sáb: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl border border-white/10 backdrop-blur-sm p-6">
              <h3 className="text-xl font-serif text-white mb-6">Síguenos</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="block p-4 bg-black/30 rounded-xl border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <social.icon className={`w-6 h-6 ${social.color}`} />
                      <div>
                        <h4 className="text-white font-medium text-sm">{social.name}</h4>
                        <p className="text-gray-400 text-xs">{social.description}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* FAQ Quick */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl border border-white/10 backdrop-blur-sm p-6">
              <h3 className="text-xl font-serif text-white mb-4">Preguntas Frecuentes</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-gold font-medium">¿Cuál es el tiempo de entrega?</h4>
                  <p className="text-gray-400">2-5 días hábiles a nivel nacional</p>
                </div>
                <div>
                  <h4 className="text-gold font-medium">¿Tienen garantía?</h4>
                  <p className="text-gray-400">Sí, 30 días de garantía total</p>
                </div>
                <div>
                  <h4 className="text-gold font-medium">¿Envío gratis?</h4>
                  <p className="text-gray-400">Gratis en compras mayores a $150.000</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}