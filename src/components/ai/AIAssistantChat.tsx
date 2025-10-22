'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { supabaseService } from '@/lib/supabase-service-simple';
import { Product } from '@/types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  products?: Product[];
}

const initialMessage: Message = {
  id: '1',
  role: 'assistant',
  content: '¡Hola! Soy Amelie, tu asistente especializada en fragancias. Estoy aquí para ayudarte a encontrar la fragancia perfecta que se adapte a tu personalidad y estilo.\n\n¿En qué puedo ayudarte hoy?',
  timestamp: new Date(),
};

const suggestedQuestions = [
  '🧠 Analiza mi personalidad olfativa',
  '💼 Fragancia para mi trabajo profesional',
  '❤️ Algo que me haga irresistible',
  '🎨 Enséñame a combinar fragancias',
  '🔬 Educación olfativa avanzada',
  '⭐ Recomendación ultra-personalizada'
];

const CLASSIC_PRICE = 170000;
const PREMIUM_PRICE = 190000;

const resolvePriceForCategory = (category?: string) => {
  if (!category) {
    return CLASSIC_PRICE;
  }

  const normalized = category.toLowerCase();

  if (normalized.includes('arab')) {
    return PREMIUM_PRICE;
  }

  if (normalized.includes('coleccion') || normalized.includes('collection') || normalized.includes('signature')) {
    return PREMIUM_PRICE;
  }

  return CLASSIC_PRICE;
};

const normalizeProductForResponse = (product: Product): Product => ({
  ...product,
  price: resolvePriceForCategory(product.category),
});

