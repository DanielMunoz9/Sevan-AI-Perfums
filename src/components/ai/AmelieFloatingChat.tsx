'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Smile, Paperclip, MessageCircle, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AmelieFloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy Amelie, tu asistente especializada en fragancias. Estoy aquí para ayudarte a encontrar la fragancia perfecta que se adapte a tu personalidad y estilo.\n¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [isTyping, setIsTyping] = useState(false); // Estado para indicar si Amelie está escribiendo
  const dragRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const baseOffset = { bottom: 96, right: 24 };

  const floatingFlowers = [
    { x: -46, y: -18, float: 12, delay: 0 },
    { x: 48, y: -10, float: 10, delay: 0.4 },
    { x: -30, y: 42, float: 14, delay: 0.8 },
    { x: 40, y: 36, float: 11, delay: 1.2 }
  ];

  // Emojis populares para fragancias
  const emojisList = ['😍', '💖', '✨', '🌸', '🌹', '💐', '🍃', '🌿', '💫', '💎', '👑', '🥰', '😊', '🤩', '💕', '🌺'];

  const suggestedQuestions = [
    '💖 Análisis de personalidad olfativa',
    '💼 Fragancias para el trabajo',
    '❤️ Perfumes irresistibles',
    '🎨 Cómo combinar fragancias',
    '🔬 Educación olfativa avanzada',
    '💰 Kit Emprendedor SEVAN',
    '⭐ Recomendación personalizada'
  ];

  // Función para conectar con OpenAI
  const generateAmelieResponse = async (userMessage: string) => {
    console.log('🔍 Iniciando generateAmelieResponse con mensaje:', userMessage);
    setIsTyping(true); // Mostrar indicador de escritura
    
    try {
      console.log('📡 Enviando solicitud a /api/chat...');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: `Eres Amelie, una experta en fragancias de lujo con más de 15 años de experiencia. 
          Te especializas en análisis olfativo personalizado, recomendaciones precisas, y educación aromática. 
          Tienes conocimiento profundo sobre 213 fragancias artesanales de la marca SEVAN.
          
          Tu personalidad es:
          - Elegante y sofisticada
          - Apasionada por las fragancias
          - Educativa pero accesible
          - Personalizada en tus recomendaciones
          
          INFORMACIÓN SOBRE KIT EMPRENDEDOR SEVAN:
          El Kit Emprendedor SEVAN es un programa especial para quienes desean emprender en ventas de fragancias:
          
          **Beneficios:**
          • Acceso a 213 fragancias artesanales de lujo
          • Precios mayoristas especiales para revendedores
          • Margen de ganancia de 30-40%
          • Soporte y asesoramiento personalizado
          • Capacitación en olfativa y ventas
          • Materiales de marketing profesionales
          • Comisiones por referidos
          
          **Cómo funciona:**
          1. Contacta con nosotros expresando interés en emprender
          2. Recibe consultoría gratuita sobre tu mercado objetivo
          3. Se te proporciona catálogo de precios mayoristas
          4. Elige fragancias para tu kit inicial (inversión flexible)
          5. Recibes entrenamiento completo en ventas y olfativa
          6. ¡Comienza a vender desde día 1!
          
          **Inversión:**
          • Kit Básico: Desde $500 USD
          • Kit Premium: Desde $1500 USD
          • Kit Profesional: Desde $3000 USD
          
          Si el usuario pregunta por kit emprendedor, ofrecimiento con entusiasmo.
          
          Siempre pregunta por las preferencias del usuario y ofrece análisis detallados.
          Usa emojis relevantes y formato **negritas** para palabras importantes.
          Máximo 200 palabras por respuesta.`
        }),
      });

      console.log('📊 Respuesta del servidor - Status:', response.status, response.statusText);

      if (!response.ok) {
        console.error('❌ Error de respuesta del servidor:', response.status);
        throw new Error(`Error al conectar con Amelie AI: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Datos recibidos de OpenAI:', data);
      
      const aiResponse = data.response || 'Lo siento, tengo dificultades técnicas. ¿Podrías intentar de nuevo?';
      console.log('🤖 Respuesta final de AI:', aiResponse);
      
      setIsTyping(false); // Ocultar indicador
      return aiResponse;
    } catch (error) {
      console.error('❌ Error en generateAmelieResponse:', error);
      console.log('🔄 Usando respuesta de fallback...');
      setIsTyping(false); // Ocultar indicador
      // Fallback a respuestas predefinidas si OpenAI falla
      return generateFallbackResponse(userMessage);
    }
  };

  // Respuestas de respaldo inteligentes
  const generateFallbackResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Respuestas sobre Kit Emprendedor
    if (message.includes('kit emprendedor') || message.includes('emprender') || message.includes('negocio') || message.includes('reseller') || message.includes('reventa')) {
      return '💼 **Kit Emprendedor SEVAN - ¡Tu oportunidad de oro!**\n\n¿Quieres comenzar tu negocio con fragancias de lujo? El Kit Emprendedor SEVAN es perfecto para ti:\n\n**✨ Beneficios:**\n• Acceso a 213 fragancias artesanales\n• Precios mayoristas (30-40% margen)\n• Capacitación en ventas y olfativa\n• Materiales de marketing incluidos\n\n**💰 Inversión:**\n• Kit Básico: $500 USD\n• Kit Premium: $1.500 USD\n• Kit Profesional: $3.000 USD\n\n**📞 ¿Interesado?** Contáctanos hoy y comenzamos tu viaje como emprendedor en fragancias. ¡Soporte 100% personalizado!';
    }
    
    if (message.includes('personalidad olfativa') || message.includes('analiza')) {
      return '🧠 **Análisis de Personalidad Olfativa**\n\nPara crear tu perfil olfativo perfecto, necesito conocerte mejor:\n\n• ¿Prefieres aromas frescos y ligeros o intensos y envolventes?\n• ¿Te gustan las notas florales, frutales, amaderadas o especiadas?\n• ¿Buscas algo para el día, la noche o ambos?\n\nCon esta información podré recomendarte fragancias que realmente conecten con tu esencia.';
    }
    
    if (message.includes('trabajo') || message.includes('profesional')) {
      return '💼 **Fragancias para el Ámbito Profesional**\n\nPara el trabajo recomiendo fragancias:\n\n• **Elegantes pero discretas** - que proyecten profesionalismo\n• **Frescas y limpias** - notas cítricas o acuáticas\n• **Longevidad moderada** - que no sean invasivas\n\n¿Trabajas en oficina, atención al cliente o ambiente más relajado? Esto me ayuda a personalizar mejor la recomendación.';
    }
    
    if (message.includes('irresistible') || message.includes('seducir')) {
      return '❤️ **Fragancias Seductoras**\n\nPara crear magnetismo personal:\n\n• **Notas cálidas** - ámbar, vainilla, sándalo\n• **Toques especiados** - canela, pimienta rosa\n• **Fondo sensual** - almizcle, oud\n\n¿Buscas algo para una ocasión especial o para uso diario? ¿Prefieres elegancia sutil o presencia más intensa?';
    }
    
    if (message.includes('combinar') || message.includes('mezclar')) {
      return '🎨 **Arte de Combinar Fragancias**\n\n**Reglas básicas del layering:**\n\n• Combina familias complementarias (cítrico + floral)\n• Usa fragancias de la misma intensidad\n• Aplica la más ligera primero\n• Evita mezclar más de 2-3 fragancias\n\n¿Tienes fragancias específicas que quieres aprender a combinar?';
    }
    
    if (message.includes('educación') || message.includes('aprender')) {
      return '🔬 **Educación Olfativa Avanzada**\n\n**Estructura de una fragancia:**\n\n• **Notas de salida** - Primeras 15 min (cítricos, hierbas)\n• **Notas de corazón** - 2-4 horas (florales, frutales)\n• **Notas de fondo** - 6+ horas (amaderadas, almizcladas)\n\n**Concentraciones:**\n• Eau de Parfum (15-20%) - Mayor duración\n• Eau de Toilette (5-15%) - Más fresco\n\n¿Qué aspecto específico te interesa profundizar?';
    }
    
    if (message.includes('recomendación') || message.includes('personalizada')) {
      return '⭐ **Recomendación Ultra-Personalizada**\n\nPara crear la recomendación perfecta necesito conocer:\n\n• **Tu estilo personal** - Clásico, moderno, bohemio\n• **Ocasiones de uso** - Diario, especial, trabajo\n• **Preferencias aromáticas** - Dulce, fresco, intenso\n• **Presupuesto** - Para ajustar opciones\n\n¿Podrías contarme sobre estos aspectos?';
    }
    
    // Respuestas personales sobre Amelie
    if (message.includes('quien eres') || message.includes('quién eres') || message.includes('que eres')) {
      return '✨ **Soy Amelie, tu experta en fragancias**\n\nMe especializo en:\n\n• **Análisis olfativo personalizado** - Entiendo tu esencia única\n• **Recomendaciones precisas** - 213 fragancias artesanales en mi repertorio\n• **Educación aromática** - Te enseño el arte de las fragancias\n• **Combinaciones perfectas** - Creo sinergias olfativas únicas\n\nMi misión es encontrar **TU** fragancia perfecta, la que realmente te represente.';
    }
    
    if (message.includes('hola') || message.includes('hi') || message.includes('hello')) {
      return '👋 **¡Hola! Un placer conocerte**\n\nSoy Amelie, y me emociona ayudarte en tu viaje olfativo. \n\n**¿Sabías que?** Cada persona tiene una "huella olfativa" única, como una huella digital aromática. Mi trabajo es descubrir la tuya.\n\n¿Qué te trae por aquí hoy? ¿Buscas:\n• Una fragancia nueva\n• Aprender sobre perfumes\n• Mejorar tu colección actual\n• Algo completamente diferente?';
    }
    
    if (message.includes('como estas') || message.includes('cómo estás')) {
      return '😊 **¡Fantástica, gracias por preguntar!**\n\nEstoy en mi elemento - rodeada de aromas y ayudando a personas como tú a descubrir fragancias increíbles.\n\nHoy he estado analizando las nuevas tendencias olfativas para 2025. ¿Te interesa saber cuáles son las familias aromáticas que están marcando tendencia?\n\n¿Y tú qué tal? ¿Hay alguna fragancia en particular que tengas en mente?';
    }
    
    return '🤔 **Interesante pregunta...**\n\nComo experta en fragancias, siempre busco entender mejor a mis consultantes. \n\nPara poder ayudarte de la mejor manera, me gustaría saber:\n• ¿Qué tipo de fragancias sueles usar?\n• ¿Hay alguna ocasión especial para la que buscas algo?\n• ¿Prefieres aromas sutiles o más intensos?\n\n¡Cuéntame más y te daré recomendaciones súper personalizadas! 🎯';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');

    // Simulación de typing y respuesta con OpenAI
    setTimeout(async () => {
      const response = await generateAmelieResponse(currentInput);
      const amelieMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, amelieMessage]);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const addEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
    setShowEmojis(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `📎 Archivo enviado: ${file.name}`,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fileMessage]);

      setTimeout(() => {
        const response = '📎 **Archivo recibido**\n\n¡Gracias por compartir! He recibido tu archivo. ¿Podrías contarme más sobre qué tipo de información o análisis necesitas sobre fragancias?';
        const amelieMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, amelieMessage]);
      }, 1000);
    }
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index) => {
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = line.split(boldRegex);
      
      return (
        <div key={index} className={index > 0 ? 'mt-2' : ''}>
          {parts.map((part, partIndex) => 
            partIndex % 2 === 1 ? (
              <strong key={partIndex} className="font-bold text-amber-300">
                {part}
              </strong>
            ) : (
              <span key={partIndex}>{part}</span>
            )
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShowTooltip(true), 3000);
    } else {
      setShowTooltip(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Chat Button - AMELIE ELEGANTE CON ANIMACIONES */}
      <motion.div
        ref={dragRef}
        drag
        dragMomentum={false}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        whileDrag={{ scale: 1.1 }}
        animate={{ x: position.x, y: position.y }}
  className="fixed z-50"
  style={{ bottom: `${baseOffset.bottom}px`, right: `${baseOffset.right}px` }}
      >
        {/* Aura dorada exterior */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: isDragging ? 1 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-sky-400/25 via-blue-500/20 to-indigo-500/25 rounded-full blur-xl -z-10"
        />

        <motion.button
          onClick={() => {
            setIsOpen(true);
            setShowTooltip(false);
            setHasNewMessage(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {/* Resplandor exterior animado */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: isDragging ? 1 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Botón principal con tema NEGRO Y DORADO ELEGANTE */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 rounded-full shadow-2xl border-4 border-white/15 flex items-center justify-center overflow-hidden">
            
            {/* Avatar de Amelie - Cara elegante */}
            <motion.div
              animate={{ 
                rotate: isDragging ? [0, 5, -5, 0] : [0, 2, -2, 0],
                scale: isDragging ? [1, 1.1, 1] : [1, 1.05, 1]
              }}
              transition={{ 
                duration: isDragging ? 1 : 3,
                repeat: Infinity 
              }}
              className="relative z-10 w-14 h-14 bg-gradient-to-br from-sky-300/30 via-blue-400/20 to-indigo-500/25 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-sky-200/40"
            >
              {/* Cara de Amelie con Bot elegante */}
              <Bot className="w-8 h-8 text-sky-100 drop-shadow-lg filter brightness-110" />
            </motion.div>

            {/* Partículas doradas elegantes */}
            <motion.div
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0"
            >
              <Sparkles className="absolute top-1 right-3 w-3 h-3 text-sky-200 filter brightness-125" />
              <Sparkles className="absolute bottom-2 left-2 w-2 h-2 text-rose-200 filter brightness-125" />
              <Sparkles className="absolute top-3 left-1 w-2 h-2 text-blue-200 filter brightness-125" />
            </motion.div>

            {/* Resplandor interno dorado */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-2 bg-gradient-to-br from-sky-300/30 via-blue-400/25 to-indigo-500/30 rounded-full blur-sm"
            />

            {/* Indicador de escritura */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulso de notificación dorado */}
            <AnimatePresence>
              {showPulse && hasNewMessage && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 rounded-full"
                />
              )}
            </AnimatePresence>

            {/* Flores flotantes sutiles */}
            <div className="absolute inset-0 pointer-events-none">
              {floatingFlowers.map((flower, index) => (
                <motion.div
                  key={`floating-flower-${index}`}
                  className="absolute"
                  animate={{
                    y: [0, -flower.float, 0],
                    rotate: [0, 6, -6, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: flower.delay,
                    ease: 'easeInOut'
                  }}
                  style={{
                    left: `calc(50% + ${flower.x}px)`,
                    top: `calc(50% + ${flower.y}px)`
                  }}
                >
                  <div className="relative w-6 h-6">
                    {[0, 1, 2, 3].map((petal) => (
                      <span
                        key={petal}
                        className="absolute left-1/2 top-1/2 block w-2.5 h-4 bg-gradient-to-b from-rose-100 to-rose-400 rounded-full"
                        style={{
                          transform: `rotate(${petal * 90}deg) translateY(-9px)` ,
                          transformOrigin: 'center'
                        }}
                      />
                    ))}
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-2 h-2 bg-rose-500 rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Badge de notificación */}
            <AnimatePresence>
              {hasNewMessage && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    !
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tooltip con información de Amelie */}
          <AnimatePresence>
            {showTooltip && !isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.9 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-950/95 via-blue-900/95 to-slate-950/95 text-white px-6 py-4 rounded-2xl shadow-2xl border border-sky-500/30 backdrop-blur-xl z-10 min-w-max"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-4 h-4 text-rose-200" />
                  </motion.div>
                  <div>
                    <span className="font-bold text-xl bg-gradient-to-r from-sky-300 via-blue-200 to-rose-200 bg-clip-text text-transparent drop-shadow-lg">Amelie</span>
                    <p className="text-xs text-sky-300/80 mt-1 font-medium">Experta en Perfumes de Lujo</p>
                  </div>
                </div>
                {/* Flecha elegante acorde */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-blue-900/95" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Chat Modal RESPONSIVE PERFECTO con ESTILO ELEGANTE */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay responsive */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            >
              {/* Modal RESPONSIVE ELEGANTE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[85vh] lg:max-w-4xl bg-gradient-to-br from-gray-950 via-gray-900 to-black rounded-none sm:rounded-2xl shadow-2xl border-0 sm:border border-amber-500/20 overflow-hidden flex flex-col backdrop-blur-lg"
              >
                {/* Header responsive elegante */}
                <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-black py-4 px-4 sm:py-6 sm:px-6 border-b border-amber-500/20 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <motion.div 
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Bot className="w-5 h-5 sm:w-7 sm:h-7 text-black font-bold" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg sm:text-2xl font-serif text-amber-400 font-bold">Amelie</h3>
                        <p className="text-xs sm:text-sm text-amber-300/80 font-medium">En línea • Experta en Fragancias</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Contenido con diseño ELEGANTE */}
                <div className="flex-1 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden flex flex-col">
                  <style jsx global>{`
                    /* ESTILO CHATGPT NEGRO Y DORADO ELEGANTE */
                    .amelie-message-box {
                      background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%) !important;
                      border: 1px solid #d4af37 !important;
                      border-radius: 18px !important;
                      color: #f5f5f5 !important;
                      box-shadow: 0 8px 32px rgba(212, 175, 55, 0.1) !important;
                      padding: 20px 24px !important;
                      position: relative !important;
                      overflow: hidden !important;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
                    }
                    
                    .amelie-message-box::before {
                      content: '' !important;
                      position: absolute !important;
                      top: 0 !important;
                      left: 0 !important;
                      right: 0 !important;
                      height: 3px !important;
                      background: linear-gradient(90deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%) !important;
                    }
                    
                    .amelie-message-text {
                      color: #f8f8f2 !important;
                      font-size: 15px !important;
                      line-height: 1.7 !important;
                      font-weight: 400 !important;
                      margin: 0 !important;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
                    }
                    
                    .amelie-message-text strong {
                      color: #d4af37 !important;
                      font-weight: 700 !important;
                      text-shadow: 0 0 10px rgba(212, 175, 55, 0.3) !important;
                    }
                    
                    .user-message-box {
                      background: linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 100%) !important;
                      border: 1px solid #444444 !important;
                      border-radius: 18px 18px 4px 18px !important;
                      color: #f8f8f2 !important;
                      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
                      padding: 16px 20px !important;
                      margin-left: auto !important;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
                    }
                    
                    .user-message-text {
                      color: #f8f8f2 !important;
                      font-size: 15px !important;
                      line-height: 1.6 !important;
                      font-weight: 400 !important;
                      margin: 0 !important;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
                    }
                    
                    .amelie-suggestion-btn {
                      background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%) !important;
                      border: 1px solid #d4af37 !important;
                      color: #f8f8f2 !important;
                      padding: 14px 18px !important;
                      border-radius: 16px !important;
                      font-size: 14px !important;
                      font-weight: 500 !important;
                      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                      cursor: pointer !important;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
                    }
                    
                    .amelie-suggestion-btn:hover {
                      background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%) !important;
                      color: #000000 !important;
                      border-color: #f4d03f !important;
                      transform: translateY(-2px) !important;
                      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3) !important;
                    }
                    
                    .amelie-input-box {
                      background: linear-gradient(135deg, #1e1e1e 0%, #0f0f0f 100%) !important;
                      border: 2px solid #444444 !important;
                      border-radius: 16px !important;
                      color: #f8f8f2 !important;
                      font-size: 15px !important;
                      padding: 16px 20px !important;
                      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
                    }
                    
                    .amelie-input-box:focus {
                      border-color: #d4af37 !important;
                      box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1), 0 0 20px rgba(212, 175, 55, 0.2) !important;
                      outline: none !important;
                      background: linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 100%) !important;
                    }
                    
                    .amelie-input-box::placeholder {
                      color: #888888 !important;
                      font-weight: 400 !important;
                      font-style: italic !important;
                    }
                    
                    .amelie-send-button {
                      background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%) !important;
                      color: #000000 !important;
                      border: none !important;
                      border-radius: 14px !important;
                      padding: 16px 20px !important;
                      font-weight: 700 !important;
                      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                      cursor: pointer !important;
                      box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3) !important;
                    }
                    
                    .amelie-send-button:hover {
                      background: linear-gradient(135deg, #f4d03f 0%, #d4af37 100%) !important;
                      transform: translateY(-2px) scale(1.05) !important;
                      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4) !important;
                    }
                    
                    .amelie-send-button:disabled {
                      opacity: 0.5 !important;
                      cursor: not-allowed !important;
                      transform: none !important;
                    }
                    
                    /* Scrollbar personalizado ChatGPT style */
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 6px !important;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: #1a1a1a !important;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background: #d4af37 !important;
                      border-radius: 3px !important;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                      background: #f4d03f !important;
                    }
                    
                    /* Responsive adjustments */
                    @media (max-width: 640px) {
                      .amelie-message-box {
                        padding: 16px 18px !important;
                      }
                      .amelie-message-text {
                        font-size: 14px !important;
                      }
                      .user-message-box {
                        padding: 14px 16px !important;
                      }
                      .amelie-suggestion-btn {
                        font-size: 13px !important;
                        padding: 12px 16px !important;
                      }
                      .amelie-input-box {
                        font-size: 16px !important; /* Evita zoom en iOS */
                      }
                    }
                  `}</style>

                  {/* Messages con scroll suave */}
                  <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 custom-scrollbar">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isUser && (
                          <div className="flex items-start space-x-2 sm:space-x-3 max-w-[85%]">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-500/80 to-yellow-600/80 rounded-full flex items-center justify-center flex-shrink-0 border border-amber-400/30">
                              <Bot className="w-4 h-4 text-black font-bold" />
                            </div>
                            <div className="amelie-message-box flex-1">
                              <div className="amelie-message-text">
                                {formatMessage(message.text)}
                              </div>
                              <div className="text-xs text-amber-400/90 mt-3 font-medium">
                                {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        )}

                        {message.isUser && (
                          <div className="user-message-box max-w-[80%]">
                            <div className="user-message-text">
                              {message.text}
                            </div>
                            <div className="text-xs text-gray-400 mt-2 text-right opacity-70">
                              {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Indicador de ESCRITURA - MEJORADO */}
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-start space-x-2 sm:space-x-3"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-500/80 to-yellow-600/80 rounded-full flex items-center justify-center flex-shrink-0 border border-amber-400/30">
                            <Bot className="w-4 h-4 text-black font-bold" />
                          </div>
                          <div className="amelie-message-box">
                            <div className="flex items-center space-x-2">
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-amber-400 font-semibold"
                              >
                                Amelie está escribiendo
                              </motion.span>
                              <div className="flex space-x-1">
                                <motion.div
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                  className="w-2 h-2 bg-amber-400 rounded-full"
                                />
                                <motion.div
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                  className="w-2 h-2 bg-amber-400 rounded-full"
                                />
                                <motion.div
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                  className="w-2 h-2 bg-amber-400 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Preguntas sugeridas ELEGANTES - Solo al inicio */}
                    {messages.length === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 space-y-3"
                      >
                        <div className="text-sm text-amber-400 font-semibold px-2 font-serif">
                          ✨ Preguntas frecuentes:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {suggestedQuestions.map((question, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSuggestedQuestion(question)}
                              className="amelie-suggestion-btn text-left"
                            >
                              {question}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Panel de Emojis ELEGANTE */}
                  <AnimatePresence>
                    {showEmojis && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 sm:px-6 py-3 border-t border-amber-500/20 bg-gradient-to-r from-gray-950/90 to-black/90 backdrop-blur-sm"
                      >
                        <div className="grid grid-cols-8 gap-2">
                          {emojisList.map((emoji, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => addEmoji(emoji)}
                              className="text-2xl p-2 hover:bg-amber-500/30 rounded-lg transition-all duration-200 border border-transparent hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20"
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Input ELEGANTE con Funciones */}
                  <div className="px-4 sm:px-6 py-4 border-t border-amber-500/20 bg-gradient-to-r from-gray-950/95 to-black/95 backdrop-blur-sm flex-shrink-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />
                      
                      {/* Botón de archivo */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 sm:p-3 text-amber-400 hover:text-amber-300 hover:bg-amber-500/20 rounded-full transition-all duration-200 border border-amber-500/30 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
                      >
                        <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>

                      {/* Input principal */}
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder="Escribe tu consulta sobre fragancias aquí..."
                          className="amelie-input-box w-full"
                        />
                      </div>

                      {/* Botón de emoji */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowEmojis(!showEmojis)}
                        className={`p-2 sm:p-3 rounded-full transition-all duration-200 border ${
                          showEmojis 
                            ? 'text-amber-300 bg-amber-500/30 border-amber-400 shadow-lg shadow-amber-500/20' 
                            : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/20 border-amber-500/30 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20'
                        }`}
                      >
                        <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>

                      {/* Botón de envío */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!inputText.trim()}
                        className="amelie-send-button flex items-center justify-center"
                      >
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                    </div>

                    {/* Footer con marca */}
                    <div className="mt-3 text-center">
                      <p className="text-xs text-amber-400/80 font-medium font-serif">
                        ✨ Powered by Amelie AI • Experta en Fragancias de Lujo ✨
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}