export default function AIAssistantChat() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cargar productos reales al inicializar
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await supabaseService.getProducts();
        setAllProducts(products);
        console.log(`✅ ${products.length} productos cargados para Amelie AI`);
        
        // Si no hay productos, usar datos de sample como fallback
        if (!products || products.length === 0) {
          console.log('⚠️ No hay productos en Supabase, usando catálogo oficial verificado...');
          // Importar productos VERIFICADOS del catálogo oficial
          try {
            const verifiedResponse = await fetch('/productos-verificados.json');
            const verifiedProducts = await verifiedResponse.json();
            setAllProducts(verifiedProducts);
            console.log(`✅ ${verifiedProducts.length} productos VERIFICADOS cargados como fallback`);
          } catch (verifiedError) {
            console.error('❌ Error cargando productos verificados:', verifiedError);
          }
        }
      } catch (error) {
        console.error('❌ Error cargando productos para AI:', error);
        
        // Fallback a productos VERIFICADOS del catálogo oficial
        try {
          const verifiedResponse = await fetch('/productos-verificados.json');
          const verifiedProducts = await verifiedResponse.json();
          setAllProducts(verifiedProducts);
          console.log(`✅ ${verifiedProducts.length} productos VERIFICADOS cargados como fallback por error`);
        } catch (verifiedError) {
          console.error('❌ Error total cargando productos:', verifiedError);
        }
      }
    };
    loadProducts();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Limitar el input del usuario a 200 caracteres para controlar tokens
    const trimmedContent = content.trim().slice(0, 200);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedContent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the real AI API endpoint con límite de historial
      const recentMessages = messages.slice(-4); // Solo últimos 4 mensajes para contexto
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': `session_${Date.now()}`, // For non-authenticated users
        },
        body: JSON.stringify({
          message: trimmedContent,
          context: {
            conversation_id: `conv_${Date.now()}`,
            timestamp: new Date().toISOString(),
            recent_messages: recentMessages.map(m => ({ role: m.role, content: m.content.slice(0, 100) }))
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle error response
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || data.fallback || 'Lo siento, no pude procesar tu consulta.',
        timestamp: new Date(),
        products: data.function_result?.products || [],
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('❌ Error llamando al AI Agent:', error);
      
      // Fallback to simulated response if API fails
      const fallbackResponse = generateFallbackResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',  
        content: fallbackResponse.content,
        timestamp: new Date(),
        products: fallbackResponse.products,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (userMessage: string): { content: string; products?: Product[] } => {
    const lowerMessage = userMessage.toLowerCase();

    // Validar que tenemos productos cargados - si no, usar productos básicos
    if (!allProducts || allProducts.length === 0) {
      // Productos VERIFICADOS del catálogo oficial como último recurso
      const basicProducts = [
        {
          id: 'il-roso-ilmin',
          title: 'Inspirado en IL Roso (Ilmin)',
          visible_title: 'Inspirado en IL Roso (Ilmin)',
          description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h.',
          price: PREMIUM_PRICE,
          stock: 100,
          category: 'coleccion',
          is_featured: true,
          is_active: true,
          slug: 'il-roso-ilmin',
          images: []
        },
        {
          id: 'starry-night-montale',
          title: 'Inspirado en Starry Night (Montale Paris)',
          visible_title: 'Inspirado en Starry Night (Montale Paris)',
          description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h.',
          price: PREMIUM_PRICE,
          stock: 100,
          category: 'coleccion',
          is_featured: true,
          is_active: true,
          slug: 'starry-night-montale',
          images: []
        },
        {
          id: 'good-girl-carolina-herrera',
          title: 'Inspirado en Good Girl (Carolina Herrera)',
          visible_title: 'Inspirado en Good Girl (Carolina Herrera)',
          description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h.',
          price: CLASSIC_PRICE,
          stock: 100,
          category: 'mujer',
          is_featured: true,
          is_active: true,
          slug: 'good-girl-carolina-herrera',
          images: []
        },
        {
          id: 'yara-lattafa',
          title: 'Inspirado en Yara (Lattafa)',
          visible_title: 'Inspirado en Yara (Lattafa)',
          description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h.',
          price: PREMIUM_PRICE,
          stock: 100,
          category: 'arabes',
          is_featured: true,
          is_active: true,
          slug: 'yara-lattafa',
          images: []
        }
      ];
      
      return {
        content: '✨ Te muestro algunas de nuestras **fragancias inspiradas artesanales** más populares. Todas son reinterpretaciones premium con 18% de concentración:',
        products: basicProducts
      };
    }

    // Pregunta sobre originales vs inspiradas
    if (lowerMessage.includes('original') || lowerMessage.includes('autentic') || lowerMessage.includes('real')) {
      const featuredProducts = allProducts.filter(p => p.is_featured).slice(0, 2);
      const selected = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 2);
      return {
        content: '✨ Nuestras fragancias son **reinterpretaciones artesanales de alta calidad** - no son productos originales, sino inspiraciones únicas creadas con procesos artesanales. Tenemos concentración del 18%, maceración de 72 horas y garantía de satisfacción. Son perfectas para quienes buscan calidad premium a precios accesibles:',
        products: selected.map(normalizeProductForResponse)
      };
    }

    if (lowerMessage.includes('trabajo') || lowerMessage.includes('oficina')) {
      const workProducts = allProducts.filter(p => 
        p.visible_title?.toLowerCase().includes('boss') || 
        p.visible_title?.toLowerCase().includes('blue seduction') ||
        p.visible_title?.toLowerCase().includes('acqua di gio') ||
  (p.category === 'hombre' && (p.price ?? resolvePriceForCategory(p.category)) <= CLASSIC_PRICE)
      ).slice(0, 2);
      
      const selected = workProducts.length > 0 ? workProducts : allProducts.filter(p => p.category === 'hombre').slice(0, 2);
      return {
        content: 'Para trabajo, fragancias elegantes, profesionales y no invasivas de nuestro catálogo real:',
        products: selected.map(normalizeProductForResponse)
      };
    }

    if (lowerMessage.includes('cita') || lowerMessage.includes('romántico')) {
      const romanticProducts = allProducts.filter(p => 
        p.visible_title?.toLowerCase().includes('seduction') ||
        p.visible_title?.toLowerCase().includes('one million') ||
        p.visible_title?.toLowerCase().includes('scandal') ||
        (p.is_featured && p.category === 'hombre')
      ).slice(0, 2);
      
      const selected = romanticProducts.length > 0 ? romanticProducts : allProducts.filter(p => p.is_featured).slice(0, 2);
      return {
        content: 'Para citas románticas, nuestras fragancias más seductoras disponibles en tienda:',
        products: selected.map(normalizeProductForResponse)
      };
    }

    if (lowerMessage.includes('mujer') || lowerMessage.includes('femenin')) {
      const womenProducts = allProducts.filter(p => 
        p.category === 'mujer' ||
        p.visible_title?.toLowerCase().includes('good girl') ||
        p.visible_title?.toLowerCase().includes('cloud') ||
        p.visible_title?.toLowerCase().includes('miss dior')
      ).slice(0, 2);
      
      const selected = womenProducts.length > 0 ? womenProducts : allProducts.filter(p => p.category === 'mujer').slice(0, 2);
      return {
        content: 'Para mujer, nuestras fragancias femeninas más exclusivas disponibles:',
        products: selected.map(normalizeProductForResponse)
      };
    }

    if (lowerMessage.includes('popular') || lowerMessage.includes('mejor') || lowerMessage.includes('recomend')) {
      const popularProducts = allProducts.filter(p => p.is_featured).slice(0, 2);
      
      return {
        content: 'Nuestros bestsellers más populares - productos reales disponibles en SEVÁN PERFUM:',
        products: popularProducts.length > 0 ? popularProducts : allProducts.slice(0, 2)
      };
    }

    if (lowerMessage.includes('árabe') || lowerMessage.includes('oud') || lowerMessage.includes('oriental')) {
      const arabProducts = allProducts.filter(p => 
        p.visible_title?.toLowerCase().includes('oud') ||
        p.visible_title?.toLowerCase().includes('yara') ||
        p.visible_title?.toLowerCase().includes('khamrah') ||
        p.category === 'unisex'
      ).slice(0, 2);
      
      return {
        content: 'Nuestra colección árabe premium - fragancias orientales intensas disponibles:',
        products: arabProducts.length > 0 ? arabProducts : allProducts.slice(0, 2)
      };
    }

    // Respuesta por defecto con productos reales featured
    const featuredProducts = allProducts.filter(p => p.is_featured).slice(0, 2);
    
    return {
      content: 'Te muestro algunas de nuestras fragancias más destacadas del catálogo real. **Todas son inspiraciones artesanales premium** con 18% de concentración:',
      products: featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 2)
    };
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gold/20 rounded-3xl backdrop-blur-sm overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 border-b border-gold/20 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gold/30 to-gold/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h3 className="text-xl font-serif bg-gradient-to-r from-rose-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">Amelie - Experta en Fragancias</h3>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Especialista IA en fragancias premium
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {/* DEBUG: Mostrar número de mensajes */}
          <div className="text-xs text-gray-500 mb-2">
            Debug: {messages.length} mensajes cargados
          </div>
          
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-gold" />
                  </div>
                )}
                
                <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 mensaje-amelie ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-gold-deep to-gold text-black'
                        : 'bg-gray-800/50 border border-gold/10 text-gray-300'
                    }`}
                  >
                    <p className="text-sm leading-relaxed mensaje-texto">{message.content}</p>
                  </div>
                  
                  {/* Product Recommendations */}
                  {message.products && message.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.products.map((product, index) => (
                        <div
                          key={index}
                          className="bg-gold/5 border border-gold/20 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gold-soft">
                                {product.visible_title || product.name}
                              </h4>
                              <p className="text-xs text-gray-400">Fragancia inspirada premium</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-bold text-gold">
                                  ${(product.sale_price || product.price)?.toLocaleString()}
                                </span>
                                {product.sale_price && product.price > product.sale_price && (
                                  <span className="text-xs text-gray-500 line-through">
                                    ${product.price.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Stock: {product.stock || 0} | Concentración: 18%
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-gold hover:bg-gold hover:text-black"
                                onClick={() => {
                                  console.log('Agregado a favoritos:', product.visible_title || product.name);
                                }}
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-gold text-black hover:bg-gold-soft"
                                onClick={async () => {
                                  try {
                                    await addToCart(product, 1);
                                    const successMessage: Message = {
                                      id: Date.now().toString(),
                                      role: 'assistant',
                                      content: `✅ ¡Perfecto! "${product.visible_title || product.name}" ha sido agregado a tu carrito. ¿Te gustaría ver más fragancias similares?`,
                                      timestamp: new Date(),
                                    };
                                    setMessages(prev => [...prev, successMessage]);
                                  } catch (error) {
                                    console.error('Error agregando al carrito:', error);
                                  }
                                }}
                                disabled={product.stock === 0}
                              >
                                <ShoppingCart className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-2">
                    {message.role === 'assistant' ? 'Ahora' : 'Enviado'}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-gold" />
              </div>
              <div className="bg-gray-800/50 border border-gold/10 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 py-4 border-t border-gold/20">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Preguntas sugeridas:</h4>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="px-3 py-2 text-xs bg-gold/10 border border-gold/20 rounded-full text-gold-soft hover:bg-gold hover:text-black transition-all duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gold/20 p-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 200) { // Límite de 200 caracteres
                    setInputValue(value);
                  }
                }}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                placeholder="Escribe tu pregunta sobre fragancias... (máx. 200 caracteres)"
                className="w-full bg-gray-800/50 border border-gold/20 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold/40"
                disabled={isLoading}
                maxLength={200}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                {inputValue.length}/200
              </div>
            </div>
            <Button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-gold-deep to-gold text-black hover:from-gold hover:to-gold-soft px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Amelie - Respuestas con razonamiento profundo y análisis avanzado
            </div>
            <div className="text-xs">
              {allProducts.length} productos cargados
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}